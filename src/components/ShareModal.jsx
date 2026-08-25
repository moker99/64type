import React, { useState, useEffect } from 'react';
import { ShareCardGenerator } from '../utils/cardGenerator';
import { soundFX } from '../utils/audio';

export function ShareModal({ result, isOpen, onClose, onShowToast }) {
  const [dataUrl, setDataUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && result) {
      setLoading(true);
      ShareCardGenerator.generateCardDataUrl(result).then((url) => {
        setDataUrl(url);
        setLoading(false);
      });
    }
  }, [isOpen, result]);

  if (!isOpen || !result) return null;

  const handleDownload = () => {
    soundFX.playClick();
    ShareCardGenerator.downloadCard(result);
    onShowToast('海報下載中... 💾');
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
        onShowToast('海報圖片已複製至剪貼簿！📋');
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
      <div className="modal-content-wrapper" style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <h3 className="modal-title">📸 專屬人格分享圖卡</h3>
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
          {loading ? (
            <div style={{ padding: '60px 0', color: 'var(--text-tertiary)' }}>
              繪製高解析度海報中... 🎨
            </div>
          ) : (
            <img
              className="share-image-preview"
              src={dataUrl}
              alt="64型人格分享卡片"
            />
          )}

          <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center', marginTop: '8px' }}>
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
