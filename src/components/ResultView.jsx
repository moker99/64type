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
        <div className="result-persona-showcase">
          <div className="result-avatar-container">
            <img
              src={p.avatar || './avatars/strategist.jpg'}
              alt={p.name}
              className="result-avatar-img"
            />
          </div>
          <div>
            <div className="result-code-display">{result.code}</div>
            <div className="result-persona-name">✦ {p.name} ✦</div>
            <div className="result-group-tag">[ {p.group || '戰略統御矩陣'} · {p.groupEnName || 'Strategic'} ]</div>
            <p className="result-tagline-quote">“ {p.tagline} ”</p>
          </div>
        </div>
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
                  {p.superpowers.map((pw, i) => {
                    const tagMeta = [
                      { label: "核心競爭力", desc: "在複雜任務與團隊中本能展現的關鍵優勢，能創造決定性的突破成果。" },
                      { label: "認知決策力", desc: "獨特的思維模式與感知路徑，能在高壓或未知情境下迅速鎖定最佳解。" },
                      { label: "長效影響力", desc: "持續向外輻射的正面能量與個人魅力，能有效帶動環境與他人共同進步。" }
                    ][i] || { label: "專屬優勢", desc: "獨一無二的天賦本能，為你的心靈宇宙提供源源不絕的動力。" };

                    return (
                      <div key={i} className="trait-chip-item">
                        <div className="chip-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                          0{i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span className="chip-text-title" style={{ fontSize: '1.02rem' }}>{pw}</span>
                            <span className="dim-code-badge" style={{ fontSize: '0.7rem', padding: '2px 8px', color: 'var(--primary-light)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
                              {tagMeta.label}
                            </span>
                          </div>
                          <div className="chip-text-desc">{tagMeta.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--secondary-light)' }}>
                  🌌 原型深度概述 (Archetype Essence)
                </h4>
                <div className="glass-panel" style={{ padding: '20px', lineHeight: 1.8, fontSize: '0.94rem', color: 'var(--text-secondary)' }}>
                  <p style={{ marginBottom: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    ✦ {p.name}（{result.code}）屬於 <strong style={{ color: p.groupColor || 'var(--secondary-light)' }}>{p.group}</strong>。
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    你的核心驅動力源於「{p.tagline}」。在心智模型中，你結合了 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.EI.dominantLabel}</strong> 的充能路徑與 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.SN.dominantLabel}</strong> 的資訊感知，形成極具辨識度的洞察視角。
                  </p>
                  <p>
                    在面對抉擇與壓力時，你習慣運用 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.TF.dominantLabel}</strong> 錨定準則，並以 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.JP.dominantLabel}</strong> 的步調掌控局勢，展現出 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.AR.dominantLabel}</strong> 與 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.DC.dominantLabel}</strong> 的深層生命韌性。
                  </p>
                </div>
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
                  {p.blindspots.map((bs, i) => {
                    const bsMeta = [
                      { tag: "高壓失衡警示", desc: "在長時間處於高強度或緊繃狀態下容易浮現的思維盲區，建議設定定期覆盤的緩衝邊界。" },
                      { tag: "人際互動磨礪", desc: "留意思維慣性對身邊夥伴感受的潛在影響，主動建立同理傾聽與情感反饋的暢通管道。" },
                      { tag: "自我內耗防護", desc: "過度追求特定標準時可能產生的內在損耗，學會接納不確定性並適時對外尋求支援。" }
                    ][i] || { tag: "成長契機", desc: "適時有意識地抽離自我觀察，能轉化為人格躍升的強大養分。" };

                    return (
                      <div key={i} className="trait-chip-item">
                        <div className="chip-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                          !{i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span className="chip-text-title" style={{ fontSize: '1.02rem' }}>{bs}</span>
                            <span className="dim-code-badge" style={{ fontSize: '0.7rem', padding: '2px 8px', color: 'var(--warning)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                              {bsMeta.tag}
                            </span>
                          </div>
                          <div className="chip-text-desc">{bsMeta.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--success)' }}>
                  🔋 專屬壓力充電處方 (Recharge Ritual)
                </h4>
                <div
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    background: 'rgba(16, 185, 129, 0.05)',
                    borderColor: 'rgba(16, 185, 129, 0.25)',
                    lineHeight: 1.8
                  }}
                >
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--success)', marginBottom: '8px' }}>
                    🌿 專屬身心能量回充儀式
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.98rem', marginBottom: '12px' }}>
                    {p.stressRecharge}
                  </p>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                    💡 建議在每週安排固定專屬時段執行上述充電儀式，切斷外界雜訊，回歸內在平衡。
                  </div>
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
                <img
                  src={goldenProf.avatar || './avatars/empath.jpg'}
                  alt={goldenProf.name}
                  className="partner-avatar-img"
                />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-light)', fontWeight: 700 }}>
                    💖 最佳靈魂拍檔 (Golden Match)
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
                <img
                  src={growthProf.avatar || './avatars/sentinel.jpg'}
                  alt={growthProf.name}
                  className="partner-avatar-img"
                />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--secondary-light)', fontWeight: 700 }}>
                    🌱 成長磨礪拍檔 (Growth Match)
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
