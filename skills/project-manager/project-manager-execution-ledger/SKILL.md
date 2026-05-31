---
name: project-manager-execution-ledger
description: Use for medium/large tasks, risky tasks, multi-step work, frontend/backend/database/VPS tasks, migrations, template conversions, design-to-code builds, deployment work, or tasks with many constraints. Orchestrates task classification, constraints, roadmap, execution packets, routing, verification, logs, and improvement review.
---

# Project Manager & Execution Ledger

Before deciding whether to add workflow knowledge, consult:
- `C:\Users\acer\.codex\agentic-project-manager\knowledge\capability-orchestration\capability-radar-trigger-policy.blob.md`
- `C:\Users\acer\.codex\agentic-project-manager\knowledge\capability-orchestration\knowledge-blob-policy.blob.md`
- `C:\Users\acer\.codex\agentic-project-manager\knowledge\capability-orchestration\new-skill-vs-blob-policy.blob.md`

Before medium/large/risky/unknown tasks, run Knowledge Sufficiency Gate:
- `node C:\Users\acer\.codex\agentic-project-manager\tools\pm-knowledge-sufficiency.mjs --task "<task>"`

If knowledge is missing, stale, vague, or candidate-only, stage a knowledgebase update first. Do not treat candidate blobs/packs as active implementation rules. If implementation proceeds from candidate knowledge, get user approval.
- `C:\Users\acer\.codex\agentic-project-manager\knowledge\retrieval-policy.md`
- `C:\Users\acer\.codex\agentic-project-manager\knowledge\knowledge-product-policy.md`
- `C:\Users\acer\.codex\agentic-project-manager\knowledge\pack-builder-workflow.md`

Act as a task orchestration layer above specialist skills. Do not replace specialist skills. Decide task type, skills/tools, bundling, isolation, verification, screenshots, database/server approval needs, logging, and stop conditions.

Small tasks do not need heavy roadmap files. Medium/large/risky tasks use `.ai-task` tracking. Always extract hard constraints before editing. Route to specialist skills/tools. Do not run broad QA for narrow tasks. Do not claim success without verification. Track inefficiencies for future improvement.

## Capability Gap Radar

Run Capability Gap Radar for medium, high-risk, unclear, repeated, or tool-evaluation tasks before committing to a workflow. Small/simple tasks proceed normally without tool scouting.

Run Capability Orchestration Radar when knowledge risk exists: external library/tool/package/MCP mentions, multi-capability work, high-risk work, current-doc dependent behavior, or prior vague capability failures. Before implementation, check `C:\Users\acer\.codex\agentic-project-manager\knowledge\knowledge-registry.json` for active blobs that match required capabilities. Use `pm-knowledge-gap.mjs --task "<task>"` and `pm-knowledge-lookup.mjs --term "<term>"` when useful.

Before creating any new skill, blob, script, tool, MCP note, doc, template, or capability pack, run retrieval first. Check exact match, aliases, ranked FTS results, related items, candidate/stale entries, owner skill, and existing artifacts/scripts/tools. Use `pm-knowledge-index.mjs` to rebuild the local index when missing or stale, `pm-knowledge-search.mjs --query "<query>"` for ranked retrieval, and `pm-knowledge-related.mjs --id "<id>"` before deciding a capability is missing. If a candidate blob or related item exists, do not create a duplicate; decide whether to use, update, promote, cross-reference, or leave it as candidate.

If a task asks for a reusable system, design style, animation system, backend pattern, or "fill knowledgebase", route to the pack builder workflow. Create or update a candidate capability pack instead of random instructions. Use source-first research through Context7, official docs, GitHub/npm, standards, or source-safe public examples when external standards/tools/examples are relevant. New packs remain draft/candidate until approved; do not activate or update active routing without user approval.

Ecosystem Scout rule: apply "reuse first, orchestrate second, generate last" for new domains, tools, packages, MCPs, UI/component sources, starter kits, templates, WordPress/WooCommerce/theme/plugin work, animation/motion systems, testing/browser/devtools workflows, design systems, "best stack", "best way", "what should we use", "fill knowledgebase", "add integration knowledge", and production-ready work. Do not research only the exact tool the user named; discover adjacent official docs, repos, GitHub options, registries, component sources, MCPs, starters, templates, and safe public examples. Before creating a blob, pack, script, MCP config, skill, docs, or custom implementation: retrieve local knowledge, scout ecosystems, score options, decide placement, stage candidate knowledge with source ledger, and ask approval before activation.

Open-source absorption rule: when a user provides a GitHub/public repo and asks to absorb it, learn from it, mine it, strip useful patterns, use it as a source, or add it to the system, run the Repo Absorption Workflow. Retrieve local knowledge first, inspect repo/docs/license/maintenance, create a repo absorption report and source absorption ledger, map useful ideas to existing architecture, and ask approval before installing, cloning, copying, activating, promoting, or syncing repo-derived artifacts.

If a required blob is missing or stale, fetch current docs through Context7 when available, otherwise official docs/GitHub/npm; create or update a small blob candidate before implementation. Patch owner skills only with short pointers/routing rules and prefer micro-updates to knowledge blobs over creating new giant skills.

Before creating new workflow knowledge, run indexed retrieval. If an error occurs, log a structured event and candidate patch. If the user corrects behavior, log reusable feedback and a candidate system update. Repeated classes of mistakes should produce a system-level patch proposal, not uncontrolled auto-rewrites.

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

Capability Orchestration Radar output must include: `Capability`, `Existing owner skill`, `Knowledge blob status`, `Docs source needed`, `Existing tool/MCP/script`, `External package/tool`, `Best-practice rules available?`, `Micro-update needed?`, `Approval needed?`, and `Verification`.

Knowledge blob status values: Exists and active, Exists but stale, Candidate exists, Missing, Not needed. If a blob is missing or stale, name the owner skill, docs source to fetch, blob to create/update, and whether implementation should wait for the blob.

Retrieval results must report maturity: `idea`, `candidate_blob`, `researched_blob`, `specification`, `artifact_backed`, `verified_pack`, or `deprecated`. Do not treat candidate/researched guidance as a reusable implementation when artifact paths and apply commands are absent.

When coding, prefer active packs and artifact-backed knowledge products. If only candidate guidance exists, report that implementation requires source verification or user approval before treating it as reusable. Never copy proprietary layouts, assets, code, or raw source dumps; extract reusable principles and create original artifacts.

Public repositories are sources, not imports. Do not copy full source/assets or treat repo-derived reports as approved knowledge. Keep derived artifacts candidate until license-safe reuse and user approval are explicit.

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
