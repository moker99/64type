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

      const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(60, 50, 40, 0.1)';
      const textColor = isDarkMode ? '#f5f4ef' : '#22201e';

      // 1. 同心多邊形網格 (侘寂簡潔線條)
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
          ctx.fillStyle = isDarkMode ? 'rgba(229, 154, 88, 0.02)' : 'rgba(168, 90, 45, 0.02)';
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
        ctx.lineWidth = 1;
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

      // 侘寂心靈科技自然漸變 (琥珀陶土 + 鼠尾草綠 + 靜謐靛藍)
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, maxRadius);
      if (isDarkMode) {
        gradient.addColorStop(0, 'rgba(229, 154, 88, 0.42)');
        gradient.addColorStop(0.5, 'rgba(125, 165, 133, 0.3)');
        gradient.addColorStop(1, 'rgba(126, 140, 248, 0.15)');
      } else {
        gradient.addColorStop(0, 'rgba(168, 90, 45, 0.35)');
        gradient.addColorStop(0.5, 'rgba(74, 99, 80, 0.25)');
        gradient.addColorStop(1, 'rgba(79, 88, 153, 0.12)');
      }
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = isDarkMode ? '#e59a58' : '#a85a2d';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = isDarkMode ? 'rgba(229, 154, 88, 0.5)' : 'rgba(168, 90, 45, 0.3)';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. 頂點與標籤
      points.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? '#ecc276' : '#b8782a';
        ctx.fill();
        ctx.strokeStyle = isDarkMode ? '#0e1014' : '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const labelDistance = maxRadius + 22;
        const lx = centerX + labelDistance * Math.cos(pt.angle);
        const ly = centerY + labelDistance * Math.sin(pt.angle);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.font = "bold 13px 'Noto Serif TC', 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = textColor;
        ctx.fillText(pt.item.label, lx, ly - 7);

        const currentPct = Math.round(pt.item.value * progress);
        ctx.font = "600 12px 'JetBrains Mono', monospace";
        ctx.fillStyle = isDarkMode ? '#e59a58' : '#a85a2d';
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

