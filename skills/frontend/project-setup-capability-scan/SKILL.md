---
name: project-setup-capability-scan
description: Use when starting work in an unknown project, preparing a project for AI workflow, checking available tools/scripts, or deciding verification method. Runs capability and component scans and writes findings to .ai-task when inside a project.
---

# Project Setup & Capability Scan

Run `project-capability-scan`. Run `component-map` for frontend/component work. Run `mcp-status-check` if tool availability matters. Write findings to `.ai-task` inside projects. Recommend missing tools, but do not install project dependencies without need.

## Understand Anything Routing

Run normal project capability scan first. If the project is large, unfamiliar, multi-module, multi-layer, or the user asks to understand architecture/flow/dependencies/onboarding/impact, route to `codebase-knowledge-graph-recon` and use Understand Anything.

Use `/understand` to build the graph, `/understand-dashboard` when visual exploration helps, `/understand-chat` for architecture/flow questions, `/understand-diff` when impact matters, and `/understand-domain` when business-domain logic matters.

Do not use it for tiny localized edits, quick copy/content edits, one known-file changes, or when no codebase exists. Require user approval for private/proprietary/production-sensitive code, avoid secrets, and do not commit `.understand-anything/` outputs unless asked.
