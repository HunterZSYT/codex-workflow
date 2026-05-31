# Agent Learning Model

## Core Rule

AI agent = orchestrator first, generator second.

Before implementation, the agent must decide whether the local knowledgebase has enough operating data. Generation starts only after retrieval, sufficiency, and verification path are clear.

Raw event storage can hoard sanitized events. Active knowledgebase must stay strict, source-backed, deduplicated, and approved.

Activation means approved usable baseline, not finished forever. Active blobs and packs remain open to enrichment from new sources, repo absorption, task failures, user corrections, outdated docs, better tools, repeated errors, and ecosystem changes.

## Loop 1: Pre-action Knowledge Sufficiency

Task arrives:

1. Classify capability and risk.
2. Retrieve existing skills, blobs, packs, tools, scripts, MCPs, and sanitized lessons.
3. Check item status: active, candidate, stale, deprecated, or missing.
4. Check source confidence: official/current docs, internal rule, candidate, stale, or unknown.
5. Check artifact backing when the task needs a reusable system or exact implementation product.
6. Check whether exact rules and verification method exist.
7. Check relevant past errors, lessons, and user feedback.
8. Decide:
   - `proceed`
   - `proceed_with_warning`
   - `fill_knowledgebase_first`
   - `ask_user_approval`
   - `use_existing_artifact`
   - `stop_and_research`

Rules:

- External library/tool/MCP tasks need active source-backed blob/pack or current docs fetch.
- Candidate/stale blobs are not active implementation rules.
- Candidate knowledge can be used only for planning or with explicit user approval.
- High-risk backend/database/VPS tasks need active safety rules or a stop/research decision.
- Small localized edits can use a minimal gate when direct context is enough.

## Loop 2: Execution Telemetry

During task, record structured events:

- task classification
- retrieval queries and results
- selected skills
- selected blobs and packs
- selected tools, MCPs, and scripts
- commands run
- verification run
- failed commands
- user feedback
- errors
- lessons

Local raw event target:

- `C:\Users\acer\.codex\agentic-project-manager\learning\events\events.jsonl`

Task-local raw event target:

- `.ai-task/events.jsonl`

Both are local-only raw logs and must not sync to `codex-workflow`.

## Loop 3: Failure-to-Knowledge Patch

Error happens:

1. Classify root cause.
2. Map error to exact capability.
3. Map capability to owner skill, blob, pack, tool, script, MCP config, docs, or user preference.
4. Create patch candidate.
5. Validate patch candidate.
6. Require approval for activation unless the user explicitly requested system setup/update.
7. Sync only sanitized candidate summaries if safe.

Rules:

- Missing knowledge proposes blob/pack update first.
- If the mapped owner item is active, create an enrichment candidate against that active item instead of treating it as closed.
- Wrong execution pattern proposes artifact/script/command recipe update.
- Wrong routing proposes routing skill micro-update.
- Weak verification proposes verification skill/blob update.
- User correction proposes preference or workflow rule candidate.

## Loop 4: Selective Retrieval

Future task:

1. Retrieve only relevant active lessons, blobs, packs, and approved policies.
2. Include candidate items only as warnings or possible patch targets.
3. Avoid repeating verified mistakes.
4. Do not replay raw, uncertain, private, stale, or bad memories.

Rules:

- Active learning is promoted, sanitized, and reviewed.
- Active knowledge is preferred for implementation, but active knowledge can still be marked stale or enriched when evidence changes.
- Candidate learning is advisory and must not override task evidence.
- Raw event logs are evidence stores, not implementation instructions.
