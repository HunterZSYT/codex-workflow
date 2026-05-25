# Error Learning Policy

This system learns from mistakes through sanitized logging, recurrence detection, and reviewed improvement proposals.

It must not self-modify uncontrolled.

## Rules

- One-off error: log only; do not update skills.
- Repeated error: log and add an improvement candidate.
- High-severity safety error: log and immediately propose a safety rule update; require user approval before applying.
- Tool repeatedly unavailable: update tool-status recommendation or suggest install/config fix.
- Wrong routing repeated: propose updates to `task-routing-and-skill-selection` or `project-manager-execution-ledger`.
- Verification mistake repeated: propose updates to `verification-gate-controller`.
- Frontend visual repeated mistake: propose updates to Frontend Inspection Discipline or `frontend-tool-orchestrator`.
- Backend/database/VPS repeated mistake: propose updates to `backend-database-tool-orchestrator` or the relevant safety gate.
- AGENTS.md changes must stay tiny router notes.
- Skill updates require a patch proposal first and are applied only after user approval or an explicit setup/update request.

## Sanitization

Never log secrets, tokens, API keys, private keys, database URLs, cookies, auth headers, server credentials, or sensitive emails/password pairs.

`recurring-failures.jsonl` is local-only and must not sync to Git.
