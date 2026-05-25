Set shell = CreateObject("WScript.Shell")
scriptPath = "C:\Users\acer\codex-workflow\scripts\auto-sync-once.ps1"
command = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File " & Chr(34) & scriptPath & Chr(34)
shell.Run command, 0, False
