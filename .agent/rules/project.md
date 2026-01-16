---
trigger: always_on
---

We are building a web services client dashboard for my IT company.

We shall use a lot of 3rd party APIs to manage and resell services like web hosting, email hosting, domains, VPS hosting, etc. Don't be alarmed though, between all these APIs and our dashboard exists an n8n instance that manages API secrets, request and response uniformity, and retries/failures. We shall also leverage an asynchronous approach where n8n will respond instantly and our database will get updated through custom webhooks (sveltekit api routes).

You don't have to worry about the n8n workflows. Write your fetches and load functions in the best of your abilities and I shall adapt the n8n workflows accordingly. Whenever you are in doubt, just ask.

## Offered Services

All hosting services have a region option.

High Availability is available by quote:

* opens a ticket to sales (dashboard -> n8n -> zammad)
* the sales team creates a custom (non-public) plan for the customer and replies with an offer
* if the customer accepts the provisioning is done manually

### Domains

Full domain management: search, registration, transfer, edit contacts and nameservers

Full Cloudflare API integration: manage dns records, proxy status, SSL/TLS, clear cache, predefined rules (e.g. redirect root to www), etc.

No private DNS servers, only Cloudflare's.

By default all domains use Cloudflare's Free Plan, with the ability to upgrade.

Ability to use these domains for other DWS services with automatic DNS record provisioning and safety checks (e.g. don't let user delete/edit a record linked to an active service)

### Shared/Dedicated Web Hosting (PHP / Nodejs / MariaDB)

Automated account creation on web servers using the enhance.com web hosting panel over its REST API. Keep in mind, the DNS and email hosting features of enhance.com are not to be used.

- Predefined hosting packages
- Import from cPanel / Plesk
- WordPress Toolkit
- PHP Selector. Versions 5.6 to latest (8.4) available
- OpenLiteSpeed on Shared Plans
- cPGuard WAF included on Shared Plans
- Free daily incremental backups built-in
- Free Analytics over a shared umami instance
- Dedicated plans  (redirects to VPS plans with `mailcow email server` pre-installed):
  - choose between Apache / LiteSpeed / OpenLiteSpeed / Nginx
  - pricing includes a VPS + Enhance web panel subscription
  - optional cPGuard WAF (extra monthly fee)

### Shared/Dedicated Email Hosting (Mailcow)

- Predefined hosting packages
- Dmarc management
- Delivery reports
- Free daily incremental backups built-in
- Dedicated plans (redirects to VPS plans with `enhance web server` pre-installed):
  - dedicated IP
  - unlimited domains and mailboxes
  - optional master account (access to all mailboxes)
  - pricing includes a VPS + a one-off set up fee

### VPS

Resell VPS from Netcup, Contabo, and Pointer. Pointer doesn't provide any API; thus it will require manual provision.

- Predefined packages
- Choose an OS
- Choose preinstalled software (auto-installed via ansible playbooks):
    - nextcloud
    - dokploy
    - coolify
    - portainer
    - enhance web server
    - mailcow email server
- Managed hosting for a fee (50% more)

### Remote Desktop

Dedicated Rustdesk Service for remote IT Support, Work from Home, etc.

Predefined packages (VPS + Rustdesk license)

### Baremetal Servers

By quote. We provide from Desktop PCs to multi-socket Rack Servers and Apple Mac Minis/Studios. Use cases:

- Minio (s3 storage)
- UrBackup (backup server)
- Proxmox (custom virtualization)
- AI Inference