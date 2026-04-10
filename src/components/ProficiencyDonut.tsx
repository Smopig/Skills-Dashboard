import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Skill, ProficiencyLevel } from '../types';
import { PROFICIENCY_LABELS } from '../types';

interface ProficiencyDonutProps {
  skills: Skill[];
}

const COLORS: Record<number, string> = {
  1: '#f87171',
  2: '#fb923c',
  3: '#facc15',
  4: '#3b82f6',
  5: '#10b981',
};

export default function ProficiencyDonut({ skills }: ProficiencyDonutProps) {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  skills.forEach((s) => { counts[s.level]++; });

  const data = ([1, 2, 3, 4, 5] as ProficiencyLevel[])
    .filter((lvl) => counts[lvl] > 0)
    .map((lvl) => ({
      name: PROFICIENCY_LABELS[lvl],
      value: counts[lvl],
      color: COLORS[lvl],
    }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        Proficiency Distribution
      </h3>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">
        Skills by level breakdown
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '13px',
            }}
            formatter={(value) => [`${value} skills`, '']}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
