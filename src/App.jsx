import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { HeroView } from './components/HeroView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { CodexModal } from './components/CodexModal';
import { PersonaDetailModal } from './components/PersonaDetailModal';
import { ShareModal } from './components/ShareModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { Toast } from './components/Toast';

import { PersonalityEngine } from './utils/engine';
import { soundFX } from './utils/audio';
import { getPersonalityProfile } from './data/personalityData';

export function App() {
  const [currentView, setCurrentView] = useState('hero'); // 'hero' | 'quiz' | 'result'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentResult, setCurrentResult] = useState(null);
  const [userName, setUserName] = useState('探索者');

  // 主題與音效
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('persona_theme') || 'dark';
  });
  const [isMuted, setIsMuted] = useState(() => soundFX.isMuted());

  // 模態框狀態
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [detailPersonaCode, setDetailPersonaCode] = useState(null);

  // 吐司通知
  const [toast, setToast] = useState({ message: '', isVisible: false, icon: '✨' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('persona_theme', theme);
  }, [theme]);

  const showToast = (message, icon = '✨') => {
    setToast({ message, isVisible: true, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 2800);
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
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleFinishQuiz = () => {
    const res = PersonalityEngine.calculateResult(answers);
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

    setCurrentView('result');
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
          openCodex={() => setIsCodexOpen(true)}
          goHome={() => setCurrentView('hero')}
        />

        {/* 主視圖路由切換 */}
        {currentView === 'hero' && (
          <HeroView
            onStartQuiz={handleStartQuiz}
            onOpenCodex={() => setIsCodexOpen(true)}
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

        {currentView === 'result' && currentResult && (
          <ResultView
            result={currentResult}
            theme={theme}
            userName={userName}
            onUpdateUserName={setUserName}
            onRetest={handleStartQuiz}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onOpenCodex={() => setIsCodexOpen(true)}
            onCopySummary={handleCopySummary}
          />
        )}

        {/* 頁腳 */}
        <footer className="footer">
          <div>✦ 64-TYPE PERSONA DYNAMICS | 60 題六維度心理學深度測驗系統 ✦</div>
          <div>本測驗結果僅供自我探索、性格認知與個人成長參考。</div>
        </footer>
      </div>

      {/* 64型圖鑑模態框 */}
      <CodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        onSelectPersona={(code) => setDetailPersonaCode(code)}
      />

      {/* 單一人格詳情彈窗 */}
      <PersonaDetailModal
        code={detailPersonaCode}
        isOpen={!!detailPersonaCode}
        onClose={() => setDetailPersonaCode(null)}
      />

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
        onSelectHistoryItem={(code) => setDetailPersonaCode(code)}
        onShowToast={showToast}
      />

      {/* 吐司通知 */}
      <Toast message={toast.message} isVisible={toast.isVisible} icon={toast.icon} />
    </>
  );
}
