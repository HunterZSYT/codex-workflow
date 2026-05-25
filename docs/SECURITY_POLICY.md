# Security Policy

## Export Model

This repo uses allowlist sync. Only explicitly allowed workflow assets are copied from the local Codex folders.

Allowed examples:

- Markdown documentation and skill prompts
- `SKILL.md` files where safe
- `.mjs`, `.js`, `.sh`, and `.ps1` workflow scripts
- tool `package.json` files
- templates and sanitized config examples

Never export:

- `auth.json`
- raw `config.toml`
- config backups
- `.env` files
- private keys
- SSH config or keys
- database URLs
- browser cookies
- logs that may contain secrets
- screenshots or QA images
- `node_modules`

## Before Commit

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\redact-scan.ps1
powershell -ExecutionPolicy Bypass -File scripts\validate-export.ps1
```

Do not commit if either script fails.
