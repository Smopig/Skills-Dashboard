import type { Facet } from '../types';

interface TagCloudFilterProps {
  tags: Facet[];
  activeTags: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
}

export default function TagCloudFilter({ tags, activeTags, onToggle, onClear }: TagCloudFilterProps) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map(({ id, count }) => {
        const active = activeTags.includes(id);
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              active
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            #{id} <span className="opacity-60">{count}</span>
          </button>
        );
      })}
      {activeTags.length > 0 && (
        <button onClick={onClear} className="px-2.5 py-1 rounded-full text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline">
          清除標籤
        </button>
      )}
    </div>
  );
}
