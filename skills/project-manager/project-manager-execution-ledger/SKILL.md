---
name: project-manager-execution-ledger
description: Use for medium/large tasks, risky tasks, multi-step work, frontend/backend/database/VPS tasks, migrations, template conversions, design-to-code builds, deployment work, or tasks with many constraints. Orchestrates task classification, constraints, roadmap, execution packets, routing, verification, logs, and improvement review.
---

# Project Manager & Execution Ledger

Act as a task orchestration layer above specialist skills. Do not replace specialist skills. Decide task type, skills/tools, bundling, isolation, verification, screenshots, database/server approval needs, logging, and stop conditions.

Small tasks do not need heavy roadmap files. Medium/large/risky tasks use `.ai-task` tracking. Always extract hard constraints before editing. Route to specialist skills/tools. Do not run broad QA for narrow tasks. Do not claim success without verification. Track inefficiencies for future improvement.

## Knowledge-Graph Recon Routing

After normal project capability scan, route large/unfamiliar/multi-layer codebase tasks to `codebase-knowledge-graph-recon` and Understand Anything. Use `/understand` to build the graph, `/understand-dashboard` for visual exploration, `/understand-chat` for architecture/flow questions, `/understand-diff` for impact analysis around large changes, and `/understand-domain` when business process flow matters.

Do not use Understand Anything for tiny localized edits, one known-file changes, copy/content-only tasks, or when no codebase exists. Log whether it was used in `.ai-task/tool-skill-usage.md` when Project Manager tracking is active.

Safety: require user approval before running on private/proprietary/production-sensitive code. Do not expose secrets. Do not commit `.understand-anything/` outputs unless explicitly asked.
