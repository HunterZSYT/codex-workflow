# Knowledge Retrieval

The workflow uses a local SQLite FTS5 index to find existing skills, knowledge blobs, scripts, templates, docs, and related items before creating new workflow knowledge.

## Local Commands

Rebuild:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-index.mjs
```

Search:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-search.mjs --query "swiss grid"
```

Relationships:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-related.mjs --id frontend.layout.swiss-editorial-grid
```

Dedupe review:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-dedupe.mjs
```

## Safety

Generated retrieval files are local-only and must not be synced:

- `.retrieval/`
- `*.sqlite`
- `*.sqlite-*`
- `*.sqlite3`
- `*.sqlite3-*`
- `*.db`
- `*.db-*`
- `knowledge-index.db`
- `knowledge-index.sqlite`

Before creating new knowledge, run retrieval and check candidate/stale related items first. If something related exists, update, promote, cross-reference, or leave it candidate instead of creating a duplicate.
