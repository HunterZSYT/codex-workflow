# Backend Observability Debugging

Use for backend/server/database failures.

Workflow:
1. Identify failure layer: route, validation, auth, service, database, external API, env, server/process, or reverse proxy.
2. Inspect logs with redaction.
3. Reproduce safely if possible.
4. Make one targeted fix.
5. Verify.
