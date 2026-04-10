import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 px-4 text-center">
      <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
        Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> using React, TypeScript & Tailwind CSS
      </p>
      <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
        Skills Dashboard © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
