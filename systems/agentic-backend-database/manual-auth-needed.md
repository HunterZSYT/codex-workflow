# Manual Auth / Manual Setup Needed

No fake credentials, tokens, database URLs, or SSH secrets were added.

## GitHub

GitHub is enabled through the existing Codex GitHub plugin. If you want GitHub MCP specifically, authenticate through official GitHub/Codex MCP setup instead of adding tokens manually.

## Context7

Already configured from the frontend setup as:

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp@latest"]
```

Optional API key setup must be done manually if higher limits are needed.

## Serena

Installed with `uv tool install` and configured in `C:\Users\acer\.codex\config.toml`.
Restart Codex before expecting live Serena MCP tools.

## CodeGraph

Installed with `npm install -g @colbymchenry/codegraph` and configured in `C:\Users\acer\.codex\config.toml`.
Restart Codex before expecting live CodeGraph MCP tools.
Project graph data is available only after running `codegraph init` / `codegraph index` inside a specific project.

## Supabase

Already configured as remote MCP:

```toml
[mcp_servers.supabase]
url = "https://mcp.supabase.com/mcp"
```

This requires Supabase OAuth/project access. Do not add production database credentials to config.

## Postgres / Database MCPs

Not configured. A DB MCP must only be configured with explicit user-approved local/dev credentials and a clear read-only scope.

## Docker / Filesystem MCP

Not configured globally. Use local scripts and existing filesystem access. Add broader MCP access only with explicit scope.

## VPS / SSH

SSH is available through local SSH config and Codex Connections. Future server tasks must confirm target before running commands.
