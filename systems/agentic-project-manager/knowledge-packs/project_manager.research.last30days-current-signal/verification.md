# Verification

## Completed

- `npx skills add mvanhorn/last30days-skill -g` completed.
- `npx skills list -g` showed `last30days` at `C:\Users\acer\.agents\skills\last30days` for Codex.
- `SKILL.md` exists and reports version 3.3.1.
- `scripts\last30days.py --help` completed.
- `scripts\last30days.py --diagnose` completed.
- Diagnostic zero-key sources: Reddit, Hacker News, Polymarket.
- Safe smoke query completed with `--quick --search reddit,hackernews,polymarket --emit=json --save-dir <task work dir>`.

## Required Before Sync/Commit

- Run `pm-knowledge-index.mjs`.
- Run search tests for last30days routing queries.
- Run `pm-pack-audit.mjs --id project_manager.research.last30days-current-signal`.
- Run `project-manager-health-check.mjs`.
- Run sync, validate export, and redaction scan.

## Known Limitations

- The current conversation will not automatically load newly installed global skills until Codex refresh/restart.
- GitHub source support is documented by the repo but was not active in local `--diagnose`.
- The smoke query used deterministic planning and free sources only.
