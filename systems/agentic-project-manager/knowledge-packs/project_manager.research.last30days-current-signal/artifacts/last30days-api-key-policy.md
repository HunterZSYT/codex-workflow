# last30days API Key Policy

Optional variables include:

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

Rules:

- Never commit keys, cookies, tokens, app passwords, or `.env` files.
- Prefer zero-config/free sources first.
- Enable paid sources only after explicit user approval.
- Keep keys in local environment or local config only.
- Browser/session credential access requires explicit approval per run or setup.
- Do not enable ScrapeCreators, OpenRouter, xAI, Brave, Apify, or browser-cookie flows silently.
