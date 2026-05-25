---
name: project-manager-execution-ledger
description: Use for medium/large tasks, risky tasks, multi-step work, frontend/backend/database/VPS tasks, migrations, template conversions, design-to-code builds, deployment work, or tasks with many constraints. Orchestrates task classification, constraints, roadmap, execution packets, routing, verification, logs, and improvement review.
---

# Project Manager & Execution Ledger

Act as a task orchestration layer above specialist skills. Do not replace specialist skills. Decide task type, skills/tools, bundling, isolation, verification, screenshots, database/server approval needs, logging, and stop conditions.

Small tasks do not need heavy roadmap files. Medium/large/risky tasks use `.ai-task` tracking. Always extract hard constraints before editing. Route to specialist skills/tools. Do not run broad QA for narrow tasks. Do not claim success without verification. Track inefficiencies for future improvement.

## Capability Gap Radar

Run Capability Gap Radar for medium, high-risk, unclear, repeated, or tool-evaluation tasks before committing to a workflow. Small/simple tasks proceed normally without tool scouting.

Record a short capability check when useful:

- Task type
- Existing matching skills/tools
- Need current-source research
- Need specialized tool/MCP/library
- Candidate capability
- Use existing setup or recommend upgrade
- Risk level
- Approval needed before install/config change
- Next action

Tool installation/configuration always requires explicit approval. Database, server, deployment, auth, SSH, and migration tasks require read-only inspection first. If existing tools are enough, proceed without scouting.

## Knowledge-Graph Recon Routing

After normal project capability scan, route large/unfamiliar/multi-layer codebase tasks to `codebase-knowledge-graph-recon` and Understand Anything. Use `/understand` to build the graph, `/understand-dashboard` for visual exploration, `/understand-chat` for architecture/flow questions, `/understand-diff` for impact analysis around large changes, and `/understand-domain` when business process flow matters.

Do not use Understand Anything for tiny localized edits, one known-file changes, copy/content-only tasks, or when no codebase exists. Log whether it was used in `.ai-task/tool-skill-usage.md` when Project Manager tracking is active.

Safety: require user approval before running on private/proprietary/production-sensitive code. Do not expose secrets. Do not commit `.understand-anything/` outputs unless explicitly asked.

## Tool Selection and Auto-Optimization

Default rule: start with the cheapest reliable method. Escalate only when the task needs more context, precision, or impact analysis.

Use normal search/read first for small tasks, known target files, one-file edits, copy/content changes, simple styling fixes, and direct bugs with known locations.

Use project capability scans when entering an unknown project, deciding frontend/backend/project type, choosing verification commands, or checking available scripts/tools. Use `component-map` when adding/modifying frontend components or avoiding duplicate UI. Use API/db/schema maps for backend/API/database route, service, migration, and schema risk work.

Use Understand Anything for big-picture architecture, onboarding/explanation, business/domain flow, large unfamiliar projects, and documentation-style summaries. Use CodeGraph for symbol search, caller/callee tracing, dependency paths, impact analysis, route/service/component relationship tracing, "what uses this?", and "what breaks if I change this?". Use Serena when semantic code navigation is available and useful for locating symbols/classes/functions or making targeted edits with semantic context.

Escalation budget: small tasks use direct inspection only unless search fails; medium tasks run capability scan first and at most one intelligence tool if needed; large/risky/unknown tasks use Project Manager tracking, capability scan, one best intelligence tool, and log why. Avoid running multiple heavy tools unless the first fails or the task needs both high-level explanation and precise symbol tracing.

When `.ai-task` tracking is active, log tool chosen, why chosen, alternatives considered, whether it reduced search/read loops, whether it found the needed context, whether it was overkill, and whether routing rules should change.

## User Response Ledger

During iterative work, append a short sanitized entry to `.ai-task/user-response-ledger.md` when the user approves work, rejects work, asks for a modification, reports a bug, changes scope, gives a style/content/workflow preference, makes a decision, or gives a reusable rule candidate.

Do not log every user message. Log only task-relevant feedback signals. Store summarized feedback, not full transcripts. Redact or skip secrets, credentials, auth details, private URLs, database URLs, cookies, sensitive logs, and private screenshots.

Repeated feedback or explicit reusable-rule language may become a learning candidate after review. Do not rewrite skills from one response.

## Error and Failure Learning

For medium/large/risky tasks, capture failed commands, wrong tool choices, weak verification, loop failures, safety risks, and environment failures with `pm-log-error.mjs`. Review `.ai-task/error-ledger.md`, `.ai-task/failed-commands.md`, and `.ai-task/decision-review.md` at completion.

Do not automatically rewrite skills after a one-off error. Log one-off errors only. For repeated patterns, create improvement candidates. For high-severity safety issues, immediately propose a safety update and require user approval before applying it.

Completion reports should include a Learning Review: errors encountered, mistake category, tool/skill routing lesson, proposed improvement, apply now or backlog, and whether sanitized lessons are safe to sync to `codex-workflow`.
