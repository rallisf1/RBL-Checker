---
trigger: always_on
---

1. I'm always here to help you. Whenever you can't decide what to do, all you have to do is ask.
2. Prioritize security over performance.
3. Don't expose 3rd party APIs to the front-end, use *.server.ts files to interact with pocketbase or any other 3rd party APIs
4. I have already created the pocketbase collections (database schema), feel free to use the `list_collections` and `get_collection` MCP tools to familiarize yourself with the database schema before interacting with it.
5. Treat the database schema as the single source of truth and generate types from it. Use the types in the codebase.
6. Use Git like you are a member of a team. Commit the core functionality in the main branch and then implement each feature in its own branch. Each feature shall comprise of various tasks (e.g. create component X, get backend data, create route page, etc). Each task needs to have its own git commit. When a feature is ready and its tests (if any) are successful, you can merge it to the main branch.
7. Respect the following programming principles:
- RTFM, read the documentation of anything new you want to use before you do so
- SOLID, keep the code secure yet extendable
- KISS, keep things simple
- DRY, if you repeat a piece of code more than twice consider making it a singleton