import { Search, SlidersHorizontal } from 'lucide-react';
import clsx from 'clsx';
import type { Skill, SortOption } from '../types';
import { CATEGORIES } from '../data/skills';
import SkillCard from './SkillCard';

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

export default function SkillsSection({
  filtered,
  search,
  onSearch,
  activeCategory,
  onCategory,
  sortOption,
  onSort,
}: SkillsSectionProps) {
  const allCategories = [{ id: 'all', name: 'All', color: '', bgColor: '', textColor: '' }, ...CATEGORIES];

  return (
    <section id="skills" className="scroll-mt-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Skills
          <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
            ({filtered.length} results)
          </span>
        </h2>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={sortOption}
            onChange={(e) => onSort(e.target.value as SortOption)}
            className="pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none cursor-pointer"
          >
            <option value="level-desc">Highest Level First</option>
            <option value="level-asc">Lowest Level First</option>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
          </select>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategory(cat.id)}
            className={clsx(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
              activeCategory === cat.id
                ? 'bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900/40'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skill grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No skills found</p>
          <p className="text-sm mt-1">Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </section>
  );
}
