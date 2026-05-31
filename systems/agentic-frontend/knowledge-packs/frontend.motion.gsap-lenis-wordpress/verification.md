# Verification

For real WordPress motion work:

- Confirm scripts/styles are enqueued, not hard-coded.
- Confirm animation code runs only on intended front-end pages.
- Confirm no console errors.
- Confirm no duplicated ScrollTriggers/Lenis loops after navigation or repeated initialization.
- Confirm reduced-motion fallback.
- Verify desktop and mobile scroll behavior in a rendered browser.
- Verify anchor links, keyboard navigation, and product/page interactions still work.
- Check layout shift and scroll jank on long pages.
