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

## 6. Knowledge Product Update

Create or update source ledger, research notes, decisions, specs, artifacts, and checklists if appropriate.

AI-audit the result. Auto-activate safe source-backed knowledge when validation and redaction pass. Keep candidate only when sources are weak, license is unclear, facts conflict, artifacts/specs/verification are missing, or manual approval is required.

## 7. Approval Gate

Ask approval before installs, MCP configuration, paid/API/session/account sources, stealth/anti-detect browsing, large clones, external source/assets, model downloads, private-document OCR, services/proxies/wrappers, AGENTS.md writes, offensive procedures, or production/server/database/auth/deployment behavior changes.

Do not implement risky candidate use unless Knowledge Sufficiency Gate says proceed or the user explicitly approves the risky action.

## 8. Sync

When approved or requested:

- rebuild index
- validate
- run redaction scan
- sync to `codex-workflow`
- commit/push only if safe and requested by the task
