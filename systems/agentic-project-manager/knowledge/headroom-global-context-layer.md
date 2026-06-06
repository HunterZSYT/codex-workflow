# Headroom Global Context Layer

Status: active global context layer in SDK/tool mode and local service mode.

Use Headroom when Project Manager work creates or consumes large context that would otherwise crowd the active turn:

- huge tool output
- long logs
- large context files
- repo absorption source material
- research artifacts
- source ingestion markdown
- debugging output
- knowledgebase fill material

Operational rules:

- Use `pm-headroom-status.mjs` to report SDK, service, MCP, and pending-mode state.
- Use `pm-headroom-context.mjs --file <path> --mode analyze` for local context analysis.
- Use `pm-headroom-context.mjs --file <path> --mode simulate --timeout-ms 30000` or `--mode compress --timeout-ms 30000` only after service health is green.
- Preserve raw source paths separately. Raw source files and official source ledgers remain canonical evidence.
- Headroom output is context optimization, not the only source of truth.
- Do not use Headroom when exact raw text/code fidelity is required.
- Do not use Headroom on secret-looking files unless the user explicitly approves and `--force` is passed.
- Do not sync raw Headroom stores, caches, logs, traces, memory databases, or session dumps.
- Do not proxy or wrap Codex provider traffic through Headroom without a separate rollback plan.

Active modes:

- sdk
- service
- explicit_context_analysis
- large_context_analysis
- large_log_analysis
- tool_output_analysis
- repo_absorption_context_analysis
- research_artifact_context_analysis

Pending modes:

- mcp
- proxy
- wrapper
- headroom_learn

`headroom learn` is not active. It must not write to `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or workflow policy files without explicit review and approval.
