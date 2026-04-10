import { useEffect, useRef, useState, useCallback } from 'react';
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

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const category = CATEGORIES.find((c) => c.id === skill.category);
  const pct = (skill.level / 5) * 100;

  // Progress bar animation on scroll into view
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  // Copy to clipboard
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    const text = `${skill.name} · ${PROFICIENCY_LABELS[skill.level]} (${skill.level}/5)${skill.yearsExp ? ` · ${skill.yearsExp}y exp` : ''}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }, [skill]);

  useEffect(() => () => { if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current); }, []);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

      {/* ── Copy button (appears on hover) ── */}
      <button
        onClick={handleCopy}
        aria-label={copied ? '已複製' : '複製技能資訊'}
        className={clsx(
          'absolute top-3 right-3 p-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1',
          copied
            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 opacity-100 scale-100'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/30'
        )}
      >
        {copied
          ? <><Check className="w-3.5 h-3.5" /><span>已複製</span></>
          : <><Copy className="w-3.5 h-3.5" /><span>複製</span></>
        }
      </button>

      {/* ── Header: icon + name + proficiency badge ── */}
      <div className="flex items-start justify-between mb-3 pr-16">
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none select-none">{skill.icon}</span>
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
      </div>

      {/* ── Category badge + proficiency label in one row ── */}
      <div className="flex items-center justify-between mb-3">
        {category && (
          <span className={clsx(
            'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md',
            category.bgColor,
            category.textColor
          )}>
            {category.name}
          </span>
        )}
        <span className={clsx(
          'text-xs font-semibold px-2.5 py-0.5 rounded-full ml-auto',
          PROFICIENCY_BG_COLORS[skill.level],
          PROFICIENCY_TEXT_COLORS[skill.level]
        )}>
          {PROFICIENCY_LABELS[skill.level]}
        </span>
      </div>

      {/* ── Progress bar ── */}
      <div ref={barRef}>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-400 dark:text-gray-500">熟練度</span>
          <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
            {skill.level} / 5
          </span>
        </div>

        {/* Track + fill */}
        <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={clsx('h-full rounded-full transition-all duration-700 ease-out', PROFICIENCY_COLORS[skill.level])}
            style={{ width: animated ? `${pct}%` : '0%' }}
          />
        </div>

        {/* Level pip dots */}
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={clsx(
                'flex-1 h-1 rounded-full transition-colors duration-300',
                dot <= skill.level ? PROFICIENCY_COLORS[skill.level] : 'bg-gray-100 dark:bg-gray-700'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
