import React from 'react';
import { getPersonalityProfile } from '../data/personalityData';
import { soundFX } from '../utils/audio';

export function PersonaDetailModal({ code, isOpen, onClose }) {
  if (!isOpen || !code) return null;

  const p = getPersonalityProfile(code);
  const goldenP = getPersonalityProfile(p.goldenMatch);
  const growthP = getPersonalityProfile(p.growthMatch);

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      style={{ zIndex: 110 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFX.playClick();
          onClose();
        }
      }}
    >
      <div className="modal-content-wrapper" style={{ maxWidth: '680px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            {p.badge || '✨'} {p.code} ✦ {p.name}
          </h3>
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '20px' }}>
            <div className="result-avatar-container" style={{ width: '120px', height: '120px', marginBottom: '12px' }}>
              <img
                src={p.avatar || './avatars/strategist.jpg'}
                alt={p.name}
                className="result-avatar-img"
              />
            </div>
            <span className="dim-code-badge" style={{ color: p.groupColor || 'var(--secondary-light)', borderColor: p.groupColor }}>
              {p.group} · {p.groupEnName}
            </span>
            <div
              style={{
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                marginTop: '8px'
              }}
            >
              “ {p.tagline} ”
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-light)', marginBottom: '8px' }}>
              ⚡ 天賦超能力
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {p.superpowers.map((s, i) => (
                <span
                  key={i}
                  className="dim-code-badge"
                  style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#fff' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary-light)', marginBottom: '8px' }}>
              💼 適合職業崗位
            </h4>
            <div className="careers-tag-cloud">
              {p.careers.map((c, i) => (
                <span key={i} className="career-tag-pill">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-light)', marginBottom: '6px' }}>
              ❤️ 愛情與人際相處
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {p.loveStyle}
            </p>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--warning)', marginBottom: '6px' }}>
              ⚠️ 盲點與充電建議
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '4px' }}>
              <strong>盲點：</strong>{p.blindspots.join('、')}
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong>充電：</strong>{p.stressRecharge}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
            <div className="glass-panel" style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={goldenP.avatar || './avatars/empath.jpg'}
                alt={goldenP.name}
                className="partner-avatar-img"
                style={{ width: '48px', height: '48px' }}
              />
              <div>
                <div style={{ color: 'var(--accent-light)', fontWeight: 'bold' }}>💖 最佳靈魂拍檔</div>
                <div style={{ fontWeight: 'bold', marginTop: '2px' }}>
                  {p.goldenMatch} {goldenP.name}
                </div>
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={growthP.avatar || './avatars/sentinel.jpg'}
                alt={growthP.name}
                className="partner-avatar-img"
                style={{ width: '48px', height: '48px' }}
              />
              <div>
                <div style={{ color: 'var(--secondary-light)', fontWeight: 'bold' }}>🌱 成長磨礪拍檔</div>
                <div style={{ fontWeight: 'bold', marginTop: '2px' }}>
                  {p.growthMatch} {growthP.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
