import { Loader2, ServerCrash } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-gray-500 dark:text-gray-400">
      <Loader2 className="w-8 h-8 animate-spin mb-3" />
      <p>正在掃描這台電腦上的 Skills…</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-6">
      <ServerCrash className="w-10 h-10 text-red-500 mb-4" />
      <p className="text-gray-900 dark:text-white font-semibold mb-1">無法連到本機後端服務</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-2">
        這個控制台需要本機後端來即時掃描 Skills。請在專案目錄執行
        <code className="mx-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">npm run dev</code>
        以同時啟動前後端。
      </p>
      <p className="text-xs text-gray-400 mb-5">（{message}）</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
      >
        重試
      </button>
    </div>
  );
}
