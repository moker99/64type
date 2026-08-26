import React, { useState } from 'react';
import { getAllPersonalities, GROUP_META } from '../data/personalityData';
import { soundFX } from '../utils/audio';

export function CodexModal({ isOpen, onClose, onSelectPersona }) {
  const [filter, setFilter] = useState('all');
  const [subTypeFilter, setSubTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const allPersonalities = getAllPersonalities();

  const filtered = allPersonalities.filter((p) => {
    const matchSearch =
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      p.superpowers.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchGroup = filter === 'all' || p.group === filter;
    
    const subType = p.code.split('-')[1] || '';
    const matchSubType = subTypeFilter === 'all' || subType === subTypeFilter;

    return matchSearch && matchGroup && matchSubType;
  });

  const getSubTypeMeta = (code) => {
    const sub = code.split('-')[1] || 'AD';
    switch (sub) {
      case 'AD':
        return { label: '☀️ 熾陽破局 (A-Driver)', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: '#f59e0b' };
      case 'AC':
        return { label: '🏛️ 盛世盟約 (A-Collab)', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: '#0284c7' };
      case 'RD':
        return { label: '🌌 孤島深邃 (R-Driver)', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)', border: '#9333ea' };
      case 'RC':
        return { label: '🌊 深海微光 (R-Collab)', color: '#f472b6', bg: 'rgba(244, 114, 182, 0.15)', border: '#db2777' };
      default:
        return { label: '✦ 核心維度', color: '#818cf8', bg: 'rgba(99, 102, 241, 0.15)', border: '#6366f1' };
    }
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFX.playClick();
          onClose();
        }
      }}
    >
      <div className="modal-content-wrapper">
        {/* 頂部標題列 */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '26px' }}>📚</span>
            <div>
              <h3 className="modal-title" style={{ margin: 0 }}>64 型人格全圖鑑百科 (64-Type Codex)</h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
                探索 16 大核心 MBTI 衍生之 64 種獨立心智動力學原型
              </div>
            </div>
          </div>
          <button
            className="btn-icon"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        {/* 滾動內容區 */}
        <div className="modal-body-scrollable">
          {/* 搜尋與矩陣篩選 */}
          <div className="codex-filter-bar" style={{ flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '14px', width: '100%', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="search-input-box"
                placeholder="🔍 搜尋代碼 (如 ENTJ-AD)、稱號 (統帥)、關鍵特質或超能力..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="filter-pills-group">
                <button
                  className={`filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => { soundFX.playClick(); setFilter('all'); }}
                >
                  全部矩陣 (64)
                </button>
                <button
                  className={`filter-pill-btn ${filter === '戰略統御矩陣' ? 'active' : ''}`}
                  style={{ '--active-bg': '#88619a' }}
                  onClick={() => { soundFX.playClick(); setFilter('戰略統御矩陣'); }}
                >
                  👑 戰略分析家 (16)
                </button>
                <button
                  className={`filter-pill-btn ${filter === '心靈共鳴矩陣' ? 'active' : ''}`}
                  style={{ '--active-bg': '#33a474' }}
                  onClick={() => { soundFX.playClick(); setFilter('心靈共鳴矩陣'); }}
                >
                  ✨ 心靈外交家 (16)
                </button>
                <button
                  className={`filter-pill-btn ${filter === '秩序精算矩陣' ? 'active' : ''}`}
                  style={{ '--active-bg': '#4298b4' }}
                  onClick={() => { soundFX.playClick(); setFilter('秩序精算矩陣'); }}
                >
                  🛡️ 秩序守護者 (16)
                </button>
                <button
                  className={`filter-pill-btn ${filter === '自由探索矩陣' ? 'active' : ''}`}
                  style={{ '--active-bg': '#e4ae3a' }}
                  onClick={() => { soundFX.playClick(); setFilter('自由探索矩陣'); }}
                >
                  ⚡ 自由探險家 (16)
                </button>
              </div>
            </div>

            {/* 子維度心態/驅力快速篩選 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '4px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>心態×驅力：</span>
              <button
                className={`filter-pill-btn btn-sm ${subTypeFilter === 'all' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setSubTypeFilter('all'); }}
              >
                全部形態
              </button>
              <button
                className={`filter-pill-btn btn-sm ${subTypeFilter === 'AD' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setSubTypeFilter('AD'); }}
              >
                ☀️ 熾陽破局 (-AD)
              </button>
              <button
                className={`filter-pill-btn btn-sm ${subTypeFilter === 'AC' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setSubTypeFilter('AC'); }}
              >
                🏛️ 盛世盟約 (-AC)
              </button>
              <button
                className={`filter-pill-btn btn-sm ${subTypeFilter === 'RD' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setSubTypeFilter('RD'); }}
              >
                🌌 孤島深邃 (-RD)
              </button>
              <button
                className={`filter-pill-btn btn-sm ${subTypeFilter === 'RC' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setSubTypeFilter('RC'); }}
              >
                🌊 深海微光 (-RC)
              </button>
            </div>
          </div>

          {/* 64型精緻卡片網格 */}
          <div className="codex-cards-grid">
            {filtered.map((p) => {
              const subMeta = getSubTypeMeta(p.code);
              return (
                <div
                  key={p.code}
                  className="codex-card"
                  style={{ '--card-accent': p.groupColor || '#6366f1' }}
                  onClick={() => {
                    soundFX.playClick();
                    onSelectPersona(p.code);
                  }}
                >
                  <div className="codex-card-avatar" style={{ background: `linear-gradient(135deg, ${p.groupColor}, ${subMeta.color})` }}>
                    <img
                      src={p.avatar || './avatars/entj.jpg'}
                      alt={p.name}
                      className="codex-card-avatar-img"
                    />
                  </div>
                  
                  <div className="codex-card-code" style={{ color: p.groupColor }}>
                    {p.code}
                  </div>
                  
                  <div className="codex-card-name" style={{ fontSize: '0.96rem' }}>
                    {p.name}
                  </div>

                  <div style={{
                    fontSize: '0.72rem',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    background: subMeta.bg,
                    color: subMeta.color,
                    border: `1px solid ${subMeta.border}`,
                    fontWeight: 700,
                    margin: '4px 0 8px'
                  }}>
                    {subMeta.label}
                  </div>

                  <div className="codex-card-tag" style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', lineHeight: 1.4 }}>
                    “{p.tagline.slice(0, 22)}...”
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
