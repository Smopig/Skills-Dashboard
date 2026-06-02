import express from 'express';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanSkills, readSkillBody } from './scanner.js';
import { loadConfig, projectRoot } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = loadConfig();
const PORT = process.env.PORT || config.port || 5174;
const isProd = process.env.NODE_ENV === 'production';

const app = express();

// ---- Skill scan cache (keeps "open page reflects current machine" cheap) ----
let cache = null;
let cacheTime = 0;
function getScan(force) {
  const ttl = config.cacheTtl ?? 30000;
  if (!force && cache && Date.now() - cacheTime < ttl) return cache;
  cache = scanSkills();
  cacheTime = Date.now();
  return cache;
}

function meta(scan) {
  return {
    scannedRoots: scan.scannedRoots,
    missingRoots: scan.missingRoots,
    generatedAt: new Date().toISOString(),
  };
}

// Aggregate the facet lists the frontend needs for its filter UI.
function aggregate(skills) {
  const categories = {};
  const tags = {};
  const sources = {};
  for (const s of skills) {
    categories[s.category] = (categories[s.category] || 0) + 1;
    sources[s.source] = (sources[s.source] || 0) + 1;
    for (const t of s.tags) tags[t] = (tags[t] || 0) + 1;
  }
  const toList = (obj) => Object.entries(obj).map(([id, count]) => ({ id, count })).sort((a, b) => b.count - a.count);
  return { categories: toList(categories), tags: toList(tags), sources: toList(sources) };
}

// Strip heavy fields for the list payload.
function toListItem(s) {
  const { description, triggers, file, ...rest } = s;
  return rest;
}

app.get('/api/health', (_req, res) => {
  const scan = getScan(false);
  res.json({ ok: true, skillCount: scan.skills.length, ...meta(scan) });
});

app.get('/api/skills', (req, res) => {
  const scan = getScan(req.query.refresh === '1');
  res.json({
    data: scan.skills.map(toListItem),
    facets: aggregate(scan.skills),
    meta: meta(scan),
  });
});

app.get('/api/skills/:id', (req, res) => {
  const scan = getScan(false);
  const skill = scan.skills.find((s) => s.id === req.params.id);
  if (!skill) return res.status(404).json({ error: 'skill not found' });
  let body = { content: '', overview: undefined };
  try {
    body = readSkillBody(skill.file);
  } catch {
    /* skill body unreadable — return metadata only */
  }
  const { file, ...rest } = skill;
  res.json({ data: { ...rest, ...body }, meta: meta(scan) });
});

function loadLocalJson(name) {
  const path = join(projectRoot, 'data', name);
  if (!existsSync(path)) return [];
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return [];
  }
}

// Resolve a step/scenario skillName against the currently installed skills so
// the UI can show a "missing" badge instead of crashing.
function resolveSkill(skills, name) {
  const slug = String(name).toLowerCase();
  const found = skills.find((s) => s.name.toLowerCase() === slug || s.id.endsWith(`-${slug}`));
  return found ? toListItem(found) : null;
}

app.get('/api/workflows', (_req, res) => {
  const scan = getScan(false);
  const workflows = loadLocalJson('workflows.json').map((w) => ({
    ...w,
    steps: (w.steps || []).map((st) => ({ ...st, resolved: resolveSkill(scan.skills, st.skillName) })),
  }));
  res.json({ data: workflows, meta: meta(scan) });
});

app.get('/api/scenarios', (_req, res) => {
  const scan = getScan(false);
  const scenarios = loadLocalJson('scenarios.json').map((sc) => ({
    ...sc,
    resolvedSkills: (sc.skillNames || []).map((n) => ({ skillName: n, resolved: resolveSkill(scan.skills, n) })),
  }));
  res.json({ data: scenarios, meta: meta(scan) });
});

// In production, serve the built frontend from the same server/port.
if (isProd) {
  const dist = resolve(__dirname, '..', 'dist');
  app.use(express.static(dist));
  // SPA fallback (Express 5: use middleware instead of '*' route)
  app.use((_req, res) => res.sendFile(join(dist, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`[skills-dashboard] API listening on http://localhost:${PORT}`);
});
