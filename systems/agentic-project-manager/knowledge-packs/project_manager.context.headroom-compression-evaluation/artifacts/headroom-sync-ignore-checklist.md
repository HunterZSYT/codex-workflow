# Headroom Sync Ignore Checklist

Candidate ignore notes for a future pilot. Verify exact paths before modifying ignore rules.

- `~/.headroom/`
- `.headroom/`
- `headroom.jsonl`
- `headroom*.log`
- `proxy_savings.json`
- `session_stats.jsonl`
- `models.json`
- `headroom.db`
- `*.headroom.db`
- Headroom SQLite/vector stores
- compressed/original CCR stores
- proxy traces
- agent session dumps
- generated failure-learning outputs unless reviewed
- environment/config files containing API keys, base URLs, provider tokens, or secrets

Sync rule: do not sync Headroom runtime stores, logs, traces, compressed originals, generated indexes, or failure-learning writes into `codex-workflow` unless explicitly reviewed and sanitized.
