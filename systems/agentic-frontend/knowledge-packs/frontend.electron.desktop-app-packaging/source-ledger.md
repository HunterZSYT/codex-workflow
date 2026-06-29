# Source Ledger

Date checked: 2026-06-29

| Source | URL | Type | Extracted rule/pattern | Confidence | License/copyright note |
| --- | --- | --- | --- | --- | --- |
| Electron BrowserWindow API | https://electronjs.org/docs/latest/api/browser-window | official docs | Packaged apps that use `BrowserWindow.loadFile` load a local HTML file. Renderer proof must verify the actual loaded file state, not just process/window existence. | high | Summarized docs only |
| Electron preload tutorial | https://electronjs.org/docs/latest/tutorial/tutorial-preload | official docs | Keep privileged APIs behind preload/contextBridge and separate main/renderer responsibilities. | high | Summarized docs only |
| Electron webContents API | https://electronjs.org/docs/latest/api/web-contents | official docs | Use `webContents` events and inspection to debug renderer load, failed loads, and page behavior. | high | Summarized docs only |
| Vite build options | https://vite.dev/config/build-options | official docs | Relative base values such as `''` or `'./'` avoid absolute asset paths when final deployed base is unknown. This matters for Electron `file://` packaged loads. | high | Summarized docs only |
| Vite shared options | https://vite.dev/config/shared-options | official docs | Vite `base` controls public asset paths. Default `/` can break packaged Electron file loads because `/assets/...` targets filesystem root. | high | Summarized docs only |
| electron-builder docs | https://www.electron.build/docs/ | official docs | `electron-builder --dir` creates unpacked app directories; distributable targets create installers. Add `electron-builder install-app-deps`/builder rebuild flow for native deps. | high | Summarized docs only |
| electron-builder configuration | https://www.electron.build/docs/configuration/ | official docs | Native dependency rebuild behavior is controlled by builder config and build lifecycle; do not rely on plain npm rebuild for Electron ABI. | high | Summarized docs only |
| electron-builder contents | https://www.electron.build/docs/contents | official docs | Smart unpack detects native modules/executables for ASAR; unusual cases may still need explicit checks. | high | Summarized docs only |
| electron-builder glossary | https://www.electron.build/docs/glossary/ | official docs | Native `.node` modules cannot run from ASAR virtual filesystem and must be unpacked. | high | Summarized docs only |
| electron-builder troubleshooting | https://www.electron.build/docs/troubleshooting/ | official docs | Runtime errors like "compiled against a different Node.js version" indicate native modules built against the wrong ABI/Electron version. | high | Summarized docs only |
| electron-builder build lifecycle | https://www.electron.build/docs/features/build-lifecycle/ | official docs | Native dependency install/rebuild happens before staging per target platform/arch. | high | Summarized docs only |
| last30days Electron current signal | E:\Yamzo\POS\.ai-task\last30days-electron\electron-packaged-app-vite-electron-builder-native-modules-blank-window-raw.md | current signal | Recent public social signal was thin/noisy for these packaging failure modes. Treat as source-discovery limitation, not proof. | low | Local raw current-signal artifact; not synced |
| Yamzo POS failure reproduction | E:\Yamzo\POS | local incident evidence | Real failures observed: process existed without visible renderer, Vite absolute asset paths produced blank packaged window, native `better-sqlite3` ABI mismatch prevented startup, and package manifest/source files were accidentally overwritten by archive extraction. | high | Local project evidence; no secrets |
