# Vite Renderer Checklist For Electron

## Use When

Electron loads a Vite-built renderer using `BrowserWindow.loadFile`.

## Required Config

```ts
export default defineConfig({
  base: "./"
});
```

## Why

Vite defaults to absolute asset paths. In a browser dev server, `/assets/...` resolves against the dev origin. In packaged Electron loaded from `file://`, `/assets/...` can resolve from the filesystem root and produce a white window.

## Verification

After `npm run build`, inspect:

```powershell
Get-Content -Raw dist\index.html
```

Pass:

```html
<script type="module" crossorigin src="./assets/index-...js"></script>
<link rel="stylesheet" crossorigin href="./assets/index-...css">
```

Fail:

```html
<script type="module" crossorigin src="/assets/index-...js"></script>
```

## Debug Signals

- Dev server works.
- Packaged app opens white screen.
- DevTools/network shows missing file assets.
- Screenshot shows window chrome only.

