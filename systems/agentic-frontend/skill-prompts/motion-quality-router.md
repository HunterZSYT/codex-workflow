# Motion Quality Router

Use when working on animations, hover effects, scroll reveal, page transitions, or premium interaction polish.

Rules:
- Motion must support meaning or feedback.
- Prefer CSS/Tailwind transition for simple states.
- Use Motion/Framer Motion for normal React UI animation.
- Use GSAP/Lenis only for advanced scroll/timeline effects.
- Respect `prefers-reduced-motion`.
- Avoid animating layout-heavy properties when transform/opacity works.
