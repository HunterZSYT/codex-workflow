# OCR Backend Selection

- Tesseract: light local OCR, first choice when available and sufficient.
- LiteParse built-in/default OCR path: useful for local PDF parsing workflows after install approval.
- PaddleOCR: stronger optional backend for multilingual, layout, table, and document-structure use cases.
- PaddleOCR-VL: heavy VLM-style parsing; require resource, model, privacy, and approval review.
- Cloud parser: only with paid/API/privacy approval.
