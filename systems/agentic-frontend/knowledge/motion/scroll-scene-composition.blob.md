# Knowledge Blob: Scroll Scene Composition

Blob ID: scroll-scene-composition

Owner system: agentic-frontend

Owner skill: motion-quality-router

Capability: Compose scroll animation scenes that support reading and layout instead of fighting them.

Trigger phrases:
- scroll scene
- animation-heavy website
- scroll reveal
- pinned section
- parallax
- scroll choreography

When to use:
- Use when designing or reviewing scroll-triggered sequences, reveals, pinned sections, or animation-heavy page clones.

When not to use:
- Do not add scroll scenes to simple informational pages where static layout communicates better.

External libraries/tools:
- GSAP/ScrollTrigger or Lenis when used by implementation

Required docs source:
- Context7: required for external API implementation
- Official docs: GSAP/Lenis docs when using those libraries
- GitHub/npm: package docs when implementation depends on package behavior
- Last verified: existing skill/user-authored composition rule, 2026-05-28

Best-practice rules:
- Motion should clarify hierarchy, progression, or spatial relationship.
- Content must be readable and reachable without perfect animation timing.
- Avoid overlapping scenes that compete for scroll ownership.
- Keep pinned sections purposeful and bounded.
- Refresh scroll triggers after major layout, image, or font changes when using ScrollTrigger.
- Respect reduced motion.

Implementation pattern:
- Map section purpose and reading order first.
- Assign one primary motion idea per scene.
- Keep layout stable before attaching scroll triggers.
- Verify scroll start/end points against rendered content.

Anti-patterns:
- Using scroll animation as decoration with no content purpose.
- Multiple libraries controlling scroll without synchronization.
- Timelines that break when content height changes.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Render and scroll through desktop/mobile; confirm trigger timing, content visibility, and reduced-motion fallback.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from motion-quality-router and visual inspection policy.

Safe to sync to codex-workflow:
yes
