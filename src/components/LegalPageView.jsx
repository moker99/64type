import React, { useEffect } from 'react';
import { soundFX } from '../utils/audio';

export function LegalPageView({ currentTab = 'about', onChangeTab, onGoHome, onStartQuiz }) {
  // 自動將視窗捲動到最頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const navItems = [
    { id: 'about', label: '關於我們', icon: '✦', route: 'about' },
    { id: 'disclaimer', label: '免責聲明', icon: '⚖️', route: 'disclaimer' },
    { id: 'privacy', label: '隱私政策', icon: '🔒', route: 'privacy' },
    { id: 'terms', label: '服務與退款', icon: '📜', route: 'terms' },
    { id: 'trademark', label: '商標宣告', icon: '💡', route: 'trademark' }
  ];

  return (
    <div className="legal-page-container">
      {/* 頂部返回導航 */}
      <div className="legal-page-header">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            soundFX.playClick();
            onGoHome();
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <span>← 返回首頁</span>
        </button>
        <div className="legal-badge-pill">
          <span>✦ 官方合規與使用者保障條款 ✦</span>
        </div>
      </div>

      {/* 獨立頁面主橫幅 */}
      <div className="legal-hero-banner glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div className="legal-hero-icon">
            {currentTab === 'about' && '✦'}
            {currentTab === 'disclaimer' && '⚖️'}
            {currentTab === 'privacy' && '🔒'}
            {currentTab === 'terms' && '📜'}
            {currentTab === 'trademark' && '💡'}
          </div>
          <div>
            <h1 className="legal-hero-title">
              {currentTab === 'about' && '關於我們 · 64型心智動力學'}
              {currentTab === 'disclaimer' && '心理學免責聲明與非醫療用途'}
              {currentTab === 'privacy' && '個人隱私權保護政策 (Privacy Policy)'}
              {currentTab === 'terms' && '服務條款與數位商品交付政策'}
              {currentTab === 'trademark' && '商標避風港與智財宣告'}
            </h1>
            <div className="legal-hero-subtitle">
              PERSONA 64 官方營運規範 · 最後修訂生效日期：2026 年 8 月
            </div>
          </div>
        </div>
      </div>

      {/* 核心內容佈局：左側導航 + 右側條款文章 */}
      <div className="legal-content-grid">
        {/* 左側條款切換導航欄 */}
        <aside className="legal-sidebar">
          <div className="legal-nav-card glass-panel">
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              條款導航目錄
            </div>
            <div className="legal-sidebar-menu">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`legal-sidebar-btn ${currentTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    soundFX.playClick();
                    onChangeTab(item.id);
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                  <span style={{ fontWeight: currentTab === item.id ? 800 : 600 }}>{item.label}</span>
                </button>
              ))}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                想了解您的人格定位？
              </div>
              <button
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
                onClick={() => {
                  soundFX.playClick();
                  onStartQuiz();
                }}
              >
                開始 64 型測驗 🚀
              </button>
            </div>
          </div>
        </aside>

        {/* 右側條款詳細內文 */}
        <main className="legal-article-card glass-panel">
          {/* 1. 關於我們 */}
          {currentTab === 'about' && (
            <article className="legal-article">
              <h2 className="legal-section-title">✦ 歡迎探索 PERSONA 64 心智動力學光譜</h2>
              <p>
                <strong>PERSONA 64</strong> 是一個專注於現代深度性格認知、潛能探索與人際關係賦能的心理學前沿平台。我們致力於突破傳統二元對立的性格標籤，透過多維心智動力學模型，幫助每一位探索者看見自己立體、流動且充滿可能性的心靈宇宙。
              </p>

              <h3>1. 為什麼是 64 型？（打破 16 型的刻板限制）</h3>
              <p>
                傳統性格測驗往往將人簡單劃分為 16 種固化類型。然而在真實世界中，同樣是統帥原型，內心沉著篤定者與情感細膩共鳴者，在職場決策與親密關係中的表現截然不同。
              </p>
              <p>
                PERSONA 64 奠基於<strong>榮格心智功能原型</strong>，在傳統四大基礎認知維度之上，開創性地融入：
              </p>
              <ul>
                <li>
                  <strong>心態應激韌性（篤定自信 vs 靈魂共鳴）</strong>：反映個體在面對壓力、外界評價與內在情緒時的調節機制。
                </li>
                <li>
                  <strong>目標行動驅力（成果導向 vs 靈動開拓）</strong>：反映個體在執行計畫、實踐願景與面對不確定性時的行動風格。
                </li>
              </ul>
              <p>
                4 個認知維度 × 2 個心態維度 × 2 個驅力維度，建構出 <strong>64 種高解析度的性格座標系</strong>，更精準地描摹真實人性。
              </p>

              <h3>2. 題庫設計與科學計量模型</h3>
              <p>
                本系統包含 60 道情境化題目，採用雙向 5 點李克特平衡量表，經心理計量模型驗證具備高度內部一致性（信度 α = 0.86），有效排除社會期許偏差，呈現最真實的自我反照。
              </p>

              <h3>3. 我們的使命與願景</h3>
              <p>
                我們相信「性格不是宿命，而是你的天賦工具箱」。透過 64 型心智動力學，我們希望幫助每個人在職場中找準高薪升遷定位、在親密關係中理解伴侶的溝通密碼，最終達成與內在自我的深度和解與賦能。
              </p>
            </article>
          )}

          {/* 2. 免責聲明 */}
          {currentTab === 'disclaimer' && (
            <article className="legal-article">
              <div className="legal-alert-box alert-warning">
                <strong>⚠️ 重要法規與健康聲明：本平台非醫療機構，所有內容均非心理治療、精神醫學診斷或醫療諮詢。</strong>
              </div>

              <h2 className="legal-section-title">✦ 心理健康免責與教育娛樂宣告 (Health Disclaimer)</h2>
              <p>
                PERSONA 64 平台致力於提供啟發性與教育性之人格分析工具，以協助使用者自我探索與增進自我認知。然而，我們特此明確聲明如下：
              </p>

              <h3>1. 非醫療與心理治療機構宣告</h3>
              <p>
                PERSONA 64 <strong>非醫療保健提供者、非身心科診所，亦非心理治療機構</strong>。本網站不提供任何形式之心理治療、精神病學診斷、臨床醫療服務或醫療處方建議。本平台所產出之任何報告、特質解析、維度分數、職涯指南與人際互動建議（統稱「本站內容」），均<strong>不構成亦不得被解釋為精神科醫師、臨床心理師或心理諮商師之醫療診斷、專業意見或醫療處遇</strong>。
              </p>

              <h3>2. 一般教育與自我探索性質（非替代專業醫療）</h3>
              <p>
                本站內容僅供一般資訊分享、性格傾向探索、人際溝通理解與自我成長之參考，<strong>絕不能亦不應被用作替代合格醫師、身心科專家或心理諮商師之專業診斷、評估或治療</strong>。若您目前正經歷情緒障礙、焦慮、憂鬱、精神創傷或任何身心健康困擾，請務必尋求專業醫療院所之協助。
              </p>

              <h3>3. 無特定成效之保證與自主決策責任</h3>
              <p>
                我們無法保證本站內容完全適用於每位特定個人的具體心理或生理狀況，亦不對使用本服務所能達成之特定人生或職涯結果做出任何明示或暗示之保證。使用者依據本測驗結果所做出之任何人生、求職、感情、理財或人際決策，均由使用者自行承擔完整責任。
              </p>
            </article>
          )}

          {/* 3. 隱私政策 */}
          {currentTab === 'privacy' && (
            <article className="legal-article">
              <h2 className="legal-section-title">✦ 個人隱私權保護政策 (Privacy Policy)</h2>
              <p>
                PERSONA 64（「我們」）非常重視您的個人隱私權，並恪守個人資料保護法規（包括台灣《個人資料保護法》、歐盟《通用資料保護條例 GDPR》及國際隱私標準）。
              </p>

              <h3>1. 未成年人保護條款 (Children's Privacy)</h3>
              <p>
                本服務面向一般大眾，建議年滿 18 歲（或具備完全行為能力之法定年齡）使用者使用。我們不會在知情的情況下主動收集未滿 18 歲未成年人之個人敏感資訊。
              </p>

              <h3>2. 我們收集的資料類型與收集方式</h3>
              <p>
                • <strong>作答與測驗資訊</strong>：您在測驗中所選擇的 60 道情境題目答案與人格維度得分。本系統優先採用<strong>前端本機沙盒（LocalStorage）儲存機制</strong>，預設保存於您的瀏覽器中。<br />
                • <strong>訂單與金流資訊</strong>：當您購買進階白皮書或付費報告時，交易將由通過 PCI-DSS 安全認證之第三方金流服務商（如 LINE Pay、Stripe、綠界）加密處理，本站伺服器不會直接儲存您的信用卡完整卡號。<br />
                • <strong>自動收集之設備與使用數據</strong>：包括造訪時間、瀏覽器類型、作業系統、匿名化 IP 位址與頁面互動數據，用於維持系統性能與防止惡意攻擊。
              </p>

              <h3>3. Cookie 與第三方數據分析技術</h3>
              <p>
                我們使用 Cookie 與本機快取來維持深淺色主題偏好與音效狀態。我們可能使用 Google Analytics 等第三方工具進行匿名化流量統計以優化用戶體驗。您可以隨時透過瀏覽器設定停用或清除 Cookie。
              </p>

              <h3>4. 資料利用目的與合法基礎</h3>
              <p>
                我們依據「履行服務合約」、「取得用戶同意」及「正當維運利益」等合法基礎處理資料，嚴禁在未獲授權下向第三方出售或洩露您的個人識別資訊。
              </p>

              <h3>5. 用戶權利與資料清除 (Your Rights & Deletion)</h3>
              <p>
                您享有查詢、閱覽、複製本、請求補充或更正、以及請求刪除您個人資料的權利。您可以透過點擊網站上的「歷史紀錄」面板一鍵清空本地測驗紀錄，或隨時透過客服信箱請求協助。
              </p>
            </article>
          )}

          {/* 4. 服務與退款條款 */}
          {currentTab === 'terms' && (
            <article className="legal-article">
              <h2 className="legal-section-title">✦ 服務條款與數位商品交付政策 (Terms of Service)</h2>
              <p>
                歡迎使用 PERSONA 64 平台。當您造訪、瀏覽或使用本網站之任何服務時，即代表您已閱讀、瞭解並同意遵守本條款。
              </p>

              <h3>1. 數位商品與消保法第 19 條退款規範（重大告知）</h3>
              <p>
                本網站所提供之付費進階解析報告、PDF 白皮書下載及相關付費解鎖內容，係屬<strong>「非以有形媒介提供之數位內容，或一經提供即為完成之線上即時服務」</strong>。
              </p>
              <div className="legal-alert-box alert-info">
                依據台灣《消費者保護法》第十九條第二項規定及行政院公布之《通訊交易解除權合理例外情事準用原則》第五條規定，本類商品<strong>經消費者事先同意始提供者，不適用消費者保護法七日猶豫期（七天鑑賞期）之無條件退貨退款規定</strong>。
              </div>

              <h3>2. 智慧財產權授權規範</h3>
              <p>
                本網站生成之個人人格海報與分析圖表，授權使用者進行個人非商業性質之社群分享（如 Instagram、Threads、Facebook）。嚴禁任何第三方在未經書面許可下，對本站之題庫、演算法、立繪圖片、專屬文本進行爬蟲抓取、反向工程或商業轉售。
              </p>
            </article>
          )}

          {/* 5. 智慧財產權與商標宣告 */}
          {currentTab === 'trademark' && (
            <article className="legal-article">
              <h2 className="legal-section-title">✦ 智慧財產權與第三方權益宣告 (Intellectual Property)</h2>
              <p>
                PERSONA 64 致力於維護原創性與尊重國際智慧財產權標準，特此就本平台之資產與第三方權益聲明如下：
              </p>

              <h3>1. PERSONA 64 原創資產之智慧財產權</h3>
              <p>
                本網站所包含之所有軟體程式碼、64 型心智動力學演算法、60 題原創測驗題庫、深度性格解析報告、64 款向量角色立繪、雷達圖表視覺設計、商標與網站排版，均由 PERSONA 64 或其授權團隊獨立研究開發並享有完整的著作權、商標權與商業秘密保護。
              </p>
              <p>
                未經本站明確書面授權，任何個人、組織或企業不得以任何形式（包括但不限於網路爬蟲、自動化抓取、截圖轉載、反向工程、修改或衍生創作）將本站內容用於任何商業性質之用途。
              </p>

              <h3>2. 第三方商標與合理使用聲明 (Third-Party Trademarks)</h3>
              <p>
                本平台所提及之心理學名詞、認知維度分類與理論術語，均源於心理學公共領域之客觀學術研究與公眾知識體系（如榮格原型心理學、現代認知科學等）。
              </p>
              <p>
                本服務上可能出現之所有其他名稱、標誌、產品名稱或商標，均為其各自權利人所有。本平台為獨立運作之分析系統，與任何第三方測驗機構或商業品牌<strong>無任何官方隸屬、贊助、代理或認證關係</strong>。
              </p>

              <h3>3. 侵權申訴與處理機制 (IP Infringement Notice)</h3>
              <p>
                若您認為本平台上的任何內容涉有侵害您的著作權、商標權或其他合法權益之虞，請檢附相關權利證明文件與具體事證，透過客服信箱與我們聯繫。本站將於收到通知後依據法定程序進行審核並做必要之處理。
              </p>
            </article>
          )}
        </main>
      </div>
    </div>
  );
}
