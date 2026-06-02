import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Copy, Check, Loader2 } from 'lucide-react';
import type { Skill, SkillDetail } from '../types';
import { CATEGORY_LABELS } from '../types';
import { fetchSkill } from '../lib/api';
import SourceBadge from './SourceBadge';

export default function SkillDetailPanel({ skill, onClose }: { skill: Skill | null; onClose: () => void }) {
  const [detail, setDetail] = useState<SkillDetail | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!skill) return;
    let active = true;
    fetchSkill(skill.id)
      .then((r) => active && setDetail(r.data))
      .catch(() => active && setDetail(null));
    return () => {
      active = false;
    };
  }, [skill]);

  // Detail belongs to the currently open skill only once its id matches.
  const current = detail && skill && detail.id === skill.id ? detail : null;
  const loading = !current;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!skill) return null;

  const copyInvocation = () => {
    navigator.clipboard?.writeText(skill.invocation);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="relative w-full max-w-xl bg-white dark:bg-gray-900 h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{skill.name}</h2>
              <SourceBadge source={skill.source} pluginName={skill.pluginName} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {CATEGORY_LABELS[skill.category] || skill.category}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* How to use */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">如何使用</h3>
            <button
              onClick={copyInvocation}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 font-mono text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {skill.invocation}
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>

          {/* Triggers */}
          {current?.triggers && current.triggers.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">何時觸發</h3>
              <div className="flex flex-wrap gap-1.5">
                {current.triggers.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags + allowed tools */}
          {(skill.tags.length > 0 || skill.allowedTools) && (
            <div className="flex flex-wrap gap-1.5">
              {skill.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-xs bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300">#{t}</span>
              ))}
            </div>
          )}

          {/* Body */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">說明</h3>
            {loading ? (
              <div className="flex items-center gap-2 text-gray-400 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> 載入中…</div>
            ) : current ? (
              <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300">
                <ReactMarkdown>{current.overview || current.description || current.content.slice(0, 2000)}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-gray-500">{skill.summary}</p>
            )}
          </div>

          {/* Meta */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1 text-xs text-gray-400">
            {skill.license && <p>授權：{skill.license}</p>}
            <p className="break-all">路徑：{skill.dir}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
