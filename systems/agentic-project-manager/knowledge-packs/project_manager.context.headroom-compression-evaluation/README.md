# Headroom Context Compression Evaluation

Status: active global context layer. This pack is source-backed guidance for using Headroom in globally active SDK/tool mode and local service mode inside the Codex Workflow system.

Use this pack when a request mentions Headroom, context compression, token compression, context optimization, large logs, huge tool output, large context files, repo absorption source material, research artifacts, reversible compression/CCR, MCP compression, `headroom learn`, wrapping Codex, or proxying LLM traffic.

Default decision: use Headroom automatically for large context/log/tool-output analysis through `pm-headroom-context.mjs --mode analyze`, while preserving raw source paths as canonical evidence.

Hard boundaries:

- Do not reinstall Headroom unless the dependency is missing.
- Do not configure MCP by default.
- Do not proxy or wrap Codex provider traffic by default.
- Do not wrap Codex by default.
- Do not run `headroom learn` by default.
- Do not allow generated Headroom stores/caches/logs/session dumps into `codex-workflow`.
- Do not let Headroom write to `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or local workflow policy files without review.

Primary fit: globally active SDK/tool mode plus local service-backed context simulation/compression for Project Manager context optimization. Active modes are SDK, service, explicit context analysis, large context analysis, large log analysis, tool-output analysis, repo absorption context analysis, and research artifact context analysis. Pending expansion modes remain MCP, Codex provider proxy/wrapper, persistent memory, and `headroom learn`.
