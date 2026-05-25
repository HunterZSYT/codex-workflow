# MCP Setup

MCP configuration in this repo is template-only.

Use `codex/config.template.toml` as a starting point, then configure live credentials manually outside Git.

Manual auth may be needed for:

- GitHub
- Figma
- Supabase
- Postgres or other database MCPs
- Playwright/Chrome DevTools tools
- Context7 or documentation tools
- SSH or VPS access

Never commit real tokens, passwords, database URLs, private keys, or `auth.json`.
