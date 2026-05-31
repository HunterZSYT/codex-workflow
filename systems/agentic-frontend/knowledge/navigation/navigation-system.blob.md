# Knowledge Blob: Navigation System

Blob ID: navigation-system

Owner system: agentic-frontend

Owner skill: frontend-tool-orchestrator

Capability: Route and evaluate headers, sidebars, breadcrumbs, active route state, sticky behavior, dropdown/mobile menus, and navigation accessibility.

Trigger phrases:
- navigation system
- nav active
- active route
- sticky nav
- sticky header
- mobile menu
- hamburger menu
- dropdown nav
- sidebar navigation
- breadcrumbs
- nav overflow

When to use:
- Use when changing global nav, header, sidebar, breadcrumbs, sticky behavior, mobile menus, dropdowns, or route-active states.

When not to use:
- Do not use for isolated body links unless they affect navigation behavior.

External libraries/tools:
- None required.

Required docs source:
- W3C/WAI menus and menu buttons pattern context: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
- W3C/WAI disclosure pattern context: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- MDN position/sticky reference: https://developer.mozilla.org/en-US/docs/Web/CSS/position
- Existing frontend inspection discipline for sticky/mobile/overflow proof.
- Last verified: 2026-06-01

Best-practice rules:
- Global navigation needs active/current state.
- Hover/focus/touch behavior must be equivalent enough for the device.
- Sticky headers require overlap and scroll-state verification.
- Mobile nav must be reachable, dismissible, and not hidden from keyboard users.
- Breadcrumbs should clarify hierarchy, not duplicate main nav.
- Use semantic navigation landmarks when possible.

Implementation pattern:
- Classify nav scope: item, group, header, sidebar, page, site.
- Preserve left/middle/right header zones when applicable.
- Define current/active state before visual polish.
- Verify mobile menu open/close and focus behavior.
- Check sticky header at top, mid-scroll, and near anchors.

Anti-patterns:
- Active route shown only by hover style.
- Hidden mobile menu with inaccessible focus.
- Sticky header covering content or anchors.
- Random margins pushing nav groups.
- Dropdowns that work only with hover.

Verification method:
- Use rendered inspection for sticky, overflow, and mobile menu claims.
- Use accessibility checks for dropdowns, menus, icon-only controls, and keyboard flow.

Generated/local artifacts:
- None

Safe to sync to codex-workflow:
yes

