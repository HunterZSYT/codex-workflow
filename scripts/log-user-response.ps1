param(
  [switch]$Help,
  [string]$TaskId = "",
  [string]$RelatedArtifact = "",
  [ValidateSet("ui","prompt","script","skill","docs","config","database","backend","frontend","deployment","analysis","workflow","other")]
  [string]$ArtifactType = "other",
  [string]$SignalType = "",
  [string]$Summary = "",
  [string]$Phrase = "",
  [string]$Action = "",
  [string]$NextAction = "",
  [ValidateSet("accepted","needs_revision","revised","blocked","deferred","escalated","unknown")]
  [string]$Status = "unknown",
  [ValidateSet("yes","no","maybe")]
  [string]$ReusablePreferenceCandidate = "no",
  [ValidateSet("no","maybe","yes")]
  [string]$ShouldUpdateMemoryOrSkill = "no",
  [string]$SafetyNotes = "",
  [string]$LinkedFilesChanged = "",
  [string]$VerificationAfterChange = "",
  [string]$TaskDir = ".ai-task"
)

$ErrorActionPreference = "Stop"

if ($Help -or -not $SignalType -or -not $Summary) {
  @"
Usage:
  powershell -ExecutionPolicy Bypass -File scripts\log-user-response.ps1 `
    -TaskId "homepage-redesign" `
    -ArtifactType "ui" `
    -SignalType "style_preference, modification_request" `
    -Summary "User wants hero to feel more premium and less empty." `
    -Phrase "make the hero more premium" `
    -Action "Revise hero density, spacing, typography, and hierarchy." `
    -Status "needs_revision"

Writes:
  .ai-task/user-response-ledger.md

Notes:
  - Store summarized feedback, not full transcripts.
  - Redact or skip secrets, credentials, cookies, auth headers, database URLs, SSH details, and private data.
"@
  exit 0
}

$AllowedSignals = @(
  "approval",
  "correction",
  "modification_request",
  "style_preference",
  "rejection",
  "bug_report",
  "scope_change",
  "decision",
  "reusable_rule_candidate",
  "blocked_or_unclear"
)

function Sanitize {
  param([string]$Value)
  if (-not $Value) { return "" }
  $text = $Value
  $text = $text -replace '-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----', '[REDACTED_PRIVATE_KEY]'
  $text = $text -replace '(?i)\b(Bearer|Basic)\s+[A-Za-z0-9._~+/=-]+', '$1 [REDACTED_AUTH]'
  $text = $text -replace '(?i)(authorization|cookie|set-cookie)\s*[:=]\s*[^\r\n]+', '$1: [REDACTED]'
  $text = $text -replace '\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b', '[REDACTED_EMAIL]'
  $text = $text -replace '(?i)\b(?:postgres|postgresql|mysql|mariadb|mongodb|redis):\/\/[^\s''"`]+', '[REDACTED_DB_URL]'
  $text = $text -replace '(?i)((?:api[_-]?key|token|secret|password|passwd|pwd)\s*[:=]\s*)["'']?[^"''\s]+', '$1[REDACTED]'
  return $text.Trim()
}

$Signals = $SignalType -split "," | ForEach-Object { $_.Trim() } | Where-Object { $_ }
$InvalidSignals = $Signals | Where-Object { $AllowedSignals -notcontains $_ }
if ($InvalidSignals.Count -gt 0) {
  throw "Invalid signal type(s): $($InvalidSignals -join ', '). Allowed: $($AllowedSignals -join ', ')"
}

if (-not (Test-Path -LiteralPath $TaskDir)) {
  New-Item -ItemType Directory -Force -Path $TaskDir | Out-Null
}

$LedgerPath = Join-Path $TaskDir "user-response-ledger.md"
if (-not (Test-Path -LiteralPath $LedgerPath)) {
  @"
# User Response Ledger

Task-local sanitized feedback ledger. Do not store full conversations or secrets.

"@ | Set-Content -LiteralPath $LedgerPath -Encoding UTF8
}

$Entry = @"
## $(Get-Date -Format o)
Task ID: $(Sanitize $TaskId)
Related artifact: $(Sanitize $RelatedArtifact)
Artifact type: $(Sanitize $ArtifactType)
User signal type: $(Sanitize ($Signals -join ", "))
User feedback summary: $(Sanitize $Summary)
Direct user phrase short: $(Sanitize $Phrase)
Interpreted action: $(Sanitize $Action)
Change made or next action: $(Sanitize $NextAction)
Status after response: $(Sanitize $Status)
Reusable preference candidate: $(Sanitize $ReusablePreferenceCandidate)
Should update memory or skill: $(Sanitize $ShouldUpdateMemoryOrSkill)
Safety notes: $(Sanitize $SafetyNotes)
Linked files changed: $(Sanitize $LinkedFilesChanged)
Verification after change: $(Sanitize $VerificationAfterChange)

"@

Add-Content -LiteralPath $LedgerPath -Value $Entry -Encoding UTF8
Write-Host "Saved user response ledger entry: $LedgerPath"
