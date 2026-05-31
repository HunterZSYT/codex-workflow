# Decisions

## Placement

- Owner system: `agentic-frontend`
- Owner skill: `layout-composition-fundamentals`
- Related blobs:
  - `frontend.layout.layout-grid-composition`
  - `frontend.layout.premium-agency-section-rhythm`

## Activation Decision

Keep this pack candidate. The user explicitly requested enrichment without activation.

## Design Decision

Use Swiss/editorial grid logic as a composition system, not a visual theme. The useful reusable behavior is:

- modular alignment
- asymmetrical balance
- typography-first hierarchy
- restrained color/decoration
- content-bearing imagery
- clear source order
- responsive grid collapse

## Implementation Decision

Use CSS Grid for outer page/section layout because the web implementation needs two-dimensional column/row placement. Use flex only for internal one-dimensional groups such as metadata rows, icon/label pairs, and button rows.

## Safety Decision

Do not copy poster layouts, museum images, historic graphic works, or exact source compositions. Use source-backed principles and create original web compositions.

## Verification Decision

A layout only passes this pack if rendered inspection confirms:

- consistent grid/container alignment
- hierarchy visible before decoration
- DOM/source order remains logical
- mobile layout stacks intentionally
- typography and spacing remain readable
- the layout does not become a generic card grid or a fake poster collage

TODO: define when to use, when not to use, variants, style fit, and domain fit.
