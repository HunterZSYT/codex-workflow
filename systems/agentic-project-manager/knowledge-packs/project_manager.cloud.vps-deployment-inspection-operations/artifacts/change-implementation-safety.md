# Change Implementation Safety

## Before Changes

- Confirm target.
- Confirm environment.
- Confirm exact files/services.
- Create backup or verify existing backup.
- Record current state.
- Preview commands.
- Define rollback.
- Define verification steps.
- Ask for approval before any write/server-changing action.

## During Changes

- Make the smallest safe change.
- No destructive commands without approval.
- No database migration without backup.
- No broad `chmod`/`chown` commands without review.
- No service restart/reload without understanding impact and approval.
- No Nginx/Apache/OpenLiteSpeed config edit without syntax test plan.
- No file deletion without backup.
- Stay inside the approved command/file scope.

## After Changes

- Run syntax checks.
- Reload/restart only if approved.
- Inspect public URL.
- Check logs.
- Compare before/after.
- Produce final proof report.
