# Knowledge Blob: Contrast Ratio Formula

Blob ID: contrast-ratio-formula

Owner system: agentic-frontend

Owner skill: dynamic-ui-color-contrast-logic

Capability: Calculate and apply foreground/background contrast decisions.

Trigger phrases:
- contrast
- WCAG contrast
- foreground background
- text readability
- icon visibility
- accessible colors

When to use:
- Use when a text, icon, control, or overlay readability relationship is uncertain, critical, likely failing, or explicitly requested.

When not to use:
- Do not calculate every decorative color pair when visual risk is low and the element is non-functional.

External libraries/tools:
- None

Required docs source:
- Context7: not needed
- Official docs: WCAG contrast model when current accessibility wording is required
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Contrast ratio is `(L1 + 0.05) / (L2 + 0.05)`, where `L1` is the lighter relative luminance and `L2` is the darker relative luminance.
- Relative luminance weights are red `0.2126`, green `0.7152`, and blue `0.0722` after proper color-channel normalization.
- Normal readable text targets at least `4.5:1`.
- Large text targets at least `3:1`.
- Meaningful icons, borders, and UI controls target at least `3:1`.
- Important actions and body text should usually meet or exceed `4.5:1` when possible.
- Do not maximize contrast blindly; preserve hierarchy and brand intent.

Implementation pattern:
- Identify the foreground/background pair.
- Classify the UI role: critical, important, secondary, or decorative.
- Calculate exact ratio only for uncertain or important relationships.
- Adjust the foreground first when preserving the background matters.
- Adjust the background if foreground changes cannot meet the target.
- Use neutral fallback colors when brand colors fight readability.

Anti-patterns:
- Using muted gray for critical text.
- Putting dark text on medium saturated backgrounds.
- Putting pale text on pale tints.
- Replacing brand colors with unrelated colors only because they contrast.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Use a contrast calculator or browser accessibility tooling when exact proof is needed.
- Visually inspect rendered states, including hover, focus, disabled, and image overlays.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from dynamic-ui-color-contrast-logic as a reusable formula blob.

Safe to sync to codex-workflow:
yes
