import fs from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);

function readArg(name) {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : "";
}

function stripLatex(input) {
  return input
    .replace(/%.*$/gm, "")
    .replace(/\\(section|subsection|subsubsection|paragraph|caption|title|author)\*?\{([^{}]*)\}/g, "\n$2\n")
    .replace(/\\(textbf|textit|emph|underline|item)\{([^{}]*)\}/g, "$2")
    .replace(/\\begin\{[^{}]+\}|\\end\{[^{}]+\}/g, "\n")
    .replace(/\\[a-zA-Z]+\*?(?:\[[^\]]*\])?(?:\{[^{}]*\})?/g, " ")
    .replace(/[{}]/g, "")
    .replace(/~|\\,/g, " ");
}

function stripHtml(input) {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanText(input) {
  return input
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const input = readArg("input");
const output = readArg("output");

if (!input || !output) {
  console.error("Usage: node scripts/writer-extract-text.mjs --input path/to/file.tex --output build/writer-output/extracted-text.txt");
  process.exit(1);
}

const extension = path.extname(input).toLowerCase();
const source = await fs.readFile(input, "utf8");
let extracted = source;

if (extension === ".tex") {
  extracted = stripLatex(source);
} else if (extension === ".html" || extension === ".htm") {
  extracted = stripHtml(source);
}

await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, cleanText(extracted));
console.log(`Saved extracted text to ${output}`);
