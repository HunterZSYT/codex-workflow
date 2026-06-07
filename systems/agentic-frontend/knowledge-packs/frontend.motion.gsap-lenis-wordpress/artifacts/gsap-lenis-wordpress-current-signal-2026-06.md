# GSAP and Lenis WordPress Current Signal: June 2026

Date checked: 2026-06-07

## Current Signal

The dedicated `last30days` run found one relevant recent HN item: a 2026-05-24 "Show HN" about replacing a 3.4MB video with 40kb of GSAP. The strongest nearby community signal is that GSAP can replace heavier media when the animation is real DOM and accessible, but developers still complain about setup nuance, ScrollTrigger behavior, responsive cleanup, reduced motion, and bundling/enqueue confusion.

A 2026-05-31 r/Wordpress thread about agency WordPress development mentioned existing custom theme stacks using ACF, WooCommerce, SCSS, GSAP, and custom build components. The practical takeaway is not "always use GSAP"; it is that motion belongs inside a modern theme asset pipeline and deployment workflow.

## Officially Verified Rules

- WordPress theme assets must be enqueued through WordPress APIs, not hard-coded script tags in templates.
- GSAP supports npm/script-tag usage and ScrollTrigger; `gsap.matchMedia()` is the durable pattern for responsive and reduced-motion branching.
- Lenis official docs/repo show ScrollTrigger synchronization through `lenis.on('scroll', ScrollTrigger.update)` and GSAP ticker-driven `lenis.raf`.
- Lenis is an intentional smooth-scroll layer; use it only when the site experience justifies smooth scrolling and verification confirms it does not degrade ecommerce usability.

## WordPress Integration Rule

1. Build/enqueue a theme animation entry file after WordPress and theme dependencies are known.
2. Register GSAP plugins in the entry file, not inline in templates.
3. Initialize only when matching DOM exists.
4. Use `gsap.matchMedia()` and `prefers-reduced-motion` handling before ScrollTrigger scenes.
5. If Lenis is used, wire Lenis to ScrollTrigger using the official sync pattern and verify resize/refresh behavior.
6. For WooCommerce pages, disable or simplify smooth scrolling/scroll hijacking around cart, checkout, account, payment, and forms unless explicitly tested.
