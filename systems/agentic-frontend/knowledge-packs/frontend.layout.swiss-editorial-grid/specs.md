# Specs

## Status

Candidate, source-backed, artifact-backed. Not active until approved.

## Core Composition Model

Use this pack when a section or page needs:

- A strong typographic focal point.
- Modular grid alignment.
- Asymmetrical balance.
- Editorial pacing.
- Restrained color and decoration.
- Source-order-safe responsive behavior.

## Grid System

Default section grid:

```css
.swiss-section {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: clamp(16px, 2vw, 32px);
  row-gap: clamp(24px, 4vw, 56px);
}
```

Use 12 columns for desktop editorial flexibility. Use 6 or 8 columns for simpler content. Use one column on mobile unless a safe two-column micro layout is clearly readable.

Desktop placement patterns:

- Headline block spans 6 to 8 columns.
- Supporting text spans 4 to 5 columns.
- Metadata/eyebrow can occupy 2 to 3 columns.
- Image/media can span 5 to 7 columns.
- Negative space is allowed when it clarifies hierarchy.

## Typography

Use a small type system:

- Display heading: large, tight line-height, usually 700 to 900 weight.
- Section heading: smaller than display but clearly dominant.
- Body text: readable line-height, controlled max-width.
- Metadata/labels: small, uppercase only when letter-spaced.

Recommended ranges must defer to the active typography skill:

- Display: `clamp(48px, 7vw, 96px)` for true editorial hero moments.
- Section heading: `clamp(32px, 4vw, 56px)`.
- Body: `16px` to `18px`, line-height `1.5` to `1.7`.
- Labels: `12px` to `14px`, letter-spacing `0.06em` to `0.12em` only for uppercase.

## Spacing

Use active spacing rhythm rules. Swiss/editorial layouts should look deliberate, not sparse by accident.

- Related text: 8px to 20px.
- Text block to supporting action: 24px to 40px.
- Major group separation: 48px to 80px.
- Editorial hero section padding: 96px to 140px desktop, 56px to 80px mobile.

## Color

Default to restrained palettes:

- Black/white/neutral base.
- One strong accent when useful.
- Avoid decorative gradients, bokeh, or unrelated color blocks.
- Use contrast to clarify hierarchy.

## Imagery

Prefer real content images, editorial photography, product imagery, or source-relevant media. Do not use imagery as decoration when typography can carry the message.

## Responsive Rules

- Preserve logical reading order.
- Collapse to one column on mobile.
- Reduce gaps and section padding.
- Keep the headline readable and avoid overlong one-word breaks.
- Avoid using visual reordering that contradicts DOM/source order.

## Anti-Patterns

- Centered hero plus generic card grid labeled "Swiss".
- Random oversized type with no grid.
- Decorative poster shapes that do not serve content.
- Overlapping elements that break readability.
- Visual order different from DOM order.
- Copying historical poster compositions.

Do not invent final values from broad AI memory.
