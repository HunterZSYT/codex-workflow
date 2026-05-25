# Component Supply Router

Use when adding UI components, replacing static UI with a component system, choosing library vs custom code, or using shadcn/Magic/21st/component registries.

Rules:
- Reuse local components first.
- Check component map if inside project.
- Use shadcn for base primitives.
- Use Radix/shadcn for behavior-heavy components.
- Use Magic UI/Aceternity/Animate/other registries for visual polish only when suitable.
- Use 21st.dev Magic only if configured and appropriate.
- Do not custom-code common primitives if a library exists.
- Normalize external components into project color/spacing/typography/layout.

Decision:
- Primitive: shadcn/Radix.
- Marketing visual block: Magic UI / registry / custom section.
- Creative variations: 21st.dev if available.
- Existing system: reuse local/Storybook first.
- Unique brand section: custom composition.
