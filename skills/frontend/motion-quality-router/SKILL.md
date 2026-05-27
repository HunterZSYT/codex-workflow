---
name: motion-quality-router
description: Use when working on animations, hover effects, scroll reveal, page transitions, microinteractions, or premium interaction polish. Routes simple motion to CSS/Tailwind and advanced timeline/scroll effects to Motion, GSAP, or Lenis where appropriate.
---

# Motion Quality Router

Motion must support meaning or feedback. Prefer CSS/Tailwind transitions for simple states. Use Motion/Framer Motion for normal React UI animation. Use GSAP/Lenis only for advanced scroll or timeline effects. Respect `prefers-reduced-motion`. Prefer transform/opacity over layout-heavy animated properties.

Before implementing GSAP, ScrollTrigger, Lenis, or advanced scroll scenes, consult frontend knowledge blobs:
- `C:\Users\acer\.codex\agentic-frontend\knowledge\motion\gsap-react-scrolltrigger.blob.md`
- `C:\Users\acer\.codex\agentic-frontend\knowledge\motion\lenis-scroll-sync.blob.md`
- `C:\Users\acer\.codex\agentic-frontend\knowledge\motion\reduced-motion-policy.blob.md`
- `C:\Users\acer\.codex\agentic-frontend\knowledge\motion\scroll-scene-composition.blob.md`

If a blob is missing/stale or the tool behavior depends on current docs, route through Project Manager Capability Orchestration Radar and refresh docs via Context7/official docs before implementation.
