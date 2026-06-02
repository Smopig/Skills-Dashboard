import { AlertTriangle } from 'lucide-react';

export default function MissingSkillBadge({ name }: { name: string }) {
  return (
    <span
      title="這台電腦目前沒有安裝這個 skill"
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
    >
      <AlertTriangle className="w-3 h-3" /> {name}（缺漏）
    </span>
  );
}
