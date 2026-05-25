# Backend Database Tool Orchestrator

Use for backend, API, SQL, database, migrations, SSH/VPS/server, logs, deployment, env/secrets/auth/security tasks.

Routing: unknown project -> Backend Database Project Scan; API route/contract -> API Contract Orchestrator; SQL/database -> Database Safety Orchestrator; raw SQL -> SQL Operations Gate; migration/backup/restore -> Migration Backup Restore Gate; SSH/VPS/server -> VPS SSH Operations Gate; logs/errors -> Backend Observability Debugging; deployment/readiness -> Deployment Readiness Gate; env/secrets/security -> Security Env Secrets Gate; performance -> Backend Performance Triage; refactor -> Backend Refactor Safety.

Core rule: read-only discovery first, then smallest safe change, then verification.
