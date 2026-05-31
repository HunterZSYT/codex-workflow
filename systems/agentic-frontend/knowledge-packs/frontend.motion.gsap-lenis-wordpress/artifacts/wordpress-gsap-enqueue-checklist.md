# WordPress GSAP Enqueue Checklist

- [ ] Decide CDN vs bundled dependency; prefer project build pipeline when present.
- [ ] Compile custom animation source into theme assets.
- [ ] Enqueue compiled script with `wp_enqueue_script`.
- [ ] Enqueue only on front-end pages that need it when possible.
- [ ] Use stable handles for GSAP, ScrollTrigger, Lenis, and custom init script.
- [ ] Register GSAP plugins once in the init script.
- [ ] Guard missing selectors.
- [ ] Do not hard-code script tags in templates.
