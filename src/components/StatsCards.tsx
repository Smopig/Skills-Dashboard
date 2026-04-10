import { Code2, Layers, Star, TrendingUp } from 'lucide-react';
import type { Skill, ProficiencyLevel } from '../types';
import { PROFICIENCY_LABELS } from '../types';

interface StatsCardsProps {
  skills: Skill[];
}

export default function StatsCards({ skills }: StatsCardsProps) {
  const totalSkills = skills.length;
  const categories = new Set(skills.map((s) => s.category)).size;
  const expertSkills = skills.filter((s) => s.level === 5).length;
  const avgLevel = skills.length
    ? (skills.reduce((sum, s) => sum + s.level, 0) / skills.length).toFixed(1)
    : '0';
  const avgLevelLabel = PROFICIENCY_LABELS[Math.round(parseFloat(avgLevel)) as ProficiencyLevel];

  const stats = [
    {
      icon: <Code2 className="w-6 h-6" />,
      label: 'Total Skills',
      value: totalSkills,
      sub: 'tracked skills',
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-100 dark:bg-violet-900/30',
    },
    {
      icon: <Layers className="w-6 h-6" />,
      label: 'Categories',
      value: categories,
      sub: 'skill domains',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: 'Expert Skills',
      value: expertSkills,
      sub: 'at level 5',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Avg Proficiency',
      value: avgLevel,
      sub: avgLevelLabel,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`inline-flex p-2.5 rounded-xl ${stat.bg} ${stat.color} mb-3`}>
            {stat.icon}
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{stat.label}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
}
