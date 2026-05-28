$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$Findings = New-Object System.Collections.Generic.List[object]

$ExcludedDirs = @(
  ".git",
  "node_modules",
  ".ai-task",
  "qa",
  ".codegraph",
  ".understand-anything",
  ".retrieval"
)

$AllowedPlaceholderTokens = @(
  "YOUR_TOKEN_HERE",
  "YOUR_API_KEY_HERE",
  "YOUR_PASSWORD_HERE",
  "REPLACE_ME",
  "placeholder",
  "<token>",
  "<password>",
  "<secret>"
)

function Get-SafeRelativePath {
  param([string]$BasePath, [string]$FullPath)
  $base = (Resolve-Path -LiteralPath $BasePath).Path.TrimEnd("\")
  $full = (Resolve-Path -LiteralPath $FullPath).Path
  if ($full.StartsWith($base, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $full.Substring($base.Length).TrimStart("\").Replace("\", "/")
  }
  return $full.Replace("\", "/")
}

function Test-IsIgnoredLine {
  param([string]$Line, [string]$RelativePath)

  if ($RelativePath -eq "scripts/redact-scan.ps1" -and $Line -match "OPENAI_API_KEY|API_KEY|SECRET|TOKEN|PASSWORD|PRIVATE KEY|DATABASE_URL|POSTGRES_URL|MYSQL_URL|SUPABASE_SERVICE_ROLE|STRIPE_SECRET|GITHUB_TOKEN|auth\.json|\.env") {
    return $true
  }

  foreach ($placeholder in $AllowedPlaceholderTokens) {
    if ($Line -like "*$placeholder*") { return $true }
  }

  if ($Line -match "Never commit|Do not commit|manual|template|warning|example|placeholder|outside Git|must be configured manually") {
    return $true
  }

  return $false
}

function Add-Finding {
  param([string]$Path, [int]$LineNumber, [string]$Reason)
  $Findings.Add([pscustomobject]@{
    path = $Path
    line = $LineNumber
    reason = $Reason
  }) | Out-Null
}

$Files = Get-ChildItem -LiteralPath $RepoRoot -Recurse -File -Force | Where-Object {
  $relative = Get-SafeRelativePath $RepoRoot $_.FullName
  foreach ($dir in $ExcludedDirs) {
    if ($relative -eq $dir -or $relative.StartsWith("$dir/")) { return $false }
  }
  return $true
}

foreach ($file in $Files) {
  $relative = Get-SafeRelativePath $RepoRoot $file.FullName

  if ($relative -match "(^|/)(auth\.json|\.env(\..*)?|id_rsa|id_ed25519)$") {
    Add-Finding $relative 0 "Forbidden filename"
    continue
  }

  if ($relative -match "\.(pem|key|ppk|sqlite|sqlite3|db|dump|sql)$") {
    Add-Finding $relative 0 "Forbidden sensitive file extension"
    continue
  }

  $lineNumber = 0
  foreach ($line in Get-Content -LiteralPath $file.FullName -ErrorAction SilentlyContinue) {
    $lineNumber++
    if (Test-IsIgnoredLine -Line $line -RelativePath $relative) { continue }

    if ($line -match "-----BEGIN (OPENSSH|RSA|DSA|EC|PRIVATE) PRIVATE KEY-----") {
      Add-Finding $relative $lineNumber "Private key marker"
    }
    elseif ($line -match "(?i)(OPENAI_API_KEY|GITHUB_TOKEN|STRIPE_SECRET|SUPABASE_SERVICE_ROLE)\s*[:=]\s*['""]?[A-Za-z0-9_\-]{16,}") {
      Add-Finding $relative $lineNumber "High-risk token assignment"
    }
    elseif ($line -match "(?i)(API_KEY|SECRET|TOKEN|PASSWORD)\s*[:=]\s*['""]?[^'""\s#]{12,}") {
      Add-Finding $relative $lineNumber "Secret-like assignment"
    }
    elseif ($line -match "(?i)(DATABASE_URL|POSTGRES_URL|MYSQL_URL)\s*[:=]\s*['""]?\w+://[^'""\s]+:[^'""\s]+@") {
      Add-Finding $relative $lineNumber "Database URL with embedded password"
    }
    elseif ($line -match "(?i)\b(Bearer|Basic)\s+[A-Za-z0-9._~+/=-]{16,}") {
      Add-Finding $relative $lineNumber "Auth header/token value"
    }
    elseif ($line -match "(?i)(cookie|set-cookie|authorization)\s*[:=]\s*[^`r`n]+") {
      Add-Finding $relative $lineNumber "Cookie/auth header"
    }
    elseif ($line -match "(?i)(email|user(name)?).*(password|pwd|pass)\s*[:=]") {
      Add-Finding $relative $lineNumber "Email/password pair"
    }
    elseif ($line -match "(?i)(prod|production)[A-Za-z0-9.-]+\.(com|net|org|io|bd)\b") {
      Add-Finding $relative $lineNumber "Potential production hostname"
    }
    elseif ($line -match "(?i)(env|environment).*(password|secret|token|key)\s*[:=]\s*[^`r`n]+") {
      Add-Finding $relative $lineNumber "Stack trace or env line with secret-like value"
    }
    elseif ($relative -like "systems/*/knowledge-packs/*/artifacts/*" -and $line -match "(?i)<html|<!doctype html|wp-content|webpackJsonp|__NEXT_DATA__") {
      Add-Finding $relative $lineNumber "Potential copied site source dump in knowledge pack artifact"
    }
    elseif ($line -match "ssh-ed25519\s+[A-Za-z0-9+/=]{50,}\s*$" -and $line -notmatch "\.pub|public key") {
      Add-Finding $relative $lineNumber "SSH key material"
    }
  }
}

if ($Findings.Count -gt 0) {
  Write-Host "REDACT SCAN FAILED" -ForegroundColor Red
  $Findings | Format-Table -AutoSize
  exit 1
}

Write-Host "REDACT SCAN PASSED"
exit 0
