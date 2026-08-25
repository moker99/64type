/**
 * 6維度動態雷達圖繪製組件 (Canvas Radar Chart)
 * 具備高畫質 Retina 支援、流暢進場動畫、發光漸變填充與主題適配
 */

class RadarChart {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.options = {
      animationDuration: 1000,
      gridLevels: 5, // 20%, 40%, 60%, 80%, 100%
      primaryColor: options.primaryColor || "#6366f1",
      secondaryColor: options.secondaryColor || "#06b6d4",
      accentColor: options.accentColor || "#ec4899",
      ...options
    };
    this.animationProgress = 0;
    this.animationId = null;
    this.data = [];
  }

  setData(radarData) {
    this.data = radarData || [];
    this.startAnimation();
  }

  startAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    const startTime = performance.now();
    const duration = this.options.animationDuration;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      this.animationProgress = 1 - Math.pow(1 - progress, 3);
      this.draw();

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  draw() {
    if (!this.canvas || !this.ctx || this.data.length === 0) return;
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 1;

    // 響應式尺寸處理
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width || 420;
    const height = rect.height || 420;

    if (this.canvas.width !== width * dpr || this.canvas.height !== height * dpr) {
      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 48;
    const numAxes = this.data.length; // 6
    const angleStep = (Math.PI * 2) / numAxes;
    const startAngle = -Math.PI / 2; // 從 12 點鐘方向開始

    const isDarkMode = document.documentElement.getAttribute("data-theme") !== "light";
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)";
    const textColor = isDarkMode ? "#e2e8f0" : "#334155";
    const subTextColor = isDarkMode ? "#94a3b8" : "#64748b";

    // 1. 繪製同心多邊形網格
    for (let level = 1; level <= this.options.gridLevels; level++) {
      const radius = (maxRadius / this.options.gridLevels) * level;
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = startAngle + i * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // 網格背景微弱漸變
      if (level % 2 === 0) {
        ctx.fillStyle = isDarkMode ? "rgba(255, 255, 255, 0.015)" : "rgba(0, 0, 0, 0.015)";
        ctx.fill();
      }

      // 刻度標籤 (20%, 40%, 60%, 80%, 100%)
      if (level === this.options.gridLevels || level === 3) {
        const pctLabel = `${level * 20}%`;
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = isDarkMode ? "rgba(148, 163, 184, 0.5)" : "rgba(100, 116, 139, 0.5)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(pctLabel, centerX, centerY - radius + 8);
      }
    }

    // 2. 繪製軸線
    for (let i = 0; i < numAxes; i++) {
      const angle = startAngle + i * angleStep;
      const x = centerX + maxRadius * Math.cos(angle);
      const y = centerY + maxRadius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // 3. 繪製數據多邊形 (含動畫進度)
    const points = [];
    for (let i = 0; i < numAxes; i++) {
      const item = this.data[i];
      const val = (item.value / 100) * this.animationProgress;
      const radius = maxRadius * Math.max(0.15, val);
      const angle = startAngle + i * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push({ x, y, item, radius, angle });
    }

    // 填充漸變多邊形
    ctx.beginPath();
    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();

    // 漸變填充
    const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, maxRadius);
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.45)");
    gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.35)");
    gradient.addColorStop(1, "rgba(236, 72, 153, 0.15)");
    ctx.fillStyle = gradient;
    ctx.fill();

    // 多邊形發光外框
    ctx.strokeStyle = "#818cf8";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "rgba(99, 102, 241, 0.7)";
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0; // 重置陰影

    // 4. 繪製頂點圓圈與數值光暈
    points.forEach((pt) => {
      // 外發光光環
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(99, 102, 241, 0.3)";
      ctx.fill();

      // 核心圓點
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = pt.item.color || "#6366f1";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 5. 繪製六大維度標籤與百分比
    points.forEach((pt, i) => {
      const angle = pt.angle;
      const labelDistance = maxRadius + 24;
      const lx = centerX + labelDistance * Math.cos(angle);
      const ly = centerY + labelDistance * Math.sin(angle);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 標籤主要文字
      ctx.font = "bold 13px 'Plus Jakarta Sans', 'Noto Sans TC', sans-serif";
      ctx.fillStyle = textColor;
      ctx.fillText(pt.item.label, lx, ly - 8);

      // 百分比文字
      const currentPct = Math.round(pt.item.value * this.animationProgress);
      ctx.font = "600 12px 'JetBrains Mono', monospace";
      ctx.fillStyle = pt.item.color || this.options.primaryColor;
      ctx.fillText(`${currentPct}%`, lx, ly + 8);
    });

    ctx.restore();
  }
}
