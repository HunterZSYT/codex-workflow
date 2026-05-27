# Knowledge Blob: Proximity Grouping Spacing

Blob ID: proximity-grouping-spacing

Owner system: agentic-frontend

Owner skill: dynamic-ui-spacing-rhythm-logic

Capability: Use proximity and separation to communicate UI grouping.

Trigger phrases:
- grouping
- proximity
- disconnected layout
- crowded layout
- section heading to grid
- button to cards

When to use:
- Use when related items feel disconnected or unrelated items feel crowded.

When not to use:
- Do not add whitespace before identifying the relationship that is broken.

External libraries/tools:
- None

Required docs source:
- Context7: not needed
- Official docs: not needed
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Icon and label: `4px` to `8px`.
- Label and input: `6px` to `8px`.
- Badge and heading: `8px` to `16px`.
- Heading and paragraph: `12px` to `24px`.
- Paragraph and CTA: `24px` to `40px`.
- Heading block and content grid: `40px` to `64px`.
- Separate sections: `80px` to `120px`.
- Related items should be closer than unrelated items.

Implementation pattern:
- Name the groups first.
- Tighten related micro-groups.
- Add separation between different groups.
- Keep alignment consistent within each group.

Anti-patterns:
- Fixing grouping by only changing font size or color.
- Letting CTAs, cards, and headings float without a parent group.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Render and scan whether the eye reads each group as intended on desktop and mobile.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from dynamic-ui-spacing-rhythm-logic.

Safe to sync to codex-workflow:
yes
