import React, { useState, useMemo } from 'react';
import { getAllPersonalities } from '../data/personalityData';
import { soundFX } from '../utils/audio';

export function CodexModal({ isOpen, onClose, onSelectPersona }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const allPersonalities = useMemo(() => getAllPersonalities(), []);

  const filtered = useMemo(() => {
    return allPersonalities.filter((item) => {
      const matchGroup = filter === 'all' || item.group === filter;
      const term = search.toLowerCase().trim();
      const matchSearch =
        !term ||
        item.code.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.tagline.toLowerCase().includes(term);
      return matchGroup && matchSearch;
    });
  }, [allPersonalities, filter, search]);

  if (!isOpen) return null;

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
        <div className="modal-header">
          <h2 className="modal-title">📚 64 型人格全圖鑑百科</h2>
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
        <div className="modal-body-scrollable">
          {/* 搜尋與篩選列 */}
          <div className="codex-filter-bar">
            <input
              type="text"
              className="search-input-box"
              placeholder="🔍 搜尋人格代碼或名稱 (例如 ENTJ、詩人、統帥)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="filter-pills-group">
              <button
                className={`filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setFilter('all'); }}
              >
                全部 (64)
              </button>
              <button
                className={`filter-pill-btn ${filter === '戰略統御矩陣' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setFilter('戰略統御矩陣'); }}
              >
                戰略統御 (16)
              </button>
              <button
                className={`filter-pill-btn ${filter === '心靈共鳴矩陣' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setFilter('心靈共鳴矩陣'); }}
              >
                心靈共鳴 (16)
              </button>
              <button
                className={`filter-pill-btn ${filter === '秩序精算矩陣' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setFilter('秩序精算矩陣'); }}
              >
                秩序精算 (16)
              </button>
              <button
                className={`filter-pill-btn ${filter === '自由探索矩陣' ? 'active' : ''}`}
                onClick={() => { soundFX.playClick(); setFilter('自由探索矩陣'); }}
              >
                自由探索 (16)
              </button>
            </div>
          </div>

          {/* 64型卡片網格 */}
          <div className="codex-cards-grid">
            {filtered.map((p) => (
              <div
                key={p.code}
                className="codex-card"
                style={{ '--card-accent': p.groupColor || '#6366f1' }}
                onClick={() => {
                  soundFX.playClick();
                  onSelectPersona(p.code);
                }}
              >
                <div className="codex-card-avatar">
                  <img
                    src={p.avatar || './avatars/strategist.jpg'}
                    alt={p.name}
                    className="codex-card-avatar-img"
                  />
                </div>
                <div className="codex-card-code">{p.badge || '✨'} {p.code}</div>
                <div className="codex-card-name">{p.name}</div>
                <div className="codex-card-tag" style={{ color: p.groupColor }}>
                  {p.group || '矩陣原型'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
