/**
 * 64型人格 - 侘寂心靈科技分享海報/官方認證圖卡生成器 (Wabi-Sabi Mind Tech Share Poster)
 */

import { getPersonalityProfile } from '../data/personalityData.js';

export class ShareCardGenerator {
  /**
   * 生成高解析度結果卡片 (1080 x 1680 - IG Story / Threads 規格)
   * @param {Object} result - 測驗分析結果
   * @param {string} userName - 使用者暱稱
   * @returns {Promise<string>} Data URL
   */
  static async generateCardDataUrl(result, userName = "探索者") {
    const canvas = document.createElement("canvas");
    const width = 1080;
    const height = 1680;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // 1. 底圖漸變 (墨夜黑曜 + 陶土微光)
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#0a0c0f");
    bgGradient.addColorStop(0.3, "#12151c");
    bgGradient.addColorStop(0.7, "#161922");
    bgGradient.addColorStop(1, "#0a0c0f");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. 溫潤自然光暈球 (琥珀陶土 + 鼠尾草綠 + 靜謐靛藍)
    const drawGlowCircle = (x, y, radius, color) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    drawGlowCircle(220, 260, 480, "rgba(229, 154, 88, 0.22)");
    drawGlowCircle(880, 750, 500, "rgba(125, 165, 133, 0.18)");
    drawGlowCircle(540, 1400, 450, "rgba(126, 140, 248, 0.16)");

    // 3. 微粒星塵
    ctx.fillStyle = "rgba(245, 244, 239, 0.35)";
    const stars = [
      { x: 120, y: 150, r: 2.2 }, { x: 300, y: 90, r: 1.8 }, { x: 920, y: 180, r: 2.8 },
      { x: 980, y: 400, r: 2.0 }, { x: 100, y: 700, r: 2.2 }, { x: 950, y: 1100, r: 2.5 },
      { x: 140, y: 1450, r: 1.8 }, { x: 880, y: 1550, r: 2.2 }
    ];
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. 外框與四角金屬幾何裝飾 (Aesop 典雅線條)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(44, 44, width - 88, height - 88);

    const drawCorner = (x, y, dx, dy) => {
      ctx.strokeStyle = "#e59a58";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(x, y + dy * 26);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx * 26, y);
      ctx.stroke();
    };
    drawCorner(44, 44, 1, 1);
    drawCorner(width - 44, 44, -1, 1);
    drawCorner(44, height - 44, 1, -1);
    drawCorner(width - 44, height - 44, -1, -1);

    // 5. 頂部認證標題
    ctx.textAlign = "center";
    ctx.font = "bold 20px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#ecc276";
    ctx.fillText("✦ OFFICIAL CERTIFIED PERSONA PROFILE ✦", width / 2, 98);

    ctx.font = "bold 28px 'Noto Serif TC', serif";
    ctx.fillStyle = "#f5f4ef";
    ctx.fillText("64型心智動力學 · 侘寂心靈科技", width / 2, 138);

    // 6. 載入並繪製人物圓形頭像
    const loadImg = (src) => new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });

    const avatarSrc = result.profile.avatar || "./avatars/entj.svg";
    const avatarImg = await loadImg(avatarSrc);

    const avatarCenterX = width / 2;
    const avatarCenterY = 245;
    const avatarRadius = 70;

    if (avatarImg) {
      ctx.save();
      // 外發光環
      ctx.beginPath();
      ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 6, 0, Math.PI * 2);
      ctx.fillStyle = result.profile.groupColor || "#e59a58";
      ctx.shadowColor = result.profile.groupColor || "#e59a58";
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 剪切圓形頭像
      ctx.beginPath();
      ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(
        avatarImg,
        avatarCenterX - avatarRadius,
        avatarCenterY - avatarRadius,
        avatarRadius * 2,
        avatarRadius * 2
      );
      ctx.restore();
    }

    // 7. 發光代碼文字 (Serif / Mono 融合)
    ctx.font = "900 76px 'JetBrains Mono', sans-serif";
    const textGrad = ctx.createLinearGradient(300, 320, 780, 380);
    textGrad.addColorStop(0, "#f5f4ef");
    textGrad.addColorStop(0.5, "#e59a58");
    textGrad.addColorStop(1, "#7da585");
    ctx.fillStyle = textGrad;
    ctx.shadowColor = "rgba(229, 154, 88, 0.4)";
    ctx.shadowBlur = 20;
    ctx.fillText(result.code, width / 2, 375);
    ctx.shadowBlur = 0;

    // 人格中文名稱與受測者姓名 (Noto Serif TC 詩意感)
    ctx.font = "bold 40px 'Noto Serif TC', serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`✦ ${result.profile.name} · ${userName} ✦`, width / 2, 440);

    // 所屬矩陣標籤
    const groupText = `[ ${result.profile.group || "核心心靈矩陣"} · 亞洲罕見度約 2.8% ]`;
    ctx.font = "600 20px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#e59a58";
    ctx.fillText(groupText, width / 2, 485);

    // 8. 座右銘 (Editorial Quote Box)
    const tagline = `“ ${result.profile.tagline} ”`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.beginPath();
    ctx.roundRect(100, 515, width - 200, 68, 14);
    ctx.fill();
    ctx.strokeStyle = "rgba(229, 154, 88, 0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "italic 20px 'Noto Serif TC', serif";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(tagline, width / 2, 556);

    // 9. 台灣亞洲消費者深度共鳴 4 大指標卡片 (Asian Resonance Matrix)
    const ei = result.dimensions.EI || { dominantCode: 'I', dominantPct: 60 };
    const ar = result.dimensions.AR || { dominantCode: 'R', dominantPct: 60 };
    const isIntrovert = ei.dominantCode === 'I';
    const isReflective = ar.dominantCode === 'R';

    const batteryPct = isIntrovert ? Math.max(18, Math.round(100 - ei.dominantPct * 0.85)) : Math.min(92, Math.round(ei.dominantPct * 0.95));
    const overthinkingPct = isReflective ? Math.min(96, Math.round(ar.dominantPct * 0.92 + 8)) : Math.max(24, Math.round(100 - ar.dominantPct * 0.72));

    const cardY1 = 610;
    const cardY2 = 790;
    const cardW = width - 200;
    const cardX = 100;

    // 區塊 A：社交電量與精神內耗雙卡
    const halfW = (cardW - 20) / 2;

    // 卡 1: 社交出廠配置
    ctx.fillStyle = "rgba(22, 25, 34, 0.8)";
    ctx.beginPath();
    ctx.roundRect(cardX, cardY1, halfW, 160, 14);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "bold 18px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#7da585";
    ctx.fillText("🔋 社交出廠電量", cardX + 20, cardY1 + 36);

    ctx.textAlign = "right";
    ctx.font = "bold 22px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#f5f4ef";
    ctx.fillText(`${batteryPct}%`, cardX + halfW - 20, cardY1 + 36);

    // 電量長條
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.roundRect(cardX + 20, cardY1 + 52, halfW - 40, 10, 5);
    ctx.fill();

    ctx.fillStyle = batteryPct < 35 ? "#ef4444" : "#7da585";
    ctx.beginPath();
    ctx.roundRect(cardX + 20, cardY1 + 52, (halfW - 40) * (batteryPct / 100), 10, 5);
    ctx.fill();

    ctx.textAlign = "left";
    ctx.font = "15px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#9da3b0";
    ctx.fillText(isIntrovert ? "• 充電需 48hr 靜音模式" : "• 高能運轉 / 需防深夜透支", cardX + 20, cardY1 + 92);
    ctx.fillText(isIntrovert ? "• 耗電元凶：無效客套寒暄" : "• 耗電元凶：沉悶重複瑣事", cardX + 20, cardY1 + 124);

    // 卡 2: 精神內耗防禦
    const card2X = cardX + halfW + 20;
    ctx.fillStyle = "rgba(22, 25, 34, 0.8)";
    ctx.beginPath();
    ctx.roundRect(card2X, cardY1, halfW, 160, 14);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "bold 18px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#e59a58";
    ctx.fillText("🌪️ 精神內耗防禦", card2X + 20, cardY1 + 36);

    ctx.textAlign = "right";
    ctx.font = "bold 22px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#f5f4ef";
    ctx.fillText(`${overthinkingPct}%`, card2X + halfW - 20, cardY1 + 36);

    // 內耗長條
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.roundRect(card2X + 20, cardY1 + 52, halfW - 40, 10, 5);
    ctx.fill();

    ctx.fillStyle = "#e59a58";
    ctx.beginPath();
    ctx.roundRect(card2X + 20, cardY1 + 52, (halfW - 40) * (overthinkingPct / 100), 10, 5);
    ctx.fill();

    ctx.textAlign = "left";
    ctx.font = "15px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#9da3b0";
    ctx.fillText(isReflective ? "• 想太多星人 / 深夜小劇場" : "• 鈍感自洽 / 心理防禦強大", card2X + 20, cardY1 + 92);
    ctx.fillText(isReflective ? "• 易因他人一句話反芻糾結" : "• 不輕易受外界雜音動搖", card2X + 20, cardY1 + 124);

    // 區塊 B：六維度迷你能量雷達長條
    const dimKeys = ["EI", "SN", "TF", "JP", "AR", "DC"];
    const startY = cardY2;
    const barHeight = 40;
    const spacing = 52;

    dimKeys.forEach((key, idx) => {
      const dim = result.dimensions[key];
      const y = startY + idx * spacing;

      ctx.fillStyle = "rgba(22, 25, 34, 0.7)";
      ctx.beginPath();
      ctx.roundRect(cardX, y, cardW, barHeight, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.font = "bold 16px 'Noto Sans TC', sans-serif";
      ctx.fillStyle = "#9da3b0";
      ctx.fillText(dim.name, cardX + 18, y + 25);

      const isA = dim.dominantCode === dim.codeA;
      ctx.textAlign = "left";
      ctx.font = isA ? "bold 16px 'JetBrains Mono', 'Noto Sans TC'" : "15px 'Noto Sans TC'";
      ctx.fillStyle = isA ? "#f5f4ef" : "#686e7d";
      ctx.fillText(`${dim.codeA} ${dim.labelA.split(' ')[0]} ${dim.pctA}%`, cardX + 115, y + 25);

      ctx.textAlign = "right";
      const isDominantB = !isA;
      ctx.font = isDominantB ? "bold 16px 'JetBrains Mono', 'Noto Sans TC'" : "15px 'Noto Sans TC'";
      ctx.fillStyle = isDominantB ? "#f5f4ef" : "#686e7d";
      ctx.fillText(`${dim.pctB}% ${dim.labelB.split(' ')[0]} ${dim.codeB}`, cardX + cardW - 130, y + 25);

      const barX = cardX + 290;
      const barW = cardW - 440;
      const barY = y + 15;
      const barH = 10;

      // 軌道背景
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, 5);
      ctx.fill();

      // 50% 中線
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.fillRect(barX + barW / 2 - 1, barY - 2, 2, barH + 4);

      // 主導維度填色
      const fillW = (dim.dominantPct / 100) * barW;
      const fillX = isA ? barX : barX + barW - fillW;

      ctx.fillStyle = dim.color || "#e59a58";
      ctx.beginPath();
      ctx.roundRect(fillX, barY, Math.max(6, fillW), barH, 5);
      ctx.fill();

      ctx.textAlign = "right";
      ctx.font = "bold 16px 'JetBrains Mono', monospace";
      ctx.fillStyle = dim.color || "#e59a58";
      ctx.fillText(`${dim.dominantCode} ${dim.dominantPct}%`, cardX + cardW - 18, y + 25);
    });

    // 10. 身心自救與靈魂拍檔雙欄 (Somatic Grounding & Golden Match)
    const matchY = 1130;
    ctx.fillStyle = "rgba(22, 25, 34, 0.85)";
    ctx.beginPath();
    ctx.roundRect(cardX, matchY, cardW, 280, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(229, 154, 88, 0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 身心自救處方
    ctx.textAlign = "left";
    ctx.font = "bold 20px 'Noto Serif TC', serif";
    ctx.fillStyle = "#ecc276";
    ctx.fillText("🌿 深夜 3 分鐘回血處方 (Somatic Grounding)", cardX + 24, matchY + 42);

    ctx.font = "16px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#f5f4ef";
    ctx.fillText(isIntrovert ? "• 生理性嘆氣：連續鼻子快吸 2 次 + 嘴巴慢吐氣 6 秒，重置自律神經。" : "• 5-4-3-2-1 著陸法：辨認身邊 5 物品、4 觸感、3 聲音，回到當下呼吸。", cardX + 24, matchY + 80);
    ctx.fillText(isIntrovert ? "• 能量回血：關閉所有通知，洗個熱水澡，聽一首 Lo-fi 老歌。" : "• 能量回血：找懂你的摯友痛快聊一場，或安排一次戶外大自然出走。", cardX + 24, matchY + 114);

    // 分隔線
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.moveTo(cardX + 24, matchY + 140);
    ctx.lineTo(cardX + cardW - 24, matchY + 140);
    ctx.stroke();

    // 靈魂拍檔與能量剋星
    ctx.font = "bold 20px 'Noto Serif TC', serif";
    ctx.fillStyle = "#7da585";
    ctx.fillText("💫 關係動力學 (Relational Synastry)", cardX + 24, matchY + 178);

    const goldenProf = getPersonalityProfile(result.profile.goldenMatch);
    ctx.font = "bold 17px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• 靈魂同頻拍檔：${result.profile.goldenMatch} ✦ ${goldenProf.name || '天生契合'}`, cardX + 24, matchY + 214);

    ctx.font = "16px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#e59a58";
    ctx.fillText(`• 能量吸血鬼：${isIntrovert ? '情緒巨嬰型 (不斷倒苦水卻不改變)' : '被動攻擊型 (表面答應私下拖延)'}`, cardX + 24, matchY + 248);

    // 11. 底部專屬水印與標註
    ctx.textAlign = "center";
    ctx.font = "16px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "rgba(157, 163, 176, 0.85)";
    ctx.fillText("64型心智動力學 · 60題深度情境評估系統  |  掃描或搜尋 64Type 解鎖專屬報告", width / 2, 1490);

    ctx.font = "bold 20px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#ecc276";
    ctx.fillText("✦ VERIFIED PERSONA CERTIFICATE · 侘寂心靈科技 ✦", width / 2, 1535);

    return canvas.toDataURL("image/png");
  }

  static async downloadCard(result, userName = "探索者") {
    const dataUrl = await ShareCardGenerator.generateCardDataUrl(result, userName);
    const link = document.createElement("a");
    link.download = `64Type_${result.code}_${userName}_${result.profile.name}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

