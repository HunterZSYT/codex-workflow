# Headroom Active Integration Notes

Status: active global context layer in SDK/tool mode and local service mode.

Approved scope:
- Install `headroom-ai` in `C:\Users\acer\.codex\agentic-project-manager\tools`.
- Use `pm-headroom-status.mjs` to verify SDK, runtime, and service state.
- Use `pm-headroom-context.mjs` automatically for large context/log/tool-output/repo-absorption/research-artifact analysis.
- Use service-backed `simulate` or `compress` only when `pm-headroom-status.mjs` reports service health.

Not active yet:
- Codex proxy/wrapper routing.
- Headroom MCP server registration.
- `headroom learn` writes to `AGENTS.md`, `CLAUDE.md`, or similar context files.
- Automatic compression of all Project Manager output.

Current Windows service state:
- Visual Studio Build Tools 2022 with VC tools are installed.
- Python `headroom-ai[proxy]` 0.23.0 is installed in the isolated Project Manager Python 3.11 runtime.
- Local service health was verified at `http://127.0.0.1:8787/health` on 2026-06-06.
- The service is started with telemetry off, learning off, and stateless mode.
- Docker is not installed and is not required for the active local service mode.

- Treat Headroom as active for SDK/tool mode context analysis even when `service.reachable` is false; service-backed simulation/compression requires green health.
- If service health is green, `pm-headroom-context.mjs --mode simulate --timeout-ms 30000` may be used before compression to check savings and risk.
- Do not route provider traffic through Headroom without a rollback command and a before/after task transcript.
