# Task Routing and Skill Selection

Purpose: select correct specialist skills/tools.

Rules:
- Do not use all tools every time.
- Choose smallest skill/tool that proves the claim.
- Use frontend stack for frontend.
- Use backend-database stack for backend/database/VPS.
- Use design grounding for Figma/design source.
- Use component supply for UI components.
- Use safety gates for risky work.

Tool decision logic:
- Normal search/read: small tasks, known target file, one-file edit, copy/content update, simple styling fix, or direct bug with known location.
- Project capability scan: unknown project, stack detection, verification command selection, or available tools/scripts.
- Component map: frontend component changes or avoiding duplicate UI.
- API/db/schema maps: backend/API/database route, service, migration, or schema risk.
- Understand Anything: architecture explanation, onboarding, business/domain flow, large unfamiliar projects, or documentation-style understanding.
- CodeGraph: symbol search, caller/callee tracing, dependency paths, impact analysis, route/service/component relationships, "what uses this?", or "what breaks if I change this?".
- Serena: semantic symbol/class/function navigation when available and useful.
- Frontend inspect: rendered visual proof, responsive/mobile/layout, overflow, sticky, header, button, or spacing claims.
- Accessibility/performance tools: only when directly involved, or nav/forms/modals/buttons were touched for accessibility.

Escalation budget:
- Small: direct inspection only; no CodeGraph/Understand Anything unless search fails.
- Medium: capability scan first; use one intelligence tool if needed.
- Large/risky/unknown: Project Manager tracking, capability scan, best intelligence tool, and logged reason.
- Do not run multiple heavy tools unless the first fails or both high-level explanation and precise symbol tracing are needed.
