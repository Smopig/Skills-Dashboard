import { useMemo, useState } from 'react';
import type { Skill, SortOption } from '../types';

/** Multi-dimensional filter: search + category + tags (intersection) + source. */
export function useSkillsFilter(skills: Skill[]) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeSource, setActiveSource] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  const toggleTag = (tag: string) =>
    setActiveTags((tags) => (tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]));

  const filtered = useMemo(() => {
    let result = skills;

    if (activeCategory !== 'all') result = result.filter((s) => s.category === activeCategory);
    if (activeSource !== 'all') result = result.filter((s) => s.source === activeSource);
    if (activeTags.length) result = result.filter((s) => activeTags.every((t) => s.tags.includes(t)));

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return [...result].sort((a, b) =>
      sortOption === 'name-desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
    );
  }, [skills, search, activeCategory, activeTags, activeSource, sortOption]);

  return {
    filtered,
    search, setSearch,
    activeCategory, setActiveCategory,
    activeTags, toggleTag, clearTags: () => setActiveTags([]),
    activeSource, setActiveSource,
    sortOption, setSortOption,
  };
}
