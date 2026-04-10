# Skills Dashboard

![版本](https://img.shields.io/badge/版本-0.0.0-blue)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

**個人技能視覺化儀表板**，以技能卡片、進度條、分類篩選與互動式圖表，一目了然地展示你的技術能力。

---

## 成品示意圖

### 總覽區（Hero + 統計卡片）

```
┌──────────────────────────────────────────────────────────────────────┐
│  ⚡ Skills Dashboard                  Overview  Skills  Charts  ☀️   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────┐   Alex Chen                                              │
│   │  👨‍💻 │   Full-Stack Developer                                   │
│   └──────┘   📍 Taipei, Taiwan   💼 5+ years exp                   │
│                                                                      │
│              Passionate about building elegant web applications...   │
│                                                                      │
│              [ GitHub ]  [ LinkedIn ]  [ Email ]                    │
│                                                                      │
│              🎯 31 Skills Tracked  📂 6 Categories  ✅ Open to Work  │
│                                                                      │
├────────────────┬────────────────┬────────────────┬──────────────────┤
│  </> 31        │  ≡ 6           │  ★ 10          │  ↗ 3.87         │
│  Total Skills  │  Categories    │  Expert Skills │  Avg Proficiency │
│  tracked skills│  skill domains │  at level 5    │  Intermediate    │
└────────────────┴────────────────┴────────────────┴──────────────────┘
```

---

### 技能區（Grid 視圖 + 分類篩選 + 搜尋）

```
┌──────────────────────────────────────────────────────────────────────┐
│  Skills  31 個技能                                        ⊞  ≡       │
│                                                                      │
│  ┌─────────────────────────────────┐  ┌──────────────────────────┐  │
│  │ 🔍 搜尋技能名稱...          ✕  │  │ ⚡ 熟練度 高→低       ⌄ │  │
│  └─────────────────────────────────┘  └──────────────────────────┘  │
│                                                                      │
│  [All 31] [Frontend 7] [Backend 6] [Database 5] [DevOps 5] ...      │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ ⚛️ React     │  │ 🔷 TypeScript│  │ 🟢 Node.js   │  [ 複製 ] │  │
│  │ Frontend     │  │ Frontend     │  │ Backend      │              │
│  │ Expert ●●●●●│  │ Expert ●●●●●│  │ Expert ●●●●●│              │
│  │ ████████ 5/5│  │ ████████ 5/5│  │ ████████ 5/5│              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ 📦 Git       │  │ 🎭 CSS/SCSS  │  │ 🟡 JavaScript│              │
│  │ Tools        │  │ Frontend     │  │ Languages    │              │
│  │ Expert ●●●●●│  │ Expert ●●●●●│  │ Expert ●●●●●│              │
│  │ ████████ 5/5│  │ ████████ 5/5│  │ ████████ 5/5│              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└──────────────────────────────────────────────────────────────────────┘
```

### 技能區（List 視圖）

```
┌──────────────────────────────────────────────────────────────────────┐
│  ⚛️  React          Frontend   ████████████████░  5/5  Expert  [複製]│
│  🔷  TypeScript     Frontend   ████████████████░  5/5  Expert  [複製]│
│  🟢  Node.js        Backend    ████████████████░  5/5  Expert  [複製]│
│  🐳  Docker         DevOps     ████████████░░░░░  4/5  Advanced[複製]│
│  🐘  PostgreSQL     Database   ████████████░░░░░  4/5  Advanced[複製]│
│  🐍  Python         Backend    ████████████░░░░░  4/5  Advanced[複製]│
│  ☁️  AWS            DevOps     ████████░░░░░░░░░  3/5  Interm. [複製]│
└──────────────────────────────────────────────────────────────────────┘
```

---

### 圖表區（Analytics）

```
┌─────────────────────────────┐  ┌──────────────────────────────────┐
│  Proficiency Distribution   │  │  Skills per Category             │
│                             │  │                                  │
│         ┌───┐               │  │  Frontend  ████████████████  7  │
│      ╭──┤   ├──╮            │  │  Backend   █████████████░░  6  │
│    ╭─┤  │   │  ├─╮          │  │  Database  ██████████░░░░  5   │
│    │ │  │   │  │ │          │  │  DevOps    ██████████░░░░  5   │
│    │ ╰──┘   └──╯ │          │  │  Tools     ████████░░░░░░  4   │
│    │   Expert  5 │          │  │  Languages ████████░░░░░░  4   │
│    │  ■ Advanced │          │  │                                  │
│    │  ■ Interm.  │          │  └──────────────────────────────────┘
│    │  ■ Beginner │          │
│    └─────────────┘          │  ┌──────────────────────────────────┐
│                             │  │  Skill Radar                     │
└─────────────────────────────┘  │            Frontend              │
                                 │           ╱    ╲                 │
                                 │  Languages ╲  ╱ Backend         │
                                 │           ╱    ╲                 │
                                 │      Tools      Database         │
                                 │           DevOps                 │
                                 └──────────────────────────────────┘
```

---

## 功能清單

### 個人資料區（Hero）
- 顯示頭像（emoji 可自訂）、姓名、職稱、所在地與年資
- 社群連結按鈕（GitHub、LinkedIn、Email）
- 快速統計 Chip：技能總數、分類數、求職狀態

### 統計卡片（Stats Cards）
- **Total Skills** — 追蹤的技能總數
- **Categories** — 技能分類數量
- **Expert Skills** — 熟練度達 Level 5 的技能數
- **Avg Proficiency** — 所有技能的平均熟練度（含文字標籤）

### 技能篩選與搜尋
| 功能 | 說明 |
|------|------|
| 即時搜尋 | 輸入關鍵字即時過濾技能，支援 ESC 清除 |
| 清除按鈕 | 搜尋框右側 ✕，一鍵清空；無輸入時自動隱藏 |
| 分類 Tab | 點擊分類 Tab 篩選，Tab 上顯示技能數量 Badge |
| 排序 | 下拉選單支援：熟練度高→低／低→高、名稱 A→Z／Z→A |
| 視圖切換 | 右上角切換 Grid 卡片視圖 ⊞ 與 List 列表視圖 ≡ |

### 技能卡片（SkillCard）
- 技能圖示（emoji）、名稱、所屬分類 Badge、年資
- 熟練度標籤（色碼）：Beginner / Elementary / Intermediate / Advanced / Expert
- 動態進度條（捲動至可視區時觸發動畫）
- 等級圓點（5 個 pip）視覺輔助
- **一鍵複製按鈕**：Hover 才顯示，點擊後變綠色並顯示「已複製」，2 秒後自動重置

### 技能列（SkillRow，List 視圖）
- 緊湊橫排顯示：圖示 → 名稱+分類 → 進度條 → 熟練度 → 年資 → 複製按鈕
- 複製行為與卡片相同

> **複製格式範例：**
> ```
> React · Expert (5/5) · 4y exp
> ```

### 圖表區（Analytics Charts）
| 圖表 | 類型 | 說明 |
|------|------|------|
| Proficiency Distribution | 甜甜圈圖 | 各熟練度等級的技能分佈比例 |
| Skills per Category | 長條圖 | 各分類的技能數量，色碼對應分類 |
| Skill Radar | 雷達圖 | 六大技能領域的平均熟練度全覽 |

### 深色模式
- 右上角一鍵切換 ☀️ / 🌙
- 設定自動存入 `localStorage`，重整頁面保持
- 首次載入跟隨系統偏好（`prefers-color-scheme`）

### 響應式設計
| 裝置 | 技能 Grid 欄數 |
|------|---------------|
| 手機（< 640px）| 1 欄 |
| 平板（640px+）| 2 欄 |
| 筆電（1024px+）| 3 欄 |
| 桌機（1280px+）| 4 欄 |

---

## 技術棧

| 套件 | 版本 | 用途 |
|------|------|------|
| [React](https://react.dev/) | 19 | UI 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 6 | 型別安全 |
| [Vite](https://vite.dev/) | 8 | 建置工具 & 開發伺服器 |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Utility-first CSS |
| [Recharts](https://recharts.org/) | 3 | 甜甜圈圖 / 長條圖 / 雷達圖 |
| [Lucide React](https://lucide.dev/) | 1 | 圖示元件庫 |
| [clsx](https://github.com/lukeed/clsx) | 2 | 條件式 className 組合 |

---

## 專案結構

```
Skills-Dashboard/
│
├── skills-data/                  ← 技能資料資料夾（JSON 格式）
│   ├── _categories.json          ← 分類設定（名稱、顏色）
│   ├── frontend/
│   │   ├── react.json
│   │   ├── typescript.json
│   │   └── ...
│   ├── backend/
│   ├── database/
│   ├── devops/
│   ├── tools/
│   └── languages/
│
├── scripts/
│   └── generate-skills.js        ← Node.js 腳本：掃描 skills-data/ 產生 TypeScript
│
├── src/
│   ├── main.tsx                  ← React 進入點
│   ├── App.tsx                   ← 根元件（深色模式邏輯）
│   ├── index.css                 ← Tailwind 指令
│   │
│   ├── types/
│   │   └── index.ts              ← TypeScript 型別定義與常數
│   │
│   ├── data/
│   │   └── skills.ts             ← 由腳本自動產生（勿手動編輯）
│   │
│   ├── hooks/
│   │   └── useSkillsFilter.ts    ← 搜尋 / 分類 / 排序 Hook
│   │
│   └── components/
│       ├── Header.tsx            ← 導覽列 + 深色模式切換
│       ├── Hero.tsx              ← 個人資料區
│       ├── StatsCards.tsx        ← 四格統計卡片
│       ├── SkillsSection.tsx     ← 搜尋 + 篩選 + 視圖切換 + 格線
│       ├── SkillCard.tsx         ← 技能卡片（Grid 視圖）
│       ├── SkillRow.tsx          ← 技能列（List 視圖）
│       ├── ChartsSection.tsx     ← 圖表容器
│       ├── CategoryBarChart.tsx  ← 長條圖
│       ├── ProficiencyDonut.tsx  ← 甜甜圈圖
│       ├── SkillRadarChart.tsx   ← 雷達圖
│       └── Footer.tsx            ← 頁尾
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

---

## 快速開始

### 前置需求

- Node.js **18+**
- npm **9+**（或 pnpm / yarn）

### 安裝步驟

```bash
# 1. Clone 專案
git clone <repository-url>
cd Skills-Dashboard

# 2. 安裝相依套件
npm install

# 3. 啟動開發伺服器
npm run dev
```

瀏覽器開啟 [http://localhost:5173](http://localhost:5173) 即可預覽。

### 建置正式版

```bash
npm run build     # 產生 dist/ 資料夾
npm run preview   # 本地預覽正式建置結果
```

---

## npm 指令說明

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動 Vite 開發伺服器（含 HMR） |
| `npm run build` | TypeScript 型別檢查 + Vite 正式建置 |
| `npm run preview` | 本地預覽 `dist/` 靜態檔案 |
| `npm run lint` | ESLint 程式碼檢查 |
| `npm run generate` | 掃描 `skills-data/` 並產生 `src/data/skills.ts` |
| `npm run generate:dry` | 預覽產生結果，**不寫入**任何檔案 |
| `npm run generate:summary` | 僅顯示統計摘要，不寫入檔案 |

---

## 技能資料配置

所有技能資料以 **JSON 檔案**形式管理，修改後執行一行指令即可更新儀表板。

### 資料夾結構

```
skills-data/
├── _categories.json     ← 分類設定
└── <分類ID>/
    └── <技能ID>.json    ← 技能資料
```

- **分類 ID**：資料夾名稱（例如 `frontend`）
- **技能 ID**：JSON 檔名（例如 `react.json` → id 為 `frontend-react`）

---

### 技能 JSON 格式

每個技能一個 `.json` 檔，支援以下欄位：

```json
{
  "name": "React",
  "icon": "⚛️",
  "level": 5,
  "yearsExp": 4
}
```

| 欄位 | 型別 | 必填 | 說明 |
|------|------|------|------|
| `name` | `string` | ✅ | 技能顯示名稱 |
| `icon` | `string` | — | emoji 或圖示字元（預設 `🔧`） |
| `level` | `1 \| 2 \| 3 \| 4 \| 5` | ✅ | 熟練度等級 |
| `yearsExp` | `number` | — | 使用年資（正整數） |

**熟練度對照表：**

| Level | 標籤 | 顏色 |
|-------|------|------|
| 1 | Beginner | 🔴 紅 |
| 2 | Elementary | 🟠 橙 |
| 3 | Intermediate | 🟡 黃 |
| 4 | Advanced | 🔵 藍 |
| 5 | Expert | 🟢 綠 |

---

### 新增技能

```bash
# 在對應分類資料夾新增 JSON 檔
echo '{ "name": "Svelte", "icon": "🔥", "level": 3, "yearsExp": 1 }' \
  > skills-data/frontend/svelte.json

# 重新產生 TypeScript 資料
npm run generate
```

### 刪除技能

直接刪除對應的 JSON 檔，再執行 `npm run generate`：

```bash
rm skills-data/frontend/vue.json
npm run generate
```

### 修改技能熟練度

編輯 JSON 檔中的 `level` 欄位，再執行 `npm run generate`：

```json
{
  "name": "Docker",
  "icon": "🐳",
  "level": 5,
  "yearsExp": 3
}
```

---

### 新增自訂分類

**步驟一：** 在 `skills-data/_categories.json` 中加入新分類設定：

```json
{
  "id": "mobile",
  "name": "Mobile",
  "color": "border-pink-500",
  "bgColor": "bg-pink-100 dark:bg-pink-900/30",
  "textColor": "text-pink-700 dark:text-pink-300"
}
```

**步驟二：** 建立對應資料夾並新增技能：

```bash
mkdir skills-data/mobile
echo '{ "name": "React Native", "icon": "📱", "level": 4, "yearsExp": 2 }' \
  > skills-data/mobile/react-native.json
```

**步驟三：** 執行產生腳本：

```bash
npm run generate
```

> **Tailwind 顏色參考：** `violet` / `blue` / `cyan` / `orange` / `rose` / `emerald` / `pink` / `indigo` / `yellow`

---

### 預覽產生結果（Dry Run）

不確定結果時，可先用 `--dry-run` 預覽，確認後再正式產生：

```bash
npm run generate:dry
```

輸出範例：
```
⚡ Skills Generator

✔ 讀取分類設定：6 個分類

  frontend/ (7 個技能)
    ✔ ⚛️ React              Lv.5 █████
    ✔ 🔷 TypeScript         Lv.5 █████
    ✔ 🎨 Tailwind CSS       Lv.4 ████░
    ...

── 統計摘要 ──────────────────────────────
  讀取檔案：31 個
  技能總數：31 個
  平均熟練度：3.87 / 5
```

---

## 自訂化指南

### 修改個人資料

編輯 `src/components/Hero.tsx`，修改以下區塊：

```tsx
// 名稱與職稱
<h1>Alex Chen</h1>
<p>Full-Stack Developer</p>

// 地點與年資
<span>📍 Taipei, Taiwan</span>
<span>💼 5+ years exp</span>

// 簡介
<p>Passionate about building elegant web applications...</p>

// 頭像（更換 emoji 或替換為 <img> 標籤）
<div className="...">👨‍💻</div>
```

### 調整主題色（Accent Color）

預設主題色為 **Violet（紫色）**。全域搜尋替換 Tailwind 顏色類別即可切換：

```bash
# 將紫色主題改為藍色
# 替換：violet → blue（在所有 .tsx 與 .js 檔案中）
```

常用主題色：`violet` / `blue` / `indigo` / `teal` / `emerald`

---

## 元件架構

```
App
├── Header                  # 導覽列 + 深色模式切換
├── Hero                    # 個人資料 + 社群連結 + 統計 Chips
├── main
│   ├── StatsCards          # 四格統計（Total / Categories / Expert / Avg）
│   ├── SkillsSection       # 搜尋 + 篩選 + 排序 + 視圖切換
│   │   ├── SkillCard[]     # Grid 視圖：技能卡片（含複製按鈕）
│   │   └── SkillRow[]      # List 視圖：緊湊列（含複製按鈕）
│   └── ChartsSection
│       ├── ProficiencyDonut    # 甜甜圈圖（熟練度分佈）
│       ├── CategoryBarChart    # 長條圖（各分類技能數）
│       └── SkillRadarChart     # 雷達圖（領域覆蓋）
└── Footer
```

**資料流：**

```
skills-data/*.json
       │
       ▼
generate-skills.js  ──→  src/data/skills.ts
                                │
                                ▼
                           App.tsx
                           useSkillsFilter（搜尋 / 篩選 / 排序）
                                │
                         ┌──────┴──────┐
                         ▼            ▼
                    SkillsSection  ChartsSection
```

---

## 授權

MIT License — 自由使用、修改與發布。
