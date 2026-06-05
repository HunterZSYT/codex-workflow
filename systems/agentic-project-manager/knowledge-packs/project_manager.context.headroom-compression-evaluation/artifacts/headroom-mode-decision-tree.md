# Headroom Mode Decision Tree

1. Need only source-backed knowledge now?
   - Use candidate pack only. Do not install.

2. Need to compress a single sanitized fixture or app-owned content?
   - Consider Python library first.
   - TypeScript library requires a running proxy per current docs, so it is not the first isolated pilot.

3. Need agent-accessible compression without proxying all provider traffic?
   - Consider MCP candidate.
   - Require local store/log/telemetry review.

4. Need zero-code-change compression for a client?
   - Consider proxy candidate only after privacy/network/rollback review.
   - Disable telemetry unless explicitly accepted.

5. Need to run Codex through Headroom?
   - Treat `headroom wrap codex` as highest-risk.
   - Require explicit approval and a rollback plan.

6. Need failure learning?
   - Use dry-run/review only.
   - Do not let it write to `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` without inspection.
