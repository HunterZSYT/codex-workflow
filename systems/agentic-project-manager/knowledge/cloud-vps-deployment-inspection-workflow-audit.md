# Cloud/VPS Deployment Inspection Workflow Audit

Date: 2026-06-07

## Existing Capabilities

- Project Manager routing and execution ledger already require read-only inspection first for VPS/server/deployment/auth/database work.
- Frontend public URL tooling exists:
  - `C:\Users\acer\.codex\agentic-frontend\tools\frontend-inspect.mjs`
  - `C:\Users\acer\.codex\agentic-frontend\tools\accessibility-check.mjs`
  - `C:\Users\acer\.codex\agentic-frontend\tools\performance-check.mjs`
- Backend/VPS tooling exists:
  - `remote-ssh-inventory.mjs`
  - `vps-ssh-inspect.sh`
  - `vps-service-map.sh`
  - `vps-webserver-map.sh`
  - `vps-log-map.sh`
  - `vps-db-map.sh`
  - `vps-docker-map.sh`
  - `vps-backup-check.sh`
  - `backend-db-health-check.mjs`
  - `api-route-map.mjs`, `db-engine-detect.mjs`, `db-schema-map.mjs`, `migration-safety-check.mjs`, `sql-safety-check.mjs`
- Safety skills exist:
  - `vps-ssh-operations-gate`
  - `database-safety-orchestrator`
  - `security-env-secrets-gate`
  - `deployment-readiness-gate`
  - `frontend-inspection-discipline`
  - `accessibility-gate`
  - `performance-triage`
- Existing WordPress/WooCommerce packs cover theme, ecommerce template, block-theme design, and GSAP/Lenis WordPress motion work.
- Headroom is already routed for huge logs and large context.
- last30days is already routed only for current tool/source research.

## Missing Orchestration

The system lacked one active workflow that combines:

- dynamic target intake for any domain, URL, VPS, staging/live site, or web stack
- public URL QA without SSH
- SSH read-only inventory without server changes
- change-plan mode before writes
- approval-gated implementation mode
- defensive security review
- cache/CDN/domain inspection
- final proof reporting

## Frontend URL QA Capability

`frontend-inspect.mjs` accepts `--url`, viewport presets, selectors, hover/click/scroll, screenshots, console warnings/errors, failed requests, bad responses, final URL, and horizontal overflow measurement. `accessibility-check.mjs` and `performance-check.mjs` also accept public URLs.

## SSH/VPS Capability

The VPS scripts map identity, OS, disk, memory, processes, services, ports, Docker, runtimes, webserver, logs, DB engine, and backup availability. The skill gate blocks service restarts, config edits, deletes, and firewall changes without approval.

## Server Security Capability

`security-env-secrets-gate` prevents secret exposure and checks env/auth/session/security-header risks. `project_manager.security.defensive-cybersecurity-skills-intake` supplies defensive-only security filtering.

## Database/API Capability

Backend tools can map routes, detect DB engines, map schema, check migrations, and classify SQL safety. Destructive SQL and migrations require backup and approval.

## Deployment Safety Gaps

The missing piece was not a tool; it was a single dynamic workflow pack that tells Codex how to combine URL QA, SSH read-only inspection, change planning, backup/rollback, approval, implementation, and proof reporting for any hosted target.

## Owner Skills/Packs

Primary owner: `task-routing-and-skill-selection`.

Secondary owners: `project-manager-execution-ledger`, `verification-gate-controller`, `backend-database-tool-orchestrator`, `vps-ssh-operations-gate`, `database-safety-orchestrator`, `security-env-secrets-gate`, `deployment-readiness-gate`, `frontend-tool-orchestrator`, `frontend-inspection-discipline`, `accessibility-gate`, `performance-triage`.

## Active Knowledge Decision

Create active pack `project_manager.cloud.vps-deployment-inspection-operations` as artifact-backed orchestration knowledge. It is safe to activate because it adds decision structure and approval gates only. It does not authorize real server changes.
