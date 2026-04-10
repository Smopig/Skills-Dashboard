import { useCallback, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import clsx from 'clsx';
import type { Skill } from '../types';
import {
  PROFICIENCY_LABELS,
  PROFICIENCY_COLORS,
  PROFICIENCY_TEXT_COLORS,
  PROFICIENCY_BG_COLORS,
} from '../types';
import { CATEGORIES } from '../data/skills';

interface SkillRowProps {
  skill: Skill;
}

export default function SkillRow({ skill }: SkillRowProps) {
  const category = CATEGORIES.find((c) => c.id === skill.category);
  const pct = (skill.level / 5) * 100;

  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    const text = `${skill.name} · ${PROFICIENCY_LABELS[skill.level]} (${skill.level}/5)${skill.yearsExp ? ` · ${skill.yearsExp}y exp` : ''}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }, [skill]);

  return (
    <div className="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-violet-200 dark:hover:border-violet-700 transition-all duration-150">

      {/* Icon */}
      <span className="text-xl w-8 text-center shrink-0 select-none">{skill.icon}</span>

      {/* Name + category */}
      <div className="w-40 shrink-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{skill.name}</p>
        {category && (
          <span className={clsx('text-[10px] font-medium', category.textColor)}>
            {category.name}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex-1 min-w-0">
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={clsx('h-full rounded-full transition-all duration-500', PROFICIENCY_COLORS[skill.level])}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Level */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 w-8 text-right">
          {skill.level}/5
        </span>
        <span className={clsx(
          'text-xs font-semibold px-2.5 py-0.5 rounded-full w-24 text-center',
          PROFICIENCY_BG_COLORS[skill.level],
          PROFICIENCY_TEXT_COLORS[skill.level]
        )}>
          {PROFICIENCY_LABELS[skill.level]}
        </span>
      </div>

      {/* Years exp */}
      <span className="text-xs text-gray-400 dark:text-gray-500 w-12 text-right shrink-0 hidden sm:block">
        {skill.yearsExp ? `${skill.yearsExp}y` : '—'}
      </span>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        aria-label={copied ? '已複製' : '複製'}
        className={clsx(
          'flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-medium transition-all duration-150 shrink-0',
          copied
            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
            : 'text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400'
        )}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{copied ? '已複製' : '複製'}</span>
      </button>
    </div>
  );
}
