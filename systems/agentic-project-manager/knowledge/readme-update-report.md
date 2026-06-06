# README Update Report

Generated: 2026-06-06T06:59:25.844Z

## Files scanned

- Total files scanned: 1057
- Docs scanned: 14

## README sections updated

- What this repo is
- Source-of-truth model
- What this repo contains
- What is not stored
- New PC prerequisites
- Restore on another PC
- Primary PC sync workflow
- Secondary machine rules
- Auto-sync
- Updating README and migration docs
- Troubleshooting

## Docs updated

- README.md
- docs/RESTORE_GUIDE.md
- docs/MCP_SETUP.md
- docs/MACHINE_SETUP_CHECKLIST.md
- docs/PROMOTE_MACHINE_TO_PRIMARY.md
- docs/SYSTEM_INVENTORY.md

## Detected prerequisites

- Windows 10/11 or compatible PowerShell environment
- Git
- Node.js/npm
- Codex CLI / Codex environment
- PowerShell script execution permission
- GitHub access to HunterZSYT/codex-workflow

## Unknown prerequisites needing manual confirmation

- Python availability for skill validation scripts
- Docker availability for backend/VPS tasks
- uv/uvx availability for Serena
- Database CLIs required by active project work

## Primary-only scripts

- auto-sync-once.ps1
- register-auto-sync-task.ps1
- run-auto-sync-hidden.vbs
- sync-from-local.ps1
- unregister-auto-sync-task.ps1

## Secondary-safe scripts

- health-check.ps1
- redact-scan.ps1
- restore-to-local.ps1
- validate-export.ps1

## Warnings

- Secondary machines must not sync, auto-sync, or push to codex-workflow by default.
- Review-before-use scripts detected: log-user-response.ps1
- Redaction-sensitive filenames were found in scanned paths; review before commit.

## Redaction-sensitive findings

- manifests/auto-sync-last-run.log
