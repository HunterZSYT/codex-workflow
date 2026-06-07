# Research

## Current Finding

The local systems already have the pieces for hosted-site work, but they were scattered across frontend inspection, backend/VPS safety, database safety, deployment readiness, security gates, and Project Manager routing. The missing reusable knowledge was a dynamic orchestration layer.

## Source-Backed Rules

- Public URL inspection can run without SSH when the URL is reachable and not private/admin-only.
- SSH work starts in read-only mode: inventory, logs, config reading, file listing, service status, and mapping only.
- Server-changing operations require explicit target confirmation, backup/snapshot check, command preview, rollback plan, verification plan, and user approval.
- If environment is production or unknown, operate in production-safe mode.
- Secrets, tokens, cookies, private keys, `.env` values, database URLs, private server logs, and admin screenshots must not be exposed or synced.
- Headroom is appropriate for huge logs only after secret-looking files are avoided or explicitly approved.
- last30days is not part of ordinary domain/VPS execution; use it only to research current tooling/source options.

## Tool Fit

- Public URL QA: frontend inspection, accessibility, and Lighthouse tools.
- VPS inventory: SSH inventory and VPS map scripts.
- Deployment readiness: deployment-readiness-gate plus backup/rollback proof.
- Database work: database-safety-orchestrator, migration safety, SQL safety, schema map.
- Security review: security-env-secrets-gate plus defensive-only security checklist.
- WordPress/WooCommerce hosted work: use existing WordPress/WooCommerce packs after target/stack detection.
