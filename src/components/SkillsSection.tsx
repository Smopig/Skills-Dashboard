import { useRef } from 'react';
import { Search, X, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import type { Skill, SortOption } from '../types';
import { CATEGORIES } from '../data/skills';
import SkillCard from './SkillCard';
import SkillRow from './SkillRow';

interface SkillsSectionProps {
  skills: Skill[];
  filtered: Skill[];
  search: string;
  onSearch: (v: string) => void;
  activeCategory: string;
  onCategory: (v: string) => void;
  sortOption: SortOption;
  onSort: (v: SortOption) => void;
}

/** Count skills per category for badges */
function useCategoryCounts(skills: Skill[]) {
  const map: Record<string, number> = { all: skills.length };
  for (const s of skills) {
    map[s.category] = (map[s.category] ?? 0) + 1;
  }
  return map;
}

export default function SkillsSection({
  skills,
  filtered,
  search,
  onSearch,
  activeCategory,
  onCategory,
  sortOption,
  onSort,
}: SkillsSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const searchRef = useRef<HTMLInputElement>(null);
  const counts = useCategoryCounts(skills);

  const allCategories = [
    { id: 'all', name: 'All', color: '', bgColor: '', textColor: '' },
    ...CATEGORIES,
  ];

  const handleClearSearch = () => {
    onSearch('');
    searchRef.current?.focus();
  };

  return (
    <section id="skills" className="scroll-mt-20">

      {/* ── Section heading ── */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-baseline gap-2">
          Skills
          <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
            {filtered.length === skills.length
              ? `${skills.length} 個技能`
              : `${filtered.length} / ${skills.length} 個技能`}
          </span>
        </h2>

        {/* View toggle */}
        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            className={clsx(
              'p-1.5 rounded-lg transition-all',
              viewMode === 'grid'
                ? 'bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            aria-label="List view"
            className={clsx(
              'p-1.5 rounded-lg transition-all',
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Search + Sort controls ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">

        {/* Search box */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && handleClearSearch()}
            placeholder="搜尋技能名稱..."
            className={clsx(
              'w-full pl-9 pr-9 py-2.5 rounded-xl border bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-white placeholder-gray-400 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all',
              search
                ? 'border-violet-400 dark:border-violet-500'
                : 'border-gray-200 dark:border-gray-700'
            )}
          />
          {/* Clear button */}
          {search && (
            <button
              onClick={handleClearSearch}
              aria-label="清除搜尋"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative shrink-0">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={sortOption}
            onChange={(e) => onSort(e.target.value as SortOption)}
            className={clsx(
              'pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm',
              'focus:outline-none focus:ring-2 focus:ring-violet-500',
              'appearance-none cursor-pointer'
            )}
          >
            <option value="level-desc">熟練度 高→低</option>
            <option value="level-asc">熟練度 低→高</option>
            <option value="name-asc">名稱 A → Z</option>
            <option value="name-desc">名稱 Z → A</option>
          </select>
          {/* dropdown arrow */}
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

      {/* ── Category filter tabs ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allCategories.map((cat) => {
          const count = counts[cat.id] ?? 0;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategory(cat.id)}
              className={clsx(
                'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900/40 scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400'
              )}
            >
              {cat.name}
              <span className={clsx(
                'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold transition-colors',
                isActive
                  ? 'bg-white/25 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Results ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 dark:text-gray-500">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-semibold text-gray-600 dark:text-gray-300">找不到符合的技能</p>
          <p className="text-sm mt-1.5">試試調整搜尋關鍵字或切換分類</p>
          {search && (
            <button
              onClick={handleClearSearch}
              className="mt-4 text-sm text-violet-600 dark:text-violet-400 hover:underline"
            >
              清除搜尋「{search}」
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((skill) => (
            <SkillRow key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </section>
  );
}
