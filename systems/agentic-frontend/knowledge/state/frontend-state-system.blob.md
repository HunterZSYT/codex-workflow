# Knowledge Blob: Frontend State System

Blob ID: frontend-state-system

Owner system: agentic-frontend

Owner skill: frontend-tool-orchestrator

Capability: Design and verify loading, skeleton, empty, error, success, no-results, disabled, offline, permission, and validation states without layout instability.

Trigger phrases:
- loading state
- empty state
- error state
- success state
- no results
- skeleton
- disabled
- offline
- permission state
- validation state

When to use:
- Use when a component/page depends on async data, submission, filtering, search, permissions, or failure handling.

When not to use:
- Do not create fake states for static content that cannot enter those states.

External libraries/tools:
- None required.

Required docs source:
- web.dev CLS guidance: https://web.dev/optimize-cls
- web.dev CLS overview: https://web.dev/articles/cls
- Existing accessibility/form/inspection skills.
- Last verified: 2026-06-01

Best-practice rules:
- State changes should preserve layout stability where possible.
- Loading should reserve expected space.
- Empty states should explain what happened and offer the next useful action.
- Error states should name the problem at the right level without exposing internals.
- Success states should confirm completion without blocking the next workflow.
- Disabled states should include a reason when the reason is not obvious.
- Validation states should keep label, input, helper, and error grouped.

Implementation pattern:
- Map all realistic states before coding.
- Keep the same component footprint between loading and loaded where possible.
- Put state handling near the component/page boundary that owns the state.
- Verify at least the state touched by the task.

Anti-patterns:
- Spinner with no layout reserve.
- Empty page with no next action.
- Toast-only error for persistent form errors.
- Success message that disappears before the user can read it.
- Error messages that reveal secrets or server internals.

Verification method:
- Render the relevant state or inspect code paths when render is not available.
- Check layout stability for loading/error transitions.
- Use accessibility checks for validation and status messaging when forms are involved.

Generated/local artifacts:
- None

Safe to sync to codex-workflow:
yes

