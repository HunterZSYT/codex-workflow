# Improvement Notes

- Install `uv` / `uvx` before enabling Serena MCP.
- Restart Codex to load newly configured MCP servers and skills.
- Verify MCP server connectivity from Codex after restart; config presence is not proof of live tool availability.
- Consider adding project-level `.ai-task` outputs only inside actual projects.
- Add real API keys only through the relevant tool’s secure/manual auth flow; do not hardcode secrets into `config.toml`.
- For Storybook MCP, install and run it per project rather than assuming a global server exists.
