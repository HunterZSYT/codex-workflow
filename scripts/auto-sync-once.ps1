$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$ExpectedRemote = "https://github.com/HunterZSYT/codex-workflow.git"
$LogPath = Join-Path $RepoRoot "manifests/auto-sync-last-run.log"

Start-Transcript -Path $LogPath -Force | Out-Null

try {
Write-Host "Auto sync started: $(Get-Date -Format o)"

$origin = git -C $RepoRoot remote get-url origin
if ($origin -ne $ExpectedRemote) {
  Write-Error "Unexpected origin remote: $origin"
  exit 1
}

& (Join-Path $PSScriptRoot "sync-from-local.ps1")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& (Join-Path $PSScriptRoot "validate-export.ps1")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& (Join-Path $PSScriptRoot "redact-scan.ps1")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$status = git -C $RepoRoot status --short
if (-not $status) {
  Write-Host "No changes to sync."
  exit 0
}

Write-Host "Files to commit:"
$status

git -C $RepoRoot add README.md AGENTS.md .gitignore .gitattributes docs codex skills systems scripts manifests

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git -C $RepoRoot commit -m "chore: sync codex workflow $timestamp"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

git -C $RepoRoot push origin main
exit $LASTEXITCODE
}
finally {
  Write-Host "Auto sync finished: $(Get-Date -Format o)"
  Stop-Transcript | Out-Null
}
