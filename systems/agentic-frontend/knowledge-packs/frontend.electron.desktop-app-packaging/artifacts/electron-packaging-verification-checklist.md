# Electron Packaging Verification Checklist

Use this before claiming any Electron packaging task is complete.

## Prepackage

- [ ] `package.json.main` points to compiled main output.
- [ ] electron-builder `files` includes renderer output, main output, preload output, and package metadata.
- [ ] Vite renderer config uses a relative base if loaded via `BrowserWindow.loadFile`.
- [ ] Local runtime data paths use app user-data, not project source paths.
- [ ] Main process catches and logs startup errors.

## Build

- [ ] `npm run test` passes.
- [ ] `npm run build` passes.
- [ ] `dist/index.html` has valid packaged asset paths.
- [ ] `dist-electron/main/main.js` exists.
- [ ] `dist-electron/preload/preload.js` exists when preload is configured.

## Package

- [ ] `npm run package` exits zero.
- [ ] Unpacked executable exists.
- [ ] If required, `npm run dist` exits zero.
- [ ] Installer executable exists.
- [ ] Native modules appear under `resources/app.asar.unpacked` when applicable.

## Runtime

- [ ] Launch the exact packaged executable.
- [ ] Verify a visible app window opens.
- [ ] Verify actual renderer UI content, not just the title bar.
- [ ] Check no startup error dialog appears.
- [ ] Check no `startup-error.log` is created.
- [ ] Verify local database/config files are created in app-data only.

## Failure Stop Conditions

Stop and debug if:

- window is blank
- window title is empty
- process exists but no visible UI
- renderer assets fail under `file://`
- native module ABI error appears
- packaging inspection modified source files

