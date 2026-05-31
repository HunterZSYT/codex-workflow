# Activation and Enrichment Policy

## Core Rule

Activation is not finalization.

Activation means approved usable baseline. Active knowledge can guide normal implementation, but it remains open to enrichment from new sources, repo absorption, implementation failures, user corrections, outdated docs, better tools, repeated errors, and ecosystem changes.

## Lifecycle Statuses

1. `idea`
   - Raw thought or possible capability.

2. `candidate`
   - Staged knowledge. Searchable and usable for planning, but not active implementation authority.

3. `active`
   - Approved usable baseline. Can guide normal implementation, but remains patchable.

4. `enrichment_candidate`
   - Proposed improvement to an active or candidate item. Not applied blindly.

5. `active_updated`
   - Active item after approved enrichment.

6. `stale`
   - Previously active, but source/tool behavior may be outdated.

7. `deprecated`
   - Replaced by better knowledge.

## Rules

- Candidate knowledge can be used for planning; implementation with candidate knowledge requires explicit approval.
- Active knowledge can be used normally, but high-risk backend/database/server/auth/payment/deployment work still requires safety gates.
- Active knowledge is expected to improve.
- Active knowledge must not be overwritten blindly.
- Every activation should create or append an activation review record.
- Every enrichment should preserve what changed, why, source/evidence, risk, and verification.
- New source conflicts should trigger enrichment review or stale marking, not silent edits.
- Deprecated items should point to replacements when possible.

## Enrichment Triggers

- new source research
- repo absorption
- implementation failure
- user correction
- outdated docs
- better tools/libraries found
- repeated task error
- ecosystem change
- verification gap
- missing edge case

## Decision Meanings

- `promote active`: pack/blob passes AI or user audit and becomes usable baseline.
- `enrich first`: pack/blob has value but misses source/spec/artifact/verification/registry quality.
- `keep candidate`: useful but not trusted enough.
- `mark stale`: active item may be outdated or contradicted.
- `deprecate`: item has a better replacement.

