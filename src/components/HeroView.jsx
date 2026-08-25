import React from 'react';
import { soundFX } from '../utils/audio';

export function HeroView({ onStartQuiz, onOpenCodex }) {
  return (
    <section className="hero-section">
      <div className="hero-badge-pill">
        <span>✦ 6維度心智模型 × 60題精準題庫 ✦</span>
      </div>

      <h1 className="hero-title">
        探索你的專屬<br />
        <span className="gradient-text">64 型心靈光譜</span>
      </h1>

      <p className="hero-subtitle">
        突破傳統 16 型架構，融入心態韌性與行動驅力雙重維度（2⁶ = 64 種人格原型）。透過 60 題精準情境心理分析，揭示你的天賦超能力、職涯指南與靈魂契合拍檔。
      </p>

      <div className="hero-cta-group">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onStartQuiz();
          }}
        >
          <span>開始 60 題深度測驗 🚀</span>
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
          <div className="stat-number">60</div>
          <div className="stat-label">精選心理情境題</div>
        </div>
      </div>

      {/* 四大人格原型矩陣 (人物角色插畫展示區) */}
      <div style={{ width: '100%', marginTop: '16px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
          ✦ 四大人格原型矩陣 (Archetype Matrices)
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
          點擊任一矩陣探索專屬人格立繪與天賦光譜
        </p>
        <div className="archetype-showcase-grid">
          <div
            className="archetype-character-card"
            style={{ '--card-color': '#6366f1', cursor: 'pointer' }}
            onClick={() => { soundFX.playClick(); onOpenCodex(); }}
          >
            <div className="character-avatar-frame">
              <img src="./avatars/strategist.jpg" alt="戰略統御矩陣" className="character-avatar-img" />
            </div>
            <div className="character-group-name">👑 戰略統御矩陣</div>
            <div className="character-en-name">Strategic & Command</div>
            <p className="character-desc-text">宏觀遠見、意志堅定，善於破局與引領變革的統帥原型。</p>
          </div>

          <div
            className="archetype-character-card"
            style={{ '--card-color': '#ec4899', cursor: 'pointer' }}
            onClick={() => { soundFX.playClick(); onOpenCodex(); }}
          >
            <div className="character-avatar-frame">
              <img src="./avatars/empath.jpg" alt="心靈共鳴矩陣" className="character-avatar-img" />
            </div>
            <div className="character-group-name">✨ 心靈共鳴矩陣</div>
            <div className="character-en-name">Resonant & Empath</div>
            <p className="character-desc-text">深層同理、靈感共鳴，以純淨情感啟迪人心的藝術靈魂。</p>
          </div>

          <div
            className="archetype-character-card"
            style={{ '--card-color': '#10b981', cursor: 'pointer' }}
            onClick={() => { soundFX.playClick(); onOpenCodex(); }}
          >
            <div className="character-avatar-frame">
              <img src="./avatars/sentinel.jpg" alt="秩序精算矩陣" className="character-avatar-img" />
            </div>
            <div className="character-group-name">🛡️ 秩序精算矩陣</div>
            <div className="character-en-name">Order & Sentinel</div>
            <p className="character-desc-text">嚴謹務實、構建系統，守護穩定秩序與落實執行的高效柱石。</p>
          </div>

          <div
            className="archetype-character-card"
            style={{ '--card-color': '#06b6d4', cursor: 'pointer' }}
            onClick={() => { soundFX.playClick(); onOpenCodex(); }}
          >
            <div className="character-avatar-frame">
              <img src="./avatars/explorer.jpg" alt="自由探索矩陣" className="character-avatar-img" />
            </div>
            <div className="character-group-name">⚡ 自由探索矩陣</div>
            <div className="character-en-name">Explorer & Pioneer</div>
            <p className="character-desc-text">敏捷開拓、充滿好奇，勇於挑戰未知與擁抱冒險的先驅者。</p>
          </div>
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
