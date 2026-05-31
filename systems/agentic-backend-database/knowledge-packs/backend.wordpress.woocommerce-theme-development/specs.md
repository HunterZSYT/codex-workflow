# Specs

Status: candidate. Do not treat as active production guidance without approval.

## Classic Override Shape

Plugin template source:
- `wp-content/plugins/woocommerce/templates/...`

Child theme override target:
- `wp-content/themes/<child-theme>/woocommerce/...`

Keep the same relative structure after removing the plugin `templates/` directory.

## Block Theme Override Shape

Woo block templates can be overridden by matching template filenames under:
- `wp-content/themes/<theme>/templates/`

Common templates:
- `single-product.html`
- `archive-product.html`
- `taxonomy-product_cat.html`
- `taxonomy-product_tag.html`
- `page-cart.html`
- `page-checkout.html`
- `order-confirmation.html`

## Safety Rule

Live WooCommerce changes require backup/rollback awareness and verification of checkout-critical flows.
