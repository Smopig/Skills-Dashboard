import type { Skill } from '../types';
import CategoryBarChart from './CategoryBarChart';
import ProficiencyDonut from './ProficiencyDonut';
import SkillRadarChart from './SkillRadarChart';

interface ChartsSectionProps {
  skills: Skill[];
}

export default function ChartsSection({ skills }: ChartsSectionProps) {
  return (
    <section id="charts" className="scroll-mt-20">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Analytics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <ProficiencyDonut skills={skills} />
        </div>
        <div className="lg:col-span-2">
          <CategoryBarChart skills={skills} />
        </div>
        <div className="lg:col-span-3">
          <SkillRadarChart skills={skills} />
        </div>
      </div>
    </section>
  );
}
