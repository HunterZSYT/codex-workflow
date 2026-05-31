# Decisions

## Use This Pack When

- Building, converting, auditing, or planning a WordPress theme.
- Deciding block theme vs classic theme.
- Mapping design tokens into WordPress theme structure.
- Enqueueing theme assets safely.
- Choosing a starter theme workflow.

## Do Not Use This Pack For

- Plugin architecture beyond theme support.
- Production deployment without the backend/VPS gates.
- WooCommerce-specific template changes; use the WooCommerce pack.
- Frontend visual QA; use frontend inspection tools.

## Starter Direction

- Default new custom theme: block theme if editor parity and `theme.json` are desired.
- Advanced agency/dev workflow: pilot Sage if modern toolchain and Blade/Tailwind/Vite are acceptable.
- Legacy/classic workflow: use classic theme docs and _s as reference-only, not primary starter.
