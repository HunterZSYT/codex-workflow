# Repo Absorption Workflow

Use when the user provides a GitHub/public repo, tool, library, skill system, design system, research source, or workflow source and asks to absorb it, learn from it, mine it, strip useful patterns, add it to the system, or use it as a source for future Codex work.

## Workflow

1. Run local retrieval first.
   - Search existing knowledge, skills, docs, and learning candidates.
   - If active knowledge already covers the capability, prefer updating that asset or recording no action.

2. Use current-source layers when useful.
   - Use last30days for current ecosystem or community signal.
   - Use official repos, official docs, Context7, and package registries for technical truth.
   - Use Headroom when raw research output is too large for direct context.

3. Classify the source role.
   - Tool candidate
   - MCP candidate
   - Pattern source
   - Script reference
   - Capability pack source
   - Documentation source
   - Safety policy source
   - Not worth absorbing

4. Inspect source facts.
   - Official repo URL
   - README/docs
   - License
   - Current maintenance signal
   - Install/runtime requirements
   - Generated artifact locations
   - Security/auth/secrets risks
   - Offensive, privacy, stealth, paid, server, database, auth, or deployment risks

5. Extract reusable ideas.
   - Name only the concepts, workflows, APIs, files, or patterns that are useful.
   - Do not copy large code blocks, source files, or assets.
   - Keep snippets minimal and attributed when needed.

6. Map to local architecture.
   - Existing skill or router update first
   - Knowledge blob for narrow reusable rule
   - Capability pack for multi-artifact reusable capability
   - Script only for repeatable safe operation
   - MCP/config note only if live capability is needed
   - Defensive safety policy when the source contains risky tool behavior

7. Create or update knowledge products.
   - Add source ledgers, research summaries, decisions, specs, verification, checklists, artifacts, routing rules, registry entries, enrichment history, and activation-review records as needed.
   - Keep generated caches, cloned repos, dashboards, screenshots, raw social data, indexes, and dependency folders local-only.

8. AI-audit quality using AI-Audited Activation Workflow.
   - Check source confidence, license boundary, copied-content risk, specs, artifacts, verification, registry metadata, routing fit, and safety boundary.

9. Auto-activate safe knowledge.
   - Activate safe source-backed blobs, packs, docs, routing, and defensive policies when AI audit passes.
   - Activation means approved usable baseline, not frozen knowledge.

10. Keep risky integrations as approval-gated candidates.
    - Installs, MCP config, API keys, paid APIs, browser/session sources, stealth or anti-detect browsing, large clones, raw source/assets, model downloads, private-document OCR, services/proxies/wrappers, offensive procedures, AGENTS.md writes, and production/server/database/auth/deployment changes require explicit user approval.

11. Rebuild index.

12. Validate, redact, sync, commit, and push if safe.

## Ask User Only When

- a risky or manual-approval item is involved
- source or license is unclear
- facts conflict
- the AI audit cannot safely decide
- external code/assets would need to be copied
- installing, configuring, or executing external tooling is needed

## Verification

- Sufficiency gate should identify repo absorption required.
- Report should include license status before any reuse recommendation.
- AI audit must decide auto-activate, enrich active, keep candidate, require approval, or reject/restrict.
- Redaction scan must pass before syncing sanitized docs.
- Generated caches and cloned repos must remain local-only and ignored.
