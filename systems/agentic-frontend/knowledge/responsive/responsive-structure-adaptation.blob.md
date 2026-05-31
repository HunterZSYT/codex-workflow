# Knowledge Blob: Responsive Structure Adaptation

Blob ID: responsive-structure-adaptation

Owner system: agentic-frontend

Owner skill: frontend-tool-orchestrator

Capability: Transform layouts across wide, medium, narrow, and mobile contexts while preserving content priority and proof quality.

Trigger phrases:
- responsive structure
- mobile layout
- tablet layout
- wide medium narrow
- stack columns
- mobile order
- responsive hero
- responsive card grid
- mobile header

When to use:
- Use when a task affects layout behavior across viewport sizes, especially heroes, headers, card grids, forms, dashboards, media, and section rhythm.

When not to use:
- Do not use for a one-line style edit unless it changes wrapping, overflow, or component geometry.

External libraries/tools:
- None required.

Required docs source:
- MDN responsive design guide: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
- MDN media queries: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries
- Existing frontend inspection discipline: mobile claims require device-style emulation, not a resized desktop window.
- Last verified: 2026-06-01

Best-practice rules:
- Responsive design is restructuring, not only shrinking.
- Wide screens may use multi-column composition; medium screens reduce columns/gaps; narrow screens stack by content priority.
- Preserve logical reading order.
- Reduce section padding, grid gaps, and type scale on mobile.
- Collapse nav before it crowds.
- Do not keep large desktop whitespace on mobile.
- Do not prove mobile behavior with a resized desktop-only viewport.

Implementation pattern:
- Identify scope: component, group, section, page, or site navigation.
- Define desktop structure.
- Define tablet simplification.
- Define mobile reading order.
- Reserve space for dynamic media/content to avoid layout shift.
- Verify with real mobile emulation if making a mobile claim.

Anti-patterns:
- Squeezed desktop columns on mobile.
- Hidden primary actions.
- DOM order different from visual order.
- Horizontal overflow from fixed widths.
- Mobile screenshots taken from desktop resize only.

Verification method:
- Use rendered inspection for desktop and mobile.
- Use DOM measurement for overflow.
- Use mobile emulation for mobile claims.

Generated/local artifacts:
- None

Safe to sync to codex-workflow:
yes

