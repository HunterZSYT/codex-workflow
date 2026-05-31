# WordPress Motion Design Knowledge Audit

Date checked: 2026-05-31

## Existing Local Coverage

- Active ecosystem scout policy already routes WordPress, WooCommerce, theme, starter, registry, component, and animation work through reuse-first discovery.
- Active motion blobs exist for GSAP ScrollTrigger, Lenis scroll sync, scroll-scene composition, and reduced-motion policy.
- Existing frontend design, spacing, typography, color, layout, and inspection skills cover general UI quality, but not WordPress theme.json/editor parity specifically.
- Existing backend project scan can detect WordPress from `wp-config.php`, but no WordPress theme-development pack existed before this task.

## Missing Knowledge Areas

| Area | Existing coverage | Target |
| --- | --- | --- |
| WordPress block vs classic theme decisions | broad scout policy only | candidate pack |
| theme.json token workflow | general typography/spacing/color only | candidate pack + possible blob |
| WordPress file structure and enqueue rules | broad backend/frontend guidance only | candidate pack + checklist |
| WooCommerce hooks vs template overrides | no dedicated pack | candidate pack |
| WooCommerce block theme templates | no dedicated pack | candidate pack |
| GSAP/Lenis inside WordPress theme assets | GSAP/Lenis blobs exist, no WordPress enqueue/build layer | candidate pack |
| WordPress design-system workflow | general frontend design skills only | candidate pack |
| Starter theme ecosystem | scout policy only | scorecard + absorption notes |

## Creation Decision

- `backend.wordpress.theme-development`: candidate pack.
- `backend.wordpress.woocommerce-theme-development`: candidate pack.
- `frontend.wordpress.theme-design-system`: candidate pack.
- `frontend.motion.gsap-lenis-wordpress`: candidate pack.

Precise blobs can be created later if repeated tasks need narrow rules such as `backend.wordpress.enqueue-assets` or `backend.wordpress.theme-json-design-tokens`. For now, the knowledge is systemic and belongs in packs.

## Duplicate / Overlap Risks

- GSAP/Lenis WordPress pack must link existing motion blobs rather than duplicate GSAP API guidance.
- WordPress design-system pack must use existing color/spacing/typography/layout skills for design decisions, while documenting only the WordPress theme.json/editor mapping.
- WooCommerce pack must stay backend/theme-structure focused and defer visual storefront QA to frontend inspection.

## Candidate Pack IDs

- `backend.wordpress.theme-development`
- `backend.wordpress.woocommerce-theme-development`
- `frontend.wordpress.theme-design-system`
- `frontend.motion.gsap-lenis-wordpress`

## Activation Risks

- Packs are source-backed but still candidate.
- Activation requires user approval and at least one real project application or deeper source audit.
- Do not treat candidate packs as implementation authority for production WordPress/WooCommerce work.
