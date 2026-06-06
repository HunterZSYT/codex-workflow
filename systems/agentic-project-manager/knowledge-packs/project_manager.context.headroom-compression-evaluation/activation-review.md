# Activation Review

Activation state: active global context layer.

Approved scope:
- SDK/tool mode through existing Project Manager tools.
- Local service mode through `headroom proxy` on `127.0.0.1:8787` with telemetry off, learning off, and stateless mode.
- Explicit context analysis with `pm-headroom-context.mjs --mode analyze`.
- Service-backed simulation/compression with `pm-headroom-context.mjs --mode simulate|compress --timeout-ms 30000` after health is green.
- Automatic consideration for large logs, huge tool outputs, large context files, repo absorption source material, and research artifacts.

Boundaries:
- Raw sources and official source ledgers remain canonical evidence.
- Headroom output is context optimization only.
- Secret-looking files are refused unless the user explicitly approves and `--force` is passed.
- MCP, Codex provider proxy/wrapper, persistent memory, and `headroom learn` remain pending expansion modes.
- Headroom must not write to `AGENTS.md` or workflow policy files.
- Raw Headroom stores, caches, logs, and session dumps must not sync into `codex-workflow`.

Current runtime note:
- The npm SDK is installed in Project Manager tools.
- The Python proxy service is installed in the isolated Project Manager Python 3.11 runtime.
- Service health was verified at `http://127.0.0.1:8787/health` on 2026-06-06.
- Synthetic service-backed simulation returned successfully; zero savings on protected/small fixtures should be treated as "service active, input not reduced," not as a service failure.
