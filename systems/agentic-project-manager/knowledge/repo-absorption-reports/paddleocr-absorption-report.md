# Repo Absorption Report: PaddleOCR

Date: 2026-06-07
Repo: https://github.com/PaddlePaddle/PaddleOCR
Local evidence: `.ai-task/official/paddle-install.md`, `.ai-task/official/paddle-update.md`, `.ai-task/official/paddlepaddle-paddleocr-repo.json`, `.ai-task/last30days/paddleocr-planned.md`, Context7 `/paddlepaddle/paddleocr`

## Verdict

Absorb as heavy OCR/backend option knowledge. Do not make it the default parser and do not install models or process private documents without approval.

## How It Helps

PaddleOCR fills the high-capability OCR branch of the document-ingestion stack for cases where document OCR, table/form/layout recognition, document parsing, or multimodal OCR is needed beyond basic text extraction.

## Repo Identity

- License: Apache-2.0.
- Repo health signal: very high-star, recently pushed and updated on 2026-06-07 via GitHub metadata.
- Claimed domain: OCR, PP-OCRv5, PP-StructureV3, PP-ChatOCR, PaddleOCR-VL, document parsing.

## Official Findings

- Install docs distinguish base `paddleocr` from optional extras such as `paddleocr[all]` and feature-specific dependency groups.
- Update docs and Context7 show PaddleOCR 3.x, PP-OCRv5, PP-StructureV3, PP-ChatOCRv4, and PaddleOCR-VL.
- Context7 indicates PaddleOCR-VL is GPU-heavy and should be treated as a model/backend decision, not a lightweight default.
- README fetch failed locally, but install/update docs, GitHub metadata, and Context7 provide enough official evidence for routing.

## Current Signal

last30days found useful but mixed signal around OCR fallback and PaddleOCR-VL. It supports awareness of current activity, while official docs remain authoritative.

## Useful Goodies

- OCR backend selection rules.
- Heavy-model approval boundary.
- Private document OCR gate.
- Model/cache/download sync-ignore notes.

## System Placement

Active pack: `project_manager.ingestion.document-parsing-stack`

## Auto-Activated

Safe decision guidance for escalating from text extraction/spatial parsing to OCR and heavy OCR backends.

## Approval-Gated

Installing PaddleOCR, installing optional extras, downloading models, using GPU-heavy models, running private OCR, starting OCR services, or syncing OCR outputs/caches.

## Rejected or Skipped

No install, no model download, no OCR run, no private document processing, and no copied source.
