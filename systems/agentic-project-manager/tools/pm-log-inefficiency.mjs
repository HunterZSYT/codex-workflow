#!/usr/bin/env node
import { arg, append } from "./pm-lib.mjs";
await append("inefficiency-log.md", `\n---\nDate/time: ${new Date().toISOString()}\nIssue: ${arg("issue")}\nImpact: ${arg("impact")}\nCause: ${arg("cause")}\nSuggested improvement: ${arg("suggestion")}\nShould become script/tool/skill update: ${arg("update")}\nPriority: ${arg("priority")}\n`);
console.log(".ai-task/inefficiency-log.md");
