# Retrieval Tool Evaluation

Date: 2026-05-28

Goal: upgrade knowledge retrieval before creating new skills, blobs, scripts, tools, MCPs, docs, or future capability packs.

## Decision

Chosen option: SQLite FTS5 plus a simple relational edge table.

Why: the current registry is small, local, text-heavy, and metadata-rich. SQLite FTS5 gives ranked local full-text retrieval, snippets, phrase/prefix/NEAR-style query support, and simple SQL tables for status, maturity, artifact paths, and relationships without running a service or installing heavy infrastructure.

Generated index path:

`C:\Users\acer\.codex\agentic-project-manager\.retrieval\knowledge-index.sqlite`

This database is generated, local-only, and must not sync to GitHub.

## Tools Considered

| Tool | Official source checked | Pros | Cons | Setup complexity | Local-only safety | Ranking | Relationships | Decision |
|---|---|---|---|---|---|---|---|---|
| SQLite FTS5 | https://www.sqlite.org/fts5.html | Local file DB, FTS virtual tables, BM25, snippet/highlight, no server, works with Node built-in SQLite on this machine | Node `node:sqlite` is currently experimental; FTS query syntax needs escaping | Low | Strong | Yes, BM25 | Yes through normal tables | Chosen |
| Node built-in SQLite | https://nodejs.org/api/sqlite.html | Available in Node v24 here; avoids npm install | Experimental warning | Low | Strong | Depends on SQLite features | Normal SQL tables | Use as thin adapter |
| Kuzu | https://docs.kuzudb.com/ | Embedded graph DB, property graph model, Cypher, useful if relationship traversal becomes complex | More moving parts than needed for current blob registry | Medium | Good | Not primary text search | Strong | Future optional |
| DuckDB FTS | https://duckdb.org/docs/current/core_extensions/full_text_search.html | Local analytical DB, `match_bm25` search macro | Official docs warn FTS indexes do not update automatically when input table changes | Medium | Good | Yes | SQL tables | Not chosen |
| Typesense | https://typesense.org/docs/28.0/api/vector-search.html | Keyword plus vector/hybrid search, rank fusion | Server/service style and heavier than current local registry needs | High | Possible but heavier | Yes | Limited by search model | Future only |
| Meilisearch | https://www.meilisearch.com/docs/learn/relevancy/typo_tolerance_calculations | Excellent typo tolerance and search UX | Server/service, heavier than a local Codex knowledge index | High | Possible but heavier | Yes | Not a relationship layer | Future only |
| Qdrant | https://qdrant.tech/documentation/concepts/hybrid-queries/ | Strong vector and hybrid search | Vector/sparse setup is overkill for precise local metadata retrieval | High | Possible but heavier | Hybrid | Not needed now | Future semantic option |
| LanceDB | https://lancedb.github.io/lancedb/hybrid_search/hybrid_search/ | Embedded vector/full-text/hybrid search | More semantic/vector-oriented than needed for first retrieval fix | Medium | Good | Hybrid | Not needed now | Future semantic option |
| PowerShell, ripgrep, git grep | Local tools | Great fallback and source inspection | Not ranked, not relationship-aware, easy to miss aliases | Low | Strong | No | No | Fallback only |

## Conclusion

Use SQLite FTS5 now. Add Kuzu only if relationship traversal grows beyond simple `edges` queries. Do not introduce vector search or server search until the local FTS and metadata layer stops being enough.
