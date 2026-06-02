import { useState } from 'react';
import { Search, X, LayoutGrid, List } from 'lucide-react';
import type { Skill, Facet, SortOption, SkillSource } from '../types';
import { CATEGORY_LABELS, SOURCE_LABELS } from '../types';
import SkillCard from './SkillCard';
import TagCloudFilter from './TagCloudFilter';

interface SkillsSectionProps {
  filtered: Skill[];
  total: number;
  facets: { categories: Facet[]; tags: Facet[]; sources: Facet[] };
  search: string;
  onSearch: (v: string) => void;
  activeCategory: string;
  onCategory: (v: string) => void;
  activeTags: string[];
  onToggleTag: (t: string) => void;
  onClearTags: () => void;
  activeSource: string;
  onSource: (v: string) => void;
  sortOption: SortOption;
  onSort: (v: SortOption) => void;
  onOpen: (skill: Skill) => void;
}

export default function SkillsSection(props: SkillsSectionProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { filtered, total, facets } = props;

  return (
    <section className="space-y-5">
      {/* Search + source + sort + view */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={props.search}
            onChange={(e) => props.onSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && props.onSearch('')}
            placeholder="搜尋 skill 名稱、說明、標籤…"
            className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          {props.search && (
            <button onClick={() => props.onSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <select
          value={props.activeSource}
          onChange={(e) => props.onSource(e.target.value)}
          className="py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200"
        >
          <option value="all">所有來源</option>
          {facets.sources.map((s) => (
            <option key={s.id} value={s.id}>{SOURCE_LABELS[s.id as SkillSource] || s.id} ({s.count})</option>
          ))}
        </select>

        <select
          value={props.sortOption}
          onChange={(e) => props.onSort(e.target.value as SortOption)}
          className="py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200"
        >
          <option value="name-asc">名稱 A→Z</option>
          <option value="name-desc">名稱 Z→A</option>
        </select>

        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {(['grid', 'list'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`p-2 ${view === v ? 'bg-violet-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500'}`}
              aria-label={v}
            >
              {v === 'grid' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        <CategoryTab id="all" label="全部" count={total} active={props.activeCategory === 'all'} onClick={props.onCategory} />
        {facets.categories.map((c) => (
          <CategoryTab
            key={c.id}
            id={c.id}
            label={CATEGORY_LABELS[c.id] || c.id}
            count={c.count}
            active={props.activeCategory === c.id}
            onClick={props.onCategory}
          />
        ))}
      </div>

      {/* Tag cloud */}
      <TagCloudFilter tags={facets.tags} activeTags={props.activeTags} onToggle={props.onToggleTag} onClear={props.onClearTags} />

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-gray-500 dark:text-gray-400">沒有符合條件的 skill。</p>
      ) : view === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => <SkillCard key={s.id} skill={s} variant="grid" onOpen={props.onOpen} />)}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((s) => <SkillCard key={s.id} skill={s} variant="list" onOpen={props.onOpen} />)}
        </div>
      )}
    </section>
  );
}

function CategoryTab({ id, label, count, active, onClick }: { id: string; label: string; count: number; active: boolean; onClick: (id: string) => void }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-violet-400'
      }`}
    >
      {label} <span className="opacity-60">{count}</span>
    </button>
  );
}
