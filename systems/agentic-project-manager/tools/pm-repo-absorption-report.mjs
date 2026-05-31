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
This helper does not clone, fetch, install, inspect, or activate the source repository.`);
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
- Verdict: needs review

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

| Concept | Why useful | Local target | Copy risk | Approval needed |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## What Not To Absorb

- 

## Architecture Mapping

- Existing skill/router to update:
- Existing tool/script to update:
- Knowledge blob candidate:
- Capability pack candidate:
- MCP/config note:
- Docs update:

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
Candidate artifact:
Approval status: not approved
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
- Approval required before:
- Verification plan:
`;

await fs.writeFile(out, md, "utf8");
console.log(out);
