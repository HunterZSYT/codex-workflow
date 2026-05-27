# Knowledge Blob: Spacing Rhythm Scale

Blob ID: spacing-rhythm-scale

Owner system: agentic-frontend

Owner skill: dynamic-ui-spacing-rhythm-logic

Capability: Apply a consistent spacing scale for UI rhythm.

Trigger phrases:
- spacing scale
- layout rhythm
- gap
- padding
- margin
- strict spacing

When to use:
- Use when a UI has inconsistent spacing, random pixel values, weak rhythm, or unclear internal/external separation.

When not to use:
- Do not override an existing project spacing token system unless it is clearly broken or incomplete.

External libraries/tools:
- None

Required docs source:
- Context7: not needed
- Official docs: not needed
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Default to an 8px rhythm unless the project already has a clear system.
- Use `4px` for micro adjustments.
- Use `8px` to `12px` for tight relationships.
- Use `16px` to `32px` for component internals.
- Use `40px` to `64px` for group separation inside a section.
- Use `80px` to `120px` for section separation.
- Reserve `120px` to `160px` for major hero/editorial spacing.
- Avoid random values such as `17px`, `23px`, `37px`, or `53px` without a specific visual reason.

Implementation pattern:
- Diagnose whether the broken space is inside an element, between children, between groups, or between sections.
- Use padding for internal space.
- Use `gap` for flex/grid children.
- Use section padding or margin for external block separation.
- Keep repeated sections aligned to a shared rhythm.

Anti-patterns:
- Empty divs or `<br>` for visual spacing.
- Stacked random margins on many children.
- Same spacing everywhere regardless of content importance.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Inspect desktop and mobile rendered layouts for rhythm, grouping, and overflow.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from dynamic-ui-spacing-rhythm-logic.

Safe to sync to codex-workflow:
yes
