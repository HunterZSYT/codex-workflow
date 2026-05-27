# Knowledge Blob: Screenshot vs DOM Measurement

Blob ID: screenshot-vs-dom-measurement

Owner system: agentic-frontend

Owner skill: verification-gate-controller

Capability: Choose screenshot inspection or DOM/CSS measurement based on the visual claim.

Trigger phrases:
- screenshot
- DOM measurement
- visual proof
- spacing proof
- overflow
- sticky
- alignment

When to use:
- Use when selecting verification for frontend visual, responsive, spacing, sticky, overflow, or alignment work.

When not to use:
- Do not run heavy browser proof for tiny text-only edits without visual risk.

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
- Use screenshots for overall composition, visual hierarchy, first viewport, and user-perceived polish.
- Use DOM/CSS measurement for spacing, overflow, sticky positioning, dimensions, alignment, and text fitting.
- Use mobile emulation before claiming responsive behavior.
- Use interaction checks for menus, modals, forms, and animated states.
- Pair screenshot and DOM proof when a visual claim depends on exact geometry.

Implementation pattern:
- Name the claim being verified.
- Choose screenshot, DOM measurement, or both.
- Capture desktop and mobile evidence when responsive behavior is in scope.
- Report only verified observations.

Anti-patterns:
- Saying "looks good" without rendered inspection.
- Using screenshots alone to prove exact spacing.
- Using DOM values alone to judge overall design quality.

Security/safety notes:
- Avoid syncing screenshots that may contain private data.

Verification method:
- Tool choice is the verification method; record the selected evidence.

Generated/local artifacts:
- Temporary screenshots and traces are not workflow knowledge artifacts.

Micro-update history:
- 2026-05-28: Extracted from frontend-inspection-discipline and verification-gate-controller.

Safe to sync to codex-workflow:
yes
