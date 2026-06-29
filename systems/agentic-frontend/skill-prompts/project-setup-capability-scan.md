# Project Setup & Capability Scan

Use when starting work in an unknown project, preparing a project for AI workflow, checking available tools/scripts, or deciding verification method.

Rules:
- Run `project-capability-scan`.
- Run `component-map` for frontend/component work.
- Run `mcp-status-check` if tool availability matters.
- Write findings to `.ai-task` if inside a project.
- Recommend missing tools; do not install without need.
- If `package.json` or dependencies indicate Electron/electron-builder/native desktop packaging, record that the project needs `frontend.electron.desktop-app-packaging` verification: dev renderer proof, packaged executable proof, Vite file-asset check, and native module ABI check when `.node` dependencies are present.
