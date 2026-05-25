#!/usr/bin/env node
import { arg, append } from "./pm-lib.mjs";
await append("execution-ledger.md", `\n---\nDate/time: ${new Date().toISOString()}\nTask packet: ${arg("packet")}\nFiles inspected: ${arg("inspected")}\nFiles changed: ${arg("files")}\nCommands run: ${arg("commands")}\nChange summary: ${arg("summary")}\nReason: ${arg("reason")}\nResult: ${arg("result")}\nNext step: ${arg("next")}\n`);
console.log(".ai-task/execution-ledger.md");
