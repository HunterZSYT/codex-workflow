# Ecosystem Scout Audit

Date: 2026-05-31

## Existing Policies Found

- Knowledge retrieval already exists through `pm-knowledge-search.mjs`, `pm-knowledge-related.mjs`, `pm-knowledge-dedupe.mjs`, `pm-knowledge-index.mjs`, and `pm-knowledge-sufficiency.mjs`.
- Project Manager already has Capability Gap Radar and Capability Orchestration Radar behavior.
- Pack Builder Workflow already routes "fill knowledgebase" prompts into candidate packs/blobs instead of immediate implementation.
- Existing indexed knowledge covers reuse-first component sourcing, knowledge retrieval, candidate-vs-active rules, CodeGraph/Serena/Understand Anything routing, and source-backed knowledge product behavior.

## Missing Behavior

- The system was too narrow when the user named one tool or domain. It tended to research the named item instead of scouting adjacent official tools, registries, repositories, templates, starters, package ecosystems, MCPs, and component sources.
- Knowledge Sufficiency Gate did not explicitly flag ecosystem discovery terms such as starter kit, registry, GitHub discovery, WordPress theme ecosystem, carousel library, or reusable source.
- Routing prompts did not strongly state "reuse first, orchestrate second, generate last" before custom generation.

## Skills / Prompts To Update

- `project-manager-execution-ledger`
- `task-routing-and-skill-selection`
- `inefficiency-and-improvement-reviewer`
- `verification-gate-controller`

Installed global skill mirrors under `C:\Users\acer\.codex\skills` should be updated with the same compact routing rules.

## New Blobs / Packs Needed

No new active pack is needed in this pass.

New knowledge docs are useful because this behavior is broad and architectural:

- `ecosystem-scout-policy.md`
- `ecosystem-source-map.md`
- `ecosystem-option-scorecard.md`
- `ecosystem-scout-workflow.md`

These are policy/workflow docs, not active candidate packs for one stack.

## Tools / Scripts Needed

No custom ecosystem crawler or GitHub trending scraper is needed now.

The existing retrieval and web/GitHub/package registry tools are enough. If repeated scouting becomes slow, create a candidate note in `learning/tool-update-candidates.md` before implementing a thin adapter.

## Duplicate-System Avoidance

- Keep ecosystem scouting inside the existing Project Manager knowledge/retrieval layer.
- Do not create a new skill unless no owner skill fits.
- Do not mark candidate knowledge active without approval.
- Do not sync generated `.retrieval` databases, indexes, caches, or downloaded source dumps.
