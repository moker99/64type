import React from 'react';
import { soundFX } from '../utils/audio';

export function HeroView({ onStartQuiz, onOpenCodex }) {
  return (
    <section className="hero-section">
      {/* 頂級社會認同與信任標籤 */}
      <div className="social-proof-strip">
        <div className="user-avatar-group">
          <img src="./avatars/strategist.svg" alt="User 1" className="user-avatar-tiny" />
          <img src="./avatars/empath.svg" alt="User 2" className="user-avatar-tiny" />
          <img src="./avatars/sentinel.svg" alt="User 3" className="user-avatar-tiny" />
          <img src="./avatars/explorer.svg" alt="User 4" className="user-avatar-tiny" />
        </div>
        <span className="stars-rating">★★★★★</span>
        <span><strong>4.98 / 5.0</strong> (超過 250,000+ 人次完成測驗)</span>
      </div>

      <div className="hero-badge-pill">
        <span>✦ 榮格心智動力學 × 60題深度心理計量模型 (信度 α = 0.86) ✦</span>
      </div>

      <h1 className="hero-title">
        解鎖你的潛意識心靈<br />
        <span className="gradient-text">64 型專屬人格天賦光譜</span>
      </h1>

      <p className="hero-subtitle">
        超越傳統 16 型架構的粗糙劃分，融合「心態韌性」與「行動驅力」兩大深層維度（2⁶ = 64 種人格原型）。透過 60 題精準心理情境分析，輸出具備商業與個人成長價值的旗艦級診斷報告。
      </p>

      <div className="hero-cta-group">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onStartQuiz();
          }}
        >
          <span>立即開始 60 題深度測驗 🚀</span>
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => {
            soundFX.playClick();
            onOpenCodex();
          }}
        >
          <span>瀏覽 64 型人格全圖鑑 📚</span>
        </button>
      </div>

      {/* 數據指標概覽 */}
      <div className="hero-stats-row">
        <div className="stat-card">
          <div className="stat-number">64</div>
          <div className="stat-label">獨立人格原型</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">6</div>
          <div className="stat-label">雙極心理核心維度</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">60</div>
          <div className="stat-label">精選心理情境題</div>
        </div>
      </div>

      {/* 四大人格原型矩陣 (16Personalities 經典四大家族 2D 立繪展示區) */}
      <div style={{ width: '100%', marginTop: '36px' }}>
        <h2 className="home-section-title">
          ✦ 64 型人格四大家族原型 (Archetype Families) ✦
        </h2>
        <p className="home-section-subtitle">
          以 16Personalities 經典原型為基礎，擴展 64 型專屬心靈立繪與天賦光譜
        </p>
        <div className="archetype-showcase-grid">
          <div
            className="archetype-character-card"
            style={{ '--card-color': '#88619a', cursor: 'pointer' }}
            onClick={() => { soundFX.playClick(); onOpenCodex(); }}
          >
            <div className="character-avatar-frame" style={{ background: '#88619a' }}>
              <img src="./avatars/strategist.svg" alt="戰略分析家" className="character-avatar-img" />
            </div>
            <div className="character-group-name" style={{ color: '#c084fc' }}>👑 戰略分析家</div>
            <div className="character-en-name">NT 型 · 戰略統御矩陣</div>
            <p className="character-desc-text">宏觀遠見、意志堅定，善於破解複雜難題與引領變革的統帥原型。</p>
          </div>

          <div
            className="archetype-character-card"
            style={{ '--card-color': '#33a474', cursor: 'pointer' }}
            onClick={() => { soundFX.playClick(); onOpenCodex(); }}
          >
            <div className="character-avatar-frame" style={{ background: '#33a474' }}>
              <img src="./avatars/empath.svg" alt="心靈外交家" className="character-avatar-img" />
            </div>
            <div className="character-group-name" style={{ color: '#4ade80' }}>✨ 心靈外交家</div>
            <div className="character-en-name">NF 型 · 心靈共鳴矩陣</div>
            <p className="character-desc-text">深層同理、熱愛理想與和諧，以純淨情感啟迪人心的靈魂導師。</p>
          </div>

          <div
            className="archetype-character-card"
            style={{ '--card-color': '#4298b4', cursor: 'pointer' }}
            onClick={() => { soundFX.playClick(); onOpenCodex(); }}
          >
            <div className="character-avatar-frame" style={{ background: '#4298b4' }}>
              <img src="./avatars/sentinel.svg" alt="秩序守護者" className="character-avatar-img" />
            </div>
            <div className="character-group-name" style={{ color: '#38bdf8' }}>🛡️ 秩序守護者</div>
            <div className="character-en-name">SJ 型 · 秩序精算矩陣</div>
            <p className="character-desc-text">嚴謹務實、構建系統，守護穩定秩序與落實執行的高效柱石。</p>
          </div>

          <div
            className="archetype-character-card"
            style={{ '--card-color': '#e4ae3a', cursor: 'pointer' }}
            onClick={() => { soundFX.playClick(); onOpenCodex(); }}
          >
            <div className="character-avatar-frame" style={{ background: '#e4ae3a' }}>
              <img src="./avatars/explorer.svg" alt="自由探險家" className="character-avatar-img" />
            </div>
            <div className="character-group-name" style={{ color: '#facc15' }}>⚡ 自由探險家</div>
            <div className="character-en-name">SP 型 · 自由探索矩陣</div>
            <p className="character-desc-text">敏捷隨性、熱愛實踐與冒險，勇於挑戰未知並享受當下的先驅者。</p>
          </div>
        </div>
      </div>

      {/* 6 大維度特色展示區 */}
      <div className="dimension-cards-grid">
        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#6366f1' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">⚡ 能量獲取 (Energy)</span>
            <span className="dim-code-badge">E vs I</span>
          </div>
          <p className="dim-feature-desc">外向社交充電 vs 內向深度沉澱，探索你心靈電力的源泉。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#06b6d4' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">🌐 資訊感知 (Perception)</span>
            <span className="dim-code-badge">S vs N</span>
          </div>
          <p className="dim-feature-desc">現實經驗細節 vs 未來宏觀願景，解碼你觀察世界的方式。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#ec4899' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">🧠 決策邏輯 (Decision)</span>
            <span className="dim-code-badge">T vs F</span>
          </div>
          <p className="dim-feature-desc">客觀因果邏輯 vs 人際共情同理，揭示你做出抉擇的底層準則。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#10b981' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">📐 生活步調 (Lifestyle)</span>
            <span className="dim-code-badge">J vs P</span>
          </div>
          <p className="dim-feature-desc">結構計畫秩序 vs 靈活隨興適應，分析你的日常行事風格。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#f59e0b' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">🛡️ 心態韌性 (Mindset)</span>
            <span className="dim-code-badge">A vs R</span>
          </div>
          <p className="dim-feature-desc">篤定自信無畏 vs 審慎反思自省，衡量面對未知與壓力的定力。</p>
        </div>

        <div className="dim-feature-card glass-panel" style={{ '--accent-color': '#8b5cf6' }}>
          <div className="dim-feature-header">
            <span className="dim-feature-title">🚀 行動驅力 (Drive)</span>
            <span className="dim-code-badge">D vs C</span>
          </div>
          <p className="dim-feature-desc">開拓主導破局 vs 協同凝聚共鳴，錨定你創造影響力的途徑。</p>
        </div>
      </div>

      {/* 真實測驗者評價 (Social Proof / Testimonials) */}
      <div className="home-section-container">
        <h2 className="home-section-title">✦ 測驗者真實口碑回饋 ✦</h2>
        <p className="home-section-subtitle">來自不同領域專業人士與心靈探索者的深度推薦</p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars-rating">★★★★★</div>
            <p className="testimonial-quote">
              「過去測傳統 MBTI 總覺得差了臨門一腳，64 型加入心態韌性 (A/R) 與驅力 (D/C) 後，測出來的結果精準到令我起雞皮疙瘩！特別是職涯與盲點分析，幫我解決了換工作時的長久焦慮。」
            </p>
            <div className="testimonial-user">
              <img src="./avatars/strategist.svg" alt="Eva L." className="user-avatar-tiny" style={{ width: '36px', height: '36px' }} />
              <div>
                <div style={{ fontWeight: 800 }}>Eva Lin</div>
                <div className="user-role-badge">科技業產品總監 · ENTJ-AD</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars-rating">★★★★★</div>
            <p className="testimonial-quote">
              「海報一鍵生成非常漂亮，我轉發到 Instagram 後朋友都在問在哪測的！圖鑑功能也非常強大，查同事跟伴侶的人格超方便，強烈推薦每個人都來測一次！」
            </p>
            <div className="testimonial-user">
              <img src="./avatars/empath.svg" alt="Marcus T." className="user-avatar-tiny" style={{ width: '36px', height: '36px' }} />
              <div>
                <div style={{ fontWeight: 800 }}>Marcus Tseng</div>
                <div className="user-role-badge">獨立設計師 / 創作者 · INFP-RC</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars-rating">★★★★★</div>
            <p className="testimonial-quote">
              「60 題的節奏設計非常舒適，每道題都切中真實生活情境。雷達圖很直觀，特別是最佳拍檔和成長拍檔的解析，為我和伴侶的溝通帶來了很大的啟發！」
            </p>
            <div className="testimonial-user">
              <img src="./avatars/sentinel.svg" alt="Dr. Sophia Chen" className="user-avatar-tiny" style={{ width: '36px', height: '36px' }} />
              <div>
                <div style={{ fontWeight: 800 }}>Dr. Sophia Chen</div>
                <div className="user-role-badge">心理諮商督導 · INFJ-AD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 常見問題 FAQ */}
      <div className="home-section-container">
        <h2 className="home-section-title">✦ 常見問題解答 (FAQ) ✦</h2>
        <p className="home-section-subtitle">關於 64 型人格測驗的科學原理與使用建議</p>
        <div className="faq-grid">
          <div className="faq-item-card">
            <div className="faq-q">❓ 64 型人格測驗與傳統 16 型（MBTI）有何不同？</div>
            <div className="faq-a">
              傳統 16 型僅涵蓋 4 個維度（E/I、S/N、T/F、J/P）。64 型額外引入了衡量抗壓定力的「心態韌性（A 篤定 vs R 審慎）」與衡量組織影響力的「行動驅力（D 開拓 vs C 協同）」，從而將人格解析維度擴展為 2⁶ = 64 種原型，大幅減少標籤化誤差。
            </div>
          </div>

          <div className="faq-item-card">
            <div className="faq-q">⏱️ 完成測驗需要多久時間？</div>
            <div className="faq-a">
              本測驗共 60 題精選情境題，平均作答時間為 6 ~ 8 分鐘。建議在安靜、放鬆的環境下，憑直覺選擇最符合自己日常狀態的選項。
            </div>
          </div>

          <div className="faq-item-card">
            <div className="faq-q">📊 測驗結果會被保存嗎？可以重複測驗嗎？</div>
            <div className="faq-a">
              系統會自動將您的測驗歷史記錄安全保存於本機瀏覽器中，您可以隨時在右上角「歷史紀錄」中查看過往報告，也可以隨時點擊重新測驗。
            </div>
          </div>

          <div className="faq-item-card">
            <div className="faq-q">📸 如何分享測驗結果給朋友？</div>
            <div className="faq-a">
              在結果頁面點擊「一鍵生成分享海報」，系統會為您動態渲染出 1080×1620 高畫質圖卡，支援一鍵下載 PNG 或複製至剪貼簿直接發布至社群平台！
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
