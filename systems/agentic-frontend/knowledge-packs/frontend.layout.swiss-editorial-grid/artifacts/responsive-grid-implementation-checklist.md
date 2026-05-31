# Responsive Grid Implementation Checklist

Desktop:

- Use 8 or 12 columns for editorial composition.
- Align section title, content, media, and CTAs to grid lines.
- Use negative space intentionally.
- Avoid equal columns unless the content truly has equal weight.

Tablet:

- Reduce columns to 6 or collapse complex placements.
- Reduce gaps by roughly 25%.
- Keep source order and visual order aligned.
- Preserve typographic hierarchy without oversized line breaks.

Mobile:

- Collapse to one column.
- Reduce section padding.
- Keep labels close to related content.
- Avoid preserving empty desktop grid columns.
- Keep buttons and links reachable and readable.
- Check horizontal overflow.

Accessibility:

- Do not use `order`, grid placement, or dense auto-placement to create a reading order different from the DOM.
- If visual order must change, change the markup order instead when safe.
- Verify keyboard/focus and screen-reader order when interactive content is involved.

