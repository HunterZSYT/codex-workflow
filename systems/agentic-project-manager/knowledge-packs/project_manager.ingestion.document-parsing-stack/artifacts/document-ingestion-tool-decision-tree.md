# Document Ingestion Tool Decision Tree

1. Is the input already text or simple Office/PDF?
   - Use broad conversion first.
2. Is precise PDF layout or bounding box data needed?
   - Consider LiteParse.
3. Is OCR needed?
   - Use light OCR first for public/non-sensitive material.
4. Is complex OCR/layout/table/formula parsing needed?
   - Consider PaddleOCR after approval.
5. Is the document private?
   - Ask approval before OCR or model/service use.
6. Is extracted text used for claims?
   - Verify against original pages/images.
