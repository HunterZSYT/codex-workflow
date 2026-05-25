# Project Manager & Execution Ledger

Use this skill for medium/large tasks, risky tasks, multi-step tasks, frontend/backend/database/VPS tasks, migrations, template conversions, design-to-code builds, deployment work, or tasks with many constraints.

Purpose: act as a task orchestration layer above coding/design/backend/frontend skills.

This skill does not replace specialist skills. It decides what kind of task this is, what skills/tools to use, what to bundle, what to isolate, when to verify, when screenshots are needed, when database/server approval is required, what to log, and when to stop.

Core rules:
- Small tasks do not need heavy roadmap files.
- Medium/large/risky tasks use `.ai-task` tracking.
- Always extract hard constraints before editing.
- Run Capability Gap Radar for medium, high-risk, unclear, or tool-evaluation tasks before committing to a workflow.
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
