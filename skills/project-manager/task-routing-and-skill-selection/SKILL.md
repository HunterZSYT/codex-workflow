---
name: task-routing-and-skill-selection
description: Use to select the correct specialist skills/tools for frontend, backend, database, VPS, design-source, component, accessibility, performance, security, and mixed tasks. Chooses the smallest tool that proves the claim.
---

# Task Routing and Skill Selection

Do not use all tools every time. Choose the smallest skill/tool that proves the claim. Use frontend stack for frontend, backend-database stack for backend/database/VPS, design grounding for Figma/design source, component supply for UI components, and safety gates for risky work.

Run Capability Gap Radar for medium, high-risk, unclear, repeated, or tool-evaluation tasks. Do not run it for tiny localized edits unless direct inspection fails.

## Tool Selection Policy

Default rule: start with the cheapest reliable method. Escalate only when the task needs more context, precision, or impact analysis.

- Normal search/read: small task, known target file, one-file edit, copy/content update, simple styling fix, or direct bug with known location.
- Project capability scan: unknown project, stack detection, verification command selection, or available tool/script detection.
- Component map: adding/modifying frontend components, finding existing UI, or avoiding duplicate components.
- API/db/schema maps: backend/API/database tasks, route/controller/service tracing, migration/schema risk.
- Understand Anything: user asks to understand/onboard/explain a codebase, task needs architecture, business/domain flow, large unfamiliar project understanding, or documentation-style summary.
- CodeGraph: symbol search, caller/callee tracing, dependency path tracing, impact analysis, route/service/component relationship tracing, "what uses this?", or "what breaks if I change this?".
- Serena: semantic code navigation is available and useful for symbols/classes/functions across a large repo or targeted edits with semantic context.
- Frontend inspect: visual proof, responsive/mobile/layout issue, overflow/sticky/header/button/spacing visual claim.
- Accessibility/performance tools: only when the task directly involves accessibility/performance, or when touched UI includes nav/forms/modals/buttons for accessibility.

Budget: small tasks use direct inspection and no CodeGraph/Understand Anything unless search fails. Medium tasks run capability scan first and use one intelligence tool if needed. Large/risky/unknown tasks use Project Manager tracking, run capability scan, choose the best intelligence tool, and log why. Do not run multiple heavy tools unless one fails or the task needs both high-level explanation and precise symbol tracing.

Capability recommendations: if existing skills/tools are enough, proceed. If current docs or external setup are needed, use official/current sources before recommending changes. If a tool/MCP/library install or config change is useful, recommend it with approval required; do not install automatically. For database/server/deployment/auth/SSH/migration tasks, route through the relevant safety gate and read-only inspection first.

Generated artifacts from `.codegraph/`, `.understand-anything/`, indexes, caches, and databases are local-only and should be gitignored. Do not sync or commit them unless explicitly requested.

## Tool Choice Feedback Loop

When Project Manager tracking is active, log task type, available tools considered, tool chosen, why chosen, expected benefit, actual benefit, time/cost/complexity, whether it was overkill, whether a cheaper tool would have worked, whether a stronger tool should have been used, and future routing lesson.

If wrong routing repeats, propose updates to this skill or `project-manager-execution-ledger`; do not auto-apply changes after a single mistake.
