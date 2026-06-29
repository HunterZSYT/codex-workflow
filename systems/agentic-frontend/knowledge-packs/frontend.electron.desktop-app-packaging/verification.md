# Verification

## Command Checks

Run from project root:

```powershell
npm run test
npm run build
npm run package
```

If installer output is required:

```powershell
npm run dist
```

## Packaged Renderer Check

Launch the exact packaged executable, then verify:

- a visible window opens
- the window title is expected
- the actual app UI is visible
- login/main route renders
- no startup error dialog appears
- no user-data `startup-error.log` is created

PowerShell process existence is not enough:

```powershell
Get-Process "App Name" | Select-Object Id,MainWindowTitle,Responding,Path
```

Use it only as a first signal. Follow with screenshot/DevTools/content verification.

## Dist HTML Check

For Vite + `loadFile`:

```powershell
Get-Content -Raw dist\index.html
```

Pass condition:

- built script/style links use `./assets/...` or another valid packaged relative path.

Fail condition:

- built links use `/assets/...` unless a custom protocol/server path is implemented and verified.

## Native Module Check

If using native modules:

- inspect `resources\app.asar.unpacked` for `.node` files
- launch the packaged app, not just Electron dev
- check logs for `NODE_MODULE_VERSION` mismatch
- run builder-managed dependency rebuild, not plain `npm rebuild`, when targeting Electron

## Archive Inspection Safety

Only inspect ASAR into a throwaway folder:

```powershell
Remove-Item -Recurse -Force .ai-task\asar-check -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force .ai-task\asar-check | Out-Null
npx asar extract release-packaged\win-unpacked\resources\app.asar .ai-task\asar-check
```

Never extract archive files directly into the project root.
