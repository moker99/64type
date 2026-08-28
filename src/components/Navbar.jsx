import React from 'react';
import { soundFX } from '../utils/audio';

export function Navbar({
  theme,
  toggleTheme,
  isMuted,
  toggleSound,
  openHistory,
  goHome
}) {
  return (
    <header className="navbar">
      <div className="logo-brand" onClick={() => { soundFX.playClick(); goHome(); }}>
        <div className="logo-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" stroke="url(#logoGlow)" strokeWidth="1.5" />
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#logoGlow)" />
            <defs>
              <linearGradient id="logoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary-light)" />
                <stop offset="100%" stopColor="var(--secondary-light)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          <div className="logo-title font-serif">PERSONA 64</div>
          <div className="logo-subtitle">侘寂心靈科技 · 個體化導航</div>
        </div>
      </div>

      <div className="nav-actions">
        {/* 音效切換 */}
        <button
          className="btn-icon"
          onClick={toggleSound}
          title={isMuted ? "開啟心靈音效" : "靜音模式"}
          aria-label="切換音效"
        >
          {isMuted ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </button>

        {/* 深淺主題切換 (晨曦燕麥 / 墨夜黑曜) */}
        <button
          className="btn-icon"
          onClick={toggleTheme}
          title={theme === 'light' ? "切換至墨夜黑曜主題" : "切換至晨曦燕麥主題"}
          aria-label="切換主題"
        >
          {theme === 'light' ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        {/* 歷史紀錄 */}
        <button
          className="btn-icon"
          onClick={() => { soundFX.playClick(); openHistory(); }}
          title="心靈測驗歷史紀錄"
          aria-label="歷史紀錄"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </button>
      </div>
    </header>
  );
}

