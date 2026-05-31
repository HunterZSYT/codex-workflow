# Knowledge Blob: Visual Media System

Blob ID: visual-media-system

Owner system: agentic-frontend

Owner skill: frontend-tool-orchestrator

Capability: Route and evaluate image, icon, video, illustration, aspect ratio, object-fit, art direction, and alt text decisions.

Trigger phrases:
- image ratio
- aspect ratio
- object-fit
- icon sizing
- responsive image
- visual media
- hero image
- product image
- illustration
- video
- alt text

When to use:
- Use when a frontend task changes or critiques images, icons, media cards, galleries, hero visuals, videos, or illustration systems.

When not to use:
- Do not use for purely typographic or copy-only tasks.

External libraries/tools:
- None required.

Required docs source:
- MDN aspect ratio guide: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_sizing/Aspect_ratios
- MDN object-fit: https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
- web.dev HTML images: https://web.dev/learn/html/images
- web.dev browser-level lazy loading: https://web.dev/articles/browser-level-image-lazy-loading
- Last verified: 2026-06-01

Best-practice rules:
- Media should reveal actual product/place/object/state/person when inspection matters.
- Define aspect-ratio or dimensions to prevent layout shift.
- Use `object-fit: cover` only when cropping is acceptable; use `contain` when full content matters.
- Icons should be optically consistent and sized by component role.
- Avoid stretched, accidental, overly cropped, or purely atmospheric media when the user needs to inspect the subject.
- Alt text should match the image purpose and context.

Implementation pattern:
- Identify media role: content, proof, decoration, avatar, product, illustration, icon.
- Choose aspect ratio and crop behavior by role.
- Reserve dimensions.
- Use responsive source handling when project tooling supports it.
- Verify actual rendered crop at relevant breakpoints.

Anti-patterns:
- Unconstrained images causing CLS.
- Decorative stock-style images as primary proof.
- Icon sizes that shift button height.
- Background image used where semantic image/alt is needed.
- Cropping product/person content unintentionally.

Verification method:
- Render inspect desktop/mobile crops and aspect ratios.
- Check alt text/semantics where image conveys content.
- Use performance checks when media weight or LCP is in scope.

Generated/local artifacts:
- None

Safe to sync to codex-workflow:
yes

