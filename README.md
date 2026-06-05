# Codex Workflow

This repository is a sanitized Codex Workflow command center for backup, migration, review, and restore.

It is a source for restoring workflow assets on another machine. It is not a secrets repo and must not contain real auth state, private keys, raw config, database URLs, tokens, cookies, generated indexes, logs, screenshots, caches, or raw local state.

## Source-of-truth model

This repository is one-way by default.

Primary PC:

- owns the live local Codex setup
- runs `sync-from-local.ps1`
- runs validation and redaction checks
- commits and pushes sanitized workflow updates

Secondary/new PC:

- clones or pulls this repo
- runs `restore-to-local.ps1`
- configures auth, MCP, SSH, database, and other secrets manually
- does not push changes back to this repo
- does not enable auto-sync
- keeps local experiments separate

Warning: do not run sync, auto-sync, or push from a restored machine unless explicitly promoting that machine to the new primary workflow machine.

Other PCs can create their own project repos, forks, branches, or local experiments, but they must not write back to `HunterZSYT/codex-workflow` by default.

## What this repo contains

- `AGENTS.md`
- `systems/agentic-frontend`
- `systems/agentic-backend-database`
- `systems/agentic-project-manager`
- `skills/`
- `codex/config.template.toml`
- `docs/`
- `scripts/`
- `manifests/`

Detected exported systems:

- agentic-backend-database (21 tools, 2 knowledge packs)
- agentic-frontend (7 tools, 4 knowledge packs)
- agentic-project-manager (37 tools, 0 knowledge packs)

Detected skill groups:

- backend-database
- existing-global
- frontend
- project-manager

## What is not stored

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

## New PC prerequisites

Required:

- Windows 10/11 or compatible PowerShell environment
- Git
- Node.js/npm
- Codex CLI / Codex environment
- PowerShell script execution permission
- GitHub access to HunterZSYT/codex-workflow

Recommended or optional:

- VS Code - verify manually when needed
- Python if a skill/tool requires Python validation or scripts - verify manually when needed
- Docker if backend/VPS tooling needs containers - verify manually when needed
- uv/uvx if Serena is used - verify manually when needed
- rsync/jq/psql/mysql/sqlite/mongosh/redis-cli if database tasks need them - verify manually when needed
- Playwright/Chrome/Chrome DevTools for frontend inspection - verify manually when needed
- Figma auth if Figma MCP is used - verify manually when needed
- Supabase auth if Supabase MCP is used - verify manually when needed
- SSH client for VPS work - verify manually when needed

Detected local npm dependencies:

- @axe-core/playwright
- ajv
- dotenv
- lighthouse
- playwright
- yaml

## Restore on another PC

1. Install required prerequisites.
2. Clone the repo:
   ```powershell
   git clone https://github.com/HunterZSYT/codex-workflow.git
   ```
3. Review `docs/SECURITY_POLICY.md` and the one-way source-of-truth model.
4. Run restore:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\restore-to-local.ps1
   ```
5. Install local tool dependencies if restore does not do it.
6. Configure Codex auth manually.
7. Create the live Codex `config.toml` from `codex/config.template.toml` and add credentials outside Git.
8. Configure MCP credentials manually.
9. Configure GitHub, Figma, Supabase, SSH, and database credentials manually only when needed.
10. Run health checks.
11. Rebuild knowledge indexes if needed.
12. Run validation and redaction scan.

## Primary PC sync workflow

PRIMARY MACHINE ONLY:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\sync-from-local.ps1
powershell -ExecutionPolicy Bypass -File scripts\validate-export.ps1
powershell -ExecutionPolicy Bypass -File scripts\redact-scan.ps1
powershell -ExecutionPolicy Bypass -File scripts\auto-sync-once.ps1
```

Only the primary PC should commit and push sanitized workflow changes to this repo.

## Secondary machine rules

Allowed:

- `git clone`
- `git pull`
- `restore-to-local.ps1`
- local auth setup
- local verification
- project work in separate repos

Not allowed by default:

- `sync-from-local.ps1`
- `auto-sync-once.ps1`
- `register-auto-sync-task.ps1`
- committing or pushing changes to `codex-workflow`
- modifying exported workflow assets and pushing upstream

## Auto-sync

Only the primary PC should register auto-sync.

Never enable auto-sync on secondary machines. Only one primary auto-sync machine should exist at a time.

## Updating README and migration docs

Use the global `readme-update-migration-guide` skill.

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-readme-update.mjs --repo "C:\Users\acer\codex-workflow" --dry-run
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-readme-update.mjs --repo "C:\Users\acer\codex-workflow" --write
powershell -ExecutionPolicy Bypass -File scripts\validate-export.ps1
powershell -ExecutionPolicy Bypass -File scripts\redact-scan.ps1
```

After write, review the diff. Commit and push only from the primary PC after validation and redaction scan pass.

## Troubleshooting

- PowerShell execution policy: run commands with `-ExecutionPolicy Bypass` for the current process.
- Missing Node/npm: install Node.js and verify with `node --version` and `npm --version`.
- Restore path differences: review scripts before restore if the Windows username or Codex path differs.
- Missing MCP credentials: configure live credentials manually outside Git, then restart Codex.
- Missing SSH config: create keys and SSH config manually; never restore private keys from this repo.
- Missing optional CLIs: install only the CLIs needed for the current project or MCP.
- Redaction scan failure: do not commit or push until the finding is removed or explicitly approved as safe.
- Git auth failure: re-authenticate GitHub locally.
- Accidental secondary sync: stop immediately, do not push, inspect the diff, and decide whether the machine is being explicitly promoted to primary.
