# Examples

## Vite file protocol blank window

Symptom:

- App works at `http://127.0.0.1:5173`.
- Packaged app opens a white window.
- `dist/index.html` contains `/assets/index-*.js`.

Fix:

```ts
// vite.config.ts
export default defineConfig({
  base: "./"
});
```

Verification:

- Rebuild.
- Confirm `dist/index.html` contains `./assets/index-*.js`.
- Repackage.
- Launch packaged executable and verify UI is visible.

## Native module ABI mismatch

Symptom:

```text
The module was compiled against a different Node.js version using NODE_MODULE_VERSION ...
```

Fix direction:

- Let electron-builder install/rebuild app deps for the target Electron version.
- Verify the packaged executable, not only Node tests.

## Unsafe ASAR extraction

Bad:

```powershell
npx asar extract-file release-packaged\win-unpacked\resources\app.asar package.json
```

If run in project root, this can overwrite source `package.json`.

Good:

```powershell
npx asar extract release-packaged\win-unpacked\resources\app.asar .ai-task\asar-check
```
