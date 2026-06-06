# Verification

This pack is active as a global context layer in SDK/tool mode. Verification proves routing, local analysis behavior, service state reporting, and export safety.

## Required Validation

- Run `pm-knowledge-index.mjs`.
- Run search tests:
  - `Headroom context compression`
  - `reversible compression CCR`
  - `compress tool outputs logs files`
  - `headroom learn AGENTS.md`
  - `MCP compression tool`
- Run `pm-pack-audit.mjs --id project_manager.context.headroom-compression-evaluation`.
- Run `pm-headroom-status.mjs`.
- Run `pm-headroom-context.mjs --file <safe-test-file> --mode analyze`.
- Run `project-manager-health-check.mjs`.
- Run `sync-from-local.ps1`, `validate-export.ps1`, and `redact-scan.ps1` before committing to `codex-workflow`.

## Pending Mode Verification

Do not enable MCP/service/proxy/wrapper/headroom_learn without separate safety review. If later approved, evaluate on sanitized fixtures:

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
