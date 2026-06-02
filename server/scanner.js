import { readFileSync } from 'node:fs';
import { dirname, basename, sep } from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { loadConfig, expandPath } from './config.js';

function slugify(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Pull a short one-line summary out of a (potentially long) description. */
function summarize(description) {
  if (!description) return '';
  // Strip leading "Use this skill ..." boilerplate, take first sentence.
  const cleaned = description.replace(/\s+/g, ' ').trim();
  const firstSentence = cleaned.split(/(?<=[.。!?])\s/)[0];
  return firstSentence.length > 140 ? firstSentence.slice(0, 137) + '…' : firstSentence;
}

/** Extract likely trigger phrases from a description. */
function extractTriggers(description) {
  if (!description) return [];
  const triggers = [];
  const text = description.replace(/\s+/g, ' ');
  // Quoted phrases are usually concrete triggers.
  for (const m of text.matchAll(/['"]([^'"]{2,40})['"]/g)) triggers.push(m[1]);
  return [...new Set(triggers)].slice(0, 12);
}

function classify(name, description, rules, fallback) {
  const hay = `${name} ${description}`.toLowerCase();
  for (const rule of rules || []) {
    if ((rule.keywords || []).some((k) => hay.includes(k.toLowerCase()))) {
      return rule.category || rule.tag;
    }
  }
  return fallback;
}

function deriveTags(name, description, frontmatterTags, tagRules) {
  const tags = new Set();
  if (Array.isArray(frontmatterTags)) frontmatterTags.forEach((t) => tags.add(String(t)));
  const hay = `${name} ${description}`.toLowerCase();
  for (const rule of tagRules || []) {
    if ((rule.keywords || []).some((k) => hay.includes(k.toLowerCase()))) tags.add(rule.tag);
  }
  return [...tags];
}

function pluginNameFromPath(dir) {
  const parts = dir.split(sep);
  const i = parts.indexOf('plugins');
  return i >= 0 && parts[i + 1] ? parts[i + 1] : undefined;
}

/**
 * Scan all configured roots for SKILL.md files and build skill records.
 * Returns { skills, scannedRoots, missingRoots }.
 */
export function scanSkills() {
  const config = loadConfig();
  const skills = [];
  const scannedRoots = [];
  const missingRoots = [];
  const seen = new Set();

  for (const root of config.roots || []) {
    // A root may contain a glob (e.g. plugins/*/skills); expand it to real dirs.
    const pattern = expandPath(root.path);
    const dirs = fg.sync(pattern, { onlyDirectories: true, suppressErrors: true });

    if (dirs.length === 0) {
      missingRoots.push(pattern);
      continue;
    }

    for (const dir of dirs) {
      scannedRoots.push(dir);
      const files = fg.sync('**/SKILL.md', {
        cwd: dir,
        absolute: true,
        deep: config.maxDepth || 4,
        suppressErrors: true,
        ignore: ['**/node_modules/**'],
      });

      for (const file of files) {
        let parsed;
        try {
          parsed = matter(readFileSync(file, 'utf-8'));
        } catch {
          continue;
        }
        const fm = parsed.data || {};
        const skillDir = dirname(file);
        const name = fm.name || basename(skillDir);
        const description = fm.description || '';
        const id = `${root.source}-${slugify(name)}`;
        if (seen.has(id)) continue;
        seen.add(id);

        const allowedTools = fm['allowed-tools'] || fm.allowedTools;

        skills.push({
          id,
          name,
          summary: summarize(description),
          description,
          category: classify(name, description, config.categoryRules, 'uncategorized'),
          tags: deriveTags(name, description, fm.tags, config.tagRules),
          source: root.source,
          pluginName: root.source === 'plugin' ? pluginNameFromPath(skillDir) : undefined,
          license: fm.license,
          allowedTools: Array.isArray(allowedTools)
            ? allowedTools
            : typeof allowedTools === 'string'
              ? allowedTools.split(',').map((s) => s.trim()).filter(Boolean)
              : undefined,
          invocation: `/${slugify(name)}`,
          triggers: extractTriggers(description),
          dir: skillDir,
          file,
        });
      }
    }
  }

  skills.sort((a, b) => a.name.localeCompare(b.name));
  return { skills, scannedRoots: [...new Set(scannedRoots)], missingRoots: [...new Set(missingRoots)] };
}

/** Read the full markdown body + Overview section for a single skill file. */
export function readSkillBody(file) {
  const parsed = matter(readFileSync(file, 'utf-8'));
  const content = parsed.content || '';
  let overview;
  const m = content.match(/##\s*Overview\s*\n([\s\S]*?)(?:\n##\s|\n#\s|$)/i);
  if (m) overview = m[1].trim();
  return { content, overview };
}
