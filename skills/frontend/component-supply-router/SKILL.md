---
name: component-supply-router
description: Use when adding UI components, replacing static UI with a component system, choosing library versus custom code, or using shadcn, Magic UI, 21st.dev, Storybook, or component registries. Reuses local components first and normalizes external components into the project system.
---

# Component Supply Router

Before implementing shadcn/Radix primitives or repeated component wrappers, consult:
- `C:\Users\acer\.codex\agentic-frontend\knowledge\components\shadcn-no-manual-primitives.blob.md`
- `C:\Users\acer\.codex\agentic-frontend\knowledge\components\brand-wrapper-composition.blob.md`

Reuse local components first. Check the component map inside projects. Use shadcn/Radix for primitives and behavior-heavy components. Before shadcn/Radix implementation, consult `C:\Users\acer\.codex\agentic-frontend\knowledge\components\shadcn-no-manual-primitives.blob.md`. If the project lacks `components.json` or the blob is missing/stale, route through Project Manager Capability Orchestration Radar before install/scaffold recommendations. Use Magic UI, Aceternity, Animate, or other registries for visual polish only when suitable. Use 21st.dev Magic only if configured and appropriate. Do not custom-code common primitives if a library exists.

Decision: primitive -> shadcn/Radix; marketing visual block -> registry/custom section; creative variations -> 21st.dev if available; existing system -> local/Storybook first; unique brand section -> custom composition.
