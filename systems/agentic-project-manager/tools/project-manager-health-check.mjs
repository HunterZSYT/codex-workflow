#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { PM_ROOT, FRONTEND_ROOT, BACKEND_ROOT, SKILLS_ROOT, exists } from "./pm-lib.mjs";
function run(cmd, args=[]) { const c = process.platform === "win32" && cmd === "npm" ? ["cmd.exe", ["/d","/s","/c", `npm ${args.join(" ")}`]] : [cmd,args]; const r=spawnSync(c[0], c[1], {encoding:"utf8"}); return (r.stdout||r.stderr||r.error?.message||"").trim(); }
const templates = ["active-roadmap-template.md","execution-ledger-template.md","verification-log-template.md","tool-skill-usage-template.md","inefficiency-log-template.md","improvement-backlog-template.md","completion-report-template.md","error-ledger-template.md","failed-commands-template.md","decision-review-template.md","user-response-ledger-template.md"];
const tools = ["project-manager-health-check.mjs","pm-init-task.mjs","pm-classify-task.mjs","pm-create-roadmap.mjs","pm-next-packet.mjs","pm-log-execution.mjs","pm-log-verification.mjs","pm-log-tool-usage.mjs","pm-log-inefficiency.mjs","pm-log-user-response.mjs","pm-log-error.mjs","pm-review-errors.mjs","pm-promote-lesson.mjs","pm-suggest-skill-update.mjs","pm-learning-report.mjs","pm-completion-report.mjs","pm-archive-task.mjs","pm-capability-sync.mjs","pm-improvement-review.mjs","pm-knowledge-lookup.mjs","pm-knowledge-register.mjs","pm-knowledge-gap.mjs","pm-knowledge-index.mjs","pm-knowledge-search.mjs","pm-knowledge-related.mjs","pm-knowledge-dedupe.mjs","pm-pack-init.mjs","pm-pack-audit.mjs","pm-pack-promote.mjs","pm-knowledge-sufficiency.mjs","pm-log-event.mjs","pm-error-to-knowledge-candidate.mjs","pm-review-user-feedback.mjs","pm-learning-search.mjs"];
const prompts = ["project-manager-execution-ledger.md","task-roadmap-orchestrator.md","task-routing-and-skill-selection.md","verification-gate-controller.md","inefficiency-and-improvement-reviewer.md","task-bundling-controller.md"];
const learning = ["error-patterns.md","routing-lessons.md","tool-failure-patterns.md","verification-mistakes.md","skill-update-candidates.md","knowledge-patch-candidates.md","tool-update-candidates.md","user-preference-candidates.md","user-feedback-patterns.md","verification-update-candidates.md","recurring-failures.jsonl","resolved-lessons.md","learning-policy.md","agent-learning-model.md","event-schema.md","learning-system-research.md"];
const knowledge = ["knowledge-registry.json","knowledge-blob-template.md","skill-knowledge-audit.md","retrieval-tool-evaluation.md","retrieval-audit.md","retrieval-policy.md","knowledge-product-policy.md","naming-ontology-policy.md","pack-builder-workflow.md","ecosystem-scout-audit.md","ecosystem-scout-policy.md","ecosystem-source-map.md","ecosystem-option-scorecard.md","ecosystem-scout-workflow.md","capability-orchestration/capability-radar-trigger-policy.blob.md","capability-orchestration/trigger-policy.blob.md","capability-orchestration/knowledge-blob-policy.blob.md","capability-orchestration/micro-update-policy.blob.md","capability-orchestration/new-skill-vs-blob-policy.blob.md","routing/codebase-intelligence-routing.blob.md"];
const packDirs = ["knowledge-packs"];
const frontendKnowledge = ["color/contrast-ratio-formula.blob.md","color/brand-safe-neutral-fallback.blob.md","spacing/spacing-rhythm-scale.blob.md","spacing/proximity-grouping-spacing.blob.md","spacing/responsive-section-spacing.blob.md","typography/type-scale-hierarchy.blob.md","typography/readability-line-length.blob.md","layout/layout-grid-composition.blob.md","layout/swiss-editorial-grid-layout.blob.md","layout/premium-agency-section-rhythm.blob.md","motion/gsap-react-scrolltrigger.blob.md","motion/lenis-scroll-sync.blob.md","motion/reduced-motion-policy.blob.md","motion/scroll-scene-composition.blob.md","components/shadcn-no-manual-primitives.blob.md","components/brand-wrapper-composition.blob.md","inspection/visual-proof-policy.blob.md","verification/mobile-emulation-proof.blob.md","verification/screenshot-vs-dom-measurement.blob.md"];
const backendKnowledge = ["api/php-form-email-handler.blob.md","database/sql-safety-patterns.blob.md","vps/nginx-edit-safety.blob.md"];
const frontTools = ["agentic-health-check.mjs","project-capability-scan.mjs","component-map.mjs","frontend-inspect.mjs","accessibility-check.mjs","performance-check.mjs"];
const backTools = ["backend-db-health-check.mjs","project-capability-scan.mjs","api-route-map.mjs","db-engine-detect.mjs","db-schema-map.mjs","sql-safety-check.mjs","vps-ssh-inspect.sh"];
const rows = async (base, names, sub="") => (await Promise.all(names.map(async n => `- ${n}: ${await exists(path.join(base, sub, n)) ? "present" : "missing"}`))).join("\n");
const md = `# Agentic Project Manager Tool Status

Generated: ${new Date().toISOString()}

## Runtime
- Node: ${run("node", ["--version"])}
- npm: ${run("npm", ["--version"])}

## Global Systems
- Project manager root: ${await exists(PM_ROOT) ? "present" : "missing"}
- Frontend system: ${await exists(FRONTEND_ROOT) ? "present" : "missing"}
- Backend/database system: ${await exists(BACKEND_ROOT) ? "present" : "missing"}
- Global skills folder: ${await exists(SKILLS_ROOT) ? "present" : "missing"}

## Templates
${await rows(path.join(PM_ROOT, "templates"), templates)}

## Tools
${await rows(path.join(PM_ROOT, "tools"), tools)}

## Skill Prompts
${await rows(path.join(PM_ROOT, "skill-prompts"), prompts)}

## Learning Layer
${await rows(path.join(PM_ROOT, "learning"), learning)}

## Knowledge Layer
${await rows(path.join(PM_ROOT, "knowledge"), knowledge)}

## Knowledge Product Pack Roots
- Project manager packs: ${await exists(path.join(PM_ROOT, "knowledge-packs")) ? "present" : "missing"}
- Frontend packs: ${await exists(path.join(FRONTEND_ROOT, "knowledge-packs")) ? "present" : "missing"}
- Backend/database packs: ${await exists(path.join(BACKEND_ROOT, "knowledge-packs")) ? "present" : "missing"}

## Frontend Knowledge Blobs
${await rows(path.join(FRONTEND_ROOT, "knowledge"), frontendKnowledge)}

## Backend Knowledge Blobs
${await rows(path.join(BACKEND_ROOT, "knowledge"), backendKnowledge)}

## Frontend Integration Tools
${await rows(path.join(FRONTEND_ROOT, "tools"), frontTools)}

## Backend Integration Tools
${await rows(path.join(BACKEND_ROOT, "tools"), backTools)}
`;
const out = path.join(PM_ROOT, "tool-status.md");
await fs.writeFile(out, md);
console.log(out);
