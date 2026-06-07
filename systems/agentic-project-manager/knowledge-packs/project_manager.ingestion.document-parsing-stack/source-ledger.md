# Source Ledger

## LiteParse Official Sources

- 2026-06-07: https://github.com/run-llama/liteparse
  - Repository metadata inspected through GitHub API.
  - License: Apache-2.0.
  - Current GitHub signal: 9405 stars, 568 forks, pushed 2026-06-05, updated 2026-06-07.
  - Topics include document-ocr, document-processing, ocr, pdf, pdf-parser, and text-extraction.
- 2026-06-07: https://github.com/run-llama/liteparse/blob/main/README.md
  - README describes local PDF parsing, spatial text extraction with bounding boxes, PDFium, Tesseract OCR, optional HTTP OCR servers such as EasyOCR/PaddleOCR, JSON/text output, screenshots, and Office/image conversion through LibreOffice/ImageMagick.
- 2026-06-07: https://github.com/run-llama/liteparse/blob/main/packages/wasm/README.md
  - WASM README says browser build runs entirely in browser with no server/cloud calls; native HTTP-OCR and Tesseract backends are not available in browser.

## PaddleOCR Official Sources

- 2026-06-07: https://github.com/PaddlePaddle/PaddleOCR
  - Repository metadata inspected through GitHub API.
  - License: Apache-2.0.
  - Current GitHub signal: 81141 stars, 10671 forks, pushed 2026-06-04, updated 2026-06-07.
  - Topics include document-parsing, PaddleOCR-VL, pdf-parser, pdf2markdown, PP-OCR, and PP-Structure.
- 2026-06-07: https://github.com/PaddlePaddle/PaddleOCR/blob/main/docs/version3.x/installation.en.md
  - Installation docs separate base `paddleocr` install from optional groups such as doc-parser, information extraction, translation, and document-to-Markdown.
- 2026-06-07: https://github.com/PaddlePaddle/PaddleOCR/blob/main/docs/update/update.en.md
  - Update docs describe PP-OCRv5, PP-StructureV3, PP-ChatOCRv4, Windows/GPU support notes, model download source settings, MKL-DNN cache behavior, and 3.x dependency separation.
- 2026-06-07: Context7 `/paddlepaddle/paddleocr`
  - Confirmed PaddleOCR 3.x install modes, PP-OCRv5, PP-StructureV3, PaddleOCR-VL, optional capabilities, and GPU-heavy PaddleOCR-VL usage.

## Current Signal

- LiteParse: last30days found a Show HN item and Reddit document-parser discussion; useful but mixed/noisy.
- PaddleOCR: last30days found Reddit discussion around local parsing, OCR fallback, and PaddleOCR-VL 1.6 announcement; useful but not technical proof.

## Local Evidence Paths

- `.ai-task/official/liteparse-readme.md`
- `.ai-task/official/liteparse-wasm-readme.md`
- `.ai-task/official/paddle-install.md`
- `.ai-task/official/paddle-update.md`
- `.ai-task/repo-metadata-summary.txt`

## Headroom

- Headroom analyzed a redacted large bundle. Raw official sources remain canonical.
