#!/usr/bin/env node
import { arg, ensureAiTask, copyTemplate, redact } from "./pm-lib.mjs";
import fs from "node:fs/promises";
import path from "node:path";

const dir = await ensureAiTask();
const file = path.join(dir, "user-response-ledger.md");
await copyTemplate("user-response-ledger-template.md", file);

const entry = `
---
Date/time: ${new Date().toISOString()}
Task ID: ${redact(arg("taskId", arg("task", "")))}
Related artifact: ${redact(arg("artifact", ""))}
Artifact type: ${redact(arg("artifactType", ""))}
User signal type: ${redact(arg("signal", ""))}
User feedback summary: ${redact(arg("summary", ""))}
Direct user phrase short: ${redact(arg("phrase", ""))}
Interpreted action: ${redact(arg("action", ""))}
Change made or next action: ${redact(arg("next", ""))}
Status after response: ${redact(arg("status", ""))}
Reusable preference candidate: ${redact(arg("reusable", "no"))}
Should update memory or skill: ${redact(arg("promote", "no"))}
Safety notes: ${redact(arg("safety", ""))}
Linked files changed: ${redact(arg("files", ""))}
Verification after change: ${redact(arg("verification", ""))}
`;

await fs.appendFile(file, entry);
console.log(file);
