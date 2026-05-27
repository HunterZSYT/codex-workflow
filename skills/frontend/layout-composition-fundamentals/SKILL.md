---
name: layout-composition-fundamentals
description: "Review or improve UI layout without redesigning the page. Use when diagnosing or fixing fundamental layout problems such as alignment, grouping, container width, grid/flex structure, header composition, section composition, card grids, content width, visual balance, focal point, responsive structure, or layout polish. Preserve the existing design direction unless the user explicitly asks for a redesign; diagnose first and apply the smallest structural fix."
---

# Layout & Composition Fundamentals

## Knowledge Blobs

Before implementing or reviewing precise layout/composition decisions, consult:

- `C:\Users\acer\.codex\agentic-frontend\knowledge\layout\layout-grid-composition.blob.md`
- `C:\Users\acer\.codex\agentic-frontend\knowledge\layout\swiss-editorial-grid-layout.blob.md`
- `C:\Users\acer\.codex\agentic-frontend\knowledge\layout\premium-agency-section-rhythm.blob.md`

## Core Rule

Do not redesign first. Diagnose first.

Use this priority order:

1. Preserve the existing layout idea.
2. Identify the layout relationship that feels broken.
3. Fix the smallest structural issue.
4. Avoid moving sections, changing content order, or redesigning components unless necessary.

This skill is a layout fundamentals engine, not a creative redesign engine.

## Container Alignment

Most professional layouts need a shared container.

Default website container:

```css
.container {
  width: min(100% - 48px, 1280px);
  margin-inline: auto;
}
```

Compact content container:

```css
.container-narrow {
  width: min(100% - 40px, 1120px);
  margin-inline: auto;
}
```

Wide layout container:

```css
.container-wide {
  width: min(100% - 80px, 1440px);
  margin-inline: auto;
}
```

Mobile container:

```css
.container {
  width: min(100% - 40px, 100%);
  margin-inline: auto;
}
```

Decision rule: full-width backgrounds are allowed, but important content should usually align to the same left and right container edges.

Check:

- Does the header align with the hero?
- Does the section heading align with the card grid?
- Does the CTA belong to the same container?
- Is anything floating outside the alignment system?

If the UI feels random, check container alignment before changing the design.

## Visual Grouping

A layout is understood through groups.

```text
Group = proximity + alignment + similarity + shared region
```

Rules:

- Items that belong together should be closer.
- Items that are separate should have more distance.
- Items in the same group should share alignment.
- Cards, CTAs, headings, and forms should not float without a parent group.

Examples:

- Icon + label = one micro group.
- Heading + paragraph + CTA = one content group.
- Cards = one content grid group.
- Logo + nav + CTA = one header group.

If something feels disconnected, ask which group the element belongs to before changing the design.

## Hierarchy and Focal Point

Every section needs one main focal point.

```text
Focal Point = importance + size + contrast + position + spacing
```

Each section should have:

- One primary focus
- Supporting content
- Optional secondary action

Common focal points:

- Hero headline
- Primary CTA
- Product visual
- Form
- Main card
- Main statistic
- Section heading

Rules:

- Do not make every element equally important.
- CTA should be easy to find, but it should not fight the main heading.
- Decorative visuals should support the message, not steal attention.
- If the user does not know where to look first, hierarchy is broken.

## Flex vs Grid

Use flexbox for one-dimensional layout. Use grid for two-dimensional layout.

Flex is for:

- Navbar rows
- Button rows
- Icon + text
- Card inner layout
- Form field stacks
- Small horizontal or vertical groups

Grid is for:

- Card grids
- Page sections
- Hero text + image
- Pricing tables
- Dashboard regions
- Multi-column layouts

Decision script:

- Is the layout mainly one row or one column? Use flex.
- Does the layout need rows and columns? Use grid.
- Are items repeated evenly? Use grid.
- Are items a small group with natural size? Use flex.

Do not use random margins when `gap` inside flex/grid would create cleaner rhythm.

## Header Composition

Use a three-zone header structure:

```text
[Left: Logo/Brand] [Middle: Navigation/Search] [Right: CTA/Account/Action]
```

CSS structure:

```css
.header-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
}
```

Rules:

- Logo, nav, and CTA should sit inside the same container.
- CTA should not feel detached from the nav system.
- Nav should not be pushed using random manual margins.
- If nav becomes crowded, shorten labels, reduce gap, or collapse into mobile menu.
- Top bar and main navbar should usually share the same container width.

Smallest fixes:

- If CTA floats, put it inside the same header container.
- If nav feels unbalanced, use left/middle/right zones.
- If header feels crowded, reduce nav items or collapse earlier.

## Section Composition

Most sections follow this structure:

```text
[Section Header]
[Main Content]
[Optional CTA]
```

Section header usually contains:

- Eyebrow/label
- Heading
- Short description

Main content can be cards, a form, image + text, list, grid, testimonial, or table.

Rules:

- Section heading should introduce the content below.
- Main content should align with the section header or intentionally center under it.
- CTA should belong to the section, not float randomly.
- If the CTA appears before cards, create clear separation.
- If the CTA appears after cards, it should feel like a conclusion.

## Card Grid Structure

Use grids for repeated content.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 24px;
}
```

Common column rules:

- 2 columns: comparisons, large feature cards, split content
- 3 columns: services, features, testimonials, pricing
- 4 columns: small categories, logos, stats, compact cards
- 1 column: mobile, narrow content, reading flow

Rules:

- Equal-priority cards should have equal width.
- Cards should align from the top.
- Do not use too many columns for too little content.
- On mobile, most card grids should become one column.

## Content Width

Good layout controls text width.

Use these ranges:

- Hero text: `520px` to `680px`
- Section intro: `560px` to `760px`
- Article/content text: `640px` to `760px`
- Form width: `420px` to `640px`
- Centered text: shorter width than left-aligned text

Rules:

- Long paragraphs should not stretch across the full screen.
- Centered text should be short.
- Forms should not be unnecessarily wide.
- Dashboards can be wider, but content must stay grouped.

## Visual Balance

Visual weight comes from:

- Size
- Color strength
- Contrast
- Image weight
- Text density
- Shape complexity
- Position
- Whitespace

Rules:

- A large image needs enough text weight or whitespace to balance it.
- Dense content needs more breathing room.
- Empty space is good when it creates focus.
- Empty space is bad when it disconnects related elements.
- Strong CTA, strong image, and strong heading should not all compete equally.

If one side feels too heavy:

- Adjust column ratio.
- Reduce visual size.
- Strengthen the weaker side.
- Improve grouping before redesigning.

## Responsive Structure

Responsive layout is not shrinking. It is restructuring.

Common rules:

- Desktop: full layout with columns.
- Tablet: fewer columns and reduced gaps.
- Mobile: single-column reading order.

Responsive patterns:

- 2-column hero becomes stacked.
- 3-card grid becomes 2 columns on tablet and 1 column on mobile.
- Header becomes logo + menu button.
- Sidebar becomes drawer, tabs, or stacked menu.
- CTA remains visible or moves into a logical mobile position.

Rules:

- Do not keep desktop columns on mobile.
- Do not squeeze text.
- Do not hide the primary action.
- Preserve logical reading order.
- Stack from most important to least important.

## Output Format

When reviewing layout, respond like this unless the user asks for another format:

**A. Layout Issue Detected**
Name the exact structural issue.

**B. Why It Feels Wrong**
Explain using container, grouping, hierarchy, grid/flex, balance, or responsive logic.

**C. Fundamental Rule Applied**
Mention the rule used.

**D. Smallest Safe Fix**
Give the least destructive correction.

**E. Implementation Direction**
Give CSS/Tailwind-ready structure or values.

**F. What Not To Change**
Mention what should remain preserved.

Example tone:

```text
The issue is not that the whole section needs redesign. The button and card are separate groups, but they are visually touching. Keep the layout direction, preserve the button position, and add proper group separation before the card grid. This fixes composition without changing the design.
```

## Quality Checklist

Before finalizing layout advice, check:

- Is the existing layout direction preserved?
- Are elements inside a shared container?
- Are related elements grouped?
- Is there one clear focal point?
- Is flex used for one-dimensional layout?
- Is grid used for two-dimensional layout?
- Is the card grid structurally consistent?
- Is text width controlled?
- Is visual weight balanced?
- Does mobile layout stack logically?
- Did the fix avoid unnecessary redesign?
