# Electron Packaged App Debugging Playbook

## Symptom: Process Exists But No UI

Do not mark success. Check:

```powershell
Get-Process "App Name" | Select-Object Id,MainWindowTitle,Responding,Path
```

If title is empty or only default chrome appears, inspect startup logs and renderer loading.

## Symptom: Blank White Window

Check:

- `dist/index.html` asset paths
- `BrowserWindow.loadFile` target
- packaged ASAR contains `dist`
- renderer console/network errors

Likely Vite fix:

```ts
base: "./"
```

## Symptom: Startup Error Before Window

Add main-process logging:

```ts
process.on("uncaughtException", logStartupError);
process.on("unhandledRejection", logStartupError);
```

Write logs under `app.getPath("userData")`.

## Symptom: Native Module ABI Error

Treat as packaging failure. Rebuild native modules for Electron, not local Node.

## Safe ASAR Inspection

Never extract into project root. Use:

```powershell
Remove-Item -Recurse -Force .ai-task\asar-check -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force .ai-task\asar-check | Out-Null
npx asar extract release-packaged\win-unpacked\resources\app.asar .ai-task\asar-check
```

Then inspect `.ai-task\asar-check`.

