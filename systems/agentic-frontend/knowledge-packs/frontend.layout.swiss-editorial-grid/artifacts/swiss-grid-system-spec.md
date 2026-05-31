# Swiss Grid System Spec

Candidate implementation baseline:

```css
.editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: clamp(16px, 2vw, 32px);
  row-gap: clamp(24px, 4vw, 56px);
  align-items: start;
}
```

Common spans:

- Metadata rail: 2 columns.
- Headline: 6 to 8 columns.
- Body copy: 4 to 5 columns.
- Image/media: 5 to 7 columns.
- CTA row: align with body copy or headline start.

Responsive collapse:

```css
@media (max-width: 760px) {
  .editorial-grid {
    grid-template-columns: 1fr;
    row-gap: 24px;
  }

  .editorial-grid > * {
    grid-column: auto;
  }
}
```

Rules:

- Use grid for two-dimensional composition.
- Use flex for internal rows.
- Keep a shared container outside the grid.
- Use `gap`, not manual random margins, for grid rhythm.
- Do not visually reorder content against reading order.

