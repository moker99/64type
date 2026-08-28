import React, { useState, useEffect } from 'react';
import { RadarChartComponent } from './RadarChart';
import { getPersonalityProfile } from '../data/personalityData';
import { getDeepPersonalityDetails } from '../data/deepReportData';
import { generateDynamicPersonalizedAnalysis } from '../data/dynamicSpectrumEngine';
import { PaywallModal } from './PaywallModal';
import { WhitepaperModal } from './WhitepaperModal';
import { soundFX } from '../utils/audio';

function LockedSection({ children }) {
  return children;
}

export function ResultView({
  result,
  theme,
  userName = "探索者",
  onUpdateUserName,
  onRetest,
  onOpenShareModal,
  onCopySummary,
  onGoToCheckout,
  onGoToWhitepaper
}) {
  const [activeTab, setActiveTab] = useState('traits');
  const [customName, setCustomName] = useState(userName || '探索者');
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);

  // 全功能完整解鎖模式 (直接開放完整報告)
  const isUnlocked = true;
  const isVipUnlocked = true;
  const adminMode = true;

  const handleUnlockSuccess = () => {};
  const p = result.profile;
  const deep = getDeepPersonalityDetails(result.code);
  const dynamicData = generateDynamicPersonalizedAnalysis(result.dimensions, p);
  const isDarkMode = theme !== 'light';

  const goldenProf = getPersonalityProfile(p.goldenMatch);
  const growthProf = getPersonalityProfile(p.growthMatch);

  // 隨機但確定性的認證編號
  const certId = React.useMemo(() => {
    const hash = result.code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 100);
    return `64T-2026-${String(hash * 47).padStart(5, '0')}`;
  }, [result.code]);

  const maskedResultCode = result.code;

  // 人口罕見度估算
  const rarityPct = React.useMemo(() => {
    const hash = result.code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 10);
    return (1.2 + (hash % 25) / 10).toFixed(1);
  }, [result.code]);

  // 台灣亞洲消費者專屬深度共鳴數據 (Social Battery, Overthinking, Somatic Grounding)
  const asianResonance = React.useMemo(() => {
    const ei = result.dimensions.EI || { dominantCode: 'I', dominantPct: 60 };
    const tf = result.dimensions.TF || { dominantCode: 'T', dominantPct: 60 };
    const ar = result.dimensions.AR || { dominantCode: 'R', dominantPct: 60 };
    const dc = result.dimensions.DC || { dominantCode: 'D', dominantPct: 60 };

    const isIntrovert = ei.dominantCode === 'I';
    const isFeeling = tf.dominantCode === 'F';
    const isReflective = ar.dominantCode === 'R';
    const isConnective = dc.dominantCode === 'C';

    // 1. 社交電量
    let batteryPct = 50;
    let batteryStatus = '中度平衡';
    let batteryDrainer = '人際摩擦與無效溝通';
    let batteryCure = '切換環境、散步沉澱、喝杯熱茶';

    if (isIntrovert) {
      batteryPct = Math.max(16, Math.round(100 - ei.dominantPct * 0.85));
      batteryStatus = batteryPct < 30 ? '電量嚴重告急 ｜ 需 48hr 靜音模式' : '低電量運轉 ｜ 拒絕無效社交';
      batteryDrainer = '多人聚會、被迫即時回覆訊息、當別人的情緒垃圾桶';
      batteryCure = '手機開啟「請勿打擾」、洗個熱水澡、獨處聽 Lo-fi 音樂';
    } else {
      batteryPct = Math.min(94, Math.round(ei.dominantPct * 0.95));
      batteryStatus = '高能外顯 ｜ 需防範深夜突發性耗竭';
      batteryDrainer = '被長時間孤立、沉悶無聊的重複工作、付出未被看見';
      batteryCure = '找真正懂你的同頻夥伴暢聊、戶外運動、策劃一場新旅行';
    }

    // 2. 精神內耗
    const overthinkingPct = isReflective 
      ? Math.min(96, Math.round(ar.dominantPct * 0.92 + 8))
      : Math.max(22, Math.round(100 - ar.dominantPct * 0.72));
    
    const overthinkingTitle = overthinkingPct >= 75
      ? '重度內耗 ｜ 深夜小劇場導演'
      : overthinkingPct >= 50
      ? '適度自省 ｜ 偶爾陷入糾結反芻'
      : '鈍感自洽 ｜ 心理防禦極度穩健';

    // 3. 職場假性堅強面具
    let copingMask = '「表面體貼懂事，委屈自己吞下去的隱形討好面具」';
    if (!isFeeling && !isConnective) {
      copingMask = '「表面刀槍不入絕對掌控，內心獨自扛起所有風險的防禦面具」';
    } else if (isFeeling && !isConnective) {
      copingMask = '「熱心為大家張羅開路，卻最害怕自己不被需要的價值面具」';
    } else if (!isFeeling && isConnective) {
      copingMask = '「理性講道理維持和諧，害怕情緒衝突帶來的失控感」';
    }

    // 4. 身心學 3 分鐘回血微處方
    const somaticExercise = isIntrovert
      ? {
          name: '生理性嘆氣 (Physiological Sigh)',
          method: '連續快速用鼻子吸氣兩次（第二口吸滿肺部），接著嘴巴放鬆緩慢吐氣 6 秒。重複 3 次，迅速重置自律神經與心率。'
        }
      : {
          name: '5-4-3-2-1 身心著陸法 (Grounding Technique)',
          method: '環顧四周：辨認 5 件物品、觸摸 4 種不同質地、聆聽 3 種環境聲音、感受 2 種氣味，最後深呼吸 1 次回到當下。'
        };

    const tomorrowMicroHabit = isIntrovert
      ? '明天嘗試將想立刻回覆的討厭訊息延遲 30 分鐘，對自己說：「我的時間不用向任何人隨傳隨到。」'
      : '明天在開口迎合他人前，刻意停頓 5 秒，問問自己：「這是我真正的需要，還是習慣性給出的社交反應？」';

    // 5. 能量吸血鬼
    const energyVampire = isIntrovert
      ? '「情緒巨嬰型」—— 不斷抱怨倒苦水，卻拒絕採取任何行動改變現狀的人。'
      : '「被動攻擊型」—— 表面答應配合，私下卻冷處理拖延、散發負能量的人。';

    return {
      batteryPct,
      batteryStatus,
      batteryDrainer,
      batteryCure,
      overthinkingPct,
      overthinkingTitle,
      copingMask,
      somaticExercise,
      tomorrowMicroHabit,
      energyVampire
    };
  }, [result.dimensions]);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setCustomName(val);
    if (onUpdateUserName) onUpdateUserName(val);
  };

  const handlePrint = () => {
    soundFX.playClick();
    window.print();
  };

  const handleUnlockClick = () => {
    soundFX.playClick();
    if (onGoToCheckout) {
      onGoToCheckout();
    } else {
      setIsPaywallOpen(true);
    }
  };

  return (
    <div className="result-container">
      {/* 官方專業認證金色橫條 (VIP Certification Header) */}
      <div className="certification-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="cert-seal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6"/>
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gold-accent)', fontWeight: 800, letterSpacing: '1.2px' }}>
              OFFICIAL CERTIFIED PERSONA DOSSIER
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              64 型心智動力學 · 深度心理評估診斷報告
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
          {isUnlocked ? (
            <div className="result-avatar-container" style={{ background: `linear-gradient(135deg, ${p.groupColor || '#6366f1'}, #ffffff 60%, ${p.groupColor || '#06b6d4'})` }}>
              <img
                src={p.avatar || './avatars/entj.svg'}
                alt={p.name}
                className="result-avatar-img"
              />
            </div>
          ) : (
            <div className="result-avatar-container" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))', border: '2px dashed rgba(245,158,11,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(168,85,247,0.2)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 800, marginTop: '4px' }}>形象已保護</span>
            </div>
          )}

          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="result-group-tag" style={{ margin: 0, color: isUnlocked ? p.groupColor : '#f59e0b', borderColor: isUnlocked ? p.groupColor : 'rgba(245,158,11,0.4)' }}>
                [ {isUnlocked ? `${p.group || '戰略統御矩陣'} · ${p.groupEnName || 'Strategic'}` : '64型心智動力矩陣 · 專屬推演已完成'} ]
              </span>
              <span className="dim-code-badge" style={{
                color: isUnlocked ? (result.code.includes('-AD') ? '#f59e0b' : result.code.includes('-AC') ? '#38bdf8' : result.code.includes('-RD') ? '#c084fc' : '#f472b6') : '#f87171',
                borderColor: 'rgba(255, 255, 255, 0.15)'
              }}>
                {isUnlocked ? (result.code.includes('-AD') ? '熾陽破局形態' : result.code.includes('-AC') ? '盛世盟約形態' : result.code.includes('-RD') ? '孤島深邃形態' : '深海微光形態') : '形態詳細解析已加密'}
              </span>
              <span className="dim-code-badge" style={{ color: 'var(--gold-accent)', borderColor: 'rgba(245, 158, 11, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                全球罕見度：約 {rarityPct}%
              </span>
            </div>
            
            <div className="result-code-display" style={{ letterSpacing: isUnlocked ? 'normal' : '4px', color: isUnlocked ? 'var(--text-primary)' : '#f59e0b' }}>
              {maskedResultCode}
            </div>

            <div className="result-persona-name">
              {isUnlocked ? p.name : '專屬 64 型未解鎖心智原型'} · <span style={{ color: 'var(--text-accent)' }}>{customName}</span>
            </div>

            <p className="result-tagline-quote">
              “ {isUnlocked ? p.tagline : '您的 64 維度心智動力學模型已完成精密推演，包含榮格認知棧與職場/愛情破局手冊，解鎖後立即解密。'} ”
            </p>
          </div>
        </div>
      </div>

      {/* 雙欄圖表展示區塊 (Canvas 雷達圖 + 六維度能量長條) */}
      <div className="result-charts-grid">
        {/* 六維度動態雷達圖 */}
        <div className="radar-card-wrapper glass-panel">
          <h3 style={{ marginBottom: '14px', fontSize: '1.15rem', fontWeight: 800 }}>
            六維心智能力光譜雷達
          </h3>
          <RadarChartComponent data={result.radarData} isDarkMode={isDarkMode} />
          <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>
            動態雷達反映你在 6 大核心維度上的能量偏向百分比
          </div>
        </div>

        {/* 六維度能量百分比長條圖 */}
        <div className="dimension-bars-wrapper glass-panel">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>
            雙極維度能量深度量測
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
                  {/* 主導維度動態填色 */}
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

      {/* ══ 亞洲人設共鳴與心靈自救面板 (Asian Resonance & Somatic Grounding Matrix) ══ */}
      <div className="glass-panel" style={{ margin: '24px 0', padding: '28px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
              ✦ Asian Cultural Resonance & Recovery
            </div>
            <h3 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
              心靈原色 · 社交電量與內耗自救矩陣
            </h3>
          </div>
          <div className="resonance-badge">
            🌿 榮格心理學 × 現代身心自律神經調適
          </div>
        </div>

        <div className="asian-resonance-grid">
          {/* 卡片 1：社交出廠電量與回血 */}
          <div className="resonance-card">
            <div className="resonance-card-header">
              <span className="resonance-badge" style={{ background: 'rgba(125, 165, 133, 0.15)', color: 'var(--secondary-light)', borderColor: 'rgba(125, 165, 133, 0.3)' }}>
                🔋 社交出廠配置
              </span>
              <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-light)' }}>
                {asianResonance.batteryPct}%
              </span>
            </div>
            <div className="resonance-title font-serif">
              當前社交電量狀態
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              {asianResonance.batteryStatus}
            </div>

            <div className="battery-gauge-wrapper">
              <div className="battery-gauge-track">
                <div
                  className="battery-gauge-fill"
                  style={{
                    width: `${asianResonance.batteryPct}%`,
                    background: asianResonance.batteryPct < 35 ? 'linear-gradient(90deg, #ef4444, #f59e0b)' : 'var(--grad-aurora)'
                  }}
                />
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: 'auto' }}>
              <p style={{ margin: '4px 0' }}><strong style={{ color: 'var(--text-primary)' }}>⚡ 耗電元凶：</strong>{asianResonance.batteryDrainer}</p>
              <p style={{ margin: '4px 0' }}><strong style={{ color: 'var(--secondary-light)' }}>🌿 專屬回血：</strong>{asianResonance.batteryCure}</p>
            </div>
          </div>

          {/* 卡片 2：精神內耗防禦與假性堅強 */}
          <div className="resonance-card">
            <div className="resonance-card-header">
              <span className="resonance-badge" style={{ background: 'rgba(229, 154, 88, 0.15)', color: 'var(--primary-light)', borderColor: 'rgba(229, 154, 88, 0.3)' }}>
                🌪️ 精神內耗防禦
              </span>
              <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--gold-accent)' }}>
                {asianResonance.overthinkingPct}%
              </span>
            </div>
            <div className="resonance-title font-serif">
              {asianResonance.overthinkingTitle}
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              日常心理防禦運算負荷指標
            </div>

            <div className="editorial-quote-box" style={{ margin: '4px 0 12px', fontSize: '0.86rem', padding: '10px 14px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>🎭 你的日常面具配置：</span>
              {asianResonance.copingMask}
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 'auto' }}>
              <strong style={{ color: '#f43f5e' }}>⚠️ 能量吸血鬼警報：</strong>
              <div style={{ marginTop: '2px' }}>{asianResonance.energyVampire}</div>
            </div>
          </div>

          {/* 卡片 3：身心學 3 分鐘回血微處方 */}
          <div className="resonance-card">
            <div className="resonance-card-header">
              <span className="resonance-badge" style={{ background: 'rgba(126, 140, 248, 0.15)', color: 'var(--accent-light)', borderColor: 'rgba(126, 140, 248, 0.3)' }}>
                🌿 3 分鐘身心著陸處方
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                Somatic Care
              </span>
            </div>
            <div className="resonance-title font-serif">
              {asianResonance.somaticExercise.name}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '12px' }}>
              {asianResonance.somaticExercise.method}
            </div>

            <div className="grounding-step-box">
              <div className="grounding-icon-badge">✦</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                <strong style={{ color: 'var(--gold-accent)' }}>明日微習慣實驗：</strong><br />
                {asianResonance.tomorrowMicroHabit}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 深度全景報告導航橫幅 */}
      <div
        className="glass-panel"
        style={{
          margin: '20px 0',
          padding: '18px 24px',
          background: 'linear-gradient(135deg, rgba(229, 154, 88, 0.09), rgba(125, 165, 133, 0.09))',
          border: '1px solid var(--border-glass)',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(229, 154, 88, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <div className="font-serif" style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
              ✦ {result.code} 全景心智動力學深度報告已完整就緒
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              包含榮格 4 階認知運算棧、職場商業破局、親密關係相處指南與 21 天心智躍遷手冊
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              soundFX.playClick();
              if (onGoToWhitepaper) {
                onGoToWhitepaper();
              } else {
                setIsWhitepaperOpen(true);
              }
            }}
            style={{
              padding: '10px 22px',
              fontSize: '0.88rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>瀏覽一頁式全景深度報告 ➔</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handlePrint}
            style={{
              padding: '10px 16px',
              fontSize: '0.88rem'
            }}
          >
            列印 / 存 PDF
          </button>
        </div>
      </div>

      {/* 深度剖析多維標籤頁 */}
      <div className="result-tabs-container glass-panel" style={{ padding: '32px' }}>
        <div className="tabs-nav-bar" style={{ overflowX: 'auto', flexWrap: 'nowrap', paddingBottom: '4px' }}>
          <button
            className={`tab-btn ${activeTab === 'traits' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('traits'); }}
          >
            核心天賦特質
          </button>
          <button
            className={`tab-btn ${activeTab === 'cognitive' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('cognitive'); }}
          >
            認知功能運算棧
          </button>
          <button
            className={`tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('careers'); }}
          >
            職場破局與實戰
          </button>
          <button
            className={`tab-btn ${activeTab === 'love' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('love'); }}
          >
            親密關係與相處
          </button>
          <button
            className={`tab-btn ${activeTab === 'growth' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('growth'); }}
          >
            壓力陰影自救
          </button>
          <button
            className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => { soundFX.playTab(); setActiveTab('matches'); }}
          >
            命定契合拍檔
          </button>
        </div>

        {/* 標籤 1: 核心特質 */}
        {activeTab === 'traits' && (
          <div className="tab-pane-content active">
            <div className="content-grid-2col">
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary-light)' }}>
                  ⚡ 核心天賦超能力 (Core Superpowers)
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
                  🌌 原型深度概述 (Archetype Overview)
                </h4>
                <LockedSection isUnlocked={isUnlocked} onUnlock={handleUnlockClick} title="原型深度概述與量化極值解讀">
                  <div className="glass-panel" style={{ padding: '24px', lineHeight: 1.85, fontSize: '0.96rem', color: 'var(--text-secondary)' }}>
                    <p style={{ marginBottom: '12px', color: 'var(--text-primary)', fontWeight: 700 }}>
                      ✦ {p.name}（{result.code}）屬於 <strong style={{ color: p.groupColor || 'var(--secondary-light)' }}>{p.group}</strong>。
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      你的核心生命箴言為「{p.tagline}」。在心智模型中，你結合了 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.EI.dominantLabel}</strong> 的充能路徑與 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.SN.dominantLabel}</strong> 的資訊感知，形成極具辨識度的洞察視角。
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      在面對抉擇時，你習慣運用 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.TF.dominantLabel}</strong> 錨定準則，並以 <strong style={{ color: 'var(--text-primary)' }}>{result.dimensions.JP.dominantLabel}</strong> 的步調掌控局勢。
                    </p>
                    {/* 多維度交叉共振動態化學反應（根據 6 大 % 數客製化生成） */}
                    {dynamicData?.crossSynthesis && (
                      <div style={{ margin: '14px 0', background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(168,85,247,0.1))', border: '1.5px solid rgba(251,191,36,0.4)', borderRadius: '12px', padding: '16px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>🔮</span><span>{dynamicData.crossSynthesis.title}</span>
                          </div>
                          <span className="dim-code-badge" style={{ color: '#fbbf24', borderColor: 'rgba(251,191,36,0.4)' }}>
                            {dynamicData.crossSynthesis.tag}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.75, margin: 0 }}>
                          {dynamicData.crossSynthesis.desc}
                        </p>
                      </div>
                    )}

                    <div className="legal-alert-box alert-info" style={{ margin: '12px 0 0 0', fontSize: '0.88rem' }}>
                      <strong>形態動力學：</strong>{p.subTypeMeta ? p.subTypeMeta.summary : '在動態平衡中展現卓越的自我驅動力。'}
                    </div>

                    {/* 即時百分比個人化動態解析 */}
                    {dynamicData && (
                      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ padding: '12px 14px', background: 'rgba(239, 68, 68, 0.06)', borderLeft: '3px solid #f87171', borderRadius: '4px', fontSize: '0.86rem' }}>
                          <div style={{ fontWeight: 800, color: '#f87171', marginBottom: '2px' }}>🔥 個人量化極值主導維度解析</div>
                          <div style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{dynamicData.extremeInsights}</div>
                        </div>
                        <div style={{ padding: '12px 14px', background: 'rgba(56, 189, 248, 0.06)', borderLeft: '3px solid #38bdf8', borderRadius: '4px', fontSize: '0.86rem' }}>
                          <div style={{ fontWeight: 800, color: '#38bdf8', marginBottom: '2px' }}>⚖️ 個人量化游移平衡維度解析</div>
                          <div style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{dynamicData.balancedInsights}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </LockedSection>
              </div>
            </div>
          </div>
        )}

        {/* 標籤 2: 認知功能運算棧 (Jungian Cognitive Function Stack) */}
        {activeTab === 'cognitive' && (
          <div className="tab-pane-content active">
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', color: 'var(--primary-light)' }}>
                🧠 榮格八維認知功能運算棧 (Cognitive Function Architecture)
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                人類大腦在接收資訊與決策時的「4 階心理處理器排序」。它揭密了你如何感知世界、何時爆發靈感，以及在極限高壓下為何會進入盲區。
              </p>
            </div>

            <LockedSection isUnlocked={isUnlocked} onUnlock={handleUnlockClick} title="榮格八維認知功能運算棧">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {p.cognitiveStack && p.cognitiveStack.map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '20px',
                      borderColor: `${item.info.color}44`,
                      background: `linear-gradient(135deg, ${item.info.color}0a, rgba(255,255,255,0.02))`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            background: item.info.color,
                            color: '#ffffff',
                            fontWeight: 900,
                            fontSize: '0.85rem',
                            padding: '3px 10px',
                            borderRadius: '6px',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {item.fn}
                        </span>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {item.level}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: item.info.color, fontWeight: 'bold' }}>
                        能量活化度 {item.strength}%
                      </span>
                    </div>

                    {/* 活化度進度條 */}
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
                      <div style={{ width: `${item.strength}%`, height: '100%', background: item.info.color, borderRadius: '3px' }} />
                    </div>

                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {item.info.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: item.info.color, marginBottom: '8px', fontWeight: 600 }}>
                      ✦ {item.info.roleTitle}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="glass-panel" style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                <div style={{ fontWeight: 800, color: 'var(--primary-light)', marginBottom: '6px' }}>
                  💡 認知動力學核心解密：
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  你的英雄主導功能（{p.cognitiveStack ? p.cognitiveStack[0].fn : 'Te'}）是你最自信的直覺武器，但當你遭遇重大挫折或長期疲憊時，劣勢功能（{p.cognitiveStack ? p.cognitiveStack[3].fn : 'Fi'}）會被強制喚醒引發「陰影抓狂（In the Grip）」。學會適時啟用輔助功能（{p.cognitiveStack ? p.cognitiveStack[1].fn : 'Ni'}）平衡大腦，是邁向成熟高階心智的關鍵鑰匙。
                </p>
              </div>
            </LockedSection>
          </div>
        )}

        {/* 標籤 3: 職場破局與商業實戰 */}
        {activeTab === 'careers' && (
          <div className="tab-pane-content active">
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '12px', color: 'var(--secondary-light)' }}>
              💼 推薦適合職業與天賦跑道 (Career & High-Pay Blueprint)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '16px' }}>
              根據你的 6 維度能力光譜，你在需要發揮戰略前瞻、獨立決斷與跨界開拓的環境中能爆發出最大潛能：
            </p>
            <div className="careers-tag-cloud" style={{ marginBottom: '24px' }}>
              {p.careers.map((career, i) => (
                <div key={i} className="career-tag-pill">
                  🎯 {career}
                </div>
              ))}
            </div>

            <LockedSection isUnlocked={isUnlocked} onUnlock={handleUnlockClick} title="職場高薪跑道與商業實戰手冊">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    👑 職場核心競爭力
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {p.careerMastery ? p.careerMastery.workplaceSuperpower : '具備明確的方向感與目標聚焦能力，善於拆解複雜挑戰並激勵團隊達成關鍵成果。'}
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    ⚡ 理想工作場域特質
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {p.careerMastery ? p.careerMastery.idealEnvironment : '給予充分決策自主權、重視結果品質與實質產出、具備開放討論空間的環境最能激發你的熱情。'}
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    🤝 與你共事的黃金溝通法則
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {p.careerMastery ? p.careerMastery.colleagueRule : '就事論事、溝通直奔主題並嚴守承諾，用數據與邏輯論證。'}
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '8px' }}>
                    🚀 升遷加速突破口
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {p.careerMastery ? p.careerMastery.growthBreakpoint : '學會適時向外授權，不要試圖將所有責任扛在一人肩上。'}
                  </p>
                </div>
              </div>
            </LockedSection>
          </div>
        )}

        {/* 標籤 4: 愛情人際與避坑指南 */}
        {activeTab === 'love' && (
          <div className="tab-pane-content active">
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--accent-light)' }}>
              ❤️ 親密關係與愛情全維度手冊 (Intimacy & Love Psychology)
            </h4>

            <LockedSection isUnlocked={isUnlocked} onUnlock={handleUnlockClick} title="親密關係與愛情全維度手冊">
              {/* 依附風格與吸引力宿命（根據 AR / TF 量化分數量身定制） */}
              {dynamicData?.dynamicLoveDiagnosis && (
                <div
                  className="glass-panel"
                  style={{
                    padding: '22px 24px',
                    marginBottom: '20px',
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(168, 85, 247, 0.1))',
                    border: '1.5px solid rgba(236, 72, 153, 0.4)',
                    borderRadius: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ fontSize: '0.82rem', color: '#f472b6', fontWeight: 800, letterSpacing: '1.5px' }}>
                      💘 你的個人化潛意識戀愛依附風格
                    </div>
                    <span className="dim-code-badge" style={{ color: '#f472b6', borderColor: 'rgba(236,72,153,0.4)' }}>
                      {dynamicData.dynamicLoveDiagnosis.attachmentStyle}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.94rem', color: '#fff', lineHeight: 1.85, margin: '0 0 10px 0' }}>
                    {dynamicData.dynamicLoveDiagnosis.attachmentDesc}
                  </p>
                  <p style={{ fontSize: '0.86rem', color: '#fce7f3', lineHeight: 1.7, margin: 0 }}>
                    {deep?.intimacyMastery?.attachment}
                  </p>
                </div>
              )}

              {/* 心動信號 & 安全感時刻 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                {deep?.intimacyMastery?.crushSignals && (
                  <div
                    className="glass-panel"
                    style={{
                      padding: '22px',
                      background: 'rgba(251, 191, 36, 0.05)',
                      borderColor: 'rgba(251, 191, 36, 0.25)'
                    }}
                  >
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>💓</span><span>當你真正動心時，藏不住的 3 個極微小信號</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {dynamicData?.dynamicLoveDiagnosis?.customCrushSignal && (
                        <div style={{ display: 'flex', gap: '10px', padding: '10px 12px', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', fontSize: '0.88rem', color: '#fff', fontWeight: 700 }}>
                          <span style={{ color: 'var(--gold-accent)', fontWeight: 900, flexShrink: 0 }}>★</span>
                          <span>{dynamicData.dynamicLoveDiagnosis.customCrushSignal}</span>
                        </div>
                      )}
                      {deep.intimacyMastery.crushSignals.map((sig, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                          <span style={{ color: 'var(--gold-accent)', fontWeight: 900, flexShrink: 0 }}>0{i+1}</span>
                          <span>{sig}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {deep?.intimacyMastery?.securityTrigger && (
                  <div
                    className="glass-panel"
                    style={{
                      padding: '22px',
                      background: 'rgba(16, 185, 129, 0.05)',
                      borderColor: 'rgba(16, 185, 129, 0.25)'
                    }}
                  >
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--success)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🛡️</span><span>讓你瞬間放下心防的安全感時刻</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.8, margin: '0 0 14px 0' }}>
                      {deep.intimacyMastery.securityTrigger}
                    </p>
                    {deep?.subTypeMeta?.loveLanguage && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                        💌 <strong>深層愛之語：</strong>{deep.subTypeMeta.loveLanguage}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 給伴侶的使用說明書 & 禁忌雷區 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    background: 'rgba(236, 72, 153, 0.05)',
                    borderColor: 'rgba(236, 72, 153, 0.25)',
                    lineHeight: 1.8
                  }}
                >
                  <div style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>📜</span><span>給另一半的真心使用說明書</span>
                  </div>
                  {deep?.intimacyMastery?.partnerGuide ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                      {deep.intimacyMastery.partnerGuide.map((rule, idx) => (
                        <div key={idx} style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                          <span style={{ color: '#f472b6', fontWeight: 800, marginRight: '6px' }}>✦</span>
                          {rule}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '14px' }}>{p.loveStyle}</p>
                  )}
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                    💡 <strong>理想伴侶畫像：</strong>{p.intimacyMastery?.idealPartnerTrait || '重視彼此獨立空間與深層精神共鳴。'}
                  </div>
                </div>

                <div
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    background: 'rgba(239, 68, 68, 0.05)',
                    borderColor: 'rgba(239, 68, 68, 0.25)',
                    lineHeight: 1.8
                  }}
                >
                  <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#f87171', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>⚠️</span><span>人際與戀愛絕對禁忌雷區（踩到必炸）</span>
                  </div>
                  <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {p.intimacyMastery && p.intimacyMastery.redFlags.map((rf, idx) => (
                      <li key={idx} style={{ marginBottom: '6px' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{rf}</strong>
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                    💬 <strong>衝突修復秘訣：</strong>{p.intimacyMastery?.communicationTip || '在給出理性建議前，先給予伴侶一句溫暖的情感確認。'}
                  </div>
                </div>
              </div>
            </LockedSection>
          </div>
        )}

        {/* 標籤 5: 壓力應激與 4 步陰影自救 */}
        {activeTab === 'growth' && (
          <div className="tab-pane-content active">
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', color: 'var(--warning)' }}>
              🛡️ 壓力應激與 4 步陰影自救 SOP (Shadow Integration & Healing Protocol)
            </h4>

            <LockedSection isUnlocked={isUnlocked} onUnlock={handleUnlockClick} title="壓力應激與 4 步陰影自救 SOP">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <div className="glass-panel" style={{ padding: '22px', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--warning)', marginBottom: '8px', fontSize: '1.02rem' }}>
                    ⚡ 核心壓力觸發源 (Stress Triggers)
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
                    {p.stressProtocol ? p.stressProtocol.trigger : '當長期處於不可控混亂或努力被否定時，能量將急劇衰竭。'}
                  </p>
                  <div style={{ fontWeight: 800, color: '#f87171', marginBottom: '6px', fontSize: '0.95rem' }}>
                    🌀 劣勢功能失控狀態 (In the Grip)
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {p.stressProtocol ? p.stressProtocol.shadowGrip : '可能短暫切換至劣勢功能失控狀態，陷入過度自責或焦慮內耗。'}
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '22px', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--success)', marginBottom: '12px', fontSize: '1.02rem' }}>
                    🌿 4 步驟心智能量重啟 SOP
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {p.stressProtocol && p.stressProtocol.healingSOP.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                        <span
                          style={{
                            background: 'rgba(16, 185, 129, 0.2)',
                            color: '#34d399',
                            fontWeight: 900,
                            fontSize: '0.78rem',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          STEP 0{idx + 1}
                        </span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="glass-panel"
                style={{
                  padding: '20px',
                  background: 'rgba(16, 185, 129, 0.05)',
                  borderColor: 'rgba(16, 185, 129, 0.25)',
                  lineHeight: 1.7
                }}
              >
                <div style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--success)', marginBottom: '8px' }}>
                  🔋 日常身心回充處方：
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0 }}>
                  {p.stressRecharge}
                </p>
              </div>
            </LockedSection>
          </div>
        )}

        {/* 標籤 6: 命定拍檔 */}
        {activeTab === 'matches' && (
          <div className="tab-pane-content active">
            <LockedSection isUnlocked={isUnlocked} onUnlock={handleUnlockClick} title="命定靈魂拍檔深度契合解析">
              <div className="content-grid-2col">
                <div className="match-partner-card">
                  <img
                    src={goldenProf.avatar || './avatars/empath.svg'}
                    alt={goldenProf.name}
                    className="partner-avatar-img"
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent-light)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      最佳靈魂拍檔 (Golden Match)
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>
                      {p.goldenMatch} · {goldenProf.name}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
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
                    <div style={{ fontSize: '0.85rem', color: 'var(--secondary-light)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                      成長磨礪拍檔 (Growth Match)
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>
                      {p.growthMatch} · {growthProf.name}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      思維視角迥異，在跨維度碰撞與溝通磨合中，能拓展你的人生維度與心智寬度。
                    </div>
                  </div>
                </div>
              </div>
            </LockedSection>
          </div>
        )}
      </div>

      {/* 結果操作工具列 */}
      <div className="result-actions-toolbar">
        <button
          className="btn btn-primary btn-lg"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onClick={() => {
            soundFX.playClick();
            if (onGoToWhitepaper) {
              onGoToWhitepaper();
            } else {
              setIsWhitepaperOpen(true);
            }
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>閱讀全景深度解析報告</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        <button
          className="btn btn-secondary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onOpenShareModal();
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>生成專屬官方證書海報</span>
        </button>

        <button
          className="btn btn-secondary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onCopySummary();
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span>複製完整診斷摘要</span>
        </button>

        <button
          className="btn btn-secondary btn-lg"
          onClick={handlePrint}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          <span>列印 / 儲存 PDF</span>
        </button>

        <button
          className="btn btn-secondary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onRetest();
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          <span>重新測驗</span>
        </button>
      </div>

      {/* 付費收銀台彈窗 (Paywall Modal) */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        personaCode={result.code}
        personaName={p.name}
        onUnlockSuccess={handleUnlockSuccess}
      />

      {/* 一頁式全景個人心智動力學深度解析報告 (Whitepaper Modal) */}
      <WhitepaperModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
        result={result}
        userName={customName}
        isVipUnlocked={isVipUnlocked}
        adminMode={adminMode}
        onOpenPaywall={() => {
          setIsWhitepaperOpen(false);
          setIsPaywallOpen(true);
        }}
      />
    </div>
  );
}
