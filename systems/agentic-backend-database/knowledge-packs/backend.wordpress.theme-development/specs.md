# Specs

Status: candidate. Do not treat as active implementation rules without approval.

## Theme Structure Baseline

Block theme baseline:
- `style.css`
- `theme.json`
- `templates/index.html`
- `templates/*.html`
- `parts/*.html`
- `patterns/*.php`
- `styles/*.json`
- `functions.php` only for theme-specific hooks/support/assets
- `assets/` for compiled CSS, JS, images, and fonts

Classic theme baseline:
- `style.css`
- `index.php`
- PHP template hierarchy files
- `functions.php`
- optional `template-parts/`, `inc/`, `assets/`

## Asset Rule

All theme front-end CSS/JS should be registered/enqueued through WordPress APIs. No direct `<link>` or `<script>` tags in theme templates unless a source-backed exception is approved.

## Verification Rule

Any real theme edit should run at least:
- PHP syntax check for changed PHP files.
- WordPress debug/log inspection when available.
- Rendered frontend check.
- Editor/front-end parity check for block themes.
