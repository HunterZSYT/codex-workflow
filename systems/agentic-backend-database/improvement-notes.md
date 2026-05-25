# Improvement Notes

- Install `uv` / `uvx` before enabling Serena MCP.
- Install DB CLIs only when needed for a specific project or server task.
- Install Docker Desktop or Docker CLI only if future tasks require local container inspection.
- Install `jq` for better JSON log/API processing.
- Install `rsync` only if backup/deployment sync workflows require it.
- Restart Codex to load new skills and any MCP config already present.
- Verify live MCP tools after restart; config presence is not proof of a working live connection.
- Keep production credentials out of global config.
