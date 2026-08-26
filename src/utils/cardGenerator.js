/**
 * 64型人格 - 分享海報/官方認證圖卡生成器 (Share Card Generator)
 */

import { getPersonalityProfile } from '../data/personalityData.js';

export class ShareCardGenerator {
  /**
   * 生成高解析度結果卡片
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

    // 1. 底圖漸變 (旗艦星空奢華底色)
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#070913");
    bgGradient.addColorStop(0.3, "#0d1124");
    bgGradient.addColorStop(0.7, "#111736");
    bgGradient.addColorStop(1, "#070913");
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

    drawGlowCircle(220, 260, 480, "rgba(99, 102, 241, 0.25)");
    drawGlowCircle(880, 850, 520, "rgba(6, 182, 212, 0.18)");
    drawGlowCircle(540, 1400, 450, "rgba(236, 72, 153, 0.18)");

    // 3. 微粒星塵
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
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

    // 4. 外框與四角科技金屬幾何裝飾
    ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    const drawCorner = (x, y, dx, dy) => {
      ctx.strokeStyle = "#818cf8";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x, y + dy * 28);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx * 28, y);
      ctx.stroke();
    };
    drawCorner(40, 40, 1, 1);
    drawCorner(width - 40, 40, -1, 1);
    drawCorner(40, height - 40, 1, -1);
    drawCorner(width - 40, height - 40, -1, -1);

    // 5. 頂部認證標題
    ctx.textAlign = "center";
    ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#fbbf24";
    ctx.fillText("✦ OFFICIAL CERTIFIED PERSONA PROFILE ✦", width / 2, 95);

    ctx.font = "bold 28px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("64型心智動力學 · 深度性格分析報告", width / 2, 135);

    // 6. 載入並繪製人物 3D 立繪圓形頭像
    const loadImg = (src) => new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });

    const avatarSrc = result.profile.avatar || "./avatars/strategist.svg";
    const avatarImg = await loadImg(avatarSrc);

    const avatarCenterX = width / 2;
    const avatarCenterY = 250;
    const avatarRadius = 75;

    if (avatarImg) {
      ctx.save();
      // 外發光環
      ctx.beginPath();
      ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 6, 0, Math.PI * 2);
      ctx.fillStyle = result.profile.groupColor || "#6366f1";
      ctx.shadowColor = result.profile.groupColor || "#6366f1";
      ctx.shadowBlur = 30;
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

    // 7. 發光代碼文字
    ctx.font = "900 80px 'Plus Jakarta Sans', sans-serif";
    const textGrad = ctx.createLinearGradient(300, 330, 780, 390);
    textGrad.addColorStop(0, "#a5b4fc");
    textGrad.addColorStop(0.5, "#38bdf8");
    textGrad.addColorStop(1, "#f472b6");
    ctx.fillStyle = textGrad;
    ctx.shadowColor = "rgba(99, 102, 241, 0.65)";
    ctx.shadowBlur = 26;
    ctx.fillText(result.code, width / 2, 385);
    ctx.shadowBlur = 0;

    // 人格中文名稱與受測者姓名
    ctx.font = "bold 44px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`✦ ${result.profile.name} · ${userName} ✦`, width / 2, 455);

    // 所屬矩陣標籤
    const groupText = `[ ${result.profile.group || "核心光譜矩陣"} · ${result.profile.groupEnName || "Matrix"} ]`;
    ctx.font = "600 22px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(groupText, width / 2, 502);

    // 8. 座右銘
    const tagline = `“ ${result.profile.tagline} ”`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.beginPath();
    ctx.roundRect(120, 535, width - 240, 70, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "italic 22px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(tagline, width / 2, 578);

    // 9. 六維度能量條
    const dimKeys = ["EI", "SN", "TF", "JP", "AR", "DC"];
    const startY = 645;
    const barHeight = 44;
    const spacing = 58;

    dimKeys.forEach((key, idx) => {
      const dim = result.dimensions[key];
      const y = startY + idx * spacing;
      const cardX = 100;
      const cardW = width - 200;

      ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
      ctx.beginPath();
      ctx.roundRect(cardX, y, cardW, barHeight, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.font = "bold 18px 'Noto Sans TC', sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(dim.name, cardX + 20, y + 28);

      const isA = dim.dominantCode === dim.codeA;
      ctx.textAlign = "left";
      ctx.font = isA ? "bold 18px 'Plus Jakarta Sans', 'Noto Sans TC'" : "16px 'Noto Sans TC'";
      ctx.fillStyle = isA ? "#ffffff" : "#64748b";
      ctx.fillText(`${dim.codeA} ${dim.labelA.split(' ')[0]} ${dim.pctA}%`, cardX + 30, y + 28);

      ctx.textAlign = "right";
      const isDominantB = !isA;
      ctx.font = isDominantB ? "bold 18px 'Plus Jakarta Sans', 'Noto Sans TC'" : "16px 'Noto Sans TC'";
      ctx.fillStyle = isDominantB ? "#ffffff" : "#64748b";
      ctx.fillText(`${dim.pctB}% ${dim.labelB.split(' ')[0]} ${dim.codeB}`, cardX + cardW - 130, y + 28);

      const barX = cardX + 310;
      const barW = cardW - 460;
      const barY = y + 16;
      const barH = 12;

      // 軌道背景
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, 6);
      ctx.fill();

      // 50% 中線
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillRect(barX + barW / 2 - 1, barY - 2, 2, barH + 4);

      // 主導維度填色 (A 從左到右，B 從右到左)
      const fillW = (dim.dominantPct / 100) * barW;
      const fillX = isA ? barX : barX + barW - fillW;

      ctx.fillStyle = dim.color || "#6366f1";
      ctx.beginPath();
      ctx.roundRect(fillX, barY, Math.max(8, fillW), barH, 6);
      ctx.fill();

      ctx.textAlign = "right";
      ctx.font = "bold 18px 'JetBrains Mono', monospace";
      ctx.fillStyle = dim.color || "#38bdf8";
      ctx.fillText(`${dim.dominantCode} ${dim.dominantPct}%`, cardX + cardW - 20, y + 28);
    });

    // 10. 超能力區塊
    const spY = 1030;
    ctx.fillStyle = "rgba(30, 41, 59, 0.6)";
    ctx.beginPath();
    ctx.roundRect(100, spY, width - 200, 220, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "bold 22px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#a5b4fc";
    ctx.fillText("⚡ 核心天賦超能力 (Superpowers)", 135, spY + 45);

    const powers = result.profile.superpowers || ["卓越洞察力", "快速適應力", "深層共鳴力"];
    powers.slice(0, 3).forEach((pw, pIdx) => {
      ctx.font = "20px 'Noto Sans TC', sans-serif";
      ctx.fillStyle = "#f8fafc";
      ctx.fillText(`⚡  ${pw}`, 145, spY + 95 + pIdx * 42);
    });

    // 11. 黃金契合拍檔
    const matchY = 1280;
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.beginPath();
    ctx.roundRect(100, matchY, width - 200, 135, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "bold 20px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#f472b6";
    ctx.fillText("💖 靈魂最佳拍檔 (Golden Match):", 135, matchY + 48);

    const goldenProf = getPersonalityProfile(result.profile.goldenMatch);
    ctx.font = "bold 22px 'Plus Jakarta Sans', 'Noto Sans TC'";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${result.profile.goldenMatch} ✦ ${goldenProf.name}`, 135, matchY + 90);

    // 12. 底部專屬水印與標註
    ctx.textAlign = "center";
    ctx.font = "16px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
    ctx.fillText("64型心智動力學 · 60題深度性格評估系統  |  掃描或點擊解鎖專屬報告", width / 2, 1510);

    ctx.font = "bold 19px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#fbbf24";
    ctx.fillText("✦ VERIFIED PERSONA CERTIFICATE ✦", width / 2, 1550);

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
