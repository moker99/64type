import React, { useMemo } from 'react';
import { RadarChartComponent } from './RadarChart';
import { getPersonalityProfile } from '../data/personalityData';
import { getDeepPersonalityDetails } from '../data/deepReportData';
import { generateDynamicPersonalizedAnalysis } from '../data/dynamicSpectrumEngine';
import { DIMENSIONS } from '../data/questions';
import { soundFX } from '../utils/audio';

function SectionDivider({ ch, en, title, id }) {
  return (
    <div id={id} style={{ scrollMarginTop: '80px', paddingTop: '28px', marginBottom: '18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '6px' }}>
        <div>
          <div style={{ color: 'var(--primary-light)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2px' }}>
            {ch} · {en}
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0, color: '#fff' }}>
            {title}
          </h3>
        </div>
        <span style={{ fontSize: '0.72rem', color: 'var(--gold-accent)', fontFamily: 'var(--font-mono)', fontWeight: 800, background: 'rgba(251,191,36,0.1)', padding: '2px 10px', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.2)' }}>
          {ch}
        </span>
      </div>
    </div>
  );
}

function GlassCard({ children, accent = 'rgba(255,255,255,0.03)', mb = '14px', border }) {
  return (
    <div style={{ background: accent, border: `1px solid ${border || 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', padding: '16px 20px', marginBottom: mb }}>
      {children}
    </div>
  );
}

function SectionLabel({ emoji, label, color = 'var(--gold-accent)' }) {
  return (
    <div style={{ fontWeight: 800, color, marginBottom: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span>{emoji}</span><span>{label}</span>
    </div>
  );
}

export function WhitepaperModal({
  isOpen,
  onClose,
  result,
  userName = '探索者',
  isVipUnlocked = false,
  adminMode = false,
  onOpenPaywall
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

  if (!isOpen || !result) return null;

  const certId = result.code.split('').reduce((acc, c) => acc + c.charCodeAt(0), 100);
  const certCode = `64T-2026-${String(certId * 47).padStart(5,'0')}`;
  const currentDate = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
  const canView = true;

  const rarityPct = (() => {
    const h = result.code.split('').reduce((a, c) => a + c.charCodeAt(0), 10);
    return (1.2 + (h % 25) / 10).toFixed(1);
  })();

  if (!canView) {
    return (
      <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div className="glass-panel" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass-hover)', borderRadius: '20px', padding: '36px 28px', textAlign: 'center', maxWidth: '480px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔒</div>
          <h2 style={{ color: 'var(--gold-accent)', margin: '0 0 12px 0', fontSize: '1.4rem', fontWeight: 900 }}>解鎖全景深度報告</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.75, fontSize: '0.88rem' }}>
            本報告包含 <strong style={{ color: '#fff' }}>全景深度心理與愛情分析</strong>，涵蓋認知功能棧、職場破局、愛情依附風格、心動信號、給伴侶的真心說明書與 21 天躍遷指南。
          </p>
          <button onClick={() => { if (onOpenPaywall) onOpenPaywall(); else onClose(); }} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '12px 24px', width: '100%', marginBottom: '10px' }}>
            🚀 立即解鎖 · 全景深度報告
          </button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '0.8rem', cursor: 'pointer' }}>稍後再說</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="modal-backdrop"
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={(e) => { if (e.target === e.currentTarget) { soundFX.playClick(); onClose(); } }}
    >
      <div
        style={{ width: '100%', maxWidth: '960px', height: '90vh', maxHeight: '920px', background: 'var(--bg-card)', borderRadius: '22px', border: '1px solid var(--border-glass-hover)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {adminMode && (
          <div style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))', color: '#fff', padding: '6px 20px', fontSize: '0.74rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span>🛡️ ADMIN FULL ACCESS PASS</span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span style={{ opacity: 0.9, fontWeight: 400 }}>管理員預覽模式（全景長文報告全量開放）</span>
          </div>
        )}

        {/* 頂部 Header */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>✦</span>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#fff' }}>{userName} · 全景深度解析報告</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--gold-accent)', fontFamily: 'var(--font-mono)' }}>#{certCode} · Full Comprehensive Dossier</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => { soundFX.playClick(); window.print(); }} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>🖨️ PDF</button>
            <button onClick={() => { soundFX.playClick(); onClose(); }} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '18px', cursor: 'pointer', padding: '4px' }}>✕</button>
          </div>
        </div>

        {/* 一頁式流暢內容滾動區 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', lineHeight: 1.85 }}>
          
          {/* 封面 */}
          <div id="m-sec-cover" style={{ textAlign: 'center', paddingBottom: '24px' }}>
            <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '16px', background: 'rgba(251,191,36,0.1)', color: 'var(--gold-accent)', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '2px', marginBottom: '14px' }}>
              ✦ CONFIDENTIAL MASTER EXECUTIVE REPORT ✦
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: '0 0 6px 0' }}>
              {result.code} · {p.name}
            </h2>
            <div style={{ fontSize: '0.88rem', color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '20px' }}>
              {p.group} · 全球罕見度 {rarityPct}%
            </div>
            <div style={{ width: '100px', height: '100px', margin: '0 auto 20px auto', borderRadius: '50%', background: `linear-gradient(135deg, ${p.groupColor || '#6366f1'}33, transparent)`, border: '2px solid rgba(251,191,36,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
              <img src={avatarSrc} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>

          {/* 01 靈魂畫像 */}
          <SectionDivider ch="CH 01" en="SOUL PORTRAIT" title="靈魂畫像與核心天賦" id="m-sec-soul" />
          <GlassCard>
            <SectionLabel emoji="🌟" label="靈魂本質" />
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
              {subType.soulPortrait || p.tagline || p.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(p.superpowers || p.tags)?.map(t => (
                <span key={t} style={{ background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.76rem', color: '#fff' }}>#{t}</span>
              ))}
            </div>
          </GlassCard>

          {/* 02 六維光譜 */}
          <SectionDivider ch="CH 02" en="6D SPECTRUM" title="六大維度量化光譜" id="m-sec-spectrum" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
            {dimensionList.map(d => (
              <div key={d.key} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ color: '#fff', fontWeight: 800 }}>{d.name}</span>
                  <span style={{ color: d.color, fontFamily: 'var(--font-mono)' }}>{d.labelA} {d.pctA}% vs {d.pctB}% {d.labelB}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: `${d.pctA}%`, background: d.color }} />
                  <div style={{ width: `${d.pctB}%`, background: 'rgba(255,255,255,0.12)' }} />
                </div>
              </div>
            ))}
          </div>

          {/* 03 認知功能棧 */}
          <SectionDivider ch="CH 03" en="COGNITIVE STACK" title="榮格 4 階認知功能棧" id="m-sec-stack" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '18px' }}>
            {(Array.isArray(deep?.cognitiveStack) ? deep.cognitiveStack : []).map((item, idx) => {
              const roleLabels = ['主導功能 (Dominant)', '輔助功能 (Auxiliary)', '第三功能 (Tertiary)', '劣勢功能 (Inferior)'];
              const tag = item.role || roleLabels[idx] || '認知功能';
              const info = item.info || {};
              const code = info.name || item.fn || '功能棧';
              const desc = info.desc || '掌管大腦核心決策與資訊處理邏輯。';
              const color = info.color || '#6366f1';

              return (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${color}35`, borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '0.68rem', color, fontWeight: 800 }}>{tag}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', margin: '3px 0' }}>{code}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{desc}</div>
                </div>
              );
            })}
          </div>

          {/* 04 內心真相 */}
          <SectionDivider ch="CH 04" en="HIDDEN TRUTHS" title="內心深處的 4 大隱藏真相" id="m-sec-truths" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginBottom: '18px' }}>
            {[
              { title: '內在深層世界', desc: subType.innerWorld || '你的內心世界豐富而細膩，既有對未來的無限憧憬，也有對當下的沉靜思考。' },
              { title: '最深層的隱蔽恐懼', desc: subType.deepestFear || '害怕失去前行的方向，害怕在妥協中磨滅了最初的夢想。' },
              { title: '未說出口的渴望', desc: subType.secretDesire || '渴望被深刻理解與全然接納，渴望有一處能讓自己完全卸下防備的避風港。' },
              { title: '你帶給世界的禮物', desc: subType.giftToWorld || '你帶給身邊人的是堅定前行的勇氣與獨一無二的洞察力。' }
            ].map((t, idx) => (
              <GlassCard key={idx} mb="0">
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '6px' }}>{t.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{t.desc}</div>
              </GlassCard>
            ))}
          </div>

          {/* 05 心智雷達 */}
          <SectionDivider ch="CH 05" en="RADAR" title="六維能量雷達" id="m-sec-radar" />
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ width: '100%', maxWidth: '380px' }}>
              <RadarChartComponent data={radarChartData} />
            </div>
          </div>

          {/* 06 職場破局 */}
          <SectionDivider ch="CH 06" en="CAREER" title="職場破局與黃金跑道" id="m-sec-career" />
          <GlassCard>
            <SectionLabel emoji="🎯" label="天賦優勢" />
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
              {subType.workAdvantage || deep?.careerMastery?.workplaceSuperpower || '具備宏觀戰略思考與精準落地執行力。'}
            </p>
            <SectionLabel emoji="🚀" label="黃金職業" color="var(--primary-light)" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(p.careers || ['戰略顧問', '項目主理人', '創新架構師']).map(r => (
                <span key={r} style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', padding: '4px 10px', borderRadius: '10px', fontSize: '0.78rem', color: '#fff' }}>{r}</span>
              ))}
            </div>
          </GlassCard>

          {/* 07 職場攻防 */}
          <SectionDivider ch="CH 07" en="WARFARE" title="職場攻防與邊界管理" id="m-sec-warfare" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginBottom: '18px' }}>
            <GlassCard accent="rgba(239,68,68,0.04)" mb="0">
              <SectionLabel emoji="⚠️" label="向上管理與主管對治" color="#f87171" />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {subType.darkWorkplaceBoss || '以客觀數據與可衡量的產出為溝通基礎，保持清晰界線。'}
              </div>
            </GlassCard>
            <GlassCard accent="rgba(16,185,129,0.04)" mb="0">
              <SectionLabel emoji="🛡️" label="同儕協同防禦策略" color="#34d399" />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {subType.darkWorkplacePeer || '就事論事、直奔主題並嚴守承諾，建立良性健康的合作機制。'}
              </div>
            </GlassCard>
          </div>

          {/* 08 愛情依附 */}
          <SectionDivider ch="CH 08" en="LOVE" title="愛情依附風格與心動信號" id="m-sec-love" />
          <GlassCard>
            <SectionLabel emoji="💖" label="依附模式" />
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
              {subType.loveAttachment || p.loveStyle || '追求真實而自由的深度連結，在獨立與依附之間尋求平衡。'}
            </p>
            <SectionLabel emoji="✨" label="心動信號" color="#ec4899" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(subType.crushSignals || ['主動分享日常微小細節', '在對方面前展現真實的笑容與笨拙']).map((sig, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: '#ec4899' }}>✦</span>
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* 09 命定拍檔 */}
          <SectionDivider ch="CH 09" en="SOULMATES" title="命定拍檔深度診斷" id="m-sec-soulmates" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '18px' }}>
            <GlassCard accent="rgba(251,191,36,0.05)" mb="0">
              <SectionLabel emoji="👑" label="黃金互補拍檔" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(251,191,36,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '3px' }}>
                  <img src={goldenAvatar} alt="Golden" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div><div style={{ fontWeight: 900, color: '#fff', fontSize: '0.9rem' }}>{p.goldenMatch}</div><div style={{ fontSize: '0.76rem', color: 'var(--gold-accent)' }}>{goldenProf?.name}</div></div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>認知互補，填補思維盲區。</div>
            </GlassCard>
            <GlassCard accent="rgba(168,85,247,0.05)" mb="0">
              <SectionLabel emoji="🌱" label="成長磨礪拍檔" color="#c084fc" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '3px' }}>
                  <img src={growthAvatar} alt="Growth" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div><div style={{ fontWeight: 900, color: '#fff', fontSize: '0.9rem' }}>{p.growthMatch}</div><div style={{ fontSize: '0.76rem', color: '#c084fc' }}>{growthProf?.name}</div></div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>思維碰撞，激發成長進化。</div>
            </GlassCard>
          </div>

          {/* 10 伴侶說明書 */}
          <SectionDivider ch="CH 10" en="PARTNER" title="給伴侶的真心使用說明書" id="m-sec-partner" />
          <GlassCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(Array.isArray(subType.partnerGuide) ? subType.partnerGuide : ['請給我足夠的真誠與耐心。', '陪伴就是最好的支持。']).map((rule, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--gold-accent)', fontWeight: 800 }}>0{idx + 1}.</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* 11 陰影急救 */}
          <SectionDivider ch="CH 11" en="SHADOW" title="壓力應激與陰影失控急救" id="m-sec-shadow" />
          <GlassCard accent="rgba(239,68,68,0.04)">
            <SectionLabel emoji="🚨" label="劣勢功能失控" color="#f87171" />
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
              {deep?.stressProtocol?.shadowGrip || '當壓力超出閾值時，可能短暫陷入極端焦慮，請及時按下暫停鍵。'}
            </p>
            <SectionLabel emoji="🌿" label="身心學自律神經急救" color="#34d399" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {(subType.healingStep || ['給予自己獨處沉澱時間', '大自然散步放鬆', '重整思緒，回歸初心']).map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#fff' }}>
                  <span style={{ color: '#34d399' }}>✓</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* 12 躍遷指南 */}
          <SectionDivider ch="CH 12" en="ASCENT" title="21 天心智躍遷微習慣" id="m-sec-ascent" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginBottom: '18px' }}>
            {(subType.twentyOneDayPlan || [
              { week: '第一週 · 覺察自我', task: '記錄日常能量起伏，找出最滋養自己的時刻。' },
              { week: '第二週 · 邊界確立', task: '深化核心技能，練習對消耗自己的事物說不。' },
              { week: '第三週 · 整合躍遷', task: '建立穩定生活節奏，擁抱自己的獨特節奏。' }
            ]).map((g, idx) => (
              <GlassCard key={idx} mb="0">
                <div style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontWeight: 800 }}>{g.week}</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', margin: '2px 0 4px 0' }}>{g.task}</div>
              </GlassCard>
            ))}
          </div>

          {/* 13 官方認證 */}
          <SectionDivider ch="CH 13" en="CERT" title="官方檔案認證" id="m-sec-cert" />
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '16px', padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontWeight: 900, color: '#fff', fontSize: '1rem', marginBottom: '4px' }}>PERSONA 64 官方認證心靈檔案</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gold-accent)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>#{certCode} · {currentDate}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>© 2026 PERSONA 64 Mind Dynamics Lab.</div>
          </div>

        </div>

      </div>
    </div>
  );
}
