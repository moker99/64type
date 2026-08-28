import React, { useState } from 'react';
import { soundFX } from '../utils/audio';

const FEATURED_ARCHETYPES = [
  {
    code: 'INFJ-AC',
    name: '霧氣深處的靜默守望者',
    group: '心靈共鳴矩陣',
    groupColor: '#7da585',
    rarity: '1.4%',
    motto: '你總是能聽懂所有人的欲言又止，卻很少有人真正看見你卸下面具後的疲憊。',
    tags: ['深層共感', '靈魂邊界', '高敏雷達'],
    avatar: './avatars/infp.svg',
    energyDesc: '內向沉澱 84% · 情感共鳴 89% · 審慎協同'
  },
  {
    code: 'ENTP-RD',
    name: '秩序邊緣的靈魂破局者',
    group: '自由探索矩陣',
    groupColor: '#e59a58',
    rarity: '3.2%',
    motto: '討厭一眼望到頭的平庸，用漫不經心的幽默包裝著極致深邃的清醒與反叛。',
    tags: ['思維破局', '敏銳洞察', '概念重構'],
    avatar: './avatars/entp.svg',
    energyDesc: '外向探索 76% · 理智決策 82% · 審慎敏銳'
  },
  {
    code: 'ISFP-AL',
    name: '暮色中的情緒調香師',
    group: '感知實踐矩陣',
    groupColor: '#c98a3c',
    rarity: '4.1%',
    motto: '世界太吵了，你只想在自己的安全小宇宙裡，把瑣碎日子過成一首低保真的詩。',
    tags: ['美感直覺', '安靜自洽', '細膩感知'],
    avatar: './avatars/isfp.svg',
    energyDesc: '內向沉澱 80% · 靈活自發 86% · 篤定從容'
  },
  {
    code: 'ENTJ-AD',
    name: '熾陽星際統帥',
    group: '戰略統御矩陣',
    groupColor: '#b26b3e',
    rarity: '2.4%',
    motto: '習慣成為所有人的定海神針，但偶爾，你也渴望能做那個可以隨意脆弱的人。',
    tags: ['遠見佈局', '戰略決斷', '逆境破局'],
    avatar: './avatars/entj.svg',
    energyDesc: '外向行動 78% · 理智決策 84% · 篤定開拓'
  }
];

export function HeroView({ onStartQuiz }) {
  const [activeArchetypeIndex, setActiveArchetypeIndex] = useState(0);
  const activeArchetype = FEATURED_ARCHETYPES[activeArchetypeIndex];

  // 3 秒心智微實驗互動 State
  const [sparkEnergy, setSparkEnergy] = useState(65); // 0 (I) -> 100 (E)
  const [sparkDecision, setSparkDecision] = useState(70); // 0 (F) -> 100 (T)

  const sparkProfile = (() => {
    const isE = sparkEnergy >= 50;
    const isT = sparkDecision >= 50;
    if (isE && isT) return { label: '開拓推進者 (Ex-Thinking)', trait: '擅長整合資源與明快決策，以目標達成與問題解決為核心驅動力。' };
    if (isE && !isT) return { label: '熱忱共鳴者 (Ex-Feeling)', trait: '擅長營造人際和諧與激發群體共鳴，以情感連結與價值同理為核心電力。' };
    if (!isE && isT) return { label: '深度架構師 (In-Thinking)', trait: '善於獨立鑽研底層邏輯與深層規律，追求知識體系的極致嚴謹與客觀自洽。' };
    return { label: '靈魂觀察者 (In-Feeling)', trait: '擁有豐富細膩的內在精神世界，注重忠於自我價值與深層靈魂連結。' };
  })();

  return (
    <div className="hero-landing-page" style={{ maxWidth: '1120px', margin: '0 auto', padding: '16px 16px 80px' }}>
      
      {/* ══ HERO 首屏：雙欄沉浸式大氣排版 (Split Hero Showcase) ══ */}
      <section style={{ padding: '28px 0 56px', borderBottom: '1px solid var(--border-glass)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '44px', alignItems: 'center' }}>
          
          {/* 左欄：價值主張與行動召喚 */}
          <div>
            {/* 社交信任標籤 */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(229, 154, 88, 0.08)', border: '1px solid rgba(229, 154, 88, 0.25)', borderRadius: '20px', fontSize: '0.82rem', marginBottom: '22px' }}>
              <div style={{ display: 'flex', gap: '2px', color: 'var(--gold-accent)' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>4.98 / 5.0</span>
              <span style={{ color: 'var(--text-tertiary)' }}>· 超過 280,000+ 亞洲用戶深度共鳴</span>
            </div>

            <h1 className="font-serif" style={{ fontSize: 'clamp(2.3rem, 4.6vw, 3.5rem)', fontWeight: 900, lineHeight: 1.22, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '0 0 18px 0' }}>
              在喧囂的世界裡，<br />
              <span style={{ background: 'var(--grad-aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                辨認你的心靈原色
              </span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0 0 30px 0', maxWidth: '520px' }}>
              超越傳統 16 型的四倍深層解析。不只是一串冰冷字母，而是一份寫給疲憊心靈的自救白皮書——60 題情境測驗，洞悉你的社交電量、隱形內耗防禦與命定心靈拍檔。
            </p>

            {/* CTA 按鈕組 */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '28px' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  soundFX.playClick();
                  onStartQuiz();
                }}
                style={{
                  padding: '16px 36px',
                  fontSize: '1.02rem',
                  fontWeight: 800,
                  boxShadow: 'var(--shadow-md)',
                  minWidth: '240px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <span>✦ 開始探索心靈原色 (約 5~7 分鐘)</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>

            {/* 信任指標 */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.84rem', color: 'var(--text-tertiary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                60 題亞洲生活情境題庫
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                即時量化社交電量與內耗指標
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                免註冊立即生成專屬海報
              </div>
            </div>
          </div>

          {/* 右欄：動態人格原型立體卡片展台 (Interactive Showcase) */}
          <div>
            {/* 切換標籤 */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none' }}>
              {FEATURED_ARCHETYPES.map((arch, i) => (
                <button
                  key={arch.code}
                  onClick={() => {
                    soundFX.playTab();
                    setActiveArchetypeIndex(i);
                  }}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    border: activeArchetypeIndex === i ? '1px solid var(--primary-light)' : '1px solid var(--border-glass)',
                    background: activeArchetypeIndex === i ? 'rgba(229, 154, 88, 0.15)' : 'var(--bg-card)',
                    color: activeArchetypeIndex === i ? 'var(--text-accent)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {arch.code.split('-')[0]} ｜ {arch.name.slice(0, 4)}
                </button>
              ))}
            </div>

            {/* 主展示卡片 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass)',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ background: `${activeArchetype.groupColor}22`, border: `1px solid ${activeArchetype.groupColor}44`, color: activeArchetype.groupColor, padding: '3px 10px', borderRadius: '10px', fontSize: '0.74rem', fontWeight: 800 }}>
                      {activeArchetype.group}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>
                      亞洲罕見度 {activeArchetype.rarity}
                    </span>
                  </div>
                  <h3 className="font-mono" style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                    {activeArchetype.code}
                  </h3>
                  <div className="font-serif" style={{ fontSize: '1.12rem', fontWeight: 800, color: activeArchetype.groupColor }}>
                    ✦ {activeArchetype.name}
                  </div>
                </div>

                <div style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${activeArchetype.groupColor}22, rgba(255,255,255,0.02))`,
                  border: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  flexShrink: 0
                }}>
                  <img
                    src={activeArchetype.avatar}
                    alt={activeArchetype.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              <div className="editorial-quote-box" style={{ margin: '14px 0 18px 0', fontSize: '0.94rem' }}>
                "{activeArchetype.motto}"
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {activeArchetype.tags.map(t => (
                  <span key={t} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', padding: '4px 12px', borderRadius: '10px', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onStartQuiz();
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', padding: '12px', fontSize: '0.88rem', fontWeight: 700 }}
              >
                <span>測測看我是否屬於這個心靈原型 ➔</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ══ 模組 1：3秒心智快閃微實驗 (Interactive 3-Second Quick Spark) ══ */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid var(--border-glass)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Interactive Spark
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            3 秒感受你的心智能量偏好
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            試著滑動下方滑塊，即時體驗能量獲取與決策邏輯如何塑造你的思維模式
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
          
          {/* 左側互動滑塊 */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 滑塊 1：能量來源 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
                <span>內向獨處充電 (I)</span>
                <span style={{ color: 'var(--primary-light)' }}>{sparkEnergy}% 外向</span>
                <span>外向社交充電 (E)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sparkEnergy}
                onChange={(e) => setSparkEnergy(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
              />
            </div>

            {/* 滑塊 2：決策邏輯 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
                <span>人際價值共情 (F)</span>
                <span style={{ color: 'var(--secondary)' }}>{sparkDecision}% 理智</span>
                <span>客觀邏輯因果 (T)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sparkDecision}
                onChange={(e) => setSparkDecision(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--secondary)' }}
              />
            </div>

          </div>

          {/* 右側即時動態生成卡片 */}
          <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.05))', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--primary-light)', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                ✦ 即時偏好合成
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '10px' }}>
                {sparkProfile.label}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
                {sparkProfile.trait}
              </p>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => {
                  soundFX.playClick();
                  onStartQuiz();
                }}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', padding: '10px', fontSize: '0.86rem' }}
              >
                <span>進行完整 60 題精準分析 ➔</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ══ 模組 2：你在報告中將看見什麼 (What You Will Unlock) ══ */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Comprehensive Value
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            全景深度解析報告包含什麼？
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            不只是一串字母，而是一份助你打破盲區、發揮天賦的個體化自我成長藍圖
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          {[
            {
              svgIcon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20v-6M6 20V10M18 20V4" />
                </svg>
              ),
              title: '六維動態雷達',
              desc: '精確量化 6 大雙極心理維度平衡，直觀看見你的能量優勢與潛在盲點。'
            },
            {
              svgIcon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              ),
              title: '榮格 4 階認知功能棧',
              desc: '解碼大腦的主導、輔助、第三與劣勢功能，洞悉底層決策與資訊處理邏輯。'
            },
            {
              svgIcon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              ),
              title: '職場天賦與理想跑道',
              desc: '精選黃金職業推薦、身價突破點與向上管理策略，助你在職場破局躍遷。'
            },
            {
              svgIcon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              ),
              title: '命定拍檔與伴侶說明書',
              desc: '深度診斷黃金互補與成長磨礪拍檔，提供相處加分與避雷非暴力溝通指南。'
            }
          ].map((card, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '24px', transition: 'transform 0.2s ease' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                {card.svgIcon}
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{card.title}</div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 模組 3：四大人格矩陣家族 (4 Archetype Families) ══ */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Four Archetype Matrices
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            64 型人格四大家族矩陣
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            點擊任一家族即可快速開啟對應測驗
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          {[
            { name: '戰略統御矩陣', code: 'NT 系列 (16型)', color: '#88619a', avatar: './avatars/strategist.svg', desc: '宏觀遠見、意志堅定，善於破解複雜難題與引領變革的統帥原型。' },
            { name: '心靈共鳴矩陣', code: 'NF 系列 (16型)', color: '#33a474', avatar: './avatars/empath.svg', desc: '深層同理、熱愛理想與和諧，以純淨情感啟迪人心的靈魂導師。' },
            { name: '秩序精算矩陣', code: 'SJ 系列 (16型)', color: '#4298b4', avatar: './avatars/sentinel.svg', desc: '嚴謹務實、構建系統，守護穩定秩序與落實執行的高效柱石。' },
            { name: '自由探索矩陣', code: 'SP 系列 (16型)', color: '#e4ae3a', avatar: './avatars/explorer.svg', desc: '敏捷隨性、熱愛實踐與冒險，勇於挑戰未知並享受當下的先驅者。' }
          ].map((m) => (
            <div
              key={m.name}
              onClick={() => {
                soundFX.playClick();
                onStartQuiz();
              }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glass)',
                borderRadius: '20px',
                padding: '24px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: `${m.color}22`, border: `1.5px solid ${m.color}55`, margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px' }}>
                <img src={m.avatar} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '2px' }}>{m.name}</div>
              <div style={{ fontSize: '0.78rem', color: m.color, fontWeight: 700, marginBottom: '10px' }}>{m.code}</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 模組 4：人們怎麼說 (PersonalityHub 風格無縫無限輪播) ══ */}
      <section style={{ padding: '56px 0', borderBottom: '1px solid var(--border-glass)' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
            人們怎麼說
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0 }}>
            來自我們社區的真實故事
          </p>
        </div>

        {/* 無縫水平無限跑馬燈輪播軌道 */}
        <div className="testimonials-carousel-wrapper">
          <div className="testimonials-marquee-track">
            {[
              {
                stars: 5,
                quote: "它比我自己還能把人際關係與內在情緒解釋得更清楚。真的超強！",
                name: "James L.",
                role: "專案經理 · ENTJ-AC",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 4,
                quote: "幫我釐清了職涯方向，也知道什麼才能真正激勵我，擺脫了迷茫期。",
                name: "Megan S.",
                role: "職涯教練 · ENFJ-RD",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "這個測驗讓我終於明白為什麼自己會有那些反應。超級有啟發性！",
                name: "Emily R.",
                role: "產品設計師 · INFP-AL",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "看到自己 88% 的精神內耗指數和懂事面具被精確點出來時，眼眶真的泛淚了。這是一份溫柔的自救指南。",
                name: "Marcus Tseng",
                role: "獨立創作者 · INFJ-AC",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "過去測傳統 16 型總覺得差了臨門一腳，64 型加入心態韌性與行動驅力後，四倍解析度精準到起雞皮疙瘩！",
                name: "Eva Lin",
                role: "科技業產品總監 · INTJ-AD",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "60 題的情境節奏非常舒適，雷達圖很直觀，特別是靈魂拍檔解析，為我和伴侶的溝通帶來了極大的啟發！",
                name: "Dr. Sophia Chen",
                role: "心理諮商督導 · ENFP-RC",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "八維認知運算棧的分析太硬核了，把大腦底層邏輯拆解得清清楚楚，完全打中理性型用戶的胃口！",
                name: "Kevin Huang",
                role: "資深架構師 · INTP-AD",
                avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80"
              }
            ].concat([
              {
                stars: 5,
                quote: "它比我自己還能把人際關係與內在情緒解釋得更清楚。真的超強！",
                name: "James L.",
                role: "專案經理 · ENTJ-AC",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 4,
                quote: "幫我釐清了職涯方向，也知道什麼才能真正激勵我，擺脫了迷茫期。",
                name: "Megan S.",
                role: "職涯教練 · ENFJ-RD",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "這個測驗讓我終於明白為什麼自己會有那些反應。超級有啟發性！",
                name: "Emily R.",
                role: "產品設計師 · INFP-AL",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "看到自己 88% 的精神內耗指數和懂事面具被精確點出來時，眼眶真的泛淚了。這是一份溫柔的自救指南。",
                name: "Marcus Tseng",
                role: "獨立創作者 · INFJ-AC",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "過去測傳統 16 型總覺得差了臨門一腳，64 型加入心態韌性與行動驅力後，四倍解析度精準到起雞皮疙瘩！",
                name: "Eva Lin",
                role: "科技業產品總監 · INTJ-AD",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "60 題的情境節奏非常舒適，雷達圖很直觀，特別是靈魂拍檔解析，為我和伴侶的溝通帶來了極大的啟發！",
                name: "Dr. Sophia Chen",
                role: "心理諮商督導 · ENFP-RC",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
              },
              {
                stars: 5,
                quote: "八維認知運算棧的分析太硬核了，把大腦底層邏輯拆解得清清楚楚，完全打中理性型用戶的胃口！",
                name: "Kevin Huang",
                role: "資深架構師 · INTP-AD",
                avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80"
              }
            ]).map((t, idx) => (
              <div key={idx} className="testimonial-hub-card">
                <div>
                  <div className="testimonial-stars-row">
                    {[...Array(t.stars)].map((_, i) => (
                      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <p className="testimonial-hub-quote">
                    {t.quote}
                  </p>
                </div>

                <div className="testimonial-author-row">
                  <div className="testimonial-avatar-frame">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="testimonial-avatar-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = './avatars/entj.svg';
                      }}
                    />
                  </div>
                  <div>
                    <div className="testimonial-author-name">{t.name}</div>
                    <div className="testimonial-author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 模組 5：常見問題 FAQ ══ */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
            FAQ
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            常見問題解答
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            {
              q: '64 型人格測驗與傳統 16 型人格有何不同？',
              a: '傳統 16 型僅涵蓋 4 個基礎維度。64 型額外引入了衡量抗壓定力的「心態韌性（篤定 vs 審慎）」與衡量目標推進力的「行動驅力（開拓 vs 協同）」，從而將人格解析維度擴展為 64 種立體原型，大幅減少二元標籤化誤差。'
            },
            {
              q: '完成測驗需要多久時間？',
              a: '本測驗共 60 題精選情境題，平均作答時間為 6 ~ 8 分鐘。建議在安靜放鬆的環境下憑直覺作答。'
            },
            {
              q: '測驗結果會被保存嗎？可以重複測驗嗎？',
              a: '系統會自動將您的測驗歷史記錄安全保存在瀏覽器本地，您可以隨時在右上角「歷史紀錄」中查看，也可以隨時重新測驗。'
            },
            {
              q: '如何將測驗結果分享給朋友？',
              a: '在結果頁面可一鍵生成 1080×1620 高畫質社群分享圖卡，支援下載 PNG 或複製至剪貼簿直接發布至社群平台！'
            }
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '18px', padding: '20px' }}>
              <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {item.q}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 模組 6：頁尾強效行動召喚 (Bottom Conversion Banner) ══ */}
      <section style={{ padding: '60px 0 20px', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.08))',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '28px',
          padding: '48px 24px',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '820px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 14px 0', letterSpacing: '-0.02em' }}>
            準備好探索真正的自己了嗎？
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 28px auto' }}>
            只需 6 分鐘，解鎖你的 64 型心智動力學全景檔案，看見未曾發現的天賦光芒與人生解答。
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              soundFX.playClick();
              onStartQuiz();
            }}
            style={{
              padding: '16px 40px',
              fontSize: '1.08rem',
              fontWeight: 900,
              boxShadow: '0 12px 35px rgba(99,102,241,0.45)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <span>立即開始 60 題深度測驗</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </section>

    </div>
  );
}
