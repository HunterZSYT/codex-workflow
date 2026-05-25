# Static Template Client Site Checklists

Use these checklists as working notes. Keep them short in user-facing updates; include details in the implementation plan when they affect edits.

## Template Section Reuse

- List section variants by file and purpose.
- Choose the closest existing section before designing a new one.
- Preserve required wrapper classes, data attributes, animation hooks, slider markup, and JS initialization selectors.
- Reuse existing card, grid, spacing, and button classes.
- Delete or hide unused demo sections only after confirming no shared JS depends on them.

## Page Pruning

- Identify required client pages.
- Map old template pages to keep, repurpose, or delete.
- Update all nav/footer links after pruning.
- Check sitemap, robots, manifest, canonical tags, breadcrumbs, and `href` references if present.
- Remove orphaned assets only after searching references.

## Brand-Token Replacement

- Inventory old template names, demo company names, addresses, phone numbers, emails, social URLs, color names, and slogan text.
- Replace obvious tokens globally only after previewing matches.
- Update title/meta description/Open Graph/Twitter card text per page.
- Replace logo, favicon, app icons, and footer brand marks.
- Update CSS variables or theme files before one-off color overrides.

## Responsive Image Planning

Create an image plan before resizing or swapping assets:

| Use | Desktop | Tablet | Mobile | Notes |
| --- | --- | --- | --- | --- |
| Hero background | 1920x1080 or template ratio | 1280x900 | 900x1200 | Keep focal point visible; test text contrast. |
| Hero inline/product | 1200x900 | 900x700 | 720x720 | Avoid crops that hide the subject. |
| Card/grid thumbnail | 800x600 | 640x480 | 640x480 | Consistent aspect ratio prevents layout shift. |
| Team/testimonial avatar | 320x320 | 240x240 | 180x180 | Prefer square source and CSS crop. |
| Gallery/detail | 1600px wide | 1200px wide | 900px wide | Use lightbox/source pattern if template has one. |

- Use existing responsive image conventions first.
- Add `width` and `height` attributes when static dimensions are known.
- Use `loading="lazy"` outside first viewport.
- Verify mobile crops manually.

## CTA Normalization

- Create one CTA inventory: label, destination, page/section, visual priority.
- Use consistent labels for repeated actions.
- Ensure primary CTA destination works from every page.
- Convert dead `#`, `javascript:void(0)`, and template demo links.
- Keep CTA hierarchy clear: one primary action per section when possible.

## Static Contact-Form Strategy

- Inventory all forms and fields.
- Choose one static strategy: `mailto:`, provider endpoint, Netlify Forms, Formspree-style endpoint, or visual-only pending integration.
- Preserve validation attributes and accessible labels.
- Remove fake AJAX success flows unless they match the chosen provider.
- Verify submit behavior and failure state, or document that integration details are still needed.

## PDF/Document Embedding

- Store PDFs/documents in the existing assets/docs pattern or create a clear `assets/docs/` folder.
- Add a direct download/open link for every embedded document.
- Use `<iframe>`, `<object>`, or template modal only when readable on mobile.
- Provide a mobile fallback link near the embed.
- Confirm file path casing and static-host compatibility.

## Testimonial/Avatar Redesign

- Replace template names, roles, ratings, and headshots.
- If real photos are unavailable, use initials or branded abstract avatars.
- Keep quote length within the template card height; avoid overflow on mobile.
- Ensure avatar style is consistent across all testimonial variants.
- Remove fake company logos unless approved.

## Mobile Responsiveness QA

- Test at 390x844, 768x1024, and at least one desktop width such as 1440x900.
- Check header wrap, hamburger open/close, sticky nav, dropdowns, hero height, CTA stacking, image crops, card grids, forms, embeds, and footer columns.
- Confirm there is no horizontal scrolling.
- Confirm tap targets are usable and text does not overlap images/buttons.
- Check console errors after interacting with nav, sliders, forms, accordions, galleries, and modals.

## Forbidden-Placeholder Search

Search for:

```text
lorem
ipsum
placeholder
dummy
sample
demo
template
your company
company name
envato
themeforest
untitled
example.com
test@example
123-456
000-000
#
javascript:void
```

Also search for old template brand names discovered during inspection.

## Browser Verification

- Start the local dev server if the template requires one; otherwise open the HTML file directly.
- Verify desktop, tablet, and mobile viewports.
- Click every nav item and primary CTA.
- Submit or dry-run forms according to the chosen static strategy.
- Open embedded PDFs/documents and fallback download links.
- Inspect network failures for missing assets.
- Inspect the console after page load and interactions.
