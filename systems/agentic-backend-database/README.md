# Agentic Backend Database Global Setup

Global location:

`C:\Users\acer\.codex\agentic-backend-database`

This setup prepares Codex for future backend, database, API, SSH/VPS, deployment, log, server config, and production-safety tasks across many projects. It is not tied to one app, database, server, or hosting panel.

## Safety Model

Default mode is read-only inspection first.

Any write/destructive/server-changing operation requires:

1. explicit user approval
2. target confirmation
3. backup check
4. rollback plan
5. command preview
6. verification plan

See `safety-policy.md`.

## Global Tools

Tools live in:

`C:\Users\acer\.codex\agentic-backend-database\tools`

Examples:

```bash
node ~/.codex/agentic-backend-database/tools/backend-db-health-check.mjs
node ~/.codex/agentic-backend-database/tools/remote-ssh-inventory.mjs
node ~/.codex/agentic-backend-database/tools/project-capability-scan.mjs
node ~/.codex/agentic-backend-database/tools/api-route-map.mjs
node ~/.codex/agentic-backend-database/tools/db-engine-detect.mjs
node ~/.codex/agentic-backend-database/tools/db-schema-map.mjs
node ~/.codex/agentic-backend-database/tools/migration-safety-check.mjs
node ~/.codex/agentic-backend-database/tools/sql-safety-check.mjs --file query.sql
bash ~/.codex/agentic-backend-database/tools/vps-ssh-inspect.sh user@host
bash ~/.codex/agentic-backend-database/tools/vps-service-map.sh user@host
bash ~/.codex/agentic-backend-database/tools/vps-db-map.sh user@host
```

## Skill Prompts

Skill prompts live in:

`C:\Users\acer\.codex\agentic-backend-database\skill-prompts`

They were also installed as real global Codex skills under:

`C:\Users\acer\.codex\skills`

## MCP Status

See `mcp-status.md`.

Configured or documented, but live MCP connection still requires manual verification after restarting Codex.

## Manual Auth

See `manual-auth-needed.md`.

No fake tokens or database credentials were added.
