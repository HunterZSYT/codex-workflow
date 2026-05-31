# Knowledge Blob: Interaction Feedback States

Blob ID: interaction-feedback-states

Owner system: agentic-frontend

Owner skill: frontend-tool-orchestrator

Capability: Route and evaluate UI interaction states across elements, primitive components, navigation, forms, and section actions.

Trigger phrases:
- hover state
- focus state
- focus-visible
- active state
- pressed state
- disabled state
- loading button
- selected state
- current nav
- expanded collapsed
- error success state
- keyboard focus

When to use:
- Use when changing or reviewing buttons, links, nav items, tabs, accordions, menus, forms, cards with actions, or any interactive UI.

When not to use:
- Do not run visual inspection for a pure copy edit unless interaction layout/state is affected.

External libraries/tools:
- None required.

Required docs source:
- W3C/WAI WCAG 2.2 Focus Visible: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
- WCAG 2.2 new criteria overview: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- MDN CSS pseudo-classes: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
- Last verified: 2026-06-01

Best-practice rules:
- Every interactive control needs distinguishable default, hover, focus-visible, active/pressed, disabled, and loading behavior when relevant.
- Do not remove focus outlines without a clear visible replacement.
- Hover cannot be the only feedback path; keyboard and touch users need equivalent feedback.
- Disabled controls should look unavailable and avoid fake interactivity.
- Loading states should prevent duplicate submission and preserve layout size.
- Selected/current/expanded states should communicate persistent state, not just momentary hover.
- Error/success states must be visible by more than color alone when critical.

Implementation pattern:
- Start with semantics: button vs link vs input vs disclosure.
- Add state classes/tokens at the primitive level when the behavior repeats.
- Keep focus-visible strong enough for keyboard use.
- Preserve component dimensions across loading/disabled/success states.
- Use ARIA only when semantic HTML cannot express the state directly.

Anti-patterns:
- `outline: none` without replacement.
- Hover-only affordance.
- Disabled styles that pass as active.
- Loading spinner that changes button width.
- Error state shown only with low-contrast red text.

Verification method:
- Inspect keyboard focus order and focus visibility.
- Render hover/focus/active/disabled/loading states when making visual claims.
- Use accessibility checks for forms, menus, modals, tabs, accordions, and icon-only controls.

Generated/local artifacts:
- None

Safe to sync to codex-workflow:
yes

