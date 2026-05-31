# Knowledge Blob: Form Input System

Blob ID: form-input-system

Owner system: agentic-frontend

Owner skill: accessibility-gate

Capability: Route and evaluate form labels, inputs, helper text, validation, error/success states, required/optional clarity, and submit/loading behavior.

Trigger phrases:
- form input
- label input
- helper text
- validation
- required field
- optional field
- error message
- submit loading
- mobile input

When to use:
- Use when changing forms, fields, validation, search inputs, checkout/contact flows, account forms, or filter controls.

When not to use:
- Do not use for static text blocks with no input behavior.

External libraries/tools:
- None required.

Required docs source:
- W3C/WAI forms tutorial: https://www.w3.org/WAI/tutorials/forms/
- WCAG Focus Visible understanding: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
- Existing form spacing rules from Dynamic UI Spacing Rhythm Logic.
- Last verified: 2026-06-01

Best-practice rules:
- Labels stay close to inputs.
- Helper/error text belongs to the field group.
- Required/optional state should be clear without relying only on color.
- Focus, error, disabled, and loading states must be visible.
- Submit loading should prevent duplicate submission.
- Mobile inputs should be readable, reachable, and not squeezed.

Implementation pattern:
- Group label, input, helper, and error.
- Keep field-to-field spacing predictable.
- Use semantic labels and accessible descriptions.
- Place form-level errors where users can find them.
- Verify keyboard navigation.

Anti-patterns:
- Placeholder as the only label.
- Error only in a toast.
- Low-contrast helper text.
- Submit button that changes size while loading.
- Required mark with no explanation.

Verification method:
- Check labels, focus, keyboard order, validation, and submit/loading state.
- Run accessibility check for forms when URL is available.

Generated/local artifacts:
- None

Safe to sync to codex-workflow:
yes

