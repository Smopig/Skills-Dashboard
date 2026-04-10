export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: ProficiencyLevel;
  icon: string;
  yearsExp?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'level-asc' | 'level-desc';

export const PROFICIENCY_LABELS: Record<ProficiencyLevel, string> = {
  1: 'Beginner',
  2: 'Elementary',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

export const PROFICIENCY_COLORS: Record<ProficiencyLevel, string> = {
  1: 'bg-red-400',
  2: 'bg-orange-400',
  3: 'bg-yellow-400',
  4: 'bg-blue-500',
  5: 'bg-emerald-500',
};

export const PROFICIENCY_TEXT_COLORS: Record<ProficiencyLevel, string> = {
  1: 'text-red-600 dark:text-red-400',
  2: 'text-orange-600 dark:text-orange-400',
  3: 'text-yellow-600 dark:text-yellow-400',
  4: 'text-blue-600 dark:text-blue-400',
  5: 'text-emerald-600 dark:text-emerald-400',
};

export const PROFICIENCY_BG_COLORS: Record<ProficiencyLevel, string> = {
  1: 'bg-red-100 dark:bg-red-900/30',
  2: 'bg-orange-100 dark:bg-orange-900/30',
  3: 'bg-yellow-100 dark:bg-yellow-900/30',
  4: 'bg-blue-100 dark:bg-blue-900/30',
  5: 'bg-emerald-100 dark:bg-emerald-900/30',
};
