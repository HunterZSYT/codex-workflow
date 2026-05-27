# Knowledge Blob: Type Scale Hierarchy

Blob ID: type-scale-hierarchy

Owner system: agentic-frontend

Owner skill: dynamic-ui-typography-logic

Capability: Build readable hierarchy from size, weight, contrast, position, and spacing.

Trigger phrases:
- typography hierarchy
- type scale
- weak heading
- hero title
- section title
- CTA text

When to use:
- Use when text hierarchy is flat, crowded, oversized, inconsistent, or hard to scan.

When not to use:
- Do not replace an existing project type system unless it is inconsistent or failing the UI role.

External libraries/tools:
- None

Required docs source:
- Context7: not needed
- Official docs: not needed
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Text importance is `font size + font weight + contrast + position + spacing`.
- Body text default is usually `16px`.
- Card titles often sit around `20px` to `24px`.
- Section headings often sit around `32px` to `48px`.
- Hero headings often sit around `40px` to `72px`.
- Large headings need tighter line-height, usually `1.0` to `1.15`.
- Body text needs line-height around `1.5` to `1.7`.
- Button text should be compact, readable, and usually `600` or `700` weight.
- Do not make every element bold or equally large.

Implementation pattern:
- Classify each text role before changing values.
- Assign size, weight, line-height, and spacing by role.
- Use responsive clamp for major headings when appropriate.
- Keep mobile heading sizes smaller than desktop sizes.

Anti-patterns:
- Fixing hierarchy with font size only.
- Overusing bold.
- Letting card titles compete with section headings.
- Keeping desktop hero sizes on mobile.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Inspect rendered hierarchy and wrapping at desktop and mobile widths.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from dynamic-ui-typography-logic.

Safe to sync to codex-workflow:
yes
