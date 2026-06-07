# Multi-Repo Upgrade Map Audit: CloakBrowser, Understand Anything, Cybersecurity Skills, LiteParse, PaddleOCR

Date: 2026-06-07

## Existing Coverage

- Auto absorption and AI-audited activation policy: active.
- Repo absorption workflow: active.
- last30days current-signal layer: active.
- Headroom context layer: active and service reachable.
- Existing Understand skills and CodeGraph/codebase routing: present.
- Browser/inspection routing: present through frontend inspection and Project Manager routing.
- Security gates: present through security-env-secrets-gate, backend safety, deployment readiness, SQL/database, and VPS gates.
- Document ingestion/OCR knowledge: partial before this pass; upgraded by `project_manager.ingestion.document-parsing-stack`.

## Active Global Layers Used

- last30days: yes, for current signal only.
- Headroom: yes, for redacted large research bundle analysis.
- Official docs/repos/Context7: yes.

## Repo Audit Matrix

| Repo | Existing owner | last30days useful? | Headroom useful? | Auto-activated | Approval-gated |
| --- | --- | --- | --- | --- | --- |
| CloakBrowser | task-routing-and-skill-selection / frontend inspection | Weak | Yes | restricted-use browser safety and normal-tools-first routing | install/use/stealth/proxy/session/profile behavior |
| Understand Anything | codebase-recon-orchestrator / Understand skills / CodeGraph routing | Useful | Yes | codebase intelligence routing and graph artifact policy | install/run on real project/sync generated graphs |
| Anthropic-Cybersecurity-Skills | security-env-secrets-gate / backend safety gates | Weak/noisy | Yes | defensive-only intake filter and framework mapping | importing skills, tools, offensive procedures, private logs |
| LiteParse | task-routing-and-skill-selection / ingestion | Useful but mixed | Yes | document parsing decision rules | install/use on private docs |
| PaddleOCR | task-routing-and-skill-selection / ingestion | Useful but mixed | Yes | OCR backend selection and model/cache ignore rules | install/model download/private OCR/OCR services |

## Missing Capability Areas Found

- Browser automation needed a restricted-use safety decision tree for stealth/anti-detect tools.
- Codebase intelligence needed an active comparison of Understand Anything, CodeGraph, Understand skills, project scans, and direct reads.
- Security intake needed a defensive-only filter for external cybersecurity skill libraries.
- Document ingestion needed a MarkItDown/LiteParse/PaddleOCR/OCR decision layer and extracted-text trust boundary.

## Overlap And Duplicate Risks

- Understand Anything overlaps with existing Understand skills and CodeGraph; resolved by routing comparison instead of new skill creation.
- LiteParse and PaddleOCR overlap on OCR; resolved by treating LiteParse as local spatial parser and PaddleOCR as optional heavy OCR backend.
- Anthropic-Cybersecurity-Skills overlaps with security gates; resolved by defensive intake artifacts, not importing skills.
- CloakBrowser overlaps with Playwright/DevTools; resolved by normal-tools-first policy.

## Safety Risks

- CloakBrowser explicitly targets anti-detect, bot-detection, CAPTCHA, proxy, and persistent profile behavior.
- Understand Anything creates `.understand-anything/` graph artifacts and may clone/install or create hooks.
- Cybersecurity skills include operational/offensive domains and untrusted external procedures.
- LiteParse and PaddleOCR can process private documents and generate extracted text, screenshots, temp files, caches, and model data.
- PaddleOCR can download models and require heavy/GPU/runtime dependencies.

## Auto-Activated

- `project_manager.browser.browser-automation-safety-and-tool-selection`
- `project_manager.codebase.codebase-intelligence-tooling`
- `project_manager.security.defensive-cybersecurity-skills-intake`
- `project_manager.ingestion.document-parsing-stack`

## Approval-Gated

Installs, MCP configuration, paid/API/session/account sources, stealth browsing, proxies, source/assets copying, offensive procedures, private OCR, model downloads, generated graph sync, services/wrappers, AGENTS.md writes, and production/server/database/auth/deployment changes.
