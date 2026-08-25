/**
 * 64型人格分析計算引擎 (Engine)
 * 負責計分統計、常態化百分比計算、維度判定與人格數據整合
 */

class PersonalityEngine {
  /**
   * 計算 36 題測驗結果
   * @param {Object} answers - 題目 ID 對應之數值答案 { 1: 2, 2: -1, ... }
   * @returns {Object} 完整分析結果
   */
  static calculateResult(answers) {
    // 初始化 6 大維度計分
    const dimensionScores = {
      EI: { raw: 0, maxPossible: 0, count: 0 },
      SN: { raw: 0, maxPossible: 0, count: 0 },
      TF: { raw: 0, maxPossible: 0, count: 0 },
      JP: { raw: 0, maxPossible: 0, count: 0 },
      AR: { raw: 0, maxPossible: 0, count: 0 },
      DC: { raw: 0, maxPossible: 0, count: 0 }
    };

    // 遍歷 36 題計分
    QUESTIONS.forEach(q => {
      const userVal = answers[q.id] !== undefined ? Number(answers[q.id]) : 0;
      // direction: 1 代表正向偏 A, -1 代表反向偏 B
      const scoredVal = userVal * q.direction;
      
      if (dimensionScores[q.dimension]) {
        dimensionScores[q.dimension].raw += scoredVal;
        dimensionScores[q.dimension].maxPossible += 2; // 5段量表最大絕對值為 2
        dimensionScores[q.dimension].count += 1;
      }
    });

    const dimensionAnalysis = {};
    const selectedLetters = {};

    // 計算各維度百分比與主導極性
    Object.keys(DIMENSIONS).forEach(dimKey => {
      const meta = DIMENSIONS[dimKey];
      const scoreObj = dimensionScores[dimKey];
      const maxRaw = scoreObj.maxPossible || 16; // 8題 * 2 = 16
      const raw = scoreObj.raw;

      // 轉換成 0 ~ 100% 的 A 維度傾向 (0 = 100% B, 50 = 中立, 100 = 100% A)
      const ratioA = (raw + maxRaw) / (2 * maxRaw);
      let pctA = Math.round(ratioA * 100);
      pctA = Math.max(0, Math.min(100, pctA));
      const pctB = 100 - pctA;

      let dominantCode = "";
      let dominantPct = 0;
      let secondaryCode = "";
      let secondaryPct = 0;
      let dominantLabel = "";
      let dominantDesc = "";
      let traitStrength = "";

      if (pctA >= 50) {
        dominantCode = meta.codeA;
        dominantPct = pctA;
        secondaryCode = meta.codeB;
        secondaryPct = pctB;
        dominantLabel = meta.labelA;
        dominantDesc = meta.descA;
      } else {
        dominantCode = meta.codeB;
        dominantPct = pctB;
        secondaryCode = meta.codeA;
        secondaryPct = pctA;
        dominantLabel = meta.labelB;
        dominantDesc = meta.descB;
      }

      // 特質強度判定
      if (dominantPct >= 80) {
        traitStrength = "極顯著 (Very Distinct)";
      } else if (dominantPct >= 65) {
        traitStrength = "顯著 (Distinct)";
      } else if (dominantPct > 50) {
        traitStrength = "輕微偏向 (Moderate)";
      } else {
        traitStrength = "高度平衡 (Balanced)";
      }

      selectedLetters[dimKey] = dominantCode;

      dimensionAnalysis[dimKey] = {
        key: dimKey,
        name: meta.name,
        color: meta.color,
        codeA: meta.codeA,
        labelA: meta.labelA,
        pctA: pctA,
        descA: meta.descA,
        codeB: meta.codeB,
        labelB: meta.labelB,
        pctB: pctB,
        descB: meta.descB,
        dominantCode,
        dominantPct,
        secondaryCode,
        secondaryPct,
        dominantLabel,
        dominantDesc,
        traitStrength,
        raw
      };
    });

    // 組合 6 位代碼：前4位 (MBTI) + 後2位 (子維度) e.g., ENTJ-AD
    const baseCode = `${selectedLetters.EI}${selectedLetters.SN}${selectedLetters.TF}${selectedLetters.JP}`;
    const subCode = `${selectedLetters.AR}${selectedLetters.DC}`;
    const fullCode = `${baseCode}-${subCode}`;

    // 取得 64 型專屬人格完整資料
    const profile = getPersonalityProfile(fullCode);

    return {
      code: fullCode,
      baseCode,
      subCode,
      profile,
      dimensions: dimensionAnalysis,
      completedAt: new Date().toISOString(),
      radarData: [
        { label: `能量 (${selectedLetters.EI})`, value: dimensionAnalysis.EI.dominantPct, color: DIMENSIONS.EI.color, code: selectedLetters.EI },
        { label: `感知 (${selectedLetters.SN})`, value: dimensionAnalysis.SN.dominantPct, color: DIMENSIONS.SN.color, code: selectedLetters.SN },
        { label: `決策 (${selectedLetters.TF})`, value: dimensionAnalysis.TF.dominantPct, color: DIMENSIONS.TF.color, code: selectedLetters.TF },
        { label: `步調 (${selectedLetters.JP})`, value: dimensionAnalysis.JP.dominantPct, color: DIMENSIONS.JP.color, code: selectedLetters.JP },
        { label: `心態 (${selectedLetters.AR})`, value: dimensionAnalysis.AR.dominantPct, color: DIMENSIONS.AR.color, code: selectedLetters.AR },
        { label: `驅力 (${selectedLetters.DC})`, value: dimensionAnalysis.DC.dominantPct, color: DIMENSIONS.DC.color, code: selectedLetters.DC }
      ]
    };
  }

  /**
   * 儲存測驗記錄至 LocalStorage
   */
  static saveHistory(result) {
    try {
      const history = PersonalityEngine.getHistory();
      history.unshift({
        id: "res_" + Date.now(),
        code: result.code,
        name: result.profile.name,
        badge: result.profile.badge,
        tagline: result.profile.tagline,
        date: new Date().toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
        dimensionsSummary: {
          EI: `${result.dimensions.EI.dominantCode} (${result.dimensions.EI.dominantPct}%)`,
          SN: `${result.dimensions.SN.dominantCode} (${result.dimensions.SN.dominantPct}%)`,
          TF: `${result.dimensions.TF.dominantCode} (${result.dimensions.TF.dominantPct}%)`,
          JP: `${result.dimensions.JP.dominantCode} (${result.dimensions.JP.dominantPct}%)`,
          AR: `${result.dimensions.AR.dominantCode} (${result.dimensions.AR.dominantPct}%)`,
          DC: `${result.dimensions.DC.dominantCode} (${result.dimensions.DC.dominantPct}%)`
        }
      });
      // 最多保留 20 筆
      const trimmed = history.slice(0, 20);
      localStorage.setItem("persona_64_history", JSON.stringify(trimmed));
    } catch (e) {
      console.warn("無法存取 LocalStorage:", e);
    }
  }

  /**
   * 取得歷史記錄
   */
  static getHistory() {
    try {
      const raw = localStorage.getItem("persona_64_history");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * 清除歷史記錄
   */
  static clearHistory() {
    try {
      localStorage.removeItem("persona_64_history");
    } catch (e) {
      console.warn("無法清除 LocalStorage");
    }
  }
}
