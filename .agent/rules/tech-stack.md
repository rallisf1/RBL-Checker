---
trigger: always_on
---

We are going to use the following software:

- Bun Javascript Runtime
- Sveltekit full stack meta framework with Typescript and recommended DX libraries (vitest, eslint, etc)
- Pocketbase for BaaS (Auth + Database over its API)
- FlyonUI front-end components (DaisyUI and TailwindCSS based)

You shall find the documentation for each of the above in your available tools.

We shall also use Stripe payments, but via a redirect, not SDK, and n8n as an external orchestrator (so we don't have to manage API call failures manually).