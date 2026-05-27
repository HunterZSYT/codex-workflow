# Knowledge Blob: Mobile Emulation Proof

Blob ID: mobile-emulation-proof

Owner system: agentic-frontend

Owner skill: frontend-inspection-discipline

Capability: Verify responsive claims with mobile rendering evidence.

Trigger phrases:
- mobile proof
- responsive proof
- mobile emulation
- viewport
- inspect mobile

When to use:
- Use when making or claiming mobile/responsive visual changes.

When not to use:
- Do not require screenshots for pure copy edits unless layout risk is introduced.

External libraries/tools:
- Browser
- Chrome
- Playwright when available

Required docs source:
- Context7: not needed
- Official docs: browser tooling docs only when tool behavior changes
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Verify at a representative mobile viewport before claiming mobile quality.
- Check wrapping, overflow, sticky/fixed elements, touch target size, and first viewport composition.
- Verify that text does not overlap adjacent UI.
- Confirm primary actions remain visible and usable.

Implementation pattern:
- Open the rendered page.
- Set mobile viewport/emulation.
- Inspect key sections and interactions.
- Use screenshot evidence when visual judgment matters.
- Use DOM/CSS measurement when exact overflow, size, sticky, or spacing claims matter.

Anti-patterns:
- Claiming responsive quality from desktop-only inspection.
- Trusting static code review for visual layout claims.

Security/safety notes:
- Do not expose private content in shared screenshots.

Verification method:
- Browser/Chrome mobile emulation plus targeted DOM checks when needed.

Generated/local artifacts:
- Temporary screenshots are local artifacts and should not be synced unless explicitly intended and sanitized.

Micro-update history:
- 2026-05-28: Extracted from frontend-inspection-discipline and verification-gate-controller rules.

Safe to sync to codex-workflow:
yes
