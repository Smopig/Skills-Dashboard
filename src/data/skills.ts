// 此檔案由 scripts/generate-skills.js 自動產生
// 請勿手動編輯 — 修改 skills-data/ 資料夾後重新執行腳本
// 產生時間：2026-04-10T07:50:16.145Z

import type { Skill, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    "id": "frontend",
    "name": "Frontend",
    "color": "border-violet-500",
    "bgColor": "bg-violet-100 dark:bg-violet-900/30",
    "textColor": "text-violet-700 dark:text-violet-300"
  },
  {
    "id": "backend",
    "name": "Backend",
    "color": "border-blue-500",
    "bgColor": "bg-blue-100 dark:bg-blue-900/30",
    "textColor": "text-blue-700 dark:text-blue-300"
  },
  {
    "id": "database",
    "name": "Database",
    "color": "border-cyan-500",
    "bgColor": "bg-cyan-100 dark:bg-cyan-900/30",
    "textColor": "text-cyan-700 dark:text-cyan-300"
  },
  {
    "id": "devops",
    "name": "DevOps",
    "color": "border-orange-500",
    "bgColor": "bg-orange-100 dark:bg-orange-900/30",
    "textColor": "text-orange-700 dark:text-orange-300"
  },
  {
    "id": "tools",
    "name": "Tools",
    "color": "border-rose-500",
    "bgColor": "bg-rose-100 dark:bg-rose-900/30",
    "textColor": "text-rose-700 dark:text-rose-300"
  },
  {
    "id": "languages",
    "name": "Languages",
    "color": "border-emerald-500",
    "bgColor": "bg-emerald-100 dark:bg-emerald-900/30",
    "textColor": "text-emerald-700 dark:text-emerald-300"
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { id: "frontend-css", name: "CSS / SCSS", category: "frontend", level: 5, icon: "🎭", yearsExp: 5 },
  { id: "frontend-nextjs", name: "Next.js", category: "frontend", level: 4, icon: "▲", yearsExp: 2 },
  { id: "frontend-react", name: "React", category: "frontend", level: 5, icon: "⚛️", yearsExp: 4 },
  { id: "frontend-tailwind", name: "Tailwind CSS", category: "frontend", level: 4, icon: "🎨", yearsExp: 2 },
  { id: "frontend-typescript", name: "TypeScript", category: "frontend", level: 5, icon: "🔷", yearsExp: 3 },
  { id: "frontend-vite", name: "Vite", category: "frontend", level: 4, icon: "⚡", yearsExp: 2 },
  { id: "frontend-vue", name: "Vue.js", category: "frontend", level: 3, icon: "💚", yearsExp: 2 },
  // Backend
  { id: "backend-express", name: "Express.js", category: "backend", level: 5, icon: "🚂", yearsExp: 4 },
  { id: "backend-fastapi", name: "FastAPI", category: "backend", level: 4, icon: "🚀", yearsExp: 2 },
  { id: "backend-go", name: "Go", category: "backend", level: 3, icon: "🐹", yearsExp: 1 },
  { id: "backend-graphql", name: "GraphQL", category: "backend", level: 3, icon: "🔗", yearsExp: 2 },
  { id: "backend-nodejs", name: "Node.js", category: "backend", level: 5, icon: "🟢", yearsExp: 4 },
  { id: "backend-python", name: "Python", category: "backend", level: 4, icon: "🐍", yearsExp: 3 },
  // Database
  { id: "database-mongodb", name: "MongoDB", category: "database", level: 4, icon: "🍃", yearsExp: 3 },
  { id: "database-mysql", name: "MySQL", category: "database", level: 4, icon: "🐬", yearsExp: 3 },
  { id: "database-postgres", name: "PostgreSQL", category: "database", level: 4, icon: "🐘", yearsExp: 3 },
  { id: "database-prisma", name: "Prisma", category: "database", level: 4, icon: "◆", yearsExp: 2 },
  { id: "database-redis", name: "Redis", category: "database", level: 3, icon: "🔴", yearsExp: 2 },
  // DevOps
  { id: "devops-aws", name: "AWS", category: "devops", level: 3, icon: "☁️", yearsExp: 2 },
  { id: "devops-docker", name: "Docker", category: "devops", level: 4, icon: "🐳", yearsExp: 3 },
  { id: "devops-github-actions", name: "GitHub Actions", category: "devops", level: 4, icon: "⚙️", yearsExp: 2 },
  { id: "devops-kubernetes", name: "Kubernetes", category: "devops", level: 2, icon: "☸️", yearsExp: 1 },
  { id: "devops-nginx", name: "Nginx", category: "devops", level: 3, icon: "🌐", yearsExp: 2 },
  // Tools
  { id: "tools-figma", name: "Figma", category: "tools", level: 3, icon: "🎨", yearsExp: 2 },
  { id: "tools-git", name: "Git", category: "tools", level: 5, icon: "📦", yearsExp: 5 },
  { id: "tools-postman", name: "Postman", category: "tools", level: 4, icon: "📮", yearsExp: 3 },
  { id: "tools-vscode", name: "VS Code", category: "tools", level: 5, icon: "💻", yearsExp: 5 },
  // Languages
  { id: "languages-go", name: "Go", category: "languages", level: 3, icon: "🐹", yearsExp: 1 },
  { id: "languages-javascript", name: "JavaScript", category: "languages", level: 5, icon: "🟡", yearsExp: 5 },
  { id: "languages-python", name: "Python", category: "languages", level: 4, icon: "🐍", yearsExp: 3 },
  { id: "languages-rust", name: "Rust", category: "languages", level: 2, icon: "🦀", yearsExp: 1 },
];
