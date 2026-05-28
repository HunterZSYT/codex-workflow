# Knowledge Products

Knowledge Products turn loose workflow guidance into reusable, source-grounded assets.

## Product Types

- Knowledge blobs: small formulas, rules, safety checks, and verification patterns.
- Capability packs: reusable systems that need research, decisions, specs, artifacts, and verification.
- Artifacts: reusable CSS, TS/TSX snippets, templates, checklists, and command recipes.
- Source ledgers: records of official docs, standards, GitHub repos, Context7 docs, user-provided references, and source-safe examples.

## Rules

- Retrieve before creating anything new.
- Use existing tools, docs, libraries, standards, and examples first.
- New packs start as draft/candidate.
- Active packs require user approval.
- Advice-only packs are not reusable implementations.
- Do not copy proprietary layouts, assets, code, or raw source dumps.

## Pack Commands

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-pack-init.mjs --id frontend.layout.swiss-editorial-grid --title "Swiss Editorial Grid Layout"
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-pack-audit.mjs --id frontend.layout.swiss-editorial-grid
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-pack-promote.mjs --id frontend.layout.swiss-editorial-grid --approved
```

Promotion is blocked without `--approved` and source/readiness checks.
