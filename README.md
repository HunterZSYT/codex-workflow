# Codex Workflow

This repository stores a sanitized, reusable export of a local Codex workflow setup.

It is intended for versioning and restoring:

- global agent instructions
- reusable skills and skill prompts
- agentic frontend tools
- agentic backend/database/VPS tools
- agentic project-manager tools
- setup, validation, redaction, sync, and restore scripts
- safe config templates and MCP setup notes

It does not store auth credentials, secrets, SSH keys, raw `config.toml`, `auth.json`, `.env` files, logs, screenshots, caches, or `node_modules`.

## Sync From This Machine

From the repo root:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\sync-from-local.ps1
powershell -ExecutionPolicy Bypass -File scripts\validate-export.ps1
powershell -ExecutionPolicy Bypass -File scripts\redact-scan.ps1
```

One safe sync/commit/push cycle:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\auto-sync-once.ps1
```

## Restore On Another Machine

Clone this repository, review it, then run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\restore-to-local.ps1
```

The restore script does not restore secrets. Codex login, MCP credentials, GitHub auth, Figma auth, SSH config, and database credentials must be configured manually.

## Auto Sync

The scheduled task script is prepared but not registered automatically:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\register-auto-sync-task.ps1
```

Remove it with:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\unregister-auto-sync-task.ps1
```

## Security

This repo uses allowlist export plus a redaction scan before commit. If `redact-scan.ps1` fails, do not commit or push until the finding is resolved.
