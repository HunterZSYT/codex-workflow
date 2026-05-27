# Knowledge Blob: Brand Wrapper Composition

Blob ID: brand-wrapper-composition

Owner system: agentic-frontend

Owner skill: component-supply-router

Capability: Wrap generated primitives in project brand components when repeated composition appears.

Trigger phrases:
- brand wrapper
- component wrapper
- shadcn composition
- repeated component styling
- design system wrapper

When to use:
- Use after selecting a stable primitive or component and discovering repeated project-specific styling or composition.

When not to use:
- Do not create wrappers for one-off page sections or before the primitive choice is clear.

External libraries/tools:
- shadcn/Radix when relevant

Required docs source:
- Context7: use shadcn docs if wrapper depends on shadcn internals
- Official docs: https://ui.shadcn.com/docs when relevant
- GitHub/npm: not needed for internal wrapper rules
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Keep generated shadcn/Radix primitives accessible and minimally altered.
- Put brand-specific defaults in project wrappers when reuse is clear.
- Expose the underlying primitive behavior instead of hiding important accessibility props.
- Use project tokens for color, spacing, radius, typography, and states.
- Avoid brittle selectors into primitive internals unless no stable API exists.

Implementation pattern:
- Add or inspect the primitive first.
- Identify repeated composition or styling.
- Create a small brand wrapper near the project component convention.
- Pass through essential props and refs when the base primitive expects them.
- Verify states and keyboard behavior still work.

Anti-patterns:
- Forking generated primitives for every visual variant.
- Wrapping too early and freezing the wrong abstraction.
- Removing labels, titles, focus handling, or keyboard behavior.

Security/safety notes:
- Do not pull unknown registry code without review.

Verification method:
- Render wrapper states and verify keyboard/focus behavior for interactive components.

Generated/local artifacts:
- Wrapper components are project source when intentionally created.

Micro-update history:
- 2026-05-28: Extracted from component-supply-router and shadcn primitive rules.

Safe to sync to codex-workflow:
yes
