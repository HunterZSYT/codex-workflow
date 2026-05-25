---
name: sql-operations-gate
description: Use to analyze SQL before execution. Classifies read-only, write, destructive, schema-changing, transaction-needed, backup-required, and production-risk SQL. Never executes SQL automatically.
---

# SQL Operations Gate

Analyze SQL before execution with `sql-safety-check.mjs`. Flag destructive operations, writes, schema changes, missing transactions, and broad mutations. Require approval and backup for writes/destructive/schema changes. Require `WHERE` for `UPDATE`/`DELETE` unless explicitly approved. Never execute SQL automatically.
