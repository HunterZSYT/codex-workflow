$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$ExpectedRemote = "https://github.com/HunterZSYT/codex-workflow.git"
$LogPath = Join-Path $RepoRoot "manifests/auto-sync-last-run.log"

function Resolve-GitExe {
  $command = Get-Command git.exe -ErrorAction SilentlyContinue
  if ($command) { return $command.Source }

  $candidates = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe"
  )

  foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate) { return $candidate }
  }

  throw "git.exe was not found. Install Git for Windows or add git.exe to PATH for scheduled tasks."
}

function Invoke-Git {
  param([string[]]$Arguments)
  Write-Host "Running git $($Arguments -join ' ')"
  $previousPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $output = & $GitExe @Arguments 2>&1
  $ErrorActionPreference = $previousPreference
  $code = $LASTEXITCODE
  if ($output) { $output | ForEach-Object { Write-Host $_ } }
  if ($code -ne 0) {
    throw "git exited with code $code for arguments: $($Arguments -join ' ')"
  }
  return $output
}

Start-Transcript -Path $LogPath -Force | Out-Null

try {
Write-Host "Auto sync started: $(Get-Date -Format o)"

$GitExe = Resolve-GitExe
$env:PATH = "$(Split-Path -Parent $GitExe);$env:PATH"
$safeRepoPath = $RepoRoot.Replace("\", "/")
$env:GIT_CONFIG_COUNT = "1"
$env:GIT_CONFIG_KEY_0 = "safe.directory"
$env:GIT_CONFIG_VALUE_0 = $safeRepoPath
Write-Host "Using git: $GitExe"
Write-Host "Using per-process git safe.directory: $safeRepoPath"

$origin = Invoke-Git @("-C", $RepoRoot, "remote", "get-url", "origin")
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

$status = Invoke-Git @("-C", $RepoRoot, "status", "--short")
if (-not $status) {
  Write-Host "No changes to sync."
  exit 0
}

Write-Host "Files to commit:"
$status

Invoke-Git @("-C", $RepoRoot, "add", "README.md", "AGENTS.md", ".gitignore", ".gitattributes", "docs", "codex", "skills", "systems", "scripts", "manifests") | Out-Null

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
Invoke-Git @("-C", $RepoRoot, "commit", "-m", "chore: sync codex workflow $timestamp") | Out-Null

Invoke-Git @("-C", $RepoRoot, "push", "origin", "main") | Out-Null
exit 0
}
finally {
  Write-Host "Auto sync finished: $(Get-Date -Format o)"
  Stop-Transcript | Out-Null
}
