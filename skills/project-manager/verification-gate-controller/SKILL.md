---
name: verification-gate-controller
description: Use to decide verification method. Controls screenshots, mobile emulation, DOM measurement, API smoke tests, SQL safety checks, migration checks, VPS read-only inspection, builds, lint, typecheck, and honest verification reporting.
---

# Verification Gate Controller

No screenshot for copy-only unless layout risk. Screenshot for visual frontend changes. Mobile emulation for mobile claims. DOM measurement for overflow/spacing/sticky issues. API smoke test for safe endpoint checks. SQL safety check before SQL. Migration safety check before migrations. VPS read-only inspection before server changes. Build/lint/typecheck when code changes. Never claim verification that was not run.

Codebase intelligence tools are discovery aids, not proof by themselves. For CodeGraph, Serena, Understand Anything, component maps, API maps, or capability scans, verify the resulting change with the task-appropriate method: tests/build/typecheck, safe API smoke test, rendered frontend inspection, SQL/migration safety check, or targeted source review.

Do not run heavy recon tools as verification for tiny localized edits. If a tool creates `.codegraph/`, `.understand-anything/`, cache, index, or database output, keep it local-only and do not commit it.

Log weak, missing, wrong, excessive, or misleading verification as a verification mistake with `pm-log-error.mjs` when Project Manager tracking is active. After two failed verification attempts, stop changing code, log a loop failure, report what is verified and uncertain, and name the next diagnostic.
