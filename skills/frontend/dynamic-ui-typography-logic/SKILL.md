---
name: dynamic-ui-typography-logic
description: "Make strong UI typography decisions using font hierarchy, type scale, readability, line-height, weight, letter spacing, text width, spacing rhythm, responsive sizing, contrast, component role, and brand personality. Use when designing, reviewing, or fixing UI typography, hero headings, section headings, cards, buttons, nav text, forms, badges, captions, pricing, testimonials, dashboards, Tailwind/CSS type tokens, or responsive type issues. Behaves like a senior UI designer; detect weak, crowded, oversized, inconsistent, unreadable, or visually flat typography and apply the smallest correct typography fix."
---

# Dynamic UI Typography Logic

## Knowledge Blobs

Before implementing or reviewing precise typography decisions, consult:

- `C:\Users\acer\.codex\agentic-frontend\knowledge\typography\type-scale-hierarchy.blob.md`
- `C:\Users\acer\.codex\agentic-frontend\knowledge\typography\readability-line-length.blob.md`

## Core Principle

Typography controls how users understand content priority.

Good typography answers:

- What should the user read first?
- What is the main message?
- What is supporting information?
- What is clickable or actionable?
- Is the text readable?
- Does the text feel balanced with spacing and layout?
- Does the type system feel consistent across the UI?

Balance font size, font weight, line-height, letter spacing, text width, color contrast, spacing around text, responsive behavior, component role, and brand personality. Do not behave like a static font-size checklist.

## Review Workflow

1. Classify each text element by role:
   - Display heading
   - Hero heading
   - Section heading
   - Subheading
   - Card title
   - Body text
   - Small body text
   - Caption
   - Label
   - Button text
   - Navigation text
   - Form label
   - Placeholder text
   - Badge text
   - Metadata
   - Testimonial text
   - Price text
   - Stat number
   - Error/success message

2. Classify importance:
   - Primary: user must notice this first.
   - Secondary: user should read this after primary text.
   - Supporting: helpful but not dominant.
   - Utility: functional text such as labels, nav, buttons, and forms.
   - Decorative: text used mostly for style or atmosphere.

3. Diagnose the typography relationship:
   - Is the issue size, weight, contrast, line-height, width, spacing, casing, font pairing, or responsive behavior?
   - Is the text competing with a more important element?
   - Is the smallest correct fix a type adjustment, a spacing adjustment, or a color contrast adjustment?

Primary text needs stronger size, weight, contrast, and spacing. Supporting text should not compete with primary text.

## Typography Hierarchy Formula

Use this hierarchy formula:

```text
Text Importance = Font Size + Font Weight + Contrast + Position + Spacing
```

A heading does not become important only because it is large. It becomes important because it has the correct relationship with surrounding text.

Hierarchy rules:

- Main heading should be clearly larger than body text.
- Section heading should be smaller than hero heading.
- Card title should be smaller than section heading.
- Body text should be comfortable, not decorative.
- Muted text should be visually softer but still readable.
- Button text should be compact, clear, and confident.
- Labels should be close to the thing they describe.

If everything is bold, nothing feels important. If everything is the same size, hierarchy is weak. If small text is overused, the UI feels difficult to scan.

## Base Type Scale

Use this scale unless the project already has a clear type system:

```text
12px tiny label, badge, metadata
13px compact utility text
14px small body, nav, form helper text
16px default body text
18px large body text
20px small card title
24px card title / small section heading
32px section heading
40px strong section heading
48px large section heading
56px hero heading
64px large hero heading
72px premium display heading
```

Avoid random font sizes like `15px`, `17px`, `23px`, or `37px` unless there is a clear design reason. Exact numbers may change by brand, but the scale should remain consistent.

## Responsive Fluid Type

Use fluid typography for important headings:

```css
.hero-title {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.05;
}

.section-title {
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.12;
}

.subheading {
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.5;
}

.body {
  font-size: clamp(16px, 1.5vw, 18px);
  line-height: 1.6;
}
```

Mobile rule: do not keep desktop heading sizes on mobile.

- Desktop hero heading: `56px` to `72px`
- Mobile hero heading: `36px` to `44px`
- Desktop section heading: `40px` to `48px`
- Mobile section heading: `28px` to `36px`
- Desktop body: `16px` to `18px`
- Mobile body: `15px` to `16px`

## Line-Height Formula

Line-height controls readability and vertical rhythm.

- Large headings: `1.0` to `1.15`
- Section headings: `1.1` to `1.2`
- Card titles: `1.2` to `1.3`
- Body text: `1.5` to `1.7`
- Small text: `1.4` to `1.5`
- Button text: `1.1` to `1.2`

Rules:

- Larger text needs tighter line-height.
- Smaller text needs more line-height.
- Long paragraphs need more line-height.
- Short labels can use tighter line-height.
- All-caps text usually needs letter spacing.

Large headings with too much line-height feel loose. Paragraphs with tight line-height feel cramped. Good headings feel compact and strong; good body text feels easy to read.

## Font Weight Formula

Use weight to create hierarchy, but do not overuse bold.

```text
400 normal body text
500 medium emphasis, nav, labels
600 strong labels, buttons, small headings
700 headings, card titles
800 hero headings, major display text
900 rare dramatic display text
```

Recommended roles:

- Body text: `400` or `500`
- Navigation: `500` or `600`
- Button: `600` or `700`
- Card title: `600` or `700`
- Section heading: `700` or `800`
- Hero heading: `800` or `900`

Avoid body text in `700`, too many bold elements in one section, thin text on colored backgrounds, and weak font weight for important CTA text.

## Letter Spacing Formula

Use letter spacing carefully:

- Normal sentence case: `normal` or `-0.01em`
- Large headings: `-0.02em` to `-0.04em`
- All-caps labels: `0.04em` to `0.12em`
- Button text: `0` to `0.03em`

Rules:

- Big bold headings often look better with slight negative letter spacing.
- All-caps small text needs positive letter spacing.
- Do not add large letter spacing to normal paragraphs.
- Too much letter spacing makes text harder to read.

Example:

```css
.hero-title {
  letter-spacing: -0.03em;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

## Text Width and Readability

Readable text should not be too wide.

- Paragraph max-width: `55` to `75` characters per line
- Hero paragraph: `520px` to `680px`
- Content article paragraph: `640px` to `760px`
- Card paragraph: `100%`, but keep card readable
- Centered text: shorter max-width

Rules:

- Long paragraphs should not stretch across the full screen.
- Center-aligned paragraph text should be short.
- Left alignment is better for longer reading.
- Hero text should have controlled width.
- Card text should not feel squeezed.

```css
.text-content {
  max-width: 640px;
}

.hero-copy {
  max-width: 620px;
}
```

## Typography Spacing Relationships

Typography must work with spacing:

- Eyebrow to heading: `8px` to `16px`
- Heading to paragraph: `12px` to `24px`
- Paragraph to CTA: `24px` to `40px`
- Section heading block to content: `40px` to `64px`
- Card title to description: `8px` to `16px`
- Label to input: `6px` to `8px`
- Testimonial text to author: `16px` to `24px`
- Price to description: `8px` to `12px`

Related text should be close. Different content groups need larger separation. Do not create hierarchy using font size only; spacing around text is part of typography.

## Component Typography Logic

Header/navbar:

- Brand name: `20px` to `28px`, weight `700` or `800`
- Nav item: `14px` to `16px`, weight `500` or `600`
- Header CTA text: `13px` to `16px`, weight `600` or `700`
- Top bar text: `12px` to `14px`, weight `400` or `500`

Hero:

- Eyebrow: `12px` to `16px`, weight `600` or `700`, letter spacing if uppercase
- Hero heading: `40px` to `72px`, weight `800` or `900`, line-height `1.05` to `1.15`
- Hero paragraph: `16px` to `20px`, line-height `1.5` to `1.7`

Section:

- Section heading: `32px` to `48px`, weight `700` or `800`
- Section paragraph: `16px` to `18px`, line-height `1.6`

Cards:

- Card title: `20px` to `24px`, weight `600` or `700`
- Card description: `14px` to `16px`, line-height `1.5` to `1.6`

Forms:

- Label: `13px` to `15px`, weight `500` or `600`
- Input text: `15px` to `16px`, weight `400`
- Placeholder: `15px` to `16px`, lower contrast than input text but still readable
- Helper text: `12px` to `14px`

Buttons:

- Button text: `14px` to `16px`, weight `600` or `700`, line-height `1.1` to `1.2`

## Font Pairing Logic

Use simple font pairing rules.

Safe modern system:

- One font family for all UI.
- Use size, weight, spacing, and color for hierarchy.

Two-font system:

- Display font for headings.
- Clean sans-serif for body and UI.

Rules:

- Do not use more than two font families in normal UI.
- Do not mix fonts with similar personalities unless intentional.
- Body font must be readable first, stylish second.
- UI buttons, forms, and nav should use clear fonts.
- Decorative fonts should be rare and not used for long reading.

Generic pairings:

- Professional SaaS: Inter, Manrope, Geist, or system sans
- Editorial/premium: display serif for headings plus sans-serif for body
- Education/corporate: clean sans-serif with strong readability
- Luxury: elegant serif or high-contrast display font plus neutral sans
- Dashboard: single highly readable sans-serif

## Case Style Logic

- Sentence case: best for body, buttons, nav, cards, and modern UI.
- Title Case: useful for formal headings, page titles, and marketing sections.
- All caps: use carefully for labels, badges, and small eyebrow text.

Rules:

- Do not use all caps for long text.
- All caps requires letter spacing.
- Buttons are usually better in sentence case or short title case.
- Headings can be title case or uppercase depending on brand tone.
- Uppercase headings feel bold and loud but can reduce readability.

## Contrast and Typography

Typography must work with color contrast:

- Small text needs stronger contrast.
- Thin text needs stronger contrast.
- Text on images needs overlay or stronger contrast.
- Muted text should never be used for critical information.
- Bold text can survive slightly softer contrast, but do not rely on weight alone.
- CTA text must be very readable.

If text feels weak:

1. Check contrast.
2. Increase font weight.
3. Increase font size.
4. Improve line-height.
5. Reduce background noise.

Do not fix every weak text issue by making it bigger. Sometimes color or weight is the real problem.

## Common Typography Problem Detection

- Heading feels weak: size too close to body, weight too light, line-height too loose, low contrast, or nearby competition. Fix size, weight, contrast, or spacing around it.
- Text feels cramped: line-height too tight, paragraph too wide, or spacing between text blocks too small. Fix line-height, max-width, and vertical spacing.
- UI feels messy: too many font sizes, too many weights, inconsistent casing, or random line-heights. Reduce to a clear type scale.
- Button feels weak: text too small, weight too low, poor contrast, or padding too small. Use `14px` to `16px`, weight `600/700`, strong contrast, and proper padding.
- Mobile heading feels too huge: desktop font size not reduced, no clamp, or long text wrapping badly. Use responsive clamp and tighter line-height.
- Paragraph feels hard to read: too wide, too small, low line-height, or low contrast. Use `16px` to `18px`, line-height `1.5` to `1.7`, and max-width `55` to `75` characters.

## Typography Design Tokens

When creating tokens, use this structure:

```css
:root {
  --font-sans: system-ui, sans-serif;
  --font-heading: system-ui, sans-serif;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 40px;
  --text-5xl: 48px;
  --text-6xl: 56px;
  --text-7xl: 64px;
  --text-8xl: 72px;

  --leading-tight: 1.1;
  --leading-heading: 1.2;
  --leading-body: 1.6;
  --leading-small: 1.45;

  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;

  --hero-title: clamp(40px, 6vw, 72px);
  --section-title: clamp(32px, 4vw, 48px);
  --body-large: clamp(16px, 1.5vw, 18px);
}
```

## Feedback Output Format

When giving typography feedback, use this structure unless the user asks for another format:

**A. Typography Issue Detected**
Name what feels wrong: weak hierarchy, poor readability, inconsistent size, bad line-height, weak CTA text, heading too large/small, body too cramped, or mobile type issue.

**B. Why It Feels Wrong**
Explain using type hierarchy, scale, line-height, weight, spacing, contrast, or responsiveness.

**C. Formula Applied**
Mention the relevant rule: type scale, line-height formula, hierarchy formula, responsive clamp, text width rule, or component typography rule.

**D. Best Typography Decision**
Give the smallest correct fix.

**E. Implementation Values**
Give CSS/Tailwind-ready values.

**F. Responsive Adjustment**
Explain how font size and line-height should change on mobile/tablet.

Example tone:

```text
The heading is not weak because the font itself is bad. It is weak because its size and weight are too close to the paragraph below it. Increase the heading to 40px desktop, 32px mobile, use 700 weight, tighten line-height to 1.12, and keep 16px to 20px spacing before the paragraph.
```

## Quality Checklist

Before finalizing typography advice, check:

- Is the main heading clearly dominant?
- Are body texts readable?
- Are there too many font sizes?
- Are font weights used intentionally?
- Is line-height appropriate for each text role?
- Is paragraph width controlled?
- Is mobile typography reduced properly?
- Is CTA text clear and confident?
- Is muted text still readable?
- Does typography work with spacing and color?
- Does the type system feel reusable?
