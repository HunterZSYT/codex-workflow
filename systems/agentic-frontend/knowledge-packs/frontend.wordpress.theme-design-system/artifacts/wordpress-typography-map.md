# WordPress Typography Map

- Body size/line-height -> global `styles.typography`
- Headings -> `styles.elements.heading` and/or heading block styles
- Font scale -> `settings.typography.fontSizes`
- Font families -> `settings.typography.fontFamilies`
- Button text -> button block styles
- Captions/small text -> block-specific styles where supported

Keep mobile heading sizes realistic. If responsive behavior cannot be fully expressed in `theme.json`, document the scoped CSS fallback.
