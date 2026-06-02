import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Skill } from '../types';
import { SOURCE_LABELS } from '../types';

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#0ea5e9', '#ef4444', '#6366f1'];

/** Distribution of skills by source. */
export default function SourceDonut({ skills }: { skills: Skill[] }) {
  const counts: Record<string, number> = {};
  for (const s of skills) counts[s.source] = (counts[s.source] || 0) + 1;
  const data = Object.entries(counts).map(([id, value]) => ({
    name: SOURCE_LABELS[id as keyof typeof SOURCE_LABELS] || id,
    value,
  }));

  return (
    <ChartCard title="來源分佈">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}
