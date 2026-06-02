const path = require("path");
const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const writeGood = require("write-good");

const app = express();
const PORT = 3077;
const SYSTEM_DIR = path.join(__dirname, "..", "references");

app.use(cors());
app.use(express.json({ limit: "2mb" }));

function loadText(fileName) {
  return fs.readFileSync(path.join(SYSTEM_DIR, fileName), "utf8");
}

function loadJson(fileName) {
  return fs.readJsonSync(path.join(SYSTEM_DIR, fileName));
}

function getProfile(profileName, profiles) {
  return profiles[profileName] || profiles.academic_report;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function splitSentences(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function countSeverity(issues) {
  return {
    issue_count: issues.length,
    high_priority: issues.filter((issue) => issue.severity === "high").length,
    medium_priority: issues.filter((issue) => issue.severity === "medium").length,
    low_priority: issues.filter((issue) => issue.severity === "low").length
  };
}

function addPhraseIssues(text, phrases, type, severity, message, issues) {
  for (const phrase of phrases) {
    const pattern = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "gi");
    const matches = text.match(pattern);
    if (matches) {
      issues.push({
        type,
        phrase,
        message,
        severity,
        count: matches.length
      });
    }
  }
}

function detectVagueWords(text, words, issues) {
  for (const word of words) {
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "gi");
    const matches = text.match(pattern);
    if (matches) {
      issues.push({
        type: "vague_word",
        phrase: word,
        message: "Replace with a more specific word or explain what this refers to.",
        severity: "low",
        count: matches.length
      });
    }
  }
}

function detectLongSentences(text, issues) {
  for (const sentence of splitSentences(text)) {
    const wordCount = sentence.split(/\s+/).filter(Boolean).length;
    if (wordCount > 35) {
      issues.push({
        type: "long_sentence",
        phrase: sentence,
        message: `Sentence is ${wordCount} words. Consider splitting or tightening it.`,
        severity: "medium",
        word_count: wordCount
      });
    }
  }
}

function detectRepeatedPhrases(text, issues) {
  const words = normalizeText(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const repeated = new Map();

  for (let size = 3; size <= 5; size += 1) {
    const seen = new Map();
    for (let index = 0; index <= words.length - size; index += 1) {
      const phrase = words.slice(index, index + size).join(" ");
      seen.set(phrase, (seen.get(phrase) || 0) + 1);
    }
    for (const [phrase, count] of seen.entries()) {
      if (count > 1) {
        repeated.set(phrase, Math.max(repeated.get(phrase) || 0, count));
      }
    }
  }

  for (const [phrase, count] of repeated.entries()) {
    issues.push({
      type: "repeated_phrase",
      phrase,
      message: "This phrase appears more than once. Vary the wording if the repetition is not intentional.",
      severity: "low",
      count
    });
  }
}

function detectRepeatedSentenceStarts(text, issues) {
  const starts = new Map();
  for (const sentence of splitSentences(text)) {
    const start = sentence
      .toLowerCase()
      .replace(/[^a-z0-9\s']/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 3)
      .join(" ");
    if (start) {
      starts.set(start, (starts.get(start) || 0) + 1);
    }
  }

  for (const [phrase, count] of starts.entries()) {
    if (count > 1) {
      issues.push({
        type: "repeated_sentence_start",
        phrase,
        message: "Several sentences start the same way. Vary sentence openings for a more natural rhythm.",
        severity: "low",
        count
      });
    }
  }
}

function recommendedDirection(issues, profile) {
  const directions = [];
  if (issues.some((issue) => issue.type === "banned_phrase")) {
    directions.push("Replace generic or robotic phrasing with specific details tied to the topic.");
  }
  if (issues.some((issue) => issue.type === "weak_phrase" || issue.type === "vague_word")) {
    directions.push("Clarify vague wording with concrete subjects, actions, tools, outcomes, or evidence.");
  }
  if (issues.some((issue) => issue.type === "long_sentence")) {
    directions.push("Split long sentences and keep one main idea per sentence.");
  }
  if (issues.some((issue) => issue.type === "repeated_phrase" || issue.type === "repeated_sentence_start")) {
    directions.push("Vary repeated wording and sentence patterns while keeping terminology consistent where needed.");
  }
  directions.push(`Match the selected profile tone: ${profile.tone}`);
  return directions;
}

function runChecks(text, profileName) {
  const banned = loadJson("banned-phrases.json");
  const profiles = loadJson("writing-profiles.json");
  const profile = getProfile(profileName, profiles);
  const selectedProfileName = profiles[profileName] ? profileName : "academic_report";
  const sourceText = String(text || "");
  const issues = [];

  addPhraseIssues(
    sourceText,
    banned.robotic_phrases,
    "banned_phrase",
    "medium",
    "Replace with a more specific, natural phrase.",
    issues
  );
  addPhraseIssues(
    sourceText,
    banned.weak_phrases,
    "weak_phrase",
    "medium",
    "Replace with a clearer and more concrete explanation.",
    issues
  );
  detectVagueWords(sourceText, banned.vague_words, issues);
  detectLongSentences(sourceText, issues);
  detectRepeatedPhrases(sourceText, issues);
  detectRepeatedSentenceStarts(sourceText, issues);

  const writeGoodSuggestions = writeGood(sourceText).map((suggestion) => ({
    reason: suggestion.reason,
    index: suggestion.index,
    offset: suggestion.offset
  }));

  return {
    profile: selectedProfileName,
    summary: countSeverity(issues),
    issues,
    write_good: writeGoodSuggestions,
    profile_guidance: profile,
    recommended_direction: recommendedDirection(issues, profile)
  };
}

function buildContext(profileName, purpose, topic, notes) {
  const banned = loadJson("banned-phrases.json");
  const profiles = loadJson("writing-profiles.json");
  const profile = getProfile(profileName, profiles);

  return {
    profile: profiles[profileName] ? profileName : "academic_report",
    purpose: purpose || "",
    topic: topic || "",
    notes: notes || "",
    tone: profile.tone,
    structure_guidance: profile.rules,
    writing_rules: [
      "Ground claims in the available facts.",
      "Use specific wording instead of generic filler.",
      "Keep paragraphs focused and readable.",
      "Do not invent facts, dates, sources, tools, results, or project work."
    ],
    words_phrases_to_avoid: banned,
    preferred_phrasing_style: profile.preferred_phrasing_style,
    paragraph_guidance: profile.paragraph_guidance,
    profile_specific_reminders: profile.rules
  };
}

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "writer-system"
  });
});

app.get("/stylecard", (_req, res) => {
  res.type("text/markdown").send(loadText("stylecard.md"));
});

app.get("/profiles", (_req, res) => {
  res.json(loadJson("writing-profiles.json"));
});

app.post("/check", (req, res) => {
  res.json(runChecks(req.body.text, req.body.profile));
});

app.post("/context", (req, res) => {
  const { profile, purpose, topic, notes } = req.body || {};
  res.json(buildContext(profile, purpose, topic, notes));
});

app.post("/prepare", (req, res) => {
  const { text, profile, purpose } = req.body || {};
  const check = runChecks(text, profile);
  res.json({
    profile: check.profile,
    purpose: purpose || "",
    detected_issues: check.issues,
    writing_direction: check.recommended_direction,
    tone_adjustments: [`Use tone: ${check.profile_guidance.tone}`],
    clarity_suggestions: check.recommended_direction.filter((item) => item.toLowerCase().includes("clar")),
    vague_wording_warnings: check.issues.filter((issue) => issue.type === "vague_word" || issue.type === "weak_phrase"),
    repeated_language_warnings: check.issues.filter(
      (issue) => issue.type === "repeated_phrase" || issue.type === "repeated_sentence_start"
    )
  });
});

app.listen(PORT, () => {
  console.log(`writer-system listening on http://localhost:${PORT}`);
});
