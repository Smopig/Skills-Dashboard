import { useEffect, useState } from 'react';
import { ArrowRight, Copy, Check, Workflow as WorkflowIcon } from 'lucide-react';
import type { Skill, Workflow } from '../types';
import { fetchWorkflows } from '../lib/api';
import SourceBadge from './SourceBadge';
import MissingSkillBadge from './MissingSkillBadge';

export default function WorkflowView({ onOpen }: { onOpen: (skill: Skill) => void }) {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkflows().then((r) => setWorkflows(r.data)).catch(() => setWorkflows([]));
  }, []);

  const copyChecklist = (wf: Workflow) => {
    const text = wf.steps.map((s, i) => `${i + 1}. ${s.resolved?.invocation || `/${s.skillName}`}  ${s.note || ''}`.trim()).join('\n');
    navigator.clipboard?.writeText(`${wf.name}\n${text}`);
    setCopied(wf.id);
    setTimeout(() => setCopied(null), 1500);
  };

  if (!workflows.length) {
    return <p className="py-16 text-center text-gray-500 dark:text-gray-400">尚無工作流模板。可在 <code>data/workflows.json</code> 新增。</p>;
  }

  return (
    <div className="space-y-5">
      {workflows.map((wf) => (
        <div key={wf.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <WorkflowIcon className="w-4 h-4 text-violet-500" /> {wf.name}
              </h3>
              {wf.goal && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{wf.goal}</p>}
            </div>
            <button
              onClick={() => copyChecklist(wf)}
              className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {copied === wf.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} 複製清單
            </button>
          </div>

          <div className="flex flex-wrap items-stretch gap-2">
            {wf.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                {step.resolved ? (
                  <button
                    onClick={() => onOpen(step.resolved!)}
                    className="text-left rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 hover:border-violet-400 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400">{i + 1}</span>
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{step.resolved.name}</span>
                      <SourceBadge source={step.resolved.source} />
                    </div>
                    {step.note && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.note}</p>}
                  </button>
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-600 px-3 py-2">
                    <MissingSkillBadge name={step.skillName} />
                    {step.note && <p className="text-xs text-gray-400 mt-0.5">{step.note}</p>}
                  </div>
                )}
                {i < wf.steps.length - 1 && <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
