# Activation Review

Activation state: active global context layer.

Approved scope:
- SDK/tool mode through existing Project Manager tools.
- Explicit context analysis with `pm-headroom-context.mjs --mode analyze`.
- Automatic consideration for large logs, huge tool outputs, large context files, repo absorption source material, and research artifacts.

Boundaries:
- Raw sources and official source ledgers remain canonical evidence.
- Headroom output is context optimization only.
- Secret-looking files are refused unless the user explicitly approves and `--force` is passed.
- MCP, service, proxy, wrapper, and `headroom learn` remain pending expansion modes.
- Headroom must not write to `AGENTS.md` or workflow policy files.
- Raw Headroom stores, caches, logs, and session dumps must not sync into `codex-workflow`.

Current runtime note:
- The npm SDK is installed in Project Manager tools.
- Service-backed compression may still report service not reachable until a Headroom endpoint is configured.
