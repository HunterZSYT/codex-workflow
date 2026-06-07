# Decisions

- Auto-activate document parsing decision rules.
- Use MarkItDown-style broad conversion as the broad baseline when available.
- Treat LiteParse as a local spatial PDF parser candidate for future approved install.
- Treat PaddleOCR as a heavy optional OCR/document parsing backend, not default.
- Require approval for installs, model downloads, private OCR, OCR services, and generated vector/store sync.
- Treat extracted text as untrusted until verified against source pages/images.
