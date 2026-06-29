# Research

## Problem This Pack Solves

Electron apps can pass normal frontend checks and still fail as packaged desktop apps. Dev-server rendering proves only the Vite/React development path. It does not prove:

- packaged `file://` renderer asset loading
- packaged `main` entry resolution
- preload path resolution
- ASAR/native-module behavior
- installer/unpacked app startup
- runtime local data creation
- visible window content

The Yamzo POS incident exposed four concrete failure classes:

1. Process-start was mistaken for packaged-app success.
2. Vite emitted absolute `/assets/...` paths, which worked in the dev server but not under packaged `file://` loading.
3. `better-sqlite3.node` was built for a different Node/Electron ABI than the packaged Electron runtime.
4. Archive extraction commands were run without output isolation and overwrote source `package.json` and `index.html`.

## Source Findings

Electron's `BrowserWindow` API supports loading local files through `loadFile`. That makes renderer packaging sensitive to the exact `dist/index.html` and asset URLs that are present in the packaged archive.

Vite's default base is `/`. For web deployments this is often fine, but for Electron packaged apps loaded from a local file, absolute `/assets/...` paths can resolve from the filesystem root instead of the app's `dist` folder. Vite documents relative `base` values such as `''` or `'./'` for deployments where the final base path is unknown.

electron-builder packages app contents into ASAR by default and handles many native modules through smart unpack. Native `.node` modules still need special attention: they must be unpacked and built for the target Electron ABI, not just for the local Node.js ABI. The builder docs and troubleshooting guidance both point to builder-managed app dependency installation/rebuild behavior for native modules.

The current-signal run did not provide useful recent technical discussion. This pack therefore treats social/current signal as weak and uses official docs plus local incident evidence as the proof layer.

## Operating Rule

For Electron work, verification is not complete until the packaged executable itself renders the intended UI and logs no startup/renderer errors. A process with a blank window, menu chrome only, or an empty title is a failed verification.
