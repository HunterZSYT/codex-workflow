# Knowledge Blob: Responsive Section Spacing

Blob ID: responsive-section-spacing

Owner system: agentic-frontend

Owner skill: dynamic-ui-spacing-rhythm-logic

Capability: Scale section spacing across desktop, tablet, and mobile.

Trigger phrases:
- responsive spacing
- section padding
- mobile spacing
- hero spacing
- landing page rhythm

When to use:
- Use when desktop spacing is carried directly to mobile, sections feel cramped, or large screens feel under-composed.

When not to use:
- Do not compress spacing so far that touch targets or reading rhythm break.

External libraries/tools:
- None

Required docs source:
- Context7: not needed
- Official docs: not needed
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Tablet spacing is usually desktop spacing times `0.75`.
- Mobile spacing is usually desktop spacing times `0.5` to `0.65`.
- Compact sections use `48px` to `64px` block padding.
- Normal content sections use `72px` to `96px`.
- Large landing sections use `96px` to `120px`.
- Heroes use `96px` to `160px` desktop and `56px` to `80px` mobile.
- Mobile content should not touch screen edges; keep practical side padding.

Implementation pattern:
- Define desktop section padding first.
- Reduce tablet and mobile spacing proportionally.
- Stack columns before squeezing content.
- Re-check button height, text wrapping, and section order.

Anti-patterns:
- Keeping desktop section padding on mobile.
- Removing spacing until content groups collapse together.
- Using viewport-width font scaling as a spacing workaround.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Inspect at desktop, tablet, and mobile widths for overflow, crowding, and excessive whitespace.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from dynamic-ui-spacing-rhythm-logic.

Safe to sync to codex-workflow:
yes
