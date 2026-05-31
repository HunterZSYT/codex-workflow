# Frontend Layer Routing Matrix

| Layer | Scope impact | Owner skill | Supporting knowledge | Verification |
| --- | --- | --- | --- | --- |
| Layout Structure | component group, section, page, template | `layout-composition-fundamentals` | `frontend.layout.layout-grid-composition`, `frontend.layout.swiss-editorial-grid` | Rendered layout proof when visual claim; mobile check when responsive |
| Spacing Rhythm | token through site | `dynamic-ui-spacing-rhythm-logic` | spacing blobs | DOM/CSS measurement for exact overflow/alignment; screenshot for visual rhythm |
| Typography System | token through page | `dynamic-ui-typography-logic` | typography blobs | Rendered proof for hierarchy/readability; mobile wrap check |
| Color & Contrast | token through site | `dynamic-ui-color-contrast-logic` | color blobs | Contrast check when important/uncertain; inspect states |
| Component Primitive System | primitive, group, page | `component-supply-router`, `library-first-ui-builder` | shadcn/Radix blobs, brand wrapper blob | Render component behavior and states; tests/build when code changes |
| Interaction Feedback | element, primitive, nav, form | `frontend-tool-orchestrator` | `frontend.interaction.interaction-feedback-states` | Hover/focus/active/disabled/loading proof when changed |
| Motion System | element through page | `motion-quality-router` | motion blobs and packs | Render motion where possible; reduced-motion check |
| Responsive Structure | group through site | `frontend-tool-orchestrator` | `frontend.responsive.responsive-structure-adaptation`, inspection blobs | Mobile emulation required for mobile claims |
| Accessibility & Semantics | element through site | `accessibility-gate` | forms/nav/interaction blobs | Keyboard/focus/labels/axe where useful |
| Content & IA | section through site | Project Manager + copy/layout skills | copywriting, layout, page rhythm | Content order/CTA scan; no screenshot unless visual risk |
| Visual Media System | element through page | `frontend-tool-orchestrator` | `frontend.media.visual-media-system` | Render crop/aspect check; performance if media weight matters |
| Form & Input System | element through page | `accessibility-gate` | `frontend.forms.form-input-system`, spacing/type blobs | Label/focus/validation/submit state checks |
| State System | primitive through page | `frontend-tool-orchestrator` | `frontend.state.frontend-state-system` | Render touched state or inspect state paths |
| Navigation System | primitive through site | `frontend-tool-orchestrator` | `frontend.navigation.navigation-system` | Mobile/sticky/overflow/focus proof as relevant |
| Performance System | page/site | `performance-triage` | media/performance scripts | Lighthouse/performance only when in scope |
| Verification System | all scopes | `frontend-inspection-discipline` | visual/mobile/DOM verification blobs | Smallest evidence needed; no broad QA for narrow task |

