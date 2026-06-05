# Research

## What Headroom Is

Headroom is a local-first context optimization layer for LLM applications and AI coding agents. Its stated job is to compress content before it reaches the model, especially tool outputs, logs, files, RAG chunks, database/API results, and conversation history.

It is not just a library. The official docs and README describe several entry points:

- Python package: `headroom-ai`.
- TypeScript/npm package: `headroom-ai`.
- Local HTTP proxy: `headroom proxy`.
- MCP server/tools: `headroom_compress`, `headroom_retrieve`, `headroom_stats`.
- Agent wrapper: `headroom wrap claude|codex|cursor|aider|copilot|gemini`.
- Docker image: `ghcr.io/chopratejas/headroom`.
- Failure-learning command: `headroom learn`.

## Compression Model

The useful architectural pattern is content-aware compression before model submission:

- CacheAligner: moves dynamic prompt content so provider prefix caches can hit more often.
- ContentRouter: detects content type and routes to a compressor.
- SmartCrusher: statistical compression for JSON arrays and structured tool outputs.
- CodeCompressor / CodeAwareCompressor: AST-aware code handling, but docs say code is heavily protected and often passed through.
- Text/log/diff/search compressors: preserve errors, stack traces, summaries, changed lines, and relevant matches.
- IntelligentContext: scores accumulated messages and drops or compresses lower-value content when context overflows.
- CCR: stores originals locally and gives the model a retrieval path when compressed content is insufficient.

## What It Can Compress

Source docs claim coverage for:

- tool outputs
- logs and build/test output
- files and file reads
- JSON arrays/objects
- API/database results
- diffs
- search results
- RAG chunks
- conversations
- images in newer docs, with an ML router

Limitations docs say value is highest for long tool-heavy sessions, JSON/API/DB outputs, build/test logs, and multi-tool agents. It is weaker for short chats, single-turn tasks, code-only sessions, and already-compact grep/search results.

## Reversible Compression / CCR

CCR means Compress-Cache-Retrieve. Headroom stores original content locally when it compresses, emits a hash/marker, and exposes a retrieval tool or handler. The model can request the original by hash or query when details are needed. The pattern is useful because it separates "context carried into the model" from "source available locally on demand."

Codex Workflow fit: CCR is conceptually useful for large tool outputs and logs, but any pilot must verify where originals are stored, how long they persist, and whether sensitive tool output can be redacted or excluded.

## MCP Mode

The MCP docs describe:

- `headroom_compress`: compress content and return a hash plus savings stats.
- `headroom_retrieve`: retrieve full or filtered original content by hash.
- `headroom_stats`: show session stats and proxy stats when available.

MCP fit: candidate only. It is less invasive than proxying all Codex traffic, but still creates local stores/stats and exposes compressed/original content flows through tools. It needs an approval-gated pilot.

## Proxy / Wrapper Mode

The proxy sits between an app/agent and the LLM provider. Wrapper mode can launch agents, including Codex, through the proxy or base URL changes. This is high leverage but high risk because it changes the transport path for provider traffic.

Codex Workflow fit: do not use proxy/wrapper mode by default. Require privacy, network, rollback, logging, telemetry, and auth review first.

## Cross-Agent Memory

Headroom docs describe shared/persistent memory and SharedContext for cross-agent handoffs. The docs mention local SQLite/vector storage and scoping. This overlaps strongly with the user's existing memory, knowledge registry, retrieval index, learning ledgers, and one-way sync model.

Codex Workflow fit: do not replace existing memory/learning systems. Treat Headroom memory as a future comparison/pilot only, and keep any generated stores local-only.

## Failure Learning

`headroom learn` analyzes past agent sessions, correlates failures with later fixes, and writes project-level learnings. Official docs state it can write to `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, and memory files, using marker-delimited sections.

Codex Workflow fit: high conflict risk. The current system already has a learning/error/user-feedback loop and avoids bloating `AGENTS.md`. Any use of `headroom learn` must be dry-run/review-only first and must not write to active workflow files without explicit approval.

## Telemetry / Local Files / Generated State

Source docs say telemetry is enabled by default and can be disabled with `HEADROOM_TELEMETRY=off` or proxy `--no-telemetry`. Docs mention files such as `~/.headroom/proxy_savings.json`, `~/.headroom/session_stats.jsonl`, `~/.headroom/models.json`, possible store URLs, JSONL log files, memory stores, vector stores, and generated learning outputs.

Codex Workflow fit: all Headroom generated state must be treated as local-only unless explicitly reviewed.

## Maturity Signals

- GitHub repo is Apache-2.0 and shows active releases, with latest GitHub release v0.23.0 on 2026-06-04 during research.
- PyPI shows `headroom-ai` 0.23.0 released 2026-06-04, Python >=3.10, beta classifier.
- npm registry query showed `headroom-ai` 0.22.4 and Node >=18, so npm may lag PyPI/GitHub.
- The repo has many stars/forks, but maturity still requires local pilot proof because context-compression quality depends on workload and safety settings.
