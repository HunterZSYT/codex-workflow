# Verification

## Pack Verification

- Run `pm-knowledge-index.mjs`.
- Run search tests for VPS deployment inspection, domain SSH frontend inspection, cloud security checklist, WordPress VPS public URL QA, and cache/CDN/SSL domain inspection.
- Run `pm-pack-audit.mjs --id project_manager.cloud.vps-deployment-inspection-operations`.
- Run Project Manager health check.
- Sync, validate export, and redaction-scan before commit.

## Real Task Verification

Select proof based on mode:

- Public URL inspection: screenshots, JSON report, overflow status, final URL, console errors, failed requests, bad responses.
- Accessibility: axe report plus manual limitations noted.
- Performance: Lighthouse summary and raw report paths.
- SSH read-only: inventory/log/config summaries with secrets redacted.
- Deployment/change: before state, backup/snapshot, exact commands, syntax checks, approved reload/restart, public URL proof, log review, rollback plan.
- Database: schema/engine evidence, SQL safety result, migration safety result, backup proof before migration.
- Security: defensive checklist findings only; no exploit proof.
