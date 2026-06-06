# Source Ledger

Date checked: 2026-06-06
Task: Absorb Headroom as source-backed knowledge for Codex Workflow; later promoted to active global context layer in SDK/tool mode and local service mode.
Approval status: user approved global context layer and local service activation; MCP, Codex provider proxy/wrapper, persistent memory, and `headroom learn` remain pending expansion modes.

## Sources Reviewed

- https://github.com/chopratejas/headroom
  - Type: official GitHub repo.
  - Extracted: README claims, modes, architecture overview, license, stars/forks/releases as maturity signal.
  - Reliability: primary source.
  - Use note: pattern extraction only; no source code copied.

- https://raw.githubusercontent.com/chopratejas/headroom/main/llms.txt
  - Type: official machine-readable docs index.
  - Extracted: modes, compression scope, CCR summary, docs entry points, telemetry opt-out.
  - Reliability: primary source.
  - Use note: short factual notes only.

- https://raw.githubusercontent.com/chopratejas/headroom/main/LICENSE
  - Type: official license.
  - Extracted: Apache-2.0 license and redistribution obligations.
  - Reliability: primary source.

- https://raw.githubusercontent.com/chopratejas/headroom/main/NOTICE
  - Type: official notices.
  - Extracted: attribution and third-party library notice concerns.
  - Reliability: primary source.

- https://raw.githubusercontent.com/chopratejas/headroom/main/SECURITY.md
  - Type: official security policy.
  - Extracted: proxy exposure, log sensitivity, API key guidance, passthrough/safe defaults claims.
  - Reliability: primary source.

- https://raw.githubusercontent.com/chopratejas/headroom/main/pyproject.toml
  - Type: package metadata.
  - Extracted: Python package name, version, Python requirement, extras, dependency classes.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/llms.txt
  - Type: official docs index.
  - Extracted: docs map for compression, CCR, memory, failure learning, proxy, MCP, config, benchmarks, limitations.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/docs/installation
  - Type: official docs.
  - Extracted: Python, TypeScript, Docker install modes and runtime requirements.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/docs/proxy
  - Type: official docs.
  - Extracted: proxy behavior, endpoints, telemetry default, local stats files, wrapper/base URL risks.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/docs/mcp
  - Type: official docs.
  - Extracted: MCP tools, original retrieval behavior, local/session stats files, remote HTTP MCP option.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/docs/ccr
  - Type: official docs.
  - Extracted: Compress-Cache-Retrieve model, retrieval tool injection, local cache/original retrieval.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/docs/memory
  - Type: official docs.
  - Extracted: persistent memory model, scope levels, vector/full-text storage behavior.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/docs/failure-learning
  - Type: official docs.
  - Extracted: `headroom learn`, session mining, correction writing to project context files, marker-managed writes.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/docs/configuration
  - Type: official docs.
  - Extracted: modes, store URL, telemetry env, proxy log file, savings path, model config path.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/docs/limitations
  - Type: official docs.
  - Extracted: when Headroom helps, when it adds little value, code/RAG passthrough limitations.
  - Reliability: primary source.

- https://headroom-docs.vercel.app/docs/benchmarks
  - Type: official docs.
  - Extracted: benchmark claims and evaluation metrics.
  - Reliability: primary source; benchmark claims still require local verification.

- https://pypi.org/project/headroom-ai/
  - Type: package registry.
  - Extracted: PyPI package version 0.23.0, release date 2026-06-04, Python >=3.10, beta classifier, extras.
  - Reliability: primary package registry.

- `npm view headroom-ai name version license description dist-tags engines --json`
  - Type: npm registry metadata queried locally without installing.
  - Extracted: npm package `headroom-ai`, version 0.22.4, Apache-2.0, Node >=18.
  - Reliability: registry query; note version lag versus PyPI/GitHub.

## Rejected Source Actions

- Did not clone the repo.
- Current active layer uses the existing npm package dependency and isolated Python 3.11 proxy runtime; do not reinstall unless missing.
- Did not run MCP server, Codex provider wrapper, persistent memory, or `headroom learn`.
- Did not copy source code into the Codex Workflow system.
