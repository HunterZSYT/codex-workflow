# Verification Gate Controller

Purpose: decide verification method.

Rules:
- No screenshot for copy-only unless layout risk.
- Screenshot for visual frontend changes.
- Mobile emulation for mobile claims.
- DOM measurement for overflow/spacing/sticky issues.
- For frontend visual proof selection, consult `agentic-frontend/knowledge/verification/mobile-emulation-proof.blob.md` and `agentic-frontend/knowledge/verification/screenshot-vs-dom-measurement.blob.md`.
- If Knowledge Sufficiency Gate reports verification gaps, resolve or warn before implementation.
- Log repeated weak verification as `verification_weak` and map it to the relevant verification blob or skill.
- API smoke test for safe endpoint checks.
- SQL safety check before SQL.
- Migration safety check before migrations.
- VPS read-only inspection before server changes.
- Build/lint/typecheck when code changes.
- When a relevant knowledge blob exists, pull the verification method from the blob and combine it with task-appropriate proof.
- When a relevant capability pack exists, inspect `verification.md`, `pack.yaml`, status, maturity, artifact paths, and approval status before relying on it.
- Candidate packs are planning material, not proof. Active/verified packs still require task-appropriate verification after implementation.
- Never claim verification that was not run.
- Codebase intelligence tools are discovery aids, not proof by themselves.
- Verify CodeGraph, Serena, Understand Anything, component-map, API-map, and capability-scan conclusions with the task-appropriate method.
- Do not use heavy recon tools as verification for tiny localized edits.
- Keep `.codegraph/`, `.understand-anything/`, generated indexes, caches, and graph databases local-only and uncommitted.
