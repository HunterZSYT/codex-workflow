# theme.json Design Token Map

Map design-system decisions into `theme.json` before writing ad hoc CSS when the target is a block theme.

- Color palette -> `settings.color.palette`
- Gradients -> `settings.color.gradients`
- Font families -> `settings.typography.fontFamilies`
- Font sizes -> `settings.typography.fontSizes`
- Spacing scale -> `settings.spacing.spacingSizes` or spacing presets
- Content width -> `settings.layout.contentSize`
- Wide width -> `settings.layout.wideSize`
- Global element styles -> `styles.elements`
- Block-level styles -> `styles.blocks`
- Style variations -> `styles/*.json`
- Reusable sections -> `patterns/*.php`
- Reusable structural regions -> `parts/*.html`

Keep tokens intentional. Do not expose unlimited editor controls when the design system requires consistency.
