# Knowledge Blob: Capability Radar Trigger Policy

Blob ID: capability-radar-trigger-policy

Owner system: agentic-project-manager

Owner skill: project-manager-execution-ledger

Capability: Decide when Capability Orchestration Radar and knowledge blob lookup must run.

Trigger phrases:
- figure out everything needed
- use every necessary tool
- take control
- best practice
- production-ready
- no primitive manually
- clone this site
- setup backend
- setup database
- setup server
- automate this workflow
- choose the right stack

When to use:
- Use before implementation when a task mentions external libraries/tools/packages/MCPs.
- Use for multi-capability frontend/backend/database/VPS/deployment tasks.
- Use for high-risk work: auth, payment, database, SQL, VPS, deployment, server config, production.
- Use when current docs or fast-changing tool behavior may matter.
- Use when a prior error log says this capability was handled vaguely.

When not to use:
- Do not trigger for tiny localized edits unless direct inspection fails.
- Do not run endless tool scouting if an active blob already covers the capability and no current-doc risk exists.

External libraries/tools:
- Context7
- official docs
- package docs
- local `pm-knowledge-*` tools

Required docs source:
- Context7: use for library/framework/SDK/API/CLI/cloud docs when available.
- Official docs: fallback when Context7 lacks coverage.
- GitHub/npm: fallback for package-specific setup.
- Last verified: 2026-05-28

Best-practice rules:
- AI agent acts as orchestrator first and generator second.
- Before implementation, detect capabilities and owner skills.
- Check `knowledge-registry.json` for active blobs.
- If a blob is missing/stale, fetch current docs, extract minimum rules, create/update a blob candidate, and only proceed once rules are clear.
- Tool/package install or config change still requires user approval.
- Prefer micro-updates to existing blobs/skills over new giant skills.

Implementation pattern:
- Run or mentally apply capability radar.
- Produce the required capability table with blob status.
- Use active blobs first.
- Create/update blob candidates for missing or stale capabilities.
- Patch owner skills with short pointers only.

Anti-patterns:
- Saying only "need GSAP" or "need Prisma" without owner skill, docs source, best-practice rules, and verification method.
- Creating a new skill for every package.
- Bloated `AGENTS.md` rules.

Security/safety notes:
- Do not sync secrets, raw task logs, generated indexes, screenshots, DB files, or auth/config files.

Verification method:
- Simulate a multi-capability task and confirm the radar identifies capabilities, blob statuses, docs source, micro-update status, approvals, and verification.

Generated/local artifacts:
- Registry and knowledge blobs are sanitized workflow artifacts.
- Logs, caches, screenshots, `.codegraph/`, `.understand-anything/`, DB files, and secrets remain local-only.

Micro-update history:
- 2026-05-28: Initial policy blob created.

Safe to sync to codex-workflow:
yes
