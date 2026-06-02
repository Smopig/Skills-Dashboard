import { Boxes, FolderTree, Tags, Server } from 'lucide-react';
import type { Skill, Facet } from '../types';

interface StatsCardsProps {
  skills: Skill[];
  facets: { categories: Facet[]; tags: Facet[]; sources: Facet[] };
}

export default function StatsCards({ skills, facets }: StatsCardsProps) {
  const cards = [
    { label: 'Skills 總數', value: skills.length, icon: Boxes, color: 'text-violet-600 bg-violet-100 dark:bg-violet-900/40' },
    { label: '分類', value: facets.categories.length, icon: FolderTree, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40' },
    { label: '標籤', value: facets.tags.length, icon: Tags, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/40' },
    { label: '來源', value: facets.sources.length, icon: Server, color: 'text-sky-600 bg-sky-100 dark:bg-sky-900/40' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
