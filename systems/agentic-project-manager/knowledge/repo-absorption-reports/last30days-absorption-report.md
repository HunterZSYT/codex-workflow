# last30days Absorption Report

Date: 2026-06-06
Source repo: https://github.com/mvanhorn/last30days-skill
Target capability: global current-research intelligence layer for Codex Workflow

## 1. Verdict

Install globally if the Agent Skills CLI succeeds, then integrate as a routed research layer. Use it for last-30-days ecosystem/community signal and source discovery. Do not let it replace official docs, Context7, GitHub source inspection, or high-stakes sources.

## 2. What last30days Is

`last30days` is an Agent Skill for researching what people are saying about a topic in the last 30 days across sources such as Reddit, X/Twitter, YouTube, TikTok, Instagram, Hacker News, Polymarket, GitHub, web search, Digg, Threads, Pinterest, Bluesky, and related public/social sources depending on configuration.

The runtime source of truth is `skills/last30days/SKILL.md`. The repository is MIT licensed.

## 3. How It Helps Our System

- Finds current tools, repos, libraries, MCPs, and adjacent ecosystem options.
- Collects community sentiment, recent complaints, real-world pain points, and adoption signals.
- Adds GitHub/project activity signal and social/community evidence to repo absorption.
- Produces research briefs and optional HTML briefs.
- Feeds source ledgers for packs/blobs after official-source verification.

## 4. What It Should Become In Our Architecture

An active Project Manager research source layer, routed by `task-routing-and-skill-selection` and used by the execution ledger when current ecosystem/community signal matters.

It should be called before or alongside ecosystem scouting, repo absorption, comparison, trend discovery, and knowledgebase-fill tasks, then followed by official docs/repo verification before implementation decisions.

## 5. Sources Supported

Zero-config/free according to README and SKILL.md:
- Reddit public JSON with comments
- Hacker News
- Polymarket
- GitHub

Optional/config-dependent:
- X/Twitter through browser tokens, xAI, xurl, or related auth paths
- YouTube through `yt-dlp`
- TikTok, Instagram, Threads, Pinterest, YouTube/TikTok comments through ScrapeCreators
- Bluesky through app password
- Web/auto-resolve through Brave, Exa, Serper, Parallel, OpenRouter, or native host WebSearch fallback
- Perplexity through OpenRouter
- Apify fallback sources

## 6. Credentials And Paid-Source Risks

Optional variables include `SCRAPECREATORS_API_KEY`, `OPENAI_API_KEY`, `XAI_API_KEY`, `OPENROUTER_API_KEY`, `PARALLEL_API_KEY`, `BRAVE_API_KEY`, `APIFY_API_TOKEN`, `AUTH_TOKEN`, `CT0`, `BSKY_HANDLE`, `BSKY_APP_PASSWORD`, and `TRUTHSOCIAL_TOKEN`.

Paid or sensitive sources must not be enabled silently. Browser/session tokens, app passwords, and paid API keys must stay local and never sync to `codex-workflow`.

## 7. Artifact Behavior

Default output directory is `LAST30DAYS_MEMORY_DIR`, falling back to `~/Documents/Last30Days` or `C:\Users\<you>\Documents\Last30Days` on Windows. Each run can create raw markdown such as `<slug>-raw.md`. HTML mode can create `<topic>-brief.html`.

Watchlist/store mode can persist findings into SQLite. These raw artifacts and databases are local-only by default.

## 8. Sync Exclusions

Do not sync:
- `Documents\Last30Days\`
- `.config\last30days\.env`
- `.claude\last30days.env`
- raw `*-raw.md`
- generated `*-brief.html` unless sanitized and approved
- SQLite stores/databases
- browser/session credentials
- API keys or app passwords

## 9. What Not To Use It For

- Official API behavior or exact install commands unless official docs confirm them.
- Legal, medical, financial, security, production, auth, payment, or other high-stakes conclusions by itself.
- Private/internal information collection.
- Bypassing paywalls/authentication/ToS.
- Writing final implementation rules from social chatter alone.

## 10. Approval Needed For Optional APIs

Approval is required before adding any real key, enabling paid sources, scanning browser cookies/sessions, enabling store/watchlist automation, or syncing any generated brief/artifact.

## 11. Final Integration Decision

Proceed with global install and active pack creation if installation and smoke verification pass. Keep optional paid/API sources disabled. Route last30days as current-signal evidence that feeds source ledgers, not as final authority.
