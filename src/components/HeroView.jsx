import React from 'react';
import { soundFX } from '../utils/audio';

export function HeroView({ onStartQuiz, onOpenCodex }) {
  return (
    <section className="hero-section">
      <div className="hero-badge-pill">
        <span>✦ 6維度心智模型 × 48題精準題庫 ✦</span>
      </div>

      <h1 className="hero-title">
        探索你的專屬<br />
        <span className="gradient-text">64 型心靈光譜</span>
      </h1>

      <p className="hero-subtitle">
        突破傳統 16 型架構，融入心態韌性與行動驅力雙重維度（2⁶ = 64 種人格原型）。透過 48 題精準情境心理分析，揭示你的天賦超能力、職涯指南與靈魂契合拍檔。
      </p>

      <div className="hero-cta-group">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onStartQuiz();
          }}
        >
          <span>開始 48 題深度測驗 🚀</span>
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onOpenCodex();
          }}
        >
          <span>瀏覽 64 型人格全圖鑑 📚</span>
        </button>
      </div>

      {/* 數據指標概覽 */}
      <div className="hero-stats-row">
        <div className="stat-card">
          <div className="stat-number">64</div>
          <div className="stat-label">獨立人格原型</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">6</div>
          <div className="stat-label">雙極核心維度</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">48</div>
          <div className="stat-label">精選心理情境題</div>
        </div>
      </div>

      {/* 6 大維度特色展示區 */}
      <div className="dimension-cards-grid">
        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#6366f1' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">⚡ 能量獲取 (Energy)</span>
            <span className="dim-code-badge">E vs I</span>
          </div>
          <p className="dim-feature-desc">外向社交充電 vs 內向深度沉澱，探索你心靈電力的源泉。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#06b6d4' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">🌐 資訊感知 (Perception)</span>
            <span className="dim-code-badge">S vs N</span>
          </div>
          <p className="dim-feature-desc">現實經驗細節 vs 未來宏觀願景，解碼你觀察世界的方式。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#ec4899' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">🧠 決策邏輯 (Decision)</span>
            <span className="dim-code-badge">T vs F</span>
          </div>
          <p className="dim-feature-desc">客觀因果邏輯 vs 人際共情同理，揭示你做出抉擇的底層準則。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#10b981' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">📐 生活步調 (Lifestyle)</span>
            <span className="dim-code-badge">J vs P</span>
          </div>
          <p className="dim-feature-desc">結構計畫秩序 vs 靈活隨興適應，分析你的日常行事風格。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#f59e0b' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">🛡️ 心態韌性 (Mindset)</span>
            <span className="dim-code-badge">A vs R</span>
          </div>
          <p className="dim-feature-desc">篤定自信無畏 vs 審慎反思自省，衡量面對未知與壓力的定力。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#8b5cf6' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">🚀 行動驅力 (Drive)</span>
            <span className="dim-code-badge">D vs C</span>
          </div>
          <p className="dim-feature-desc">開拓主導破局 vs 協同凝聚共鳴，錨定你創造影響力的途徑。</p>
        </div>
      </div>
    </section>
  );
}
