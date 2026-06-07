# Open-Source Absorption Policy

## Core Rule

Treat an open-source repository as a source to evaluate, extract from, and improve the Codex Workflow system.

Default behavior:
- Safe knowledge should be AI-audited and activated automatically.
- Risky execution or integration actions still require explicit user approval.

## Auto-Allowed After AI Audit

Codex may automatically create, update, activate, sync, commit, and push these if validation and redaction pass:

- source ledgers
- research summaries
- decision notes
- specs
- verification docs
- checklists
- artifacts
- routing rules
- registry entries
- safe knowledge blobs
- safe capability packs
- defensive safety policies
- tool comparison docs
- integration evaluation docs
- sync-ignore notes
- enrichment history
- activation-review records

## Manual Approval Required

Codex must still ask before:

- installing packages or tools
- configuring MCPs
- adding real API keys, tokens, or session cookies
- enabling paid APIs
- enabling browser-session or account-based sources
- enabling stealth or anti-detect browsing
- cloning large repos
- copying source code or assets from external repos
- applying external repo code
- downloading heavy models
- running OCR on private documents
- enabling services, proxies, or wrappers
- running tools that write to AGENTS.md
- importing offensive cybersecurity procedures
- changing production, server, database, auth, or deployment behavior
- changing auto-sync or one-way sync behavior
- changing AGENTS.md globally

## Activation Model

Candidate is only for:

- weak source confidence
- unclear license
- conflicting facts
- missing artifacts, specs, or verification
- risky behavior
- installation-dependent capability that was not installed
- security-sensitive or offensive material
- items needing a specific user decision

Active is default when:

- official or source-backed research is sufficient
- artifacts and checklists are useful
- risk is low
- no secrets are exposed
- no external code or assets are copied
- validation and redaction pass
- AI audit passes

Activation does not freeze knowledge.
Active knowledge remains open to enrichment.

## License And Attribution

Always check the source license before reuse. Prefer extracting abstract patterns, command workflows, public API usage, safety boundaries, and compatibility notes. If a direct snippet is required, keep it minimal, attribute it, and ask before adding it to a synced workflow asset.

## Architecture Fit

Map each useful idea to one of these targets:

- Existing skill update
- Existing router rule
- Knowledge blob
- Capability pack
- Tool script
- MCP setup note
- Workflow doc
- AGENTS.md tiny router note
- Skip

Default to the smallest durable target. Do not create a new skill unless existing routing cannot hold the behavior.
