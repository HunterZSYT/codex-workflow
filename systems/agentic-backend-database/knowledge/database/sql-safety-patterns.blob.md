# Knowledge Blob: SQL Safety Patterns

Blob ID: sql-safety-patterns

Owner system: agentic-backend-database

Owner skill: sql-operations-gate

Capability: SQL read/write/destructive operation safety.

Trigger phrases:
- SQL
- migration
- query
- update table
- delete rows
- drop
- truncate
- database change

When to use:
- Use before SQL execution, migrations, schema changes, data writes, or destructive operations.

When not to use:
- Skip only for non-SQL text-only documentation edits.

External libraries/tools:
- DB engine CLI/tooling as detected
- `sql-safety-check.mjs`

Required docs source:
- Context7:
- Official docs:
- GitHub/npm:
- Last verified: candidate

Best-practice rules:
- Inspect schema and engine first.
- Classify operation as read-only, write, schema-change, destructive, or unknown.
- Require approval before writes, destructive SQL, and migrations.
- Preview affected rows when possible.
- Plan backup/rollback for risky changes.
- Never expose database URLs or credentials.

Implementation pattern:
- Detect DB engine.
- Map schema.
- Run safety classification.
- Ask approval before write/destructive action.
- Verify result with read-only query.

Anti-patterns:
- Running SQL from memory without schema inspection.
- Combining unrelated changes into one migration.
- No rollback plan for destructive change.

Security/safety notes:
- Redact DB URLs and credentials.

Verification method:
- Read-only verification query and migration/test output.

Generated/local artifacts:
- DB dumps, generated DBs, and raw logs are local-only.

Micro-update history:
- 2026-05-28: Initial candidate seed.

Safe to sync to codex-workflow:
yes
