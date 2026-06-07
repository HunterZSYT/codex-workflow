# Auto Absorption Activation Policy Audit

Date: 2026-06-07

## Scope

Reviewed current Project Manager absorption, activation, enrichment, product-policy, routing, and tooling rules for conflicts with AI-audited auto activation of safe knowledge.

Inspected:

- `knowledge/open-source-absorption-policy.md`
- `knowledge/repo-absorption-workflow.md`
- `knowledge/ai-audited-activation-workflow.md`
- `knowledge/knowledge-enrichment-workflow.md`
- `knowledge/knowledge-product-policy.md`
- `skill-prompts/task-routing-and-skill-selection.md`
- `skill-prompts/project-manager-execution-ledger.md`
- `skill-prompts/inefficiency-and-improvement-reviewer.md`
- `tools/pm-knowledge-sufficiency.mjs`
- `tools/pm-pack-promote.mjs`
- `tools/pm-pack-audit.mjs`

## Policy Conflicts Found

- `open-source-absorption-policy.md` said not to install, clone, copy, activate, or sync anything from a repository unless the user explicitly approved that next step.
- `open-source-absorption-policy.md` required explicit approval before creating or activating a skill, promoting a candidate pack, syncing derived artifacts, or applying code.
- `repo-absorption-workflow.md` stopped at an approval request and said not to install, clone, sync, activate, or commit derived artifacts without explicit approval.
- `knowledge-enrichment-workflow.md` kept candidate targets candidate unless activation was explicitly requested, and staged active-target enrichment as a candidate by default.
- `knowledge-product-policy.md` said all repository-derived outputs stay candidate until explicit approval.
- `task-routing-and-skill-selection.md` and `project-manager-execution-ledger.md` routed repo absorption to candidate-only outputs and explicit approval before activation.
- `pm-knowledge-sufficiency.mjs` emitted `activation_approval_required` for repo absorption, which forced manual approval even when the output was safe knowledge rather than risky execution.
- Global skill mirrors for task routing, project-manager execution, and verification gate repeated the old candidate/approval rule.

## Files That Needed Updates

- `knowledge/open-source-absorption-policy.md`
- `knowledge/repo-absorption-workflow.md`
- `knowledge/ai-audited-activation-workflow.md`
- `knowledge/knowledge-enrichment-workflow.md`
- `knowledge/knowledge-product-policy.md`
- `skill-prompts/task-routing-and-skill-selection.md`
- `skill-prompts/project-manager-execution-ledger.md`
- `skill-prompts/inefficiency-and-improvement-reviewer.md`
- `tools/pm-knowledge-sufficiency.mjs`
- Global skill mirrors under `C:\Users\acer\.codex\skills`
- `knowledge/templates/auto-absorb-repo-batch-prompt.md`

## Auto-Activate After AI Audit

These should become active automatically when official/source-backed research is sufficient, license and safety boundaries are clear, no secrets or external code/assets are copied, validation and redaction pass, and AI audit passes:

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

## Keep Approval-Gated

Manual approval remains required for:

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

## Decision Model

AI-audited absorption should end in one of these outcomes:

- `auto_activate`
- `auto_enrich_active`
- `keep_candidate_due_to_weak_sources`
- `keep_candidate_due_to_risk`
- `require_user_approval_for_install_or_execution`
- `reject_or_restrict`

## Sufficiency Tool Changes Needed

The sufficiency gate should expose:

- `auto_absorption_allowed`
- `ai_audit_required`
- `auto_activation_allowed`
- `manual_approval_required`
- `manual_approval_reason`
- `recommended_absorption_action`

`activation_approval_required` should no longer be the controlling repo-absorption field for safe knowledge.
