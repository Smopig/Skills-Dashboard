export type SkillSource = 'user' | 'project' | 'plugin' | 'builtin';

export interface Skill {
  id: string;
  name: string;
  summary: string;
  category: string;
  tags: string[];
  source: SkillSource;
  pluginName?: string;
  license?: string;
  allowedTools?: string[];
  invocation: string;
  dir: string;
}

export interface SkillDetail extends Skill {
  description: string;
  triggers: string[];
  content: string;
  overview?: string;
}

export interface Facet {
  id: string;
  count: number;
}

export interface ScanMeta {
  scannedRoots: string[];
  missingRoots: string[];
  generatedAt: string;
}

export interface SkillsResponse {
  data: Skill[];
  facets: { categories: Facet[]; tags: Facet[]; sources: Facet[] };
  meta: ScanMeta;
}

export type SortOption = 'name-asc' | 'name-desc';

export interface WorkflowStep {
  skillName: string;
  note?: string;
  resolved?: Skill | null;
}

export interface Workflow {
  id: string;
  name: string;
  goal?: string;
  scenario?: string;
  steps: WorkflowStep[];
}

export interface Scenario {
  id: string;
  title: string;
  description?: string;
  skillNames: string[];
  resolvedSkills?: { skillName: string; resolved: Skill | null }[];
  workflowId?: string;
}

export const SOURCE_LABELS: Record<SkillSource, string> = {
  user: '使用者',
  project: '專案',
  plugin: '外掛',
  builtin: '內建',
};

export const SOURCE_COLORS: Record<SkillSource, string> = {
  user: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  project: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  plugin: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  builtin: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
};

export const CATEGORY_LABELS: Record<string, string> = {
  research: '研究',
  docs: '文件',
  design: '設計',
  dev: '開發',
  automation: '自動化',
  data: '資料',
  meta: '管理',
  uncategorized: '未分類',
};
