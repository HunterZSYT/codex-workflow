---
name: backend-database-project-scan
description: Use when starting in an unknown backend or full-stack project. Runs capability, API, DB, schema, env, and migration scans as needed before planning changes.
---

# Backend Database Project Scan

Run `project-capability-scan`; run `api-route-map` for API work; run `db-engine-detect` for DB work; run `db-schema-map` for schema/migration work; run `env-secret-audit` for env/security work; run `migration-safety-check` before migrations. Summarize stack, risks, commands, and next safest task.

## Codebase Intelligence Routing

Use normal search/read for small backend edits with a known file or handler. Use backend capability, API route, DB engine, schema, and migration maps before heavier tools.

Use CodeGraph for backend symbol/caller/callee/dependency tracing, route-to-service-to-database relationship tracing, impact analysis, "what uses this?", and "what breaks if I change this?". Use Serena when semantic navigation can locate classes/functions/services across a large repo.

## Understand Anything Routing

After backend/database capability scans, use Understand Anything when the backend/full-stack project is large or unfamiliar, route/service/database flow crosses multiple layers, architecture/dependency/onboarding/impact analysis is needed, or business-domain flow understanding is useful.

Recommended sequence: run backend project scan first; if large/unknown, use `/understand`; ask `/understand-chat` about API/service/database flows; use `/understand-diff` before/after large backend changes; use `/understand-domain` for business process flows.

Do not use it for tiny localized backend edits or one known-file changes. Do not run it on private/proprietary/production-sensitive code unless user approves. Do not include secrets in graph/docs. Do not commit generated `.understand-anything/` files unless explicitly asked.

Do not run server/database/deployment commands during recon. Keep `.codegraph/`, `.understand-anything/`, indexes, caches, and generated databases local-only and gitignored.
