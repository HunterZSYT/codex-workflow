# Design Source Grounding

Use when the user provides a Figma link, design screenshot/reference, asks to implement frontend from design, or wants exact design-to-code grounding.

Rules:
- Use Figma MCP when available.
- Do not guess tokens if Figma source exists.
- Extract colors, typography, spacing, radius, shadows, constraints, components, and variants.
- Map Figma components to existing code components.
- Preserve design direction.
- Only custom-code missing parts.
- Pair with Color, Spacing, Typography, Layout, and Inspection skills.

Workflow:
1. Confirm design source.
2. Fetch Figma context if possible.
3. Extract tokens/components.
4. Summarize layout hierarchy.
5. Map to code components.
6. Create implementation plan.
7. Only then code.
