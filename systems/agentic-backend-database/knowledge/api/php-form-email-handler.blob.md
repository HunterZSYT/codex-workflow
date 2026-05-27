# Knowledge Blob: PHP Form Email Handler

Blob ID: php-form-email-handler

Owner system: agentic-backend-database

Owner skill: api-contract-orchestrator

Capability: Safe PHP form email handling, including PHPMailer-style SMTP flows.

Trigger phrases:
- PHPMailer
- PHP mail
- contact form
- SMTP
- email handler

When to use:
- Use for PHP contact forms, SMTP email handlers, and form-to-email flows.

When not to use:
- Do not use for payment, auth, or newsletter provider integrations without the relevant owner skill.

External libraries/tools:
- PHPMailer
- SMTP provider docs

Required docs source:
- Context7:
- Official docs: https://github.com/PHPMailer/PHPMailer
- GitHub/npm:
- Last verified: candidate

Best-practice rules:
- Validate and sanitize inputs.
- Use server-side SMTP credentials from environment/config outside public web root.
- Do not expose SMTP credentials in source or client code.
- Add CSRF/spam/rate-limit protection where appropriate.
- Return stable API responses and avoid leaking SMTP errors to users.

Implementation pattern:
- Inspect current form contract.
- Add server-side validation.
- Configure PHPMailer via environment.
- Smoke test with safe test data.

Anti-patterns:
- Trusting client-side validation.
- Using user-supplied email directly as SMTP sender without safe reply-to handling.
- Committing credentials.

Security/safety notes:
- Secrets never sync.
- Avoid header injection.

Verification method:
- Safe form submission smoke test and log review without exposing secrets.

Generated/local artifacts:
- Local mail logs remain local-only.

Micro-update history:
- 2026-05-28: Initial candidate seed; refresh from official docs before implementation.

Safe to sync to codex-workflow:
yes
