# Knowledge Blob: Knowledge Blob Policy

Blob ID: knowledge-blob-policy

Owner system: agentic-project-manager

Owner skill: project-manager-execution-ledger

Capability: Define how precise capability knowledge is stored, checked, updated, and synced.

Trigger phrases:
- knowledge blob
- blob missing
- stale capability
- current docs
- best-practice operating rules
- capability precision

When to use:
- Use whenever a capability needs precise operating rules beyond broad AI memory.

When not to use:
- Do not create blobs for one-off local business logic.
- Do not duplicate a blob if an existing owner skill fits.

External libraries/tools:
- `knowledge-registry.json`
- `pm-knowledge-register.mjs`
- `pm-knowledge-lookup.mjs`

Required docs source:
- Context7:
- Official docs:
- GitHub/npm:
- Last verified: 2026-05-28

Best-practice rules:
- Keep blobs small, capability-specific, and owned by an existing skill.
- Include trigger phrases, when/when-not rules, docs source, best practices, anti-patterns, verification, artifacts, history, and sync safety.
- Registry entries must include blob id, capability, owner system, owner skill, path, trigger terms, external libraries, docs sources, last verified, status, and sync safety.
- Active blobs can be used directly.
- Candidate blobs can guide work but should be reviewed before promotion.
- Stale/missing blobs require docs refresh or micro-update before implementation.

Implementation pattern:
- Lookup registry.
- Read matched active blob.
- If missing/stale, fetch docs and create/update candidate.
- Patch owner skill with a short pointer.

Anti-patterns:
- Giant general-purpose skills.
- Large copied docs.
- Unsourced package advice.

Security/safety notes:
- Knowledge blobs must not contain secrets, private logs, raw screenshots, database dumps, or auth/config details.

Verification method:
- Registry lookup returns matching blob and status.
- Redaction scan passes before sync.

Generated/local artifacts:
- Registry and sanitized blobs may sync.

Micro-update history:
- 2026-05-28: Initial blob created.

Safe to sync to codex-workflow:
yes
