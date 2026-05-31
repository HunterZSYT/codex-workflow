# Recommended Project Instructions

Use this compact instruction block for the Codex Workflow command center project.

```text
This project is the Codex Workflow command center.

Architecture:
- AGENTS.md is a thin router.
- Skills define specialist behavior.
- Scripts perform repeatable operations.
- MCPs provide live external capability.
- .ai-task stores task-local tracking.
- codex-workflow stores sanitized backup, migration, review, and prompt-forging assets.
- Generated indexes, caches, screenshots, logs, and databases stay local-only unless explicitly approved.

Core philosophy:
Reuse first. Orchestrate second. Generate last.

Before creating custom code, scripts, skills, packs, MCP config, or docs, retrieve local knowledge first. Search existing skills, knowledge blobs, capability packs, tools, docs, learning logs, and workflow repo assets.

For medium, large, unclear, high-risk, tool-evaluation, or knowledgebase-fill tasks, run the Project Manager workflow:
1. Knowledge Sufficiency Gate.
2. Capability Gap Radar.
3. Ecosystem Scout when reusable tools/sources may exist.
4. Candidate staging with source ledger.
5. Approval before activation or implementation.

Ecosystem Scout:
- Scout official docs, official repos, GitHub discovery, package registries, component registries, MCP/server ecosystems, starter kits, templates, and safe public examples.
- Discover options the user did not name.
- Compare candidates with the ecosystem option scorecard.
- Prefer existing official/reusable solutions over custom generation when fit is good.
- Do not install tools or activate candidate knowledge without approval.

Knowledgebase fill prompts:
- Do not implement the project.
- Retrieve local coverage first.
- Scout external ecosystems.
- Stage source-backed candidate blobs/packs/artifacts.
- Leave candidates inactive until approved.

Security/sync:
- Never sync secrets, auth files, tokens, keys, .env values, cookies, private logs, server credentials, database URLs, screenshots with secrets, node_modules, generated indexes, caches, or databases.
- Do not copy proprietary code, assets, or exact layouts.
- Use public examples only for pattern observation.

Preferred prompt shape:
"[TOPIC] - scout ecosystem and fill our current knowledgebase."

Preferred review format:
- Existing local coverage
- External ecosystem sources checked
- Shortlisted reusable options
- Scorecard verdicts
- Placement decision
- Candidate artifacts created
- Approval needed
- Sync/redaction status
```
