#!/usr/bin/env node
import { arg, classifyTask } from "./pm-lib.mjs";
const task = arg("task");
if (!task) { console.error('Usage: node pm-classify-task.mjs --task "task text"'); process.exit(1); }
console.log(JSON.stringify(classifyTask(task), null, 2));
