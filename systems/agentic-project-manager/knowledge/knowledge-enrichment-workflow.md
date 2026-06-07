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
   - enrich it
   - AI-audit it
   - promote to active automatically if safe
   - keep candidate only when audit fails or manual approval is required
8. If target is active:
   - apply safe enrichment directly after AI audit
   - preserve enrichment history
   - do not silently downgrade confidence
   - mark stale/needs-review only when source conflict or risk appears
9. Do not leave safe enrichment as candidate by default.
10. Rebuild index, validate, redact, sync, commit, and push if safe.

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
