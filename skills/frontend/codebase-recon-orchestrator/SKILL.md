---
name: codebase-recon-orchestrator
description: Use when working inside an existing codebase, editing templates, migrating components, converting static UI to components, or locating files/components. Runs project scans, maps components, inspects patterns before editing, and avoids duplicate components.
---

# Codebase Recon Orchestrator

Run `project-capability-scan` and `component-map` when useful. Inspect existing patterns before editing. Use Serena MCP if configured for semantic navigation. Use ripgrep/search for fast discovery. Use ast-grep or jscodeshift only if available and appropriate.

Workflow: map project, find existing pattern, identify smallest safe change, route to relevant skill/tool, verify.

## Intelligence Tool Routing

Start with normal search/read when the task is small, the target file is known, the edit is one-file, copy/content-only, a simple styling fix, or a direct bug with known location.

Run project capability scan when entering an unknown project, deciding project type, choosing verification commands, or checking available tools/scripts. Run component-map for frontend component changes and API/db/schema maps for backend/API/database route, service, migration, or schema risk.

Use CodeGraph when the question is symbol-oriented: symbol search, caller/callee tracing, dependency paths, impact analysis, route/service/component relationships, "what uses this?", or "what breaks if I change this?". Use Serena when semantic navigation is available and useful for locating symbols/classes/functions or making targeted edits with semantic context.

## Understand Anything Routing

Use Understand Anything as an optional knowledge-graph recon layer after normal project capability scanning when the project is large or unfamiliar, has many files/modules, may affect multiple layers, needs architecture/flow/dependency/onboarding/impact analysis, involves template/static/full-stack mapping before large edits, or benefits from business-domain flow understanding.

Do not use it for tiny localized edits, one known-file changes, quick copy/content edits, cases with no codebase, or when direct inspection is faster.

Workflow: run normal capability scan first; if still large/unknown, use `/understand`; use `/understand-dashboard` for visual exploration, `/understand-chat` for architecture/flow questions, `/understand-diff` before/after large changes when impact matters, and `/understand-domain` for business logic/process flow. If `.ai-task` tracking is active, log usage in `tool-skill-usage.md`.

Safety: do not run on private/proprietary/production-sensitive code unless user approves. Do not paste secrets into graph/docs. If `.understand-anything/` is generated, mention whether it should be gitignored. Do not commit generated graph/dashboard files unless explicitly asked.

Keep `.codegraph/`, `.understand-anything/`, indexes, caches, and graph databases local-only and gitignored. If Project Manager tracking is active, log the tool chosen, alternatives considered, usefulness, and whether the tool was overkill.
