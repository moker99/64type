import React, { useEffect, useCallback } from 'react';
import { QUESTIONS, DIMENSIONS, SCALE_OPTIONS } from '../data/questions';
import { soundFX } from '../utils/audio';

export function QuizView({
  currentIndex,
  answers,
  onSelectOption,
  onPrevQuestion,
  onNextQuestion,
  onFinishQuiz
}) {
  const q = QUESTIONS[currentIndex];
  const total = QUESTIONS.length;
  const progressPct = ((currentIndex + 1) / total) * 100;
  const dimMeta = DIMENSIONS[q.dimension];

  const handleSelect = useCallback((val) => {
    soundFX.playSelect(val);
    onSelectOption(q.id, val);

    setTimeout(() => {
      if (currentIndex < total - 1) {
        onNextQuestion();
      } else {
        onFinishQuiz();
      }
    }, 220);
  }, [currentIndex, total, q.id, onSelectOption, onNextQuestion, onFinishQuiz]);

  // 鍵盤操作快捷鍵
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        const opt = SCALE_OPTIONS[idx];
        if (opt) handleSelect(opt.value);
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          soundFX.playClick();
          onPrevQuestion();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        soundFX.playClick();
        if (currentIndex < total - 1) {
          onNextQuestion();
        } else {
          onFinishQuiz();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, total, handleSelect, onPrevQuestion, onNextQuestion, onFinishQuiz]);

  return (
    <div className="quiz-container">
      {/* 頂部進度列 */}
      <div className="quiz-header">
        <div className="quiz-meta-bar">
          <div className="question-counter">
            第 {currentIndex + 1} 題 / 共 {total} 題
          </div>
          <div
            className="dimension-indicator-badge"
            style={{ borderColor: dimMeta.color }}
          >
            <span>{dimMeta.name}（{dimMeta.codeA} / {dimMeta.codeB}）</span>
          </div>
        </div>
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* 題目卡片主體 */}
      <div className="question-card glass-panel">
        <div className="question-scenario-badge">情境：{q.scenario}</div>
        <h2 className="question-text">{q.text}</h2>

        {/* 5 段式李克特選項組 */}
        <div className="scale-options-group">
          <div className="scale-connecting-line" />
          {SCALE_OPTIONS.map((opt, optIdx) => {
            const isSelected = answers[q.id] === opt.value;
            return (
              <div
                key={opt.value}
                className={`scale-item ${isSelected ? 'selected' : ''}`}
                style={{ '--btn-color': opt.color }}
                onClick={() => handleSelect(opt.value)}
              >
                <div className="scale-circle-anchor">
                  <div
                    className={`scale-btn-circle scale-size-${opt.scaleSize}`}
                    style={{ borderColor: isSelected ? opt.color : undefined }}
                  >
                    {isSelected && (
                      <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
                        ✓
                      </span>
                    )}
                  </div>
                </div>
                <div className="scale-label">{opt.label}</div>
                <div className="scale-shortcut-hint">[ {optIdx + 1} ]</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部導航控制器 */}
      <div className="quiz-nav-toolbar">
        <button
          className="btn btn-secondary"
          disabled={currentIndex === 0}
          onClick={() => {
            soundFX.playClick();
            onPrevQuestion();
          }}
        >
          <span>← 上一題</span>
        </button>

        <div className="keyboard-tips">
          <span>鍵盤快捷鍵：</span>
          <span className="kbd-badge">1~5 選取</span>
          <span className="kbd-badge">← 上一題</span>
          <span className="kbd-badge">→ 下一題</span>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            soundFX.playClick();
            if (currentIndex < total - 1) {
              onNextQuestion();
            } else {
              onFinishQuiz();
            }
          }}
        >
          <span>{currentIndex === total - 1 ? '完成測驗 🚀' : '下一題 →'}</span>
        </button>
      </div>
    </div>
  );
}
