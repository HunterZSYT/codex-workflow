$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$CodexRoot = Join-Path $env:USERPROFILE ".codex"
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

function Ensure-Dir {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
  }
}

function Backup-And-Restore {
  param([string]$SourceRelative, [string]$Destination)
  $source = Join-Path $RepoRoot $SourceRelative
  if (-not (Test-Path -LiteralPath $source)) {
    Write-Host "Skipping missing source: $SourceRelative"
    return
  }

  if (Test-Path -LiteralPath $Destination) {
    $backup = "$Destination.backup-before-codex-workflow-restore-$Timestamp"
    Move-Item -LiteralPath $Destination -Destination $backup
    Write-Host "Backed up: $Destination -> $backup"
  }

  Ensure-Dir (Split-Path -Parent $Destination)
  Copy-Item -LiteralPath $source -Destination $Destination -Recurse -Force
  Write-Host "Restored: $SourceRelative -> $Destination"
}

Ensure-Dir $CodexRoot

Backup-And-Restore "systems/agentic-frontend" (Join-Path $CodexRoot "agentic-frontend")
Backup-And-Restore "systems/agentic-backend-database" (Join-Path $CodexRoot "agentic-backend-database")
Backup-And-Restore "systems/agentic-project-manager" (Join-Path $CodexRoot "agentic-project-manager")
Backup-And-Restore "skills" (Join-Path $CodexRoot "skills")

$toolFolders = @(
  (Join-Path $CodexRoot "agentic-frontend/tools"),
  (Join-Path $CodexRoot "agentic-backend-database/tools"),
  (Join-Path $CodexRoot "agentic-project-manager/tools")
)

foreach ($folder in $toolFolders) {
  if (Test-Path -LiteralPath (Join-Path $folder "package.json")) {
    Write-Host "Installing dependencies in $folder"
    npm install --prefix $folder
  }
}

$healthChecks = @(
  (Join-Path $CodexRoot "agentic-frontend/tools/agentic-health-check.mjs"),
  (Join-Path $CodexRoot "agentic-backend-database/tools/backend-db-health-check.mjs"),
  (Join-Path $CodexRoot "agentic-project-manager/tools/project-manager-health-check.mjs")
)

foreach ($check in $healthChecks) {
  if (Test-Path -LiteralPath $check) {
    node $check
  }
}

Write-Host ""
Write-Host "Manual steps still required:"
Write-Host "- Sign in to Codex manually"
Write-Host "- Create real config.toml from codex/config.template.toml"
Write-Host "- Configure MCP credentials manually"
Write-Host "- Configure GitHub/Figma/Supabase/Postgres auth manually"
Write-Host "- Configure SSH keys and ~/.ssh/config securely outside Git"
