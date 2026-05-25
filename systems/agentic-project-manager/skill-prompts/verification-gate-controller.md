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
- Codebase intelligence tools are discovery aids, not proof by themselves.
- Verify CodeGraph, Serena, Understand Anything, component-map, API-map, and capability-scan conclusions with the task-appropriate method.
- Do not use heavy recon tools as verification for tiny localized edits.
- Keep `.codegraph/`, `.understand-anything/`, generated indexes, caches, and graph databases local-only and uncommitted.
