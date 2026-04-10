import { useEffect, useState } from 'react';
import { SKILLS, CATEGORIES } from './data/skills';
import { useSkillsFilter } from './hooks/useSkillsFilter';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsCards from './components/StatsCards';
import SkillsSection from './components/SkillsSection';
import ChartsSection from './components/ChartsSection';
import Footer from './components/Footer';

function useDarkMode() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  return { darkMode, toggleDark: () => setDarkMode((d) => !d) };
}

export default function App() {
  const { darkMode, toggleDark } = useDarkMode();
  const { filtered, search, setSearch, activeCategory, setActiveCategory, sortOption, setSortOption } =
    useSkillsFilter(SKILLS);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header darkMode={darkMode} onToggleDark={toggleDark} />

      <main>
        <Hero totalSkills={SKILLS.length} totalCategories={CATEGORIES.length} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          <StatsCards skills={SKILLS} />
          <SkillsSection
            skills={SKILLS}
            filtered={filtered}
            search={search}
            onSearch={setSearch}
            activeCategory={activeCategory}
            onCategory={setActiveCategory}
            sortOption={sortOption}
            onSort={setSortOption}
          />
          <ChartsSection skills={SKILLS} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
