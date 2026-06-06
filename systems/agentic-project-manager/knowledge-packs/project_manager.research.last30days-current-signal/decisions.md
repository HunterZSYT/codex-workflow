# Decisions

## Decision 1: Activate As Global Research Layer

Decision: active.

Reason: user explicitly requested implementation and absorption, install passed for Codex global Agent Skills, diagnostics passed, and a zero-key smoke query succeeded.

## Decision 2: Do Not Duplicate Into `.codex\skills`

Decision: use the Agent Skills global install path `C:\Users\acer\.agents\skills\last30days`.

Reason: `npx skills list -g` reports the skill as global for Codex at that path. Creating a manual `.codex\skills\last30days` copy would create duplicate skill state.

## Decision 3: Keep Optional Sources Off

Decision: paid/API/browser/session sources remain pending.

Reason: optional sources may require API keys, app passwords, browser cookies, session tokens, or paid APIs.

## Decision 4: Official Docs Remain Authoritative

Decision: last30days can discover current signal and sources, but implementation truth must be verified through official docs, package registries, and official repositories.

## Decision 5: Raw Artifacts Stay Local-Only

Decision: raw research markdown, JSON, HTML briefs, stores, logs, and env/config files are not synced by default.
