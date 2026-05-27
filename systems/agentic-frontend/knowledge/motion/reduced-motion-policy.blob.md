# Knowledge Blob: Reduced Motion Policy

Blob ID: reduced-motion-policy

Owner system: agentic-frontend

Owner skill: motion-quality-router

Capability: Respect reduced-motion preferences for page, scroll, and interaction animation.

Trigger phrases:
- reduced motion
- prefers-reduced-motion
- animation accessibility
- motion safety
- scroll animation

When to use:
- Use whenever adding motion, scroll-triggered animation, smooth scrolling, page transitions, hover motion, or looped visual effects.

When not to use:
- Do not remove all state feedback; keep non-motion cues for interactive states.

External libraries/tools:
- None for the policy itself

Required docs source:
- Context7: not needed
- Official docs: browser/CSS docs when exact API wording is required
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Check `prefers-reduced-motion` before enabling non-essential motion.
- Disable or simplify parallax, pinned scroll, smooth-scroll hijacking, large transforms, and long timelines for reduced-motion users.
- Keep important content visible without animation completion.
- Provide instant or subtle opacity/position changes instead of complex movement.
- Verify that reduced-motion mode does not leave content hidden.

Implementation pattern:
- Detect preference in CSS or client code.
- Gate animation setup and smooth scroll initialization.
- Provide static final states for animated content.
- Test both normal and reduced-motion paths when practical.

Anti-patterns:
- Hiding content until a timeline runs.
- Running smooth-scroll libraries despite reduced-motion preference.
- Depending on scroll animation to reveal critical content.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Emulate reduced motion or force the preference and inspect that content remains visible and usable.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from motion-quality-router and existing GSAP/Lenis blob rules.

Safe to sync to codex-workflow:
yes
