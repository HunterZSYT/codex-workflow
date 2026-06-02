import fs from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);

function readArg(name, fallback = "") {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
}

function issueLine(issue) {
  const phrase = issue.phrase ? `: ${issue.phrase}` : "";
  const count = issue.count ? ` (${issue.count}x)` : "";
  return `- [${issue.severity}] ${issue.type}${phrase}${count} - ${issue.message}`;
}

const file = readArg("file");
const profile = readArg("profile", "academic_report");

if (!file) {
  console.error("Usage: node scripts/writer-check.mjs --file path/to/file.txt --profile academic_report");
  process.exit(1);
}

const text = await fs.readFile(file, "utf8");
const response = await fetch("http://localhost:3077/check", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ text, profile })
});

if (!response.ok) {
  throw new Error(`Writer check failed: ${response.status} ${response.statusText}`);
}

const result = await response.json();
const outputDir = path.join(process.cwd(), "build", "writer-output");
await fs.mkdir(outputDir, { recursive: true });

await fs.writeFile(path.join(outputDir, "writer-check.json"), JSON.stringify(result, null, 2));

const markdown = [
  "# Writer Check",
  "",
  `Profile: ${result.profile}`,
  "",
  "## Summary",
  "",
  `- Issue count: ${result.summary.issue_count}`,
  `- High priority: ${result.summary.high_priority}`,
  `- Medium priority: ${result.summary.medium_priority}`,
  `- Low priority: ${result.summary.low_priority}`,
  "",
  "## Issues",
  "",
  ...(result.issues.length ? result.issues.map(issueLine) : ["No custom issues detected."]),
  "",
  "## Write Good",
  "",
  ...(result.write_good.length
    ? result.write_good.map((item) => `- ${item.reason} at index ${item.index}`)
    : ["No write-good suggestions returned."]),
  "",
  "## Recommended Direction",
  "",
  ...result.recommended_direction.map((item) => `- ${item}`),
  ""
].join("\n");

await fs.writeFile(path.join(outputDir, "writer-check.md"), markdown);
console.log(`Saved writer check output to ${outputDir}`);
