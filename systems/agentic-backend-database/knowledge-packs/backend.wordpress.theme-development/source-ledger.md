# Source Ledger

Date checked: 2026-05-31

| Source | URL | Type | Extracted rule/pattern | Confidence | License/copyright note |
| --- | --- | --- | --- | --- | --- |
| WordPress Theme Structure | https://developer.wordpress.org/themes/core-concepts/theme-structure/ | official docs | Block theme structure includes `style.css`, `templates/index.html`, optional `functions.php`, `theme.json`, `assets`, `parts`, `patterns`, and `styles`. | high | Summarized docs only |
| WordPress Global Settings and Styles | https://developer.wordpress.org/themes/global-settings-and-styles/ | official docs | `theme.json` is the design/settings layer for colors, typography, spacing, layout, styles, patterns, template parts, and style variations. | high | Summarized docs only |
| WordPress Including Assets | https://developer.wordpress.org/themes/core-concepts/including-assets/ | official docs | Use `wp_enqueue_scripts`, `wp_enqueue_style`, `wp_enqueue_script`, and handles instead of hard-coded tags. | high | Summarized docs only |
| wp_enqueue_script reference | https://developer.wordpress.org/reference/functions/wp_enqueue_script/ | official docs | Dependencies should be modeled through registered/enqueued handles; WordPress includes registered libraries. | high | Summarized docs only |
| Theme Functions | https://developer.wordpress.org/themes/classic-themes/basics/theme-functions/ | official docs | `functions.php` adds theme behavior; plugin-worthy behavior should not be trapped in a theme. | high | Summarized docs only |
| Create Block Theme | https://github.com/WordPress/create-block-theme | official repo | Useful for exporting/creating block themes and style variations from the editor; treat as development-mode/pilot workflow. | medium-high | Source reference only; do not copy |
| Roots Sage | https://github.com/roots/sage | GitHub starter | Modern opinionated workflow with Blade, Tailwind, Vite, Acorn; pilot before adopting. | medium-high | MIT; source reference only |
| Automattic _s | https://github.com/Automattic/_s | GitHub starter | Classic starter is inactive/reference-only; not a primary recommendation for new builds. | high | GPL-2.0; source reference only |
