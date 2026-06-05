import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

export const PM_ROOT = path.join(os.homedir(), ".codex", "agentic-project-manager");
export const FRONTEND_ROOT = path.join(os.homedir(), ".codex", "agentic-frontend");
export const BACKEND_ROOT = path.join(os.homedir(), ".codex", "agentic-backend-database");
export const SKILLS_ROOT = path.join(os.homedir(), ".codex", "skills");
export const LEARNING_ROOT = path.join(PM_ROOT, "learning");
export const KNOWLEDGE_ROOT = path.join(PM_ROOT, "knowledge");

export async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

export function arg(name, fallback = "") {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

export function slug(text) {
  return String(text || "task").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "task";
}

export async function ensureAiTask() {
  const dir = path.join(process.cwd(), ".ai-task");
  await fs.mkdir(dir, { recursive: true });
  await fs.mkdir(path.join(dir, "archive"), { recursive: true });
  return dir;
}

export async function ensureTaskLearningFiles() {
  const dir = await ensureAiTask();
  await copyTemplate("error-ledger-template.md", path.join(dir, "error-ledger.md"));
  await copyTemplate("failed-commands-template.md", path.join(dir, "failed-commands.md"));
  await copyTemplate("decision-review-template.md", path.join(dir, "decision-review.md"));
  await copyTemplate("user-response-ledger-template.md", path.join(dir, "user-response-ledger.md"));
  return dir;
}

export async function copyTemplate(name, dest) {
  const src = path.join(PM_ROOT, "templates", name);
  if (!(await exists(dest))) await fs.copyFile(src, dest);
}

export function classifyTask(task) {
  const t = String(task || "").toLowerCase();
  const types = [];
  const add = (type, rx) => { if (rx.test(t)) types.push(type); };
  const externalToolTerms = [
    "gsap", "scrolltrigger", "lenis", "shadcn", "tailwind", "phpmailer", "prisma", "drizzle",
    "supabase", "stripe", "docker", "nginx", "caddy", "pm2", "systemd", "codegraph",
    "understand anything", "serena", "wordpress", "woocommerce", "carousel library", "gallery library",
    "mcp server", "starter kit", "component source", "registry", "theme.json", "wp_enqueue_script",
    "wp_enqueue_style", "create block theme", "roots sage", "underscores", "scrolltrigger wordpress",
    "lenis wordpress", "gsap wordpress", "headroom", "headroom-ai", "context compression",
    "token compression", "reversible compression", "compress tool outputs", "compress logs", "ccr"
  ];
  const orchestrationPhrases = [
    "figure out everything needed", "use every necessary tool", "take control", "best practice",
    "production-ready", "no primitive manually", "clone this site", "setup backend",
    "setup database", "setup server", "automate this workflow", "choose the right stack",
    "scout ecosystem", "fill knowledgebase", "add integration knowledge", "best stack",
    "best tool", "best library", "what tools exist", "what should we use", "find reusable sources",
    "build with existing tools", "don't generate from scratch", "research and add",
    "absorb this repo", "absorb into our system", "learn from this repo", "mine this repo",
    "strip goodies", "extract workflow", "copy useful patterns", "source reference",
    "wordpress theme ecosystem", "woocommerce theme ecosystem", "wordpress starter theme",
    "wordpress design system", "animated wordpress theme", "integrate headroom", "try headroom",
    "use headroom", "context compression integration"
  ];
  const detectedKnowledgeTerms = externalToolTerms.filter(term => t.includes(term));
  const detectedOrchestrationPhrases = orchestrationPhrases.filter(term => t.includes(term));
  add("SQL operation", /\bsql\b|query|drop|truncate|delete from|update .*where|select .*from/);
  add("database/schema", /database|schema|migration|prisma|drizzle|postgres|mysql|sqlite|mongo|redis/);
  add("VPS/SSH/server", /ssh|vps|server|nginx|apache|caddy|systemd|pm2|docker|firewall|server logs?|vps logs?|nginx logs?|apache logs?/);
  add("backend/API", /api|endpoint|route|controller|backend|server action|webhook|auth|jwt/);
  add("WordPress theme development", /wordpress theme|wp theme|block theme|classic theme|theme\.json|functions\.php|wp_enqueue_script|wp_enqueue_style|create block theme|roots sage|underscores|_s/);
  add("WooCommerce theme development", /woocommerce theme|woocommerce template|woocommerce hooks|single product template|archive product|checkout template|product gallery|product carousel/);
  add("deployment", /deploy|deployment|production|release|rollback|ssl|domain/);
  add("security/env/secrets", /\.env|secret|token|password|credential|security|auth/);
  add("codebase knowledge graph recon", /understand .*project|understand .*codebase|codebase.*understand|architecture|dependency|dependencies|onboarding|impact analysis|business.*flow|project.*flow|codebase.*flow/);
  add("codegraph impact tracing", /codegraph|caller|callee|symbol|symbols|what uses|who uses|depends on|depend on|dependency path|impact|what breaks|trace .*function|trace .*class|route.*service|service.*component/);
  add("semantic navigation", /serena|semantic navigation|semantic search|locate .*symbol|find .*class|find .*function/);
  add("accessibility", /accessibility|a11y|aria|keyboard|focus|screen reader/);
  add("performance", /performance|slow|lighthouse|core web vitals|latency|speed/);
  add("design-to-code", /figma|design|screenshot|mockup/);
  add("static/template conversion", /static template|html template|template conversion/);
  add("frontend visual/layout", /mobile|responsive|layout|spacing|color|typography|overflow|sticky|screenshot|visual|css/);
  add("frontend component", /component|shadcn|radix|button|modal|dialog|card|navbar/);
  add("capability orchestration", /gsap|scrolltrigger|lenis|shadcn|tailwind|phpmailer|prisma|drizzle|supabase|stripe|docker|nginx|caddy|pm2|systemd|codegraph|understand anything|figure out everything needed|use every necessary tool|best practice|production-ready|no primitive manually|clone this site|choose the right stack/);
  add("context compression", /headroom|headroom-ai|context compression|token compression|reversible compression|compress tool outputs|compress logs|\bccr\b/);
  add("open-source repo absorption", /github\.com\/[\w.-]+\/[\w.-]+.*(absorb|learn from|mine|strip|extract|source reference|copy useful)|\b(absorb|learn from|mine|strip|extract)\b.*\b(repo|repository)\b/);
  add("copy/content-only", /\b(copy|headline|text|content|rewrite|cta)\b/);
  const unique = [...new Set(types)];
  const risky = unique.some(x => /SQL|database|VPS|deployment|security/.test(x));
  const visual = unique.some(x => /frontend|design/.test(x));
  const backend = unique.some(x => /backend|database|SQL|VPS|deployment|security/.test(x));
  const recon = unique.includes("codebase knowledge graph recon");
  const graphTrace = unique.includes("codegraph impact tracing");
  const semanticNav = unique.includes("semantic navigation");
  const capabilityOrchestrationRecommended = detectedKnowledgeTerms.length > 0 || detectedOrchestrationPhrases.length > 0 || unique.includes("capability orchestration") || risky || unique.length > 1;
  const type = unique.length > 1 ? "mixed" : unique[0] || "unknown";
  const frontendLayerScope = classifyFrontendLayerScope(t);
  const skills = [];
  if (visual) skills.push("frontend-tool-orchestrator", "frontend-inspection-discipline");
  if (backend) skills.push("backend-database-tool-orchestrator");
  if (recon || graphTrace || semanticNav) skills.push("codebase-recon-orchestrator", "task-routing-and-skill-selection");
  if (recon) skills.push("codebase-knowledge-graph-recon");
  if (unique.includes("SQL operation")) skills.push("sql-operations-gate");
  if (unique.includes("database/schema")) skills.push("database-safety-orchestrator");
  if (unique.includes("VPS/SSH/server")) skills.push("vps-ssh-operations-gate");
  if (unique.includes("deployment")) skills.push("deployment-readiness-gate");
  if (unique.includes("security/env/secrets")) skills.push("security-env-secrets-gate");
  if (unique.includes("accessibility")) skills.push("accessibility-gate");
  if (unique.includes("performance")) skills.push(backend ? "backend-performance-triage" : "performance-triage");
  if (unique.includes("frontend component")) skills.push("component-supply-router", "library-first-ui-builder");
  if (capabilityOrchestrationRecommended) skills.push("project-manager-execution-ledger", "task-routing-and-skill-selection");
  if (unique.includes("design-to-code")) skills.push("design-source-grounding");
  const tools = [];
  if (visual) tools.push("frontend-inspect.mjs when visual proof is needed");
  if (backend) tools.push("backend project/API/DB scanners as relevant");
  if (recon) tools.push("project capability scan first, then Understand Anything for architecture/onboarding/domain flow");
  if (graphTrace) tools.push("CodeGraph for symbol usage, caller/callee tracing, dependency paths, and impact analysis");
  if (semanticNav) tools.push("Serena semantic navigation when available for targeted symbol/class/function context");
  if (capabilityOrchestrationRecommended) tools.push("pm-knowledge-gap.mjs for Capability Orchestration Radar and knowledge blob status");
  if (unique.includes("context compression")) tools.push("pm-headroom-status.mjs and pm-headroom-context.mjs for explicit Headroom SDK pilot checks");
  if (unique.includes("SQL operation")) tools.push("sql-safety-check.mjs");
  if (unique.includes("VPS/SSH/server")) tools.push("vps-* read-only scripts");
  const smallLocalized = /fix|change|update|adjust/.test(t) && /button|padding|copy|text|headline|label/.test(t) && !/large|unknown|architecture|depends on|impact|caller|callee|what uses|what breaks/.test(t);
  return {
    task,
    type,
    detectedTypes: unique,
    riskLevel: risky ? "high" : unique.length > 1 ? "medium" : "low",
    suggestedSkills: [...new Set(skills)],
    suggestedTools: [...new Set(tools)],
    needsTracking: risky || (!smallLocalized && (unique.length > 1 || t.length > 140 || recon || graphTrace || capabilityOrchestrationRecommended)),
    screenshotsNeeded: visual && !unique.includes("copy/content-only"),
    buildTestNeeded: !unique.includes("copy/content-only") && (visual || backend),
    backendDatabaseSafetyGatesNeeded: backend,
    userApprovalBeforeWrites: risky,
    frontendLayerScope,
    capabilityOrchestration: capabilityOrchestrationRecommended
      ? {
          recommended: true,
          detectedKnowledgeTerms,
          detectedOrchestrationPhrases,
          registry: path.join(KNOWLEDGE_ROOT, "knowledge-registry.json"),
          tool: "pm-knowledge-gap.mjs"
        }
      : { recommended: false },
    codebaseIntelligence: graphTrace
      ? "CodeGraph or Serena preferred for precise symbol/dependency/impact tracing"
      : recon
        ? "Understand Anything preferred for high-level architecture/onboarding/domain understanding"
        : semanticNav
          ? "Serena preferred when semantic navigation is available"
          : "normal search/read first; escalate only if direct inspection is insufficient"
  };
}

export function classifyFrontendLayerScope(t) {
  const text = String(t || "").toLowerCase();
  const layers = [];
  const scopes = [];
  const owners = [];
  const verification = [];
  const add = (list, value) => { if (!list.includes(value)) list.push(value); };
  const hit = rx => rx.test(text);

  if (hit(/layout|grid|container|alignment|hero|section|page|overflow|sticky|sidebar|dashboard/)) {
    add(layers, "Layout Structure");
    add(owners, "layout-composition-fundamentals");
  }
  if (hit(/spacing|padding|margin|gap|rhythm|density|crowded|empty|breathing/)) {
    add(layers, "Spacing Rhythm");
    add(owners, "dynamic-ui-spacing-rhythm-logic");
  }
  if (hit(/typography|font|text|heading|headline|line-height|readability|type scale|copy/)) {
    add(layers, "Typography System");
    add(owners, "dynamic-ui-typography-logic");
  }
  if (hit(/color|contrast|palette|foreground|background|brand|hover color|state color/)) {
    add(layers, "Color & Contrast System");
    add(owners, "dynamic-ui-color-contrast-logic");
  }
  if (hit(/button|input|card|modal|dialog|tab|accordion|component|primitive|shadcn|radix/)) {
    add(layers, "Component Primitive System");
    add(owners, "component-supply-router");
    add(owners, "library-first-ui-builder");
  }
  if (hit(/hover|focus|focus-visible|active|pressed|disabled|loading|selected|current|expanded|collapsed|state/)) {
    add(layers, "Interaction Feedback");
    add(owners, "frontend.interaction.interaction-feedback-states");
    add(verification, "interaction state proof when visual/behavioral claim is made");
  }
  if (hit(/motion|animation|transition|scroll|gsap|lenis|framer|reveal/)) {
    add(layers, "Motion System");
    add(owners, "motion-quality-router");
  }
  if (hit(/responsive|mobile|tablet|breakpoint|wide|narrow|stack|reflow|resize/)) {
    add(layers, "Responsive Structure");
    add(owners, "frontend.responsive.responsive-structure-adaptation");
    add(verification, "mobile emulation for mobile claims");
  }
  if (hit(/accessibility|a11y|aria|keyboard|screen reader|label|semantic|focus/)) {
    add(layers, "Accessibility & Semantics");
    add(owners, "accessibility-gate");
  }
  if (hit(/content|information architecture|ia|cta|message|scan path|section order/)) {
    add(layers, "Content & Information Architecture");
    add(owners, "project-manager-execution-ledger");
  }
  if (hit(/image|media|icon|video|aspect ratio|object-fit|crop|avatar|illustration/)) {
    add(layers, "Visual Media System");
    add(owners, "frontend.media.visual-media-system");
  }
  if (hit(/form|field|input|placeholder|validation|submit|required|optional|helper|error/)) {
    add(layers, "Form & Input System");
    add(owners, "frontend.forms.form-input-system");
  }
  if (hit(/empty|skeleton|success|no-results|offline|permission|error state|loading state/)) {
    add(layers, "State System");
    add(owners, "frontend.state.frontend-state-system");
  }
  if (hit(/nav|navbar|navigation|header|menu|breadcrumb|route|sticky header|mobile menu/)) {
    add(layers, "Navigation System");
    add(owners, "frontend.navigation.navigation-system");
  }
  if (hit(/performance|lighthouse|core web vitals|lcp|cls|bundle|lazy|layout shift/)) {
    add(layers, "Performance System");
    add(owners, "performance-triage");
  }
  if (hit(/verify|proof|screenshot|inspect|dom measurement|overflow|visual claim/)) {
    add(layers, "Verification System");
    add(owners, "frontend-inspection-discipline");
  }

  if (hit(/token|variable|css var|design token|theme token|radius|shadow|duration/)) add(scopes, "token");
  if (hit(/label|icon|badge|image|text|button text/)) add(scopes, "element");
  if (hit(/button|input|card|modal|dialog|tab|accordion|navbar item|component/)) add(scopes, "primitive component");
  if (hit(/card grid|form group|nav group|pricing group|gallery|component group/)) add(scopes, "component group");
  if (hit(/section|hero|feature|testimonial|pricing|faq|contact|product section/)) add(scopes, "section");
  if (hit(/page|landing|dashboard|checkout|article|product page/)) add(scopes, "page");
  if (hit(/template|layout template|page structure/)) add(scopes, "template");
  if (hit(/site|system|global|theme|design system|navigation language|whole/)) add(scopes, "site/system");
  if (!scopes.length && layers.length) add(scopes, "component/section");
  if (!verification.length && hit(/visual|layout|responsive|mobile|hover|focus|sticky|overflow/)) add(verification, "rendered inspection when claiming visual success");
  if (hit(/accessibility|form|nav|keyboard|focus|aria/)) add(verification, "keyboard/focus/semantic accessibility review");
  if (hit(/performance|image|media|cls|lcp/)) add(verification, "performance/media check only when in scope");

  return {
    applicable: layers.length > 0,
    layers,
    scopes,
    ownerKnowledge: owners,
    localOrSystemic: scopes.some(s => /template|site|system|token/.test(s)) ? "systemic risk" : "local unless reused component/token is touched",
    verification
  };
}

export function roadmapFor(task) {
  const c = classifyTask(task);
  const packets = ["Discovery", "Planning"];
  if (c.type !== "copy/content-only") packets.push("Implementation");
  packets.push("Verification", "Cleanup", "Completion report");
  return { classification: c, packets };
}

export async function append(file, text) {
  const dir = await ensureAiTask();
  await fs.appendFile(path.join(dir, file), text);
}

export function redact(value = "") {
  return String(value)
    .replace(/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, "[REDACTED_PRIVATE_KEY]")
    .replace(/\b(Bearer|Basic)\s+[A-Za-z0-9._~+/=-]+/gi, "$1 [REDACTED_AUTH]")
    .replace(/(authorization|cookie|set-cookie)\s*[:=]\s*[^\n\r]+/gi, "$1: [REDACTED]")
    .replace(/\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "[REDACTED_EMAIL]")
    .replace(/\b(?:postgres|postgresql|mysql|mariadb|mongodb|redis):\/\/[^\s"'`]+/gi, "[REDACTED_DB_URL]")
    .replace(/(?i:((?:api[_-]?key|token|secret|password|passwd|pwd)\s*[:=]\s*))["']?[^"'\s]+/g, "$1[REDACTED]")
    .replace(/C:\\Users\\[^\\\s]+\\\.ssh\\[^\s]+/gi, "[REDACTED_SSH_PATH]");
}

export function categoryTargets(category = "") {
  const c = String(category).toLowerCase();
  if (/routing|wrong skill|tool misuse/.test(c)) return ["routing-lessons.md"];
  if (/tool unavailable|environment|mcp|playwright|ssh|permission|missing/.test(c)) return ["tool-failure-patterns.md"];
  if (/verification|loop/.test(c)) return ["verification-mistakes.md"];
  return ["error-patterns.md"];
}
