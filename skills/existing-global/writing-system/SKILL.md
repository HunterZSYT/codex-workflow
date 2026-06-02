---
name: writing-system
description: Use only when the user explicitly asks to use, call, apply, promote, or run the writing system, or invokes $writing-system. Provides a local writing-support service for preparing, checking, and improving drafts across academic reports, internship reports, business reports, technical documentation, website copy, product descriptions, proposals, case studies, portfolio content, captions, and formal emails.
---

# Writing System

Use this skill only when the user explicitly asks for the writing system. Do not trigger it for ordinary writing, editing, or copywriting requests unless the user names the writing system.

## Safety Boundary

Help improve clarity, specificity, structure, tone, and human-authored quality. Do not promise or optimize for bypassing AI detectors. If the user asks for detector evasion, reframe the work as making the writing more accurate, specific, natural, and grounded in real details.

## Quick Workflow

1. Start the local service if it is not already running:

```powershell
cd C:\Users\acer\.codex\skills\writing-system
npm install
npm start
```

2. Check health:

```powershell
Invoke-RestMethod -Uri "http://localhost:3077/health"
```

3. Before writing, call `/context` with the selected profile, purpose, topic, and task notes.

4. Draft directly in the target file when the user asks for content changes.

5. After drafting, call `/check` or run `scripts/writer-check.mjs` on extracted text.

6. Apply only useful guidance. Keep facts, dates, sources, results, and project details grounded in evidence from the task context.

## Profiles

Use the closest profile from `references/writing-profiles.json`:

- `academic_report`
- `internship_report`
- `business_report`
- `technical_documentation`
- `website_copy`
- `product_description`
- `proposal`
- `email_formal`
- `social_caption`

For case studies and portfolio content, choose the nearest profile based on purpose:

- case study for business decision: `business_report`
- case study for web/marketing: `website_copy`
- case study for technical work: `technical_documentation`
- portfolio reflection: `internship_report`
- portfolio project page: `website_copy`

## Commands

Start the server:

```powershell
cd C:\Users\acer\.codex\skills\writing-system
npm start
```

Run a check:

```powershell
node scripts/writer-check.mjs --file path\to\draft.txt --profile academic_report
```

Extract readable text:

```powershell
node scripts/writer-extract-text.mjs --input path\to\file.tex --output build\writer-output\extracted-text.txt
```

## Service Endpoints

- `GET /health`
- `GET /stylecard`
- `GET /profiles`
- `POST /context`
- `POST /prepare`
- `POST /check`

The service returns guidance and issue detection. It does not generate final rewritten content by itself; Codex should use the guidance to write or revise the target content directly.
