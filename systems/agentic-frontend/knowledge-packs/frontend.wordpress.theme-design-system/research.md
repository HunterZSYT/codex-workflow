# Research

## Current Finding

For block themes, the WordPress design system should be expressed through `theme.json`, template parts, patterns, styles, and style variations before falling back to broad CSS. This gives better editor/front-end parity and preserves user-facing controls where desired.

## Source-Backed Rules

- Map color, typography, spacing, and layout decisions into `theme.json` where WordPress supports them.
- Use block styles and `styles.blocks` for block-specific defaults.
- Use pattern files for reusable sections.
- Use template parts for structural regions like header/footer.
- Use style variations for alternate design modes.
- Keep custom CSS for gaps not supported cleanly by `theme.json`.
- Avoid exposing uncontrolled editor knobs when the design system needs consistency.
