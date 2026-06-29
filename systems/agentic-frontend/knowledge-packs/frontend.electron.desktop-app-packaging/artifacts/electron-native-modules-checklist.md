# Electron Native Modules Checklist

Native Node modules require Electron-specific verification.

## Common Modules

- `better-sqlite3`
- `sqlite3`
- `sharp`
- `node-pty`
- serial/USB/printer bindings
- any package with `.node` files

## Rules

- Plain `npm rebuild` targets the current Node.js ABI, not necessarily Electron.
- electron-builder can rebuild app dependencies during packaging for Electron's ABI.
- Native `.node` files must be unpacked from ASAR.
- Tests in Node can pass while the packaged Electron runtime fails.

## Verification

1. Build/package the app.
2. Launch the packaged executable.
3. Check logs for:

```text
was compiled against a different Node.js version
NODE_MODULE_VERSION
```

4. Inspect packaged resources:

```powershell
Get-ChildItem -Recurse release-packaged\win-unpacked\resources\app.asar.unpacked -Filter *.node
```

## Fix Direction

- Prefer electron-builder's app dependency install/rebuild flow.
- Keep Electron version, electron-builder config, and native module version aligned.
- Re-run packaged executable verification after every Electron/native dependency change.

