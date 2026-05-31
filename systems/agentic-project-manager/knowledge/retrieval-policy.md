# Knowledge Retrieval Policy

## Rule

Before creating new knowledge, check existing knowledge first.

Codex must check:

1. Existing exact match
2. Alias match
3. Ranked FTS match
4. Related items
5. Candidate/stale entries
6. Existing owner skill
7. Existing artifact/script/tool/MCP

Only then decide:

- use existing
- update existing
- merge
- cross-reference
- create artifact
- create blob
- create skill
- install/configure external tool
- do nothing

If retrieval finds a candidate blob or related item, do not create a duplicate. Decide whether to promote, update, cross-reference, or leave candidate.

If retrieval finds an active item with a gap, stale source, repeated failure, or user correction, do not treat active as closed. Route to enrichment candidate or stale review.

## Retrieval Software

Chosen engine: SQLite FTS5 through Node's local SQLite binding.

Generated local index:

`C:\Users\acer\.codex\agentic-project-manager\.retrieval\knowledge-index.sqlite`

The index is generated and local-only. Do not sync `.retrieval/`, `*.sqlite`, `*.sqlite3`, `*.db`, FTS caches, screenshots, logs, secrets, or raw task logs.

## Commands

Rebuild index:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-index.mjs
```

Search:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-search.mjs --query "swiss grid"
```

Inspect relationships:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-related.mjs --id frontend.layout.swiss-editorial-grid
```

Find overlap:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-dedupe.mjs
```

## Maturity Meaning

- `idea`: concept only
- `candidate_blob`: guidance exists but may be vague or unsourced
- `researched_blob`: rules are usable as guidance but may not have artifacts
- `specification`: precise enough to guide implementation
- `artifact_backed`: reusable artifacts or apply command exist
- `verified_pack`: reusable and verified as a package
- `deprecated`: do not use except to find replacement

Search results must show maturity and artifact availability so the agent does not treat vague guidance as a ready implementation.

## Rebuild Triggers

Rebuild the index after:

- adding or editing knowledge blobs
- changing `knowledge-registry.json`
- adding skills
- adding scripts/templates/docs that should be discoverable
- syncing local workflow systems from another source
