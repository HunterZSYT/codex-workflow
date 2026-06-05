# Specs

## Trigger Terms

Route to this candidate pack when a request includes:

- headroom
- context compression
- token compression
- compress tool outputs
- compress logs
- reversible compression
- CCR
- cross-agent memory
- headroom learn
- wrap codex
- proxy compression
- MCP compression

## Required Behavior

- Scan existing retrieval/learning practices before recommending Headroom.
- Treat Headroom as candidate knowledge unless explicit approval is given.
- Compare Headroom against cheaper practices first: narrower search, log filtering, artifact summaries, retrieval index, and task-local ledgers.
- Require approval before installing Python/npm packages, running Docker, configuring MCP, starting proxy, wrapping Codex, or running `headroom learn`.
- Require telemetry decision before any pilot. Default pilot setting should disable telemetry.
- Require generated-file ignore plan before any pilot.

## Candidate Generated/Local-Only Paths

Use as candidate ignore notes if Headroom is piloted later:

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

Exact paths must be verified during a pilot before changing `.gitignore` or sync/redaction policy.

## Approval Gates

Approval required before:

- installing `headroom-ai` from PyPI or npm
- pulling/running Docker images
- configuring a Headroom MCP server
- running a Headroom proxy
- wrapping Codex or another agent
- running `headroom learn`
- letting any tool write to `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or workflow policy files
- adding sync ignore/redaction rules based on unverified generated paths
- promoting this pack to active

## Pilot Acceptance Criteria

A future pilot must show:

- measurable token reduction on sanitized representative outputs
- no loss of required error/context details
- clear retrieval of originals through CCR when needed
- telemetry disabled or explicitly accepted
- no secrets in logs/stores
- no writes to active workflow files without approval
- clean rollback: remove MCP/proxy/wrapper/config and generated stores
