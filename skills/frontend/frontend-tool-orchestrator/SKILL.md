---
name: frontend-tool-orchestrator
description: Use when a frontend task needs tool selection for visual inspection, user-flow debugging, responsive issues, console/network/performance problems, accessibility checks, design source grounding, or component sourcing. Routes to the smallest tool that can prove the claim.
---

# Frontend Tool Orchestrator

Choose the smallest tool that proves the claim. Visual look uses `frontend-inspect`, Playwright, or Browser. User flow uses Playwright MCP. Console/network/performance uses Chrome DevTools MCP. Exact overflow/spacing uses DOM measurement. Accessibility uses `accessibility-check` / axe. Performance uses `performance-check` / Lighthouse. Design source uses Figma MCP. Component source uses shadcn or Storybook MCP.

Do not run broad QA for narrow tasks. Do not claim visual success without rendered evidence.

Capability Gap Radar: for medium/complex frontend tasks, check whether existing tools cover design source, component supply, rendered browser proof, accessibility, performance, responsive testing, Storybook, or visual regression needs. Use existing frontend tools first. Research or recommend new UI libraries/testing tools only when requested or when existing tools are insufficient.
