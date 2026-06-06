# Specs

## Trigger Terms

Route to this active global context layer when a request includes:

- headroom
- context compression
- token compression
- compress tool outputs
- compress logs
- huge output
- large context
- large log analysis
- large tool output
- summarize logs
- analyze huge output
- reduce tokens
- context optimization
- repo absorption context analysis
- research artifact context analysis
- reversible compression
- CCR
- cross-agent memory
- headroom learn
- wrap codex
- proxy compression
- MCP compression

## Required Behavior

- Automatically consider Headroom for large context/log/tool-output/research artifact analysis.
- Use Headroom for context optimization, not as the only source of truth.
- Preserve raw source paths separately.
- Do not use Headroom when exact raw text/code fidelity is required.
- Do not use Headroom on secret-looking files unless the user explicitly approves and `--force` is passed.
- Compare Headroom against cheaper practices when the content is small: narrower search, log filtering, artifact summaries, retrieval index, and task-local ledgers.
- Require approval before running Docker, configuring MCP, starting proxy, wrapping Codex, or running `headroom learn`.

## Generated/Local-Only Paths

Keep these local-only and never sync raw Headroom stores/caches/logs:

- `~/.headroom/`
- `.headroom/`
- `headroom.jsonl`
- `headroom*.log`
- `proxy_savings.json`
- `session_stats.jsonl`
- `models.json`
- `headroom.db`
- `*.headroom.db`
- Headroom SQLite/vector stores
- compressed/original CCR stores
- proxy traces
- agent session dumps
- generated failure-learning outputs unless reviewed
- any token/auth/env/config files

Exact paths must be verified before changing `.gitignore` or sync/redaction policy.

## Approval Gates

Approval required before:

- reinstalling `headroom-ai` if already present
- pulling/running Docker images
- configuring a Headroom MCP server
- running a Headroom proxy
- wrapping Codex or another agent
- running `headroom learn`
- letting any tool write to `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or workflow policy files
- adding sync ignore/redaction rules based on unverified generated paths
- using Headroom on secret-looking files

## Active Layer Acceptance Criteria

The global context layer should show:

- measurable token reduction on sanitized representative outputs
- no loss of required error/context details
- clear retrieval of originals through CCR when needed
- telemetry disabled or explicitly accepted
- no secrets in logs/stores
- no writes to active workflow files without approval
- clean rollback: remove MCP/proxy/wrapper/config and generated stores
