---
name: static-template-client-sites
description: Convert existing static HTML/CSS/JS templates into finished responsive client websites. Use when adapting purchased/downloaded/static HTML templates, pruning template pages, replacing demo content with client brand/content, wiring static forms, embedding PDFs/documents, normalizing CTAs/navigation, planning responsive images, redesigning testimonials/avatars, and verifying desktop/tablet/mobile output. Requires inspecting the codebase, inventorying reusable sections/components, mapping required pages/assets/forms/navigation, and creating an implementation plan before editing.
---

# Static Template Client Sites

## Core Rule

Adapt the existing template before creating new components. Preserve its layout system, CSS conventions, animation libraries, asset pipeline, and section markup unless there is a clear client requirement the template cannot satisfy.

Never edit first. Inspect, inventory, map requirements, and write a brief implementation plan before changing files.

## Required Workflow

1. Inspect the codebase:
   - List HTML pages, CSS/SCSS files, JS files, asset folders, package/build files, and docs.
   - Identify whether the site is plain static HTML, a static generator, or a framework export.
   - Run `scripts/audit_template.py <site-root>` when useful for a quick static inventory.

2. Inventory reusable template pieces:
   - Record headers/navs, footers, hero variants, service cards, galleries, pricing, testimonials, forms, modals, maps, accordions, counters, sliders, and blog/news sections.
   - Prefer copying/adapting complete existing sections over hand-building new markup.
   - Note duplicate section variants and choose the closest fit for each client page.

3. Map the client implementation:
   - Required pages and page purpose.
   - Navigation labels, hierarchy, active states, footer links, and mobile menu behavior.
   - Required assets: logo, favicon, images, PDFs/documents, icons, fonts, videos.
   - Required forms and static handling strategy.
   - Required CTAs and destinations.
   - Sections to keep, repurpose, remove, or merge.

4. Create an implementation plan before editing:
   - Mention files to edit.
   - List page pruning and section reuse decisions.
   - List content/brand-token replacements.
   - List responsive image and form strategy.
   - List verification steps.

5. Implement in small passes:
   - Prune unused pages/assets only after identifying references.
   - Replace demo brand tokens globally with care; inspect before broad replacements.
   - Normalize CTAs and navigation across pages.
   - Keep shared header/footer behavior consistent.
   - Add new CSS/JS only when existing utilities cannot achieve the requirement cleanly.

6. Verify before handoff:
   - Run project build/lint/tests if present.
   - Search for forbidden placeholders and demo content.
   - Browser-test desktop, tablet, and mobile widths.
   - Check navigation, forms, embedded documents, image loading/cropping, CTAs, and console errors.

## Mini-Tools

Use [references/checklists.md](references/checklists.md) for compact checklists covering:

- Template section reuse
- Page pruning
- Brand-token replacement
- Responsive image planning with desktop/tablet/mobile dimensions
- CTA normalization
- Static contact-form strategy
- PDF/document embedding
- Testimonial/avatar redesign
- Mobile responsiveness QA
- Forbidden-placeholder search
- Browser verification

Use `scripts/audit_template.py` for a first-pass Markdown inventory:

```bash
python <skill-dir>/scripts/audit_template.py <site-root>
```

The script is intentionally read-only. Treat its output as a starting point, then inspect files manually for template-specific behavior and build conventions.

## Implementation Standards

- Prefer existing classes and component structure.
- Keep pages internally consistent: same header/footer, CTA wording, contact details, social links, and legal links.
- Keep filenames and routes simple for static hosting unless the existing template has a routing convention.
- Use real client content when provided. If content is missing, create minimal neutral copy and flag what remains needed.
- For static contact forms, choose one: `mailto:`, hosted form endpoint, Netlify Forms-compatible attributes, Formspree-style endpoint, or a disabled visual form with clear follow-up note. Do not invent a backend.
- For PDF/document embeds, provide a direct download link plus an inline viewer when appropriate; verify mobile fallback.
- For testimonials without real headshots, use initials, abstract branded avatars, or neutral client-approved placeholders instead of random stock faces.
- For images, plan aspect ratios per use case and use `srcset`/`sizes`, CSS `object-fit`, or template image helpers when already present.

## Handoff Requirements

Final response must state:

- What pages/sections were implemented or pruned.
- What form/document/image strategies were used.
- Desktop/tablet/mobile verification result, including viewport widths.
- Any remaining client-supplied content or assets needed.
