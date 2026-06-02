import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Load config: built-in default, then merge optional overrides from the user
 * home dir and the project root. This keeps the dashboard a cross-machine
 * "system" — defaults work everywhere, overrides are per-machine/per-project.
 */
export function loadConfig() {
  const base = readJson(join(__dirname, 'config.default.json')) || {};

  const overrides = [
    join(homedir(), '.claude', 'skills-dashboard.config.json'),
    join(projectRoot, 'skills-dashboard.config.json'),
  ];

  let merged = { ...base };
  for (const path of overrides) {
    const o = readJson(path);
    if (o) merged = { ...merged, ...o };
  }
  return merged;
}

/** Expand `~` and `<project>` placeholders into absolute paths. */
export function expandPath(p) {
  let out = p;
  if (out === '~' || out.startsWith('~/')) out = join(homedir(), out.slice(1));
  out = out.replace('<project>', projectRoot);
  return out;
}

export { projectRoot };
