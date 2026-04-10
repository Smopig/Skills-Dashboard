import { ExternalLink, Users, Mail, MapPin, Briefcase } from 'lucide-react';

interface HeroProps {
  totalSkills: number;
  totalCategories: number;
}

export default function Hero({ totalSkills, totalCategories }: HeroProps) {
  return (
    <section
      id="overview"
      className="relative bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-16 px-4"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 dark:bg-violet-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-5xl shadow-xl">
              👨‍💻
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              Alex Chen
            </h1>
            <p className="text-lg text-violet-600 dark:text-violet-400 font-medium mb-3">
              Full-Stack Developer
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Taipei, Taiwan
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> 5+ years exp
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed mb-6">
              Passionate about building elegant web applications with modern technologies.
              Always exploring new tools and best practices to create better user experiences.
            </p>

            {/* Social links */}
            <div className="flex justify-center md:justify-start gap-3 mb-8">
              {[
                { icon: <ExternalLink className="w-4 h-4" />, label: 'GitHub' },
                { icon: <Users className="w-4 h-4" />, label: 'LinkedIn' },
                { icon: <Mail className="w-4 h-4" />, label: 'Email' },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all shadow-sm"
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Quick stat chips */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                🎯 {totalSkills} Skills Tracked
              </div>
              <div className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold">
                📂 {totalCategories} Categories
              </div>
              <div className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-semibold">
                ✅ Open to Work
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
