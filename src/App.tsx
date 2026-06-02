import { useEffect, useState } from 'react';
import { useSkillsData } from './hooks/useSkillsData';
import { useSkillsFilter } from './hooks/useSkillsFilter';
import Header, { type Tab } from './components/Header';
import Hero from './components/Hero';
import StatsCards from './components/StatsCards';
import SkillsSection from './components/SkillsSection';
import ChartsSection from './components/ChartsSection';
import WorkflowView from './components/WorkflowView';
import ScenarioView from './components/ScenarioView';
import SkillDetailPanel from './components/SkillDetailPanel';
import Footer from './components/Footer';
import { LoadingState, ErrorState } from './components/StatusViews';
import type { Skill } from './types';

function useDarkMode() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  return { darkMode, toggleDark: () => setDarkMode((d) => !d) };
}

export default function App() {
  const { darkMode, toggleDark } = useDarkMode();
  const { skills, facets, meta, loading, refreshing, error, refetch } = useSkillsData();
  const [tab, setTab] = useState<Tab>('catalog');
  const [openSkill, setOpenSkill] = useState<Skill | null>(null);

  const filter = useSkillsFilter(skills);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        darkMode={darkMode}
        onToggleDark={toggleDark}
        activeTab={tab}
        onTab={setTab}
        onRefresh={refetch}
        refreshing={refreshing}
      />

      <main>
        <Hero totalSkills={skills.length} totalSources={facets.sources.length} meta={meta} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (
            <>
              {tab === 'catalog' && (
                <>
                  <StatsCards skills={skills} facets={facets} />
                  <SkillsSection
                    total={skills.length}
                    filtered={filter.filtered}
                    facets={facets}
                    search={filter.search}
                    onSearch={filter.setSearch}
                    activeCategory={filter.activeCategory}
                    onCategory={filter.setActiveCategory}
                    activeTags={filter.activeTags}
                    onToggleTag={filter.toggleTag}
                    onClearTags={filter.clearTags}
                    activeSource={filter.activeSource}
                    onSource={filter.setActiveSource}
                    sortOption={filter.sortOption}
                    onSort={filter.setSortOption}
                    onOpen={setOpenSkill}
                  />
                </>
              )}
              {tab === 'workflows' && <WorkflowView onOpen={setOpenSkill} />}
              {tab === 'scenarios' && <ScenarioView onOpen={setOpenSkill} />}
              {tab === 'analytics' && <ChartsSection skills={filter.filtered} />}
            </>
          )}
        </div>
      </main>

      <Footer />
      <SkillDetailPanel skill={openSkill} onClose={() => setOpenSkill(null)} />
    </div>
  );
}
