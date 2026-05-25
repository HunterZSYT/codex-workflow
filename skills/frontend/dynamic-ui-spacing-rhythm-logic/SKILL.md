---
name: dynamic-ui-spacing-rhythm-logic
description: "Make strong UI spacing decisions using layout rhythm, grouping logic, padding/margin/gap rules, container alignment, and responsive spacing systems. Use when designing, reviewing, or fixing UI spacing, layout rhythm, section padding, card grids, navbar/header spacing, hero spacing, form spacing, dashboard density, modal spacing, container alignment, Tailwind/CSS spacing tokens, or responsive spacing issues. Behaves like a senior UI designer; do not measure every space mechanically, but recognize broken spacing relationships and apply the smallest correct spacing fix."
---

# Dynamic UI Spacing Rhythm Logic

## Core Principle

Spacing is not decoration. Spacing communicates structure.

Correct spacing tells the user:

- Which items belong together
- Which items are separate
- Which element matters most
- Where the eye should move next
- Whether the interface feels intentional
- Whether the layout is reusable and responsive

Do not behave like a pixel calculator. Use spacing systems as a foundation, then reason dynamically from layout purpose, grouping, hierarchy, and responsiveness.

## Review Workflow

1. Identify the UI type:
   - Top bar
   - Navbar/header
   - Hero section
   - Feature section
   - Card grid
   - Testimonial section
   - Pricing section
   - Form section
   - Dashboard
   - Sidebar layout
   - Footer
   - Modal
   - Full page layout

2. Identify the purpose:
   - Navigation
   - Conversion
   - Reading
   - Form submission
   - Product browsing
   - Trust building
   - Data scanning
   - Contact/action
   - Brand storytelling

3. Diagnose relationships before changing values:
   - Are these elements tightly related, loosely related, separate groups, or separate sections?
   - Is the issue internal breathing room, child spacing, external separation, or container alignment?
   - Is the spacing problem desktop-only, mobile-only, or caused by non-responsive desktop spacing?

Spacing depends on purpose. A navbar needs compact controlled horizontal rhythm. A hero needs breathing room. A form needs predictable vertical rhythm. A dashboard needs dense but clear grouping. A landing page needs generous section rhythm.

## Default 8px Spacing Scale

Use this scale unless the project already has a clear spacing system:

```text
4px   micro adjustment
8px   tight relationship
12px  small relationship
16px  normal relationship
24px  component spacing
32px  large component spacing
48px  group separation
64px  large group separation
80px  section spacing
96px  hero/large section spacing
120px premium large spacing
160px rare oversized editorial spacing
```

Avoid random values like `17px`, `23px`, `37px`, or `53px` unless there is a specific visual reason. Exact values may vary by design system, but rhythm must stay consistent.

## Relationship-Based Spacing Logic

Ask "are these elements related or unrelated?" before asking "how much space looks good?"

- Very tightly related: use `4px` to `8px`.
  Examples: icon and label, checkbox and label, currency symbol and amount, status dot and status text.

- Closely related: use `8px` to `12px`.
  Examples: logo mark and brand name, form label and input, badge and heading, avatar and name.

- Same component: use `16px` to `32px`.
  Examples: card title and description, form fields, button group, testimonial text and author, navbar item groups.

- Different groups inside same section: use `40px` to `64px`.
  Examples: section heading block and card grid, navigation menu and CTA, hero text and hero visual, filter bar and product grid.

- Separate sections: use `80px` to `120px`.
  Examples: hero to services, services to testimonials, pricing to FAQ, content section to footer CTA.

If related items are too far apart, the UI feels disconnected. If unrelated items are too close, the UI feels crowded.

## Padding vs Margin vs Gap

Use this decision script:

- If the space is inside an element, use padding.
  Examples: button inner space, card inner space, input inner space, navbar inner height, modal inner space.

- If the space is between children in flex/grid, use gap.
  Examples: nav items, icon and text, card grid, button row, form field stack, feature list.

- If the space separates external blocks, use margin or section padding.
  Examples: heading block to next content group, section to section, form block to submit button, hero to next section.

Preferred modern CSS:

- Use `gap` for flex/grid spacing.
- Use `padding-block` for section breathing room.
- Use margin carefully for one-off outside separation.
- Avoid stacking random top/bottom margins on many children.

Do not use `<br>`, empty divs, or `&nbsp;` for visual spacing. Use CSS spacing unless the HTML element has real semantic meaning.

## Container Alignment Logic

Most professional layouts need shared container rhythm.

Default container:

```css
.container {
  width: min(100% - 48px, 1280px);
  margin-inline: auto;
}
```

Compact container:

```css
.container {
  width: min(100% - 40px, 1120px);
  margin-inline: auto;
}
```

Wide container:

```css
.container {
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

Full-width backgrounds are allowed, but inner content should usually align to a shared container. If the layout feels random, check container alignment before individual spacing.

Check:

- Does the header align with hero content?
- Does the section title align with the card grid?
- Does the CTA align with page rhythm?
- Do repeated sections share the same left/right edge?
- Is any element floating outside the system?

## Section Spacing Logic

Use section padding based on importance:

- Compact section: `padding-block: 48px` to `64px`
- Normal content section: `padding-block: 72px` to `96px`
- Large landing page section: `padding-block: 96px` to `120px`
- Hero section: `padding-block: 96px` to `160px`
- Mobile section: `padding-block: 48px` to `72px`

Do not use the same section spacing everywhere. Hero and major CTA sections can breathe more. Dense informational sections should be tighter. Mobile sections should reduce spacing.

## Header/Navbar Spacing Logic

Use a zone-based structure:

- Left: logo/brand
- Middle: navigation or search
- Right: CTA/account/contact/menu action

Recommended ranges:

- Top bar height: `32px` to `40px`
- Main navbar height: `64px` to `96px`
- Logo mark to brand name gap: `8px` to `16px`
- Nav item gap: `20px` to `32px`
- Nav group to CTA gap: `40px` to `64px`
- CTA/button padding: compact `8px 14px`, standard `10px 18px`, large `12px 22px`
- Header CTA height: minimum `44px`, comfortable `48px` to `56px`, large/premium `56px` to `64px`

Decision rules:

- If the CTA feels detached, bring it into the same container, use clear zones, and reduce excessive group distance.
- If the nav feels cramped, increase nav gap, reduce logo/CTA width if needed, or collapse into mobile menu earlier.
- If the header feels too tall, separate top bar height from navbar height, reduce CTA vertical padding, and remove unnecessary top/bottom padding.

## Hero Spacing Logic

Hero text stack:

- Eyebrow to heading: `12px` to `16px`
- Heading to paragraph: `20px` to `28px`
- Paragraph to CTA: `28px` to `40px`
- CTA row gap: `12px` to `20px`
- Hero content to visual: `56px` to `80px`
- Desktop hero: `padding-block: 96px` to `160px`
- Mobile hero: `padding-block: 56px` to `80px`

Two-column hero:

```css
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
```

If the hero feels empty, check content width, image/text balance, and container width before adding random padding. If it feels cramped, increase text stack gaps, increase section padding, or simplify visual density.

## Card and Grid Spacing Logic

Recommended ranges:

- Small card padding: `20px` to `24px`
- Normal card padding: `24px` to `32px`
- Premium card padding: `32px` to `40px`
- Card inner gap: `12px` to `20px`
- Card grid gap: `20px` to `32px`
- Section title to grid: `40px` to `64px`

Decision rules:

- If cards feel cramped: increase card padding, then inner gap, then line-height, then grid gap.
- If cards feel disconnected: reduce grid gap, align cards to container, and make card sizes consistent.
- If the first card touches the button/header above: add group separation. Use `24px` to `32px` between CTA and next card; use `40px` to `64px` between heading block and content grid.

## Form Spacing Logic

Recommended ranges:

- Form label to input: `6px` to `8px`
- Field to field: `16px` to `24px`
- Input padding: `12px 14px` or `14px 16px`
- Input height: `44px` to `52px`
- Form group to submit button: `24px` to `32px`
- Form section groups: `32px` to `48px`

Forms should feel predictable. Keep labels close to inputs, separate field groups clearly, and avoid random vertical gaps.

## Responsive Spacing Logic

Use responsive reduction:

```text
Tablet spacing = desktop spacing * 0.75
Mobile spacing = desktop spacing * 0.5 to 0.65
```

Examples:

- Desktop section padding `96px`: tablet `72px`, mobile `56px` to `64px`
- Desktop grid gap `32px`: tablet `24px`, mobile `16px` to `20px`
- Desktop container side space `80px`: tablet `48px`, mobile `20px` to `24px`

Mobile rules:

- Stack columns.
- Reduce section padding.
- Keep buttons at least `44px` high.
- Keep text readable.
- Reduce horizontal gaps.
- Do not allow content to touch screen edges.
- Avoid keeping large desktop whitespace on mobile.

## Common Spacing Problem Detection

- Randomly spread out elements: likely no shared container or zones. Fix with container alignment and grouped layout.
- Button touches next content block: missing group separation. Add `24px` to `32px` after the button.
- Heading and paragraph feel disconnected: gap too large. Use `12px` to `20px`.
- Section title and grid feel too close: group gap too small. Use `40px` to `64px`.
- Cards feel cramped: internal padding too low. Use `24px` to `32px`.
- Page feels empty: container too narrow/wide, weak grouping, or overlarge section padding. Adjust rhythm before adding content.
- Mobile layout feels awkward: desktop spacing not reduced. Apply responsive reduction.

## Feedback Output Format

When giving spacing feedback, use this structure unless the user asks for another format:

**A. Spacing Issue Detected**
Name the broken spacing relationship.

**B. Why It Feels Wrong**
Explain using grouping, rhythm, container, padding, margin, or gap logic.

**C. Formula Applied**
Mention the relevant spacing rule.

**D. Best Spacing Decision**
Give the smallest correct fix.

**E. Implementation Values**
Give CSS/Tailwind-ready spacing values.

**F. Responsive Adjustment**
Explain desktop/tablet/mobile behavior if needed.

Example tone:

```text
The issue is not that the section needs random extra space. The button and the first card are different groups, but they are visually touching. Keep the button where it is, then add a 24px to 32px gap before the first card. This follows the component-to-content separation rule.
```

## Quality Checklist

Before finalizing spacing advice, check:

- Are related items closer than unrelated items?
- Is padding used for internal space?
- Is gap used for flex/grid children?
- Is margin/section padding used for outside separation?
- Is the container consistent?
- Are section paddings intentional?
- Does the CTA connect to the layout rhythm?
- Is mobile spacing reduced properly?
- Are random pixel values avoided?
- Does spacing improve hierarchy instead of adding emptiness?
