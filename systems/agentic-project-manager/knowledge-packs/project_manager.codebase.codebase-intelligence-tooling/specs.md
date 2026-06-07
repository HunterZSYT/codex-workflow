# Specs

## Tool Choice

- Known symbol, caller/callee, impact, trace: CodeGraph.
- Small known-file edit: rg/read direct files.
- Unknown project setup: project capability scan.
- Architecture/onboarding/domain understanding: Understand Anything or existing Understand skills when already available or explicitly requested.
- Large docs/source ingestion: Headroom analysis on sanitized local-only material when useful.

## Generated Artifact Policy

Never sync by default:

- `.understand-anything/`
- `.understand-anything/intermediate/`
- `.understand-anything/diff-overlay.json`
- knowledge graph JSON databases
- graph dashboards
- generated graph databases
- screenshots/logs from graph runs

## Approval Required

Ask before installing Understand Anything, enabling auto-update hooks, syncing generated graphs, or running graph generation on private/large repos outside the requested task.
