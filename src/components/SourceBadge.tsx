import type { SkillSource } from '../types';
import { SOURCE_LABELS, SOURCE_COLORS } from '../types';

export default function SourceBadge({ source, pluginName }: { source: SkillSource; pluginName?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${SOURCE_COLORS[source]}`}>
      {SOURCE_LABELS[source]}
      {pluginName ? `·${pluginName}` : ''}
    </span>
  );
}
