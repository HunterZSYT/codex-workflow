# Source Ledger

Date checked: 2026-06-06
Task: Integrate last30days as the global current-research intelligence layer for Codex Workflow.
Approval status: user approved global install and integration; optional paid/API/browser/session sources remain approval-gated.

## Sources Reviewed

- https://github.com/mvanhorn/last30days-skill
  - Type: official GitHub repository.
  - Extracted: purpose, install commands, source categories, zero-config claims, HTML brief behavior, default artifact directory, update command, open-source license summary.
  - Reliability: primary source.

- `skills/last30days/SKILL.md`
  - Type: official runtime skill specification.
  - Extracted: version 3.3.1, optional environment variables, setup wizard behavior, source availability logic, artifact save behavior, security and permissions section.
  - Reliability: primary source.

- `README.md`
  - Type: official repo documentation.
  - Extracted: `npx skills add mvanhorn/last30days-skill -g`, zero-config sources, optional source matrix, HTML brief behavior, memory directory default.
  - Reliability: primary source.

- `CONFIGURATION.md`
  - Type: official repo configuration documentation.
  - Extracted: `.env` locations, API key matrix, memory directory override, paid source notes, store/watchlist behavior.
  - Reliability: primary source.

- `LICENSE`
  - Type: official license.
  - Extracted: MIT license.
  - Reliability: primary source.

- Local install command: `npx skills add mvanhorn/last30days-skill -g`
  - Type: local installer evidence.
  - Extracted: global skill installed at `C:\Users\acer\.agents\skills\last30days`; installer reported high-risk assessment and PromptScript global-install failure while Codex global install succeeded.
  - Reliability: local command output.

- Local diagnostics: `python C:\Users\acer\.agents\skills\last30days\scripts\last30days.py --diagnose`
  - Type: local runtime evidence.
  - Extracted: available zero-key sources on this machine are Reddit, Hacker News, and Polymarket; optional providers absent.
  - Reliability: local command output.

## Rejected Source Actions

- Did not add real API keys.
- Did not configure paid API sources.
- Did not scan browser cookies or session credentials.
- Did not sync raw smoke-test artifacts.
- Did not copy repo source into `codex-workflow`.
