# Claude Skills 控制台

一個**即時掃描這台電腦上所有可用 Claude Skills** 的控制台 —— 讓你知道裝了哪些 skill、各能做什麼、怎麼用，並把它們串成工作流完成任務。

> 這不是「技能熟練度履歷」。它讀取你機器上真實的 `SKILL.md`，換一台電腦跑就反映那台的 skill。

## 功能

- **目錄**：列出所有可用 skill，支援搜尋 + 分類 + 標籤（可複選）+ 來源（使用者/內建/外掛/專案）多維篩選。點任一卡片開啟詳情面板（說明、何時觸發、如何用 `/skill-name`、授權、路徑）。
- **工作流**：把多個 skill 照順序串成「食譜」，可一鍵複製成步驟清單。缺漏的 skill 會標示而非崩潰。
- **場景**：情境式入口（「我想做…」）帶出相關 skill 與推薦工作流。
- **分析**：來源分佈、各分類數量、標籤覆蓋三張圖，**跟著目錄頁的篩選連動**。

## 架構

```
本機 Express 後端 ── 掃描 SKILL.md ──> ~/.claude/skills, ~/.claude/plugins/*/skills,
   │ (fast-glob + gray-matter)        <project>/.claude/skills, /mnt/skills/* …
   ▼
 /api/skills · /api/skills/:id · /api/workflows · /api/scenarios · /api/health
   ▲ fetch（dev 經 Vite proxy，prod 由 Express serve dist）
React 前端  目錄 / 工作流 / 場景 / 分析
```

## 開始使用

```bash
npm install
npm run dev      # 同時啟動後端(5174)與前端(5173)，開 http://localhost:5173
```

正式環境：

```bash
npm run build
npm start        # Express 於單一 port 同時提供前端與 API
```

## 自訂

- **掃描範圍**：編輯 `server/config.default.json` 的 `roots`，或在 `~/.claude/skills-dashboard.config.json` / 專案根的 `skills-dashboard.config.json` 覆寫。支援 `~` 與 glob（如 `~/.claude/plugins/*/skills`）。
- **分類 / 標籤規則**：同一設定檔的 `categoryRules` / `tagRules`（關鍵字比對）。
- **工作流 / 場景**：直接編輯 `data/workflows.json`、`data/scenarios.json`，step 以 skill 名稱參照。

## 技術棧

React 19 · Vite · TypeScript · Tailwind · Recharts · Express · gray-matter · fast-glob
