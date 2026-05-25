---
name: verification-gate-controller
description: Use to decide verification method. Controls screenshots, mobile emulation, DOM measurement, API smoke tests, SQL safety checks, migration checks, VPS read-only inspection, builds, lint, typecheck, and honest verification reporting.
---

# Verification Gate Controller

No screenshot for copy-only unless layout risk. Screenshot for visual frontend changes. Mobile emulation for mobile claims. DOM measurement for overflow/spacing/sticky issues. API smoke test for safe endpoint checks. SQL safety check before SQL. Migration safety check before migrations. VPS read-only inspection before server changes. Build/lint/typecheck when code changes. Never claim verification that was not run.
