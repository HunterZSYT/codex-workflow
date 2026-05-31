# Specs

## UI Scope Ladder

1. Token
   - Color, spacing, radius, shadow, typography, motion duration.
2. Element
   - Button text, icon, input, label, image, badge.
3. Primitive Component
   - Button, input, card, modal, tab, accordion, navbar item.
4. Component Group
   - Form group, card grid, nav group, pricing group, product gallery.
5. Section
   - Hero, feature section, testimonial, pricing, FAQ, contact, product section.
6. Page
   - Landing page, product page, dashboard page, checkout page, article page.
7. Template
   - Reusable page structure across multiple pages.
8. Site/System
   - Global navigation, theme tokens, content rhythm, layout language, design consistency.

## Frontend Layers

1. Layout Structure
2. Spacing Rhythm
3. Typography System
4. Color & Contrast System
5. Component Primitive System
6. Interaction Feedback
7. Motion System
8. Responsive Structure
9. Accessibility & Semantics
10. Content & Information Architecture
11. Visual Media System
12. Form & Input System
13. State System
14. Navigation System
15. Performance System
16. Verification System

## Routing Formula

For frontend tasks, identify:

```text
Layer + Scope + Owner + Local/Systemic + Verification
```

Examples:

- Fix button hover:
  - Layer: interaction feedback
  - Scope: element / primitive component
  - Owner: interaction-feedback-states + frontend-inspection if visual proof is needed

- Fix card grid spacing:
  - Layer: spacing + layout
  - Scope: component group / section
  - Owner: dynamic-ui-spacing-rhythm-logic + layout-composition-fundamentals

- Improve whole landing page:
  - Layers: layout, spacing, typography, color, IA, responsive, motion
  - Scope: page / site
  - Owner: Project Manager + frontend-tool-orchestrator + layer skills

- Mobile header overflow:
  - Layers: layout, responsive, navigation, verification
  - Scope: component / site navigation
  - Verification: mobile emulation and overflow measurement

