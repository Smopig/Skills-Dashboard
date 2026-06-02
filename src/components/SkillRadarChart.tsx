import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { Skill } from '../types';
import { ChartCard } from './ProficiencyDonut';

/** Tag coverage — how many skills carry each of the top tags. */
export default function TagRadarChart({ skills }: { skills: Skill[] }) {
  const counts: Record<string, number> = {};
  for (const s of skills) for (const t of s.tags) counts[t] = (counts[t] || 0) + 1;
  const data = Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  if (data.length < 3) {
    return (
      <ChartCard title="標籤覆蓋">
        <p className="text-sm text-gray-400 h-[260px] flex items-center justify-center">標籤資料不足以繪製雷達圖。</p>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="標籤覆蓋">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          <PolarGrid stroke="#88888833" />
          <PolarAngleAxis dataKey="tag" tick={{ fontSize: 11 }} />
          <Tooltip />
          <Radar dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
