import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { Skill } from '../types';
import { CATEGORY_LABELS } from '../types';
import { ChartCard } from './ProficiencyDonut';

/** Number of skills per category. */
export default function CategoryBarChart({ skills }: { skills: Skill[] }) {
  const counts: Record<string, number> = {};
  for (const s of skills) counts[s.category] = (counts[s.category] || 0) + 1;
  const data = Object.entries(counts)
    .map(([id, count]) => ({ name: CATEGORY_LABELS[id] || id, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <ChartCard title="各分類 Skill 數">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#88888833" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip cursor={{ fill: '#8b5cf611' }} />
          <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
