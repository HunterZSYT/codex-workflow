# Security Env Secrets Gate

Use for secrets, env, auth, and security-sensitive backend work.

Rules: never reveal secrets; audit env vars by name only; check `.env.example` completeness; check hardcoded secret risks; check auth/session/cookie/security headers when relevant; do not weaken auth; verify server-side authorization, not just UI hiding.
