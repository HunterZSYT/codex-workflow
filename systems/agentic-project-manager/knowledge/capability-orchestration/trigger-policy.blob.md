# Knowledge Blob: Trigger Policy

Blob ID: trigger-policy

Owner system: agentic-project-manager

Owner skill: task-routing-and-skill-selection

Capability: Identify task signals that require capability orchestration before implementation.

Trigger phrases:
- external library
- package
- CLI
- MCP
- current docs
- use every necessary tool
- best suited
- production-ready
- high risk

When to use:
- Use when routing any medium, unclear, multi-tool, tool-evaluation, or library-dependent task.

When not to use:
- Skip for one-file copy edits, tiny CSS adjustments, and localized fixes unless direct inspection fails.

External libraries/tools:
- `pm-knowledge-gap.mjs`
- `pm-knowledge-lookup.mjs`
- Context7

Required docs source:
- Context7:
- Official docs:
- GitHub/npm:
- Last verified: 2026-05-28

Best-practice rules:
- Route external library/tool mentions through knowledge lookup.
- Match terms to capabilities, not just package names.
- Prefer the existing owner skill for the capability.
- Escalate missing/stale blobs to micro-update candidates.

Implementation pattern:
- Detect terms.
- Lookup blob.
- Route to owner skill.
- Ask approval before installs/config changes.

Anti-patterns:
- Proceeding from broad model memory when current docs are needed.
- Treating package installation as the whole plan.

Security/safety notes:
- Use sanitized task descriptions in tooling.

Verification method:
- Run `pm-knowledge-gap.mjs --task "<task>"` for simulated routing tasks.

Generated/local artifacts:
- None beyond sanitized knowledge/routing docs.

Micro-update history:
- 2026-05-28: Initial blob created.

Safe to sync to codex-workflow:
yes
