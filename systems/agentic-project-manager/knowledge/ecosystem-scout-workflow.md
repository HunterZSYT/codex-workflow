# Ecosystem Scout Workflow

Use this workflow for prompts like:

`[TOPIC] - scout ecosystem and fill our current knowledgebase.`

## 1. Local Retrieval

Search local skills, knowledge blobs, capability packs, artifacts, tools, MCP notes, docs, learning patterns, and previous feedback.

Use:

- `pm-knowledge-search.mjs`
- `pm-knowledge-related.mjs`
- `pm-knowledge-dedupe.mjs`
- `pm-knowledge-sufficiency.mjs`

## 2. Gap Summary

Report:

- existing local coverage
- active vs candidate vs stale items
- owner skills
- known tools/scripts/MCPs
- missing behavior
- whether current-source research is needed

## 3. Ecosystem Discovery

Scout:

- official docs
- official GitHub repositories
- GitHub discovery by topic/language/starter/template filters
- package registries
- component registries
- MCP/server ecosystems
- templates and starter kits
- public examples for pattern observation only

## 4. Option Shortlist

Use the ecosystem option scorecard.

Keep top candidates only. Do not dump random lists.

## 5. Placement Decision

For each candidate, decide:

- existing tool usage
- MCP config
- blob
- capability pack
- artifact
- skill micro-update
- docs only
- skip

## 6. Candidate Knowledge Staging

Create or update source ledger, research notes, decisions, specs, artifacts, and checklists if appropriate.

Do not mark active automatically.

## 7. Activation Gate

Do not activate without approval.

Do not implement unless Knowledge Sufficiency Gate says proceed or the user explicitly approves candidate use.

## 8. Sync

When approved or requested:

- rebuild index
- validate
- run redaction scan
- sync to `codex-workflow`
- commit/push only if safe and requested by the task
