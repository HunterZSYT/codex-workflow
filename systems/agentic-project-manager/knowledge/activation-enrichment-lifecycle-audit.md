# Activation and Enrichment Lifecycle Audit

Date: 2026-06-01

## Current Candidate to Active Behavior

Current policy already requires retrieval-first, source grounding, artifact backing, and approval before promotion. `pm-pack-promote.mjs` requires `--approved`, checks for a non-placeholder source ledger, checks artifacts for `artifact_backed` and `verified` maturity, updates `pack.yaml`, and updates the registry.

## Current Enrichment Behavior

The learning system logs failures and creates candidate patches. It supports knowledge patch candidates, user preference candidates, verification update candidates, and tool update candidates. However, the lifecycle docs do not explicitly say that active packs remain open to enrichment.

## Gaps

- Activation is not clearly defined as a usable baseline rather than final state.
- Active pack enrichment is not a first-class workflow.
- Promotion does not write an activation review record.
- Audit output lacks source quality, registry completeness, owner skill reference, and lifecycle recommendation.
- Learning tools do not explicitly target enrichment candidates against active packs/blobs.
- Knowledge Sufficiency Gate does not expose lifecycle fields such as activation needed, enrichment needed, stale risk, or active-but-gap.

## Updates Needed

- Add activation/enrichment lifecycle policy.
- Add AI-audited activation workflow.
- Add knowledge enrichment workflow.
- Update audit/promote tools with AI-review, dry-run, and activation records.
- Update learning loop wording and candidate output to treat active knowledge as patchable.
- Update routing skills to route activate/promote/enrich language to the new workflows.
- Update sufficiency output with lifecycle fields.

## Sync Safety

Safe to sync:

- lifecycle policy docs
- workflow docs
- activation/enrichment records
- sanitized learning candidate docs
- tool and skill prompt updates

Never sync:

- raw events
- `.ai-task`
- generated SQLite indexes
- screenshots
- secrets
- copied source dumps

