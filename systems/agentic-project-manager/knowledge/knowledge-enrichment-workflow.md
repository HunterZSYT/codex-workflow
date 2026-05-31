# Knowledge Enrichment Workflow

Use for prompts like:

- enrich swiss layout
- enrich `frontend.system.ui-layer-scope-model`
- deepen this knowledge
- update this active pack with latest docs
- absorb this repo into this pack
- we had an error; enrich the related knowledge
- fill gaps before activation

## Workflow

1. Retrieve target pack/blob.
2. Show current status:
   - candidate / active / stale / deprecated
   - maturity
   - source confidence
   - artifacts
   - verification
   - known gaps
3. Decide enrichment type:
   - source enrichment
   - specs enrichment
   - artifacts/checklist enrichment
   - verification enrichment
   - alias/registry enrichment
   - owner skill reference enrichment
   - lesson/error enrichment
   - repo absorption enrichment
   - ecosystem/tool enrichment
4. Research current authoritative sources if external knowledge is involved.
5. Preserve old knowledge.
6. Add patch-style enrichment notes:
   - what changed
   - why
   - source/evidence
   - risk
   - verification
7. If target is candidate:
   - keep candidate unless activation is explicitly requested and audit passes.
8. If target is active:
   - stage enrichment candidate first unless the change is tiny, source-safe, and explicitly requested as an update.
   - do not silently downgrade confidence.
   - if source conflict appears, mark as needs-review/stale.
9. Rebuild index and sync safely if requested.

## Enrichment History Format

Each target pack may have `enrichment-history.md`:

- Date
- Trigger
- Target item
- Change summary
- Source/evidence
- Risk
- Status after change
- Verification
- Commit hash if synced

