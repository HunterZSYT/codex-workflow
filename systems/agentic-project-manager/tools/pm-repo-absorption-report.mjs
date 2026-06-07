#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { arg, ensureAiTask, redact, slug } from "./pm-lib.mjs";

const repo = redact(arg("repo", ""));
const id = slug(arg("id", repo || "repo-absorption"));
const target = redact(arg("target", ""));

if (!repo || process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`Usage:
node pm-repo-absorption-report.mjs --repo "https://github.com/owner/repo" --id "project_manager.example" [--target "agentic-project-manager"]

Creates a task-local repo absorption report skeleton under .ai-task/.
This helper does not clone, fetch, install, inspect, or execute the source repository. Safe knowledge still requires AI audit before activation.`);
  process.exit(repo ? 0 : 2);
}

const dir = await ensureAiTask();
const out = path.join(dir, `repo-absorption-${id}.md`);
const now = new Date().toISOString();

const md = `# Repo Absorption Report

## Summary

- Source repo: ${repo}
- User goal:
- Date: ${now}
- Target Codex system: ${target || "TBD"}
- Target namespace/capability: ${id}
- Verdict: needs_ai_audit

## Local Retrieval First

- Existing knowledge searched:
- Matching active assets:
- Matching candidate assets:
- Duplicate risk:

## Source Review

- Official repository: ${repo}
- Official docs:
- License:
- Maintenance/activity:
- Runtime/install requirements:
- Security/auth/secrets concerns:
- Generated artifacts/caches:

## Useful Concepts

| Concept | Why useful | Local target | Copy risk | AI audit decision | Approval needed |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## What Not To Absorb

- 

## Architecture Mapping

- Existing skill/router to update:
- Existing tool/script to update:
- Knowledge blob:
- Capability pack:
- MCP/config note:
- Docs update:

## AI Audit

- Source confidence:
- License boundary:
- Copied-content risk:
- Specs/artifacts/verification:
- Registry/routing fit:
- Safety boundary:
- Decision: auto_activate | auto_enrich_active | keep_candidate_due_to_weak_sources | keep_candidate_due_to_risk | require_user_approval_for_install_or_execution | reject_or_restrict

## Source Absorption Ledger

Date/time: ${now}
Task:
Source URL: ${repo}
Source type:
License:
Reviewed files/docs:
Useful ideas:
Rejected ideas:
Local architecture target:
Candidate or active artifact:
Approval status:
Attribution required:
Generated/local-only artifacts:
Safety notes:
Verification:

## Safety And Sync

- License-safe reuse:
- Attribution needed:
- Local-only generated artifacts:
- Gitignore updates needed:
- Secrets/redaction concerns:

## Recommended Next Action

- Recommendation:
- Auto-activated:
- Kept candidate:
- Rejected/restricted:
- Approval required before:
- Verification plan:
`;

await fs.writeFile(out, md, "utf8");
console.log(out);
