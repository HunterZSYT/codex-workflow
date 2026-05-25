---
name: sql-operations-gate
description: Use to analyze SQL before execution. Classifies read-only, write, destructive, schema-changing, transaction-needed, backup-required, and production-risk SQL. Never executes SQL automatically.
---

# SQL Operations Gate

Analyze SQL before execution with `sql-safety-check.mjs`. Flag destructive operations, writes, schema changes, missing transactions, and broad mutations. Require approval and backup for writes/destructive/schema changes. Require `WHERE` for `UPDATE`/`DELETE` unless explicitly approved. Never execute SQL automatically.

Capability Gap Radar: when SQL risk is high or query behavior depends on engine/version, consider whether current docs, query planner output, schema inspection, migration tooling, or a SQL linter would reduce risk. Recommend additions only after read-only inspection and explicit approval.
