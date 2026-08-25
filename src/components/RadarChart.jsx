import React, { useRef, useEffect } from 'react';

export function RadarChartComponent({ data, isDarkMode = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 380;
    const height = 380;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    let animationProgress = 0;
    let animationId = null;
    const startTime = performance.now();
    const duration = 900;

    const draw = (progress) => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) / 2 - 45;
      const numAxes = data.length;
      const angleStep = (Math.PI * 2) / numAxes;
      const startAngle = -Math.PI / 2;

      const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
      const textColor = isDarkMode ? '#e2e8f0' : '#334155';

      // 1. 同心多邊形網格
      for (let level = 1; level <= 5; level++) {
        const radius = (maxRadius / 5) * level;
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

        if (level % 2 === 0) {
          ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.015)';
          ctx.fill();
        }
      }

      // 2. 軸線
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

      // 3. 數據多邊形
      const points = [];
      for (let i = 0; i < numAxes; i++) {
        const item = data[i];
        const val = (item.value / 100) * progress;
        const radius = maxRadius * Math.max(0.15, val);
        const angle = startAngle + i * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push({ x, y, item, angle });
      }

      ctx.beginPath();
      points.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();

      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, maxRadius);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.45)');
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.35)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.15)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(99, 102, 241, 0.6)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. 頂點與標籤
      points.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = pt.item.color || '#6366f1';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const labelDistance = maxRadius + 22;
        const lx = centerX + labelDistance * Math.cos(pt.angle);
        const ly = centerY + labelDistance * Math.sin(pt.angle);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.font = "bold 13px 'Plus Jakarta Sans', 'Noto Sans TC', sans-serif";
        ctx.fillStyle = textColor;
        ctx.fillText(pt.item.label, lx, ly - 7);

        const currentPct = Math.round(pt.item.value * progress);
        ctx.font = "600 12px 'JetBrains Mono', monospace";
        ctx.fillStyle = pt.item.color || '#6366f1';
        ctx.fillText(`${currentPct}%`, lx, ly + 8);
      });

      ctx.restore();
    };

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      animationProgress = 1 - Math.pow(1 - progress, 3);
      draw(animationProgress);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [data, isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        maxWidth: '380px',
        height: '380px',
        display: 'block'
      }}
    />
  );
}
