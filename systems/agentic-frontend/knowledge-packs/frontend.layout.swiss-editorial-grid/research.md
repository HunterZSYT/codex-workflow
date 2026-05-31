# Research

## Capability Summary

Swiss / International Typographic Style is useful for web interfaces when a page needs disciplined structure, high typographic clarity, and restrained visual confidence. The style is not "minimalism" alone. It is a system of objective hierarchy, modular alignment, asymmetrical composition, controlled type, and content-led contrast.

## Source-Backed Principles

1. Use a modular grid as the layout skeleton.
   - Britannica describes the movement as using modular horizontal and vertical grids to regularize and align elements.
   - MDN confirms CSS Grid is the web-native layout tool for two-dimensional page regions and alignment.

2. Prefer asymmetrical balance over centered decoration.
   - Cooper Hewitt identifies asymmetrical layouts and grid-based design as Swiss Style features.
   - The design should feel ordered but not mirrored.

3. Let typography carry hierarchy.
   - Sources repeatedly emphasize typography, especially sans-serif type.
   - Web translation: use a small, consistent type scale; strong contrast in size/weight; left-aligned reading flow; avoid decorative type effects.

4. Use photography or concrete media when image content is needed.
   - Cooper Hewitt and Britannica both connect Swiss Style to photography and objective visual communication.
   - Web translation: choose real, content-bearing images; avoid ornamental blobs, generic gradients, or decorative fake poster shapes.

5. Create tension through scale, position, contrast, and negative space.
   - Cooper Hewitt notes harmony created by contrasting relationships.
   - Cooper Hewitt's Crouwel article shows grid standardization can coexist with page tension.

6. Keep source order accessible.
   - MDN and W3C warn that visual grid reordering is not a substitute for logical source order.
   - Web translation: a Swiss composition may place items asymmetrically, but DOM order must still match reading order.

## Web Translation

Use CSS Grid for the outer composition and flex for small internal groups. Prefer a shared container, a visible column rhythm, clear text blocks, and deliberate asymmetry. Do not make every page a poster. The grid must serve the content hierarchy and responsive reading order.

## Candidate Status

This pack is now source-backed and artifact-backed, but remains candidate until user approval. It can guide planning and review; it should not be treated as a live global rule until promoted.
