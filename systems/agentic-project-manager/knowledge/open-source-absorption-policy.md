# Open-Source Absorption Policy

## Core Rule

Treat an open-source repository as a source to evaluate, not a system to import.

Do not install, clone, copy, activate, or sync anything from a repository unless the user explicitly approves that next step.

## Allowed Uses

- Source reference for current research.
- Pattern extraction for local docs.
- Candidate knowledge blob or capability pack input.
- Tool or MCP evaluation.
- Script design reference.
- Architecture comparison.
- Verification checklist improvement.

## Not Allowed By Default

- Copying raw source files into Codex workflow systems.
- Copying visual assets, brand assets, proprietary text, or large snippets.
- Treating a candidate report as approved reusable knowledge.
- Creating a new skill when a doc/blob/router update is enough.
- Installing dependencies or global tools.
- Adding generated graphs, caches, dashboards, or cloned repos to sync.
- Committing `.understand-anything/`, `.codegraph/`, `.ai-task/`, repo clones, logs, screenshots, or local indexes.

## License And Attribution

Always check the source license before reuse. Prefer extracting abstract patterns, command workflows, public API usage, and compatibility notes. If a direct snippet is required, keep it minimal, attribute it, and ask before adding it to a synced workflow asset.

## Architecture Fit

Map each useful idea to one of these targets:

- Existing skill update
- Existing router rule
- Knowledge blob
- Candidate capability pack
- Tool script
- MCP setup note
- Workflow doc
- AGENTS.md tiny router note
- Skip

Default to the smallest durable target. Do not create a new skill unless existing routing cannot hold the behavior.

## Approval Boundary

The absorption report may recommend an action. It does not approve that action.

Require explicit user approval before:

- Installing or configuring a tool.
- Creating or activating a skill.
- Promoting a candidate pack to active.
- Adding a dependency.
- Syncing derived artifacts.
- Applying code from the source repository.
