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

        {/* ══ 靈魂指紋解碼 (Soul Fingerprint) ══ */}
        {dynamicData?.soulNarrative && (
          <ModernCard padding="32px 36px" mb="32px" bg="linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.06), rgba(229,154,88,0.05))" border="rgba(99,102,241,0.25)">
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '20px', height: '1px', background: 'var(--text-accent)', display: 'inline-block' }} />
              Soul Fingerprint · 靈魂指紋解碼
              <span style={{ width: '20px', height: '1px', background: 'var(--text-accent)', display: 'inline-block' }} />
            </div>

            <div className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '18px', lineHeight: 1.3 }}>
              {dynamicData.soulNarrative.intro}
            </div>

            <div style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 2.1, marginBottom: '22px' }}>
              {dynamicData.soulNarrative.lines.map((line, i) => (
                <span key={i}>
                  {i > 0 && ' '}
                  <span style={{ color: i === 0 ? 'var(--primary-light)' : i === 1 ? 'var(--secondary-light)' : i === 2 ? 'var(--gold-accent)' : i === 3 ? '#c084fc' : i === 4 ? '#34d399' : '#f472b6', fontWeight: 600 }}>
                    {line}
                  </span>
                </span>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              <div style={{ padding: '16px 18px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 800, letterSpacing: '1px', marginBottom: '6px' }}>⚡ 你最鮮明的心理能量核心</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>{dynamicData.soulNarrative.peakLabel}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>維度 {dynamicData.soulNarrative.peak.code} · {dynamicData.soulNarrative.peak.pct}%</div>
              </div>
              <div style={{ padding: '16px 18px', background: 'rgba(229,154,88,0.08)', border: '1px solid rgba(229,154,88,0.2)', borderRadius: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', fontWeight: 800, letterSpacing: '1px', marginBottom: '6px' }}>🌱 你最值得探索的成長空間</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>{dynamicData.soulNarrative.tensionLabel}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>維度 {dynamicData.soulNarrative.tension.code} · {dynamicData.soulNarrative.tension.pct}%</div>
              </div>
            </div>

            <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.04)', borderLeft: '3px solid var(--gold-accent)', borderRadius: '8px', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.85, fontStyle: 'italic' }}>
              ✦ {dynamicData.soulNarrative.closingLine}
            </div>
          </ModernCard>
        )}

        {/* ══ SECTION 1: 性格核心特質與靈魂畫像 ══ */}
        <SectionHeading subtitle="Soul Blueprint" title="靈魂畫像與性格核心特質" id="sec-soul" />

        <ModernCard padding="32px 36px" mb="24px">
          <div className="font-serif" style={{ fontSize: '1.08rem', color: 'var(--text-primary)', lineHeight: 2.1, fontStyle: 'italic', marginBottom: '22px', borderLeft: '3.5px solid var(--primary-light)', paddingLeft: '22px', background: 'rgba(255,255,255,0.02)', padding: '18px 22px', borderRadius: '0 16px 16px 0' }}>
            "{subType.soulPortrait || p.description}"
          </div>
          <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.95 }}>
            {p.description}
          </div>
        </ModernCard>

        {/* 巔峰高光時刻 vs 崩潰至暗時刻 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <ModernCard mb="0" padding="24px" border="rgba(52, 211, 153, 0.3)" bg="linear-gradient(135deg, rgba(52, 211, 153, 0.06), rgba(255,255,255,0.01))">
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--success)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✨</span><span>巔峰高光時刻 (When at Your Best)</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.85, margin: 0 }}>
              {subType.whenAtBest || '能量飽滿、目光篤定，能將混亂複雜的事物化為清晰的秩序與前行方向，激勵身邊所有人。'}
            </p>
          </ModernCard>

          <ModernCard mb="0" padding="24px" border="rgba(248, 113, 113, 0.3)" bg="linear-gradient(135deg, rgba(248, 113, 113, 0.06), rgba(255,255,255,0.01))">
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f87171', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>⚡</span><span>崩潰至暗時刻 (When at Your Worst)</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.85, margin: 0 }}>
              {subType.whenAtWorst || '長期高壓且缺乏出口時，容易進入冷酷或封閉模式，對身邊人過度嚴苛或陷入深度精神內耗。'}
            </p>
          </ModernCard>
        </div>

        {/* ══ SECTION 2: 童年心靈印記與防禦機制起源 ══ */}
        <SectionHeading subtitle="Origins & Armor" title="童年心靈印記與防禦機制的起源" id="sec-childhood" />

        <ModernCard padding="28px 32px" mb="28px" bg="linear-gradient(135deg, rgba(229, 154, 88, 0.08), rgba(255, 255, 255, 0.02))" border="rgba(229, 154, 88, 0.25)">
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--gold-accent)', letterSpacing: '1px', marginBottom: '10px' }}>
            🌱 為什麼你會長成今天的模樣？
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.95, margin: '0 0 16px 0' }}>
            {subType.childhoodEcho || '在成長過程中，你很早就學會了用特定的方式適應外部環境與長輩期待，這塑造了你今天強大但也令人心疼的防禦面具。'}
          </p>
          <div className="grounding-step-box" style={{ fontSize: '0.88rem' }}>
            💡 <strong>心理學深層洞察：</strong>你的防禦機制（無論是假性堅強、過度懂事、還是理智隔離）並非你的缺陷，而是童年那個弱小的你為了保護自己所創造的最勇敢的盔甲。然而今天身為成年人的你，已經擁有足夠的力量，可以試著偶爾卸下這身重擔。
          </div>
        </ModernCard>

        {/* ══ SECTION 3: 六維能量光譜與動態極值 ══ */}
        <SectionHeading subtitle="Spectrum & Dynamics" title="六大心智維度量化光譜與極值解析" id="sec-spectrum" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {dimensionList.map(d => {
            const diag = dynamicData?.dimDiagnoses?.[d.key];
            return (
              <ModernCard key={d.key} mb="0" padding="22px 26px">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>{d.name}</span>
                    <span style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.06)', color: d.color, border: `1px solid ${d.color}40`, padding: '2px 10px', borderRadius: '8px', fontWeight: 700 }}>{diag?.levelTitle || d.traitStrength}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    <span style={{ color: d.dominantCode === d.codeA ? d.color : 'inherit' }}>{d.labelA} {d.pctA}%</span>
                    <span style={{ opacity: 0.4, margin: '0 6px' }}>/</span>
                    <span style={{ color: d.dominantCode === d.codeB ? d.color : 'inherit' }}>{d.pctB}% {d.labelB}</span>
                  </div>
                </div>

                {/* 雙向進度條 */}
                <div style={{ height: '9px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden', display: 'flex', marginBottom: diag ? '16px' : '0' }}>
                  <div style={{ width: `${d.pctA}%`, background: d.dominantCode === d.codeA ? d.color : 'rgba(255,255,255,0.2)', transition: 'width 0.6s ease' }} />
                  <div style={{ width: `${d.pctB}%`, background: d.dominantCode === d.codeB ? d.color : 'rgba(255,255,255,0.2)', transition: 'width 0.6s ease' }} />
                </div>

                {diag && (
                  <div>
                    {diag.deepNarrative && (
                      <div className="font-serif" style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.95, margin: '0 0 14px 0', borderLeft: `3px solid ${d.color}`, paddingLeft: '14px' }}>
                        {diag.deepNarrative.split('\n\n')[0]}
                      </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', fontSize: '0.84rem' }}>
                        <span style={{ color: d.color, fontWeight: 800 }}>🌟 天賦：</span>
                        <span style={{ color: 'var(--text-primary)' }}>{diag.superpower}</span>
                      </div>
                      <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', fontSize: '0.84rem' }}>
                        <span style={{ color: '#f87171', fontWeight: 800 }}>🪞 盲區：</span>
                        <span style={{ color: 'var(--text-primary)' }}>{diag.blindspot}</span>
                      </div>
                      <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', fontSize: '0.84rem' }}>
                        <span style={{ color: '#34d399', fontWeight: 800 }}>🧭 指引：</span>
                        <span style={{ color: 'var(--text-primary)' }}>{diag.growthAdvice}</span>
                      </div>
                    </div>
                  </div>
                )}
              </ModernCard>
            );
          })}
        </div>

        {/* 多維度動態協同分析 (Cross Synthesis) */}
        {dynamicData?.crossSynthesis && (
          <ModernCard bg="linear-gradient(135deg, rgba(229, 154, 88, 0.08), rgba(99, 102, 241, 0.06))" border="rgba(229, 154, 88, 0.3)" padding="24px 28px" mb="28px">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ fontSize: '1.08rem', fontWeight: 900, color: 'var(--gold-accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✦</span>
                <span>{dynamicData.crossSynthesis.title}</span>
              </div>
              <span style={{ fontSize: '0.78rem', background: 'rgba(229, 154, 88, 0.15)', color: 'var(--gold-accent)', padding: '4px 12px', borderRadius: '12px', fontWeight: 800 }}>
                {dynamicData.crossSynthesis.tag || '動態共振'}
              </span>
            </div>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.94rem', color: 'var(--text-primary)', lineHeight: 1.85 }}>
              {dynamicData.crossSynthesis.desc}
            </p>
            {dynamicData.extremeInsights && (
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                🔍 <strong>個人極值與調和警報：</strong>{dynamicData.extremeInsights}
              </div>
            )}
          </ModernCard>
        )}

        {/* ══ SECTION 4: 榮格認知功能棧 ══ */}
        <SectionHeading subtitle="Cognitive Architecture" title="榮格 4 階認知功能運算架構" id="sec-stack" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {(Array.isArray(deep?.cognitiveStack) ? deep.cognitiveStack : []).map((item, idx) => {
            const roleLabels = ['主導功能 (英雄核心)', '輔助功能 (領航平衡)', '第三功能 (應變釋壓)', '劣勢功能 (陰影盲區)'];
            const tag = item.level || roleLabels[idx] || '認知功能';
            const info = item.info || {};
            const code = info.name || item.fn || '功能棧';
            const roleTitle = info.roleTitle || '心智功能運作';
            const desc = info.desc || item.desc || '掌管大腦核心決策與資訊處理邏輯。';
            const color = info.color || '#6366f1';

            return (
              <ModernCard key={idx} mb="0" padding="22px" border={`${color}35`}>
                <div style={{ fontSize: '0.74rem', color, fontWeight: 800, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '2px' }}>{item.fn || code}</div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color, marginBottom: '10px' }}>✦ {roleTitle}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</div>
              </ModernCard>
            );
          })}
        </div>

        {/* ══ SECTION 5: 內在深層世界與潛意識真相 ══ */}
        <SectionHeading subtitle="Inner Depths & Paradox" title="深層潛意識真相與內在渴望" id="sec-truths" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {[
            { tag: '🌌 內在繁複宇宙', desc: subType.innerWorld || '你的內心世界遠比表面所展現的更加豐富深邃，大腦同時運行著多個執行緒。' },
            { tag: '🔒 最深的隱蔽恐懼', desc: subType.deepestFear || '害怕在卸下防備的瞬間被看見脆弱，害怕付出一切後依然不被真正理解。' },
            { tag: '💌 未曾言說的渴望', desc: subType.secretDesire || '渴望有人能穿透你的堅強外殼，不需要你表現出任何功能，就只是愛著你這個人。' },
            { tag: '🎁 帶給世界的稀缺禮物', desc: subType.giftToWorld || '你在混亂中帶來的確定感與深層洞察，是這個世界最珍貴的安定力量。' }
          ].map((t, idx) => (
            <ModernCard key={idx} mb="0" padding="24px">
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '10px' }}>
                {t.tag}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                {t.desc}
              </div>
            </ModernCard>
          ))}
        </div>

        {/* ══ SECTION 6: 心智雷達 ══ */}
        <SectionHeading subtitle="Energy Radar" title="六維心智動態能量雷達" id="sec-radar" />

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{ width: '100%', maxWidth: '460px' }}>
            <RadarChartComponent data={radarChartData} />
          </div>
        </div>

        {/* ══ SECTION 7: 職場天賦與高薪破局跑道 ══ */}
        <SectionHeading subtitle="Career Mastery" title="職場天賦槓桿與高薪破局跑道" id="sec-career" />

        <ModernCard padding="28px 32px" mb="24px">
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            👑 核心天賦競爭力 (Superpower Leverage)
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.85, margin: '0 0 22px 0' }}>
            {subType.workAdvantage || deep?.careerMastery?.workplaceSuperpower || '具備宏觀戰略思考與精準落地執行力，能在高壓環境下穩定產出。'}
          </p>

          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
            🎯 推薦發揮跑道與高薪領域
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '22px' }}>
            {(p.careers || ['戰略顧問', '項目主理人', '創新架構師', '商業操盤手']).map(r => (
              <span key={r} style={{ background: 'rgba(229, 154, 88, 0.12)', border: '1px solid rgba(229, 154, 88, 0.3)', padding: '7px 16px', borderRadius: '12px', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                ✦ {r}
              </span>
            ))}
          </div>

          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '8px' }}>
            🚀 突破升遷瓶頸指引
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.85, margin: 0 }}>
            {deep?.careerMastery?.growthBreakpoint || '學會適時向外授權與整合資源，不要試圖將所有責任扛在一人肩上；接納過程中的不完美是邁向卓越的必經之路。'}
          </p>
        </ModernCard>

        {/* ══ SECTION 8: 暗黑職場實戰攻防 ══ */}
        <SectionHeading subtitle="Workplace Warfare" title="暗黑職場攻防與邊界防禦手冊" id="sec-warfare" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <ModernCard mb="0" padding="24px" border="rgba(248, 113, 113, 0.35)">
            <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#f87171', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>⚔️</span><span>向上管理對治策略 (主管篇)</span>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              {subType.darkWorkplaceBoss || '以客觀數據與可衡量的產出為溝通基礎，超前交付進度，保持清晰專業界線。'}
            </div>
          </ModernCard>

          <ModernCard mb="0" padding="24px" border="rgba(52, 211, 153, 0.35)">
            <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#34d399', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🛡️</span><span>同僚競爭與協同防禦 (同僚篇)</span>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              {subType.darkWorkplacePeer || '就事論事、直奔主題並嚴守承諾，在核心環節建立不可替代的專業壁壘。'}
            </div>
          </ModernCard>
        </div>

        {/* ══ SECTION 9: 愛情依附風格與心動信號 ══ */}
        <SectionHeading subtitle="Deep Love & Intimacy" title="親密關係深度手冊：依附風格與心動信號" id="sec-love" />

        <ModernCard padding="28px 32px" mb="24px" bg="linear-gradient(135deg, rgba(236, 72, 153, 0.06), rgba(255,255,255,0.01))" border="rgba(236, 72, 153, 0.25)">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-pink, #db2777)' }}>
              💘 潛意識依附風格與宿命模式
            </div>
            {dynamicData?.dynamicLoveDiagnosis?.attachmentStyle && (
              <span style={{ fontSize: '0.76rem', color: 'var(--accent-pink, #db2777)', background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)', padding: '3px 10px', borderRadius: '8px', fontWeight: 800 }}>
                {dynamicData.dynamicLoveDiagnosis.attachmentStyle}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-primary)', lineHeight: 1.9, margin: '0 0 16px 0', fontWeight: 600 }}>
            {dynamicData?.dynamicLoveDiagnosis?.attachmentDesc || subType.loveAttachment || p.loveStyle || '追求真實而自由的深度連結，在獨立與依附之間尋求平衡。'}
          </p>

          {/* 個人化量化心動信號 & 安全感時刻 */}
          {dynamicData?.dynamicLoveDiagnosis && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '16px 18px', background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.22)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-pink, #db2777)', fontWeight: 800, marginBottom: '6px' }}>💓 當你真正動心，你會這樣做</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.8, margin: 0 }}>
                  {dynamicData.dynamicLoveDiagnosis.customCrushSignal}
                </p>
              </div>
              <div style={{ padding: '16px 18px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.22)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--success, #059669)', fontWeight: 800, marginBottom: '6px' }}>🛡️ 讓你瞬間卸下心防的時刻</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.8, margin: 0 }}>
                  {dynamicData.dynamicLoveDiagnosis.customSafetyTrigger}
                </p>
              </div>
            </div>
          )}

          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '12px' }}>
            💓 藏不住的心動信號
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {(subType.crushSignals || ['主動分享日常微小細節', '在對方面前展現真實的笨拙與小心翼翼', '把對方納入長遠人生藍圖中']).map((sig, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px' }}>
                <span style={{ color: 'var(--gold-accent)', fontWeight: 900 }}>0{i + 1}</span>
                <span>{sig}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--success)', marginBottom: '8px' }}>
            🛡️ 讓你瞬間放下心防的安全感時刻
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.85, margin: '0 0 16px 0' }}>
            {subType.securityTrigger || '當對方看見你的疲憊與委屈，主動握住你的手說「沒事，我在」的那一刻。'}
          </p>

          {subType.heartbreakDefense && (
            <div style={{ fontSize: '0.88rem', color: 'var(--text-tertiary)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
              💔 <strong>受傷時的防禦退縮模式：</strong>{subType.heartbreakDefense}
            </div>
          )}
        </ModernCard>

        {/* ══ SECTION 10: 給伴侶的真心使用說明書 ══ */}
        <SectionHeading subtitle="Partner's Manual" title="給伴侶的真心使用說明書" id="sec-partner" />

        <ModernCard padding="28px 32px" mb="28px">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {(Array.isArray(subType.partnerGuide) ? subType.partnerGuide : ['請給我足夠的真誠與耐心。', '陪伴就是最好的支持。', '請和我一起探索生活的美好。']).map((rule, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '14px', fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.8, background: 'rgba(255,255,255,0.02)', padding: '12px 18px', borderRadius: '12px' }}>
                <span style={{ color: 'var(--primary-light)', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>0{idx + 1}.</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* ══ SECTION 11: 命定拍檔深度動力學 ══ */}
        <SectionHeading subtitle="Soul Synastry" title="命定拍檔深度動力學" id="sec-soulmates" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <ModernCard mb="0" padding="24px" border="rgba(229, 154, 88, 0.35)">
            <div style={{ fontSize: '0.8rem', color: 'var(--gold-accent)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>🌟 黃金互補拍檔 (Golden Match)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(229, 154, 88, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, padding: '4px' }}>
                <img src={goldenAvatar} alt="Golden" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{p.goldenMatch}</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--gold-accent)' }}>{goldenProf?.name}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              認知維度互補，對方能看見你盲點中的美好，在決策與日常生活中形成無聲的強大默契。
            </div>
          </ModernCard>

          <ModernCard mb="0" padding="24px" border="rgba(192, 132, 252, 0.35)">
            <div style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>⚡ 成長磨礪拍檔 (Growth Match)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(192, 132, 252, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, padding: '4px' }}>
                <img src={growthAvatar} alt="Growth" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{p.growthMatch}</div>
                <div style={{ fontSize: '0.84rem', color: '#c084fc' }}>{growthProf?.name}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              思維深層碰撞，挑戰彼此的固有偏見，激發跨越式的自我反省與心智成熟。
            </div>
          </ModernCard>
        </div>

        {/* ══ SECTION 12: 壓力應激與身心學自救 SOP ══ */}
        <SectionHeading subtitle="Stress & Somatic Healing" title="壓力應激崩潰路徑與 4 步身心學自救 SOP" id="sec-shadow" />

        <ModernCard padding="28px 32px" mb="28px">
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f87171', marginBottom: '8px' }}>
            ✦ 劣勢功能失控警訊 (The Grip Breakdown)
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.85, margin: '0 0 20px 0' }}>
            {deep?.stressProtocol?.shadowGrip || '當壓力超出心理閾值時，大腦會短暫切換至劣勢功能失控狀態，此時需要及時按下身心暫停鍵。'}
          </p>

          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--success)', marginBottom: '10px' }}>
            ✦ 身心學 4 步自救急救 SOP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(subType.healingStep || ['給予自己獨處沉澱時間', '大自然散步放鬆', '重整思緒，回歸初心']).map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-primary)', background: 'rgba(52, 211, 153, 0.05)', padding: '10px 16px', borderRadius: '10px', borderLeft: '3px solid var(--success)' }}>
                <span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* ══ SECTION 13: 21 天個人化微習慣心智躍遷計畫 ══ */}
        <SectionHeading subtitle="21-Day Quantitative Ascent" title="21 天個人化心智躍遷計畫" id="sec-ascent" />

        {dynamicData?.dynamicAscentPlan ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {[dynamicData.dynamicAscentPlan.phase1, dynamicData.dynamicAscentPlan.phase2, dynamicData.dynamicAscentPlan.phase3].map((g, idx) => (
              <ModernCard key={idx} mb="0" padding="24px" border={idx === 0 ? 'rgba(99,102,241,0.3)' : idx === 1 ? 'rgba(229,154,88,0.3)' : 'rgba(125,165,133,0.3)'}>
                <div style={{ fontSize: '0.78rem', color: idx === 0 ? 'var(--primary-light)' : idx === 1 ? 'var(--gold-accent)' : 'var(--secondary-light)', fontWeight: 800, letterSpacing: '1px', marginBottom: '6px' }}>{g.days}</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{g.title}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '12px' }}>{g.task}</div>
                {g.microAction && (
                  <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', fontSize: '0.84rem', color: 'var(--gold-accent)', lineHeight: 1.7 }}>
                    ✦ 每日微行動：{g.microAction}
                  </div>
                )}
              </ModernCard>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {(subType.twentyOneDayPlan || [
              { week: '第一週 · 覺察自我', task: '記錄日常能量起伏，找出最滋養自己的時刻。' },
              { week: '第二週 · 邊界確立', task: '深化核心技能，練習對消耗自己的事物說不。' },
              { week: '第三週 · 整合躍遷', task: '建立穩定生活節奏，擁抱自己的獨特節奏。' }
            ]).map((g, idx) => (
              <ModernCard key={idx} mb="0" padding="22px">
                <div style={{ fontSize: '0.82rem', color: 'var(--gold-accent)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '6px' }}>{g.week}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.8 }}>{g.task}</div>
              </ModernCard>
            ))}
          </div>
        )}

        {/* ══ SECTION 14: 致內在小孩的一封深層靈魂手札 ══ */}
        <SectionHeading subtitle="A Letter to Your Soul" title="致內在小孩的一封深層靈魂手札" id="sec-cert" />

        {subType.letterToSelf && (
          <ModernCard padding="32px 36px" mb="28px" bg="linear-gradient(135deg, rgba(229, 154, 88, 0.09), rgba(125, 165, 133, 0.09))" border="rgba(229, 154, 88, 0.35)">
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--gold-accent)', letterSpacing: '1.5px', marginBottom: '14px' }}>
              ✉️ 致內在小孩的一封信 · A Letter to Your Inner Child
            </div>
            <p className="font-serif" style={{ fontSize: '1.02rem', color: 'var(--text-primary)', lineHeight: 2.1, margin: 0, fontStyle: 'italic' }}>
              "{subType.letterToSelf}"
            </p>
          </ModernCard>
        )}

        {/* 認證結尾 */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '22px', padding: '28px', textAlign: 'center', marginBottom: '28px' }}>
          <div className="font-serif" style={{ fontWeight: 900, color: 'var(--text-primary)', fontSize: '1.15rem', marginBottom: '6px' }}>
            ✦ 64-TYPE PERSONA DYNAMICS 官方認證心靈檔案 ✦
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
            IDENTIFIER: #{certCode} · DATE: {currentDate} · SUBJECT: {userName}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
            © 2026 64-Type Persona Dynamics · 本檔案由六維動態光譜心智引擎合成，專屬個體化自我探索與心靈導航。
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
