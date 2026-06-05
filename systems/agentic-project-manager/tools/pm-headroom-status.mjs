#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { HeadroomClient } from "headroom-ai";
import { PM_ROOT } from "./pm-lib.mjs";

const require = createRequire(import.meta.url);

function commandExists(command, args = ["--version"]) {
  const isPath = /[\\/]/.test(command) || command.toLowerCase().endsWith(".exe");
  const result = process.platform === "win32" && !isPath
    ? spawnSync("cmd.exe", ["/d", "/s", "/c", [command, ...args].join(" ")], { encoding: "utf8" })
    : spawnSync(command, args, { encoding: "utf8" });
  return {
    available: result.status === 0,
    status: result.status,
    stdout: String(result.stdout || "").trim(),
    stderr: String(result.stderr || result.error?.message || "").trim()
  };
}

async function packageInfo() {
  try {
    const entryPath = require.resolve("headroom-ai");
    const packagePath = path.resolve(entryPath, "..", "..", "package.json");
    const json = JSON.parse(await fs.readFile(packagePath, "utf8"));
    return {
      installed: true,
      name: json.name,
      version: json.version,
      license: json.license,
      path: packagePath
    };
  } catch (error) {
    return { installed: false, error: error.message };
  }
}

async function serviceHealth(baseUrl) {
  const client = new HeadroomClient({ baseUrl, timeout: 2000, fallback: true, stack: "codex_project_manager" });
  try {
    const health = await client.health();
    return { reachable: true, baseUrl, health };
  } catch (error) {
    return { reachable: false, baseUrl, error: error.name, message: error.message };
  } finally {
    client.close();
  }
}

const baseUrl = process.env.HEADROOM_BASE_URL || "http://localhost:8787";
const py311 = path.join(PM_ROOT, ".runtime", "headroom-py311", "venv", "Scripts", "python.exe");
const py313 = path.join(PM_ROOT, ".runtime", "headroom", "venv", "Scripts", "python.exe");

const status = {
  timestamp: new Date().toISOString(),
  mode: "sdk_pilot",
  package: await packageInfo(),
  service: await serviceHealth(baseUrl),
  runtimes: {
    node: commandExists("node"),
    npm: commandExists("npm"),
    docker: commandExists("docker"),
    python311Headroom: commandExists(py311, ["-m", "pip", "show", "headroom-ai"]),
    python313Headroom: commandExists(py313, ["-m", "pip", "show", "headroom-ai"])
  },
  activeUse: {
    sdkInstalled: false,
    compressionServiceReachable: false,
    codexProxyWrapped: false,
    mcpServerConfigured: false,
    headroomLearnEnabled: false
  },
  guidance: [
    "Use pm-headroom-context.mjs for explicit context analysis and service-backed simulation/compression checks.",
    "Do not route Codex provider traffic through Headroom until service health is green and a rollback plan exists.",
    "If Python install fails with link.exe missing, install Visual Studio Build Tools with the C++ workload or use a remote/headroom cloud endpoint."
  ]
};

status.activeUse.sdkInstalled = status.package.installed;
status.activeUse.compressionServiceReachable = status.service.reachable;

console.log(JSON.stringify(status, null, 2));
