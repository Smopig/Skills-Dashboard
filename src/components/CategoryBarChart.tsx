import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { Skill } from '../types';
import { CATEGORIES } from '../data/skills';

interface CategoryBarChartProps {
  skills: Skill[];
}

const CHART_COLORS = ['#7c3aed', '#3b82f6', '#06b6d4', '#f97316', '#f43f5e', '#10b981'];

export default function CategoryBarChart({ skills }: CategoryBarChartProps) {
  const data = CATEGORIES.map((cat, i) => {
    const catSkills = skills.filter((s) => s.category === cat.id);
    const avg = catSkills.length
      ? catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length
      : 0;
    return {
      name: cat.name,
      count: catSkills.length,
      avg: parseFloat(avg.toFixed(2)),
      color: CHART_COLORS[i % CHART_COLORS.length],
    };
  }).filter((d) => d.count > 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        Skills per Category
      </h3>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">
        Skill count and average proficiency per domain
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg, #fff)',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '13px',
            }}
            formatter={(value, name) => [
              name === 'count' ? `${value} skills` : `${value}/5 avg`,
              name === 'count' ? 'Total' : 'Avg Level',
            ]}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
