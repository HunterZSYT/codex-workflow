# readme-update-migration-guide

Use when updating README, restore guide, migration guide, machine setup checklist, MCP setup, system inventory, source-of-truth repo docs, one-way sync docs, primary machine rules, secondary/restore-only machine rules, or promote-machine-to-primary docs for `C:\Users\acer\codex-workflow`.

Rules:
- Scan before writing. Do not guess installed systems, tools, scripts, MCPs, skills, or prerequisites.
- Preserve the one-way model: primary PC writes/syncs/pushes; secondary PCs restore/pull only by default.
- Never instruct secondary machines to run `sync-from-local.ps1`, `auto-sync-once.ps1`, or `register-auto-sync-task.ps1` unless explicitly promoted to primary.
- Never include secrets, raw auth/config files, `.env`, database URLs, SSH keys, cookies, private keys, generated DBs, indexes, caches, logs, screenshots, `.ai-task`, or `node_modules`.
- Keep routing updates short. Do not bloat `AGENTS.md`.

Default commands:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-readme-update.mjs --repo "C:\Users\acer\codex-workflow" --dry-run
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-readme-update.mjs --repo "C:\Users\acer\codex-workflow" --write
node --check C:\Users\acer\.codex\agentic-project-manager\tools\pm-readme-update.mjs
powershell -ExecutionPolicy Bypass -File C:\Users\acer\codex-workflow\scripts\validate-export.ps1
powershell -ExecutionPolicy Bypass -File C:\Users\acer\codex-workflow\scripts\redact-scan.ps1
```
