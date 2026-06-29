# Specs

## Required Project Shape

- `src/main/` for Electron app lifecycle, local paths, IPC registration, packaging-sensitive startup logic.
- `src/preload/` for `contextBridge` APIs only.
- `src/renderer/` for React/Vite UI.
- `src/shared/` for shared types only.
- `dist-electron/` for compiled main/preload output.
- `dist/` for Vite renderer output.
- `tests/` for domain/service tests that do not require a visible Electron window.

## Required Build Configuration

- `package.json.main` must point to the packaged main-process output, for example `dist-electron/main/main.js`.
- electron-builder `files` must include `dist/**/*`, `dist-electron/**/*`, and `package.json`.
- Vite config must use relative build base for local file loads:

```ts
export default defineConfig({
  base: "./"
});
```

- Native module projects should include an app-dependency rebuild path, preferably builder-managed:

```json
{
  "scripts": {
    "postinstall": "electron-builder install-app-deps"
  }
}
```

Use project-specific scripts when needed, but verify the packaged `.node` ABI outcome.

## Required Runtime Safety

- Main process catches and logs startup errors under Electron `app.getPath("userData")`.
- Renderer load failures are visible through logs or DevTools/debugging path.
- Preload path is resolved from compiled main output, not source paths.
- Local data paths use `app.getPath("userData")` or a documented override.

## Required Verification

Minimum Electron verification sequence:

1. `npm run test`
2. `npm run build`
3. Inspect `dist/index.html` for relative asset paths when using `loadFile`.
4. `npm run package`
5. Launch the exact packaged executable.
6. Verify visible app content, not only process existence.
7. Verify no startup error log and no renderer console/load errors.
8. If installer is required, run `npm run dist` and verify installer output exists.

## Failure Conditions

Treat any of these as failed verification:

- blank white window
- default Electron menu with empty content
- process exists but no visible app window
- `MainWindowTitle` empty when a window should have title
- `ERR_FILE_NOT_FOUND` for renderer assets
- native `.node` ABI mismatch
- source files modified by archive extraction or packaging inspection
