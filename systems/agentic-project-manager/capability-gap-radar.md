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

Capability Orchestration Radar also runs when knowledge risk exists:
- the task mentions an external library, package, CLI, MCP, or tool such as GSAP, Lenis, shadcn, Tailwind, PHPMailer, Prisma, Drizzle, Supabase, Stripe, Docker, Nginx, Caddy, PM2, systemd, CodeGraph, or Understand Anything
- the user asks to "figure out everything needed", "use every necessary tool", "take control", "best practice", "production-ready", "no primitive manually", "clone this site", "setup backend/database/server", "automate this workflow", or "choose the right stack/tools"
- the task is multi-capability, high-risk, current-doc dependent, or a prior error log says the capability was handled vaguely
- the existing owner skill lacks an active knowledge blob for the capability

Do not trigger for tiny localized edits unless direct inspection fails.

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

## Capability Orchestration Radar Format

```text
| Capability | Existing owner skill | Knowledge blob status | Docs source needed | Existing tool/MCP/script | External package/tool | Best-practice rules available? | Micro-update needed? | Approval needed? | Verification |
|---|---|---|---|---|---|---|---|---|---|
```

Knowledge blob status values:
- Exists and active
- Exists but stale
- Candidate exists
- Missing
- Not needed

If a blob is missing or stale, name the owner skill, docs source to fetch, blob to create/update, and whether implementation should wait for the blob. Do not only say "need package."

Before using a library/tool/package not covered by an active blob:
1. Fetch current docs through Context7 if available.
2. If Context7 is unavailable, use official docs/GitHub/npm.
3. Extract minimum implementation rules.
4. Create or update a knowledge blob candidate.
5. Patch the owner skill only with small durable rules.
6. Proceed only after the knowledge rules are clear.

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

## Micro-Update Decision Order

1. Use existing active knowledge blob
2. Update existing blob
3. Add new blob under existing owner skill
4. Update existing owner skill with short pointer/routing rule
5. Add docs/pattern note
6. Add script if repeated executable operation
7. Add MCP config if live capability is needed
8. Create new skill only if no existing owner skill fits and capability is broad/repeated

## Recommendation Format

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

## Safety Rules

- Do not install tools, MCPs, packages, or CLIs without explicit approval.
- Do not modify production, VPS, SSH, database, auth, deployment, or server configs.
- For server/database/SSH/deployment tasks, read-only inspection comes first.
- Do not sync secrets, auth files, tokens, keys, `.env` files, cookies, private logs, server passwords, database URLs, screenshots with secrets, or generated caches.
- Generated indexes, caches, databases, `.codegraph/`, and `.understand-anything/` stay local-only unless explicitly approved.
- If existing tools are enough, proceed without scouting.
