/**
 * 64型人格測試 - 主應用程式 (Application Logic)
 * 負責狀態管理、測驗流程流轉、鍵盤快捷鍵、結果展示、圖鑑瀏覽與模態框互動
 */

class PersonaApp {
  constructor() {
    this.currentView = "hero"; // 'hero' | 'quiz' | 'result'
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.currentResult = null;
    this.radarChart = null;

    this.initElements();
    this.initTheme();
    this.initAudioUI();
    this.bindEvents();
    this.renderCodexCards("all", "");
  }

  initElements() {
    // 視圖容器
    this.heroView = document.getElementById("heroView");
    this.quizView = document.getElementById("quizView");
    this.resultView = document.getElementById("resultView");

    // 導航與按鈕
    this.navLogoBtn = document.getElementById("navLogoBtn");
    this.startQuizBtn = document.getElementById("startQuizBtn");
    this.heroCodexBtn = document.getElementById("heroCodexBtn");
    this.navCodexBtn = document.getElementById("navCodexBtn");
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    this.soundToggleBtn = document.getElementById("soundToggleBtn");
    this.historyDrawerBtn = document.getElementById("historyDrawerBtn");

    // 測驗元素
    this.quizCounterText = document.getElementById("quizCounterText");
    this.quizDimensionBadge = document.getElementById("quizDimensionBadge");
    this.quizProgressBar = document.getElementById("quizProgressBar");
    this.questionScenarioBadge = document.getElementById("questionScenarioBadge");
    this.questionText = document.getElementById("questionText");
    this.scaleOptionsGroup = document.getElementById("scaleOptionsGroup");
    this.quizPrevBtn = document.getElementById("quizPrevBtn");
    this.quizNextBtn = document.getElementById("quizNextBtn");
    this.quizNextBtnText = document.getElementById("quizNextBtnText");

    // 結果頁元素
    this.resBadge = document.getElementById("resBadge");
    this.resCode = document.getElementById("resCode");
    this.resName = document.getElementById("resName");
    this.resGroup = document.getElementById("resGroup");
    this.resTagline = document.getElementById("resTagline");
    this.resDimensionBarsContainer = document.getElementById("resDimensionBarsContainer");
    this.resultTabsNav = document.getElementById("resultTabsNav");
    this.resSuperpowersList = document.getElementById("resSuperpowersList");
    this.resOverviewText = document.getElementById("resOverviewText");
    this.resCareersList = document.getElementById("resCareersList");
    this.resLoveStyleText = document.getElementById("resLoveStyleText");
    this.resBlindspotsList = document.getElementById("resBlindspotsList");
    this.resStressRechargeText = document.getElementById("resStressRechargeText");
    this.resGoldenMatchTitle = document.getElementById("resGoldenMatchTitle");
    this.resGrowthMatchTitle = document.getElementById("resGrowthMatchTitle");

    // 結果操作按鈕
    this.generateShareCardBtn = document.getElementById("generateShareCardBtn");
    this.copyResultSummaryBtn = document.getElementById("copyResultSummaryBtn");
    this.retestBtn = document.getElementById("retestBtn");
    this.resultExploreCodexBtn = document.getElementById("resultExploreCodexBtn");

    // 模態框與抽屜
    this.codexModal = document.getElementById("codexModal");
    this.closeCodexModalBtn = document.getElementById("closeCodexModalBtn");
    this.codexSearchInput = document.getElementById("codexSearchInput");
    this.codexFilterGroup = document.getElementById("codexFilterGroup");
    this.codexCardsGrid = document.getElementById("codexCardsGrid");

    this.personaDetailModal = document.getElementById("personaDetailModal");
    this.detailModalTitle = document.getElementById("detailModalTitle");
    this.detailModalBody = document.getElementById("detailModalBody");
    this.closeDetailModalBtn = document.getElementById("closeDetailModalBtn");

    this.sharePosterModal = document.getElementById("sharePosterModal");
    this.sharePosterImagePreview = document.getElementById("sharePosterImagePreview");
    this.closeShareModalBtn = document.getElementById("closeShareModalBtn");
    this.downloadPosterPngBtn = document.getElementById("downloadPosterPngBtn");
    this.copyPosterImgBtn = document.getElementById("copyPosterImgBtn");

    this.historyDrawerOverlay = document.getElementById("historyDrawerOverlay");
    this.closeHistoryDrawerBtn = document.getElementById("closeHistoryDrawerBtn");
    this.historyCountText = document.getElementById("historyCountText");
    this.clearHistoryBtn = document.getElementById("clearHistoryBtn");
    this.historyListContainer = document.getElementById("historyListContainer");

    // 提示
    this.toastNotification = document.getElementById("toastNotification");
    this.toastMessage = document.getElementById("toastMessage");
    this.toastIcon = document.getElementById("toastIcon");
  }

  // 初始化主題
  initTheme() {
    const savedTheme = localStorage.getItem("persona_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const icon = document.getElementById("themeIcon");
    if (icon) icon.textContent = savedTheme === "light" ? "☀️" : "🌓";
  }

  toggleTheme() {
    soundFX.playClick();
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("persona_theme", next);
    const icon = document.getElementById("themeIcon");
    if (icon) icon.textContent = next === "light" ? "☀️" : "🌓";

    // 重繪雷達圖以適配顏色
    if (this.radarChart && this.currentResult) {
      this.radarChart.draw();
    }
  }

  // 初始化音效 UI
  initAudioUI() {
    const icon = document.getElementById("soundIcon");
    if (icon) icon.textContent = soundFX.isMuted() ? "🔇" : "🔊";
  }

  toggleSound() {
    const isMuted = soundFX.toggleMute();
    const icon = document.getElementById("soundIcon");
    if (icon) icon.textContent = isMuted ? "🔇" : "🔊";
    if (!isMuted) {
      soundFX.playClick();
      this.showToast("音效已開啟 🔊");
    } else {
      this.showToast("音效已靜音 🔇");
    }
  }

  // 視圖切換
  switchView(viewName) {
    this.currentView = viewName;
    [this.heroView, this.quizView, this.resultView].forEach(view => {
      view.classList.remove("active");
    });

    if (viewName === "hero") this.heroView.classList.add("active");
    if (viewName === "quiz") this.quizView.classList.add("active");
    if (viewName === "result") this.resultView.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 綁定事件
  bindEvents() {
    // 導航
    this.navLogoBtn.addEventListener("click", () => {
      soundFX.playClick();
      this.switchView("hero");
    });
    this.startQuizBtn.addEventListener("click", () => this.startQuiz());
    this.retestBtn.addEventListener("click", () => this.startQuiz());
    this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
    this.soundToggleBtn.addEventListener("click", () => this.toggleSound());

    // 測驗導航
    this.quizPrevBtn.addEventListener("click", () => this.prevQuestion());
    this.quizNextBtn.addEventListener("click", () => this.nextQuestion());

    // 鍵盤快捷鍵
    document.addEventListener("keydown", (e) => this.handleKeyboard(e));

    // 結果頁標籤導航
    this.resultTabsNav.addEventListener("click", (e) => {
      const tabBtn = e.target.closest(".tab-btn");
      if (!tabBtn) return;
      soundFX.playTab();
      const tabKey = tabBtn.dataset.tab;
      
      // 更新按鈕 active
      this.resultTabsNav.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      tabBtn.classList.add("active");

      // 更新內容 pane active
      document.querySelectorAll(".tab-pane-content").forEach(pane => pane.classList.remove("active"));
      const targetPane = document.getElementById(`tabPane-${tabKey}`);
      if (targetPane) targetPane.classList.add("active");
    });

    // 產生分享海報
    this.generateShareCardBtn.addEventListener("click", () => this.openShareModal());
    this.downloadPosterPngBtn.addEventListener("click", () => {
      if (this.currentResult) {
        soundFX.playClick();
        ShareCardGenerator.downloadCard(this.currentResult);
        this.showToast("海報下載中... 💾");
      }
    });
    this.copyPosterImgBtn.addEventListener("click", () => this.copyPosterImage());
    this.closeShareModalBtn.addEventListener("click", () => {
      soundFX.playClick();
      this.sharePosterModal.classList.remove("active");
    });

    // 複製文字摘要
    this.copyResultSummaryBtn.addEventListener("click", () => this.copyResultSummary());

    // 圖鑑模態框
    this.heroCodexBtn.addEventListener("click", () => this.openCodexModal());
    this.navCodexBtn.addEventListener("click", () => this.openCodexModal());
    this.resultExploreCodexBtn.addEventListener("click", () => this.openCodexModal());
    this.closeCodexModalBtn.addEventListener("click", () => {
      soundFX.playClick();
      this.codexModal.classList.remove("active");
    });

    // 圖鑑搜尋與篩選
    this.codexSearchInput.addEventListener("input", (e) => {
      const activeFilter = document.querySelector(".filter-pill-btn.active")?.dataset.filter || "all";
      this.renderCodexCards(activeFilter, e.target.value.trim());
    });

    this.codexFilterGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-pill-btn");
      if (!btn) return;
      soundFX.playClick();
      this.codexFilterGroup.querySelectorAll(".filter-pill-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const searchVal = this.codexSearchInput.value.trim();
      this.renderCodexCards(btn.dataset.filter, searchVal);
    });

    // 詳情彈窗
    this.closeDetailModalBtn.addEventListener("click", () => {
      soundFX.playClick();
      this.personaDetailModal.classList.remove("active");
    });

    // 歷史紀錄抽屜
    this.historyDrawerBtn.addEventListener("click", () => this.openHistoryDrawer());
    this.closeHistoryDrawerBtn.addEventListener("click", () => {
      soundFX.playClick();
      this.historyDrawerOverlay.classList.remove("active");
    });
    this.clearHistoryBtn.addEventListener("click", () => {
      if (confirm("確定要清除所有測驗歷史紀錄嗎？")) {
        soundFX.playClick();
        PersonalityEngine.clearHistory();
        this.renderHistoryList();
        this.showToast("已清空歷史紀錄 🗑️");
      }
    });

    // 點擊遮罩關閉模態框
    [this.codexModal, this.personaDetailModal, this.sharePosterModal, this.historyDrawerOverlay].forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          soundFX.playClick();
          modal.classList.remove("active");
        }
      });
    });
  }

  // 開始測驗
  startQuiz() {
    soundFX.playClick();
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.switchView("quiz");
    this.renderQuestion(0);
  }

  // 渲染單道題目
  renderQuestion(index) {
    const q = QUESTIONS[index];
    if (!q) return;

    const total = QUESTIONS.length;
    const progressPct = ((index + 1) / total) * 100;

    // 更新進度與標籤
    this.quizCounterText.textContent = `Q ${String(index + 1).padStart(2, '0')} / ${total}`;
    this.quizProgressBar.style.width = `${progressPct}%`;
    
    const dimMeta = DIMENSIONS[q.dimension];
    this.quizDimensionBadge.innerHTML = `<span>${dimMeta.name} (${dimMeta.codeA} vs ${dimMeta.codeB})</span>`;
    this.quizDimensionBadge.style.borderColor = dimMeta.color;

    this.questionScenarioBadge.textContent = `情境：${q.scenario}`;
    this.questionText.textContent = q.text;

    // 上一題按鈕狀態
    this.quizPrevBtn.disabled = (index === 0);
    
    // 下一題按鈕文字
    const isAnswered = this.answers[q.id] !== undefined;
    if (index === total - 1) {
      this.quizNextBtnText.textContent = isAnswered ? "完成並解鎖分析 🚀" : "完成測驗 🚀";
    } else {
      this.quizNextBtnText.textContent = "下一題 →";
    }

    // 渲染 5 個選項按鈕
    this.scaleOptionsGroup.innerHTML = "";
    SCALE_OPTIONS.forEach((opt, optIdx) => {
      const isSelected = this.answers[q.id] === opt.value;
      const itemEl = document.createElement("div");
      itemEl.className = `scale-item ${isSelected ? "selected" : ""}`;
      itemEl.style.setProperty("--btn-color", opt.color);

      itemEl.innerHTML = `
        <div class="scale-btn-circle scale-size-${opt.scaleSize}" style="border-color: ${isSelected ? opt.color : ''};">
          ${isSelected ? `<span style="color:#fff; font-size: 14px; font-weight: bold;">✓</span>` : ''}
        </div>
        <div class="scale-label">${opt.label}</div>
        <div class="scale-shortcut-hint">[ ${optIdx + 1} ]</div>
      `;

      itemEl.addEventListener("click", () => {
        this.selectOption(q.id, opt.value);
      });

      this.scaleOptionsGroup.appendChild(itemEl);
    });
  }

  // 選取選項
  selectOption(questionId, value) {
    this.answers[questionId] = value;
    soundFX.playSelect(value);

    // 重新渲染當前題目選項以更新勾選狀態
    this.renderQuestion(this.currentQuestionIndex);

    // 自動延遲前進下一題 (體驗流暢)
    setTimeout(() => {
      if (this.currentQuestionIndex < QUESTIONS.length - 1) {
        this.currentQuestionIndex++;
        this.renderQuestion(this.currentQuestionIndex);
      } else {
        this.finishQuiz();
      }
    }, 220);
  }

  // 上一題
  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      soundFX.playClick();
      this.currentQuestionIndex--;
      this.renderQuestion(this.currentQuestionIndex);
    }
  }

  // 下一題 / 完成
  nextQuestion() {
    const q = QUESTIONS[this.currentQuestionIndex];
    if (this.answers[q.id] === undefined) {
      // 預設為中立
      this.answers[q.id] = 0;
    }

    soundFX.playClick();
    if (this.currentQuestionIndex < QUESTIONS.length - 1) {
      this.currentQuestionIndex++;
      this.renderQuestion(this.currentQuestionIndex);
    } else {
      this.finishQuiz();
    }
  }

  // 鍵盤操作監聽
  handleKeyboard(e) {
    if (this.currentView !== "quiz") return;

    // 數字鍵 1 ~ 5
    if (["1", "2", "3", "4", "5"].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const opt = SCALE_OPTIONS[idx];
      const q = QUESTIONS[this.currentQuestionIndex];
      if (opt && q) {
        this.selectOption(q.id, opt.value);
      }
    } else if (e.key === "ArrowLeft") {
      this.prevQuestion();
    } else if (e.key === "ArrowRight" || e.key === "Enter") {
      this.nextQuestion();
    }
  }

  // 完成測驗並計算結果
  finishQuiz() {
    const result = PersonalityEngine.calculateResult(this.answers);
    this.currentResult = result;
    PersonalityEngine.saveHistory(result);
    soundFX.playComplete();

    this.renderResultView(result);
    this.switchView("result");
  }

  // 渲染結果頁
  renderResultView(result) {
    const p = result.profile;

    // 頂部榮譽橫幅
    this.resBadge.textContent = p.badge || "👑";
    this.resCode.textContent = result.code;
    this.resName.textContent = `✦ ${p.name} ✦`;
    this.resGroup.textContent = `[ ${p.group || "戰略統御矩陣"} ]`;
    this.resTagline.textContent = `“ ${p.tagline} ”`;

    // 渲染雷達圖
    if (!this.radarChart) {
      this.radarChart = new RadarChart("resultRadarCanvas");
    }
    this.radarChart.setData(result.radarData);

    // 渲染 6 大維度能量長條
    this.resDimensionBarsContainer.innerHTML = "";
    Object.keys(result.dimensions).forEach(dimKey => {
      const dim = result.dimensions[dimKey];
      const row = document.createElement("div");
      row.className = "dim-bar-row";

      const isA = dim.dominantCode === dim.codeA;
      row.innerHTML = `
        <div class="dim-bar-header">
          <div class="dim-bar-label-left" style="color: ${isA ? 'var(--text-primary)' : 'var(--text-tertiary)'};">
            <span style="color: ${dim.color}; font-weight:bold;">${dim.codeA}</span> ${dim.labelA.split(' ')[0]}
          </div>
          <div style="font-family: var(--font-mono); font-weight: bold; color: ${dim.color}; font-size: 0.85rem;">
            ${dim.dominantCode} ${dim.dominantPct}%
          </div>
          <div class="dim-bar-label-right" style="color: ${!isA ? 'var(--text-primary)' : 'var(--text-tertiary)'};">
            ${dim.labelB.split(' ')[0]} <span style="color: ${dim.color}; font-weight:bold;">${dim.codeB}</span>
          </div>
        </div>
        <div class="dim-bar-track">
          <div class="dim-bar-fill-a" style="width: ${dim.pctA}%; --dim-color: ${dim.color};"></div>
          <div class="dim-bar-fill-b" style="width: ${dim.pctB}%;"></div>
        </div>
      `;
      this.resDimensionBarsContainer.appendChild(row);
    });

    // 標籤 1: 核心特質與天賦
    this.resSuperpowersList.innerHTML = "";
    p.superpowers.forEach(pw => {
      const item = document.createElement("div");
      item.className = "trait-chip-item";
      item.innerHTML = `
        <div class="chip-icon">⚡</div>
        <div>
          <div class="chip-text-title">${pw}</div>
          <div class="chip-text-desc">天賦本能，能在複雜情境下迅速發揮超常效能。</div>
        </div>
      `;
      this.resSuperpowersList.appendChild(item);
    });

    this.resOverviewText.textContent = `
      ${p.name}（${result.code}）屬於 ${p.group}。${p.tagline}。
      在能量光譜上，你呈現出 ${result.dimensions.EI.dominantLabel} 與 ${result.dimensions.SN.dominantLabel} 的感知模式；
      決策時具備強烈的 ${result.dimensions.TF.dominantLabel} 導向，以 ${result.dimensions.JP.dominantLabel} 的方式組織生活；
      在逆境中展現 ${result.dimensions.AR.dominantLabel} 的韌性，並以 ${result.dimensions.DC.dominantLabel} 作為驅動周遭的核心方式。
    `.trim();

    // 標籤 2: 職場指南
    this.resCareersList.innerHTML = "";
    p.careers.forEach(career => {
      const tag = document.createElement("div");
      tag.className = "career-tag-pill";
      tag.textContent = `🎯 ${career}`;
      this.resCareersList.appendChild(tag);
    });

    // 標籤 3: 愛情人際
    this.resLoveStyleText.textContent = p.loveStyle;

    // 標籤 4: 盲點與充電
    this.resBlindspotsList.innerHTML = "";
    p.blindspots.forEach(bs => {
      const item = document.createElement("div");
      item.className = "trait-chip-item";
      item.innerHTML = `
        <div class="chip-icon">⚠️</div>
        <div>
          <div class="chip-text-title">${bs}</div>
          <div class="chip-text-desc">在高壓或疲倦時容易浮現的思維盲區，建議適時有意識抽離覆盤。</div>
        </div>
      `;
      this.resBlindspotsList.appendChild(item);
    });
    this.resStressRechargeText.textContent = `🔋 建議充電儀式：${p.stressRecharge}`;

    // 標籤 5: 命定拍檔
    const goldenProf = getPersonalityProfile(p.goldenMatch);
    this.resGoldenMatchTitle.textContent = `${p.goldenMatch} ✦ ${goldenProf.name}`;
    
    const growthProf = getPersonalityProfile(p.growthMatch);
    this.resGrowthMatchTitle.textContent = `${p.growthMatch} ✦ ${growthProf.name}`;
  }

  // 開啟分享海報模態框
  async openShareModal() {
    if (!this.currentResult) return;
    soundFX.playClick();
    this.showToast("正在生成專屬高解析度海報... 🎨");

    const dataUrl = await ShareCardGenerator.generateCardDataUrl(this.currentResult);
    this.sharePosterImagePreview.src = dataUrl;
    this.sharePosterModal.classList.add("active");
  }

  // 複製海報圖片至剪貼簿
  async copyPosterImage() {
    if (!this.currentResult) return;
    soundFX.playClick();
    try {
      const canvas = document.createElement("canvas");
      const img = this.sharePosterImagePreview;
      canvas.width = img.naturalWidth || 1080;
      canvas.height = img.naturalHeight || 1620;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(async (blob) => {
        if (blob && navigator.clipboard && navigator.clipboard.write) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          this.showToast("海報圖片已成功複製至剪貼簿！📋");
        } else {
          this.showToast("請直接點擊下載海報按鈕保存圖片 💾");
        }
      });
    } catch (e) {
      this.showToast("請直接點擊下載海報按鈕保存圖片 💾");
    }
  }

  // 複製文字分析摘要
  copyResultSummary() {
    if (!this.currentResult) return;
    soundFX.playClick();
    const r = this.currentResult;
    const summary = `
✦ 64型人格深度測驗分析報告 ✦
━━━━━━━━━━━━━━━━━━━━
【人格代碼】${r.code}
【人格稱號】${r.profile.name} (${r.profile.group})
【核心箴言】${r.profile.tagline}

⚡ 六維能量光譜：
• 能量獲取：${r.dimensions.EI.dominantCode} (${r.dimensions.EI.dominantPct}%) - ${r.dimensions.EI.dominantLabel}
• 資訊感知：${r.dimensions.SN.dominantCode} (${r.dimensions.SN.dominantPct}%) - ${r.dimensions.SN.dominantLabel}
• 決策邏輯：${r.dimensions.TF.dominantCode} (${r.dimensions.TF.dominantPct}%) - ${r.dimensions.TF.dominantLabel}
• 生活步調：${r.dimensions.JP.dominantCode} (${r.dimensions.JP.dominantPct}%) - ${r.dimensions.JP.dominantLabel}
• 心態韌性：${r.dimensions.AR.dominantCode} (${r.dimensions.AR.dominantPct}%) - ${r.dimensions.AR.dominantLabel}
• 行動驅力：${r.dimensions.DC.dominantCode} (${r.dimensions.DC.dominantPct}%) - ${r.dimensions.DC.dominantLabel}

🌟 天賦超能力：${r.profile.superpowers.join("、")}
💼 推薦職場跑道：${r.profile.careers.join("、")}
💖 最佳靈魂拍檔：${r.profile.goldenMatch} (${getPersonalityProfile(r.profile.goldenMatch).name})

👉 探索你的64型心靈宇宙：https://64type.personality.app
━━━━━━━━━━━━━━━━━━━━
    `.trim();

    navigator.clipboard.writeText(summary).then(() => {
      this.showToast("測驗摘要已複製至剪貼簿！📋");
    }).catch(() => {
      this.showToast("複製失敗，請手動選取複製");
    });
  }

  // 開啟 64 型圖鑑百科
  openCodexModal() {
    soundFX.playClick();
    this.codexModal.classList.add("active");
  }

  // 渲染圖鑑卡片
  renderCodexCards(groupFilter = "all", searchTerm = "") {
    const list = getAllPersonalities();
    this.codexCardsGrid.innerHTML = "";

    const filtered = list.filter(item => {
      const matchGroup = groupFilter === "all" || item.group === groupFilter;
      const term = searchTerm.toLowerCase();
      const matchSearch = !term || 
        item.code.toLowerCase().includes(term) || 
        item.name.toLowerCase().includes(term) || 
        item.tagline.toLowerCase().includes(term);
      return matchGroup && matchSearch;
    });

    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "codex-card";
      card.innerHTML = `
        <div class="codex-card-badge">${p.badge || '✨'}</div>
        <div class="codex-card-code">${p.code}</div>
        <div class="codex-card-name">${p.name}</div>
        <div class="codex-card-tag">${p.group || '矩陣原型'}</div>
      `;

      card.addEventListener("click", () => {
        soundFX.playClick();
        this.openPersonaDetail(p.code);
      });

      this.codexCardsGrid.appendChild(card);
    });
  }

  // 開啟單一人格詳情彈窗
  openPersonaDetail(code) {
    const p = getPersonalityProfile(code);
    this.detailModalTitle.textContent = `${p.badge || '✨'} ${p.code} ✦ ${p.name}`;

    const goldenP = getPersonalityProfile(p.goldenMatch);
    const growthP = getPersonalityProfile(p.growthMatch);

    this.detailModalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="dim-code-badge" style="color: var(--secondary-light);">${p.group}</span>
        <div style="font-size: 1.05rem; font-style: italic; color: var(--text-secondary); margin-top: 8px;">
          “ ${p.tagline} ”
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--primary-light); margin-bottom: 8px;">⚡ 天賦超能力</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${p.superpowers.map(s => `<span class="dim-code-badge" style="background: rgba(99, 102, 241, 0.15); color: #fff;">${s}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--secondary-light); margin-bottom: 8px;">💼 適合職業崗位</h4>
        <div class="careers-tag-cloud">
          ${p.careers.map(c => `<span class="career-tag-pill">${c}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-light); margin-bottom: 6px;">❤️ 愛情與人際相處</h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${p.loveStyle}</p>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--warning); margin-bottom: 6px;">⚠️ 盲點與充電建議</h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 4px;"><strong>盲點：</strong>${p.blindspots.join("、")}</p>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;"><strong>充電：</strong>${p.stressRecharge}</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px;">
        <div class="glass-panel" style="padding: 12px; font-size: 0.85rem;">
          <div style="color: var(--accent-light); font-weight: bold;">💖 最佳靈魂拍檔</div>
          <div style="font-weight: bold; margin-top: 4px;">${p.goldenMatch} ${goldenP.name}</div>
        </div>
        <div class="glass-panel" style="padding: 12px; font-size: 0.85rem;">
          <div style="color: var(--secondary-light); font-weight: bold;">🌱 成長磨礪拍檔</div>
          <div style="font-weight: bold; margin-top: 4px;">${p.growthMatch} ${growthP.name}</div>
        </div>
      </div>
    `;

    this.personaDetailModal.classList.add("active");
  }

  // 歷史抽屜
  openHistoryDrawer() {
    soundFX.playClick();
    this.renderHistoryList();
    this.historyDrawerOverlay.classList.add("active");
  }

  renderHistoryList() {
    const history = PersonalityEngine.getHistory();
    this.historyCountText.textContent = `共 ${history.length} 筆紀錄`;
    this.historyListContainer.innerHTML = "";

    if (history.length === 0) {
      this.historyListContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: var(--text-tertiary);">
          尚未有測驗紀錄，快去進行一次測驗吧！🚀
        </div>
      `;
      return;
    }

    history.forEach(item => {
      const card = document.createElement("div");
      card.className = "history-item-card";
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-weight: 800; color: var(--primary-light); font-family: var(--font-mono);">${item.badge || '✨'} ${item.code}</span>
          <span style="font-size: 0.75rem; color: var(--text-tertiary);">${item.date}</span>
        </div>
        <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 6px;">${item.name}</div>
        <div style="font-size: 0.75rem; color: var(--text-tertiary); line-height: 1.4;">
          ${Object.values(item.dimensionsSummary || {}).join(" | ")}
        </div>
      `;

      card.addEventListener("click", () => {
        soundFX.playClick();
        this.historyDrawerOverlay.classList.remove("active");
        this.openPersonaDetail(item.code);
      });

      this.historyListContainer.appendChild(card);
    });
  }

  // 吐司提示
  showToast(message, icon = "✨") {
    this.toastMessage.textContent = message;
    this.toastIcon.textContent = icon;
    this.toastNotification.style.opacity = "1";
    this.toastNotification.style.transform = "translateX(-50%) translateY(0)";

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastNotification.style.opacity = "0";
      this.toastNotification.style.transform = "translateX(-50%) translateY(100px)";
    }, 2800);
  }
}

// 應用程式初始化啟動
document.addEventListener("DOMContentLoaded", () => {
  window.app = new PersonaApp();
});
