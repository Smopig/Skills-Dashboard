import { Moon, Sun, Boxes, RefreshCw } from 'lucide-react';

export type Tab = 'catalog' | 'workflows' | 'scenarios' | 'analytics';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  activeTab: Tab;
  onTab: (tab: Tab) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'catalog', label: '目錄' },
  { id: 'workflows', label: '工作流' },
  { id: 'scenarios', label: '場景' },
  { id: 'analytics', label: '分析' },
];

export default function Header({ darkMode, onToggleDark, activeTab, onTab, onRefresh, refreshing }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 rounded-lg bg-violet-600">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight hidden sm:block">
              Claude Skills 控制台
            </span>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onTab(id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRefresh}
              disabled={refreshing}
              title="重新掃描目前安裝的 Skills"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              aria-label="Refresh"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
