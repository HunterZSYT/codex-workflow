---
name: dynamic-ui-color-contrast-logic
description: "Make strong UI color decisions using contrast theory, accessibility, brand consistency, component role, visual hierarchy, emotional tone, and neutral fallback rules. Use when designing, reviewing, or fixing UI colors, text/background contrast, CTA colors, icon visibility, badge colors, nav colors, form states, card surfaces, overlay text on images, brand palettes, Tailwind/CSS color tokens, or accessibility risks. Behaves like a senior UI designer; calculate exact WCAG contrast only when a relationship is uncertain, important, likely failing, or explicitly requested."
---

# Dynamic UI Color Contrast Logic

## Knowledge Blobs

Before implementing or reviewing precise color contrast decisions, consult:

- `C:\Users\acer\.codex\agentic-frontend\knowledge\color\contrast-ratio-formula.blob.md`
- `C:\Users\acer\.codex\agentic-frontend\knowledge\color\brand-safe-neutral-fallback.blob.md`

## Core Principle

Balance readability, accessibility, brand consistency, component role, visual hierarchy, emotional tone, and neutral fallback safety.

Use contrast formulas as a foundation, not as a reflex. Do not calculate every color pair. Recognize visual risk first, preserve brand intent, and make the smallest correct color adjustment.

## Review Workflow

1. Identify important foreground/background relationships:
   - Text on background
   - Icon on background
   - Button text on button background
   - Badge text on badge background
   - Link color on page background
   - Border color against surface
   - Card surface against page background
   - Muted text against background
   - Form input text against input background
   - Navigation text against navbar background
   - Overlay text on image/video

2. Classify each relationship by UI role:
   - Primary action
   - Secondary action
   - Navigation
   - Body content
   - Supporting content
   - Decorative element
   - Status element
   - Brand element
   - Functional icon
   - Form/control element

3. Rank its importance:
   - Critical: user must read or interact with it.
   - Important: user benefits from noticing it.
   - Secondary: useful but not dominant.
   - Decorative: does not need strong contrast.

Critical and important elements need stronger contrast than decorative elements.

## Quick Contrast Risk Detection

Before calculating, detect visual risks.

High-risk patterns:

- Dark foreground on medium/dark background
- Light foreground on light background
- Gray text on tinted background
- Thin icon on saturated background
- Brand color text on brand-tinted background
- Muted text used for important information
- CTA text too close to CTA background
- Border too close to card/page background
- Multiple similar shades competing without hierarchy
- Text placed on busy images without overlay
- Disabled-looking color used for active elements

Low-risk patterns:

- White text on dark navy/black
- Dark text on white/off-white
- Dark text on very light brand tint
- White icon on saturated/dark brand color
- Dark icon on very light surface
- Strong CTA background with white or dark readable text

If a high-risk pattern appears, pause and apply correction logic.

## Contrast Formula Foundation

Use WCAG contrast when needed:

```text
Contrast Ratio = (Lighter Color Luminance + 0.05) / (Darker Color Luminance + 0.05)
Relative luminance idea: L = 0.2126R + 0.7152G + 0.0722B
```

Targets:

- Normal text: minimum 4.5:1.
- Large text: minimum 3:1.
- Meaningful icons and UI controls: minimum 3:1.
- Professional UI target: important text/actions 4.5:1 or higher when possible.

Do not chase maximum contrast blindly. Strong contrast must support hierarchy, not flatten or damage the brand system.

## When To Calculate Exact Contrast

Calculate or mention exact contrast only when:

- The color pair is uncertain.
- The element is critical.
- The UI likely fails accessibility.
- The user asks specifically about contrast.
- Comparing two possible color fixes.
- Foreground/background brightness is too close.

Otherwise, use designer-level contrast reasoning and give corrected color direction.

## Brand-First Correction Logic

When contrast is weak, do not replace the color with a random "best contrast" color.

Correction priority:

1. Preserve the brand color if it has brand or component purpose.
2. Change the foreground color first.
3. If that fails, adjust the background shade/tint.
4. If that still fails, use a neutral fallback.
5. Only introduce a new semantic color if it supports meaning.
6. Avoid unrelated colors just because they contrast well.

Examples:

- Dark icon on medium brand color: keep the brand background, switch the icon to white/near-white. If the icon must remain dark, make the background much lighter.
- Brand-colored text on brand-tinted surface: keep the soft surface, switch text to dark neutral or brand-dark. Do not introduce a new accent.
- Failing CTA: preserve the primary action role, then adjust text color, button shade, or hover state so it remains stronger than secondary actions.

## Foreground/Background Decision Script

- If background is dark: use white or near-white foreground. Avoid black, dark navy, or muted gray foreground.
- If background is light: use dark neutral or brand-dark foreground. Avoid pale gray for important text.
- If background is medium saturation: use white foreground only if the background is dark enough; use very dark foreground only if the background is light enough; avoid dark-on-medium and light-on-medium uncertainty.
- If background is brand color: try white or near-white first. If white is too harsh, use a very light neutral. Avoid placing another saturated color on top.
- If foreground and background have similar brightness: change one side only, prefer changing foreground first, and preserve the background if it carries brand identity.

## Role-Based Color Logic

- Primary CTA: highest action contrast, usually solid background, clearly readable text, stronger than nav links and secondary buttons.
- Secondary CTA: lower visual weight than primary, often border/ghost/soft tint, still readable and clickable.
- Icon button: use dark surface + light icon, or light surface + dark icon. Avoid dark icon on medium color and light icon on pale color. Functional icons need stronger contrast than decorative icons.
- Navbar: readable navigation text that does not overpower CTA. Active state may use brand color. Hover may use soft brand tint or underline.
- Cards: separate card surface from page background. Keep text dark enough. Borders/shadows should be subtle but visible.
- Forms: readable labels and input text. Placeholders can be softer but not invisible. Error/success colors must be distinguishable. Focus state must be visible.
- Hero/image overlay: if text sits on image/video, check contrast visually. Add overlay, gradient, blur layer, or move text when readability is weak.

## Neutral Fallback System

Use neutral fallbacks when brand colors conflict or create visual noise.

Foreground fallback order:

1. White
2. Near-white
3. Dark navy
4. Charcoal
5. Dark gray
6. Medium gray only for secondary text

Background fallback order:

1. White
2. Off-white
3. Very light neutral
4. Very light brand tint
5. Dark navy/charcoal for premium contrast sections

Neutral colors protect readability and let brand colors stay meaningful.

## Contrast Hierarchy

Strongest contrast:

- Primary CTA
- Main heading
- Important actions
- Key navigation states
- Form inputs and labels

Medium contrast:

- Body text
- Card titles
- Supporting UI controls

Lower contrast:

- Muted descriptions
- Borders
- Dividers
- Decorative backgrounds
- Disabled elements

Do not make every element equally strong. If everything is high contrast, hierarchy weakens. If everything is soft, usability weakens.

## Feedback Output Format

When giving color feedback, use this structure unless the user asks for a different format:

**A. Color Issue Detected**
Name the foreground/background relationship that feels weak.

**B. Why It Is a Problem**
Explain using contrast, luminance, hierarchy, or brand logic.

**C. Design Constraint**
State what should be preserved: brand color, CTA role, visual hierarchy, neutral system, or component meaning.

**D. Best Color Decision**
Give the smallest correct fix.

**E. Alternative Options**
Provide one or two alternatives if useful.

**F. Implementation Values**
Give CSS/Tailwind-ready values when possible.

Example tone:

```text
The issue is not that the color is wrong emotionally. The issue is that the foreground and background are too close in luminance. Since the background color is part of the brand system, preserve it and switch the foreground to a neutral light color. That fixes contrast without introducing an unrelated color.
```

## Quality Checklist

Before finalizing color advice, check:

- Is important text readable?
- Is the CTA visually clear?
- Are functional icons visible?
- Are brand colors preserved where possible?
- Did the fix avoid unnecessary new colors?
- Did a neutral fallback solve the issue cleanly?
- Is hierarchy better after the change?
- Are decorative colors softer than functional colors?
- Are hover/focus/active states still clear?
