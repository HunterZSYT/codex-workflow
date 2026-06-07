# Examples

## URL Only

User: "Check https://example.com on mobile for overflow."

Mode: Public URL inspection only.

Action: Run `frontend-inspect.mjs` with desktop and mobile presets, then report overflow, console errors, failed requests, and screenshot/report paths.

## URL Plus SSH

User: "Debug why my WordPress site at https://example.com is throwing 500s. SSH alias is prodsite."

Mode: SSH read-only inspection first.

Action: Confirm production status, run read-only URL and SSH checks, inspect logs, identify likely cause, then prepare a change plan. Do not edit files or restart services without approval.

## Deployment Fix

User: "Deploy my Laravel app to the VPS."

Mode: Change plan mode, then approved implementation mode only after approval.

Action: Inspect stack, env names only, process manager, web server, DB/migration status, backups, deployment method, command preview, rollback, and verification.

## Emergency

User: "Live checkout is down."

Mode: Emergency debugging mode.

Action: Confirm target and production status, prioritize read-only public URL, logs, service status, cache/CDN clues, and rollback options. Avoid destructive commands unless the user explicitly approves a scoped action.
