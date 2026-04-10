import { Moon, Sun, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function Header({ darkMode, onToggleDark }: HeaderProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-600">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">
              Skills Dashboard
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {[
              { label: 'Overview', id: 'overview' },
              { label: 'Skills',   id: 'skills' },
              { label: 'Charts',   id: 'charts' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
