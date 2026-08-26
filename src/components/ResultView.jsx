import React, { useState } from 'react';
import { RadarChartComponent } from './RadarChart';
import { getPersonalityProfile } from '../data/personalityData';
import { soundFX } from '../utils/audio';

export function ResultView({
  result,
  theme,
  userName = "探索者",
  onUpdateUserName,
  onRetest,
  onOpenShareModal,
  onOpenCodex,
  onCopySummary
}) {
  const [activeTab, setActiveTab] = useState('traits');
  const [customName, setCustomName] = useState(userName || '探索者');
  const p = result.profile;
  const isDarkMode = theme !== 'light';

  const goldenProf = getPersonalityProfile(p.goldenMatch);
  const growthProf = getPersonalityProfile(p.growthMatch);

  // 隨機但確定性的認證編號
  const certId = React.useMemo(() => {
    const hash = result.code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 100);
    return `64T-2026-${String(hash * 47).padStart(5, '0')}`;
  }, [result.code]);

  // 人口罕見度估算
  const rarityPct = React.useMemo(() => {
    const hash = result.code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 10);
    return (1.2 + (hash % 25) / 10).toFixed(1);
  }, [result.code]);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setCustomName(val);
    if (onUpdateUserName) onUpdateUserName(val);
  };

  const handlePrint = () => {
    soundFX.playClick();
    window.print();
  };

  return (
    <div className="result-container">
      {/* 官方專業認證金色橫條 (VIP Certification Header) */}
      <div className="certification-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="cert-seal">🏅</div>
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--gold-accent)', fontWeight: 800, letterSpacing: '1px' }}>
              ✦ OFFICIAL CERTIFIED PERSONA PROFILE ✦
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              64型心智動力學 · 深度心理評估診斷報告
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              認證編號：#{certId} · 測驗信度 α = 0.86
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>受測者稱呼：</span>
          <input
            type="text"
            className="search-input-box"
            style={{ width: '130px', padding: '6px 14px', fontSize: '0.88rem' }}
            value={customName}
            onChange={handleNameChange}
            placeholder="請輸入暱稱"
          />
        </div>
      </div>

      {/* 頂部人格榮譽立繪橫幅 */}
      <div className="result-hero-banner glass-panel">
        <div className="result-persona-showcase">
          <div className="result-avatar-container" style={{ background: `linear-gradient(135deg, ${p.groupColor || '#6366f1'}, #ffffff 60%, ${p.groupColor || '#06b6d4'})` }}>
            <img
              src={p.avatar || './avatars/entj.svg'}
              alt={p.name}
              className="result-avatar-img"
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="result-group-tag" style={{ margin: 0, color: p.groupColor, borderColor: p.groupColor }}>
                [ {p.group || '戰略統御矩陣'} · {p.groupEnName || 'Strategic'} ]
              </span>
              <span className="dim-code-badge" style={{
                color: result.code.includes('-AD') ? '#fbbf24' : result.code.includes('-AC') ? '#38bdf8' : result.code.includes('-RD') ? '#c084fc' : '#f472b6',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}>
                {result.code.includes('-AD') ? '☀️ 熾陽破局形態' : result.code.includes('-AC') ? '🏛️ 盛世盟約形態' : result.code.includes('-RD') ? '🌌 孤島深邃形態' : '🌊 深海微光形態'}
              </span>
              <span className="dim-code-badge" style={{ color: 'var(--gold-accent)', borderColor: 'rgba(251, 191, 36, 0.3)' }}>
                ⭐ 全球罕見度：約 {rarityPct}%
              </span>
            </div>
            <div className="result-code-display">{result.code}</div>
            <div className="result-persona-name">
              ✦ {p.name} · <span style={{ color: 'var(--text-accent)' }}>{customName}</span> ✦
            </div>
            <p className="result-tagline-quote">“ {p.tagline} ”</p>
          </div>
        </div>
      </div>

      {/* 雙欄圖表展示區塊 (Canvas 雷達圖 + 六維度能量長條) */}
      <div className="result-charts-grid">
        {/* 六維度動態雷達圖 */}
        <div className="radar-card-wrapper glass-panel">
          <h3 style={{ marginBottom: '14px', fontSize: '1.15rem', fontWeight: 800 }}>
            ✦ 六維心智能力光譜雷達
          </h3>
          <RadarChartComponent data={result.radarData} isDarkMode={isDarkMode} />
          <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>
            動態雷達反映你在 6 大核心維度上的能量偏向百分比
          </div>
        </div>

        {/* 六維度能量百分比長條圖 */}
        <div className="dimension-bars-wrapper glass-panel">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>
            ✦ 雙極維度能量深度量測
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', marginBottom: '14px' }}>
            每項指標皆由 10 道對稱題組經標準常態化計分得出
          </p>

          {Object.keys(result.dimensions).map((dimKey) => {
            const dim = result.dimensions[dimKey];
            const isA = dim.dominantCode === dim.codeA;
            return (
              <div key={dimKey} className="dim-bar-row">
                <div className="dim-bar-header">
                  <div
                    className="dim-bar-label-left"
                    style={{
                      color: isA ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      fontWeight: isA ? '800' : '500'
                    }}
                  >
                    <span style={{ color: isA ? dim.color : 'inherit', fontWeight: 'bold' }}>{dim.codeA}</span>{' '}
                    {dim.labelA.split(' ')[0]} <span style={{ opacity: 0.85, fontSize: '0.82rem' }}>{dim.pctA}%</span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 'bold',
                      color: dim.color,
                      fontSize: '0.88rem'
                    }}
                  >
                    {dim.dominantCode} {dim.dominantPct}% · {dim.traitStrength}
                  </div>
                  <div
                    className="dim-bar-label-right"
                    style={{
                      color: !isA ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      fontWeight: !isA ? '800' : '500'
                    }}
                  >
                    <span style={{ opacity: 0.85, fontSize: '0.82rem' }}>{dim.pctB}%</span>{' '}
                    {dim.labelB.split(' ')[0]}{' '}
                    <span style={{ color: !isA ? dim.color : 'inherit', fontWeight: 'bold' }}>{dim.codeB}</span>
                  </div>
                </div>
                <div className="dim-bar-track">
                  {/* 50% 中位平衡標記線 */}
                  <div className="dim-bar-center-mark" />
                  {/* 主導維度動態填色 (A 從左往右填滿 dominantPct%，B 從右往左填滿 dominantPct%) */}
                  <div
                    className="dim-bar-active-fill"
                    style={{
                      left: isA ? 0 : 'auto',
                      right: !isA ? 0 : 'auto',
                      width: `${dim.dominantPct}%`,
                      background: `linear-gradient(${isA ? '90deg' : '270deg'}, ${dim.color}, ${dim.color}cc)`,
                      boxShadow: `0 0 10px ${dim.color}88`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 深度剖析多維標籤頁 */}
      <div className="result-tabs-container glass-panel" style={{ padding: '32px' }}>
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
            💼 高階職涯與商業定位
          </button>
          <button
            className={`tab-btn ${activeTab === 'love' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('love'); }}
          >
            ❤️ 親密關係與人際風格
          </button>
          <button
            className={`tab-btn ${activeTab === 'growth' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('growth'); }}
          >
            🛡️ 盲點警示與心靈充電
          </button>
          <button
            className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('matches'); }}
          >
            🔮 命定契合拍檔羅盤
          </button>
        </div>

        {/* 標籤 1: 核心特質 */}
        {activeTab === 'traits' && (
          <div className="tab-pane-content active">
            <div className="content-grid-2col">
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary-light)' }}>
                  ⚡ 核心天賦超能力
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
                        <div className="chip-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                          0{i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span className="chip-text-title" style={{ fontSize: '1.05rem' }}>{pw}</span>
                            <span className="dim-code-badge" style={{ fontSize: '0.72rem', padding: '2px 8px', color: 'var(--primary-light)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
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
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--secondary-light)' }}>
                  🌌 原型深度概述
                </h4>
                <div className="glass-panel" style={{ padding: '24px', lineHeight: 1.85, fontSize: '0.96rem', color: 'var(--text-secondary)' }}>
                  <p style={{ marginBottom: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>
                    ✦ {p.name}（{result.code}）屬於 <strong style={{ color: p.groupColor || 'var(--secondary-light)' }}>{p.group}</strong>。
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    你的核心生命箴言為「{p.tagline}」。在心智模型中，你結合了 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.EI.dominantLabel}</strong> 的充能路徑與 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.SN.dominantLabel}</strong> 的資訊感知，形成極具辨識度的洞察視角。
                  </p>
                  <p>
                    在面對抉擇時，你習慣運用 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.TF.dominantLabel}</strong> 錨定準則，並以 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.JP.dominantLabel}</strong> 的步調掌控局勢，展現出 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.AR.dominantLabel}</strong> 與 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.DC.dominantLabel}</strong> 的深層生命韌性。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 標籤 2: 職場指南 */}
        {activeTab === 'careers' && (
          <div className="tab-pane-content active">
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '12px', color: 'var(--secondary-light)' }}>
              💼 推薦適合職業與天賦跑道
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '18px' }}>
              根據你的 6 維度能力光譜，你在需要發揮戰略前瞻、獨立決斷與跨界開拓的環境中能爆發出最大潛能：
            </p>
            <div className="careers-tag-cloud">
              {p.careers.map((career, i) => (
                <div key={i} className="career-tag-pill">
                  🎯 {career}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  👑 團隊領導與協作風格
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  具備明確的方向感與目標聚焦能力，善於拆解複雜挑戰並激勵團隊達成關鍵成果，在扁平化或高自驅組織中尤能發揮卓越領導力。
                </p>
              </div>
              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  ⚡ 理想工作場域特質
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  給予充分決策自主權、重視結果品質與實質產出、具備開放討論與創新容錯空間的環境最能激發你的持久熱情。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 標籤 3: 愛情人際 */}
        {activeTab === 'love' && (
          <div className="tab-pane-content active">
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--accent-light)' }}>
              ❤️ 親密關係與人際相處哲學
            </h4>
            <div
              className="glass-panel"
              style={{
                padding: '28px',
                background: 'rgba(236, 72, 153, 0.05)',
                borderColor: 'rgba(236, 72, 153, 0.25)',
                lineHeight: 1.85
              }}
            >
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                🌹 靈魂溝通風格
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '18px' }}>
                {p.loveStyle}
              </p>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
                💡 <strong>相處建議：</strong>在關係中重視「智性共鳴」與「彼此尊重個人邊界」，坦誠且不帶防備的深度對話是維繫長久信任的基石。
              </div>
            </div>
          </div>
        )}

        {/* 標籤 4: 盲點與充電 */}
        {activeTab === 'growth' && (
          <div className="tab-pane-content active">
            <div className="content-grid-2col">
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--warning)' }}>
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
                        <div className="chip-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                          !{i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span className="chip-text-title" style={{ fontSize: '1.05rem' }}>{bs}</span>
                            <span className="dim-code-badge" style={{ fontSize: '0.72rem', padding: '2px 8px', color: 'var(--warning)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
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
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--success)' }}>
                  🔋 專屬身心能量回充儀式
                </h4>
                <div
                  className="glass-panel"
                  style={{
                    padding: '26px',
                    background: 'rgba(16, 185, 129, 0.05)',
                    borderColor: 'rgba(16, 185, 129, 0.25)',
                    lineHeight: 1.85
                  }}
                >
                  <div style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--success)', marginBottom: '10px' }}>
                    🌿 專屬身心修復處方
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '14px' }}>
                    {p.stressRecharge}
                  </p>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    💡 建議每週安排固定專屬時段執行上述充電儀式，切斷外界雜訊，回歸心靈平靜。
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
                  src={goldenProf.avatar || './avatars/empath.svg'}
                  alt={goldenProf.name}
                  className="partner-avatar-img"
                />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-light)', fontWeight: 800 }}>
                    💖 最佳靈魂拍檔
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, margin: '4px 0' }}>
                    {p.goldenMatch} ✦ {goldenProf.name}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    互補共鳴，彼此激發深層潛能與溫暖安全感，在心靈與思維上具備最高契合度。
                  </div>
                </div>
              </div>

              <div className="match-partner-card">
                <img
                  src={growthProf.avatar || './avatars/sentinel.svg'}
                  alt={growthProf.name}
                  className="partner-avatar-img"
                />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--secondary-light)', fontWeight: 800 }}>
                    🌱 成長磨礪拍檔
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, margin: '4px 0' }}>
                    {p.growthMatch} ✦ {growthProf.name}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    思維視角迥異，在跨維度碰撞與溝通磨合中，能拓展你的人生維度與心智寬度。
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
          <span>📸 生成專屬官方證書海報</span>
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onCopySummary();
          }}
        >
          <span>📋 複製完整診斷摘要</span>
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={handlePrint}
        >
          <span>🖨️ 列印 / 儲存 PDF</span>
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
