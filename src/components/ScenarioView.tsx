import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';
import type { Skill, Scenario } from '../types';
import { fetchScenarios } from '../lib/api';
import MissingSkillBadge from './MissingSkillBadge';

export default function ScenarioView({ onOpen }: { onOpen: (skill: Skill) => void }) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    fetchScenarios().then((r) => setScenarios(r.data)).catch(() => setScenarios([]));
  }, []);

  if (!scenarios.length) {
    return <p className="py-16 text-center text-gray-500 dark:text-gray-400">尚無場景。可在 <code>data/scenarios.json</code> 新增。</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {scenarios.map((sc) => (
        <div key={sc.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
            <Target className="w-4 h-4 text-violet-500" /> {sc.title}
          </h3>
          {sc.description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">{sc.description}</p>}
          <div className="flex flex-wrap gap-1.5">
            {(sc.resolvedSkills || []).map(({ skillName, resolved }) =>
              resolved ? (
                <button
                  key={skillName}
                  onClick={() => onOpen(resolved)}
                  className="px-2.5 py-1 rounded-md text-xs bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/50"
                >
                  {resolved.name}
                </button>
              ) : (
                <MissingSkillBadge key={skillName} name={skillName} />
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
