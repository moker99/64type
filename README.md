# ✦ 64-Type Persona Dynamics (64型人格深度測驗系統)

> 基於六大雙極心理學維度（能量、感知、決策、生活、心態、驅力）的 48 題精準性格分析與 64 種人格原型全圖鑑系統。

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 核心特色

1. **6 維度心理學模型 ($2^6 = 64$ 種原型)**：
   - 能量獲取 (`E` vs `I`)、資訊感知 (`S` vs `N`)、決策邏輯 (`T` vs `F`)
   - 生活步調 (`J` vs `P`)、心態韌性 (`A` vs `R`)、行動驅力 (`D` vs `C`)
2. **48 題黃金精準規模**：每維度 8 題（4 正向 + 4 反向對稱設計，消除慣性偏差，信度 $\alpha \approx 0.83$）。
3. **Canvas 六維動態發光雷達圖**：Retina 高畫質渲染與常態化百分比光譜。
4. **五大多維度深度分析**：核心特質、職涯跑道、親密關係、盲點充電、靈魂最佳拍檔。
5. **📸 1080x1620 社交分享海報生成**：一鍵產生 Instagram / 手機桌布規格圖卡，支援下載 PNG 與複製至剪貼簿。
6. **📚 64 型人格全圖鑑百科**：四大人格矩陣篩選、即時關鍵字搜尋與彈窗詳解。
7. **🌓 深淺主題模式 + 🔊 Web Audio 微音效 + 🕒 歷史測驗紀錄保存**。

---

## 🚀 本地快速啟動 (Local Development)

```bash
# 1. 安裝相依套件
npm install

# 2. 啟動開發伺服器
npm run dev

# 3. 打包正式版
npm run build
```

---

## 📤 如何推送到 GitHub (Push to GitHub)

若您尚未將專案推送到 GitHub，請在終端機（Terminal）執行以下步驟：

```bash
# 1. 初始化 Git 倉庫
git init

# 2. 加入所有檔案並提交
git add .
git commit -m "feat: initial commit of 64-type personality quiz"

# 3. 設定主分支名稱為 main
git branch -M main

# 4. 在 GitHub 上建立一個新的公開倉庫 (例如 64type)，然後連結遠端倉庫：
# 請將 YOUR_USERNAME 與 YOUR_REPO 替換為您的 GitHub 帳號與倉庫名
git remote add origin https://github.com/YOUR_USERNAME/64type.git

# 5. 推送到 GitHub
git push -u origin main
```

---

## 🌐 推薦免費部署方式 (Deploy & Share)

### 方案 A：使用 GitHub Pages（最方便，完全免費）
專案內已為您配置好自動化部署工作流 `.github/workflows/deploy.yml`：
1. 將專案推送到 GitHub 後，進入您的 GitHub 倉庫頁面。
2. 點選頂部 **Settings** ➔ 左側欄 **Pages**。
3. 在 **Build and deployment** 下方的 **Source**，下拉選擇 **GitHub Actions**。
4. 回到 **Actions** 標籤頁，工作流會自動打包並部署完成！
5. 部署完成後即可在 `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/` 取得專屬測驗網址發給朋友！

---

### 方案 B：使用 Vercel 一鍵部署（極速全球 CDN）
1. 前往 [Vercel 官網](https://vercel.com/) 並登入（支援直接用 GitHub 帳號登入）。
2. 點擊 **"Add New..."** ➔ **"Project"**。
3. 找到您的 `64type` 倉庫，點擊 **Import**。
4. Framework Preset 會自動識別為 **Vite**，直接點擊 **Deploy**！
5. 約 30 秒內即可獲得獨立的 `.vercel.app` 網址，支援自訂網域！

---

### 方案 C：使用 Netlify 一鍵部署
1. 前往 [Netlify 官網](https://www.netlify.com/) 並用 GitHub 登入。
2. 點擊 **"Add new site"** ➔ **"Import an existing project"**。
3. 授權並選擇您的倉庫，點擊 **Deploy site** 即完成！

---

## 📁 專案架構

```
├── .github/workflows/deploy.yml # GitHub Actions 自動部署腳本
├── src/
│   ├── data/
│   │   ├── questions.js        # 48 題心理計量題庫
│   │   └── personalityData.js  # 64 種人格完整資料庫
│   ├── utils/
│   │   ├── engine.js           # 計分引擎與 LocalStorage 管理
│   │   ├── audio.js            # Web Audio API 互動音效
│   │   └── cardGenerator.js    # Canvas 高解析度海報產生器
│   ├── components/             # React 組件 (雷達圖、導航、視圖、模態框)
│   ├── App.jsx                 # 主應用程式控制器
│   ├── main.jsx                # React 渲染入口
│   └── index.css               # 主設計系統樣式
├── vite.config.js              # Vite 建置配置
├── package.json
└── README.md
```

---

## 📄 授權條款

本專案採用 MIT 授權條款。
