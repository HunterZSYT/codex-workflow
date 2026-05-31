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
