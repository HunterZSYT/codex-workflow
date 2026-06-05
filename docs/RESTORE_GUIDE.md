# Restore Guide

This guide is for restoring `codex-workflow` on a secondary or new machine. The default rule is restore-only: the machine consumes this repo and does not sync or push back.

Strong warning: do not run `sync-from-local.ps1`, `auto-sync-once.ps1`, `register-auto-sync-task.ps1`, or push to `HunterZSYT/codex-workflow` from a secondary machine unless the user explicitly promotes that machine to primary.

## New machine checklist

- Windows 10/11 or compatible PowerShell environment
- Git
- Node.js/npm
- Codex CLI / Codex environment
- PowerShell script execution permission
- GitHub access to HunterZSYT/codex-workflow

Optional tools to verify only when needed:

- VS Code
- Python if a skill/tool requires Python validation or scripts
- Docker if backend/VPS tooling needs containers
- uv/uvx if Serena is used
- rsync/jq/psql/mysql/sqlite/mongosh/redis-cli if database tasks need them
- Playwright/Chrome/Chrome DevTools for frontend inspection
- Figma auth if Figma MCP is used
- Supabase auth if Supabase MCP is used
- SSH client for VPS work

## Clone path recommendation

Clone to a normal user-owned development path. On this machine the source repo lives at:

```text
C:\Users\acer\codex-workflow
```

If the target Windows username differs, review restore paths before running scripts.

## Restore command

From the repo root:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\restore-to-local.ps1
```

## What restore copies

The restore flow is based on the exported systems and allowlist in `manifests/export-manifest.json`.

Detected sources:

- systems/agentic-frontend from C:\Users\acer\.codex\agentic-frontend
- systems/agentic-backend-database from C:\Users\acer\.codex\agentic-backend-database
- systems/agentic-project-manager from C:\Users\acer\.codex\agentic-project-manager
- skills from C:\Users\acer\.codex\skills

Expected restored assets include exported system docs, skill prompts, tools, safe policies, knowledge markdown, knowledge-pack metadata, global skills, templates, and safe config templates.

## What restore does not restore

- auth.json
- raw config.toml
- .env and .env.*
- SSH keys and private keys
- database URLs
- MCP credentials
- cookies and tokens
- generated indexes and databases
- logs
- screenshots
- .ai-task folders
- node_modules
- caches and raw local state

## Manual auth checklist

- Codex login/auth
- GitHub auth
- Figma auth when Figma MCP is used
- Supabase/Postgres/database credentials when used
- SSH keys/config for VPS work
- MCP credentials configured outside Git

## MCP setup checklist

Detected MCP references:

- chrome-devtools
- codegraph
- context7
- figma
- github
- playwright
- postgres
- serena
- supabase

1. Copy relevant template entries from `codex/config.template.toml` into the live Codex config.
2. Add credentials outside Git.
3. Restart Codex.
4. Verify each MCP by using the relevant tool or connector in a low-risk read-only check.

## Health checks

```powershell
powershell -ExecutionPolicy Bypass -File scripts\health-check.ps1
powershell -ExecutionPolicy Bypass -File scripts\validate-export.ps1
powershell -ExecutionPolicy Bypass -File scripts\redact-scan.ps1
node C:\Users\acer\.codex\agentic-project-manager\tools\project-manager-health-check.mjs
```

## Post-restore knowledge index rebuild

Run after restore if Project Manager retrieval is stale or missing:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-index.mjs
```

## Confirm skills are visible

Check that global skill folders exist under:

```text
C:\Users\<user>\.codex\skills
```

Detected global skill count on the scanned primary machine: 45

## Confirm systems are restored

Expected systems:

- systems/agentic-backend-database
- systems/agentic-frontend
- systems/agentic-project-manager

After restore, verify matching local folders under `C:\Users\<user>\.codex\`.

## Different Windows username or path

If the target machine username is not `acer`, treat every path in docs as an example. Prefer scripts that derive paths from the user profile. Review any hardcoded absolute path before running.

## Missing optional tools

Install optional tools only when a task needs them. Do not install dependencies globally just to satisfy the restore guide.

## Rollback and backup notes

Before overwriting an existing local Codex setup, back up the current local folders or review the restore script's backup behavior. If restore produces an unexpected diff, stop and inspect before running any sync command.
