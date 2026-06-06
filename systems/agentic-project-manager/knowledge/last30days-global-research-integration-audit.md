# last30days Global Research Integration Audit

Date: 2026-06-06
Target repo: https://github.com/mvanhorn/last30days-skill
Target system: agentic-project-manager

## Existing Research And Scouting Workflow

- Local retrieval already routes through `pm-knowledge-search.mjs`, `pm-knowledge-sufficiency.mjs`, `ecosystem-scout-policy.md`, `ecosystem-scout-workflow.md`, `repo-absorption-workflow.md`, and source ledger templates.
- Ecosystem Scout already requires reuse-first discovery across official docs, official repos, GitHub discovery, package registries, component registries, MCP ecosystems, starters, templates, and safe public examples.
- Repo absorption already requires local retrieval, license/source review, generated report, source ledger, architecture mapping, and approval before activation.
- Knowledge Sufficiency Gate already detects external tool/library/MCP tasks, repo absorption, missing active knowledge, candidate-only knowledge, high-risk work, and activation/enrichment routing.
- Current HTML/report handling exists only as generic artifact behavior; there is no active current-community-signal layer for recent social/source research.

## Current Gaps

- No existing `last30days` knowledge entry or global skill was found.
- Current ecosystem scout policy names source categories but does not provide a single reusable tool for recent community sentiment, social proof, GitHub activity, and last-30-days public chatter.
- Source ledgers can record sources, but there is no dedicated workflow for collecting recent complaints, pain points, and adoption signals before pack/blob creation.
- Web search and Context7 cover current public/docs facts, but not the multi-source engagement-ranked research layer last30days targets.

## How last30days Can Help

- Adds a routed current-signal layer for ecosystem scouting, tool comparison, recent community sentiment, GitHub/project activity signal, social/community pain points, and shareable research briefs.
- Helps find candidate repos, MCPs, libraries, and current user complaints before official-doc verification and repo absorption.
- Can feed source ledgers with source links and short summaries when outputs are sanitized.
- Can produce HTML briefs for sharing when the user requests a brief.

## Overlap And Boundaries

- Official docs remain authoritative for implementation rules.
- Context7 remains preferred for current library/framework/API documentation.
- GitHub/source inspection remains primary for repo absorption, license, source code, releases, and issues.
- Web search remains general-purpose current public source lookup.
- last30days is for recent ecosystem/community signal, not final technical truth.
- Social engagement is evidence of attention/opinion, not proof of correctness.

## Risks

- Optional sources may require paid API keys or browser/session credentials.
- Raw research artifacts can include personal data, social posts, links, and raw markdown that should remain local-only unless sanitized.
- Browser/session credential flows must not be enabled silently.
- HTML briefs must not be synced by default unless deliberately sanitized and approved.
- The skill's output contract is large and should not be imported into `AGENTS.md`.

## Install Status

- Before install: no global `C:\Users\acer\.codex\skills\last30days` directory was present.
- Prerequisites found: Node `v24.14.1`, npm/npx `11.11.0`, Python `3.13.7`.
- Recommended install command: `npx skills add mvanhorn/last30days-skill -g`.

## Recommended Placement

- Install as global skill `C:\Users\acer\.codex\skills\last30days`.
- Add an active Project Manager knowledge pack at `project_manager.research.last30days-current-signal` if install and smoke verification pass.
- Add short routing pointers in Project Manager skill prompts and global skill mirrors.
- Keep raw last30days outputs under local-only memory/artifact directories, outside `codex-workflow` sync.
