$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
Write-Host "Codex workflow repo: $RepoRoot"
Write-Host "Git remote:"
git -C $RepoRoot remote -v
Write-Host "Git status:"
git -C $RepoRoot status --short

& (Join-Path $PSScriptRoot "validate-export.ps1")
exit $LASTEXITCODE
