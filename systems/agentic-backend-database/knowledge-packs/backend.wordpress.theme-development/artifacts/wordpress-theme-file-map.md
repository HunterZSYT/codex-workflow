# WordPress Theme File Map

Block theme:
- `style.css`: theme metadata and optional CSS.
- `theme.json`: global settings/styles, presets, layout, template parts, patterns, style variations.
- `templates/index.html`: required fallback template.
- `templates/*.html`: page/post/archive/search/custom templates.
- `parts/*.html`: reusable header/footer/other template parts.
- `patterns/*.php`: bundled block patterns.
- `styles/*.json`: style variations.
- `functions.php`: theme-specific hooks, supports, asset enqueueing.
- `assets/`: compiled CSS/JS/images/fonts.

Classic theme:
- `style.css` and `index.php`: required recognition/fallback files.
- `functions.php`: hooks, supports, assets.
- PHP template hierarchy files: `single.php`, `page.php`, `archive.php`, `front-page.php`, etc.
- `template-parts/`: reusable PHP partials.
- `inc/` or `includes/`: custom PHP support files.
- `assets/`: compiled CSS/JS/images/fonts.
