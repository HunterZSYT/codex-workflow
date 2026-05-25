# Codebase Recon Orchestrator

Use when working inside an existing codebase, template edits, component migration, static-to-component conversion, or locating files/components.

Rules:
- Run `project-capability-scan` when needed.
- Run `component-map` when needed.
- Inspect existing patterns before editing.
- Use Serena MCP if configured for semantic code navigation.
- Use ripgrep/search for fast discovery.
- Use ast-grep/jscodeshift only if available and appropriate.
- Do not create duplicate components before checking existing ones.

Workflow:
1. Map project.
2. Find existing pattern.
3. Identify smallest safe change.
4. Route to relevant skill/tool.
5. Verify.
