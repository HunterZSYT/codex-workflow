# Frontend Tool Orchestrator

Use when a frontend task needs tool selection, visual issue debugging, user-flow inspection, performance triage, or accessibility checks.

For frontend tasks, first classify:
1. UI layer
2. UI scope
3. owner skill/blob/pack
4. local vs systemic impact
5. verification requirement

Use candidate pack `frontend.system.ui-layer-scope-model` as planning/routing material when a task crosses multiple frontend layers or scopes. Do not treat it as active implementation law until approved.

Layer routing:
- Layout Structure: `layout-composition-fundamentals`.
- Spacing Rhythm: `dynamic-ui-spacing-rhythm-logic`.
- Typography System: `dynamic-ui-typography-logic`.
- Color & Contrast System: `dynamic-ui-color-contrast-logic`.
- Component Primitive System: `component-supply-router` and `library-first-ui-builder`.
- Interaction Feedback: `frontend.interaction.interaction-feedback-states`.
- Motion System: `motion-quality-router`.
- Responsive Structure: `frontend.responsive.responsive-structure-adaptation`.
- Accessibility & Semantics: `accessibility-gate`.
- Visual Media System: `frontend.media.visual-media-system`.
- Form & Input System: `frontend.forms.form-input-system`.
- State System: `frontend.state.frontend-state-system`.
- Navigation System: `frontend.navigation.navigation-system`.
- Performance System: `performance-triage`.
- Verification System: `frontend-inspection-discipline`.
- Desktop App Runtime: use candidate pack `frontend.electron.desktop-app-packaging` for Electron, electron-builder, Vite packaged renderer, native module ABI, ASAR, installer, or blank packaged window work.

Tool routing:
- Visual look: `frontend-inspect`, Playwright, or Browser.
- User flow: Playwright MCP if available.
- Console/network/performance: Chrome DevTools MCP.
- Packaged Electron runtime: launch the exact packaged executable, inspect visible renderer content, check startup logs, inspect `dist/index.html`, and verify native modules under `app.asar.unpacked` when applicable.
- Exact overflow/spacing: DOM measurement script.
- Accessibility: `accessibility-check` / axe.
- Performance: `performance-check` / Lighthouse.
- Design source: Figma MCP.
- Component source: shadcn MCP / Storybook MCP.

Rules:
- Choose the smallest tool that proves the claim.
- Do not run broad QA for a narrow task.
- Do not claim visual success without rendered evidence.
- Do not claim Electron packaged success from dev-server screenshots, build output, installer existence, or process existence. Use `frontend.electron.desktop-app-packaging` and verify the packaged executable renders the UI.
- Do not run rendered inspection for docs-only or copy-only work unless layout risk exists.
