import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { HeroView } from './components/HeroView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { ShareModal } from './components/ShareModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { LegalModal } from './components/LegalModal';
import { LegalPageView } from './components/LegalPageView';
import { OrderCheckoutView } from './components/OrderCheckoutView';
import { WhitepaperPageView } from './components/WhitepaperPageView';
import { CodexModal } from './components/CodexModal';
import { Toast } from './components/Toast';

import { PersonalityEngine } from './utils/engine';
import { soundFX } from './utils/audio';
import { getPersonalityProfile } from './data/personalityData';

export function App() {
  const [currentView, setCurrentView] = useState('hero'); // 'hero' | 'quiz' | 'checkout' | 'result' | 'legal' | 'whitepaper'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentResult, setCurrentResult] = useState(null);
  const [userName, setUserName] = useState('探索者');
  const [legalTab, setLegalTab] = useState('about');

  // 主題與音效
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('persona_theme') || 'dark';
  });
  const [isMuted, setIsMuted] = useState(() => soundFX.isMuted());

  // VIP 解鎖狀態 (全功能直接開啟，無需調整網址或串接金流)
  const [isVipUnlocked, setIsVipUnlocked] = useState(true);

  // 模態框狀態
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState(null);

  // 吐司通知
  const [toast, setToast] = useState({ message: '', isVisible: false, icon: '✨' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('persona_theme', theme);
  }, [theme]);

  // 支援正規乾淨的獨立路徑路由 (如 /about-us, /privacy-policy, /terms-of-service, /disclaimer, /trademark)
  useEffect(() => {
    const handleLocationChange = () => {
      try {
        const pathname = window.location.pathname.toLowerCase();
        const search = window.location.search;
        const params = new URLSearchParams(search);

        if (pathname.includes('about')) {
          setCurrentView('legal');
          setLegalTab('about');
          return;
        }
        if (pathname.includes('disclaimer')) {
          setCurrentView('legal');
          setLegalTab('disclaimer');
          return;
        }
        if (pathname.includes('privacy')) {
          setCurrentView('legal');
          setLegalTab('privacy');
          return;
        }
        if (pathname.includes('term')) {
          setCurrentView('legal');
          setLegalTab('terms');
          return;
        }
        if (pathname.includes('trademark')) {
          setCurrentView('legal');
          setLegalTab('trademark');
          return;
        }

        if (pathname.includes('whitepaper') || pathname.includes('report')) {
          if (!currentResult) {
            const targetCode = params.get('result') || params.get('code') || 'ENTJ-AD';
            const defaultRes = PersonalityEngine.generateResultFromCode(targetCode.toUpperCase());
            setCurrentResult(defaultRes);
          }
          setCurrentView('whitepaper');
          return;
        }

        if (pathname.includes('order') || pathname.includes('checkout')) {
          if (!currentResult) {
            const defaultRes = PersonalityEngine.generateResultFromCode('ENTJ-AD');
            setCurrentResult(defaultRes);
          }
          setCurrentView('checkout');
          return;
        }

        // 測驗結果跳轉支援 (?result= 或 ?code=)
        const targetCode = params.get('result') || params.get('code');
        if (targetCode) {
          const res = PersonalityEngine.generateResultFromCode(targetCode.toUpperCase());
          setCurrentResult(res);
          setCurrentView('result');
          return;
        }

        // 若無特定路徑且不在測驗中，預設為首頁
        if (currentView === 'legal' || currentView === 'checkout' || currentView === 'whitepaper') {
          setCurrentView('hero');
        }
      } catch (e) {}
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const routeSlugs = {
    about: 'about-us',
    disclaimer: 'disclaimer',
    privacy: 'privacy-policy',
    terms: 'terms-of-service',
    trademark: 'trademark'
  };

  const getBasePath = () => {
    return window.location.pathname.startsWith('/64type') ? '/64type' : '';
  };

  // 乾淨 Path 導航跳轉函數（絕不帶有 ? 查詢參數）
  const navigateToLegal = (tab = 'about') => {
    setCurrentView('legal');
    setLegalTab(tab);
    try {
      const slug = routeSlugs[tab] || tab;
      const targetPath = `${getBasePath()}/${slug}`;
      window.history.pushState({ view: 'legal', tab }, '', targetPath);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('hero');
    try {
      const targetPath = `${getBasePath()}/` || '/';
      window.history.pushState({ view: 'hero' }, '', targetPath);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCheckout = () => {
    if (!currentResult) {
      const defaultRes = PersonalityEngine.generateResultFromCode('ENTJ-AD');
      setCurrentResult(defaultRes);
    }
    setCurrentView('checkout');
    try {
      const targetPath = `${getBasePath()}/order`;
      window.history.pushState({ view: 'checkout' }, '', targetPath);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToResult = () => {
    setCurrentView('result');
    try {
      const targetPath = `${getBasePath()}/result`;
      window.history.pushState({ view: 'result' }, '', targetPath);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWhitepaper = () => {
    if (!currentResult) {
      const defaultRes = PersonalityEngine.generateResultFromCode('ENTJ-AD');
      setCurrentResult(defaultRes);
    }
    setCurrentView('whitepaper');
    try {
      const targetPath = `${getBasePath()}/whitepaper`;
      window.history.pushState({ view: 'whitepaper' }, '', targetPath);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlockSuccess = (plan) => {
    localStorage.setItem('persona64_vip_unlocked', 'true');
    showToast('🎉 付款成功！已為您解鎖全景個人深度解析報告！', '👑');
    navigateToWhitepaper();
  };

  const showToast = (message, icon = '✨') => {
    setToast({ message, isVisible: true, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 2800);
  };

  const handleSelectHistoryItem = (item) => {
    const res = PersonalityEngine.generateResultFromHistory(item);
    setCurrentResult(res);
    setCurrentView('result');
    setIsHistoryDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`已載入 ${item.code} 測驗結果 📊`);
  };

  const handleSelectPersonaFromCodex = (persona) => {
    setIsCodexOpen(false);
    const res = PersonalityEngine.generateResultFromCode(persona.code);
    setCurrentResult(res);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`已開啟 ${persona.code} · ${persona.name} 原型圖鑑 📚`);
  };

  const toggleTheme = () => {
    soundFX.playClick();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    const nextMuted = soundFX.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundFX.playClick();
      showToast('音效已開啟 🔊');
    } else {
      showToast('音效已靜音 🔇');
    }
  };

  // 測驗流控制
  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qId, val) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 59) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = (overrideAnswers) => {
    const finalAnswers = overrideAnswers || answers;
    const res = PersonalityEngine.calculateResult(finalAnswers);
    setCurrentResult(res);
    PersonalityEngine.saveHistory(res);
    soundFX.playComplete();

    // 慶祝彩帶效果
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // 測驗完成後導向獨立結帳頁面（如 PersonalityHub 與 Type64 一樣）
    setCurrentView('checkout');
    try {
      const targetPath = `${getBasePath()}/order`;
      window.history.pushState({ view: 'checkout' }, '', targetPath);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopySummary = () => {
    if (!currentResult) return;
    const r = currentResult;
    const summary = `
✦ 64型人格深度測驗分析報告 ✦
━━━━━━━━━━━━━━━━━━━━
【人格代碼】${r.code}
【人格稱號】${r.profile.name} (${r.profile.group})
【核心箴言】${r.profile.tagline}

⚡ 六維能量光譜：
• 能量獲取：${r.dimensions.EI.dominantCode} (${r.dimensions.EI.dominantPct}%) - ${r.dimensions.EI.dominantLabel}
• 資訊感知：${r.dimensions.SN.dominantCode} (${r.dimensions.SN.dominantPct}%) - ${r.dimensions.SN.dominantLabel}
• 決策邏輯：${r.dimensions.TF.dominantCode} (${r.dimensions.TF.dominantPct}%) - ${r.dimensions.TF.dominantLabel}
• 生活步調：${r.dimensions.JP.dominantCode} (${r.dimensions.JP.dominantPct}%) - ${r.dimensions.JP.dominantLabel}
• 心態韌性：${r.dimensions.AR.dominantCode} (${r.dimensions.AR.dominantPct}%) - ${r.dimensions.AR.dominantLabel}
• 行動驅力：${r.dimensions.DC.dominantCode} (${r.dimensions.DC.dominantPct}%) - ${r.dimensions.DC.dominantLabel}

🌟 天賦超能力：${r.profile.superpowers.join('、')}
💼 推薦職場跑道：${r.profile.careers.join('、')}
💖 最佳靈魂拍檔：${r.profile.goldenMatch} (${getPersonalityProfile(r.profile.goldenMatch).name})

👉 探索你的64型心靈宇宙：https://64type.personality.app
━━━━━━━━━━━━━━━━━━━━
    `.trim();

    navigator.clipboard
      .writeText(summary)
      .then(() => showToast('測驗摘要已複製至剪貼簿！📋'))
      .catch(() => showToast('複製失敗，請手動選取'));
  };

  return (
    <>
      {/* 環境流光背景與星塵粒子 */}
      <div className="ambient-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="ambient-grid" />
      </div>

      <div className="app-container">
        {/* 頂部導航列 */}
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          isMuted={isMuted}
          toggleSound={toggleSound}
          openHistory={() => setIsHistoryDrawerOpen(true)}
          goHome={navigateToHome}
        />

        {/* 主視圖路由切換 */}
        {currentView === 'hero' && (
          <HeroView
            onStartQuiz={handleStartQuiz}
          />
        )}

        {currentView === 'quiz' && (
          <QuizView
            currentIndex={currentQuestionIndex}
            answers={answers}
            onSelectOption={handleSelectOption}
            onPrevQuestion={handlePrevQuestion}
            onNextQuestion={handleNextQuestion}
            onFinishQuiz={handleFinishQuiz}
          />
        )}

        {/* 獨立專屬下單結帳頁 (Dedicated Checkout & Order Route) */}
        {currentView === 'checkout' && currentResult && (
          <OrderCheckoutView
            result={currentResult}
            userName={userName}
            onUpdateUserName={setUserName}
            onUnlockSuccess={handleUnlockSuccess}
            onViewFreeResult={navigateToResult}
            onNavigateHome={navigateToHome}
            onNavigateLegal={navigateToLegal}
            adminMode={new URLSearchParams(window.location.search).get('admin') === '1'}
          />
        )}

        {currentView === 'result' && currentResult && (
          <ResultView
            result={currentResult}
            theme={theme}
            userName={userName}
            onUpdateUserName={setUserName}
            onRetest={handleStartQuiz}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onCopySummary={handleCopySummary}
            onGoToCheckout={navigateToCheckout}
            onGoToWhitepaper={navigateToWhitepaper}
          />
        )}

        {/* 獨立一頁式全景個人化深度報告視圖 (Dedicated One-Page Full Dossier View) */}
        {currentView === 'whitepaper' && currentResult && (
          <WhitepaperPageView
            result={currentResult}
            userName={userName}
            isVipUnlocked={isVipUnlocked}
            adminMode={new URLSearchParams(window.location.search).get('admin') === '1'}
            onGoBack={navigateToResult}
            onGoHome={navigateToHome}
            onGoToCheckout={navigateToCheckout}
          />
        )}

        {/* 獨立全頁面條款視圖 (Dedicated Legal Page Route) */}
        {currentView === 'legal' && (
          <LegalPageView
            currentTab={legalTab}
            onChangeTab={(tab) => navigateToLegal(tab)}
            onGoHome={navigateToHome}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {/* 頁腳 */}
        <footer className="footer">
          <div className="footer-links">
            <button className="footer-link-btn" onClick={() => { soundFX.playClick(); navigateToLegal('about'); }}>
              關於我們
            </button>
            <span className="footer-sep">·</span>
            <button className="footer-link-btn" onClick={() => { soundFX.playClick(); navigateToLegal('disclaimer'); }}>
              免責聲明
            </button>
            <span className="footer-sep">·</span>
            <button className="footer-link-btn" onClick={() => { soundFX.playClick(); navigateToLegal('privacy'); }}>
              隱私政策
            </button>
            <span className="footer-sep">·</span>
            <button className="footer-link-btn" onClick={() => { soundFX.playClick(); navigateToLegal('terms'); }}>
              服務與退款條款
            </button>
            <span className="footer-sep">·</span>
            <button className="footer-link-btn" onClick={() => { soundFX.playClick(); navigateToLegal('trademark'); }}>
              商標宣告
            </button>
          </div>
          <div style={{ margin: '8px 0', fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
            ✦ 64-TYPE PERSONA DYNAMICS | 60 題六維度心理學深度測驗系統 ✦
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
            © 2026 PERSONA 64 Dynamics · 本測驗結果僅供自我探索、性格認知與個人成長參考。
          </div>
        </footer>
      </div>

      {/* 分享海報模態框 */}
      <ShareModal
        result={currentResult}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShowToast={showToast}
        defaultUserName={userName}
      />

      {/* 歷史記錄側拉抽屜 */}
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        onSelectHistoryItem={handleSelectHistoryItem}
        onShowToast={showToast}
      />

      {/* 64 型人格全圖鑑百科模態框 */}
      <CodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        onSelectPersona={handleSelectPersonaFromCodex}
      />

      {/* 商業法律與免責聲明模態框 */}
      <LegalModal
        isOpen={!!legalModalTab}
        initialTab={legalModalTab || 'about'}
        onClose={() => setLegalModalTab(null)}
      />

      {/* 吐司通知 */}
      <Toast message={toast.message} isVisible={toast.isVisible} icon={toast.icon} />
    </>
  );
}
