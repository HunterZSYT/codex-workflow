# Overview

This repository is a sanitized source-of-truth for a Codex workflow environment.

Architecture:

```text
local Codex systems -> allowlisted export -> GitHub repo -> restore script -> new machine
```

The repo stores reusable workflow assets and setup scripts. It intentionally excludes secrets, live auth state, local caches, logs, generated QA artifacts, and machine-specific credentials.
