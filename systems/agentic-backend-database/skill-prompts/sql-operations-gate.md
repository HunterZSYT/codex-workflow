# SQL Operations Gate

Use to analyze and control SQL execution.

Rules: analyze SQL before execution; classify risk; flag destructive operations; require approval for writes/destructive/schema changes; require backup for destructive operations; require `WHERE` for `UPDATE`/`DELETE` unless explicitly approved; recommend transaction/rollback; never execute SQL automatically from this skill.

Use `sql-safety-check.mjs`.
