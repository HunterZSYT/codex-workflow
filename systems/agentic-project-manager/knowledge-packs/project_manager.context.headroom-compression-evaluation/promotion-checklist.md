# Promotion Checklist

Do not promote this pack until all items pass.

- User explicitly approves activation.
- Headroom package metadata is refreshed from GitHub, PyPI, npm, and official docs.
- License and NOTICE requirements are reviewed.
- Telemetry default and opt-out are verified live.
- Generated file paths are verified live in a sandbox.
- Sync/redaction ignore notes are updated only for verified paths.
- Pilot runs on sanitized fixtures only.
- Pilot compares Headroom to current retrieval/log filtering and Project Manager learning practices.
- MCP/proxy/wrapper modes are evaluated separately.
- `headroom learn` is dry-run only unless user approves writes after reviewing output.
- Rollback plan is tested.
- `pm-pack-audit.mjs` reports ready for approval review.
