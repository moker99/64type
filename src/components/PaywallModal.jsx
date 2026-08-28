import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/audio';

export function PaywallModal({
  isOpen,
  onClose,
  personaCode,
  personaName,
  onUnlockSuccess
}) {
  const [selectedPlan, setSelectedPlan] = useState('single'); // 'single' | 'lifetime'
  const [paymentMethod, setPaymentMethod] = useState('linepay'); // 'linepay' | 'creditcard' | 'applepay'
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 分鐘倒數計時

  // 15 分鐘優惠倒數
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!isOpen) return null;

  const handlePay = (isTest = false) => {
    soundFX.playClick();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      soundFX.playVictory();
      if (onUnlockSuccess) {
        onUnlockSuccess(selectedPlan);
      }
      onClose();
    }, isTest ? 600 : 1500);
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFX.playClick();
          onClose();
        }
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'linear-gradient(145deg, rgba(26, 20, 48, 0.95), rgba(15, 12, 28, 0.98))',
          border: '1px solid rgba(251, 191, 36, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(251, 191, 36, 0.15)',
          position: 'relative',
          padding: '0'
        }}
      >
        {/* 頂部金色限時倒數橫條 */}
        <div
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #d97706)',
            color: '#1e102d',
            padding: '8px 16px',
            textAlign: 'center',
            fontSize: '0.84rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>🔥 限時 4 折專屬優惠結帳通道</span>
          <span
            style={{
              background: '#1e102d',
              color: '#fbbf24',
              padding: '2px 8px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)'
            }}
          >
            剩餘 {formatTime(timeLeft)}
          </span>
        </div>

        {/* 關閉按鈕 */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '44px',
            right: '18px',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: 'var(--text-secondary)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        <div style={{ padding: '24px 28px' }}>
          {/* 標題與簡介 */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '6px' }}>👑</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', margin: '0 0 6px 0' }}>
              解鎖 {personaCode} {personaName}
            </h3>
            <div style={{ fontSize: '0.92rem', color: 'var(--gold-accent)', fontWeight: 700 }}>
              ✦ 64型心智動力學 · 頂級深度個人白皮書 ✦
            </div>
          </div>

          {/* 權益清單 */}
          <div
            className="glass-panel"
            style={{
              padding: '16px 20px',
              marginBottom: '20px',
              background: 'rgba(251, 191, 36, 0.04)',
              borderColor: 'rgba(251, 191, 36, 0.2)'
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
              解鎖後您將立即獲得以下完整權益：
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#fbbf24' }}>✓</span> 榮格 4 階認知功能運算棧
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#fbbf24' }}>✓</span> 職場高薪與商業破局手冊
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#fbbf24' }}>✓</span> 人際與戀愛絕對禁忌雷區
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#fbbf24' }}>✓</span> 4 步陰影自救與心靈重啟 SOP
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#fbbf24' }}>✓</span> 命定雙拍檔深度契合指南
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#fbbf24' }}>✓</span> 匯出完整 PDF 商業白皮書
              </div>
            </div>
          </div>

          {/* 方案選擇卡片 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            {/* 方案 1: 單一人格白皮書 */}
            <div
              onClick={() => {
                soundFX.playClick();
                setSelectedPlan('single');
              }}
              style={{
                border: selectedPlan === 'single' ? '2px solid #fbbf24' : '1px solid var(--border-glass)',
                background: selectedPlan === 'single' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                單一人格白皮書
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '10px' }}>
                解鎖本次 {personaCode} 報告
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fbbf24' }}>NT$ 99</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>NT$ 299</span>
              </div>
            </div>

            {/* 方案 2: 全站 64 型尊榮 VIP */}
            <div
              onClick={() => {
                soundFX.playClick();
                setSelectedPlan('lifetime');
              }}
              style={{
                border: selectedPlan === 'lifetime' ? '2px solid #a855f7' : '1px solid var(--border-glass)',
                background: selectedPlan === 'lifetime' ? 'rgba(168, 85, 247, 0.12)' : 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '12px',
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}
              >
                超值首選 · 64型全通
              </span>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                終身 64 型 VIP
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '10px' }}>
                解鎖全圖鑑 64 種人格
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#c084fc' }}>NT$ 299</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>NT$ 799</span>
              </div>
            </div>
          </div>

          {/* 支付方式選擇 */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              選擇付款方式：
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setPaymentMethod('linepay');
                }}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: paymentMethod === 'linepay' ? '2px solid #06c755' : '1px solid var(--border-glass)',
                  background: paymentMethod === 'linepay' ? 'rgba(6, 199, 85, 0.12)' : 'rgba(255,255,255,0.02)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}
              >
                <span style={{ color: '#06c755', fontWeight: 900 }}>LINE</span> Pay
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setPaymentMethod('applepay');
                }}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: paymentMethod === 'applepay' ? '2px solid #38bdf8' : '1px solid var(--border-glass)',
                  background: paymentMethod === 'applepay' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255,255,255,0.02)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}
              >
                 Apple / G-Pay
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setPaymentMethod('creditcard');
                }}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: paymentMethod === 'creditcard' ? '2px solid #fbbf24' : '1px solid var(--border-glass)',
                  background: paymentMethod === 'creditcard' ? 'rgba(251, 191, 36, 0.12)' : 'rgba(255,255,255,0.02)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}
              >
                💳 信用卡
              </button>
            </div>
          </div>

          {/* 結帳按鈕 */}
          <button
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1.05rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)',
              borderRadius: '12px',
              marginBottom: '12px'
            }}
            disabled={isProcessing}
            onClick={() => handlePay(false)}
          >
            {isProcessing ? '🔒 正在建立安全加密支付通道...' : `🚀 立即支付 ${selectedPlan === 'single' ? 'NT$ 99' : 'NT$ 299'} · 即刻解鎖`}
          </button>

          {/* 開發測試模式快捷解鎖（方便展示與測試） */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => handlePay(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              [開發測試模式] ⚡ 一鍵模擬付款成功 (即刻驗證解鎖後體驗)
            </button>
          </div>

          {/* 安全告知與消保法退款規範 */}
          <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
            🔒 256-bit SSL 銀行級加密 · 依據消保法第19條，數位商品一經交付完成不適用7日鑑賞期。
          </div>
        </div>
      </div>
    </div>
  );
}
