# Block vs Classic Theme Decision Tree

Choose a block theme when:
- editor-first site building matters;
- `theme.json`, patterns, template parts, and style variations should carry the design system;
- users need controlled design customization in the Site Editor.

Choose a classic theme when:
- legacy template hierarchy or PHP template control dominates;
- the site depends on classic theme/plugin assumptions;
- the team explicitly wants PHP template files over block templates.

Pilot Sage when:
- a modern build pipeline, Blade, Tailwind, Vite, Composer, and Acorn are acceptable;
- the team can maintain the extra framework layer.

Treat _s/Underscores as:
- reference-only for classic theme anatomy;
- not a primary starter for new builds unless explicitly justified.
