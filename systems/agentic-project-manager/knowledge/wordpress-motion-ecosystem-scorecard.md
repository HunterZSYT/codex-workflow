# WordPress Motion Ecosystem Scorecard

Date checked: 2026-05-31

| Name | Source URL | Type | What it solves | Fit | Maintenance/activity | License | WP | Woo | Build impact | Replaces custom code? | Absorption target | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WordPress Theme Handbook | https://developer.wordpress.org/themes/ | official docs | Theme structure, templates, theme.json, assets, functions.php | High | Official/current | Docs | High | Indirect | Low | No | candidate packs | Use now |
| WordPress theme.json docs | https://developer.wordpress.org/themes/global-settings-and-styles/ | official docs | Color/typography/spacing/layout tokens, styles, variations, patterns | High | Official/current | Docs | High | Indirect | Low | No | design-system pack | Use now |
| WordPress Including Assets | https://developer.wordpress.org/themes/core-concepts/including-assets/ | official docs | wp_enqueue_scripts, wp_enqueue_style/script, asset handles | High | Official/current | Docs | High | Indirect | Low | Yes, replaces hard-coded tags | checklist/blob candidate | Use now |
| WordPress wp_enqueue_script reference | https://developer.wordpress.org/reference/functions/wp_enqueue_script/ | official docs | Script dependencies, handles, registered WP scripts | High | Official/current | Docs | High | Indirect | Low | Yes | enqueue checklist | Use now |
| Create Block Theme | https://github.com/WordPress/create-block-theme | official repo/plugin | Export/create block themes, child themes, style variations from editor | Medium-high | Active WordPress repo | GPL-compatible WordPress ecosystem | High | Medium | Site/editor-side workflow | Partly | repo absorption note | Pilot first |
| WP-CLI scaffold command | https://github.com/wp-cli/scaffold-command | official-ish WP-CLI repo | Scaffolding child themes, blocks, plugins | Medium | Active ecosystem | MIT | High | Indirect | CLI workflow | Partly | docs/tool candidate | Pilot first |
| Roots Sage | https://github.com/roots/sage | starter/framework | Blade, Tailwind, Vite, Acorn, organized modern theme workflow | High for advanced projects | Active; latest release observed 2026-04-26 | MIT | High | Medium | High Composer/Laravel/Vite impact | Yes | repo absorption note / pilot | Pilot first |
| Automattic _s / Underscores | https://github.com/Automattic/_s | starter theme | Classic starter theme reference | Low for new builds | Inactive/reference-only as of repo notice | GPL-2.0 | Classic only | Medium | Low | Partly | docs-only reference | Docs only |
| WooCommerce template structure docs | https://developer.woocommerce.com/docs/theming/theme-development/template-structure/ | official docs | Hooks-first customization and child-theme overrides for classic templates | High | Official/current | Docs | Indirect | High | Low | Yes | Woo pack | Use now |
| WooCommerce block theming docs | https://developer.woocommerce.com/docs/theming/block-theme-development/theming-woo-blocks/ | official docs | Woo block templates and block-theme override model | High | Official/current | Docs | Block themes | High | Low | Yes | Woo pack | Use now |
| WooCommerce repo/templates | https://github.com/woocommerce/woocommerce | official repo | Template reference by version | Medium | Active official repo | GPL ecosystem | Indirect | High | None | No | source reference only | Docs only |
| GSAP ScrollTrigger | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | official docs | Scroll-based animations, pin/scrub/snap, third-party scroll integration | High for premium motion | Official/current | GSAP terms | Frontend only | Frontend only | JS bundle | Yes | existing motion blob + WP pack | Use now |
| GSAP React/useGSAP | https://gsap.com/resources/React/ | official docs | Cleanup/scoping rules for React | Medium for WP unless React blocks/headless | Official/current | GSAP terms | Conditional | Conditional | React-only | No for classic WP | docs-only reference | Docs only |
| Lenis | https://github.com/darkroomengineering/lenis | package/repo | Smooth scroll and ScrollTrigger sync pattern | Medium-high for motion-heavy sites | Active public repo | MIT | Frontend only | Frontend only | JS bundle | Yes | WP motion pack | Pilot first |
| WordPress block patterns | https://wordpress.org/patterns/ | official registry | Reusable section patterns | Medium | Official | Directory terms | High | Medium | Low | Partly | design-system pack | Use now |

Notes:
- Popularity is not proof. Official docs and compatibility beat stars.
- Sage is powerful but opinionated; use for advanced builds that accept Composer/Laravel/Vite.
- Underscores is reference-only for classic theme anatomy, not a primary new-project recommendation.
- GSAP/Lenis must be verified in the rendered WordPress frontend and gated by reduced-motion behavior.
