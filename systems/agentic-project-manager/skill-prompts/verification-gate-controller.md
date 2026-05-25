# Verification Gate Controller

Purpose: decide verification method.

Rules:
- No screenshot for copy-only unless layout risk.
- Screenshot for visual frontend changes.
- Mobile emulation for mobile claims.
- DOM measurement for overflow/spacing/sticky issues.
- API smoke test for safe endpoint checks.
- SQL safety check before SQL.
- Migration safety check before migrations.
- VPS read-only inspection before server changes.
- Build/lint/typecheck when code changes.
- Never claim verification that was not run.
