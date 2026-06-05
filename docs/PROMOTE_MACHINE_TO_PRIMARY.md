# Promote Machine To Primary

Use this only when intentionally moving primary ownership of `codex-workflow` to another machine.

Strong warning: never have two primary machines auto-syncing to `codex-workflow` at the same time.

## Checklist

1. Confirm the old primary is no longer syncing.
2. Pull the latest `codex-workflow`.
3. Restore locally with `restore-to-local.ps1`.
4. Configure Codex auth, MCP credentials, SSH, GitHub, Figma, Supabase, and database credentials manually.
5. Run health checks.
6. Run README updater dry-run:
   ```powershell
   node C:\Users\acer\.codex\agentic-project-manager\tools\pm-readme-update.mjs --repo "C:\Users\acer\codex-workflow" --dry-run
   ```
7. Run `sync-from-local.ps1` only after explicit approval.
8. Run `validate-export.ps1`.
9. Run `redact-scan.ps1`.
10. Review `git diff`.
11. Commit and push only if the diff is safe.
12. Register auto-sync only after a successful manual sync and redaction scan.

## Approval gate

Promotion changes the write owner for the source-of-truth repo. Do not infer promotion from a normal restore request.
