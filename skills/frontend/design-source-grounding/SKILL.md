---
name: design-source-grounding
description: Use when the user provides a Figma link, design screenshot/reference, asks to implement frontend from design, or wants exact design-to-code grounding. Uses Figma/source context where available, extracts design tokens and components, maps them to existing code, preserves design direction, and plans before coding.
---

# Design Source Grounding

Use Figma MCP when available. Do not guess tokens if Figma source exists. Extract colors, typography, spacing, radius, shadows, constraints, components, and variants. Map Figma components to existing code components. Preserve design direction and only custom-code missing parts.

Workflow: confirm design source, fetch Figma context if possible, extract tokens/components, summarize layout hierarchy, map to code components, create an implementation plan, then code.
