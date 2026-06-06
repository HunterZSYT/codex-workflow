#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import {
  HeadroomConnectionError,
  detectFormat,
  extractToolCalls,
  extractUserQuery,
  countTurns,
  simulate,
  compress
} from "headroom-ai";
import { arg, ensureAiTask } from "./pm-lib.mjs";

function usage() {
  console.error("Usage: pm-headroom-context.mjs --file <path> [--mode analyze|simulate|compress] [--model gpt-4o] [--token-budget 4000] [--timeout-ms 5000] [--force] [--json]");
}

function roughTokens(text) {
  return Math.ceil(String(text || "").length / 4);
}

function repeatedLineStats(text) {
  const lines = String(text || "").split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const counts = new Map();
  for (const line of lines) counts.set(line, (counts.get(line) || 0) + 1);
  const repeated = [...counts.entries()].filter(([, count]) => count > 1).sort((a, b) => b[1] - a[1]);
  return {
    lines: lines.length,
    uniqueLines: counts.size,
    repeatedLineGroups: repeated.length,
    topRepeatedLines: repeated.slice(0, 5).map(([line, count]) => ({ count, line: line.slice(0, 160) }))
  };
}

function jsonSignal(text) {
  try {
    const parsed = JSON.parse(text);
    const asString = JSON.stringify(parsed);
    return {
      valid: true,
      type: Array.isArray(parsed) ? "array" : typeof parsed,
      bytes: Buffer.byteLength(asString, "utf8"),
      likelyCompressible: Array.isArray(parsed) && parsed.length > 20
    };
  } catch {
    return { valid: false };
  }
}

function makeMessages(text) {
  return [
    {
      role: "system",
      content: "Analyze this context for compression while preserving commands, errors, file paths, hashes, and security-relevant details."
    },
    { role: "user", content: text }
  ];
}

function secretSignals(filePath, text) {
  const fileName = String(filePath || "").toLowerCase();
  const content = String(text || "");
  const matches = [];
  if (/(^|[\\/])\.env(\.|$)|secret|credential|private[-_]?key|id_rsa|token|password|passwd|cookie|auth\.json|config\.toml/i.test(fileName)) {
    matches.push("secret-looking file path");
  }
  const patterns = [
    [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "private key block"],
    [/\b(Bearer|Basic)\s+[A-Za-z0-9._~+/=-]+/i, "authorization header"],
    [/\b(?:api[_-]?key|token|secret|password|passwd|pwd)\s*[:=]\s*["']?[^"'\s]+/i, "secret-like assignment"],
    [/\b(?:postgres|postgresql|mysql|mariadb|mongodb|redis):\/\/[^\s"'`]+/i, "database URL"],
    [/\b[A-Za-z0-9+/]{40,}={0,2}\b/, "long opaque value"]
  ];
  for (const [rx, label] of patterns) {
    if (rx.test(content)) matches.push(label);
  }
  return [...new Set(matches)];
}

async function writeArtifact(payload) {
  const dir = await ensureAiTask();
  const out = path.join(dir, "headroom-context-analysis.json");
  await fs.writeFile(out, JSON.stringify(payload, null, 2));
  return out;
}

const file = arg("file");
const textArg = arg("text");
const mode = arg("mode", "analyze");
const model = arg("model", "gpt-4o");
const tokenBudget = Number(arg("token-budget", "4000"));
const timeoutMs = Number(arg("timeout-ms", "5000"));
const jsonOnly = process.argv.includes("--json");
const force = process.argv.includes("--force");

if (!file && !textArg) {
  usage();
  process.exit(2);
}

const text = textArg || await fs.readFile(file, "utf8");
const secretMatches = secretSignals(file, text);
if (secretMatches.length > 0 && !force) {
  const refusal = {
    timestamp: new Date().toISOString(),
    mode,
    refused: true,
    reason: "secret-looking input refused",
    file: file || null,
    matches: secretMatches,
    localOnly: true,
    next: "Use a redacted fixture or rerun with --force only after explicit user approval."
  };
  refusal.artifact = await writeArtifact(refusal);
  if (jsonOnly) console.log(JSON.stringify(refusal, null, 2));
  else {
    console.log("Headroom context analysis refused: secret-looking input.");
    console.log(`Matches: ${secretMatches.join(", ")}`);
    console.log(`Artifact: ${refusal.artifact}`);
  }
  process.exit(3);
}
const messages = makeMessages(text);
const analysis = {
  timestamp: new Date().toISOString(),
  mode,
  input: {
    file: file || null,
    characters: text.length,
    roughTokens: roughTokens(text)
  },
  localOnly: true,
  canonicalSource: file || "inline --text input",
  secretSignals: secretMatches,
  headroomSdk: {
    messageFormat: detectFormat(messages),
    turns: countTurns(messages),
    userQueryPreview: extractUserQuery(messages).slice(0, 240),
    toolCalls: extractToolCalls(messages).length
  },
  localSignals: {
    repeatedLines: repeatedLineStats(text),
    json: jsonSignal(text),
    largeEnoughForCompression: roughTokens(text) >= 1200
  },
  serviceResult: null,
  serviceOptions: mode === "analyze" ? null : {
    model,
    tokenBudget,
    timeoutMs
  },
  recommendation: "Use Headroom as a context optimization layer only when it reduces large context without replacing raw source paths."
};

try {
  if (mode === "simulate") {
    analysis.serviceResult = await simulate(messages, {
      model,
      tokenBudget,
      timeout: timeoutMs,
      fallback: true,
      stack: "codex_project_manager"
    });
  } else if (mode === "compress") {
    analysis.serviceResult = await compress(messages, {
      model,
      tokenBudget,
      timeout: timeoutMs,
      fallback: true,
      stack: "codex_project_manager"
    });
  } else if (mode !== "analyze") {
    throw new Error(`Unsupported mode: ${mode}`);
  }
} catch (error) {
  analysis.serviceResult = {
    available: false,
    error: error.name,
    message: error instanceof HeadroomConnectionError
      ? "Headroom service is not reachable. SDK is installed, but compression needs a running Headroom service."
      : error.message
  };
}

if (analysis.serviceResult?.tokensSaved > 0) {
  analysis.recommendation = "Headroom service reported token savings; compare compressed output against source before using it in a task.";
} else if (analysis.serviceResult?.tokensBefore !== undefined || analysis.serviceResult?.compressed === true) {
  analysis.recommendation = "Headroom service responded successfully, but this input was not reduced; preserve the raw source path and use local summarization if needed.";
} else if (!analysis.serviceResult?.available && mode !== "analyze") {
  analysis.recommendation = "Service-backed compression is not active; keep using local retrieval and summarize large outputs manually.";
} else if (analysis.localSignals.largeEnoughForCompression || analysis.localSignals.repeatedLines.repeatedLineGroups > 0 || analysis.localSignals.json.likelyCompressible) {
  analysis.recommendation = "Use Headroom analysis for this large/noisy context, while preserving the raw source path as canonical evidence.";
}

analysis.artifact = await writeArtifact(analysis);

if (jsonOnly) {
  console.log(JSON.stringify(analysis, null, 2));
} else {
  console.log(`Headroom context analysis: ${analysis.input.roughTokens} rough tokens, ${analysis.localSignals.repeatedLines.repeatedLineGroups} repeated line groups.`);
  console.log(`Mode: ${mode}`);
  if (analysis.serviceResult?.available === false) console.log(`Service: unavailable (${analysis.serviceResult.error})`);
  if (analysis.serviceResult?.tokensSaved !== undefined) console.log(`Service tokens saved: ${analysis.serviceResult.tokensSaved}`);
  console.log(`Recommendation: ${analysis.recommendation}`);
  console.log(`Artifact: ${analysis.artifact}`);
}
