import React, { useState, useEffect } from 'react';
import { PersonalityEngine } from '../utils/engine';
import { soundFX } from '../utils/audio';

export function HistoryDrawer({ isOpen, onClose, onSelectHistoryItem, onShowToast }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(PersonalityEngine.getHistory());
    }
  }, [isOpen]);

  const handleClear = () => {
    if (window.confirm('確定要清除所有測驗歷史紀錄嗎？')) {
      soundFX.playClick();
      PersonalityEngine.clearHistory();
      setHistory([]);
      onShowToast('已清空歷史紀錄 🗑️');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`drawer-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFX.playClick();
          onClose();
        }
      }}
    >
      <div className="drawer-panel">
        <div className="modal-header">
          <h3 className="modal-title">🕒 測驗歷史紀錄</h3>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              共 {history.length} 筆紀錄
            </span>
            {history.length > 0 && (
              <button className="btn btn-secondary btn-sm" onClick={handleClear}>
                清除全部
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-tertiary)' }}>
              尚未有測驗紀錄，快去進行一次測驗吧！🚀
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="history-item-card"
                onClick={() => {
                  soundFX.playClick();
                  onSelectHistoryItem(item.code);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'var(--font-mono)' }}>
                    {item.badge || '✨'} {item.code}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.date}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '6px' }}>{item.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                  {Object.values(item.dimensionsSummary || {}).join(' | ')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
