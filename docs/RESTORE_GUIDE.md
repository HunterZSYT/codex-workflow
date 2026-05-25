# Restore Guide

1. Clone the repository on the target machine.
2. Review `docs/SECURITY_POLICY.md`.
3. Run the restore script:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\restore-to-local.ps1
```

4. Reinstall or verify tool dependencies when prompted.
5. Manually configure:

- Codex login/auth
- `C:\Users\<user>\.codex\config.toml`
- MCP credentials
- GitHub auth
- Figma auth
- Supabase/Postgres credentials
- SSH keys and SSH config

The restore script does not create fake credentials and does not restore secrets.
