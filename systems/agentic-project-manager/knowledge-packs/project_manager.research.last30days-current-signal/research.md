# Research

## Capability Summary

last30days is a global current-signal research skill. It searches recent public/community sources, ranks by engagement and relevance, and emits grounded research output plus optional saved artifacts.

It gives Codex Workflow a reusable way to answer:

- What changed recently?
- What are people saying?
- Which tools/repos are trending?
- What complaints or pain points are appearing?
- What sources should feed a pack/blob source ledger?
- Which current ecosystem options deserve official-doc or repo verification?

## Local Fit

This capability fits Project Manager rather than frontend/backend directly. Frontend and backend owner skills should call into it when their work needs current ecosystem/community signal.

## Verified Install

- Installed at `C:\Users\acer\.agents\skills\last30days`.
- `SKILL.md` version: 3.3.1.
- Main script help works.
- Diagnostics work.
- Smoke query with Reddit, Hacker News, and Polymarket completed and saved output under task-local `work\last30days-smoke`.

## Runtime Reality On This Machine

The README says Reddit, HN, Polymarket, and GitHub work immediately. The local `--diagnose` output reported Reddit, Hacker News, and Polymarket available, with `has_github: false`. Treat GitHub as source-supported but not locally verified until a later diagnostic or query proves it.

## Installer Risk Signal

The Agent Skills installer reported a high-risk assessment for last30days. This is consistent with a broad research skill that can run scripts, access networks, save files, and use optional credentials. Keep it approval-gated for paid/browser/session sources and raw artifact sync.
