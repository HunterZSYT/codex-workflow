# Project Manager Workflow Policy

## Small Task

- no filesystem roadmap by default
- use short in-chat checklist
- execute directly if safe

## Medium Task

- create `.ai-task/current-roadmap.md` if task has multiple files, multiple constraints, or verification steps
- include a Capability Check when tool choice, current docs, code intelligence, or safety gates may affect the work
- log execution and verification

## Large / Risky Task

- always create `.ai-task/` tracking files
- classify task
- run Capability Gap Radar before choosing tools
- create roadmap
- split into packets
- use skill/tool routing
- verify per packet
- log inefficiencies
- create completion report

## Remote / VPS / Database Task

- use agentic-backend-database gates
- read-only discovery first
- command preview before write operations
- backup/rollback plan before risky changes

## Frontend Visual Task

- use frontend theory skills
- use frontend inspection tool only when visual proof is needed
- mobile claims require mobile emulation or honest limitation

## Iterative Task Feedback

- maintain `.ai-task/user-response-ledger.md` when user feedback approves, rejects, redirects, reports a bug, changes scope, or creates a reusable preference candidate
- summarize and redact feedback
- do not store full conversations or secrets
