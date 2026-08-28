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
  const total = QUESTIONS.length;
  const safeIndex = Math.max(0, Math.min(currentIndex || 0, total - 1));
  const q = QUESTIONS[safeIndex] || QUESTIONS[0];
  const progressPct = ((safeIndex + 1) / total) * 100;
  const dimMeta = DIMENSIONS[q?.dimension] || DIMENSIONS.EI;

  const handleSelect = useCallback((val) => {
    soundFX.playSelect(val);
    if (q?.id) {
      onSelectOption(q.id, val);
    }

    setTimeout(() => {
      if (safeIndex < total - 1) {
        onNextQuestion();
      } else {
        onFinishQuiz();
      }
    }, 220);
  }, [safeIndex, total, q?.id, onSelectOption, onNextQuestion, onFinishQuiz]);

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
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部導航控制器 */}
      <div className="quiz-nav-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button
          className="btn btn-secondary"
          disabled={currentIndex === 0}
          onClick={() => {
            soundFX.playClick();
            onPrevQuestion();
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>上一題</span>
        </button>

        {new URLSearchParams(window.location.search).get('admin') === '1' && (
          <button
            type="button"
            className="btn btn-outline"
            style={{ borderColor: 'var(--gold-accent)', color: 'var(--gold-accent)', fontSize: '0.8rem', padding: '6px 14px' }}
            onClick={() => {
              soundFX.playVictory?.();
              const sampleAnswers = {};
              QUESTIONS.forEach((q, idx) => {
                const choices = [2, 1, 2, -1, 2, 2, -2, 1, 2, -1];
                sampleAnswers[q.id] = choices[idx % choices.length];
              });
              onFinishQuiz(sampleAnswers);
            }}
          >
            Admin 快速模擬填答
          </button>
        )}

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
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', minWidth: '130px', justifyContent: 'center' }}
        >
          <span>{currentIndex === total - 1 ? '查看心智動力診斷結果' : '下一題'}</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
