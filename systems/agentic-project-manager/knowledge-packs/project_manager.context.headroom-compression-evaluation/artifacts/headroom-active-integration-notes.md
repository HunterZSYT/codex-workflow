# Headroom Active Integration Notes

Status: active global context layer in SDK/tool mode.

Approved scope:
- Install `headroom-ai` in `C:\Users\acer\.codex\agentic-project-manager\tools`.
- Use `pm-headroom-status.mjs` to verify SDK, runtime, and service state.
- Use `pm-headroom-context.mjs` automatically for large context/log/tool-output/repo-absorption/research-artifact analysis.
- Use service-backed `simulate` or `compress` only when a Headroom endpoint is reachable.

Not active yet:
- Codex proxy/wrapper routing.
- Headroom MCP server registration.
- `headroom learn` writes to `AGENTS.md`, `CLAUDE.md`, or similar context files.
- Automatic compression of all Project Manager output.

Current Windows service blocker:
- Python package install for `headroom-ai` 0.23.0 fails on this machine because the Rust build requires the MSVC linker `link.exe`.
- Docker is not installed.
- The npm SDK installs cleanly but service-backed compression calls `http://localhost:8787` unless `HEADROOM_BASE_URL` points to a running endpoint.

- Treat Headroom as active for SDK/tool mode context analysis even when `service.reachable` is false.
- If service health is green, `pm-headroom-context.mjs --mode simulate` may be used before compression to check savings and risk.
- Do not route provider traffic through Headroom without a rollback command and a before/after task transcript.
