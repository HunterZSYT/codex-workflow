$ErrorActionPreference = "Stop"

$TaskName = "CodexWorkflowAutoSync"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$HiddenRunnerPath = Join-Path $PSScriptRoot "run-auto-sync-hidden.vbs"

$Action = New-ScheduledTaskAction -Execute "wscript.exe" -Argument "`"$HiddenRunnerPath`"" -WorkingDirectory $RepoRoot
$Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).Date.AddMinutes(5) -RepetitionInterval (New-TimeSpan -Minutes 30) -RepetitionDuration (New-TimeSpan -Days 3650)
$Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited
$Settings = New-ScheduledTaskSettingsSet
$Settings.Hidden = $true

Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Principal $Principal -Settings $Settings -Description "Safely sync sanitized Codex workflow repo every 30 minutes." -Force | Out-Null
Write-Host "Registered scheduled task: $TaskName"
