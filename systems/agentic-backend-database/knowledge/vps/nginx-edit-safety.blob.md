# Knowledge Blob: Nginx Edit Safety

Blob ID: nginx-edit-safety

Owner system: agentic-backend-database

Owner skill: vps-ssh-operations-gate

Capability: Safe Nginx/server config inspection and edit flow.

Trigger phrases:
- Nginx
- server block
- reverse proxy
- SSL
- domain config
- restart nginx
- VPS config

When to use:
- Use for Nginx inspection, config edits, reverse proxy changes, SSL/domain changes, and server restarts.

When not to use:
- Do not use for local static frontend-only changes.

External libraries/tools:
- SSH
- nginx CLI
- systemd/service manager

Required docs source:
- Context7:
- Official docs: https://nginx.org/en/docs/
- GitHub/npm:
- Last verified: candidate

Best-practice rules:
- Read-only inspection first.
- Identify active config include paths before editing.
- Backup config before modification.
- Preview exact command and rollback plan.
- Run `nginx -t` before reload/restart.
- Ask approval before edits, reloads, restarts, firewall, DNS, or production changes.

Implementation pattern:
- Inspect OS, service, config paths, current server block, and logs.
- Propose minimal diff.
- Ask approval.
- Apply backup + edit + test + reload.
- Verify endpoint.

Anti-patterns:
- Editing production config without backup.
- Restarting services without approval.
- Assuming config path.

Security/safety notes:
- Do not sync SSH hosts, credentials, private logs, or sensitive config.

Verification method:
- `nginx -t`, service status, and safe endpoint smoke test after approval.

Generated/local artifacts:
- Server logs and backups are local-only unless explicitly sanitized.

Micro-update history:
- 2026-05-28: Initial candidate seed; refresh from official docs before implementation.

Safe to sync to codex-workflow:
yes
