# Source Ledger

Date checked: 2026-06-07

| Source | Path/URL | Type | Extracted rule/pattern | Confidence | Note |
| --- | --- | --- | --- | --- | --- |
| frontend-inspect.mjs | `C:\Users\acer\.codex\agentic-frontend\tools\frontend-inspect.mjs` | local tool | Supports `--url`, viewport presets, screenshots, selectors, hover/click/scroll, console/failed request/bad response capture, final URL, and overflow measurement. | high | Local tool inspected |
| accessibility-check.mjs | `C:\Users\acer\.codex\agentic-frontend\tools\accessibility-check.mjs` | local tool | Supports URL-based axe checks with presets and include/exclude selectors. | high | Local tool inspected |
| performance-check.mjs | `C:\Users\acer\.codex\agentic-frontend\tools\performance-check.mjs` | local tool | Supports URL-based Lighthouse checks and writes JSON/HTML/summary reports. | high | Local tool inspected |
| vps-ssh-operations-gate | `C:\Users\acer\.codex\skills\vps-ssh-operations-gate\SKILL.md` | skill | Enforces read-only inspection first and approval before service restarts, config edits, deletes, or firewall changes. | high | Local skill inspected |
| remote-ssh-inventory.mjs | `C:\Users\acer\.codex\agentic-backend-database\tools\remote-ssh-inventory.mjs` | local tool | Reads SSH config metadata without printing private key contents or passwords. | high | Local tool inspected |
| vps-ssh-inspect.sh | `C:\Users\acer\.codex\agentic-backend-database\tools\vps-ssh-inspect.sh` | local tool | Read-only SSH inventory for identity, OS, disk, memory, processes, services, ports, Docker, and runtimes. | high | Local tool inspected |
| Deployment Readiness Gate | `C:\Users\acer\.codex\skills\deployment-readiness-gate\SKILL.md` | skill | Checks build/start scripts, process manager, env, migrations, backups, reverse proxy, SSL, ports, firewall, logs, health endpoint, and rollback plan. | high | Local skill inspected |
| Security Env Secrets Gate | `C:\Users\acer\.codex\skills\security-env-secrets-gate\SKILL.md` | skill | Never reveal secrets; audit env vars by name only and check auth/session/cookie/security headers. | high | Local skill inspected |
| Verification Gate Controller | `C:\Users\acer\.codex\skills\verification-gate-controller\SKILL.md` | skill | Requires VPS read-only inspection before server changes and task-appropriate verification. | high | Local skill inspected |
| Headroom context layer | `project_manager.context.headroom-compression-evaluation` | active pack | Use for huge logs/context, preserving raw source paths as canonical evidence. | high | Existing active layer |
| last30days current signal | `project_manager.research.last30days-current-signal` | active pack | Use only when current tool/source research is needed, not for stable server facts. | high | Existing active layer |
