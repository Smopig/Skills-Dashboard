import type { Skill } from '../types';
import SourceDonut from './ProficiencyDonut';
import CategoryBarChart from './CategoryBarChart';
import TagRadarChart from './SkillRadarChart';

/** Analytics — all charts reflect the currently filtered skill set. */
export default function ChartsSection({ skills }: { skills: Skill[] }) {
  return (
    <section className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        以下圖表反映目前篩選的 {skills.length} 個 skill。
      </p>
      <div className="grid lg:grid-cols-3 gap-4">
        <SourceDonut skills={skills} />
        <CategoryBarChart skills={skills} />
        <TagRadarChart skills={skills} />
      </div>
    </section>
  );
}
