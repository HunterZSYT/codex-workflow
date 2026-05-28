# Pack Builder Workflow

Use this workflow for prompts like:

- `swiss grid - fill in our current knowledgebase`
- `GSAP ScrollTrigger - fill our knowledgebase`
- `PHPMailer email form - fill current knowledgebase`
- `premium agency homepage rhythm - fill knowledgebase`

## Steps

1. Retrieve first.

Run ranked search, related lookup, and dedupe review. Report existing blobs/packs, status, maturity, artifacts, owner skill, and related items.

2. Decide placement.

Choose one:

- existing blob update
- new blob
- new capability pack
- artifact update
- skill micro-update
- no action

3. Research source material.

Use existing tools/software first:

- Context7 for official library/framework docs when available
- official docs/sites
- GitHub repos
- npm/package registry
- standards such as WCAG when relevant
- authoritative public design references/articles where allowed
- public examples for pattern observation only

Do not copy proprietary layouts, assets, code, or raw source dumps.

4. Extract knowledge.

Capture exact rules, exact values where supported, variants, anti-patterns, implementation constraints, verification methods, and source confidence.

5. Stage candidate.

Create or update a candidate pack/blob. Do not mark active automatically.

6. Ask approval.

Show:

- what was added
- source confidence
- exact reusable values
- artifacts created
- what remains uncertain
- whether to activate, keep candidate, or revise

7. Activate only after approval.

If approved:

- update status/maturity
- update registry
- update owner skill references only with short pointers
- rebuild retrieval index
- sync to `codex-workflow`
- validate/redact/commit/push if safe

If not approved, leave draft/candidate and do not affect active routing.

## Implementation Gate

When coding, prefer active packs and artifacts. If only candidate guidance exists, report that implementation requires source verification or user approval before treating the pack as reusable.
