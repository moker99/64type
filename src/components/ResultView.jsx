import React, { useState } from 'react';
import { RadarChartComponent } from './RadarChart';
import { getPersonalityProfile } from '../data/personalityData';
import { soundFX } from '../utils/audio';

export function ResultView({
  result,
  theme,
  onRetest,
  onOpenShareModal,
  onOpenCodex,
  onCopySummary
}) {
  const [activeTab, setActiveTab] = useState('traits');
  const p = result.profile;
  const isDarkMode = theme !== 'light';

  const goldenProf = getPersonalityProfile(p.goldenMatch);
  const growthProf = getPersonalityProfile(p.growthMatch);

  return (
    <div className="result-container">
      {/* 頂部人格榮譽橫幅 */}
      <div className="result-hero-banner glass-panel">
        <div className="result-badge-halo">{p.badge || '👑'}</div>
        <div className="result-code-display">{result.code}</div>
        <div className="result-persona-name">✦ {p.name} ✦</div>
        <div className="result-group-tag">[ {p.group || '戰略統御矩陣'} ]</div>
        <p className="result-tagline-quote">“ {p.tagline} ”</p>
      </div>

      {/* 雙欄圖表展示區塊 (Canvas 雷達圖 + 六維度能量長條) */}
      <div className="result-charts-grid">
        {/* 六維度動態雷達圖 */}
        <div className="radar-card-wrapper glass-panel">
          <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', fontWeight: 700 }}>
            ✦ 六維心智能量雷達 (Radar Spectrum)
          </h3>
          <RadarChartComponent data={result.radarData} isDarkMode={isDarkMode} />
        </div>

        {/* 六維度能量百分比長條圖 */}
        <div className="dimension-bars-wrapper glass-panel">
          {Object.keys(result.dimensions).map((dimKey) => {
            const dim = result.dimensions[dimKey];
            const isA = dim.dominantCode === dim.codeA;
            return (
              <div key={dimKey} className="dim-bar-row">
                <div className="dim-bar-header">
                  <div
                    className="dim-bar-label-left"
                    style={{ color: isA ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
                  >
                    <span style={{ color: dim.color, fontWeight: 'bold' }}>{dim.codeA}</span>{' '}
                    {dim.labelA.split(' ')[0]}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 'bold',
                      color: dim.color,
                      fontSize: '0.85rem'
                    }}
                  >
                    {dim.dominantCode} {dim.dominantPct}%
                  </div>
                  <div
                    className="dim-bar-label-right"
                    style={{ color: !isA ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
                  >
                    {dim.labelB.split(' ')[0]}{' '}
                    <span style={{ color: dim.color, fontWeight: 'bold' }}>{dim.codeB}</span>
                  </div>
                </div>
                <div className="dim-bar-track">
                  <div
                    className="dim-bar-fill-a"
                    style={{
                      width: `${dim.pctA}%`,
                      '--dim-color': dim.color
                    }}
                  />
                  <div className="dim-bar-fill-b" style={{ width: `${dim.pctB}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 深度剖析標籤頁 */}
      <div className="result-tabs-container glass-panel" style={{ padding: '28px' }}>
        <div className="tabs-nav-bar">
          <button
            className={`tab-btn ${activeTab === 'traits' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('traits'); }}
          >
            🌟 核心特質與天賦
          </button>
          <button
            className={`tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('careers'); }}
          >
            💼 職場指南與理想角色
          </button>
          <button
            className={`tab-btn ${activeTab === 'love' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('love'); }}
          >
            ❤️ 愛情人際與相處模式
          </button>
          <button
            className={`tab-btn ${activeTab === 'growth' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('growth'); }}
          >
            ⚡ 盲點成長與充電秘笈
          </button>
          <button
            className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('matches'); }}
          >
            🔮 命定契合拍檔
          </button>
        </div>

        {/* 標籤 1: 核心特質 */}
        {activeTab === 'traits' && (
          <div className="tab-pane-content active">
            <div className="content-grid-2col">
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-light)' }}>
                  ⚡ 核心天賦超能力 (Superpowers)
                </h4>
                <div className="trait-chip-list">
                  {p.superpowers.map((pw, i) => (
                    <div key={i} className="trait-chip-item">
                      <div className="chip-icon">⚡</div>
                      <div>
                        <div className="chip-text-title">{pw}</div>
                        <div className="chip-text-desc">天賦本能，能在複雜情境下迅速發揮超常效能。</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--secondary-light)' }}>
                  🌌 原型深度概述 (Archetype Essence)
                </h4>
                <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  {p.name}（{result.code}）屬於 {p.group}。{p.tagline}。
                  在能量光譜上，你呈現出 {result.dimensions.EI.dominantLabel} 與 {result.dimensions.SN.dominantLabel} 的感知模式；
                  決策時具備強烈的 {result.dimensions.TF.dominantLabel} 導向，以 {result.dimensions.JP.dominantLabel} 的方式組織生活；
                  在逆境中展現 {result.dimensions.AR.dominantLabel} 的韌性，並以 {result.dimensions.DC.dominantLabel} 作為驅動周遭的核心方式。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 標籤 2: 職場指南 */}
        {activeTab === 'careers' && (
          <div className="tab-pane-content active">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--secondary-light)' }}>
              💼 推薦適合職業與天賦跑道
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '16px' }}>
              根據你的 6 維度能力光譜，你在需要發揮戰略前瞻、獨立決斷與跨界開拓的環境中能爆發出最大潛能：
            </p>
            <div className="careers-tag-cloud">
              {p.careers.map((career, i) => (
                <div key={i} className="career-tag-pill">
                  🎯 {career}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 標籤 3: 愛情人際 */}
        {activeTab === 'love' && (
          <div className="tab-pane-content active">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--accent-light)' }}>
              ❤️ 親密關係與人際風格 (Love Dynamics)
            </h4>
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                background: 'rgba(236, 72, 153, 0.05)',
                borderColor: 'rgba(236, 72, 153, 0.2)'
              }}
            >
              <p style={{ lineHeight: 1.8, fontSize: '1rem', color: 'var(--text-primary)' }}>
                {p.loveStyle}
              </p>
            </div>
          </div>
        )}

        {/* 標籤 4: 盲點與充電 */}
        {activeTab === 'growth' && (
          <div className="tab-pane-content active">
            <div className="content-grid-2col">
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--warning)' }}>
                  ⚠️ 潛在盲點與成長挑戰
                </h4>
                <div className="trait-chip-list">
                  {p.blindspots.map((bs, i) => (
                    <div key={i} className="trait-chip-item">
                      <div className="chip-icon">⚠️</div>
                      <div>
                        <div className="chip-text-title">{bs}</div>
                        <div className="chip-text-desc">在高壓或疲倦時容易浮現的思維盲區，建議適時有意識抽離覆盤。</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--success)' }}>
                  🔋 專屬壓力充電處方 (Recharge Ritual)
                </h4>
                <div
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    background: 'rgba(16, 185, 129, 0.05)',
                    borderColor: 'rgba(16, 185, 129, 0.2)'
                  }}
                >
                  <p style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    🔋 建議充電儀式：{p.stressRecharge}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 標籤 5: 命定拍檔 */}
        {activeTab === 'matches' && (
          <div className="tab-pane-content active">
            <div className="content-grid-2col">
              <div className="match-partner-card">
                <div className="partner-badge">💖</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-light)', fontWeight: 700 }}>
                    最佳靈魂拍檔 (Golden Match)
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0' }}>
                    {p.goldenMatch} ✦ {goldenProf.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                    互補共鳴，彼此激發深層潛能與溫暖安全感。
                  </div>
                </div>
              </div>

              <div className="match-partner-card">
                <div className="partner-badge">🌱</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--secondary-light)', fontWeight: 700 }}>
                    成長磨礪拍檔 (Growth Match)
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0' }}>
                    {p.growthMatch} ✦ {growthProf.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                    思維視角迥異，在跨維度碰撞中拓展人生維度。
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 結果操作工具列 */}
      <div className="result-actions-toolbar">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onOpenShareModal();
          }}
        >
          <span>📸 一鍵生成分享海報</span>
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onCopySummary();
          }}
        >
          <span>📋 複製分析摘要</span>
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onRetest();
          }}
        >
          <span>🔄 重新測驗</span>
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onOpenCodex();
          }}
        >
          <span>📚 探索 64 型圖鑑</span>
        </button>
      </div>
    </div>
  );
}
