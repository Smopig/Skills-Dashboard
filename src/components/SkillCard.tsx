import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { Skill } from '../types';
import {
  PROFICIENCY_LABELS,
  PROFICIENCY_COLORS,
  PROFICIENCY_TEXT_COLORS,
  PROFICIENCY_BG_COLORS,
} from '../types';
import { CATEGORIES } from '../data/skills';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const category = CATEGORIES.find((c) => c.id === skill.category);
  const pct = (skill.level / 5) * 100;
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none">{skill.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
              {skill.name}
            </h3>
            {skill.yearsExp && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {skill.yearsExp}y exp
              </p>
            )}
          </div>
        </div>

        {/* Proficiency badge */}
        <span
          className={clsx(
            'text-xs font-semibold px-2.5 py-1 rounded-full',
            PROFICIENCY_BG_COLORS[skill.level],
            PROFICIENCY_TEXT_COLORS[skill.level]
          )}
        >
          {PROFICIENCY_LABELS[skill.level]}
        </span>
      </div>

      {/* Category badge */}
      {category && (
        <span
          className={clsx(
            'inline-block text-xs font-medium px-2 py-0.5 rounded-md mb-3',
            category.bgColor,
            category.textColor
          )}
        >
          {category.name}
        </span>
      )}

      {/* Progress bar */}
      <div ref={barRef}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400 dark:text-gray-500">Proficiency</span>
          <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
            {skill.level}/5
          </span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={clsx(
              'h-full rounded-full transition-all duration-700 ease-out',
              PROFICIENCY_COLORS[skill.level]
            )}
            style={{ width: animated ? `${pct}%` : '0%' }}
          />
        </div>

        {/* Level dots */}
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={clsx(
                'flex-1 h-1 rounded-full transition-colors duration-300',
                dot <= skill.level
                  ? PROFICIENCY_COLORS[skill.level]
                  : 'bg-gray-100 dark:bg-gray-700'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
