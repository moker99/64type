import React from 'react';
import { soundFX } from '../utils/audio';

export function Navbar({
  theme,
  toggleTheme,
  isMuted,
  toggleSound,
  openHistory,
  openCodex,
  goHome
}) {
  return (
    <header className="navbar">
      <div className="logo-brand" onClick={() => { soundFX.playClick(); goHome(); }}>
        <div className="logo-icon">✦</div>
        <div>
          <div className="logo-title">PERSONA 64</div>
          <div className="logo-subtitle">64-Type Dynamics</div>
        </div>
      </div>

      <div className="nav-actions">
        <button
          className="btn-icon"
          onClick={toggleSound}
          title={isMuted ? "開啟音效" : "靜音"}
          aria-label="切換音效"
        >
          <span>{isMuted ? "🔇" : "🔊"}</span>
        </button>

        <button
          className="btn-icon"
          onClick={toggleTheme}
          title="切換深淺模式"
          aria-label="切換主題"
        >
          <span>{theme === 'light' ? "☀️" : "🌓"}</span>
        </button>

        <button
          className="btn-icon"
          onClick={() => { soundFX.playClick(); openHistory(); }}
          title="測驗歷史紀錄"
          aria-label="歷史紀錄"
        >
          <span>🕒</span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => { soundFX.playClick(); openCodex(); }}
        >
          <span>📚 64型圖鑑</span>
        </button>
      </div>
    </header>
  );
}
