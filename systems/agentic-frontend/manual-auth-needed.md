# Manual Auth / Manual Setup Needed

No fake tokens were added.

## Figma

- Configured remote MCP URL: `https://mcp.figma.com/mcp`
- Manual step may be required: authenticate with Figma when Codex/MCP prompts for OAuth.
- Desktop alternative: open Figma Desktop, open a design file, switch to Dev Mode, enable the desktop MCP server, then use `http://127.0.0.1:3845/mcp` if you prefer local desktop MCP.

## Context7

- Configured local stdio package: `npx -y @upstash/context7-mcp@latest`
- Context7 recommends an API key for higher rate limits. No API key was added.
- Optional manual setup: run Context7’s official setup flow or configure a real `CONTEXT7_API_KEY` only if needed.

## Serena

- Installed with `uv tool install`.
- Configured in `C:\Users\acer\.codex\config.toml`.
- Restart Codex before expecting live Serena MCP tools.

## CodeGraph

- Installed with `npm install -g @colbymchenry/codegraph`.
- Configured in `C:\Users\acer\.codex\config.toml`.
- Restart Codex before expecting live CodeGraph MCP tools.
- Project graph data is available only after running `codegraph init` / `codegraph index` inside a specific project.

## Storybook

- Configured as project-dependent URL: `http://127.0.0.1:6006/mcp`
- A project must install `@storybook/addon-mcp` and run Storybook for this to work.

## 21st.dev Magic

- Skipped. This can require an API key/token.
- Configure only after obtaining a real key and current official Codex-compatible instructions.

## Magic UI

- Skipped as a global Codex MCP entry because official setup is IDE-specific in the checked docs.
- Use the official Magic UI CLI for the target IDE when needed.
