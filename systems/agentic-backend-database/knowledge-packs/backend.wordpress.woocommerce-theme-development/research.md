# Research

## Current Finding

WooCommerce theming has two major paths:

- Classic/PHP templates: prefer hooks first; use child-theme template overrides only when hooks cannot produce the required markup.
- Block themes: customize WooCommerce block templates by placing matching HTML templates in the theme `templates` folder.

## Source-Backed Rules

- Never edit WooCommerce plugin template files directly.
- Prefer hooks and filters before template overrides.
- If overriding classic templates, copy to child theme `woocommerce/` preserving structure after removing the plugin `templates/` prefix.
- Track outdated template notices because WooCommerce core template versions can move ahead of child-theme copies.
- If a theme contains `woocommerce.php`, it can prevent specific template overrides such as `archive-product.php` from applying.
- Verify all revenue-critical pages after changes: product archive, single product, cart, checkout, account, order confirmation, and emails if touched.

## 2026-06-07 Current-Signal Enrichment

- Current and recurring community pain centers on update-safe edits, child themes, CSS specificity, template override paths, hooks that behave differently in block contexts, and deployment/database drift on live stores.
- WooCommerce official docs still support the hooks-first rule for classic templates and matching HTML template files for block themes.
- For existing ecommerce theme edits, add an explicit inventory-first workflow before changing code: parent/child theme, overrides, hooks/snippets, WooCommerce version, block vs classic paths, builder/custom CSS, staging, database source of truth, and rollback.
- The dedicated `last30days` exact-query run was noisy; official WooCommerce docs and targeted web-recency results carry the durable update.
