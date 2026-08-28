import React, { useState, useMemo, useEffect } from 'react';
import { RadarChartComponent } from './RadarChart';
import { getPersonalityProfile } from '../data/personalityData';
import { getDeepPersonalityDetails } from '../data/deepReportData';
import { generateDynamicPersonalizedAnalysis } from '../data/dynamicSpectrumEngine';
import { DIMENSIONS } from '../data/questions';
import { soundFX } from '../utils/audio';

// 頂部極簡控制列 (Minimal Top Toolbar)
function DossierTopBar({ userName, certCode, onGoBack, onGoHome }) {
  return (
    <div className="dossier-sticky-nav-wrapper">
      <div className="dossier-sticky-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => { soundFX.playClick(); onGoBack ? onGoBack() : onGoHome(); }}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '6px 14px' }}
          >
            <span>← 返回總覽</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {userName} 的個人深度檔案
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            #{certCode}
          </span>
          <button
            onClick={() => { soundFX.playClick(); window.print(); }}
            className="btn btn-primary btn-sm"
            style={{ fontSize: '0.82rem', padding: '6px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>🖨️ 列印 / 存為 PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 現代雜誌級章節標題 (Editorial Section Heading)
function SectionHeading({ subtitle, title, id }) {
  return (
    <div id={id} className="dossier-section">
      <div style={{ marginBottom: '22px' }}>
        {subtitle && (
          <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
            {subtitle}
          </div>
        )}
        <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
          {title}
        </h2>
      </div>
    </div>
  );
}

// 現代高質感卡片 (Modern Flat Glass Card)
function ModernCard({ children, bg, border, mb = '18px', padding = '24px' }) {
  return (
    <div style={{
      background: bg || 'rgba(255, 255, 255, 0.03)',
      border: `1px solid ${border || 'rgba(255, 255, 255, 0.08)'}`,
      borderRadius: '20px',
      padding,
      marginBottom: mb,
      transition: 'border-color 0.2s ease, transform 0.2s ease'
    }}>
      {children}
    </div>
  );
}

export function WhitepaperPageView({
  result,
  userName = '探索者',
  isVipUnlocked = false,
  adminMode = false,
  onGoBack,
  onGoHome,
  onGoToCheckout
}) {
  const p = result?.profile || {};
  const deep = useMemo(() => getDeepPersonalityDetails(result?.code || 'ENTJ-AD'), [result?.code]);
  const subType = deep?.subTypeMeta || {};
  const dynamicData = useMemo(() => generateDynamicPersonalizedAnalysis(result?.dimensions, p), [result?.dimensions, p]);
  const goldenProf = useMemo(() => getPersonalityProfile(p.goldenMatch), [p.goldenMatch]);
  const growthProf = useMemo(() => getPersonalityProfile(p.growthMatch), [p.growthMatch]);

  const baseCode = (result?.code || 'ENTJ-AD').split('-')[0].toLowerCase();
  const avatarSrc = p.avatar || `./avatars/${baseCode}.svg`;
  const goldenAvatar = goldenProf?.avatar || `./avatars/${p.goldenMatch?.split('-')?.[0]?.toLowerCase() || 'empath'}.svg`;
  const growthAvatar = growthProf?.avatar || `./avatars/${p.growthMatch?.split('-')?.[0]?.toLowerCase() || 'sentinel'}.svg`;

  // 6 個雙極維度量化數據
  const dimensionList = useMemo(() => {
    const keys = ['EI', 'SN', 'TF', 'JP', 'AR', 'DC'];
    return keys.map(k => {
      const d = result?.dimensions?.[k];
      const meta = DIMENSIONS[k] || {};
      const charA = meta.codeA || k[0];
      const charB = meta.codeB || k[1];
      
      const domCode = d?.dominantCode || (result?.code?.includes(charA) ? charA : charB);
      const isDomA = domCode === charA;
      const domPct = d?.dominantPct || (d?.pctA && isDomA ? d.pctA : d?.pctB && !isDomA ? d.pctB : 76);
      
      const pctA = d?.pctA !== undefined ? d.pctA : (isDomA ? domPct : 100 - domPct);
      const pctB = d?.pctB !== undefined ? d.pctB : (!isDomA ? domPct : 100 - domPct);
      const traitStrength = d?.traitStrength || (domPct >= 80 ? '極其顯著' : domPct >= 65 ? '中度偏向' : '微幅偏向');

      return {
        key: k,
        name: d?.name || meta.name || k,
        codeA: charA,
        labelA: d?.labelA || meta.labelA || charA,
        pctA: Math.round(pctA),
        codeB: charB,
        labelB: d?.labelB || meta.labelB || charB,
        pctB: Math.round(pctB),
        dominantCode: domCode,
        dominantPct: Math.round(domPct),
        traitStrength,
        color: d?.color || meta.color || '#6366f1'
      };
    });
  }, [result?.dimensions, result?.code]);

  const radarChartData = useMemo(() => {
    if (result?.radarData && Array.isArray(result.radarData) && result.radarData.length > 0) {
      return result.radarData;
    }
    return dimensionList.map(d => ({
      label: `${d.name} (${d.dominantCode})`,
      value: d.dominantPct,
      color: d.color,
      code: d.dominantCode
    }));
  }, [result?.radarData, dimensionList]);

  if (!result) return null;

  const certId = result.code.split('').reduce((acc, c) => acc + c.charCodeAt(0), 100);
  const certCode = `64T-2026-${String(certId * 47).padStart(5,'0')}`;
  const currentDate = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
  const canView = true;

  const rarityPct = (() => {
    const h = result.code.split('').reduce((a, c) => a + c.charCodeAt(0), 10);
    return (1.2 + (h % 25) / 10).toFixed(1);
  })();

  // 未解鎖狀態（對標 Type64 / PersonalityHub 現代極簡付費引導）
  if (!canView) {
    return (
      <div style={{ maxWidth: '780px', margin: '60px auto', padding: '0 20px' }}>
        <div className="glass-panel" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass-hover)', borderRadius: '24px', padding: '48px 36px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>🔒</div>
          <h1 style={{ color: 'var(--text-primary)', margin: '0 0 14px 0', fontSize: '1.8rem', fontWeight: 900 }}>解鎖個人完整深度解析檔案</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.8, fontSize: '0.96rem', maxWidth: '540px', margin: '0 auto 32px auto' }}>
            本報告為 <strong style={{ color: '#fff' }}>100% 依據您 6 大維度得分動態合成的一頁式長文深度檔案</strong>，涵蓋榮格認知運算棧、職場商業破局、愛情依附風格、心動信號與 21 天心智躍遷指南。
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onGoToCheckout} className="btn btn-primary btn-lg" style={{ minWidth: '240px' }}>
              👑 前往結帳頁解鎖 (限時 NT$ 99)
            </button>
            <button onClick={onGoBack} className="btn btn-secondary btn-lg">
              ← 返回分析簡報
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dossier-container">
      
      {/* Admin 模式提示 */}
      {adminMode && (
        <div style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))', color: '#fff', padding: '10px 20px', borderRadius: '14px', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛡️ ADMIN PREVIEW MODE</span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span style={{ opacity: 0.9, fontWeight: 400 }}>目前處於管理員預覽狀態（全景長文報告全量開放）</span>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem' }}>ADMIN</span>
        </div>
      )}

      {/* 頂部極簡控制列 */}
      <DossierTopBar
        userName={userName}
        certCode={certCode}
        onGoBack={onGoBack}
        onGoHome={onGoHome}
      />

      {/* 一頁式主報告長文畫布 */}
      <div className="dossier-main-canvas">
        
        {/* ══ HERO 報告首頁 (對標 Type64 / PersonalityHub 現代大氣 Hero) ══ */}
        <div style={{ paddingBottom: '36px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '32px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: 'var(--primary-light)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
              {p.group || '人格矩陣'}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
              全球稀有度 {rarityPct}%
            </span>
            <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-tertiary)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
              {currentDate}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', fontWeight: 800, letterSpacing: '1px', marginBottom: '6px' }}>
                {userName} 的專屬人格檔案
              </div>
              <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 10px 0' }}>
                {result.code} · {p.name}
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--primary-light)', fontWeight: 700, margin: '0 0 18px 0', lineHeight: 1.5 }}>
                {p.tagline}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(p.superpowers || p.tags)?.map(t => (
                  <span key={t} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '5px 14px', borderRadius: '12px', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* 原型角色形象立繪 */}
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px',
              boxShadow: '0 12px 35px rgba(0,0,0,0.35)'
            }}>
              <img
                src={avatarSrc}
                alt={p.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>

        </div>

        {/* ══ SECTION 1: 性格核心特質與靈魂畫像 ══ */}
        <SectionHeading subtitle="Overview" title="性格核心特質與靈魂畫像" id="sec-soul" />

        <ModernCard padding="28px 32px">
          <div style={{ fontSize: '1.02rem', color: 'var(--text-primary)', lineHeight: 2, fontStyle: 'italic', marginBottom: '20px', borderLeft: '3px solid var(--primary)', paddingLeft: '18px' }}>
            "{subType.soulPortrait || p.description}"
          </div>
          <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
            {p.description}
          </div>
        </ModernCard>

        {/* 多維度動態協同分析 */}
        {dynamicData?.crossSynthesis && (
          <ModernCard bg="linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.05))" border="rgba(99,102,241,0.25)">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✦</span>
                <span>{dynamicData.crossSynthesis.title}</span>
              </div>
              <span style={{ fontSize: '0.74rem', background: 'rgba(99,102,241,0.15)', color: 'var(--primary-light)', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                {dynamicData.crossSynthesis.archetypeSynergy}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {dynamicData.crossSynthesis.desc}
            </p>
          </ModernCard>
        )}

        {/* ══ SECTION 2: 六維能量光譜 (對標 16P / Type64 雙向光譜條) ══ */}
        <SectionHeading subtitle="Spectrum" title="六大心智維度量化光譜" id="sec-spectrum" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          {dimensionList.map(d => (
            <ModernCard key={d.key} mb="0" padding="18px 22px">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{d.name}</span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-tertiary)', padding: '2px 8px', borderRadius: '8px', fontWeight: 600 }}>{d.traitStrength}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  <span style={{ color: d.dominantCode === d.codeA ? d.color : 'inherit' }}>{d.labelA} {d.pctA}%</span>
                  <span style={{ opacity: 0.4, margin: '0 6px' }}>/</span>
                  <span style={{ color: d.dominantCode === d.codeB ? d.color : 'inherit' }}>{d.pctB}% {d.labelB}</span>
                </div>
              </div>

              {/* 雙向進度條 */}
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${d.pctA}%`, background: d.dominantCode === d.codeA ? d.color : 'rgba(255,255,255,0.2)', transition: 'width 0.6s ease' }} />
                <div style={{ width: `${d.pctB}%`, background: d.dominantCode === d.codeB ? d.color : 'rgba(255,255,255,0.2)', transition: 'width 0.6s ease' }} />
              </div>
            </ModernCard>
          ))}
        </div>

        {/* ══ SECTION 3: 榮格認知功能棧 ══ */}
        <SectionHeading subtitle="Cognitive Architecture" title="榮格 4 階認知功能運算架構" id="sec-stack" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          {(Array.isArray(deep?.cognitiveStack) ? deep.cognitiveStack : []).map((item, idx) => {
            const roleLabels = ['主導功能 (Dominant)', '輔助功能 (Auxiliary)', '第三功能 (Tertiary)', '劣勢功能 (Inferior)'];
            const tag = item.role || roleLabels[idx] || '認知功能';
            const info = item.info || {};
            const code = info.name || item.fn || '功能棧';
            const roleTitle = info.roleTitle || '心智功能運作';
            const desc = info.desc || '掌管大腦核心決策與資訊處理邏輯。';
            const color = info.color || '#6366f1';

            return (
              <ModernCard key={idx} mb="0" padding="20px" border={`${color}30`}>
                <div style={{ fontSize: '0.72rem', color, fontWeight: 800, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '2px' }}>{item.fn || code}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color, marginBottom: '8px' }}>{roleTitle}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{desc}</div>
              </ModernCard>
            );
          })}
        </div>

        {/* ══ SECTION 4: 內在深層世界與潛意識真相 ══ */}
        <SectionHeading subtitle="Inner Depth" title="深層潛意識與內在真實" id="sec-truths" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          {[
            { tag: '內在深層世界', desc: subType.innerWorld || '你的內心世界豐富而細膩，既有對未來的無限憧憬，也有對當下的沉靜思考。' },
            { tag: '隱蔽防禦與恐懼', desc: subType.deepestFear || '害怕失去前行的方向，害怕在妥協中磨滅了最初的夢想。' },
            { tag: '未曾言說的渴望', desc: subType.secretDesire || '渴望被深刻理解與全然接納，渴望有一處能讓自己完全卸下防備的避風港。' },
            { tag: '你帶給世界的禮物', desc: subType.giftToWorld || '你帶給身邊人的是堅定前行的勇氣與獨一無二的洞察力。' }
          ].map((t, idx) => (
            <ModernCard key={idx} mb="0" padding="22px">
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '8px' }}>
                {t.tag}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {t.desc}
              </div>
            </ModernCard>
          ))}
        </div>

        {/* ══ SECTION 5: 心智雷達 ══ */}
        <SectionHeading subtitle="Energy Radar" title="六維能量平衡雷達" id="sec-radar" />

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{ width: '100%', maxWidth: '440px' }}>
            <RadarChartComponent data={radarChartData} />
          </div>
        </div>

        {/* ══ SECTION 6: 職場天賦與理想跑道 ══ */}
        <SectionHeading subtitle="Career & Growth" title="天賦優勢與理想跑道" id="sec-career" />

        <ModernCard padding="24px">
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            ✦ 核心天賦競爭力
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0 0 20px 0' }}>
            {subType.workAdvantage || deep?.careerMastery?.workplaceSuperpower || '具備宏觀戰略思考與精準落地執行力。'}
          </p>

          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            ✦ 推薦發揮領域
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {(p.careers || ['戰略顧問', '項目主理人', '創新架構師']).map(r => (
              <span key={r} style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', padding: '6px 14px', borderRadius: '12px', fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {r}
              </span>
            ))}
          </div>

          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            ✦ 突破成長瓶頸指引
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
            {deep?.careerMastery?.growthBreakpoint || '學會適時向外授權與整合資源，不要試圖將所有責任扛在一人肩上；接納過程中的不完美是邁向卓越的必經之路。'}
          </p>
        </ModernCard>

        {/* ══ SECTION 7: 職場攻防與邊界 ══ */}
        <SectionHeading subtitle="Workplace Dynamics" title="職場攻防與邊界防禦" id="sec-warfare" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          <ModernCard mb="0" padding="22px">
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f87171', marginBottom: '8px' }}>
              ✦ 向上管理策略
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {subType.darkWorkplaceBoss || '以客觀數據與可衡量的產出為溝通基礎，保持清晰界線。'}
            </div>
          </ModernCard>
          <ModernCard mb="0" padding="22px">
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#34d399', marginBottom: '8px' }}>
              ✦ 同儕協同防禦
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {subType.darkWorkplacePeer || '就事論事、直奔主題並嚴守承諾，建立良性健康的合作機制。'}
            </div>
          </ModernCard>
        </div>

        {/* ══ SECTION 8: 愛情依附與心動信號 ══ */}
        <SectionHeading subtitle="Relationships & Love" title="愛情依附風格與心動信號" id="sec-love" />

        <ModernCard padding="24px">
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            ✦ 依附模式與親密關係偏好
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.85, margin: '0 0 18px 0' }}>
            {subType.loveAttachment || p.loveStyle || '追求真實而自由的深度連結，在獨立與依附之間尋求平衡。'}
          </p>

          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            ✦ 心動與好感信號
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(subType.crushSignals || ['主動分享日常微小細節', '在對方面前展現真實的笑容與笨拙', '給予堅定專注的陪伴']).map((sig, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--primary-light)' }}>✦</span>
                <span>{sig}</span>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* ══ SECTION 9: 命定拍檔 ══ */}
        <SectionHeading subtitle="Partnerships" title="命定拍檔深度診斷" id="sec-soulmates" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <ModernCard mb="0" padding="22px">
            <div style={{ fontSize: '0.78rem', color: 'var(--primary-light)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>黃金互補拍檔</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, padding: '3px' }}>
                <img src={goldenAvatar} alt="Golden" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{p.goldenMatch}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>{goldenProf?.name}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              認知互補，彼此能填補對方的盲區，在決策與日常生活中形成強大默契。
            </div>
          </ModernCard>

          <ModernCard mb="0" padding="22px">
            <div style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>成長磨礪拍檔</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, padding: '3px' }}>
                <img src={growthAvatar} alt="Growth" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{p.growthMatch}</div>
                <div style={{ fontSize: '0.8rem', color: '#c084fc' }}>{growthProf?.name}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              思維碰撞，挑戰彼此的固有視角，激發跨越式的自我反思與成熟。
            </div>
          </ModernCard>
        </div>

        {/* ══ SECTION 10: 伴侶真心說明書 ══ */}
        <SectionHeading subtitle="Partner Guide" title="給伴侶的真心使用說明書" id="sec-partner" />

        <ModernCard padding="24px">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(Array.isArray(subType.partnerGuide) ? subType.partnerGuide : ['請給我足夠的真誠與耐心。', '陪伴就是最好的支持。', '請和我一起探索生活的美好。']).map((rule, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <span style={{ color: 'var(--primary-light)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>0{idx + 1}.</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* ══ SECTION 11: 壓力與自律神經急救 ══ */}
        <SectionHeading subtitle="Stress & Resilience" title="壓力應激與身心調節指南" id="sec-shadow" />

        <ModernCard padding="24px">
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f87171', marginBottom: '6px' }}>
            ✦ 劣勢功能失控警訊 (The Grip Experience)
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0 0 18px 0' }}>
            {deep?.stressProtocol?.shadowGrip || '當壓力超出閾值時，可能短暫陷入極端焦慮或情緒內耗，此時需要及時按下暫停鍵。'}
          </p>

          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#34d399', marginBottom: '8px' }}>
            ✦ 身心學調節與回血 SOP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(subType.healingStep || ['給予自己獨處沉澱時間', '大自然散步放鬆', '重整思緒，回歸初心']).map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                <span style={{ color: '#34d399' }}>✓</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* ══ SECTION 12: 21天微習慣躍遷 ══ */}
        <SectionHeading subtitle="Action Plan" title="21 天微習慣自我進化實驗" id="sec-ascent" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          {(subType.twentyOneDayPlan || [
            { week: '第一週 · 覺察自我', task: '記錄日常能量起伏，找出最滋養自己的時刻。' },
            { week: '第二週 · 邊界確立', task: '深化核心技能，練習對消耗自己的事物說不。' },
            { week: '第三週 · 整合躍遷', task: '建立穩定生活節奏，擁抱自己的獨特節奏。' }
          ]).map((g, idx) => (
            <ModernCard key={idx} mb="0" padding="20px">
              <div style={{ fontSize: '0.74rem', color: 'var(--primary-light)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '4px' }}>{g.week}</div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{g.task}</div>
            </ModernCard>
          ))}
        </div>

        {/* ══ SECTION 13: 官方檔案認證與寫給自己的信 ══ */}
        <SectionHeading subtitle="Dossier" title="致自己的一封信與官方認證" id="sec-cert" />

        {subType.letterToSelf && (
          <ModernCard padding="26px 30px" bg="linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))">
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '1px', marginBottom: '12px' }}>
              ✉️ 致自己的一封信 · A Letter to Your Soul
            </div>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-primary)', lineHeight: 2, margin: 0, fontStyle: 'italic' }}>
              "{subType.letterToSelf}"
            </p>
          </ModernCard>
        )}

        {/* 認證結尾 */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontWeight: 900, color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: '4px' }}>
            64-TYPE PERSONA DYNAMICS 官方認證心靈檔案
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
            ID: #{certCode} · {currentDate} · {userName}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>
            © 2026 64-Type Persona Dynamics. All Rights Reserved.
          </div>
        </div>

        {/* 底部行動按鈕 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '36px', flexWrap: 'wrap' }}>
          <button
            onClick={() => { soundFX.playClick(); window.print(); }}
            className="btn btn-secondary btn-lg"
            style={{ minWidth: '190px' }}
          >
            🖨️ 列印 / 存為完整 PDF
          </button>
          <button
            onClick={() => { soundFX.playClick(); onGoBack ? onGoBack() : onGoHome(); }}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '190px' }}
          >
            ✓ 完成閱讀 · 返回總覽
          </button>
        </div>

      </div>
    </div>
  );
}
