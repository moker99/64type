import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import { getPersonalityProfile } from '../data/personalityData';
import { getDeepPersonalityDetails } from '../data/deepReportData';
import { DIMENSIONS } from '../data/questions';

export function OrderCheckoutView({
  result,
  userName = '探索者',
  onUpdateUserName,
  onUnlockSuccess,
  onViewFreeResult,
  onNavigateHome,
  onNavigateLegal,
  adminMode = false
}) {
  const [selectedPlan, setSelectedPlan] = useState('single'); // 'single' (NT$99) | 'lifetime' (NT$199)
  const [paymentMethod, setPaymentMethod] = useState('linepay'); // 'linepay' | 'creditcard' | 'applepay'
  const [email, setEmail] = useState('');
  const [nameInput, setNameInput] = useState(userName || '探索者');
  const [agreed, setAgreed] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 倒數計時

  // 動態購買人數與滾動通知
  const [salesCount, setSalesCount] = useState(1394135);
  const [recentBuyer, setRecentBuyer] = useState(null);

  const p = result?.profile || getPersonalityProfile(result?.code || 'ENTJ-AD');
  const deep = getDeepPersonalityDetails(result?.code || 'ENTJ-AD');
  const baseType = result?.code ? result.code.split('-')[0] : 'ENTJ';
  const subCode = result?.code ? result.code.split('-')[1] : 'AD';

  // 15 分鐘優惠倒數
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 899));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 動態銷售數字增加
  useEffect(() => {
    const ticker = setInterval(() => {
      setSalesCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 4500);
    return () => clearInterval(ticker);
  }, []);

  // 實時買家動態彈窗
  useEffect(() => {
    const buyerLocations = ['台北市', '新北市', '台中市', '高雄市', '新竹市', '台南市', '桃園市'];
    const buyerNames = ['林*婷', '陳*廷', '張*涵', '黃*宇', '李*萱', '王*祥', '吳*敏', '蔡*安'];
    const buyerTypes = ['INTJ-AD', 'INFP-RC', 'ENTP-AD', 'INFJ-AC', 'ENFP-RC', 'ISTJ-AD', 'ESTJ-AD'];

    const showBuyerToast = () => {
      const loc = buyerLocations[Math.floor(Math.random() * buyerLocations.length)];
      const name = buyerNames[Math.floor(Math.random() * buyerNames.length)];
      const type = buyerTypes[Math.floor(Math.random() * buyerTypes.length)];
      const secs = Math.floor(Math.random() * 45) + 5;

      setRecentBuyer({ loc, name, type, secs });
      setTimeout(() => setRecentBuyer(null), 4000);
    };

    const buyerTimer = setInterval(showBuyerToast, 9000);
    const initialDelay = setTimeout(showBuyerToast, 2500);

    return () => {
      clearInterval(buyerTimer);
      clearTimeout(initialDelay);
    };
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setNameInput(val);
    if (onUpdateUserName) onUpdateUserName(val);
  };

  const handleCheckout = (isTest = false) => {
    if (!agreed) {
      alert('請先勾選同意服務條款與隱私政策');
      return;
    }
    soundFX.playClick();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      try {
        if (soundFX?.playVictory) {
          soundFX.playVictory();
        } else if (soundFX?.playComplete) {
          soundFX.playComplete();
        }
      } catch (e) {}

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      if (onUnlockSuccess) {
        onUnlockSuccess(selectedPlan);
      }
    }, isTest ? 500 : 1600);
  };

  // 生成部分遮罩的人格代碼（製造好奇心懸念）
  const maskedCode = (() => {
    if (!result?.code) return '??F?-??';
    const parts = result.code.split('-');
    const b = parts[0] || 'ENTJ';
    const s = parts[1] || 'AD';
    return `${b[0]}?${b[2]}?-${s[0]}?`;
  })();

  const rarityPct = (() => {
    const h = (result?.code || 'ENTJ-AD').split('').reduce((a, c) => a + c.charCodeAt(0), 10);
    return (1.2 + (h % 25) / 10).toFixed(1);
  })();

  return (
    <div className="order-checkout-page" style={{ minHeight: '100vh', padding: '32px 16px 80px 16px', color: '#fff' }}>
      
      {/* 實時購買動態 Toast */}
      {recentBuyer && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 9999,
            background: 'rgba(15, 12, 29, 0.95)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '14px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
            animation: 'fadeInUp 0.3s ease-out',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
            🎉
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff' }}>
              來自 {recentBuyer.loc} 的 {recentBuyer.name} 剛剛解鎖了
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--gold-accent)', fontFamily: 'var(--font-mono)' }}>
              {recentBuyer.type} 殿堂級白皮書 · {recentBuyer.secs} 秒前
            </div>
          </div>
        </div>
      )}

      {/* 頂部倒數橫幅 */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto 24px auto',
          background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
          borderRadius: '12px',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 800 }}>
          <span>🔥</span>
          <span>今日限時 2 折特惠 · 專屬測驗結果保留中</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 900, fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '20px' }}>
          <span>⏳ 優惠倒數：</span>
          <span style={{ color: '#fff', fontSize: '1.05rem', letterSpacing: '1px' }}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* 主標題區 */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '20px', padding: '6px 18px', color: '#fbbf24', fontSize: '0.82rem', fontWeight: 800, marginBottom: '14px' }}>
            <span>✓ 測驗完成</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>64 維度心智動力學演算法已就緒</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '0 0 10px 0', letterSpacing: '1px' }}>
            你的 <span style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MBTI-64</span> 性格報告已準備就緒！
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.75 }}>
            我們已從 60 道情境題中深度推演您的榮格認知功能棧、職場商業護城河、愛情依附風格與陰影自救模式。
          </p>
        </div>

        {/* ══ 模組 1：神秘懸念卡牌 (Curiosity Gap Teaser) ══ */}
        <div
          className="glass-panel"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
            border: '1px solid rgba(251,191,36,0.3)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', alignItems: 'center' }}>
            
            {/* 左側：半遮罩人格代碼與頭像 */}
            <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(0,0,0,0.35)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '8px' }}>
                您的專屬 64 型人格代碼
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#fbbf24', letterSpacing: '4px', marginBottom: '6px', textShadow: '0 0 25px rgba(251,191,36,0.6)' }}>
                {maskedCode}
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '18px' }}>
                ✦ 專屬 64 型心智原型 · 鎖定中 ✦
              </div>

              {/* 神秘鎖定 3D 靈魂形象（避免用戶截圖或反查 AI） */}
              <div style={{ width: '130px', height: '130px', margin: '0 auto 16px auto', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(168,85,247,0.25))', border: '2px dashed rgba(251,191,36,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}>
                <span style={{ fontSize: '42px', filter: 'drop-shadow(0 0 10px #fbbf24)' }}>🔒</span>
                <span style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: 800, marginTop: '4px', letterSpacing: '0.5px' }}>3D 形象已鎖定</span>
              </div>

              {/* 罕見度 Badge */}
              <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '20px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.35)', color: '#f87171', fontSize: '0.78rem', fontWeight: 800 }}>
                🔥 頂級稀有型態 · 僅佔全球人口 {rarityPct}%
              </div>
            </div>

            {/* 右側：四大維度圓盤與模糊文字 */}
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gold-accent)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '14px' }}>
                ✦ 已測得心智能力指標概覽
              </div>

              {/* 4 個圓形百分比儀表（取自真實量化維度分數） */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                {[
                  { label: `前瞻洞察 (${result.dimensions?.SN?.dominantCode || 'N'})`, val: `${Math.round(result.dimensions?.SN?.dominantPct || 86)}%`, color: '#38bdf8' },
                  { label: `決策理智 (${result.dimensions?.TF?.dominantCode || 'T'})`, val: `${Math.round(result.dimensions?.TF?.dominantPct || 92)}%`, color: '#f59e0b' },
                  { label: `目標掌控 (${result.dimensions?.JP?.dominantCode || 'J'})`, val: `${Math.round(result.dimensions?.JP?.dominantPct || 78)}%`, color: '#10b981' },
                  { label: `抗壓韌性 (${result.dimensions?.AR?.dominantCode || 'A'})`, val: `${Math.round(result.dimensions?.AR?.dominantPct || 85)}%`, color: '#ec4899' }
                ].map((dial) => (
                  <div key={dial.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: dial.color, fontFamily: 'var(--font-mono)' }}>{dial.val}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{dial.label}</div>
                  </div>
                ))}
              </div>

              {/* 模糊靈魂畫像預覽 */}
              <div style={{ position: 'relative', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', padding: '16px', overflow: 'hidden' }}>
                <div style={{ filter: 'blur(4px)', opacity: 0.5, fontSize: '0.88rem', lineHeight: 1.8, userSelect: 'none' }}>
                  {deep?.subTypeMeta?.soulPortrait || "你是一個在混亂中帶來確定感的人。你很少對外人開口尋求幫助，因為你從小就習慣了自己解決所有問題。你的大腦是一台永不關機的推演引擎..."}
                </div>
                
                {/* 鎖定遮罩 */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(15, 12, 29, 0.75)', backdropFilter: 'blur(2px)' }}>
                  <span style={{ fontSize: '24px', marginBottom: '4px' }}>🔒</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>解鎖全景深度報告查看完整靈魂解析</div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ══ 模組 2：特惠方案收銀台 (Checkout Box) ══ */}
        <div
          className="glass-panel"
          style={{
            background: 'linear-gradient(180deg, #16112c, #0d0a1c)',
            border: '2px solid rgba(251,191,36,0.4)',
            borderRadius: '24px',
            padding: '36px',
            marginBottom: '40px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.8)'
          }}
        >
          {/* 銷售量 Ticker */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#fff' }}>
              揭開您的 <span style={{ color: 'var(--gold-accent)' }}>MBTI-64</span> 完整白皮書
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>超過</span>
              <div style={{ display: 'flex', gap: '3px' }}>
                {salesCount.toLocaleString().split('').map((char, i) => (
                  <span key={i} style={{ background: char === ',' ? 'transparent' : 'rgba(99,102,241,0.2)', border: char === ',' ? 'none' : '1px solid rgba(99,102,241,0.4)', color: '#fff', fontWeight: 900, fontFamily: 'var(--font-mono)', padding: char === ',' ? '0' : '2px 5px', borderRadius: '4px', fontSize: '0.85rem' }}>
                    {char}
                  </span>
                ))}
              </div>
              <span>份報告已售出</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            {/* 左側：方案選擇與金額明細 */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '14px', letterSpacing: '1px' }}>
                ✦ STEP 1 · 選擇解鎖方案
              </div>

              {/* 方案 A: 單份完整白皮書 */}
              <div
                onClick={() => { soundFX.playTab(); setSelectedPlan('single'); }}
                style={{
                  border: selectedPlan === 'single' ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.08)',
                  background: selectedPlan === 'single' ? 'rgba(251,191,36,0.08)' : 'rgba(255,255,255,0.02)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  marginBottom: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '-10px', right: '16px', background: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>
                  省 80%
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                    📖 個人心智動力學全景深度報告
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-tertiary)', fontSize: '0.85rem', marginRight: '6px' }}>NT$ 499</span>
                    <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>NT$ 99</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  包含榮格 4 階認知功能棧、職場商業攻防、愛情三部曲、陰影急救 SOP 與 PDF 認證證書。
                </div>
              </div>

              {/* 方案 B: 終身白金 VIP 套票 */}
              <div
                onClick={() => { soundFX.playTab(); setSelectedPlan('lifetime'); }}
                style={{
                  border: selectedPlan === 'lifetime' ? '2px solid #a855f7' : '1px solid rgba(255,255,255,0.08)',
                  background: selectedPlan === 'lifetime' ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.02)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '-10px', right: '16px', background: 'linear-gradient(90deg,#a855f7,#6366f1)', color: '#fff', fontSize: '0.7rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>
                  超值推薦 · 終身尊榮
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                    💎 終身白金 VIP 尊榮套票
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-tertiary)', fontSize: '0.85rem', marginRight: '6px' }}>NT$ 990</span>
                    <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>NT$ 199</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  全 64 型白皮書永久無限查閱 + 雙人關係契合度無限合盤 + 未來所有測驗終身免費。
                </div>
              </div>

              {/* 填寫姓名與 Email (用於證書) */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '6px' }}>
                  報告受測者姓名 / 稱呼（將印製於官方認證證書）
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={handleNameChange}
                  placeholder="請輸入您的稱呼"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '6px' }}>
                  電子郵件（用於自動備份與接收 PDF 認證報告）
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

            </div>

            {/* 右側：支付方式與結帳按鈕 */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '14px', letterSpacing: '1px' }}>
                ✦ STEP 2 · 選擇台灣在地支付方式
              </div>

              {/* 支付方式按鈕組 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {[
                  { id: 'linepay', name: 'LINE Pay 行動支付', icon: '🟢', desc: '台灣最常用 · 支援 LINE POINTS 點數折抵' },
                  { id: 'creditcard', name: '信用卡 / 簽帳金融卡', icon: '💳', desc: '支援 Visa, MasterCard, JCB, 3D 驗證' },
                  { id: 'applepay', name: 'Apple Pay / Google Pay', icon: '🍎', desc: '一鍵快速感應支付' }
                ].map((pay) => (
                  <div
                    key={pay.id}
                    onClick={() => { soundFX.playTab(); setPaymentMethod(pay.id); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: paymentMethod === pay.id ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.08)',
                      background: paymentMethod === pay.id ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{pay.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>{pay.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>{pay.desc}</div>
                    </div>
                    {paymentMethod === pay.id && (
                      <span style={{ color: '#22c55e', fontWeight: 900, fontSize: '1rem' }}>✓</span>
                    )}
                  </div>
                ))}
              </div>

              {/* 條款同意 Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#fbbf24', cursor: 'pointer' }}
                />
                <label htmlFor="agree-terms" style={{ cursor: 'pointer' }}>
                  我已閱讀並同意{' '}
                  <span onClick={() => onNavigateLegal && onNavigateLegal('terms')} style={{ color: '#fbbf24', textDecoration: 'underline' }}>服務條款</span> 與{' '}
                  <span onClick={() => onNavigateLegal && onNavigateLegal('privacy')} style={{ color: '#fbbf24', textDecoration: 'underline' }}>隱私權政策</span>
                </label>
              </div>

              {/* 大按鈕：立即結帳 */}
              <button
                onClick={() => handleCheckout(false)}
                disabled={isProcessing}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  boxShadow: '0 8px 25px rgba(245, 158, 11, 0.45)',
                  borderRadius: '14px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isProcessing ? (
                  <span>⏳ 正在連線綠界 / LINE Pay 結帳環境...</span>
                ) : (
                  <span>🚀 立即解鎖白皮書（NT$ {selectedPlan === 'single' ? '99' : '199'}）→</span>
                )}
              </button>

              {/* 管理員快速體驗按鈕 */}
              {adminMode && (
                <button
                  onClick={() => handleCheckout(true)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    background: 'linear-gradient(90deg,#7c3aed,#4f46e5)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginBottom: '12px'
                  }}
                >
                  🛡️ 管理員免付費一鍵測試解鎖
                </button>
              )}

              {/* 暫不解鎖，瀏覽免費摘要 */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => { soundFX.playClick(); onViewFreeResult(); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  暫不解鎖，先瀏覽基礎免費摘要 →
                </button>
              </div>

              {/* 安全認證圖標 Trust Badges */}
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap', opacity: 0.75, fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                <span>🛡️ 256-Bit SSL 加密</span>
                <span>•</span>
                <span>💚 綠界 ECPay / LINE Pay 官方合作</span>
                <span>•</span>
                <span>🔒 7 天安心保障</span>
              </div>

            </div>

          </div>
        </div>

        {/* ══ 模組 3：為什麼選擇 64 型殿堂級白皮書？價值對比 ══ */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 900, marginBottom: '24px' }}>
            普通 16 型測驗 vs. <span style={{ color: 'var(--gold-accent)' }}>64 型殿堂級個人白皮書</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '24px', opacity: 0.7, background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: '14px' }}>
                ✕ 一般免費 MBTI 測驗
              </div>
              <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 2 }}>
                <li>僅有粗糙 16 種分類，同型人千篇一律</li>
                <li>只有冷冰冰的條列式優缺點說明</li>
                <li>缺乏榮格認知功能底層架構解析</li>
                <li>無職場薪資躍遷與暗黑攻防手冊</li>
                <li>無深度愛情依附風格與真心使用說明書</li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '24px', border: '1.5px solid rgba(251,191,36,0.4)', background: 'linear-gradient(145deg, rgba(251,191,36,0.08), rgba(168,85,247,0.08))' }}>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#fbbf24', marginBottom: '14px' }}>
                ✓ 64 型全景個人心智深度報告
              </div>
              <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.88rem', color: '#fff', lineHeight: 2 }}>
                <li><strong>64 種高精度心智原型</strong>，精準捕捉您的獨特性</li>
                <li><strong>觸動靈魂的心理描摹</strong>，說出你從未說出口的秘密</li>
                <li><strong>榮格 4 階認知功能運算棧</strong>，揭露思維盲點與短板</li>
                <li><strong>職場高薪破局與暗黑防禦</strong>，教你如何突破身價</li>
                <li><strong>殿堂級愛情三部曲</strong>：依附風格、心動信號、伴侶說明書</li>
                <li><strong>官方認證 PDF 下載</strong>，終身隨時查閱保存</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
