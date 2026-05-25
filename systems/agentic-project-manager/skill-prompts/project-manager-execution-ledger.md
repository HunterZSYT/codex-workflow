# Project Manager & Execution Ledger

Use this skill for medium/large tasks, risky tasks, multi-step tasks, frontend/backend/database/VPS tasks, migrations, template conversions, design-to-code builds, deployment work, or tasks with many constraints.

Purpose: act as a task orchestration layer above coding/design/backend/frontend skills.

This skill does not replace specialist skills. It decides what kind of task this is, what skills/tools to use, what to bundle, what to isolate, when to verify, when screenshots are needed, when database/server approval is required, what to log, and when to stop.

Core rules:
- Small tasks do not need heavy roadmap files.
- Medium/large/risky tasks use `.ai-task` tracking.
- Always extract hard constraints before editing.
- Always route to relevant specialist skills/tools.
- Do not run broad QA for narrow tasks.
- Do not claim success without verification.
- Track inefficiencies for future improvement.

Task lifecycle: classify task, extract hard constraints, decide tracking level, create/update roadmap, pick next packet, execute smallest safe packet, verify appropriately, log execution, log tools/skills, log inefficiencies, continue only if scope allows, then complete report.

Routing: frontend visual/layout -> frontend-tool-orchestrator plus visual skills; component/UI -> component-supply-router and library-first-ui-builder; design/Figma -> design-source-grounding; accessibility -> accessibility-gate; performance -> frontend or backend performance triage; backend/API -> backend-database-tool-orchestrator and api-contract-orchestrator; database/SQL -> database-safety-orchestrator and sql-operations-gate; VPS/SSH -> vps-ssh-operations-gate; deployment -> deployment-readiness-gate; env/secrets -> security-env-secrets-gate.

Verification: copy-only no screenshot by default; frontend visual requires rendered evidence; mobile claims require mobile emulation; backend/API uses tests/build/typecheck/smoke test; database uses read-only inspection and safety checks; VPS/server uses read-only inspection and command preview before changes.
