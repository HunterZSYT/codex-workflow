# Skill Knowledge Audit

Date: 2026-05-28

Scope:
- `C:\Users\acer\.codex\skills`: 46 global skills audited.
- `C:\Users\acer\.codex\agentic-frontend\skill-prompts`: 9 prompt mirrors audited.
- `C:\Users\acer\.codex\agentic-backend-database\skill-prompts`: 12 prompt mirrors audited.
- `C:\Users\acer\.codex\agentic-project-manager\skill-prompts`: 7 prompt mirrors audited.

Audit rule: keep skills as routers, decision owners, and safety gates. Extract only precise formulas, implementation patterns, reusable best-practice checklists, and verification formulas into knowledge blobs.

| Skill | Content type | Candidate blob | Owner skill | Confidence | Action | Notes |
|---|---|---|---|---|---|---|
| accessibility-gate | Safety/verification policy | accessibility-component-checklist | accessibility-gate | Medium | Candidate later | Keep gate behavior in skill; extract only repeatable ARIA/focus checklist after review. |
| api-contract-orchestrator | API routing/safety pattern | php-form-email-handler | api-contract-orchestrator | Duplicate | Keep existing candidate | Backend candidate exists; docs refresh needed before activation. |
| backend-database-project-scan | Router/tool selection | none | backend-database-project-scan | Low | Keep in skill | Broad discovery workflow, not a blob. |
| backend-database-tool-orchestrator | Router/tool selection | backend-tool-routing-policy | backend-database-tool-orchestrator | Low | Keep in skill | Decision owner for backend tools. |
| backend-observability-debugging | Debug workflow | log-triage-pattern | backend-observability-debugging | Medium | Candidate later | Useful but broad; needs incident examples before extraction. |
| backend-performance-triage | Performance workflow | backend-performance-triage-checklist | backend-performance-triage | Medium | Candidate later | Keep as router until repeated formulas are clearer. |
| backend-refactor-safety | Safety policy | backend-refactor-contract-safety | backend-refactor-safety | Medium | Candidate later | Extract only if repeated backend refactor work appears. |
| codebase-knowledge-graph-recon | Tool selection rule | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | Existing blob owns CodeGraph/Understand routing. |
| codebase-recon-orchestrator | Router/tool selection | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | Keep recon decision logic in skill. |
| component-supply-router | Component selection/routing | brand-wrapper-composition | component-supply-router | High | Extracted active | shadcn primitive blob already existed; wrapper pattern extracted. |
| copywriting | Writing workflow | copy-tone-checklist | copywriting | Low | Keep in skill | Current content is broad and subjective. |
| database-safety-orchestrator | Safety policy | sql-safety-patterns | sql-operations-gate | Duplicate | Keep existing candidate | DB safety should remain gated; SQL blob needs docs/project validation. |
| deployment-readiness-gate | Safety checklist | deployment-readiness-checklist | deployment-readiness-gate | Medium | Candidate later | Broad deployment safety; no extraction this pass. |
| design-source-grounding | Source grounding workflow | design-source-proof-policy | design-source-grounding | Medium | Candidate later | Keep routing in skill; possible proof checklist later. |
| dynamic-ui-color-contrast-logic | Precise formula/checklist | contrast-ratio-formula | dynamic-ui-color-contrast-logic | High | Extracted active | WCAG-style contrast formula and targets extracted. |
| dynamic-ui-color-contrast-logic | Precise decision pattern | brand-safe-neutral-fallback | dynamic-ui-color-contrast-logic | High | Extracted active | Brand-preserving neutral fallback logic extracted. |
| dynamic-ui-spacing-rhythm-logic | Precise formula/checklist | spacing-rhythm-scale | dynamic-ui-spacing-rhythm-logic | High | Extracted active | 8px spacing rhythm extracted. |
| dynamic-ui-spacing-rhythm-logic | Precise formula/checklist | proximity-grouping-spacing | dynamic-ui-spacing-rhythm-logic | High | Extracted active | Relationship spacing extracted. |
| dynamic-ui-spacing-rhythm-logic | Precise formula/checklist | responsive-section-spacing | dynamic-ui-spacing-rhythm-logic | High | Extracted active | Desktop/tablet/mobile spacing ratio extracted. |
| dynamic-ui-typography-logic | Precise formula/checklist | type-scale-hierarchy | dynamic-ui-typography-logic | High | Extracted active | Type scale and hierarchy formula extracted. |
| dynamic-ui-typography-logic | Precise formula/checklist | readability-line-length | dynamic-ui-typography-logic | High | Extracted active | Line length and line-height rules extracted. |
| frontend-design | Art-direction workflow | premium-agency-section-rhythm | layout-composition-fundamentals | Medium | Candidate created | Useful but depends on project/design reference. |
| frontend-inspection-discipline | Verification policy/formula | mobile-emulation-proof | frontend-inspection-discipline | High | Extracted active | Mobile proof rule extracted. |
| frontend-inspection-discipline | Verification policy/formula | screenshot-vs-dom-measurement | verification-gate-controller | High | Extracted active | Verification selection formula extracted. |
| frontend-tool-orchestrator | Tool routing | visual-proof-policy | frontend-inspection-discipline | Duplicate | Keep existing blob | Keep tool selection in skill. |
| inefficiency-and-improvement-reviewer | Improvement policy | micro-update-policy | inefficiency-and-improvement-reviewer | Duplicate | Keep existing blob | Existing PM blob covers repeated precision failures. |
| layout-composition-fundamentals | Precise formula/pattern | layout-grid-composition | layout-composition-fundamentals | High | Extracted active | Container/grouping/grid/flex pattern extracted. |
| layout-composition-fundamentals | Implementation pattern | swiss-editorial-grid-layout | layout-composition-fundamentals | Medium | Candidate created | Candidate until backed by concrete design references. |
| library-first-ui-builder | Router/tool selection | shadcn-no-manual-primitives | component-supply-router | Duplicate | Keep existing blob | Keep library-first routing in skill. |
| migration-backup-restore-gate | Safety policy | migration-backup-restore-pattern | migration-backup-restore-gate | Medium | Candidate later | High-risk workflow; needs careful source review. |
| motion-quality-router | External implementation pattern | gsap-react-scrolltrigger | motion-quality-router | Duplicate | Keep existing active | Already active from current docs. |
| motion-quality-router | External implementation pattern | lenis-scroll-sync | motion-quality-router | Duplicate | Keep existing active | Already active from current docs. |
| motion-quality-router | Verification/safety policy | reduced-motion-policy | motion-quality-router | High | Extracted active | Reduced-motion gate extracted. |
| motion-quality-router | Implementation pattern | scroll-scene-composition | motion-quality-router | High | Extracted active | Generic scroll scene composition extracted; external API use still needs docs. |
| performance-triage | Performance workflow | frontend-performance-triage-pattern | performance-triage | Medium | Candidate later | Keep broad triage in skill. |
| project-manager-execution-ledger | Orchestration/routing policy | new-skill-vs-blob-policy | project-manager-execution-ledger | High | Extracted active | New skill vs blob decision order extracted. |
| project-setup-capability-scan | Router/tool selection | project-capability-scan-policy | project-setup-capability-scan | Low | Keep in skill | Broad setup scan, not a precise blob. |
| security-env-secrets-gate | Safety policy | secret-redaction-policy | security-env-secrets-gate | Medium | Candidate later | Keep as safety gate; extract only durable redaction formula later. |
| seo-audit | Audit checklist | seo-audit-checklist | seo-audit | Medium | Candidate later | Needs current search/SEO guidance before activation. |
| sql-operations-gate | Safety formula | sql-safety-patterns | sql-operations-gate | Duplicate | Keep existing candidate | Candidate remains until docs/local DB rules are reviewed. |
| static-template-client-sites | Implementation workflow | static-template-conversion-pattern | static-template-client-sites | Medium | Candidate later | Could become blob after another template conversion. |
| task-bundling-controller | Decision policy | task-bundling-policy | task-bundling-controller | Low | Keep in skill | Decision owner, not formula-heavy. |
| task-roadmap-orchestrator | Planning workflow | roadmap-packet-pattern | task-roadmap-orchestrator | Low | Keep in skill | Broad planning behavior belongs in skill. |
| task-routing-and-skill-selection | Router policy | trigger-policy | task-routing-and-skill-selection | Duplicate | Keep existing blob | Existing PM trigger/routing blobs cover capability lookup. |
| understand | External tool workflow | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | Tool-specific live behavior should remain docs/tool governed. |
| understand-chat | External tool workflow | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | No new blob. |
| understand-dashboard | External tool workflow | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | No new blob. |
| understand-diff | External tool workflow | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | No new blob. |
| understand-domain | External tool workflow | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | No new blob. |
| understand-explain | External tool workflow | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | No new blob. |
| understand-knowledge | External tool workflow | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | No new blob. |
| understand-onboard | External tool workflow | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Keep existing blob | No new blob. |
| verification-gate-controller | Verification policy/formula | screenshot-vs-dom-measurement | verification-gate-controller | High | Extracted active | Keep gate in skill; formula moved to blob. |
| vps-ssh-operations-gate | Safety policy | nginx-edit-safety | vps-ssh-operations-gate | Duplicate | Keep existing candidate | Candidate remains until official/current VPS docs are checked. |
| web-design-guidelines | Review checklist | web-design-guidelines-checklist | web-design-guidelines | Medium | Candidate later | Broad design review, not extracted this pass. |
| agentic-frontend skill-prompts/accessibility-gate | Prompt mirror | accessibility-component-checklist | accessibility-gate | Medium | Mirror audited | No extraction this pass. |
| agentic-frontend skill-prompts/codebase-recon-orchestrator | Prompt mirror | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Mirror audited | Existing routing blob applies. |
| agentic-frontend skill-prompts/component-supply-router | Prompt mirror | shadcn-no-manual-primitives, brand-wrapper-composition | component-supply-router | High | Updated pointer | Prompt now references wrapper blob. |
| agentic-frontend skill-prompts/design-source-grounding | Prompt mirror | design-source-proof-policy | design-source-grounding | Medium | Mirror audited | Candidate later. |
| agentic-frontend skill-prompts/frontend-tool-orchestrator | Prompt mirror | visual-proof-policy | frontend-inspection-discipline | Duplicate | Mirror audited | Existing proof blob applies. |
| agentic-frontend skill-prompts/library-first-ui-builder | Prompt mirror | shadcn-no-manual-primitives | component-supply-router | Duplicate | Mirror audited | Existing component blob applies. |
| agentic-frontend skill-prompts/motion-quality-router | Prompt mirror | reduced-motion-policy, scroll-scene-composition | motion-quality-router | High | Updated pointer | Prompt now references new motion blobs. |
| agentic-frontend skill-prompts/performance-triage | Prompt mirror | frontend-performance-triage-pattern | performance-triage | Medium | Mirror audited | Candidate later. |
| agentic-frontend skill-prompts/project-setup-capability-scan | Prompt mirror | project-capability-scan-policy | project-setup-capability-scan | Low | Mirror audited | Keep in skill. |
| agentic-backend-database skill-prompts/api-contract-orchestrator | Prompt mirror | php-form-email-handler | api-contract-orchestrator | Duplicate | Mirror audited | Existing backend candidate applies. |
| agentic-backend-database skill-prompts/backend-database-project-scan | Prompt mirror | none | backend-database-project-scan | Low | Mirror audited | Keep in skill. |
| agentic-backend-database skill-prompts/backend-database-tool-orchestrator | Prompt mirror | backend-tool-routing-policy | backend-database-tool-orchestrator | Low | Mirror audited | Keep in skill. |
| agentic-backend-database skill-prompts/backend-observability-debugging | Prompt mirror | log-triage-pattern | backend-observability-debugging | Medium | Mirror audited | Candidate later. |
| agentic-backend-database skill-prompts/backend-performance-triage | Prompt mirror | backend-performance-triage-checklist | backend-performance-triage | Medium | Mirror audited | Candidate later. |
| agentic-backend-database skill-prompts/backend-refactor-safety | Prompt mirror | backend-refactor-contract-safety | backend-refactor-safety | Medium | Mirror audited | Candidate later. |
| agentic-backend-database skill-prompts/database-safety-orchestrator | Prompt mirror | sql-safety-patterns | sql-operations-gate | Duplicate | Mirror audited | Existing candidate applies. |
| agentic-backend-database skill-prompts/deployment-readiness-gate | Prompt mirror | deployment-readiness-checklist | deployment-readiness-gate | Medium | Mirror audited | Candidate later. |
| agentic-backend-database skill-prompts/migration-backup-restore-gate | Prompt mirror | migration-backup-restore-pattern | migration-backup-restore-gate | Medium | Mirror audited | Candidate later. |
| agentic-backend-database skill-prompts/security-env-secrets-gate | Prompt mirror | secret-redaction-policy | security-env-secrets-gate | Medium | Mirror audited | Candidate later. |
| agentic-backend-database skill-prompts/sql-operations-gate | Prompt mirror | sql-safety-patterns | sql-operations-gate | Duplicate | Mirror audited | Existing candidate applies. |
| agentic-backend-database skill-prompts/vps-ssh-operations-gate | Prompt mirror | nginx-edit-safety | vps-ssh-operations-gate | Duplicate | Mirror audited | Existing candidate applies. |
| agentic-project-manager skill-prompts/codebase-knowledge-graph-recon | Prompt mirror | codebase-intelligence-routing | task-routing-and-skill-selection | Duplicate | Mirror audited | Existing blob applies. |
| agentic-project-manager skill-prompts/inefficiency-and-improvement-reviewer | Prompt mirror | micro-update-policy | inefficiency-and-improvement-reviewer | Duplicate | Mirror audited | Existing blob applies. |
| agentic-project-manager skill-prompts/project-manager-execution-ledger | Prompt mirror | new-skill-vs-blob-policy | project-manager-execution-ledger | High | Updated pointer | Prompt now references new policy. |
| agentic-project-manager skill-prompts/task-bundling-controller | Prompt mirror | task-bundling-policy | task-bundling-controller | Low | Mirror audited | Keep in skill. |
| agentic-project-manager skill-prompts/task-roadmap-orchestrator | Prompt mirror | roadmap-packet-pattern | task-roadmap-orchestrator | Low | Mirror audited | Keep in skill. |
| agentic-project-manager skill-prompts/task-routing-and-skill-selection | Prompt mirror | trigger-policy | task-routing-and-skill-selection | Duplicate | Mirror audited | Existing blob applies. |
| agentic-project-manager skill-prompts/verification-gate-controller | Prompt mirror | screenshot-vs-dom-measurement | verification-gate-controller | High | Updated pointer | Prompt now references verification blobs. |

Extraction summary:
- Extracted active blobs only where the source rule was precise, repeatable, and already encoded in skills or current verified blobs.
- Created candidate blobs for Swiss/editorial and premium agency rhythm because they are useful but project/reference dependent.
- Backend candidate blobs remained candidate because this pass did not refresh PHPMailer, SQL engine, or Nginx docs.
