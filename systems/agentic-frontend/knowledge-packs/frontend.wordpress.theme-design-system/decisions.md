# Decisions

## Use This Pack When

- Designing a block theme or hybrid theme.
- Translating a design system into WordPress editor/front-end behavior.
- Creating theme.json token maps, block patterns, template parts, or style variations.

## Do Not Use This Pack For

- General non-WordPress UI design; use the normal frontend UI skills.
- WooCommerce template logic; use the WooCommerce pack.
- Animation integration; use the GSAP/Lenis WordPress pack.

## Design Direction

Preserve the existing design direction, then map it into WordPress primitives:

1. Tokens into `theme.json`.
2. Reusable sections into patterns.
3. Structural areas into template parts.
4. Alternate looks into style variations.
5. Unsupported/premium details into carefully scoped CSS.
