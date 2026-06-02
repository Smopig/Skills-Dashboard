import { FolderSearch } from 'lucide-react';
import type { ScanMeta } from '../types';

interface HeroProps {
  totalSkills: number;
  totalSources: number;
  meta: ScanMeta | null;
}

export default function Hero({ totalSkills, totalSources, meta }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Claude Skills 控制台</h1>
        <p className="mt-2 text-violet-100 max-w-2xl">
          即時掃描這台電腦上所有可用的 Claude Skill，了解每個能做什麼、怎麼用，並把它們串成工作流。
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
          <span className="font-semibold text-lg">{totalSkills}</span>
          <span className="text-violet-100">個可用 Skill</span>
          <span className="opacity-40">·</span>
          <span className="font-semibold text-lg">{totalSources}</span>
          <span className="text-violet-100">個來源</span>
        </div>
        {meta && (
          <div className="mt-3 flex items-start gap-2 text-xs text-violet-200">
            <FolderSearch className="w-4 h-4 mt-0.5 shrink-0" />
            <span className="break-all">
              掃描目錄：{meta.scannedRoots.join('  ·  ') || '（無）'}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
