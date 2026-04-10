import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { Skill } from '../types';
import { CATEGORIES } from '../data/skills';

interface SkillRadarChartProps {
  skills: Skill[];
}

export default function SkillRadarChart({ skills }: SkillRadarChartProps) {
  const data = CATEGORIES.map((cat) => {
    const catSkills = skills.filter((s) => s.category === cat.id);
    const avg = catSkills.length
      ? catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length
      : 0;
    return {
      category: cat.name,
      level: parseFloat(avg.toFixed(2)),
      fullMark: 5,
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        Skill Radar
      </h3>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">
        Average proficiency across all domains
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickCount={6}
          />
          <Radar
            name="Avg Level"
            dataKey="level"
            stroke="#7c3aed"
            fill="#7c3aed"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '13px',
            }}
            formatter={(value) => [`${value}/5`, 'Avg Level']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
