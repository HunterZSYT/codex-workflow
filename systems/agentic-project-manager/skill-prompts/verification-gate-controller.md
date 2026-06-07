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
- Active packs are approved usable baselines, not final proof for every future task. If verification reveals a gap in active knowledge, log an enrichment candidate and keep the baseline intact until the patch is reviewed.
- Activation review must verify that a pack has source evidence, actionable specs/artifacts, decision guidance, and verification guidance. Weak packs stay candidate or move to enrich-first.
- Never claim verification that was not run.
- Codebase intelligence tools are discovery aids, not proof by themselves.
- Verify CodeGraph, Serena, Understand Anything, component-map, API-map, and capability-scan conclusions with the task-appropriate method.
- Ecosystem scouting is discovery, not proof. Verify selected tools, libraries, components, templates, and MCPs against official docs, license/maintenance evidence, compatibility, and task-specific checks before treating them as safe to use.
- Repo absorption is discovery, not proof. Verify source repo URL, docs, license, maintenance signal, generated artifact behavior, and local architecture fit before recommending any workflow change.
- WordPress/WooCommerce verification must include project type detection, PHP syntax checks when PHP changes, WordPress debug/log review when available, enqueue verification, rendered front-end checks, editor/front-end parity for block themes, and storefront/checkout flow checks for WooCommerce.
- Cloud/VPS/public URL verification must inspect active pack `project_manager.cloud.vps-deployment-inspection-operations` (`pack.yaml`, `verification.md`, and artifacts). URL mode needs frontend-inspect desktop/mobile evidence and accessibility/performance checks when relevant. SSH/VPS mode needs read-only inventory/log evidence. Changes need approval, backup/rollback note, post-change URL proof, and relevant server log proof. Public URL screenshots/logs stay local-only unless sanitized and approved.
- Candidate packs/blobs from ecosystem scouting are not active implementation rules until approved by user review or passing AI audit.
- Repo-derived reports, ledgers, blobs, packs, scripts, and docs require AI audit before activation. Safe source-backed knowledge may auto-activate after validation and redaction; risky installs/configs/execution, unclear sources/licenses, copied source/assets, and sensitive behavior remain approval-gated.
- Do not use heavy recon tools as verification for tiny localized edits.
- Keep `.codegraph/`, `.understand-anything/`, generated indexes, caches, and graph databases local-only and uncommitted.
