#!/usr/bin/env node
import { arg, append } from "./pm-lib.mjs";
await append("tool-skill-usage.md", `\n---\nDate/time: ${new Date().toISOString()}\nTask packet: ${arg("packet")}\nSkills used: ${arg("skills")}\nTools used: ${arg("tools")}\nCommands/scripts used: ${arg("commands")}\nWhy selected: ${arg("why")}\nEffectiveness: ${arg("effectiveness")}\nBetter tool/skill needed: ${arg("better")}\n`);
console.log(".ai-task/tool-skill-usage.md");
