# Public URL Inspection Workflow

Use frontend tools against any reachable public URL.

## Default Checks

- Desktop screenshot.
- Tablet/mobile screenshot.
- Horizontal overflow.
- Console warnings/errors.
- Failed requests.
- 4xx/5xx assets.
- Final URL/redirect.
- Selector measurement if task-specific.
- Hover/click if interaction-specific.

## Commands

```powershell
node C:\Users\acer\.codex\agentic-frontend\tools\frontend-inspect.mjs --url <URL> --preset desktop --out .ai-task/qa
node C:\Users\acer\.codex\agentic-frontend\tools\frontend-inspect.mjs --url <URL> --preset iphone-14-pro-max --out .ai-task/qa
node C:\Users\acer\.codex\agentic-frontend\tools\frontend-inspect.mjs --url <URL> --preset pixel-7 --out .ai-task/qa
```

Optional:

```powershell
node C:\Users\acer\.codex\agentic-frontend\tools\accessibility-check.mjs --url <URL> --preset desktop --out .ai-task/qa
node C:\Users\acer\.codex\agentic-frontend\tools\performance-check.mjs --url <URL> --out .ai-task/qa
```

## Rules

- Public URL inspection can run without SSH if the URL is reachable.
- Do not use stealth/bypass browsing.
- Do not inspect private/admin pages unless the user explicitly provides access and approves.
- Save QA outputs to local-only `.ai-task/qa` or task-safe folder.
- Do not sync screenshots/logs unless sanitized and explicitly approved.
