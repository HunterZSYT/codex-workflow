# Knowledge Product Policy

## Purpose

Turn loose reusable guidance into source-grounded, artifact-backed Knowledge Products without letting the agent invent new systems randomly.

Core rule: the AI agent is an orchestrator first and a generator second.

## Product Types

### Knowledge Blob

Use a blob for small, precise knowledge:

- formulas
- small rules
- implementation patterns
- safety rules
- verification formulas

Examples:

- `contrast-ratio-formula.blob.md`
- `gsap-react-scrolltrigger.blob.md`

### Capability Pack

Use a pack for reusable domain systems that need research, decisions, specs, artifacts, and verification:

- design systems
- layout systems
- animation systems
- backend implementation patterns
- operational checklists/templates

Examples:

- `frontend.layout.swiss-editorial-grid`
- `frontend.motion.gsap-lenis-scroll-scene`
- `backend.email.phpmailer-form-handler`

### Artifact

Use artifacts for reusable implementation assets:

- CSS files
- Tailwind snippets
- React/shadcn examples
- section templates
- checklists
- command recipes
- reference inventories

### Source Ledger

Use source ledgers for grounding:

- official docs
- standards
- GitHub repos
- Context7 docs
- user-provided references
- public examples inspected for patterns

Do not copy proprietary assets, exact layouts, source code, or full article text into packs.

## Required Behavior

Before creating a new blob, pack, artifact, script, skill, MCP note, or doc:

1. Run indexed retrieval.
2. Inspect related items.
3. Run dedupe review when overlap is plausible.
4. Check candidate/stale entries.
5. Decide whether to use, update, cross-reference, create candidate, create artifact, or do nothing.

New packs start as `draft` or `candidate`.

Activation requires approval. Do not mark a pack `active` unless the user approves and promotion checks pass.

## Maturity Rules

- `idea`: concept only
- `researched`: source or internal research exists, but not a ready system
- `specified`: exact values/rules exist
- `artifact_backed`: reusable artifacts or apply commands exist
- `verified`: artifact-backed and verification criteria have been proven

A pack is not reusable if it only contains advice. If there are no artifacts, apply commands, or exact specs, keep it candidate/researched.

## Naming

Use namespace naming:

`<domain>.<capability_class>.<specific_pattern>`

Examples:

- `frontend.layout.swiss-editorial-grid`
- `frontend.motion.gsap-react-scrolltrigger`
- `frontend.components.shadcn-primitives`
- `backend.email.phpmailer-form-handler`
- `vps.webserver.nginx-edit-safety`
- `project_manager.retrieval.knowledge-index`

Do not create vague names like `modern-ui`, `cool-layout`, or `premium-design` unless they are part of a defined taxonomy.
