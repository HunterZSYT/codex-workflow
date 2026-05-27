# Knowledge Blob: New Skill vs Blob Policy

Blob ID: new-skill-vs-blob-policy

Owner system: agentic-project-manager

Owner skill: project-manager-execution-ledger

Capability: Decide whether new reusable knowledge belongs in a blob, skill, script, MCP config, or docs note.

Trigger phrases:
- create a new skill
- knowledge blob
- capability orchestration
- micro-update
- best-practice rules
- reusable formula

When to use:
- Use when a task exposes reusable knowledge, repeated mistakes, missing precision, or a request to upgrade the global workflow.

When not to use:
- Do not use for one-off project implementation details that are not reusable across tasks.

External libraries/tools:
- None

Required docs source:
- Context7: not needed
- Official docs: not needed
- GitHub/npm: not needed
- Last verified: existing user-authored orchestration rule, 2026-05-28

Best-practice rules:
- Create a knowledge blob when the knowledge is a precise formula, implementation pattern, best-practice checklist, or verification formula.
- Create a knowledge blob when it belongs cleanly to an existing owner skill and improves precision without creating a new decision domain.
- Keep or create a skill when the work is a decision-making domain, chooses between multiple tools or patterns, handles safety/verification/routing, owns many related blobs, is broad and repeated across tasks, or no existing owner skill fits cleanly.
- Skills stay routers, decision owners, and safety gates.
- Blobs hold precise reusable operating rules.
- Scripts hold repeatable executable operations.
- MCPs and docs remain the live/current source of truth.

Implementation pattern:
- Decision order:
  1. Use existing active blob.
  2. Update existing blob.
  3. Add a new blob under an existing owner skill.
  4. Micro-update the existing owner skill with a short pointer/routing rule.
  5. Add a docs/pattern note.
  6. Add a script if the operation is repeated and executable.
  7. Add MCP config if live capability is needed.
  8. Create a new skill only if the capability becomes a new repeated decision domain.

Anti-patterns:
- Creating a new skill for every library, package, or formula.
- Copying full blob content into skills.
- Converting broad routing text into blobs.
- Marking external-library rules active without current docs confidence.

Security/safety notes:
- Do not sync secrets, raw logs, generated indexes, screenshots, caches, databases, or auth/config files as knowledge artifacts.

Verification method:
- Confirm the registry entry exists.
- Confirm owner skill points to the blob without duplicating full content.
- Confirm sync/validation/redaction checks pass.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Created from user-defined consolidation policy.

Safe to sync to codex-workflow:
yes
