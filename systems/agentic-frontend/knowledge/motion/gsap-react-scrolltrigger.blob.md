# Knowledge Blob: GSAP React ScrollTrigger

Blob ID: gsap-react-scrolltrigger

Owner system: agentic-frontend

Owner skill: motion-quality-router

Capability: React animation timelines and scroll-triggered animation with GSAP.

Trigger phrases:
- GSAP
- @gsap/react
- ScrollTrigger
- scroll-triggered animation
- pinned scroll
- animation-heavy website
- React timeline

When to use:
- Use for advanced React animation, pinned scroll scenes, coordinated timelines, scroll progress effects, or when GSAP/ScrollTrigger is explicitly requested.

When not to use:
- Do not use for simple hover, opacity, or transform transitions that CSS/Tailwind can handle.
- Do not use when animation is decorative and `prefers-reduced-motion` should skip it entirely.

External libraries/tools:
- `gsap`
- `@gsap/react`
- `gsap/ScrollTrigger`

Required docs source:
- Context7: `/greensock/react`
- Official docs: https://gsap.com/resources/React/
- GitHub/npm: https://github.com/greensock/react
- Last verified: 2026-05-28

Best-practice rules:
- In React, prefer `useGSAP` over raw `useEffect` or `useLayoutEffect` for GSAP setup.
- Register the hook once with `gsap.registerPlugin(useGSAP)`.
- Register `ScrollTrigger` with `gsap.registerPlugin(ScrollTrigger)` before creating scroll triggers.
- Scope selector-based animations to a container ref with `useGSAP(..., { scope: container })`.
- Let `useGSAP`/GSAP context handle cleanup on unmount and React Strict Mode remounts.
- Wrap event handlers, delayed callbacks, timers, and manual listeners that create GSAP objects with `contextSafe`.
- Remove manual event listeners in the cleanup function returned from `useGSAP`.
- In Next/App Router, put GSAP code behind a client component boundary.
- Guard heavy motion with `prefers-reduced-motion`; provide a static or simplified state.
- Refresh `ScrollTrigger` after image/font/layout changes that affect trigger positions.
- Verify pinned scroll scenes in a rendered browser, including scroll start/end, overlap, and cleanup after navigation/remount.

Implementation pattern:
- Import `gsap`, `useGSAP`, and `ScrollTrigger`.
- Register `useGSAP` and `ScrollTrigger`.
- Create a `containerRef`.
- Build timelines/triggers inside `useGSAP` scoped to the container.
- Use `contextSafe` for interaction-triggered animations.
- Call `ScrollTrigger.refresh()` after async media settles when layout changes.

Anti-patterns:
- Creating GSAP timelines at module scope for component-owned DOM.
- Running GSAP selectors globally without a scope ref.
- Raw `useEffect` animations without context cleanup.
- Forgetting Strict Mode duplicate-mount behavior.
- Creating ScrollTriggers before images/fonts/layout dimensions are ready.
- Using GSAP for simple button hover states.

Security/safety notes:
- Do not fetch or execute third-party animation snippets from untrusted sources.
- Do not let scroll animation block keyboard navigation or access to content.

Verification method:
- Render the page and capture desktop/mobile scroll states.
- Check console for GSAP/plugin errors.
- Scroll through every trigger boundary and confirm no blank pinned regions, overlap, or stuck scroll.
- Test with reduced motion enabled or code-path inspected.

Generated/local artifacts:
- Browser screenshots and local QA reports stay task-local and are not synced unless sanitized.

Micro-update history:
- 2026-05-28: Initial blob created from Context7 GSAP React docs.

Safe to sync to codex-workflow:
yes
