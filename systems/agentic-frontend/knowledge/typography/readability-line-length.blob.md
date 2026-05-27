# Knowledge Blob: Readability Line Length

Blob ID: readability-line-length

Owner system: agentic-frontend

Owner skill: dynamic-ui-typography-logic

Capability: Keep paragraphs, hero copy, and content text readable with line-height and max-width rules.

Trigger phrases:
- readability
- line length
- paragraph width
- line-height
- hard to read
- text wrapping

When to use:
- Use when text stretches too wide, wraps badly, feels cramped, or becomes hard to read.

When not to use:
- Do not force narrow text in dense dashboards or tables where scanning columns matters more.

External libraries/tools:
- None

Required docs source:
- Context7: not needed
- Official docs: not needed
- GitHub/npm: not needed
- Last verified: existing skill/user-authored rule, 2026-05-28

Best-practice rules:
- Paragraphs should usually stay around `55` to `75` characters per line.
- Hero copy often works around `520px` to `680px`.
- Article/content paragraphs often work around `640px` to `760px`.
- Center-aligned text should be shorter than left-aligned text.
- Body text should usually be `16px` to `18px` with `1.5` to `1.7` line-height.
- Small text needs enough line-height and contrast to remain readable.

Implementation pattern:
- Set max-width on text containers, not only font size.
- Tune line-height by text role.
- Prefer left alignment for long reading.
- Shorten centered copy or switch it to left alignment when lines become long.

Anti-patterns:
- Full-width paragraphs on wide screens.
- Tight line-height on long body copy.
- Low-contrast small text for important information.

Security/safety notes:
- No security-sensitive behavior.

Verification method:
- Inspect line lengths and wrapping on desktop, tablet, and mobile.

Generated/local artifacts:
- None

Micro-update history:
- 2026-05-28: Extracted from dynamic-ui-typography-logic.

Safe to sync to codex-workflow:
yes
