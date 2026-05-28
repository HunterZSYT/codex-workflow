# Retrieval Audit

Date: 2026-05-28

## Current Lookup Behavior

`pm-knowledge-lookup.mjs` previously loaded `knowledge-registry.json`, joined selected fields into one string, lowercased the query, and used exact substring matching.

Indexed fields before this upgrade:

- `blob_id`
- `capability`
- `owner_system`
- `owner_skill`
- `trigger_terms`
- `external_libraries`
- `docs_sources`

Failure mode: a query had to appear as one contiguous substring. `swiss grid` failed even though the registry contained `Swiss layout`, `editorial grid`, and `premium grid`.

## Swiss Grid Test Case

Query:

`swiss grid`

Expected retrieval:

- `frontend.layout.swiss-editorial-grid`
- `frontend.layout.layout-grid-composition`
- `frontend.layout.premium-agency-section-rhythm`
- `skill.layout-composition-fundamentals`

Required result details:

- owner skill
- status
- maturity
- source confidence
- artifact availability
- file path
- related items

## Fields That Must Be Searchable

- `id`
- `title`
- `namespace`
- `type`
- `capability`
- `capability_class`
- `owner_system`
- `owner_skill`
- `status`
- `maturity`
- `aliases`
- `trigger_terms`
- `external_libraries`
- `docs_sources`
- `source_confidence`
- `related_items`
- `artifact_paths`
- `apply_command`
- `verification_method`
- `file_path`
- blob body text
- skill body text
- script/template/doc body text

## Metadata Gaps Found

- Several blobs had useful operating guidance but no `artifact_paths` or `apply_command`.
- Candidate blobs could be mistaken for ready systems unless maturity is shown.
- Aliases were thin. Swiss needed aliases such as `swiss grid`, `swiss layout system`, and `international typographic style`.
- Related layout blobs were not explicitly connected.
- `pm-knowledge-gap.mjs` had better capability hints than `pm-knowledge-lookup.mjs`, so discovery quality depended on which tool the agent chose.

## Candidate vs Active

Candidate blobs should be retrievable but must not be treated as implementation-ready. Search results must expose:

- `status`
- `maturity`
- `source_confidence`
- artifact availability

Swiss layout remains candidate/researched guidance because it has no reusable artifact path or apply command.

## Blob and Skill References

The owner skill for the Swiss/layout group is:

`layout-composition-fundamentals`

Related blobs:

- `layout-grid-composition`
- `swiss-editorial-grid-layout`
- `premium-agency-section-rhythm`

## Overlap Areas To Watch

- visual proof vs mobile emulation vs screenshot/DOM measurement
- Swiss grid vs layout grid vs premium agency rhythm
- GSAP ScrollTrigger vs scroll-scene composition

These should be cross-referenced or merged only after review. The dedupe tool must not delete anything automatically.
