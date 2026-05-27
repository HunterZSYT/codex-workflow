# Motion Quality Router

Use when working on animations, hover effects, scroll reveal, page transitions, or premium interaction polish.

Rules:
- Motion must support meaning or feedback.
- Prefer CSS/Tailwind transition for simple states.
- Use Motion/Framer Motion for normal React UI animation.
- Use GSAP/Lenis only for advanced scroll/timeline effects.
- Before implementing GSAP, ScrollTrigger, Lenis, or advanced scroll scenes, consult frontend knowledge blobs:
  - `agentic-frontend/knowledge/motion/gsap-react-scrolltrigger.blob.md`
  - `agentic-frontend/knowledge/motion/lenis-scroll-sync.blob.md`
- If the blob is missing/stale or the tool behavior depends on current docs, route through Project Manager Capability Orchestration Radar and refresh docs via Context7/official docs before implementation.
- Respect `prefers-reduced-motion`.
- Avoid animating layout-heavy properties when transform/opacity works.
