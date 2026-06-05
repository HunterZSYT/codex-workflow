---
name: readme-update-migration-guide
description: Use when updating the codex-workflow README, migration README, restore guide, MCP setup, new PC setup, machine setup checklist, one-shot migration docs, source-of-truth repo docs, one-way sync docs, primary machine rules, secondary or restore-only machine rules, promote-machine-to-primary checklist, system inventory, setup checklist, or when docs are out of date after a Codex Workflow system update.
---

# README Migration Guide

Use this skill to keep `C:\Users\acer\codex-workflow` documentation aligned with the current local Codex Workflow setup.

## Hard Rules

- Treat `codex-workflow` as a one-way source-of-truth export repo.
- Primary PC owns the live local setup, runs sync/export, validates, redaction-scans, commits, and pushes.
- Secondary/new PCs are restore-only consumers by default.
- Never tell a secondary machine to run `sync-from-local.ps1`, `auto-sync-once.ps1`, or `register-auto-sync-task.ps1` unless the user explicitly promotes that machine to primary.
- Never make the workflow bidirectional.
- Never include secrets, tokens, passwords, SSH keys, `auth.json`, raw `config.toml`, `.env`, database URLs, cookies, private keys, or server passwords.
- Keep generated DBs, indexes, caches, logs, screenshots, `.ai-task`, `node_modules`, and raw local state out of sync/docs output.

## Workflow

1. Inspect the repo and local systems:
   - `C:\Users\acer\codex-workflow`
   - `C:\Users\acer\.codex\agentic-frontend`
   - `C:\Users\acer\.codex\agentic-backend-database`
   - `C:\Users\acer\.codex\agentic-project-manager`
   - `C:\Users\acer\.codex\skills`
2. Run the scanner in dry-run mode:
   ```powershell
   node C:\Users\acer\.codex\agentic-project-manager\tools\pm-readme-update.mjs --repo "C:\Users\acer\codex-workflow" --dry-run
   ```
3. Review warnings, unknown prerequisites, primary-only scripts, secondary-safe scripts, and redaction-sensitive findings.
4. Write docs only after the scan looks correct:
   ```powershell
   node C:\Users\acer\.codex\agentic-project-manager\tools\pm-readme-update.mjs --repo "C:\Users\acer\codex-workflow" --write
   ```
5. Validate before claiming success:
   ```powershell
   node --check C:\Users\acer\.codex\agentic-project-manager\tools\pm-readme-update.mjs
   node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-index.mjs
   node C:\Users\acer\.codex\agentic-project-manager\tools\project-manager-health-check.mjs
   powershell -ExecutionPolicy Bypass -File C:\Users\acer\codex-workflow\scripts\validate-export.ps1
   powershell -ExecutionPolicy Bypass -File C:\Users\acer\codex-workflow\scripts\redact-scan.ps1
   ```
6. Review Git diff. Commit/push only from the primary PC after validation and redaction scan pass.

## Documentation Targets

Update or generate:

- `README.md`
- `docs\RESTORE_GUIDE.md`
- `docs\MACHINE_SETUP_CHECKLIST.md`
- `docs\PROMOTE_MACHINE_TO_PRIMARY.md`
- `docs\MCP_SETUP.md`
- `docs\SYSTEM_INVENTORY.md`
- `C:\Users\acer\.codex\agentic-project-manager\knowledge\readme-migration-doc-audit.md`
- `C:\Users\acer\.codex\agentic-project-manager\knowledge\readme-update-report.md`

## Required Content

Always include:

- What the repo is and is not.
- One-way source-of-truth model.
- Primary-only sync workflow.
- Secondary restore-only rules.
- Auto-sync warning: one primary auto-sync machine at a time.
- Required and optional prerequisites, with uncertain tools marked for manual verification.
- Restore steps and manual auth/MCP/SSH/database setup.
- Safe-to-commit versus never-commit material.
- System inventory from scan results.
- Primary-only and secondary-safe script classifications.
- Troubleshooting for PowerShell execution policy, missing Node/npm, path differences, missing MCP credentials, optional CLIs, redaction failures, Git auth, and accidental secondary sync.

## Scanner Expectations

Use `pm-readme-update.mjs` as the practical source of scan-derived truth. It should detect exported systems, skills, tools, scripts, MCP references, package dependencies, manual auth notes, generated/local-only exclusions, restore steps, validation commands, and one-way migration risks.

If the scanner output conflicts with memory or assumptions, trust the live scan and update the docs/tool behavior accordingly.
