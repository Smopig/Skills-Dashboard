# Claude Skills Dashboard — 重新規畫 (v2 草案，待討論)

> 狀態：規畫討論中，尚未動程式碼。
> **v2 重大修正**：釐清「技能 = Claude 安裝的 Skills」(如 deep-research、code-review、docx…)，
> 而非程式語言/技術棧。現有 React/Docker 熟練度資料是不相干的假資料，將整批移除。

---

## 0. 一句話定位

> **一個瀏覽、理解、並串接「Claude 已安裝 Skills」的控制台。**
> 回答三個問題：我裝了哪些 Skill？每個能做什麼、怎麼觸發？怎麼把它們串成工作流完成任務？

---

## 1. Claude Skill 的真實結構 (實機確認)

每個 Skill = 一個資料夾，含 `SKILL.md`：

```markdown
---
name: docx
description: "Use this skill whenever the user wants to create, read, edit ...（含觸發條件 triggers）"
license: Proprietary...
allowed-tools: ...        # (部分 skill 有)
---
# 標題
## Overview
...正文：用途、步驟、範例...
```

本機已偵測到的 Skill 來源：
- 使用者層級：`~/.claude/skills/`（例：session-start-hook）
- 內建範例：`/mnt/skills/examples/`（46 個，如 deep-research、skill-creator、canvas-design…）
- 公用：`/mnt/skills/public/`（16 個，如 docx、pdf、xlsx、frontend-design…）
- 外掛(plugin) skills：`~/.claude/plugins/`（目前空）
- 專案層級：`<repo>/.claude/skills/`

> 同名 skill 可能在不同來源出現 → 需標示**來源/層級**並處理覆寫。

---

## 2. 資料怎麼來：用 generate 腳本「掃描」而非手寫

沿用現有「JSON/掃描 → 產生 `src/data/skills.ts`」的好作法，但改成
**掃描 SKILL.md** 並解析 frontmatter + 正文：

- 重寫 `scripts/generate-skills.js`：
  - 掃描可設定的 skill 根目錄清單（user / plugins / project / 內建）。
  - 解析每個 `SKILL.md` 的 frontmatter（name、description、license、allowed-tools…）。
  - 擷取正文：Overview、何時使用(triggers)、章節標題、是否附 scripts/資源檔。
  - 標示 `source`(user/plugin/builtin/project) 與資料夾路徑。
  - 產出 `src/data/skills.ts`（型別安全）。
- 提供 `--dry` / `--summary`，並可設定要不要納入 `/mnt/skills/*` 內建範例。

> 因為是靜態網站、執行時讀不到使用者檔案系統，**build 階段掃描**是最合理作法。

---

## 3. 你的 7 點需求 → 功能對應

| 你的需求 | 功能模組 |
|---|---|
| 1. 知道有哪些 Skill | **Skill 目錄**：清單 / 搜尋 / 雙層(分類+標籤)篩選 / 依來源分組 |
| 2. 了解 Skill 功能 | **Skill 詳情**：description、Overview、何時觸發、附帶的腳本/資源 |
| 3. 如何方便使用 | 詳情內 **觸發方式**（`/skill-name`、自然語觸發語）、用法範例、一鍵複製 |
| 4. 串接不同 Skill 完成任務 | **工作流**：有序步驟，每步綁一個 Skill |
| 5. 串接成工作流 | **工作流檢視**：步驟鏈，標註每步用哪個 Skill 做什麼 |
| 6. 場景與模板 | **場景庫** + **預設工作流模板** |
| 7. 自由發揮 | 觸發語衝突偵測、來源覆寫提示、覆蓋率儀表板、全域搜尋、關係建議 |

---

## 4. 新資料模型

### 4.1 Skill (來自 SKILL.md，掃描產生)
```jsonc
{
  "id": "deep-research",
  "name": "deep-research",
  "source": "builtin",                 // user | plugin | project | builtin
  "path": "/mnt/skills/examples/deep-research",
  "summary": "多來源、可查證的深度研究報告",   // 從 description 萃取的一句話
  "description": "完整 frontmatter description（含觸發條件）",
  "triggers": ["deep research", "研究報告", "多來源查證"], // 從 description 解析
  "category": "research",              // 單一主分類 (人工/規則歸類)
  "tags": ["web", "report", "verification"],   // 自由標籤
  "invoke": "/deep-research",          // 怎麼叫它
  "hasScripts": true,                  // 是否附腳本/資源
  "sections": ["Overview", "Usage", "..."]  // 正文章節，供詳情導覽
}
```
> 移除舊的 `level` / `yearsExp`（履歷思維，對 Claude Skill 無意義）。

### 4.2 Workflow (串接多個 Skill)
```jsonc
{
  "id": "research-to-report",
  "name": "研究並產出 Word 報告",
  "goal": "把一個主題變成有引用的正式文件",
  "isTemplate": true,
  "scenario": "knowledge-work",
  "steps": [
    { "skill": "deep-research", "note": "蒐集並查證資料" },
    { "skill": "docx",          "note": "把結果寫成 Word 報告" }
  ]
}
```
其他可預設模板（用實機已有的 skill）：
- **「網頁交付」**：frontend-design → web-artifacts-builder
- **「PR 收尾」**：code-review → simplify → verify → review
- **「建立新 Skill」**：skill-creator → session-start-hook
- **「簡報產出」**：deep-research → pptx

### 4.3 Scenario (場景)
```jsonc
{
  "id": "knowledge-work",
  "name": "知識工作 / 文件產出",
  "description": "研究、整理、產出文件與簡報",
  "skills": ["deep-research", "docx", "pptx", "pdf"],
  "workflows": ["research-to-report"]
}
```

> Workflow / Scenario 仍用 JSON 手動維護於 `skills-data/workflows/`、`skills-data/scenarios/`，
> 由你(或我)依實際 skill 編寫。

---

## 5. 分類 + 標籤雙層 (你選的方案)

- **主分類**(互斥，便於導覽)，建議按用途分：
  `research / docs / design / dev-tooling / automation / data / meta(管理skill本身)`
- **標籤**(可多、跨分類)：`#web #pdf #review #ci #content …`
- **來源(source)** 另作一個維度的篩選/分組（user / builtin / plugin / project）。

---

## 6. 頁面架構

```
┌ Header  (Logo · 導覽: Skills / 工作流 / 場景 / 總覽 · 全域搜尋 · 深色模式)
│
├ ① Skill 目錄
│    ├ 篩選：主分類 + 標籤雲 + 來源 + 搜尋
│    ├ Skill 卡 (名稱·一句話·來源徽章·標籤·是否附腳本)  ← 合併舊 Card/Row
│    └ 點卡 → 詳情面板：description、Overview、觸發語、invoke、章節、路徑
│
├ ② 工作流 Workflows
│    └ 模板列表 + 步驟鏈檢視（step→step，每步顯示 skill 與用途）
│
├ ③ 場景 Scenarios
│    └ 「我想做…」情境卡 → 帶出相關 Skill + 推薦工作流
│
├ ④ 總覽 Overview  (圖表跟著篩選連動 — 你選的)
│    ├ 各分類 Skill 數 / 各來源 Skill 數
│    └ 標籤分布；反映目前篩選子集
│
└ Footer
```

---

## 7. 加值功能 (第 7 點，發揮)

1. **觸發語衝突偵測** — 找出多個 Skill 觸發條件重疊、容易誤觸的地方。
2. **來源覆寫提示** — 同名 skill 在多來源出現時標示哪個生效。
3. **「裝了沒用到」視角** — 哪些 skill 從沒被任何工作流/場景引用。
4. **全域搜尋** — 一次搜 Skill / 工作流 / 場景 / 觸發語。
5. **複製成可執行清單** — 把一條工作流複製成 `/skill` 步驟清單。

---

## 8. 實作階段 (確認後)

- **P0 資料層**：重寫 generate 腳本掃描 SKILL.md；新 types；移除舊技術棧 JSON。
- **P1 Skill 目錄**：雙層+來源篩選、合併卡片、詳情面板。
- **P2 工作流 + 場景**：模板資料 + 步驟鏈檢視。
- **P3 總覽圖表連動** + 加值功能。
- **P4 收尾**：README 重寫、title、清掉 Hero 假個資。

---

## 9. 需要你拍板

1. **掃描範圍**：是否要納入 `/mnt/skills/*`(內建 62 個)？還是只列**使用者自己安裝**的 skill(`~/.claude/skills`、plugins、專案)？
   - (內建會讓清單很豐富但「不是你裝的」；只列使用者的則目前很少。)
2. **工作流/場景模板**：先用我上面列的那幾條(研究→報告、PR 收尾…)當預設嗎？有沒有你最想要的?
3. **執行模型**：確認接受「build 階段掃描檔案系統 → 靜態網站」這個作法嗎？
   (若你想要『開啟網頁即時讀取目前安裝的 skill』，那需要加一支本機小後端，是另一個量級。)
4. 接受第 5 節**分類軸**與第 6 節**頁面架構**嗎？
