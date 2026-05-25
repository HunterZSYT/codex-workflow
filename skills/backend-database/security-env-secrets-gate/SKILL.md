---
name: security-env-secrets-gate
description: Use for backend secrets, env vars, auth, sessions, cookies, security headers, hardcoded secret risks, .env.example completeness, and authorization checks. Never reveals secret values.
---

# Security Env Secrets Gate

Never reveal secrets. Audit env vars by name only. Check `.env.example` completeness and hardcoded secret risks. Check auth/session/cookie/security headers when relevant. Do not weaken auth. Verify server-side authorization, not just UI hiding.
