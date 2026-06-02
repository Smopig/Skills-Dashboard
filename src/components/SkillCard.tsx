import { ChevronRight } from 'lucide-react';
import type { Skill } from '../types';
import { CATEGORY_LABELS } from '../types';
import SourceBadge from './SourceBadge';

interface SkillCardProps {
  skill: Skill;
  variant: 'grid' | 'list';
  onOpen: (skill: Skill) => void;
}

export default function SkillCard({ skill, variant, onOpen }: SkillCardProps) {
  const tags = skill.tags.slice(0, 4);

  if (variant === 'list') {
    return (
      <button
        onClick={() => onOpen(skill)}
        className="w-full text-left bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-4 hover:border-violet-400 dark:hover:border-violet-500 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white truncate">{skill.name}</span>
            <SourceBadge source={skill.source} pluginName={skill.pluginName} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{skill.summary}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
      </button>
    );
  }

  return (
    <button
      onClick={() => onOpen(skill)}
      className="text-left bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-3 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-gray-900 dark:text-white truncate">{skill.name}</span>
        <SourceBadge source={skill.source} pluginName={skill.pluginName} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-1">{skill.summary}</p>
      <div className="flex flex-wrap gap-1.5">
        <span className="px-2 py-0.5 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {CATEGORY_LABELS[skill.category] || skill.category}
        </span>
        {tags.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-md text-xs bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300">
            #{t}
          </span>
        ))}
      </div>
    </button>
  );
}
