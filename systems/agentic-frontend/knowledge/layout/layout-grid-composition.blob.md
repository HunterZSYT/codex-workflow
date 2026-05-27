# Knowledge Blob: Layout Grid Composition

Blob ID: layout-grid-composition

Owner system: agentic-frontend

Owner skill: layout-composition-fundamentals

Capability: Compose sections with shared containers, grouping, focal points, and grid/flex decisions.

Trigger phrases:
- layout composition
- grid layout
- container alignment
- card grid
- focal point
- responsive layout

When to use:
- Use when a UI feels random, misaligned, unbalanced, or structurally weak.

When not to use:
- Do not redesign the whole page when a container, grouping, or grid fix solves the issue.

External libraries/tools:
- None

Required docs source:
- Context7: not needed
- Official docs: not needed
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Important content should usually align to shared left/right container edges.
- Full-width backgrounds are allowed; inner content still needs a container.
- Grouping comes from proximity, alignment, similarity, and shared region.
- Each section should have one main focal point.
- Use flex for one-dimensional groups.
- Use grid for repeated cards, page regions, and two-dimensional layouts.
- Desktop multi-column sections should stack logically on mobile.

Implementation pattern:
- Preserve the existing layout direction.
- Check container alignment before changing component visuals.
- Name the content groups and focal point.
- Choose flex or grid by layout dimension.
- Verify desktop and mobile structure.

Anti-patterns:
- Random margins to simulate grid structure.
- Floating CTAs outside the section group.
- Keeping desktop columns squeezed on mobile.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Render and inspect alignment, grouping, focal point, and mobile stacking.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from layout-composition-fundamentals.

Safe to sync to codex-workflow:
yes
