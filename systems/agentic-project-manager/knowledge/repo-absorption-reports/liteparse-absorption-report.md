# Repo Absorption Report: LiteParse

Date: 2026-06-07
Repo: https://github.com/run-llama/liteparse
Local evidence: `.ai-task/official/liteparse-readme.md`, `.ai-task/official/liteparse-wasm-readme.md`, `.ai-task/official/run-llama-liteparse-repo.json`, `.ai-task/last30days/liteparse-planned.md`

## Verdict

Absorb as document-ingestion decision knowledge. Keep installs and parsing of private documents approval-gated.

## How It Helps

LiteParse adds a local-first PDF parsing option to the ingestion stack, especially when layout, page structure, and bounding boxes matter more than simple text extraction.

## Repo Identity

- License: Apache-2.0.
- Repo health signal: high-star, recently pushed and updated on 2026-06-07 via GitHub metadata.
- Claimed domain: standalone local PDF parser with OCR and spatial text output.

## Official Findings

- README describes local parsing without proprietary cloud or LLM dependencies.
- It supports spatial text with bounding boxes, JSON/text output, Tesseract, optional HTTP OCR backends, PDFium, LibreOffice, ImageMagick, npm, pip, cargo, and WASM modes.
- Package metadata fetch failed locally, so README and repo metadata remain the canonical evidence for this pass.

## Current Signal

last30days found useful but mixed signal, including LiteParse v2 and broader document parser discussions. It supports current interest but not implementation facts.

## Useful Goodies

- Document ingestion tool decision tree.
- Local PDF parsing checklist.
- LiteParse vs MarkItDown vs PaddleOCR comparison.
- Parsing output trust-boundary rules.

## System Placement

Active pack: `project_manager.ingestion.document-parsing-stack`

## Auto-Activated

Safe decision guidance for selecting text extraction, spatial PDF parsing, and OCR escalation paths.

## Approval-Gated

Installing LiteParse, running external conversion/OCR dependencies, parsing private documents, running OCR services, or syncing extracted content.

## Rejected or Skipped

No install, no PDF parsing run, no private document OCR, no dependency setup, and no copied source.
