# Verification

This pack is candidate knowledge. Verification proves retrieval and readiness, not runtime Headroom behavior.

## Required Validation

- Run `pm-knowledge-index.mjs`.
- Run search tests:
  - `Headroom context compression`
  - `reversible compression CCR`
  - `compress tool outputs logs files`
  - `headroom learn AGENTS.md`
  - `MCP compression tool`
- Run `pm-pack-audit.mjs --id project_manager.context.headroom-compression-evaluation`.
- Run `project-manager-health-check.mjs`.
- Run `sync-from-local.ps1`, `validate-export.ps1`, and `redact-scan.ps1` before committing to `codex-workflow`.

## Future Pilot Verification

Do not run in this absorption task. If later approved, evaluate on sanitized fixtures:

- large JSON/API output
- build/test log with one failure
- grep/ripgrep output
- long diff
- multi-agent handoff note

For each fixture, record:

- tokens before/after
- compression ratio
- latency
- whether critical details survived
- whether CCR retrieves the original
- generated file paths
- telemetry state
- rollback steps
