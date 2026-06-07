# Auto Absorb Repo Batch Prompt

Use this prompt when providing one or more repos, tools, libraries, skill systems, design systems, research sources, or workflow sources for Codex Workflow absorption.

## Default Behavior

When I provide sources to absorb, assume I want safe knowledge absorbed into the system.

Codex must:

- run local retrieval first
- use last30days when current ecosystem or community signal is useful
- verify technical truth through official docs, official repos, Context7, and package registries
- use Headroom when raw research/context output is too large
- inspect source license, safety, runtime, generated artifacts, and install/config risks
- map useful ideas into the current architecture
- create or update source ledgers, research notes, decisions, specs, verification docs, checklists, artifacts, routing, registry entries, enrichment history, and activation-review records
- AI-audit every derived knowledge product
- auto-activate safe knowledge when validation and redaction pass
- keep risky execution/integration items approval-gated
- rebuild index
- validate, redact, sync, commit, and push if safe

Manual approval is required before installs, MCP configuration, API keys/tokens/session cookies, paid APIs, browser-session or account-based sources, stealth/anti-detect browsing, large clones, source-code/asset copying, external repo code application, model downloads, private-document OCR, services/proxies/wrappers, AGENTS.md writes, offensive cyber procedure import, production/server/database/auth/deployment changes, auto-sync behavior changes, or global AGENTS.md changes.

## Batch Sources

Absorb these sources:

1. https://github.com/CloakHQ/CloakBrowser
2. https://github.com/Lum1104/Understand-Anything
3. https://github.com/mukul975/Anthropic-Cybersecurity-Skills
4. https://github.com/run-llama/liteparse
5. https://github.com/PaddlePaddle/PaddleOCR

## Required Batch Outcomes

- Auto-activate safe knowledge.
- Keep restricted CloakBrowser safety policy active if source-backed.
- Keep actual CloakBrowser install/use blocked.
- Auto-activate defensive cybersecurity intake policy if source-backed.
- Reject or restrict offensive cyber procedures.
- Auto-activate document parsing decision rules if source-backed.
- Keep LiteParse and PaddleOCR install/model download blocked.
- Auto-activate codebase-intelligence routing if source-backed.
- Keep Understand Anything install blocked.
- Keep all generated/cache folders local-only.

## Final Output Required

Report:

- sources researched
- official/source-backed facts used
- last30days signal used or skipped with reason
- Headroom used or skipped with reason
- local knowledge updated
- auto-activated knowledge
- blocked or approval-gated items
- rejected or restricted material
- generated/cache paths kept local-only
- validation result
- redaction result
- sync/commit/push result
