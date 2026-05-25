# Backend Database Project Scan

Use when starting in an unknown backend/full-stack project.

Workflow:
1. Run `project-capability-scan`.
2. Run `api-route-map` if API work.
3. Run `db-engine-detect` if DB work.
4. Run `db-schema-map` if schema/migration work.
5. Run `env-secret-audit` if config/env work.
6. Run `migration-safety-check` before migrations.
7. Summarize stack, risks, commands, and next safest task.
