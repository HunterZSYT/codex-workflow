# Research

## Current Finding

WordPress-specific GSAP/Lenis work is mostly an asset lifecycle problem: compile/bundle if needed, enqueue correctly, initialize only on the front-end where matching DOM exists, avoid duplicate initialization, respect reduced motion, and verify in the rendered site.

## Source-Backed Rules

- Use CSS transitions for simple hover/state effects.
- Use GSAP/ScrollTrigger for advanced scroll/timeline/pinning behavior.
- Use Lenis only when smooth scroll is intentionally part of the experience and accessible enough for the site.
- In WordPress, enqueue compiled JS/CSS assets through `wp_enqueue_script` / `wp_enqueue_style`.
- Initialize ScrollTrigger after DOM targets exist.
- Sync Lenis with ScrollTrigger through the official Lenis pattern.
- Avoid running front-end animation code in admin/editor unless explicitly designed for editor preview.
- Respect `prefers-reduced-motion`.

## 2026-06-07 Current-Signal Enrichment

- Recent GSAP signal favors replacing heavy video/media with real DOM animation when accessibility and reduced-motion fallbacks are handled.
- WordPress agency discussion shows GSAP already appears in custom theme stacks with SCSS, ACF, WooCommerce, and build components; the core issue is asset lifecycle and deployment discipline.
- Official GSAP/Lenis facts confirm the existing rule: register GSAP plugins in the theme JS entry, use `gsap.matchMedia()` for responsive/reduced-motion branches, and sync Lenis with ScrollTrigger through the official Lenis pattern.
- For ecommerce pages, keep smooth scrolling and scroll-pinned motion conservative around cart, checkout, account, payment, and forms.
