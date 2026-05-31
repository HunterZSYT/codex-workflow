# Frontend Layer + Scope Ladder

## Scope Ladder

| Scope | Examples | System risk |
| --- | --- | --- |
| Token | color, spacing, radius, shadow, type size, duration | High when reused globally |
| Element | icon, text, label, image, badge | Low to medium |
| Primitive Component | button, input, card, modal, tab | Medium to high |
| Component Group | form group, card grid, nav group | Medium |
| Section | hero, pricing, FAQ, contact | Medium |
| Page | landing, product, dashboard, checkout | High |
| Template | reusable page structure | High |
| Site/System | global nav, theme, rhythm, design language | Highest |

## Layer Questions

For every frontend task:

1. Which layer is broken?
2. What is the smallest affected scope?
3. Does the fix need to move up a scope?
4. Which owner skill/blob/pack applies?
5. What proof is enough?

