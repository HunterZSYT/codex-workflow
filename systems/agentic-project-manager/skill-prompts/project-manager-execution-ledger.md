# Project Manager & Execution Ledger

Use this skill for medium/large tasks, risky tasks, multi-step tasks, frontend/backend/database/VPS tasks, migrations, template conversions, design-to-code builds, deployment work, or tasks with many constraints.

Purpose: act as a task orchestration layer above coding/design/backend/frontend skills.

This skill does not replace specialist skills. It decides what kind of task this is, what skills/tools to use, what to bundle, what to isolate, when to verify, when screenshots are needed, when database/server approval is required, what to log, and when to stop.

Core rules:
- Small tasks do not need heavy roadmap files.
- Medium/large/risky tasks use `.ai-task` tracking.
- Always extract hard constraints before editing.
- Run Capability Gap Radar for medium, high-risk, unclear, or tool-evaluation tasks before committing to a workflow.
- Run Capability Orchestration Radar when knowledge risk exists: external library/tool/package/MCP mentions, multi-capability work, high-risk work, current-doc dependent behavior, or prior vague capability failures.
- Before medium/large/risky/unknown tasks, run Knowledge Sufficiency Gate with `pm-knowledge-sufficiency.mjs --task "<task>"`.
- Before implementation, check `C:\Users\acer\.codex\agentic-project-manager\knowledge\knowledge-registry.json` for active blobs that match required capabilities.
- If knowledge is missing, stale, vague, or candidate-only, stage a knowledgebase update first.
- Do not treat candidate blob/pack as active implementation rule; get user approval if proceeding from candidate knowledge.
- If a required blob is missing or stale, fetch current docs through Context7 when available, otherwise official docs/GitHub/npm; create or update a small blob candidate before implementation.
- Before deciding whether to create a new skill, consult `C:\Users\acer\.codex\agentic-project-manager\knowledge\capability-orchestration\new-skill-vs-blob-policy.blob.md`.
- Before creating a new skill/blob/pack/script, run indexed retrieval.
- If an error occurs, log structured event and candidate patch; if user corrects behavior, log user feedback and candidate system update.
- Use `pm-knowledge-gap.mjs --task "<task>"` and `pm-knowledge-lookup.mjs --term "<term>"` for knowledge lookup when useful.
- Before creating any new skill, blob, script, tool, MCP note, doc, template, or capability pack, run retrieval first. Check exact match, aliases, ranked FTS results, related items, candidate/stale entries, owner skill, and existing artifacts/scripts/tools. Use `pm-knowledge-index.mjs` to rebuild the local index when missing or stale, `pm-knowledge-search.mjs --query "<query>"` for ranked retrieval, and `pm-knowledge-related.mjs --id "<id>"` before deciding a capability is missing.
- If a candidate blob or related item exists, do not create a duplicate; decide whether to use, update, promote, cross-reference, or leave it as candidate.
- If a task asks for a reusable system, design style, animation system, backend pattern, or "fill knowledgebase", route to the pack builder workflow. Create or update a candidate capability pack instead of random instructions. Use source-first research through Context7, official docs, GitHub/npm, standards, or source-safe public examples when external standards/tools/examples are relevant. New packs remain draft/candidate until approved; do not activate or update active routing without user approval.
- Patch owner skills only with short pointers/routing rules; prefer micro-updates to knowledge blobs over creating new giant skills.
- Always route to relevant specialist skills/tools.
- Do not run broad QA for narrow tasks.
- Do not claim success without verification.
- Track inefficiencies for future improvement.

Capability Gap Radar:
- Small/simple tasks proceed normally without tool scouting.
- Medium tasks do a quick capability check using existing skills/tools.
- Complex, repeated, unclear, or high-risk tasks inspect existing setup and recommend research/tooling only when useful.
- Tool installation or configuration always requires explicit approval.
- Database, server, deployment, auth, SSH, or migration tasks require read-only inspection first.
- Capability checks should record task type, existing matching skills/tools, need for current-source research, need for specialized tool/MCP/library, candidate capability, whether to use existing setup or recommend upgrade, risk level, approval need, and next action.
- Capability Orchestration Radar must include: `Capability`, `Existing owner skill`, `Knowledge blob status`, `Docs source needed`, `Existing tool/MCP/script`, `External package/tool`, `Best-practice rules available?`, `Micro-update needed?`, `Approval needed?`, and `Verification`.
- Knowledge blob status values are: Exists and active, Exists but stale, Candidate exists, Missing, Not needed.
- Retrieval results must report maturity: `idea`, `candidate_blob`, `researched_blob`, `specification`, `artifact_backed`, `verified_pack`, or `deprecated`.
- Do not treat candidate/researched guidance as a reusable implementation when artifact paths and apply commands are absent.
- When coding, prefer active packs and artifact-backed knowledge products. If only candidate guidance exists, report that implementation requires source verification or user approval before treating it as reusable. Never copy proprietary layouts, assets, code, or raw source dumps; extract reusable principles and create original artifacts.
- If a blob is missing or stale, name the owner skill, docs source to fetch, blob to create/update, and whether implementation should wait for the blob.

Tool selection and auto-optimization:
- Default to the cheapest reliable method, then escalate only when more context, precision, or impact analysis is needed.
- Small tasks use normal search/read; do not run CodeGraph or Understand Anything unless direct search fails.
- Medium tasks run capability scan first and use one intelligence tool if needed.
- Large/risky/unknown tasks use `.ai-task` tracking, run capability scan, choose the best intelligence tool, and log why.
- Use Understand Anything for architecture, onboarding, explanation, business/domain flow, and documentation-style understanding.
- Use CodeGraph for symbol search, caller/callee tracing, dependency paths, impact analysis, route/service/component relationship tracing, "what uses this?", and "what breaks if I change this?".
- Use Serena when semantic code navigation is available and useful for symbols/classes/functions or targeted edits.
- Avoid running multiple heavy tools unless the first fails or the task requires both high-level explanation and precise symbol tracing.
- Keep `.codegraph/`, `.understand-anything/`, generated indexes, caches, and graph databases local-only and gitignored.

Task lifecycle: classify task, extract hard constraints, decide tracking level, create/update roadmap, pick next packet, execute smallest safe packet, verify appropriately, log execution, log tools/skills, log inefficiencies, continue only if scope allows, then complete report.

Routing: frontend visual/layout -> frontend-tool-orchestrator plus visual skills; component/UI -> component-supply-router and library-first-ui-builder; design/Figma -> design-source-grounding; accessibility -> accessibility-gate; performance -> frontend or backend performance triage; backend/API -> backend-database-tool-orchestrator and api-contract-orchestrator; database/SQL -> database-safety-orchestrator and sql-operations-gate; VPS/SSH -> vps-ssh-operations-gate; deployment -> deployment-readiness-gate; env/secrets -> security-env-secrets-gate.

Verification: copy-only no screenshot by default; frontend visual requires rendered evidence; mobile claims require mobile emulation; backend/API uses tests/build/typecheck/smoke test; database uses read-only inspection and safety checks; VPS/server uses read-only inspection and command preview before changes.

Tool usage logging should include tool chosen, why chosen, alternatives considered, whether it reduced search/read loops, whether it found needed context, whether it was overkill, and whether routing rules should change.

User Response Ledger:
- During iterative work, append short sanitized entries to `.ai-task/user-response-ledger.md` when the user approves work, rejects work, asks for a modification, reports a bug, changes scope, gives a style/content/workflow preference, makes a decision, or gives a reusable rule candidate.
- Do not log every user message. Log only task-relevant feedback signals.
- Store summarized feedback, not full transcripts.
- Redact or skip secrets, credentials, auth details, private URLs, database URLs, cookies, sensitive logs, and private screenshots.
- Repeated feedback or explicit reusable-rule language may become a learning candidate after review; do not rewrite skills from one response.

Error and learning review:
- Use `pm-log-error.mjs` for failed commands, wrong tool choices, weak verification, loop failures, safety risks, and environment failures.
- At completion for medium/large/risky tasks, review `.ai-task/error-ledger.md`, `.ai-task/failed-commands.md`, and `.ai-task/decision-review.md`.
- Classify failures, identify recurrence, and propose updates only after repeated patterns or high-severity safety issues.
- Do not automatically edit skills after a one-off error.
- Completion reports should include a Learning Review section with errors, category, routing lesson, proposed improvement, apply-now/backlog decision, and whether sanitized docs are safe to sync.
