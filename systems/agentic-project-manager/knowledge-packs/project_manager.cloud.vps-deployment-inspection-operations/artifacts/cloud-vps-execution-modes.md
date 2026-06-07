# Cloud/VPS Execution Modes

## 1. Public URL Inspection Only

Allowed:
- Run public URL inspection, screenshots, DOM measurements, console/error capture, accessibility checks, and Lighthouse checks.

Blocked:
- SSH, admin/private pages, authenticated pages, stealth/bypass browsing, server changes.

Required proof:
- URL, final URL, viewport, screenshots/reports, overflow, console errors, failed requests, 4xx/5xx assets.

Output report:
- Public URL findings and next steps.

## 2. SSH Read-Only Inspection

Allowed:
- SSH inventory, file listing, config reading, logs, service status, runtime versions, ports, disk/memory, webroot mapping.

Blocked:
- Editing files, restarting/reloading services, deleting files, changing permissions, changing firewall, SQL writes, deployments, cache clears.

Required proof:
- Confirmed SSH target/user/host, environment type, read-only commands, redacted findings.

Output report:
- Inventory findings, likely causes, and proposed next diagnostics or change plan.

## 3. Change Plan Mode

Allowed:
- Prepare exact commands/file changes, backup plan, rollback plan, verification plan.

Blocked:
- Executing write commands or changing server state.

Required proof:
- Current state, target files/services, command preview, risk notes.

Output report:
- Approval-ready plan with rollback and verification.

## 4. Approved Implementation Mode

Allowed:
- Execute only commands and file changes explicitly approved by the user.

Blocked:
- Anything outside the approved command/file scope.

Required proof:
- Backup/snapshot confirmation, commands run, files changed, syntax checks, approved reload/restart if needed, public URL/log verification.

Output report:
- Implementation proof, before/after, rollback status, remaining risk.

## 5. Emergency Debugging Mode

Allowed:
- Fast read-only URL/server/log inspection and rollback planning.

Blocked:
- Destructive commands unless explicitly approved with scope.

Required proof:
- Target confirmation, production-safe handling, minimal command set, findings, next approved action.

Output report:
- Incident triage summary and safest next action.
