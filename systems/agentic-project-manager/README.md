# Agentic Project Manager

Global location:

`C:\Users\acer\.codex\agentic-project-manager`

This is a global orchestration layer for Codex. It coordinates existing frontend and backend/database/VPS systems without replacing them.

## What It Does

- Classifies tasks.
- Extracts constraints.
- Creates roadmaps and execution packets.
- Decides what can be bundled and what must be isolated.
- Routes work to frontend/backend/database/VPS/copywriting/safety skills.
- Creates `.ai-task` tracking files only when task size/risk justifies it.
- Tracks execution, verification, tool/skill usage, inefficiencies, and improvement backlog.
- Runs Capability Gap Radar for meaningful tasks where tooling, current docs, safety gates, or code intelligence may change the correct workflow.
- Tracks meaningful iterative user feedback through a sanitized task-local User Response Ledger.

## When `.ai-task` Is Created

- Small task: usually no filesystem roadmap.
- Medium task: create `.ai-task/current-roadmap.md` and logs when there are multiple files, constraints, or verification steps.
- Large/risky task: always create `.ai-task` tracking files.
- Remote/VPS task without project folder: use current safe folder or a remote-task log folder when needed.

## Tools

Tools live in:

`C:\Users\acer\.codex\agentic-project-manager\tools`

Example commands:

```bash
node ~/.codex/agentic-project-manager/tools/project-manager-health-check.mjs
node ~/.codex/agentic-project-manager/tools/pm-capability-sync.mjs
node ~/.codex/agentic-project-manager/tools/pm-classify-task.mjs --task "Fix mobile header spacing"
node ~/.codex/agentic-project-manager/tools/pm-init-task.mjs --task "Convert static site to shadcn components" --scope large
node ~/.codex/agentic-project-manager/tools/pm-next-packet.mjs
node ~/.codex/agentic-project-manager/tools/pm-log-user-response.mjs --signal "modification_request" --summary "Make the section cleaner" --action "Revise layout density"
node ~/.codex/agentic-project-manager/tools/pm-completion-report.mjs
node ~/.codex/agentic-project-manager/tools/pm-improvement-review.mjs
node ~/.codex/agentic-project-manager/tools/pm-headroom-status.mjs
node ~/.codex/agentic-project-manager/tools/pm-headroom-context.mjs --file ./large-output.txt --mode analyze
```

## Headroom SDK Pilot

Headroom is installed as a Project Manager SDK dependency for explicit context analysis.

- `pm-headroom-status.mjs` checks the npm SDK, local service health, and blocked Python/Docker runtime paths.
- `pm-headroom-context.mjs` analyzes large logs/tool outputs/files and can call service-backed `simulate` or `compress` only when a Headroom service endpoint is reachable.
- The current default is not proxy/wrapper mode. Do not route Codex provider traffic through Headroom without a service-health check, telemetry decision, generated-file plan, and rollback plan.

## Skills

Skill prompt files live in:

`C:\Users\acer\.codex\agentic-project-manager\skill-prompts`

They are also installed as global Codex skills:

- `project-manager-execution-ledger`
- `task-roadmap-orchestrator`
- `task-routing-and-skill-selection`
- `verification-gate-controller`
- `inefficiency-and-improvement-reviewer`
- `task-bundling-controller`

## Coordination

- Frontend work routes to `C:\Users\acer\.codex\agentic-frontend`
- Backend/database/VPS work routes to `C:\Users\acer\.codex\agentic-backend-database`
- Risky work routes to safety gates.
- Capability Gap Radar runs before medium/high-risk/unclear tool decisions, but does not block tiny localized edits.
- User Response Ledger records summarized feedback signals only; it does not store raw conversations.
- Visual claims require rendered evidence when visual proof is needed.
- Database/server/destructive work requires explicit approval and safety planning.
