# Knowledge Blob: Micro Update Policy

Blob ID: micro-update-policy

Owner system: agentic-project-manager

Owner skill: inefficiency-and-improvement-reviewer

Capability: Decide the smallest durable update when capability precision is missing.

Trigger phrases:
- micro-update
- update skill
- missing best practices
- vague package recommendation
- repeated precision failure

When to use:
- Use after missing/stale capability knowledge, repeated vague recommendations, or task failures caused by broad package knowledge.

When not to use:
- Do not auto-promote one-off task quirks to global knowledge.
- Do not create new skills when an existing owner skill fits.

External libraries/tools:
- `pm-suggest-skill-update.mjs`
- `pm-promote-lesson.mjs`
- `pm-knowledge-register.mjs`

Required docs source:
- Context7:
- Official docs:
- GitHub/npm:
- Last verified: 2026-05-28

Best-practice rules:
- Decision order:
  1. Use existing active knowledge blob.
  2. Update existing blob.
  3. Add new blob under existing owner skill.
  4. Update existing owner skill with short pointer/routing rule.
  5. Add docs/pattern note.
  6. Add script if repeated executable operation.
  7. Add MCP config if live capability is needed.
  8. Create new skill only if no existing owner skill fits and capability is broad/repeated.
- Keep updates small and reviewable.

Implementation pattern:
- Identify precision failure.
- Choose the earliest valid step in the decision order.
- Record candidate and sync only sanitized docs.

Anti-patterns:
- Rewriting broad skills from one failure.
- Adding tooling before a blob would solve the gap.
- Syncing raw logs as "learning."

Security/safety notes:
- Redact task-local evidence.
- Do not sync secrets/caches/generated DBs.

Verification method:
- Completion review names the precision failure and proposed blob/tool/skill update.

Generated/local artifacts:
- Candidate docs may sync if sanitized.

Micro-update history:
- 2026-05-28: Initial blob created.

Safe to sync to codex-workflow:
yes
