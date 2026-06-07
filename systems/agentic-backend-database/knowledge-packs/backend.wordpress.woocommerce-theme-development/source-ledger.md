# Source Ledger

Date checked: 2026-05-31

| Source | URL | Type | Extracted rule/pattern | Confidence | License/copyright note |
| --- | --- | --- | --- | --- | --- |
| WooCommerce template structure | https://developer.woocommerce.com/docs/theming/theme-development/template-structure/ | official docs | Hooks should be preferred before copying templates; overrides belong in a child theme `woocommerce/` folder and must track version drift. | high | Summarized docs only |
| WooCommerce block theming | https://developer.woocommerce.com/docs/theming/block-theme-development/theming-woo-blocks/ | official docs | Block themes override Woo templates by matching template filenames under `/templates`; users can still modify templates in the Site Editor. | high | Summarized docs only |
| WooCommerce set up child theme | https://developer.woocommerce.com/docs/theming/theme-development/set-up-a-child-theme | official docs | Classic child themes are the safe place for override changes. | high | Summarized docs only |
| WooCommerce GitHub repo/templates | https://github.com/woocommerce/woocommerce | official repo | Use as versioned template reference only; do not copy templates blindly. | medium-high | GPL ecosystem; source reference only |
| WooCommerce template structure update | https://developer.woocommerce.com/docs/theming/theme-development/template-structure | official docs | Verified 2026-06-07: prefer hooks first, use child-theme overrides for classic templates, track outdated template notices, and note `woocommerce.php` priority. | high | Summarized docs only |
| WooCommerce block theming current docs | https://developer.woocommerce.com/docs/category/block-theme-development/ | official docs | Verified 2026-06-07: block themes can override Woo templates with matching HTML template filenames under `/templates`. | high | Summarized docs only |
| WooCommerce block CSS styling | https://developer.woocommerce.com/docs/css-styling-for-themes/ | official docs | Block/component internals are private and subject to change; avoid brittle CSS selectors when supported APIs exist. | high | Summarized docs only |
| Current-signal artifact | `.ai-task/last30days-wordpress-ecommerce/existing-ecommerce-theme-edit.md` | current signal | Dedicated run was noisy and weak; use only as evidence that local current-signal coverage was limited. | low | Local-only raw current-signal artifact |
