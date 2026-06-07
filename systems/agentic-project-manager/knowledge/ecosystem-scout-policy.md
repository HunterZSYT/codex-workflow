# Ecosystem Scout & Reuse-First Discovery Policy

Core rule:

Reuse first. Orchestrate second. Generate last.

The agent must scout existing ecosystems before proposing custom generation when a task involves:

- a new domain
- a new library, tool, package, MCP, or integration
- UI/component sources
- WordPress, WooCommerce, theme, block, or plugin work
- animation or motion systems
- frontend frameworks
- backend, database, VPS, deployment, or server tools
- AI coding tools
- testing, browser, or DevTools workflows
- design systems
- templates, starter kits, or boilerplates
- "best stack"
- "best way"
- "what should we use"
- "fill knowledgebase"
- "add integration knowledge"
- "build using best tools"
- "make this production-ready"

The agent should discover options the user did not name.

## Required Behavior

Before creating a new blob, pack, script, MCP config, skill, or custom implementation, the agent must:

1. Retrieve existing local system knowledge.
2. Scout external ecosystems for reusable tools and sources.
3. Compare options with the ecosystem option scorecard.
4. Decide placement in the Codex Workflow architecture.
5. Create or update knowledge with a source ledger.
6. AI-audit the result.
7. Auto-activate safe source-backed knowledge when validation and redaction pass.
8. Ask for implementation or integration approval when risky execution is involved.

## Example

If the user says "WordPress animated theme knowledge", do not only research WordPress docs and GSAP.

Also scout:

- official WordPress theme docs
- block theme ecosystem
- classic theme starters
- WP-CLI scaffolding
- starter themes
- WooCommerce theme docs if ecommerce is relevant
- animation libraries
- gallery and carousel libraries
- GitHub repositories and starter kits
- npm packages
- WordPress plugin and theme directories
- reusable component and pattern sources
- relevant MCPs or CLIs

## Boundaries

- Do not install tools without approval.
- Do not create new skills by default.
- Do not create custom crawlers in this pass.
- Do not copy proprietary code, assets, or layouts.
- Public examples are leads and pattern references only.
- Safe source-backed knowledge may auto-activate after AI audit.
- Weak, unclear, risky, install-dependent, or approval-dependent knowledge stays candidate.
