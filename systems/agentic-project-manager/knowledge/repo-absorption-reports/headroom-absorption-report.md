# Headroom Absorption Report

## 1. Verdict

Verdict: future pilot candidate plus candidate pack only.

Absorb source-backed system knowledge now. Do not install, clone, configure MCP, run proxy, wrap Codex, run `headroom learn`, or activate it as a core dependency.

## 2. Repo Identity

- URL: https://github.com/chopratejas/headroom
- Owner/name: `chopratejas/headroom`
- License: Apache-2.0
- NOTICE: includes third-party notices for dependencies such as tiktoken, Pydantic, sentence-transformers, FastAPI, and NumPy.
- Python package: `headroom-ai`
- PyPI version observed: 0.23.0, released 2026-06-04, Python >=3.10, beta classifier.
- npm package: `headroom-ai`
- npm version observed by `npm view`: 0.22.4, Node >=18.
- Install modes: Python package, npm package, Docker, local proxy, MCP server, agent wrapper.
- Runtime requirements: Python 3.10+ for Python package; Node 18+ for TypeScript package; optional extras for proxy/MCP/ML/memory/code/image/evals.
- Local-first claim: official README/docs say local library/proxy/MCP keep data local.
- Telemetry/default behavior: docs say anonymous telemetry is enabled by default and can be disabled with `HEADROOM_TELEMETRY=off` or `--no-telemetry`.
- Maintenance signal: GitHub shows active releases, latest release v0.23.0 on 2026-06-04 during research; PyPI also shows 0.23.0.

## 3. What This Repo Is

Headroom is a context optimization layer for LLM applications and AI agents. It compresses content before the LLM sees it, with emphasis on large tool outputs, logs, JSON/API/database results, files, RAG chunks, and conversation history. It provides library APIs, an HTTP proxy, MCP tools, agent wrappers, memory/shared-context features, and failure-learning commands.

## 4. Useful Goodies Found

| Goodie | Classification | Local use |
| --- | --- | --- |
| Content-aware compression pipeline | context compression pattern | Candidate benchmark/evaluation model for large tool outputs. |
| Compress-Cache-Retrieve | reversible compression / CCR pattern | Candidate model for carrying hashes/summaries while preserving local original retrieval. |
| `headroom_compress` / `headroom_retrieve` / `headroom_stats` | MCP integration pattern | Possible future MCP pilot, not default setup. |
| Proxy mode | proxy integration pattern | High-risk future candidate only. |
| Agent wrapper mode | agent wrapper pattern | Highest-risk candidate; do not wrap Codex without approval. |
| SharedContext / memory | cross-agent memory pattern | Compare against existing memory/retrieval, not replacement. |
| `headroom learn` | failure learning pattern | Safety note: dry-run/review only because it writes context files. |
| Limitations/benchmarks docs | benchmark/evaluation pattern | Use to design local sanitized pilot acceptance tests. |

## 5. System Placement

- Existing skill/router update: small trigger note in Project Manager routing and execution ledger.
- Knowledge blob: not created now; pack is sufficient.
- Candidate capability pack: `project_manager.context.headroom-compression-evaluation`.
- Tool candidate: future local tool pilot only after approval.
- MCP candidate: future MCP pilot only after approval.
- Workflow doc: candidate sync-ignore and risk artifacts.
- Learning system enrichment: compare Headroom failure learning against current PM learning loop; do not replace.
- README/migration docs: no direct update now; add ignore/setup notes only if Headroom is later piloted and paths are verified.
- Skip: installing, wrapping, proxying, running `headroom learn`, or making it core.

## 6. License/Safety

- License: Apache-2.0.
- Attribution: keep license/NOTICE awareness if any direct reuse or distribution occurs. This absorption copied no source code.
- Telemetry: default on per docs; future pilot should disable unless explicitly accepted.
- Local DB/cache risk: CCR originals, memory stores, vector stores, savings files, stats logs, proxy logs, and generated learning outputs may contain sensitive content.
- Proxy/network risk: proxy can sit between agent/app and provider; do not expose publicly and do not use without auth/privacy review.
- Agent wrapper risk: wraps Codex/other agents and changes transport behavior; high blast radius.
- MCP risk: exposes compression/retrieval tools and local stores through MCP; narrower than proxy but still needs review.
- Generated files to ignore: see candidate artifact `headroom-sync-ignore-checklist.md`.

## 7. What Not To Absorb

- Do not blindly let it write to `AGENTS.md`.
- Do not replace the existing learning system.
- Do not proxy all Codex traffic without a pilot.
- Do not sync Headroom local stores/caches/logs.
- Do not enable telemetry without deciding.
- Do not install globally in a setup pass.
- Do not copy source code or implementation internals into Codex Workflow.

## 8. Approval Needed

Explicit approval required before:

- installing Python package
- installing npm package
- pulling/running Docker image
- configuring MCP
- wrapping Codex
- running proxy
- running `headroom learn`
- adding generated ignore patterns to sync/redaction config
- running a benchmark/pilot
- promoting the candidate pack to active

## Recommended Next Action

Keep this as candidate knowledge. If context limits become a recurring practical issue, run a narrow, approval-gated MCP or library pilot on sanitized fixtures before considering proxy or wrapper mode.
