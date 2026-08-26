import React, { useState, useEffect } from 'react';
import { ShareCardGenerator } from '../utils/cardGenerator';
import { soundFX } from '../utils/audio';

export function ShareModal({ result, isOpen, onClose, onShowToast, defaultUserName = "探索者" }) {
  const [dataUrl, setDataUrl] = useState('');
  const [userName, setUserName] = useState(defaultUserName || '探索者');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && result) {
      setLoading(true);
      ShareCardGenerator.generateCardDataUrl(result, userName).then((url) => {
        setDataUrl(url);
        setLoading(false);
      });
    }
  }, [isOpen, result, userName]);

  if (!isOpen || !result) return null;

  const handleDownload = () => {
    soundFX.playClick();
    ShareCardGenerator.downloadCard(result, userName);
    onShowToast('官方認證海報下載中... 💾');
  };

  const handleCopy = async () => {
    soundFX.playClick();
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      if (navigator.clipboard && navigator.clipboard.write) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        onShowToast('認證海報已複製至剪貼簿！📋');
      } else {
        onShowToast('請點擊下載按鈕保存海報 💾');
      }
    } catch (e) {
      onShowToast('請點擊下載按鈕保存海報 💾');
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
      <div className="modal-content-wrapper" style={{ maxWidth: '540px' }}>
        <div className="modal-header">
          <h3 className="modal-title">🏅 官方專屬認證海報</h3>
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
        <div className="modal-body-scrollable share-preview-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '380px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>受測者稱呼：</span>
            <input
              type="text"
              className="search-input-box"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="輸入您的名字或暱稱"
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            />
          </div>

          {loading ? (
            <div style={{ padding: '60px 0', color: 'var(--text-tertiary)' }}>
              繪製高解析度官方海報中... 🎨
            </div>
          ) : (
            <img
              className="share-image-preview"
              src={dataUrl}
              alt="64型人格官方認證卡片"
            />
          )}

          <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleDownload} disabled={loading}>
              <span>💾 下載高畫質海報 (PNG)</span>
            </button>
            <button className="btn btn-secondary" onClick={handleCopy} disabled={loading}>
              <span>📋 複製圖片</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
