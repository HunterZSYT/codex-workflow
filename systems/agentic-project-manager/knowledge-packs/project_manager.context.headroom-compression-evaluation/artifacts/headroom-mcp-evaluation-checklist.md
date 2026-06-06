# Headroom MCP Evaluation Checklist

- Approval granted for MCP expansion.
- Install mode reviewed and limited to MCP/proxy extras if needed.
- Live config changes are kept outside Git.
- MCP server can be removed cleanly.
- Tools exposed are understood:
  - `headroom_compress`
  - `headroom_retrieve`
  - `headroom_stats`
- Local store/stat paths are recorded.
- Telemetry is disabled unless explicitly accepted.
- No secrets are sent through compression fixtures.
- Retrieval of originals is tested.
- MCP does not become a default dependency.
- `codex-workflow` docs mention it only as optional/manual setup if approved later.
