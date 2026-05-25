# Agentic Frontend Global Setup

Global location:

`C:\Users\acer\.codex\agentic-frontend`

This setup provides reusable global tools, MCP configuration, skill prompts, and status reports for future frontend agent work. It does not modify project code.

## Tools

Tools live in:

`C:\Users\acer\.codex\agentic-frontend\tools`

Available scripts:

- `frontend-inspect.mjs`: rendered UI screenshot, viewport emulation, overflow, selector metrics, console/network checks.
- `accessibility-check.mjs`: Playwright + axe accessibility report.
- `performance-check.mjs`: Lighthouse JSON/HTML/Markdown summary.
- `project-capability-scan.mjs`: writes `.ai-task/project-capabilities.md` when run inside a project.
- `component-map.mjs`: writes `.ai-task/component-map.md` when run inside a project.
- `mcp-status-check.mjs`: writes global MCP status.
- `agentic-health-check.mjs`: writes global tool status.

## MCPs

Configured or documented:

- Figma
- shadcn
- Playwright
- Chrome DevTools
- Context7
- Storybook
- Serena placeholder/manual prerequisite
- Magic UI placeholder
- 21st.dev placeholder

See:

- `mcp-status.md`
- `manual-auth-needed.md`

## Skill Prompts

Skill prompt files:

`C:\Users\acer\.codex\agentic-frontend\skill-prompts`

Installed global skills:

- `design-source-grounding`
- `frontend-tool-orchestrator`
- `component-supply-router`
- `codebase-recon-orchestrator`
- `accessibility-gate`
- `performance-triage`
- `motion-quality-router`
- `project-setup-capability-scan`
- `library-first-ui-builder`

## Example Commands

```bash
node ~/.codex/agentic-frontend/tools/agentic-health-check.mjs
node ~/.codex/agentic-frontend/tools/project-capability-scan.mjs
node ~/.codex/agentic-frontend/tools/component-map.mjs
node ~/.codex/agentic-frontend/tools/frontend-inspect.mjs --url http://127.0.0.1:3000 --preset iphone-14-pro-max --out .ai-task/qa
node ~/.codex/agentic-frontend/tools/accessibility-check.mjs --url http://127.0.0.1:3000 --preset desktop --out .ai-task/qa
node ~/.codex/agentic-frontend/tools/performance-check.mjs --url http://127.0.0.1:3000 --out .ai-task/qa
```

## Required Manual Step

Restart Codex after setup. MCP live connection must be verified from Codex after restart.
