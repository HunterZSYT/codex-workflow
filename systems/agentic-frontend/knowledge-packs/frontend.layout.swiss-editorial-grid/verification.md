# Verification

## Verification Required Before Use

This is a candidate pack. Before relying on it for implementation, confirm the task actually calls for editorial/Swiss grid structure rather than generic layout cleanup.

## Rendered UI Checks

1. Grid alignment
   - Header, section content, media, and text blocks share a visible container/grid logic.
   - Items do not float outside the system unless intentionally breaking the grid.

2. Typographic hierarchy
   - The primary message is readable first.
   - Supporting text is clearly secondary.
   - Metadata/labels do not compete with the main heading.

3. Asymmetrical balance
   - The composition is not centered by default.
   - Empty space creates focus rather than disconnection.
   - Visual weight is balanced through size, position, contrast, and spacing.

4. Source-order accessibility
   - DOM/source order follows the reading order.
   - CSS grid placement does not create a different experience for keyboard or assistive technology users.

5. Responsive behavior
   - Desktop grid collapses intentionally.
   - Mobile does not preserve desktop whitespace.
   - No text overlap, clipped labels, or horizontal overflow.

6. Content integrity
   - No copied historical poster layouts, collection images, proprietary references, or source assets are used.

## Tools

- Use rendered frontend inspection if visual claims are made.
- Use mobile emulation for mobile claims.
- Use DOM/CSS measurement for overflow, source order risk, or grid placement questions.

## Pass Criteria

The layout passes when the grid clarifies hierarchy, the typography remains readable, the asymmetry feels intentional, and responsive behavior preserves content order.
