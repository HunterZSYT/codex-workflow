# last30days Secret And Artifact Policy

Date: 2026-06-06

## Optional Environment Variables

Sensitive or paid/API-related variables include:

- `SCRAPECREATORS_API_KEY`
- `OPENAI_API_KEY`
- `XAI_API_KEY`
- `OPENROUTER_API_KEY`
- `PARALLEL_API_KEY`
- `BRAVE_API_KEY`
- `APIFY_API_TOKEN`
- `AUTH_TOKEN`
- `CT0`
- `BSKY_HANDLE`
- `BSKY_APP_PASSWORD`
- `TRUTHSOCIAL_TOKEN`

## Rules

- Never commit API keys, browser cookies, session tokens, app passwords, `.env` files, or local auth state.
- Enable paid/API/browser/session sources only after explicit user approval.
- Prefer zero-config/free sources first.
- Store keys only in local environment or local config.
- Do not sync project-scoped `.claude\last30days.env` or user-scoped `.config\last30days\.env`.
- Do not scan browser cookies or sessions unless the user explicitly approves that action.

## Local Artifacts

Default artifact location:

- `C:\Users\<user>\Documents\Last30Days`

Other allowed local-only locations:

- task-local `work\last30days-*`
- user-selected `LAST30DAYS_MEMORY_DIR`

Do not sync by default:

- raw `*-raw.md`
- raw `*-raw.json`
- generated `*-brief.html`
- SQLite stores/databases
- debug logs
- `.env` files
- browser/session credentials

## HTML Briefs

HTML briefs may be useful for sharing, but they can contain social/source quotes and links. Keep them local-only unless the user explicitly asks to produce a shareable artifact and it passes redaction review.

## Sanitized Source Ledger Use

Allowed synced material:

- source URLs
- short source summaries
- trust level
- whether the source is official, repo, registry, issue, expert, or community/social signal
- verification status

Do not sync raw transcripts, raw social dumps, or credential-derived private data.
