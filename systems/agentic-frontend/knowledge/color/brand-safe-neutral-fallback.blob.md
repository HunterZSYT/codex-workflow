# Knowledge Blob: Brand Safe Neutral Fallback

Blob ID: brand-safe-neutral-fallback

Owner system: agentic-frontend

Owner skill: dynamic-ui-color-contrast-logic

Capability: Preserve brand color intent while fixing weak contrast with neutral fallbacks.

Trigger phrases:
- brand color conflict
- neutral fallback
- CTA contrast
- muted text
- color hierarchy
- accessible brand palette

When to use:
- Use when a brand color is visually right but creates low contrast, noisy hierarchy, or unclear component roles.

When not to use:
- Do not use neutral fallbacks to erase a deliberate brand system when the current pair is already readable and coherent.

External libraries/tools:
- None

Required docs source:
- Context7: not needed
- Official docs: not needed
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Preserve brand background or accent colors when they carry identity or component role.
- Change the foreground first.
- If foreground change fails, adjust the background shade or tint.
- Use white, near-white, dark navy, charcoal, or dark gray before adding unrelated accent colors.
- Use medium gray only for genuinely secondary text.
- Keep primary CTAs stronger than secondary actions and navigation.
- Let decorative colors stay softer than functional colors.

Implementation pattern:
- Identify which color carries brand identity.
- Preserve that color if possible.
- Select the closest neutral foreground/background that restores readability.
- Check hierarchy after the fix so the UI does not become flat.

Anti-patterns:
- Adding a new saturated color just to pass contrast.
- Making every element equally high contrast.
- Using disabled-looking neutrals for active controls.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Check key foreground/background pairs visually and, for important pairs, with exact contrast proof.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from dynamic-ui-color-contrast-logic.

Safe to sync to codex-workflow:
yes
