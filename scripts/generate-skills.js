#!/usr/bin/env node
/**
 * generate-skills.js
 *
 * 自動掃描 skills-data/ 資料夾，讀取所有技能 JSON 檔，
 * 驗證資料格式，並產生 src/data/skills.ts。
 *
 * 使用方式：
 *   node scripts/generate-skills.js           # 產生 TypeScript 檔
 *   node scripts/generate-skills.js --dry-run # 只顯示結果，不寫入檔案
 *   node scripts/generate-skills.js --summary # 顯示統計摘要
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills-data');
const OUTPUT_FILE = path.join(ROOT, 'src', 'data', 'skills.ts');
const CATEGORIES_FILE = path.join(SKILLS_DIR, '_categories.json');

// ── ANSI colors ──────────────────────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
};

// ── CLI flags ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SUMMARY = args.includes('--summary');

// ── Validation ────────────────────────────────────────────────────────────────
const VALID_LEVELS = new Set([1, 2, 3, 4, 5]);

function validateSkill(raw, filePath) {
  const errors = [];
  if (typeof raw.name !== 'string' || !raw.name.trim()) {
    errors.push('"name" 必須是非空字串');
  }
  if (!VALID_LEVELS.has(raw.level)) {
    errors.push(`"level" 必須是 1–5 的整數，收到: ${JSON.stringify(raw.level)}`);
  }
  if (raw.icon !== undefined && typeof raw.icon !== 'string') {
    errors.push('"icon" 必須是字串（emoji 或 URL）');
  }
  if (raw.yearsExp !== undefined && (typeof raw.yearsExp !== 'number' || raw.yearsExp < 0)) {
    errors.push('"yearsExp" 必須是非負數字');
  }
  if (errors.length > 0) {
    throw new Error(
      `${c.red}驗證失敗${c.reset} ${c.gray}${filePath}${c.reset}\n` +
      errors.map(e => `  • ${e}`).join('\n')
    );
  }
}

// ── Read & parse ──────────────────────────────────────────────────────────────
function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    throw new Error(`JSON 解析失敗 ${c.gray}${filePath}${c.reset}\n  ${err.message}`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
function main() {
  console.log(`\n${c.bold}${c.cyan}⚡ Skills Generator${c.reset}\n`);

  // 1. Read categories
  if (!fs.existsSync(CATEGORIES_FILE)) {
    console.error(`${c.red}錯誤：${CATEGORIES_FILE} 不存在${c.reset}`);
    process.exit(1);
  }
  const categories = readJson(CATEGORIES_FILE);
  const categoryIds = new Set(categories.map(cat => cat.id));
  console.log(`${c.green}✔${c.reset} 讀取分類設定：${categories.length} 個分類`);

  // 2. Scan category folders
  const skills = [];
  const warnings = [];
  let fileCount = 0;
  let errorCount = 0;

  const folders = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const folder of folders) {
    const categoryId = folder.name;
    const folderPath = path.join(SKILLS_DIR, categoryId);

    if (!categoryIds.has(categoryId)) {
      warnings.push(`資料夾 "${categoryId}" 沒有對應的分類設定，已略過`);
      continue;
    }

    const jsonFiles = fs.readdirSync(folderPath)
      .filter(f => f.endsWith('.json') && !f.startsWith('_'))
      .sort();

    if (jsonFiles.length === 0) {
      warnings.push(`分類 "${categoryId}" 沒有任何技能 JSON 檔`);
      continue;
    }

    console.log(`\n  ${c.bold}${categoryId}/${c.reset} (${jsonFiles.length} 個技能)`);

    for (const file of jsonFiles) {
      const filePath = path.join(folderPath, file);
      const skillId = path.basename(file, '.json');
      fileCount++;

      try {
        const raw = readJson(filePath);
        validateSkill(raw, filePath);

        const skill = {
          id: `${categoryId}-${skillId}`,
          name: raw.name,
          category: categoryId,
          level: raw.level,
          icon: raw.icon ?? '🔧',
          ...(raw.yearsExp !== undefined && { yearsExp: raw.yearsExp }),
        };

        skills.push(skill);

        const bar = '█'.repeat(skill.level) + '░'.repeat(5 - skill.level);
        console.log(
          `    ${c.green}✔${c.reset} ${skill.icon} ${skill.name.padEnd(18)} ` +
          `Lv.${skill.level} ${c.gray}${bar}${c.reset}`
        );
      } catch (err) {
        console.error(`    ${c.red}✘${c.reset} ${file}\n${err.message}`);
        errorCount++;
      }
    }
  }

  // 3. Warnings
  if (warnings.length > 0) {
    console.log(`\n${c.yellow}⚠ 警告：${c.reset}`);
    warnings.forEach(w => console.log(`  ${c.yellow}•${c.reset} ${w}`));
  }

  // 4. Error check
  if (errorCount > 0) {
    console.error(`\n${c.red}✘ 發現 ${errorCount} 個錯誤，終止產生。${c.reset}\n`);
    process.exit(1);
  }

  // 5. Summary
  const byCategory = {};
  for (const s of skills) {
    byCategory[s.category] = (byCategory[s.category] ?? 0) + 1;
  }
  const avgLevel = (skills.reduce((sum, s) => sum + s.level, 0) / skills.length).toFixed(2);

  console.log(`\n${c.bold}── 統計摘要 ──────────────────────────────${c.reset}`);
  console.log(`  讀取檔案：${c.cyan}${fileCount}${c.reset} 個`);
  console.log(`  技能總數：${c.cyan}${skills.length}${c.reset} 個`);
  console.log(`  平均熟練度：${c.cyan}${avgLevel}${c.reset} / 5`);
  for (const [cat, count] of Object.entries(byCategory)) {
    console.log(`  ${c.gray}${cat.padEnd(12)}${c.reset} ${count} 個技能`);
  }

  if (SUMMARY) return;

  // 6. Generate TypeScript output
  const tsLines = [
    `// 此檔案由 scripts/generate-skills.js 自動產生`,
    `// 請勿手動編輯 — 修改 skills-data/ 資料夾後重新執行腳本`,
    `// 產生時間：${new Date().toISOString()}`,
    ``,
    `import type { Skill, Category } from '../types';`,
    ``,
    `export const CATEGORIES: Category[] = ${JSON.stringify(categories, null, 2)};`,
    ``,
    `export const SKILLS: Skill[] = [`,
  ];

  // Group by category for readable output
  for (const cat of categories) {
    const catSkills = skills.filter(s => s.category === cat.id);
    if (catSkills.length === 0) continue;
    tsLines.push(`  // ${cat.name}`);
    for (const s of catSkills) {
      const parts = [
        `id: ${JSON.stringify(s.id)}`,
        `name: ${JSON.stringify(s.name)}`,
        `category: ${JSON.stringify(s.category)}`,
        `level: ${s.level}`,
        `icon: ${JSON.stringify(s.icon)}`,
      ];
      if (s.yearsExp !== undefined) parts.push(`yearsExp: ${s.yearsExp}`);
      tsLines.push(`  { ${parts.join(', ')} },`);
    }
  }

  tsLines.push(`];`, ``);
  const tsContent = tsLines.join('\n');

  if (DRY_RUN) {
    console.log(`\n${c.yellow}[Dry Run] 輸出預覽：${c.reset}\n`);
    console.log(c.gray + tsContent + c.reset);
    console.log(`\n${c.yellow}[Dry Run] 未寫入檔案。${c.reset}\n`);
    return;
  }

  fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');
  console.log(`\n${c.green}${c.bold}✔ 成功產生：${c.reset} ${OUTPUT_FILE}`);
  console.log(`${c.gray}  執行 npm run dev 查看結果${c.reset}\n`);
}

main();
