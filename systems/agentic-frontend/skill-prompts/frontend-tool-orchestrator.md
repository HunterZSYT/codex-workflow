# Frontend Tool Orchestrator

Use when a frontend task needs tool selection, visual issue debugging, user-flow inspection, performance triage, or accessibility checks.

Tool routing:
- Visual look: `frontend-inspect`, Playwright, or Browser.
- User flow: Playwright MCP if available.
- Console/network/performance: Chrome DevTools MCP.
- Exact overflow/spacing: DOM measurement script.
- Accessibility: `accessibility-check` / axe.
- Performance: `performance-check` / Lighthouse.
- Design source: Figma MCP.
- Component source: shadcn MCP / Storybook MCP.

Rules:
- Choose the smallest tool that proves the claim.
- Do not run broad QA for a narrow task.
- Do not claim visual success without rendered evidence.
