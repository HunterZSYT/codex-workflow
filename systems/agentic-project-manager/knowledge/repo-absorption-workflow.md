# Repo Absorption Workflow

Use when the user provides a GitHub/public repo and asks to absorb it, learn from it, mine it, strip useful patterns, add it to the system, or use it as a source for future Codex work.

## Workflow

1. Run local retrieval first.
   - Search existing knowledge, skills, docs, and learning candidates.
   - If active knowledge already covers the capability, prefer updating that asset or recording no action.

2. Classify the source role.
   - Tool candidate
   - MCP candidate
   - Pattern source
   - Script reference
   - Capability pack source
   - Documentation source
   - Not worth absorbing

3. Inspect source facts.
   - Official repo URL
   - README/docs
   - License
   - Current maintenance signal
   - Install/runtime requirements
   - Generated artifact locations
   - Security/auth/secrets risks

4. Extract reusable ideas.
   - Name only the concepts, workflows, APIs, files, or patterns that are useful.
   - Do not copy large code blocks or assets.
   - Keep snippets minimal and attributed when needed.

5. Map to local architecture.
   - Existing skill or router update first
   - Knowledge blob for narrow reusable rule
   - Candidate pack for multi-artifact reusable capability
   - Script only for repeatable operation
   - MCP/config note only if live capability is needed

6. Create the report.
   - Use the repo absorption report template.
   - Add source absorption ledger entries for each source reviewed.
   - Mark all unapproved artifacts as candidate.

7. Ask before activation.
   - Present recommended action and risk.
   - Do not install, clone, sync, activate, or commit derived artifacts without explicit approval.

## Verification

- Sufficiency gate should identify repo absorption required.
- Report should include license status before any reuse recommendation.
- Redaction scan must pass before syncing sanitized docs.
- Generated caches and cloned repos must remain local-only and ignored.
