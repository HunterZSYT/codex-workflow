# Specs

## Trigger

Use last30days when a task asks for:

- current research
- last 30 days
- what people are saying
- current community sentiment
- trending tools/repos/libraries/MCPs
- recent complaints or pain points
- current ecosystem comparison
- founder/person/company current signal
- GitHub/project activity signal
- source discovery for a knowledge pack/blob
- repo absorption external chatter
- shareable HTML brief

## Required Routing

1. Run local retrieval first.
2. If current/community/ecosystem signal is needed, use last30days.
3. Preserve raw output path as local-only evidence.
4. Verify durable technical facts with official docs, Context7, package registries, and official repos.
5. Convert findings into short source-ledger entries, not raw dumps.
6. Run Knowledge Sufficiency Gate before implementation when the findings affect reusable knowledge.

## Safe Invocation Pattern

Use a local-only save directory:

```powershell
python C:\Users\acer\.agents\skills\last30days\scripts\last30days.py "<topic>" --quick --search reddit,hackernews,polymarket --emit=json --save-dir "<local-only-dir>"
```

For user-facing normal skill usage, invoke the installed `last30days` skill after Codex reloads its global skill list.

## Approval-Gated Actions

- Add or change API keys.
- Enable X/Twitter through browser/session credentials.
- Enable ScrapeCreators, OpenRouter, Brave, Apify, xAI, or similar paid/API sources.
- Enable persistent store/watchlist automation.
- Sync HTML briefs or raw outputs.
- Run browser cookie scans.
