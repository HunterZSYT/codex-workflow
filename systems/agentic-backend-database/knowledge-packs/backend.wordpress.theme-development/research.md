# Research

## Current Finding

WordPress theme work now splits into block-theme and classic-theme paths. Block themes should lean on `theme.json`, HTML templates, template parts, patterns, style variations, and editor/front-end parity. Classic themes still rely more heavily on PHP templates, `functions.php`, template hierarchy, and PHP template parts.

## Source-Backed Rules

- Use block themes for new editor-first builds unless the project requires classic PHP template control, legacy compatibility, or a starter/framework like Sage.
- Use `theme.json` as the first design-system mapping layer for palettes, typography, spacing, layout, styles, patterns, template parts, and style variations.
- Use `functions.php` for theme-specific behavior; move site functionality that must survive theme changes into a plugin.
- Use WordPress enqueue APIs for CSS and JS. Do not hard-code script/style tags in templates.
- Use WordPress bundled/registered scripts when available, and model dependencies with enqueue handles.
- Use Create Block Theme as a pilot/development workflow for exporting editor-built block themes, not as a silent production mutation tool.
- Use Sage only when the team accepts Composer/Laravel/Blade/Tailwind/Vite complexity.
- Treat Underscores as classic reference material only because the repo states it is inactive/reference-only.

## 2026-06-07 Current-Signal Enrichment

- Recent r/Wordpress agency discussion points to workflow modernization: DDEV/Local/wp-env, Git, PRs, CI checks, staging-to-production deploys, and moving away from manual FTP/live-only edits.
- GitHub activity supports keeping WordPress core/Gutenberg/Create Block Theme and Roots Sage/Bedrock/Trellis as current source leads.
- The dedicated `last30days` run was weak for exact WooCommerce theme development queries, so it is recorded as limited signal only.
- Durable rule remains official-source grounded: inspect the existing theme estate first, then choose block-theme, classic child-theme, or Sage-style workflow based on project constraints.
