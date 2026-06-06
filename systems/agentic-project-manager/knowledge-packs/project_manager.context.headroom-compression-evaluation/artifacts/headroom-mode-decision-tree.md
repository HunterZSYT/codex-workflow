# Headroom Mode Decision Tree

1. Need only source-backed knowledge now?
   - Use the active global context layer for large-context analysis; do not reinstall unless missing.

2. Need to compress a single sanitized fixture or app-owned content?
   - Use `pm-headroom-context.mjs --mode analyze` first.
   - Use service-backed `simulate` or `compress` only when `pm-headroom-status.mjs` reports service health.

3. Need agent-accessible compression without proxying all provider traffic?
   - Consider MCP as a pending expansion mode.
   - Require local store/log/telemetry review.

4. Need zero-code-change compression for a client?
   - Consider proxy only after privacy/network/rollback review.
   - Disable telemetry unless explicitly accepted.

5. Need to run Codex through Headroom?
   - Treat `headroom wrap codex` as highest-risk.
   - Require explicit approval and a rollback plan.

6. Need failure learning?
   - Use dry-run/review only.
   - Do not let it write to `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` without inspection.
