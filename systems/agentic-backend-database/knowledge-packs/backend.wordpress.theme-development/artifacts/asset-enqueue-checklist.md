# Asset Enqueue Checklist

- [ ] No hard-coded CSS/JS tags in templates.
- [ ] Styles use `wp_enqueue_style`.
- [ ] Scripts use `wp_enqueue_script`.
- [ ] Hook front-end assets on `wp_enqueue_scripts`.
- [ ] Use stable handles.
- [ ] Declare dependencies through enqueue dependency arrays.
- [ ] Use theme version or filemtime cache-busting when appropriate.
- [ ] Prefer WordPress bundled/registered scripts when available.
- [ ] Attach inline CSS/JS to an existing handle with `wp_add_inline_style` / `wp_add_inline_script`.
- [ ] Exclude admin/editor contexts unless the asset is intentionally editor-facing.
