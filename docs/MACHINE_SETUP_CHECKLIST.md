# Machine Setup Checklist

Default flow: secondary/new machines are restore-only.

## A. Secondary/new machine setup

- Install required prerequisites: Windows/PowerShell, Git, Node.js/npm, Codex environment, GitHub access.
- Clone `https://github.com/HunterZSYT/codex-workflow`.
- Review `docs/SECURITY_POLICY.md` and this checklist.
- Run `powershell -ExecutionPolicy Bypass -File scripts\restore-to-local.ps1`.
- Configure Codex auth manually.
- Configure MCPs manually from `codex/config.template.toml`.
- Configure SSH/VPS access only if needed.
- Configure database credentials only if needed.
- Run health checks.
- Rebuild the Project Manager knowledge index if needed.
- Verify skills and systems are present.
- Do not sync or push back to `codex-workflow`.

## B. Primary machine only

- Run `sync-from-local.ps1`.
- Run `validate-export.ps1`.
- Run `redact-scan.ps1`.
- Run `auto-sync-once.ps1` only on the primary PC.
- Register auto-sync only on the primary PC.
- Run `pm-readme-update.mjs` to refresh README and migration docs.
- Commit and push sanitized workflow exports only after validation and redaction scan pass.

## C. Never do on secondary unless promoted

- Do not run `sync-from-local.ps1`.
- Do not run `auto-sync-once.ps1`.
- Do not run `register-auto-sync-task.ps1`.
- Do not push to `codex-workflow`.
- Do not enable scheduled sync.
- Do not overwrite exported workflow assets upstream from local experiments.
