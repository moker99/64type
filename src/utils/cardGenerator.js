/**
 * 64型人格 - 分享海報/圖卡生成器 (Share Card Generator)
 */

import { getPersonalityProfile } from '../data/personalityData.js';

export class ShareCardGenerator {
  /**
   * 生成高解析度結果卡片
   * @param {Object} result - 測驗分析結果
   * @returns {Promise<string>} Data URL
   */
  static async generateCardDataUrl(result) {
    const canvas = document.createElement("canvas");
    const width = 1080;
    const height = 1620;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // 1. 底圖漸變
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#090d16");
    bgGradient.addColorStop(0.4, "#0f172a");
    bgGradient.addColorStop(0.8, "#13132b");
    bgGradient.addColorStop(1, "#090d16");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. 光暈球
    const drawGlowCircle = (x, y, radius, color) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    drawGlowCircle(200, 250, 450, "rgba(99, 102, 241, 0.2)");
    drawGlowCircle(880, 800, 500, "rgba(6, 182, 212, 0.15)");
    drawGlowCircle(540, 1350, 400, "rgba(236, 72, 153, 0.15)");

    // 3. 微粒星塵
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    const stars = [
      { x: 120, y: 150, r: 2 }, { x: 300, y: 90, r: 1.5 }, { x: 920, y: 180, r: 2.5 },
      { x: 980, y: 400, r: 1.8 }, { x: 100, y: 700, r: 2 }, { x: 950, y: 1100, r: 2.2 },
      { x: 140, y: 1400, r: 1.5 }, { x: 880, y: 1500, r: 2 }
    ];
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. 外框與四角科技裝飾
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    const drawCorner = (x, y, dx, dy) => {
      ctx.strokeStyle = "#6366f1";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x, y + dy * 24);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx * 24, y);
      ctx.stroke();
    };
    drawCorner(40, 40, 1, 1);
    drawCorner(width - 40, 40, -1, 1);
    drawCorner(40, height - 40, 1, -1);
    drawCorner(width - 40, height - 40, -1, -1);

    // 5. 頂部標題
    ctx.textAlign = "center";
    ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#818cf8";
    ctx.fillText("✦ 64-TYPE PERSONA DYNAMICS ✦", width / 2, 105);

    ctx.font = "18px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "rgba(226, 232, 240, 0.6)";
    ctx.fillText("60題深度性格維度分析報告", width / 2, 140);

    // 6. 徽章與代碼
    const badge = result.profile.badge || "✨";
    ctx.font = "84px 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif";
    ctx.fillText(badge, width / 2, 260);

    ctx.font = "900 78px 'Plus Jakarta Sans', sans-serif";
    const textGrad = ctx.createLinearGradient(300, 300, 780, 360);
    textGrad.addColorStop(0, "#a5b4fc");
    textGrad.addColorStop(0.5, "#38bdf8");
    textGrad.addColorStop(1, "#f472b6");
    ctx.fillStyle = textGrad;
    ctx.shadowColor = "rgba(99, 102, 241, 0.6)";
    ctx.shadowBlur = 24;
    ctx.fillText(result.code, width / 2, 365);
    ctx.shadowBlur = 0;

    // 人格名稱
    ctx.font = "bold 44px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`✦ ${result.profile.name} ✦`, width / 2, 435);

    // 所屬矩陣標籤
    const groupText = `[ ${result.profile.group || "核心光譜矩陣"} ]`;
    ctx.font = "600 20px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(groupText, width / 2, 480);

    // 7. 座右銘
    const tagline = `“ ${result.profile.tagline} ”`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.beginPath();
    ctx.roundRect(120, 515, width - 240, 70, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "italic 22px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(tagline, width / 2, 558);

    // 8. 六維度能量條
    const dimKeys = ["EI", "SN", "TF", "JP", "AR", "DC"];
    const startY = 625;
    const barHeight = 44;
    const spacing = 58;

    dimKeys.forEach((key, idx) => {
      const dim = result.dimensions[key];
      const y = startY + idx * spacing;
      const cardX = 100;
      const cardW = width - 200;

      ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
      ctx.beginPath();
      ctx.roundRect(cardX, y, cardW, barHeight, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.font = "bold 18px 'Noto Sans TC', sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(dim.name, cardX + 20, y + 28);

      const isDominantA = dim.dominantCode === dim.codeA;
      ctx.font = isDominantA ? "bold 18px 'Plus Jakarta Sans', 'Noto Sans TC'" : "16px 'Noto Sans TC'";
      ctx.fillStyle = isDominantA ? "#ffffff" : "#64748b";
      ctx.fillText(`${dim.codeA} ${dim.labelA.split(' ')[0]}`, cardX + 130, y + 28);

      ctx.textAlign = "right";
      const isDominantB = dim.dominantCode === dim.codeB;
      ctx.font = isDominantB ? "bold 18px 'Plus Jakarta Sans', 'Noto Sans TC'" : "16px 'Noto Sans TC'";
      ctx.fillStyle = isDominantB ? "#ffffff" : "#64748b";
      ctx.fillText(`${dim.labelB.split(' ')[0]} ${dim.codeB}`, cardX + cardW - 130, y + 28);

      const barX = cardX + 270;
      const barW = cardW - 420;
      const barY = y + 16;
      const barH = 12;

      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, 6);
      ctx.fill();

      const fillW = (dim.pctA / 100) * barW;
      const barGrad = ctx.createLinearGradient(barX, barY, barX + barW, barY);
      barGrad.addColorStop(0, dim.color || "#6366f1");
      barGrad.addColorStop(1, "#38bdf8");
      ctx.fillStyle = barGrad;
      ctx.beginPath();
      ctx.roundRect(barX, barY, Math.max(8, fillW), barH, 6);
      ctx.fill();

      ctx.textAlign = "right";
      ctx.font = "bold 18px 'JetBrains Mono', monospace";
      ctx.fillStyle = dim.color || "#38bdf8";
      ctx.fillText(`${dim.dominantCode} ${dim.dominantPct}%`, cardX + cardW - 20, y + 28);
    });

    // 9. 超能力區塊
    const spY = 1005;
    ctx.fillStyle = "rgba(30, 41, 59, 0.5)";
    ctx.beginPath();
    ctx.roundRect(100, spY, width - 200, 220, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "bold 22px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#a5b4fc";
    ctx.fillText("✦ 核心天賦超能力 (Superpowers)", 135, spY + 45);

    const powers = result.profile.superpowers || ["卓越洞察力", "快速適應力", "深層共鳴力"];
    powers.slice(0, 3).forEach((pw, pIdx) => {
      ctx.font = "20px 'Noto Sans TC', sans-serif";
      ctx.fillStyle = "#f8fafc";
      ctx.fillText(`⚡  ${pw}`, 145, spY + 95 + pIdx * 42);
    });

    // 10. 黃金契合拍檔
    const matchY = 1250;
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.beginPath();
    ctx.roundRect(100, matchY, width - 200, 135, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "bold 20px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#f472b6";
    ctx.fillText("💖 靈魂最佳拍檔 (Golden Match):", 135, matchY + 48);

    const goldenProf = getPersonalityProfile(result.profile.goldenMatch);
    ctx.font = "bold 22px 'Plus Jakarta Sans', 'Noto Sans TC'";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${result.profile.goldenMatch} ✦ ${goldenProf.name}`, 135, matchY + 90);

    // 11. 底部專屬水印與標註
    ctx.textAlign = "center";
    ctx.font = "16px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
    ctx.fillText("64型人格60題深度測驗  |  探索你的專屬心靈宇宙", width / 2, 1475);

    ctx.font = "bold 18px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#6366f1";
    ctx.fillText("64-Type Persona Dynamics", width / 2, 1515);

    return canvas.toDataURL("image/png");
  }

  static async downloadCard(result) {
    const dataUrl = await ShareCardGenerator.generateCardDataUrl(result);
    const link = document.createElement("a");
    link.download = `64Type_${result.code}_${result.profile.name}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
