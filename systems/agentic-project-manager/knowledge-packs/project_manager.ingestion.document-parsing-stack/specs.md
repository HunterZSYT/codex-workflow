# Specs

## Tool Selection

- Broad file-to-Markdown conversion: use MarkItDown-style tooling when sufficient.
- Local digital PDF with layout/bounding boxes: LiteParse candidate.
- Scanned PDF/images requiring OCR: Tesseract first for light/local use when available.
- Complex multilingual OCR, document layout/table/structure parsing: PaddleOCR candidate.
- VLM-heavy document parsing: PaddleOCR-VL or cloud/VLM parser only after explicit approval and resource review.

## Trust Boundary

Extracted text is not ground truth. Verify against original PDF/image pages for citations, numeric values, tables, signatures, handwriting, charts, and multi-column layout.

## Sync Exclusions

Never sync model downloads/cache, raw OCR output from private documents, screenshots, generated vector stores, SQLite/HNSW stores, parser temp folders, or extracted private documents.
