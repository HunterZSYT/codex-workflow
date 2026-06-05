# Headroom Context Compression Evaluation

Status: candidate. This pack is source-backed research for evaluating Headroom in the Codex Workflow system. It is not approved as an installed dependency, MCP, proxy, wrapper, or core workflow component.

Use this pack when a request mentions Headroom, context compression, token compression, compressing tool outputs/logs/files/RAG chunks, reversible compression/CCR, MCP compression, `headroom learn`, wrapping Codex, or proxying LLM traffic.

Default decision: absorb source-backed system knowledge now; decide integration only after explicit approval.

Hard boundaries:

- Do not install Headroom by default.
- Do not configure MCP by default.
- Do not run the proxy by default.
- Do not wrap Codex by default.
- Do not run `headroom learn` by default.
- Do not allow generated Headroom stores/caches/logs/session dumps into `codex-workflow`.
- Do not let Headroom write to `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or local workflow policy files without review.

Primary fit: future pilot candidate for Project Manager context compression and failure-learning comparison. The strongest source-backed fit is not a broad automatic wrapper; it is a controlled, local, opt-in evaluation for large tool outputs/logs and possibly MCP compression.
