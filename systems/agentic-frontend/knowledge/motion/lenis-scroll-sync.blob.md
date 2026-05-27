# Knowledge Blob: Lenis Scroll Sync

Blob ID: lenis-scroll-sync

Owner system: agentic-frontend

Owner skill: motion-quality-router

Capability: Smooth scrolling and synchronization with scroll-triggered animation.

Trigger phrases:
- Lenis
- smooth scroll
- scroll sync
- GSAP Lenis
- ScrollTrigger sync

When to use:
- Use when the reference or requirement explicitly needs smooth inertial scrolling, scroll progress smoothing, WebGL/parallax sync, or when a site already uses Lenis.
- Use with GSAP only when ScrollTrigger positions must track Lenis-managed scroll.

When not to use:
- Do not add Lenis to normal pages that work well with native scrolling.
- Do not use if it breaks anchors, keyboard scrolling, browser scroll restoration, or accessibility expectations.

External libraries/tools:
- `lenis`
- `lenis/react`
- `gsap`
- `gsap/ScrollTrigger`

Required docs source:
- Context7: `/darkroomengineering/lenis`
- Official docs: https://lenis.darkroom.engineering/
- GitHub/npm: https://github.com/darkroomengineering/lenis
- Last verified: 2026-05-28

Best-practice rules:
- Instantiate Lenis once per app/page scroll scope.
- In React, prefer `ReactLenis` / `useLenis` where appropriate.
- Cleanup Lenis RAF/ticker hooks on unmount.
- If using GSAP ScrollTrigger, call `lenis.on("scroll", ScrollTrigger.update)`.
- If driving Lenis from GSAP, add Lenis `raf(time * 1000)` to `gsap.ticker`.
- Remove the ticker callback during cleanup.
- Consider `gsap.ticker.lagSmoothing(0)` when using the documented Lenis/GSAP ticker integration.
- Respect `prefers-reduced-motion`; skip or reduce smooth scroll where appropriate.
- Preserve native anchors, focus navigation, keyboard scroll, and scroll restoration.
- Verify trigger sync after images/fonts load and when responsive layout changes.

Implementation pattern:
- Wrap the app/page with `ReactLenis root`.
- Use `autoRaf: false` when syncing Lenis from GSAP ticker.
- Register ScrollTrigger before syncing.
- Add Lenis scroll listener to update ScrollTrigger.
- Add and remove the GSAP ticker update function in component lifecycle.

Anti-patterns:
- Creating multiple root Lenis instances accidentally.
- Combining native smooth-scroll CSS and Lenis without checking conflicts.
- Forgetting to remove GSAP ticker callbacks.
- Using smooth scroll as a substitute for clear layout or navigation.

Security/safety notes:
- Do not degrade content access for keyboard, assistive tech, or users with reduced motion.

Verification method:
- Render and scroll manually through top, middle, and bottom.
- Confirm anchors, wheel, touch, keyboard scroll, and route changes still work.
- Confirm ScrollTrigger scenes stay aligned with Lenis scroll.

Generated/local artifacts:
- Local screenshots and scroll QA reports remain task-local.

Micro-update history:
- 2026-05-28: Initial blob created from Context7 Lenis docs.

Safe to sync to codex-workflow:
yes
