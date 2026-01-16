---
trigger: always_on
---

Here's a more technical explaination of the project:

## High-level architecture & responsibilities

* **Frontend (SvelteKit + FlyonUI)**

  * Customer-facing UI, session management with PocketBase, and instant UI updates via local DB writes + webhook-initiated updates.
  * Calls the backend (or PocketBase direct APIs) only for authenticated operations that must be server-authoritative (e.g., create service request, request backup restore, open ticket).

* **PocketBase**

  * Collections for users, companies (each company may have multiple users, ACL shall be implemented later), plans (services), history (audit log), subscriptions (local copy)
  * Hosts auth (passwords). SSO will be integrated later.

* **Backend / API layer (SvelteKit server routes)**

  * Acts as the authenticated gateway between frontend and n8n/Stripe/PocketBase when needed. Minimizes scope: verify sessions, sign/forward requests, validate incoming webhooks.

* **n8n**

  * Runs workflows for provisioning, DNS updates, Mailcow DKIM, Cloudflare calls, provider API interactions, and Stripe reconciliation tasks. Responsible for retries, logs, and alerting on total failure.
  * Stores third-party credentials.

* **Stripe**

  * Handles billing and payments. SvelteKit backend processes Stripe webhooks and updates PocketBase local subscription records.

* **Zammad / Mailcow / Cloudflare / enhance / Netcup / Contabo / Pointer**

  * Interactions go through n8n. Pointer (no API) handled via manual operator flows (ticket creation).

* **Observability & widgets**

  * Expose uptime-kuma, Grafana widgets via iframes where useful.

---

## API & workflow contracts (must-follow)

### Provision request flow (frontend → dashboard → n8n)

1. Customer buys a service plan (frontend -> stripe -> frontend)
1. A provisioning action is initiated (e.g., "Create Web Hosting").
2. Frontend calls SvelteKit server route `POST /api/services/create` (authenticated).
3. Server:

   * Validates request + user entitlements.
   * Creates a **subscription** document in PocketBase with status `pending` and generates an immutable subscription `id`.
   * Calls n8n provision webhook: `POST https://n8n.example/workflows/provision` with body:

     ```json
     {
       "service_id": "<service_id>",
       "user_id": "<pb_user_id>",
       "plan_id": "<local_plan_id>",
       "params": { ... },
       "idempotency_key": "<subscription_id>"
     }
     ```
   * Returns success to frontend **immediately** with `202 Accepted` + service status `pending`.
4. **n8n** must:

   * Acknowledge receipt immediately (HTTP 202).
   * Check the `pending` data table's `key` column against the `idempotency_key` plus the action (provision, update, delete, etc.) and skips if it exists
   * Execute provisioning workflow asynchronously (retries enabled).
   * Post progress & final result to the dashboard webhook `POST /api/webhooks/n8n/service-update` (signed).
5. Dashboard webhook handler:

   * Verifies signature, validates subscription `id`.
   * Updates PocketBase service status (e.g., `provisioning`, `active`, `failed`, `manual_action`) and appends a `service_event`.
   * If `failed` and `n8n` indicates an operator action required, create a Zammad ticket via n8n or update operator console.
6. UI reflects status from PocketBase and shows helpful messages and links to tickets/manual actions.

### n8n → Dashboard async update requirements

* All callbacks must include subscription `id`, `status`, `details` (human & machine), `timestamp`.
* Dashboard must verify webhook authenticity (HMAC secret or JWT). Reject unsigned or old requests.
* Updates must be idempotent: use the subscription `id` plus the action (provision, update, delete, etc.) to avoid duplicate transitions.

### Stripe sync & webhooks

* Keep Stripe as canonical billing engine; keep a local subscription collection with Stripe IDs:

  * `stripe_customer_id` (in companies collection), `stripe_subscription_id` (in subscriptions collection), `stripe_price_id` (in plans collection), `status`, `current_period_end` (`expiry` in subscriptions collection).

* Server listens for Stripe webhooks: `invoice.paid`, `customer.subscription.updated`, `customer.subscription.deleted`, `checkout.session.completed`.

* On webhook:

  * Verify Stripe signature.
  * Update local PocketBase subscription doc by `stripe_subscription_id`.
  * If subscription change affects entitlements, create a job to reconcile service states (run through n8n or schedule a reconciliation workflow).

* Run a nightly Stripe ↔ local reconciliation workflow in n8n to detect drift and create tickets for manual review.


### Domains

* Part of the dashboard will be for domain registrar functionality (register, transfer, renew, manage nameservers) and Cloudflare DNS & SSL management (optional, but default).
* The tlds collection keeps all the available tlds, root providers, and price
* The domains collection keeps all the domains managed by the system.
* Domains can be linked with services (via the subscriptions table) to enable auto-provision of software and DNS records

---

## Status model (canonical)

Use these statuses for each service (mapped to UI states and operator actions):

* `pending` — created but not yet sent to n8n
* `queued` — sent to n8n (ack received)
* `provisioning` — in-progress
* `active` — fully provisioned
* `failed` — final failure; operator action required
* `manual_action` — needs operator input (e.g., Pointer)
* `suspended` — suspended by billing or operator
* `cancelling` — in-progress deletion
* `cancelled` — removed

State transitions must be validated server-side. Always append an event in `service_events` for each transition with `details`.

---

## Idempotency & retries

* Every request from server→n8n must include `idempotency_key`.
* n8n workflows must be idempotent or check `history` before re-applying actions.
* Webhook handlers must be idempotent (store processed webhook IDs).
* Use exponential backoff + jitter in n8n for provider APIs. Let n8n handle rate-limits.

---

## Security & secrets

* **n8n** holds 3rd-party secrets (provider API keys, Mailcow admin, Cloudflare tokens). Dashboard back-end must **never** hold provider secrets.
* Backend ↔ n8n communication:

  * n8n should accept requests only from the backend IP/host, no authentication required.
  * PocketBase: start with password auth. Implement password policies (force-change on first login).
  * GDPR: Provide endpoints in PocketBase for data export and anonymize flows. Log exports.

---

## DNS / Cloudflare / Mailcow specifics

* DNS changes are sent to n8n. n8n performs Cloudflare API calls and reports result back to dashboard.
* DKIM: n8n retrieves DKIM from Mailcow API and updates Cloudflare via n8n workflow.
* SPF/DMARC: static entries computed by backend and provided as DNS records payload for n8n.
* Offer origin certs as an optional toggle; don't auto-provision unless user opts in.
* For DNS changes, n8n must report propagation checks or at least the API result; dashboard shows "awaiting propagation" if TTL suggests delay.

---

## Backups & DR

* Expose UI to list, download (signed short-lived URL), create manual backup, and initiate restore.
* Backups may be provider-managed (link out) or centralized — reflect the difference in UI.
* PocketBase `backups` must include `source_type` (provider vs centralized) and `restore_instructions` when provider-managed.
* Restores should be a workflow in n8n that posts progress to dashboard.

---

## Zammad (tickets)

* Users can open and follow tickets via the dashboard.
* Preferred flow:

  * UI `POST /api/tickets/create` → server creates ticket through n8n (n8n uses Zammad API with stored secrets) and returns local mirrored ticket id.
  * n8n sends ticket update webhooks back to dashboard for status and messages.
  * no local ticket cache needed, tickets are loaded asynchronously in real time from the Zammad API via n8n

---

## Observability (UI)

* Embed uptime-kuma and Grafana widgets with iframes when user requests.
* Ensure widgets are read-only and served via secure URLs/tokens. Do not expose internal dashboards publicly.

---

## Testing & staging

* Provide a `dry-run` flag for provisioning requests that runs n8n in a sandbox/dry-run mode (simulate responses).
* Maintain a staging PocketBase and staging n8n instance.
* Add integration tests to verify:

  1. Provision → n8n ack → final `active` status.
  2. Failed provision triggers ticket and `manual_action`.
  3. Stripe webhook updates local subscription and triggers entitlement reconciliation.
  4. Webhook idempotency: duplicate webhook results in one state change only.

* Use automated smoke tests that run end-to-end in staging before deployments.

---

## Frontend implementation guidance (SvelteKit + FlyonUI)

* Global UX rules:

  * Show clear, human-friendly status + last update time + link to related ticket(s).
  * For long-running tasks, show `pending`/`queued` immediately and replace with `active` on webhook update.
  * Provide actionable info boxes on `manual_action` (what the user can expect, estimated resolution steps).

* Component guidance:

  * Use FlyonUI primitives for lists, toasts, dialogs, forms, and status badges.
  * Provide a small operator console for admins: search services, retry actions, open/operator-only actions.

* Routes (suggested):

  * `/` — overview
  * `/services` — list
  * `/services/[service_id]` — detail + events
  * `/billing` — subscriptions (from PocketBase local copy) + link to Stripe-hosted billing portal
  * `/tickets`
  * `/backups`

* PocketBase sync:

  * Use PocketBase realtime events (if enabled) to push updates to frontend instantly.
  * Also refresh local records on certain user actions.

