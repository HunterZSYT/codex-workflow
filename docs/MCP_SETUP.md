# MCP Setup

MCP configuration in this repo is template-only. Use `codex/config.template.toml` as a starting point, then configure live credentials manually outside Git.

Never commit real tokens, passwords, database URLs, private keys, cookies, `auth.json`, or raw live `config.toml`.

## Detected MCP references

| MCP | Relevant area | Required? | Auth/setup |
| --- | --- | --- | --- |
| chrome-devtools | Frontend | Optional unless a task requires it | Configure manually outside Git |
| codegraph | Project Manager / code intelligence | Optional unless a task requires it | Configure manually outside Git |
| context7 | Project Manager / code intelligence | Optional unless a task requires it | Configure manually outside Git |
| figma | Frontend | Optional unless a task requires it | Configure manually outside Git |
| github | Project Manager / code intelligence | Optional unless a task requires it | Configure manually outside Git |
| playwright | Frontend | Optional unless a task requires it | Configure manually outside Git |
| postgres | Backend/database | Optional unless a task requires it | Configure manually outside Git |
| serena | Project Manager / code intelligence | Optional unless a task requires it | Configure manually outside Git |
| supabase | Backend/database | Optional unless a task requires it | Configure manually outside Git |

## Safe to commit

- Commented config examples
- Placeholder-only templates
- Setup notes without credentials
- Public package names and commands

## Never commit

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

## Manual auth needed

- Codex login/auth
- GitHub auth
- Figma auth when Figma MCP is used
- Supabase/Postgres/database credentials when used
- SSH keys/config for VPS work
- MCP credentials configured outside Git

## Verify after Codex restart

1. Restart Codex after editing the live config.
2. Use a low-risk read-only probe for each MCP.
3. For Figma, verify auth before write access.
4. For GitHub, verify repo read access before write operations.
5. For database MCPs, verify against local/dev credentials first.
6. For browser/devtools MCPs, open a harmless local target first.

## Optional by default

All MCPs are optional unless a task explicitly needs them. Missing optional MCPs should be reported as manual setup items, not guessed as installed.
