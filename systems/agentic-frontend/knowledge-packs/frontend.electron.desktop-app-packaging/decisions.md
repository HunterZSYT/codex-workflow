# Decisions

## D1 - Treat Electron As Three Apps

An Electron project has at least three runtime surfaces:

1. Main process
2. Preload bridge
3. Renderer

Build and verification must respect all three. A React/Vite browser proof does not prove the Electron main/preload path.

## D2 - Packaged Verification Is Mandatory

Do not claim an Electron app works from:

- `npm run build` alone
- dev-server screenshots alone
- a running process alone
- an unpacked folder existing
- an installer file existing

Claim packaged success only after launching the packaged executable and verifying visible renderer content.

## D3 - Use Relative Vite Base For file:// Renderer Loads

For Vite-rendered Electron apps loaded with `BrowserWindow.loadFile`, set `base: "./"` or equivalent so built assets resolve relative to `dist/index.html`.

## D4 - Native Modules Need Electron ABI Discipline

If the app uses `better-sqlite3`, `sqlite3`, `sharp`, `node-pty`, serial/USB libraries, or any `.node` native add-on, verify the module inside the packaged app is rebuilt/unpacked for the target Electron version.

## D5 - Archive Inspection Must Be Isolated

Never run archive extraction commands in the project root without an explicit output directory. Extract ASAR contents into `.ai-task/asar-check/` or another throwaway folder only.

## D6 - Startup Errors Must Be Visible

Add main-process `uncaughtException` and `unhandledRejection` logging to a local user-data log for desktop apps. Silent white windows waste debugging time.
