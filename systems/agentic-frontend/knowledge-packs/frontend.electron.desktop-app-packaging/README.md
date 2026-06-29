# Electron Desktop App Packaging

Status: candidate

Use this pack when building, debugging, packaging, or verifying Electron desktop apps, especially Electron + Vite + React apps with native Node modules such as SQLite.

## Use When

- Creating a new Electron app.
- Packaging with electron-builder.
- Debugging a blank packaged window.
- Debugging dev works but packaged app fails.
- Using Vite renderer output under Electron `loadFile`.
- Using native `.node` modules such as `better-sqlite3`.
- Creating Windows installer/unpacked builds.

## Do Not Use When

- The task is a normal web app with no Electron packaging.
- The issue is purely visual and already covered by frontend inspection blobs.
- The task is only backend/database logic and no desktop runtime is involved.

## Core Rule

Verify Electron as a packaged desktop runtime. A green Vite build or dev-server screenshot is not proof that the packaged executable works.

## Main Artifacts

- `artifacts/electron-packaging-verification-checklist.md`
- `artifacts/vite-electron-renderer-build-checklist.md`
- `artifacts/electron-native-modules-checklist.md`
- `artifacts/electron-packaged-app-debugging-playbook.md`
- `artifacts/electron-current-signal-2026-06.md`
