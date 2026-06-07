# Multi-Repo System Upgrade Map

Date: 2026-06-07

## CloakBrowser

1. Capability: restricted browser automation safety and tool selection.
2. Upgrade target: browser/inspection/tool-selection policy.
3. Owner: `project_manager.browser.browser-automation-safety-and-tool-selection`.
4. Gap filled: no active restricted-use policy for stealth/anti-detect browsers.
5. Risk: bot-detection/CAPTCHA/Cloudflare bypass claims, proxies, browser profiles, cookies, binary cache.
6. Auto-absorbed now: safety and routing policy.
7. Auto-activated now: normal-tools-first decision tree and restricted-use policy.
8. Candidate due to weak/unclear evidence: none for safety policy; current signal is weak.
9. Restricted/skipped: actual CloakBrowser install/use.
10. Requires approval later: install, stealth browsing, proxies, profiles, session/cookie reuse.
11. Future task: evaluate restricted browser only for an owned test target.
12. last30days: weak current signal.
13. Headroom: used on large redacted research bundle.
14. Official verification: GitHub README, changelog, binary license, repo metadata.

## Understand Anything

1. Capability: codebase intelligence, knowledge graph, architecture understanding.
2. Upgrade target: Understand skills, CodeGraph routing, codebase recon.
3. Owner: `project_manager.codebase.codebase-intelligence-tooling`.
4. Gap filled: active comparison of when to use graph/dashboard tools vs CodeGraph vs direct reads.
5. Risk: generated `.understand-anything/` artifacts, install scripts, graph sync, large analysis.
6. Auto-absorbed now: routing/docs/artifacts/generated-folder policy.
7. Auto-activated now: codebase intelligence tool comparison and local-only graph policy.
8. Candidate due to weak/unclear evidence: none for routing docs.
9. Restricted/skipped: install and generated graph sync.
10. Requires approval later: install, run on real private repo when not explicitly requested, commit graph outputs.
11. Future task: approved architecture onboarding pass.
12. last30days: useful current signal around codebase graph/context tools.
13. Headroom: used on large research bundle.
14. Official verification: GitHub README, website, package metadata.

## Anthropic-Cybersecurity-Skills

1. Capability: defensive security taxonomy and skill intake model.
2. Upgrade target: security-env-secrets-gate, backend/database/VPS safety, deployment readiness, AI security review.
3. Owner: `project_manager.security.defensive-cybersecurity-skills-intake`.
4. Gap filled: defensive-only filter for large external cyber skill libraries.
5. Risk: offensive procedures, malware/exploit workflows, untrusted skill supply-chain content.
6. Auto-absorbed now: defensive intake model and framework mapping.
7. Auto-activated now: defensive-only intake policy and checklists.
8. Candidate due to weak/unclear evidence: importing any actual external skill remains blocked.
9. Restricted/skipped: offensive or operational exploit playbooks.
10. Requires approval later: installing security tools, importing external skills, analyzing private logs, executing commands.
11. Future task: approved defensive checklist enrichment for a specific gate.
12. last30days: weak/noisy current signal.
13. Headroom: used because index/research bundle was large.
14. Official verification: GitHub README/index and official MITRE/NIST framework URLs.

## LiteParse

1. Capability: local PDF parsing and spatial text extraction.
2. Upgrade target: document ingestion/source-to-knowledgebase.
3. Owner: `project_manager.ingestion.document-parsing-stack`.
4. Gap filled: local PDF parser decision rules.
5. Risk: installs, private document processing, OCR temp outputs.
6. Auto-absorbed now: parsing decision tree and trust boundary.
7. Auto-activated now: LiteParse as future local parser candidate.
8. Candidate due to weak/unclear evidence: real install/use.
9. Restricted/skipped: private document processing without approval.
10. Requires approval later: install, processing private docs, OCR server configuration.
11. Future task: benchmark public PDFs against MarkItDown/LiteParse.
12. last30days: useful but mixed signal.
13. Headroom: used.
14. Official verification: GitHub README and WASM README.

## PaddleOCR

1. Capability: OCR engine and document parsing backend.
2. Upgrade target: OCR backend decision layer.
3. Owner: `project_manager.ingestion.document-parsing-stack`.
4. Gap filled: OCR backend selection and model/cache safety.
5. Risk: heavy install, model downloads/cache, GPU/runtime requirements, private OCR.
6. Auto-absorbed now: OCR backend decision rules and model/cache ignore rules.
7. Auto-activated now: optional heavy OCR backend policy.
8. Candidate due to weak/unclear evidence: actual install/model setup.
9. Restricted/skipped: private OCR and model downloads.
10. Requires approval later: install, `paddleocr[all]`, model download, OCR on private docs, service mode.
11. Future task: public-fixture OCR benchmark.
12. last30days: useful but mixed signal.
13. Headroom: used.
14. Official verification: GitHub docs/update docs and Context7 `/paddlepaddle/paddleocr`.
