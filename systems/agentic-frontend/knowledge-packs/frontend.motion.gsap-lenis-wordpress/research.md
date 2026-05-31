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
