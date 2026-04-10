import { useMemo, useState } from 'react';
import type { Skill, SortOption } from '../types';

export function useSkillsFilter(skills: Skill[]) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('level-desc');

  const filtered = useMemo(() => {
    let result = skills;

    if (activeCategory !== 'all') {
      result = result.filter((s) => s.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q));
    }

    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':  return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'level-asc': return a.level - b.level;
        case 'level-desc':return b.level - a.level;
        default: return 0;
      }
    });

    return result;
  }, [skills, search, activeCategory, sortOption]);

  return {
    filtered,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    sortOption,
    setSortOption,
  };
}
