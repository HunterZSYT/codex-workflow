# Decisions

## Use This Pack When

- Customizing WooCommerce storefront theme output.
- Deciding hook vs template override.
- Planning child theme overrides.
- Verifying product, cart, checkout, account, and gallery behavior.

## Do Not Use This Pack For

- Payment gateway configuration.
- Production deployment without backup/rollback.
- API/store management tasks unrelated to theme output.
- Visual-only storefront redesign without rendered inspection.

## Decision Hierarchy

1. Use WooCommerce blocks/settings if the block theme supports the need.
2. Use hooks/filters where they can produce the change.
3. Use child-theme template overrides only when hooks/blocks are insufficient.
4. Avoid direct plugin template edits entirely.
