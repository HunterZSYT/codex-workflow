# Research Artifact Policy

Default local-only locations:

- `C:\Users\acer\Documents\Last30Days`
- Task-local `work\last30days-*`
- Any directory set by `LAST30DAYS_MEMORY_DIR`

Can be synced only when sanitized and intentionally selected:

- short source-ledger summaries
- source links
- analysis notes without raw personal/session data
- approved briefs with no secrets, cookies, private URLs, or sensitive user data

Must stay local-only:

- raw `*-raw.md` or `*-raw.json`
- generated `*-brief.html` unless approved
- SQLite stores/databases
- `.env` files
- browser/session credentials
- API keys and app passwords

Source ledger conversion:

1. Record source URL.
2. Record source type.
3. Summarize what was learned in a few sentences.
4. Mark community/social sources as signal, not proof.
5. Verify durable facts through official docs/repos before activation.
