# Verification By Layer

| Layer | Minimum proof |
| --- | --- |
| Layout | Rendered screenshot or DOM measurement if visual claim |
| Spacing | DOM/CSS measurement for exact spacing/overflow; screenshot for rhythm |
| Typography | Rendered wrap/readability check for visual claim |
| Color | Contrast check for critical/uncertain pairs |
| Components | Behavior/state check plus build/test as relevant |
| Interaction | Hover/focus/active/disabled/loading state proof |
| Motion | Render motion and reduced-motion path when changed |
| Responsive | Real mobile emulation, not resized desktop proof |
| Accessibility | Keyboard/focus/labels/semantics; axe where useful |
| Content/IA | Scan path and content-order review |
| Media | Aspect/crop/alt/performance check as relevant |
| Forms | Label/helper/error/focus/submit validation |
| State | Render or code-path verification for touched states |
| Navigation | Active/sticky/mobile/focus/overflow proof |
| Performance | Lighthouse/performance only when performance is in scope |

