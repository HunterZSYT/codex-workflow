# Generated Knowledge Graph Sync Policy

Default: local-only.

Never sync without explicit approval:

- `.understand-anything/`
- graph JSON databases
- intermediate analysis files
- diff overlays
- dashboards
- generated screenshots
- logs

If the user explicitly wants graph artifacts committed, run redaction review, size review, license/source review, and repo-specific approval first.
