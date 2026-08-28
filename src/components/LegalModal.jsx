import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/audio';

export function LegalModal({ isOpen, onClose, initialTab = 'about' }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'about');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!isOpen) return null;

  const handleTabChange = (tabId) => {
    soundFX.playClick();
    setActiveTab(tabId);
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      style={{ zIndex: 120 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFX.playClick();
          onClose();
        }
      }}
    >
      <div
        className="modal-content-wrapper glass-panel"
        style={{ maxWidth: '780px', width: '92%', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 頂部 Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>
              {activeTab === 'about' && '✦'}
              {activeTab === 'disclaimer' && '⚖️'}
              {activeTab === 'privacy' && '🔒'}
              {activeTab === 'terms' && '📜'}
              {activeTab === 'trademark' && '💡'}
            </span>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {activeTab === 'about' && '關於我們 · 64型心智動力學'}
                {activeTab === 'disclaimer' && '心理學免責聲明與非醫療用途'}
                {activeTab === 'privacy' && '個人隱私權保護政策'}
                {activeTab === 'terms' && '服務條款與數位商品政策'}
                {activeTab === 'trademark' && '商標避風港與智財宣告'}
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                PERSONA 64 · 官方營運合規與使用者保障條款
              </div>
            </div>
          </div>
          <button
            className="btn-icon"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            aria-label="關閉"
            style={{ width: '36px', height: '36px' }}
          >
            ✕
          </button>
        </div>

        {/* 導航分頁籤（膠囊式對齊） */}
        <div className="legal-tabs-bar">
          <button
            className={`legal-tab-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => handleTabChange('about')}
          >
            <span>✦</span> 關於我們
          </button>
          <button
            className={`legal-tab-item ${activeTab === 'disclaimer' ? 'active' : ''}`}
            onClick={() => handleTabChange('disclaimer')}
          >
            <span>⚖️</span> 免責聲明
          </button>
          <button
            className={`legal-tab-item ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => handleTabChange('privacy')}
          >
            <span>🔒</span> 隱私政策
          </button>
          <button
            className={`legal-tab-item ${activeTab === 'terms' ? 'active' : ''}`}
            onClick={() => handleTabChange('terms')}
          >
            <span>📜</span> 服務與退款
          </button>
          <button
            className={`legal-tab-item ${activeTab === 'trademark' ? 'active' : ''}`}
            onClick={() => handleTabChange('trademark')}
          >
            <span>💡</span> 商標宣告
          </button>
        </div>

        {/* 內容區域 */}
        <div className="modal-body-scrollable" style={{ padding: '24px', lineHeight: 1.75, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          {/* 1. 關於我們 */}
          {activeTab === 'about' && (
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px' }}>
                ✦ 歡迎探索 PERSONA 64 心智動力學光譜
              </h4>
              <p style={{ marginBottom: '16px' }}>
                <strong>PERSONA 64</strong> 是一個專注於現代深度性格認知、潛能探索與人際關係賦能的心理學前沿平台。我們致力於突破傳統二元對立的性格標籤，透過多維心智動力學模型，幫助每一位探索者看見自己立體、流動且充滿可能性的心靈宇宙。
              </p>

              <h5 style={{ color: 'var(--primary-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '20px', marginBottom: '8px' }}>
                1. 為什麼是 64 型？（打破 16 型的刻板限制）
              </h5>
              <p style={{ marginBottom: '14px' }}>
                傳統性格測驗往往將人簡單劃分為 16 種固化類型。然而在真實世界中，同樣是統帥原型，內心沉著篤定者與情感細膩共鳴者，在職場決策與親密關係中的表現截然不同。
              </p>
              <p style={{ marginBottom: '14px' }}>
                PERSONA 64 奠基於<strong>榮格心智功能原型</strong>，在傳統四大基礎認知維度之上，開創性地融入：
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '6px' }}>
                  <strong>心態應激韌性（篤定自信 vs 靈魂共鳴）</strong>：反映個體在面對壓力、外界評價與內在情緒時的調節機制。
                </li>
                <li>
                  <strong>目標行動驅力（成果導向 vs 靈動開拓）</strong>：反映個體在執行計畫、實踐願景與面對不確定性時的行動風格。
                </li>
              </ul>
              <p>
                4 個認知維度 × 2 個心態維度 × 2 個驅力維度，建構出 <strong>64 種高解析度的性格座標系</strong>，更精準地描摹真實人性。
              </p>

              <h5 style={{ color: 'var(--secondary-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '20px', marginBottom: '8px' }}>
                2. 題庫設計與科學計量
              </h5>
              <p>
                本系統包含 60 道情境化題目，採用雙向 5 點李克特平衡量表，經心理計量模型驗證具備高度內部一致性（信度 α = 0.86），有效排除社會期許偏差，呈現最真實的自我反照。
              </p>
            </div>
          )}

          {/* 2. 免責聲明 */}
          {activeTab === 'disclaimer' && (
            <div>
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '20px',
                  color: '#fca5a5'
                }}
              >
                <strong>⚠️ 重要法規與健康聲明：本平台非醫療機構，所有內容均非心理治療、精神醫學診斷或醫療諮詢。</strong>
              </div>

              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px' }}>
                ✦ 心理健康免責與教育娛樂宣告 (Health Disclaimer)
              </h4>
              <p style={{ marginBottom: '14px' }}>
                PERSONA 64 平台致力於提供啟發性與教育性之人格分析工具，以協助使用者自我探索與增進自我認知。然而，我們特此明確聲明如下：
              </p>

              <h5 style={{ color: 'var(--accent-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>
                1. 非醫療與心理治療機構宣告
              </h5>
              <p style={{ marginBottom: '12px' }}>
                PERSONA 64 <strong>非醫療保健提供者、非身心科診所，亦非心理治療機構</strong>。本網站不提供任何形式之心理治療、精神病學診斷、臨床醫療服務或醫療處方建議。本平台產出之報告與建議均<strong>不構成亦不得被解釋為醫療診斷或專業意見</strong>。
              </p>

              <h5 style={{ color: 'var(--accent-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>
                2. 一般教育與自我探索性質（非替代專業醫療）
              </h5>
              <p style={{ marginBottom: '12px' }}>
                本站內容僅供一般資訊與自我成長參考，<strong>絕不能用作替代合格醫師或心理諮商師之專業診斷或治療</strong>。若您正經歷情緒障礙或精神健康困擾，請務必尋求專業醫療院所之協助。
              </p>

              <h5 style={{ color: 'var(--accent-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>
                3. 無特定成效之保證與自主決策責任
              </h5>
              <p>
                我們無法保證本站內容適用於每位個人的具體生理狀況，亦不對特定結果做任何保證。使用者依據測驗結果做出之決策，均由使用者自行承擔完整責任。
              </p>
            </div>
          )}

          {/* 3. 隱私權政策 */}
          {activeTab === 'privacy' && (
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px' }}>
                ✦ 個人隱私權保護政策 (Privacy Policy)
              </h4>
              <p style={{ marginBottom: '14px' }}>
                PERSONA 64 非常重視您的個人隱私權，並恪守個人資料保護法規（包括台灣《個人資料保護法》、歐盟 GDPR 及國際隱私標準規範）。
              </p>

              <h5 style={{ color: 'var(--accent-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>
                1. 未成年人保護條款 (Children's Privacy)
              </h5>
              <p style={{ marginBottom: '12px' }}>
                本服務面向一般大眾，建議年滿 18 歲（或具備完全行為能力）使用者使用。我們不會知情收集未滿 18 歲之敏感個資。
              </p>

              <h5 style={{ color: 'var(--accent-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>
                2. 我們收集的資料類型與收集方式
              </h5>
              <p style={{ marginBottom: '12px' }}>
                • <strong>作答資訊</strong>：60 題情境選項優先採用<strong>前端本機沙盒（LocalStorage）儲存機制</strong>，預設保存於瀏覽器中。<br />
                • <strong>金流資訊</strong>：付費交易由通過 PCI-DSS 認證之第三方金流加密處理，本站不存信用卡號。<br />
                • <strong>數據分析</strong>：包括匿名化 IP 與頁面互動數據，用於系統性能維護。
              </p>

              <h5 style={{ color: 'var(--accent-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>
                3. 用戶權利與資料清除 (Your Rights & Deletion)
              </h5>
              <p>
                您享有查詢、更正及請求刪除個人資料之權利。您可以透過「歷史紀錄」面板一鍵清空本地測驗紀錄，或隨時聯繫客服。
              </p>
            </div>
          )}

          {/* 4. 服務與退款條款 */}
          {activeTab === 'terms' && (
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px' }}>
                ✦ 服務條款與數位商品交付政策 (Terms of Service)
              </h4>
              <p style={{ marginBottom: '14px' }}>
                歡迎使用 PERSONA 64 平台。當您造訪、瀏覽或使用本網站之任何服務時，即代表您已閱讀、瞭解並同意遵守本條款。
              </p>

              <h5 style={{ color: 'var(--warning)', fontSize: '0.95rem', fontWeight: 700, marginTop: '18px', marginBottom: '8px' }}>
                1. 數位商品與消保法第 19 條退款規範（重大告知）
              </h5>
              <p style={{ marginBottom: '12px' }}>
                本網站所提供之付費進階解析報告、PDF 白皮書下載及相關付費解鎖內容，係屬<strong>「非以有形媒介提供之數位內容，或一經提供即為完成之線上即時服務」</strong>。
              </p>
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '14px',
                  fontSize: '0.88rem'
                }}
              >
                依據台灣《消費者保護法》第十九條第二項規定及行政院公布之《通訊交易解除權合理例外情事準用原則》第五條規定，本類商品<strong>經消費者事先同意始提供者，不適用消費者保護法七日猶豫期（七天鑑賞期）之無條件退貨退款規定</strong>。
              </div>

              <h5 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, marginTop: '18px', marginBottom: '8px' }}>
                2. 智慧財產權授權規範
              </h5>
              <p style={{ marginBottom: '12px' }}>
                本網站生成之個人人格海報與分析圖表，授權使用者進行個人非商業性質之社群分享（如 Instagram、Threads、Facebook）。嚴禁任何第三方在未經書面許可下，對本站之題庫、演算法、立繪圖片、專屬文本進行爬蟲抓取、反向工程或商業轉售。
              </p>
            </div>
          )}

          {/* 5. 智慧財產權與商標宣告 */}
          {activeTab === 'trademark' && (
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px' }}>
                ✦ 智慧財產權與第三方權益宣告 (Intellectual Property)
              </h4>
              <p style={{ marginBottom: '14px' }}>
                PERSONA 64 致力於維護原創性與尊重國際智慧財產權標準，特此就本平台之資產與第三方權益聲明如下：
              </p>

              <h5 style={{ color: 'var(--accent-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>
                1. PERSONA 64 原創資產之智慧財產權
              </h5>
              <p style={{ marginBottom: '12px' }}>
                本網站所包含之所有軟體程式碼、64 型心智動力學演算法、60 題原創測驗題庫、深度性格解析報告、64 款向量角色立繪、雷達圖表視覺設計、商標與網站排版，均由 PERSONA 64 獨立研究開發並享有完整的著作權與商標權保護。未經書面許可嚴禁爬蟲抓取、反向工程或商業轉售。
              </p>

              <h5 style={{ color: 'var(--accent-light)', fontSize: '0.95rem', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>
                2. 第三方商標與合理使用聲明
              </h5>
              <p style={{ marginBottom: '12px' }}>
                本平台所提及之心理學名詞與認知維度分類均源於公共領域之客觀學術研究。本服務上出現之所有其他名稱或標誌均為其各自權利人所有，本平台與任何第三方測驗機構無任何官方隸屬或授權關係。
              </p>
            </div>
          )}
        </div>

        {/* 底部 Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-glass)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
            © 2026 PERSONA 64 Dynamics · 版權所有
          </div>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
}
