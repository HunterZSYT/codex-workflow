$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$Missing = New-Object System.Collections.Generic.List[string]
$Warnings = New-Object System.Collections.Generic.List[string]

function Get-SafeRelativePath {
  param([string]$BasePath, [string]$FullPath)
  $base = (Resolve-Path -LiteralPath $BasePath).Path.TrimEnd("\")
  $full = (Resolve-Path -LiteralPath $FullPath).Path
  if ($full.StartsWith($base, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $full.Substring($base.Length).TrimStart("\").Replace("\", "/")
  }
  return $full.Replace("\", "/")
}

function Require-Path {
  param([string]$RelativePath)
  $path = Join-Path $RepoRoot $RelativePath
  if (-not (Test-Path -LiteralPath $path)) {
    $Missing.Add($RelativePath) | Out-Null
  }
}

@(
  "README.md",
  "AGENTS.md",
  ".gitignore",
  ".gitattributes",
  "docs/OVERVIEW.md",
  "docs/SECURITY_POLICY.md",
  "docs/RESTORE_GUIDE.md",
  "docs/MCP_SETUP.md",
  "docs/WORKFLOW_ARCHITECTURE.md",
  "docs/CHANGELOG.md",
  "codex/config.template.toml",
  "codex/manual-auth-needed.md",
  "systems/agentic-frontend",
  "systems/agentic-backend-database",
  "systems/agentic-project-manager",
  "skills",
  "scripts/sync-from-local.ps1",
  "scripts/restore-to-local.ps1",
  "scripts/validate-export.ps1",
  "scripts/redact-scan.ps1",
  "scripts/register-auto-sync-task.ps1",
  "scripts/unregister-auto-sync-task.ps1",
  "scripts/auto-sync-once.ps1",
  "scripts/health-check.ps1",
  "manifests/export-manifest.json",
  "manifests/restore-manifest.json",
  "manifests/last-sync-summary.json"
) | ForEach-Object { Require-Path $_ }

$Forbidden = @(
  "node_modules",
  "auth.json",
  ".env",
  ".env.local",
  ".env.production",
  "config.toml"
)

foreach ($name in $Forbidden) {
  $matches = Get-ChildItem -LiteralPath $RepoRoot -Recurse -Force -ErrorAction SilentlyContinue | Where-Object {
    $relative = Get-SafeRelativePath $RepoRoot $_.FullName
    if ($relative -eq ".git" -or $relative.StartsWith(".git/")) { return $false }
    if ($name -eq "config.toml" -and $relative -eq "codex/config.template.toml") { return $false }
    $_.Name -eq $name
  }
  foreach ($match in $matches) {
    $Warnings.Add("Forbidden item found: $(Get-SafeRelativePath $RepoRoot $match.FullName)") | Out-Null
  }
}

$keyFiles = Get-ChildItem -LiteralPath $RepoRoot -Recurse -File -Force -ErrorAction SilentlyContinue | Where-Object {
  $relative = Get-SafeRelativePath $RepoRoot $_.FullName
  if ($relative -eq ".git" -or $relative.StartsWith(".git/")) { return $false }
  $_.Name -match "^(id_rsa|id_ed25519)$" -or $_.Extension -match "^\.(pem|key|ppk)$"
}
foreach ($keyFile in $keyFiles) {
  $Warnings.Add("Private key-like file found: $(Get-SafeRelativePath $RepoRoot $keyFile.FullName)") | Out-Null
}

& (Join-Path $PSScriptRoot "redact-scan.ps1")
$redactExit = $LASTEXITCODE
if ($redactExit -ne 0) {
  $Warnings.Add("Redact scan failed") | Out-Null
}

Write-Host "VALIDATION SUMMARY"
Write-Host "Missing required paths: $($Missing.Count)"
foreach ($item in $Missing) { Write-Host "MISSING: $item" }
Write-Host "Warnings: $($Warnings.Count)"
foreach ($item in $Warnings) { Write-Host "WARNING: $item" }

if ($Missing.Count -gt 0 -or $Warnings.Count -gt 0) {
  Write-Host "VALIDATION FAILED" -ForegroundColor Red
  exit 1
}

Write-Host "VALIDATION PASSED"
exit 0
