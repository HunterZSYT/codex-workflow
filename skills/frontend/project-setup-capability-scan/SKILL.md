---
name: project-setup-capability-scan
description: Use when starting work in an unknown project, preparing a project for AI workflow, checking available tools/scripts, or deciding verification method. Runs capability and component scans and writes findings to .ai-task when inside a project.
---

# Project Setup & Capability Scan

Run `project-capability-scan`. Run `component-map` for frontend/component work. Run `mcp-status-check` if tool availability matters. Write findings to `.ai-task` inside projects. Recommend missing tools, but do not install project dependencies without need.

## Tool Escalation Budget

Start with the cheapest reliable method. For small tasks, use direct search/read only and do not run CodeGraph or Understand Anything unless direct search fails. For medium tasks, run capability scan first and use one intelligence tool if needed. For large/risky/unknown tasks, use Project Manager tracking, run capability scan, choose the best intelligence tool, and log why.

Use CodeGraph for symbol search, caller/callee tracing, dependency paths, route/service/component relationship tracing, impact analysis, "what uses this?", or "what breaks if I change this?". Use Serena when semantic code navigation is available and useful for symbols/classes/functions across a large repo.

## Understand Anything Routing

Run normal project capability scan first. If the project is large, unfamiliar, multi-module, multi-layer, or the user asks to understand architecture/flow/dependencies/onboarding/impact, route to `codebase-knowledge-graph-recon` and use Understand Anything.

Use `/understand` to build the graph, `/understand-dashboard` when visual exploration helps, `/understand-chat` for architecture/flow questions, `/understand-diff` when impact matters, and `/understand-domain` when business-domain logic matters.

Do not use it for tiny localized edits, quick copy/content edits, one known-file changes, or when no codebase exists. Require user approval for private/proprietary/production-sensitive code, avoid secrets, and do not commit `.understand-anything/` outputs unless asked.

Keep `.codegraph/`, `.understand-anything/`, generated indexes, caches, and graph databases local-only and gitignored.
