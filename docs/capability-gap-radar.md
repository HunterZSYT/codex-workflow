# Capability Gap Radar

Capability Gap Radar is a lightweight pre-task check for meaningful Codex work.

It helps Codex notice when a task would benefit from a specialist skill, MCP server, CLI tool, library, current docs source, code intelligence tool, database tool, testing tool, browser tool, or automation helper.

It should not block simple tasks or trigger endless tool scouting.

## When It Runs

Small/simple task:
- proceed normally
- no tool scouting needed

Medium task:
- run a quick capability check using existing skills/tools

Complex, repeated, unclear, or high-risk task:
- run a capability check
- inspect existing setup
- recommend research/tooling only if useful

Tool installation/configuration:
- always require explicit approval

Database, server, deployment, auth, SSH, or migration task:
- read-only inspection first
- approval before risky actions

## Capability Check Format

```text
## Capability Check
- Task type:
- Existing matching skills/tools:
- Need current-source research:
- Need specialized tool/MCP/library:
- Candidate capability:
- Use existing setup or recommend upgrade:
- Risk level:
- Approval needed before install/config change:
- Next action:
```

## Task Categories

1. source/context tool
2. codebase intelligence tool
3. frontend tool
4. backend/database/VPS tool
5. project manager tool
6. verification tool
7. component supply tool
8. sync/migration tool
9. documentation-only reference
10. not worth adding

## Research Triggers

Use current-source research when:

- the user asks about a GitHub repo, MCP server, npm package, CLI, framework, library, browser/testing tool, component library, database/server/deployment tool, or "should I add this?"
- tool/library information may have changed recently
- a task depends on current docs, commands, versions, install methods, or compatibility
- a specialized tool may significantly reduce risk or repeated manual work
- Codex is about to recommend adding/updating a tool
- the task involves database, production, VPS, auth, deployment, or migrations
- existing skills/tools are insufficient

## Research Source Priority

1. Official GitHub repo
2. Official docs/site
3. npm/package registry if relevant
4. Release notes/changelog
5. Issues/discussions for stability and known problems
6. Third-party articles only as supporting context

## Tool Recommendation Format

```text
Verdict: Add / Do not add / Pilot first / Update existing skill instead / Docs only / Skip
What it is:
Where it fits:
Best use cases:
When not to use it:
Integration decision:
Safety/sync rules:
Codex-ready prompt:
```

Only include a Codex-ready implementation prompt when implementation is the next step or the user asks for it.

## Domain Examples

### SQL/database task

User asks: "Fix this database migration and optimize the query."

- Task type: backend/database
- Existing matching skills/tools: database-safety-orchestrator, sql-operations-gate
- Need current-source research: maybe, if ORM/database version matters
- Need specialized tool/MCP/library: maybe, if repeated SQL/migration issues appear
- Safety: read-only inspect first, backup before migration, approval before write
- Decision: use existing database gate first

### UI task

User asks: "Make this dashboard cleaner and verify responsiveness."

- Task type: frontend + verification
- Existing matching skills/tools: frontend-tool-orchestrator, frontend-inspect, browser verification
- Need current-source research: no unless a new component library is requested
- Need specialized tool/MCP/library: use existing Playwright/browser/inspection tools first
- Decision: use existing frontend verification

### Large refactor

User asks: "Refactor auth flow across the project."

- Task type: codebase intelligence + backend/frontend
- Existing matching skills/tools: Serena, CodeGraph, codebase-recon-orchestrator
- Need current-source research: maybe if auth framework/library docs changed
- Need specialized tool/MCP/library: use Serena/CodeGraph before editing
- Decision: inspect symbols/routes/call graph first

### New tool suggestion

User asks: "Should I add this GitHub repo?"

- Task type: tool evaluation
- Need current-source research: yes
- Sources: GitHub, docs, npm/release notes/issues
- Decision: evaluate using the standard tool recommendation format

### Simple edit

User asks: "Rename this button text."

- Task type: frontend small edit
- Need specialized tool/MCP/library: no
- Decision: proceed directly

## Safety Rules

- Do not install tools, MCPs, packages, or CLIs without explicit approval.
- Do not modify production, VPS, SSH, database, auth, deployment, or server configs.
- For server/database/SSH/deployment tasks, read-only inspection comes first.
- Do not sync secrets, auth files, tokens, keys, `.env` files, cookies, private logs, server passwords, database URLs, screenshots with secrets, or generated caches.
- Generated indexes, caches, databases, `.codegraph/`, and `.understand-anything/` stay local-only unless explicitly approved.
- If existing tools are enough, proceed without scouting.
