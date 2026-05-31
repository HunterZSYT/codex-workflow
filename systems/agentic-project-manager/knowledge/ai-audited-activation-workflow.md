# AI-Audited Activation Workflow

Use for prompts like:

- AI-review and activate `frontend.system.ui-layer-scope-model` if it passes.
- Activate swiss layout if it is ready; enrich first if weak.
- Promote this pack. I am not manually reviewing every source.
- Review and activate all ready packs.
- Use your judgment and activate only if the pack is strong enough.

## Workflow

1. Retrieve item.
   - Search exact ID, aliases, related blobs/packs, candidate/stale entries.

2. Audit quality.
   - source ledger exists
   - source ledger has trusted sources
   - source dates are present
   - source confidence is clear
   - research is summarized, not copied
   - decisions are explicit
   - specs are usable
   - exact values are source-backed or user-approved
   - artifacts/checklists exist when maturity claims artifact backing
   - verification method is actionable
   - no unsafe copied/proprietary content
   - registry metadata is complete
   - owner skill reference exists
   - related items are linked
   - dedupe/overlap is acceptable or documented

3. Decide.
   - promote active
   - keep candidate
   - enrich first
   - mark stale
   - deprecate/supersede
   - ask user for a specific missing decision

4. If promote.
   - update status to `active`
   - set approval status to `ai_reviewed_approved` or `user_approved`
   - update last verified
   - update registry
   - create or append `activation-review.md`
   - rebuild index
   - sync/validate/redact/commit/push if safe

5. If weak.
   - do not promote
   - create enrichment tasks/candidates
   - explain what is missing
   - enrich first if the user requested that behavior

6. After activation.
   - keep enrichment open
   - future errors/user feedback/source discoveries create enrichment candidates
   - never treat active knowledge as frozen

## Command Pattern

Dry run:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-pack-promote.mjs --id <pack-id> --ai-reviewed --dry-run --reason "AI activation review"
```

Promote after passing AI audit:

```powershell
node C:\Users\acer\.codex\agentic-project-manager\tools\pm-pack-promote.mjs --id <pack-id> --ai-reviewed --reason "AI-reviewed activation requested by user"
```

