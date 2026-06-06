# README Migration Documentation Audit

Generated: 2026-06-06T06:59:25.844Z

## Current README coverage

- Codex Workflow
- Source-of-truth model
- What this repo contains
- What is not stored
- New PC prerequisites
- Restore on another PC
- Primary PC sync workflow
- Secondary machine rules
- Auto-sync
- Updating README and migration docs
- Troubleshooting

## Current restore guide coverage

- Restore Guide
- New machine checklist
- Clone path recommendation
- Restore command
- What restore copies
- What restore does not restore
- Manual auth checklist
- MCP setup checklist
- Health checks
- Post-restore knowledge index rebuild
- Confirm skills are visible
- Confirm systems are restored
- Different Windows username or path
- Missing optional tools
- Rollback and backup notes

## Current MCP setup coverage

- MCP Setup
- Detected MCP references
- Safe to commit
- Never commit
- Manual auth needed
- Verify after Codex restart
- Optional by default

## Missing migration/setup details found before update

- Explicit one-way source-of-truth model
- Primary-only versus secondary-safe scripts
- Detailed restore-only machine checklist
- Promote-machine-to-primary checklist
- Generated system inventory
- MCP verification guidance
- Unknown prerequisite list

## Exported systems found

- agentic-backend-database: 21 tools, 2 knowledge packs
- agentic-frontend: 7 tools, 4 knowledge packs
- agentic-project-manager: 39 tools, 1 knowledge packs

## Skills found

- Exported repo skills: 48
- Global local skills: 45

## Tools/scripts found

- Local system tools: 67
- Repo scripts: 10

## Knowledge packs found

- backend.wordpress.theme-development (active)
- backend.wordpress.woocommerce-theme-development (active)
- frontend.layout.swiss-editorial-grid (candidate)
- frontend.motion.gsap-lenis-wordpress (active)
- frontend.system.ui-layer-scope-model (active)
- frontend.wordpress.theme-design-system (active)
- project_manager.context.headroom-compression-evaluation (active)

## MCP/config references found

- chrome-devtools
- codegraph
- context7
- figma
- github
- playwright
- postgres
- serena
- supabase

## Manual auth requirements found

- Codex login/auth
- GitHub auth
- Figma auth when Figma MCP is used
- Supabase/Postgres/database credentials when used
- SSH keys/config for VPS work
- MCP credentials configured outside Git

## Prerequisites detected

- Windows 10/11 or compatible PowerShell environment
- Git
- Node.js/npm
- Codex CLI / Codex environment
- PowerShell script execution permission
- GitHub access to HunterZSYT/codex-workflow

## Optional tools detected or recommended for manual verification

- VS Code
- Python if a skill/tool requires Python validation or scripts
- Docker if backend/VPS tooling needs containers
- uv/uvx if Serena is used
- rsync/jq/psql/mysql/sqlite/mongosh/redis-cli if database tasks need them
- Playwright/Chrome/Chrome DevTools for frontend inspection
- Figma auth if Figma MCP is used
- Supabase auth if Supabase MCP is used
- SSH client for VPS work

## Local-only/generated files that must not sync

- *.backup
- *.backup.*
- *.bak
- *.db
- *.db-*
- *.dump
- *.gif
- *.jpeg
- *.jpg
- *.key
- *.log
- *.pem
- *.png
- *.ppk
- *.sql
- *.sqlite
- *.sqlite-*
- *.sqlite3
- *.sqlite3-*
- *.webp
- .ai-task
- .ai-task/**
- .codegraph
- .codegraph/**
- .env
- .env.*
- .git
- .retrieval
- .retrieval/**
- .understand-anything
- .understand-anything/**
- auth.json
- config.toml
- config.toml.*
- id_ed25519
- id_rsa
- knowledge-index.db
- knowledge-index.sqlite
- learning/events
- learning/events/**
- learning/recurring-failures.jsonl
- node_modules
- node_modules/**
- qa
- qa/**

## One-way migration risks

- Restored secondary machine accidentally running sync scripts
- Secondary machine registering auto-sync
- Two primary machines pushing to the same repo
- Secrets copied into template/config docs
- Generated indexes/logs/caches committed after restore

## Docs that need creation or update

- README.md
- docs/RESTORE_GUIDE.md
- docs/MCP_SETUP.md
- docs/MACHINE_SETUP_CHECKLIST.md
- docs/PROMOTE_MACHINE_TO_PRIMARY.md
- docs/SYSTEM_INVENTORY.md
