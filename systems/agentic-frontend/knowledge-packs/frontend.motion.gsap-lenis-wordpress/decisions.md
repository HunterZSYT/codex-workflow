# Decisions

## Use This Pack When

- A WordPress/theme task needs GSAP, ScrollTrigger, Lenis, or premium scroll motion.
- Existing GSAP/Lenis blobs need WordPress enqueue/build constraints.
- Verifying rendered scroll behavior in a WordPress front-end.

## Do Not Use This Pack For

- Simple hover/fade states that CSS can handle.
- React-specific GSAP guidance unless the WordPress theme actually uses React blocks/headless React.
- Admin/editor animation unless explicitly required.

## Motion Routing

1. CSS/Tailwind transition for simple state feedback.
2. GSAP for deliberate timeline/scroll/pin animation.
3. Lenis only when smooth-scroll behavior is worth the accessibility/performance tradeoff.
4. Browser verification for all visual scroll claims.
