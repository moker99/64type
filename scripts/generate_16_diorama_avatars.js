import fs from 'fs';
import path from 'path';

const avatarsDir = path.resolve('public/avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// 16 種完全獨立的 16Personalities 幾何低多邊形 (Low-poly) 角色 SVG
const PERSONAS_CONFIG = {
  // ================= 💜 紫色分析家 (Analysts) =================
  entj: {
    name: 'ENTJ 指揮官',
    title: 'The Commander',
    color: '#88619a',
    light: '#c084fc',
    bg: '#f5f3ff',
    renderFigure: () => `
      <!-- ENTJ: 金冠女統帥/指揮官手握寶劍與指揮棒 -->
      <!-- 披風 -->
      <polygon points="100,260 70,160 150,130 230,160 200,260" fill="#581c87" />
      <polygon points="100,260 85,190 150,150 215,190 200,260" fill="#6b21a8" />
      <!-- 身軀西裝 -->
      <polygon points="120,150 180,150 170,250 130,250" fill="#7e22ce" stroke="#3b0764" stroke-width="2" />
      <polygon points="135,150 165,150 150,195" fill="#f8fafc" />
      <polygon points="146,150 154,150 150,185" fill="#c084fc" />
      <!-- 頭部 (幾何幾何低面) -->
      <polygon points="125,90 175,90 180,135 150,150 120,135" fill="#fde68a" stroke="#d97706" stroke-width="1.5" />
      <polygon points="120,85 150,65 180,85 175,105 125,105" fill="#4c1d95" />
      <!-- 金色皇冠 -->
      <polygon points="130,70 138,45 150,60 162,45 170,70 130,70" fill="#fbbf24" stroke="#b45309" stroke-width="2" />
      <circle cx="150" cy="55" r="3.5" fill="#ef4444" />
      <!-- 霸氣五官 -->
      <polygon points="134,110 144,112 134,114" fill="#3b0764" />
      <polygon points="166,110 156,112 166,114" fill="#3b0764" />
      <line x1="144" y1="134" x2="156" y2="134" stroke="#3b0764" stroke-width="2.5" stroke-linecap="round" />
      <!-- 手持指揮寶劍 -->
      <line x1="225" y1="130" x2="225" y2="245" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" />
      <rect x="212" y="150" width="26" height="6" rx="2" fill="#fbbf24" />
      <circle cx="225" cy="248" r="5" fill="#fbbf24" />
    `
  },

  intj: {
    name: 'INTJ 建築師',
    title: 'The Architect',
    color: '#88619a',
    light: '#a855f7',
    bg: '#f5f3ff',
    renderFigure: () => `
      <!-- INTJ: 方框眼鏡白髮智者手持藍圖與棋盤 -->
      <polygon points="115,150 185,150 175,255 125,255" fill="#3b0764" />
      <polygon points="130,150 170,150 150,190" fill="#9333ea" />
      <!-- 頭部與幾何白灰髮 -->
      <polygon points="115,85 150,60 185,85 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="110,90 130,65 150,60 170,65 190,90 175,80 150,75 125,80" fill="#e2e8f0" />
      <!-- 方框眼鏡 -->
      <rect x="126" y="105" width="20" height="14" rx="2" fill="none" stroke="#1e1b4b" stroke-width="3" />
      <rect x="154" y="105" width="20" height="14" rx="2" fill="none" stroke="#1e1b4b" stroke-width="3" />
      <line x1="146" y1="112" x2="154" y2="112" stroke="#1e1b4b" stroke-width="3" />
      <!-- 沉思表情 -->
      <line x1="145" y1="130" x2="155" y2="130" stroke="#1e1b4b" stroke-width="2" />
      <!-- 建築藍圖卷軸 -->
      <polygon points="60,170 100,145 115,225 75,250" fill="#38bdf8" stroke="#0284c7" stroke-width="2" />
      <line x1="75" y1="180" x2="95" y2="170" stroke="#ffffff" stroke-width="2" stroke-dasharray="3,2" />
      <line x1="80" y1="200" x2="100" y2="190" stroke="#ffffff" stroke-width="2" stroke-dasharray="3,2" />
      <!-- 西洋棋子 -->
      <polygon points="215,200 230,170 245,200 240,240 220,240" fill="#581c87" />
      <circle cx="230" cy="165" r="5" fill="#fbbf24" />
    `
  },

  entp: {
    name: 'ENTP 辯論家',
    title: 'The Debater',
    color: '#88619a',
    light: '#9333ea',
    bg: '#f5f3ff',
    renderFigure: () => `
      <!-- ENTP: 講台前自信手勢與演說麥克風 -->
      <polygon points="120,150 180,150 170,255 130,255" fill="#6b21a8" />
      <polygon points="135,150 165,150 150,195" fill="#38bdf8" />
      <!-- 頭部與向上俏皮紫髮 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="120,95 135,60 155,55 175,70 185,95 170,85 150,80 130,85" fill="#3b0764" />
      <!-- 犀利自信眼神與歪嘴笑 -->
      <circle cx="140" cy="112" r="3" fill="#1e1b4b" />
      <circle cx="162" cy="112" r="3" fill="#1e1b4b" />
      <path d="M142 130 Q155 138 162 128" fill="none" stroke="#1e1b4b" stroke-width="2.5" stroke-linecap="round" />
      <!-- 演說講台與麥克風 -->
      <polygon points="55,190 95,190 90,260 60,260" fill="#475569" />
      <circle cx="75" cy="175" r="10" fill="#94a3b8" />
      <line x1="75" y1="185" x2="75" y2="190" stroke="#0f172a" stroke-width="3" />
      <!-- 手勢指向前方 -->
      <polygon points="180,170 230,140 235,155 185,185" fill="#fde68a" />
    `
  },

  intp: {
    name: 'INTP 邏輯學家',
    title: 'The Logician',
    color: '#88619a',
    light: '#7e22ce',
    bg: '#f5f3ff',
    renderFigure: () => `
      <!-- INTP: 白袍研究者手持發光化學燒瓶與懸浮原子 -->
      <polygon points="115,150 185,150 190,260 110,260" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
      <polygon points="135,150 165,150 150,210" fill="#9333ea" />
      <!-- 頭部與微亂黑髮圓眼鏡 -->
      <polygon points="125,95 175,95 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="115,95 125,65 150,60 175,65 185,95 175,80 150,75 125,80" fill="#1e1b4b" />
      <!-- 圓形眼鏡 -->
      <circle cx="138" cy="112" r="9" fill="none" stroke="#1e1b4b" stroke-width="2.5" />
      <circle cx="162" cy="112" r="9" fill="none" stroke="#1e1b4b" stroke-width="2.5" />
      <line x1="147" y1="112" x2="153" y2="112" stroke="#1e1b4b" stroke-width="2.5" />
      <!-- 化學燒瓶 -->
      <polygon points="70,180 80,180 80,195 95,230 55,230 70,195" fill="#c084fc" stroke="#581c87" stroke-width="2" />
      <circle cx="75" cy="215" r="4" fill="#ffffff" opacity="0.8" />
      <!-- 懸浮原子模型 -->
      <circle cx="225" cy="170" r="6" fill="#fbbf24" />
      <ellipse cx="225" cy="170" rx="20" ry="8" fill="none" stroke="#38bdf8" stroke-width="2" transform="rotate(30 225 170)" />
      <ellipse cx="225" cy="170" rx="20" ry="8" fill="none" stroke="#ec4899" stroke-width="2" transform="rotate(-30 225 170)" />
    `
  },

  // ================= 💚 綠色外交家 (Diplomats) =================
  infj: {
    name: 'INFJ 提倡者',
    title: 'The Advocate',
    color: '#33a474',
    light: '#4ade80',
    bg: '#f0fdf4',
    renderFigure: () => `
      <!-- INFJ: 綠色連帽長袍、白鬚智慧導師手握水晶法杖 -->
      <polygon points="105,150 195,150 210,260 90,260" fill="#047857" />
      <polygon points="135,150 165,150 150,220" fill="#10b981" />
      <!-- 幾何連帽長袍 -->
      <polygon points="115,85 150,55 185,85 185,145 150,165 115,145" fill="#065f46" />
      <polygon points="125,95 175,95 170,135 150,145 130,135" fill="#fde68a" />
      <!-- 白色長鬍鬚 -->
      <polygon points="135,130 165,130 150,180" fill="#f8fafc" />
      <circle cx="140" cy="115" r="2.5" fill="#064e3b" />
      <circle cx="160" cy="115" r="2.5" fill="#064e3b" />
      <!-- 水晶木杖與明燈 -->
      <line x1="70" y1="80" x2="70" y2="260" stroke="#78350f" stroke-width="6" stroke-linecap="round" />
      <polygon points="60,75 70,50 80,75 70,95" fill="#34d399" stroke="#059669" stroke-width="2" />
      <circle cx="70" cy="72" r="5" fill="#ffffff" />
    `
  },

  infp: {
    name: 'INFP 調停者',
    title: 'The Mediator',
    color: '#33a474',
    light: '#86efac',
    bg: '#f0fdf4',
    renderFigure: () => `
      <!-- INFP: 盤腿冥想的綠袍花環少女、手托發光蝴蝶 -->
      <polygon points="115,155 185,155 175,230 125,230" fill="#059669" />
      <polygon points="90,230 210,230 190,260 110,260" fill="#047857" />
      <!-- 頭部與長捲髮 -->
      <polygon points="125,95 175,95 175,140 150,150 125,140" fill="#fde68a" />
      <polygon points="115,95 130,65 150,60 170,65 185,95 195,140 175,135 150,135 125,135 105,140" fill="#065f46" />
      <!-- 繽紛花環 -->
      <circle cx="130" cy="72" r="6" fill="#f472b6" />
      <circle cx="145" cy="68" r="6" fill="#fbbf24" />
      <circle cx="160" cy="68" r="6" fill="#60a5fa" />
      <circle cx="172" cy="72" r="6" fill="#f472b6" />
      <!-- 恬靜閉眼微笑 -->
      <path d="M135 115 Q140 118 145 115" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <path d="M155 115 Q160 118 165 115" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <path d="M145 132 Q150 137 155 132" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <!-- 手托綠色發光蝴蝶 -->
      <polygon points="220,170 235,155 240,170 230,175" fill="#34d399" />
      <polygon points="220,170 235,185 240,170 230,175" fill="#34d399" />
      <circle cx="220" cy="170" r="3" fill="#fbbf24" />
    `
  },

  enfj: {
    name: 'ENFJ 主人公',
    title: 'The Protagonist',
    color: '#33a474',
    light: '#22c55e',
    bg: '#f0fdf4',
    renderFigure: () => `
      <!-- ENFJ: 英雄姿態手握指引火炬與號召手勢 -->
      <polygon points="115,150 185,150 175,255 125,255" fill="#047857" />
      <polygon points="135,150 165,150 150,200" fill="#fbbf24" />
      <!-- 頭部與自信短髮 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="115,95 130,65 150,60 170,65 185,95 175,80 150,75 125,80" fill="#064e3b" />
      <!-- 英雄桂冠 -->
      <path d="M125 75 Q150 65 175 75" fill="none" stroke="#fbbf24" stroke-width="4" stroke-linecap="round" />
      <!-- 眼神微笑 -->
      <circle cx="140" cy="112" r="3" fill="#064e3b" />
      <circle cx="162" cy="112" r="3" fill="#064e3b" />
      <path d="M142 130 Q150 138 158 130" fill="none" stroke="#064e3b" stroke-width="2.5" stroke-linecap="round" />
      <!-- 燃燒指引火炬 -->
      <polygon points="225,160 235,230 215,230" fill="#78350f" />
      <polygon points="215,160 225,120 235,160 225,145" fill="#f97316" />
      <polygon points="220,160 225,135 230,160" fill="#fde047" />
    `
  },

  enfp: {
    name: 'ENFP 競選者',
    title: 'The Campaigner',
    color: '#33a474',
    light: '#34d399',
    bg: '#f0fdf4',
    renderFigure: () => `
      <!-- ENFP: 活潑跳躍手握彩帶與歡欣氣球 -->
      <polygon points="120,150 180,150 170,250 130,250" fill="#10b981" />
      <polygon points="135,150 165,150 150,195" fill="#f59e0b" />
      <!-- 頭部與活潑捲髮 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="110,95 125,60 150,55 175,60 190,95 180,80 150,75 120,80" fill="#92400e" />
      <!-- 快樂眨眼與燦笑 -->
      <path d="M135 110 Q140 115 145 110" fill="none" stroke="#064e3b" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="162" cy="112" r="3" fill="#064e3b" />
      <path d="M140 128 Q150 142 160 128" fill="#f8fafc" stroke="#064e3b" stroke-width="2" />
      <!-- 漂浮氣球與星光彩帶 -->
      <ellipse cx="235" cy="85" rx="18" ry="22" fill="#f43f5e" />
      <line x1="235" y1="107" x2="225" y2="160" stroke="#94a3b8" stroke-width="2" />
      <polygon points="65,130 75,120 85,130 75,140" fill="#fbbf24" />
      <polygon points="210,180 218,172 226,180 218,188" fill="#38bdf8" />
    `
  },

  // ================= 💙 藍色守護者 (Sentinels) =================
  estj: {
    name: 'ESTJ 總經理',
    title: 'The Executive',
    color: '#4298b4',
    light: '#38bdf8',
    bg: '#f0f9ff',
    renderFigure: () => `
      <!-- ESTJ: 筆挺商務西裝、手持公文夾板與打勾筆 -->
      <polygon points="115,150 185,150 175,255 125,255" fill="#0284c7" />
      <polygon points="135,150 165,150 150,210" fill="#ffffff" />
      <polygon points="146,150 154,150 150,195" fill="#0369a1" />
      <!-- 頭部與俐落幹練黑髮 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="115,95 130,65 150,60 170,65 185,95 175,80 150,75 125,80" fill="#0f172a" />
      <!-- 堅毅五官 -->
      <circle cx="140" cy="112" r="3" fill="#0f172a" />
      <circle cx="162" cy="112" r="3" fill="#0f172a" />
      <line x1="142" y1="130" x2="158" y2="130" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
      <!-- 雙手夾板與筆 -->
      <rect x="55" y="150" width="36" height="50" rx="3" fill="#38bdf8" stroke="#0369a1" stroke-width="2" />
      <rect x="66" y="145" width="14" height="8" rx="2" fill="#64748b" />
      <line x1="63" y1="165" x2="83" y2="165" stroke="#ffffff" stroke-width="2" />
      <line x1="63" y1="175" x2="83" y2="175" stroke="#ffffff" stroke-width="2" />
      <line x1="63" y1="185" x2="75" y2="185" stroke="#ffffff" stroke-width="2" />
      <rect x="210" y="150" width="36" height="50" rx="3" fill="#38bdf8" stroke="#0369a1" stroke-width="2" />
    `
  },

  istj: {
    name: 'ISTJ 物流師',
    title: 'The Logistician',
    color: '#4298b4',
    light: '#60a5fa',
    bg: '#f0f9ff',
    renderFigure: () => `
      <!-- ISTJ: 深藍西裝手持厚重皮革手帳與金屬筆 -->
      <polygon points="115,150 185,150 175,255 125,255" fill="#0369a1" />
      <polygon points="135,150 165,150 150,205" fill="#f8fafc" />
      <!-- 頭部與方框黑眼鏡 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="118,90 135,65 150,62 165,65 182,90 175,80 150,75 125,80" fill="#1e293b" />
      <!-- 方框眼鏡 -->
      <rect x="128" y="108" width="18" height="12" rx="2" fill="none" stroke="#0f172a" stroke-width="2.5" />
      <rect x="154" y="108" width="18" height="12" rx="2" fill="none" stroke="#0f172a" stroke-width="2.5" />
      <line x1="146" y1="114" x2="154" y2="114" stroke="#0f172a" stroke-width="2.5" />
      <!-- 精裝手帳 -->
      <rect x="210" y="155" width="40" height="55" rx="4" fill="#78350f" stroke="#451a03" stroke-width="2" />
      <line x1="218" y1="155" x2="218" y2="210" stroke="#fbbf24" stroke-width="2" />
    `
  },

  esfj: {
    name: 'ESFJ 執政官',
    title: 'The Consul',
    color: '#4298b4',
    light: '#7dd3fc',
    bg: '#f0f9ff',
    renderFigure: () => `
      <!-- ESFJ: 親切套裝、手端精緻迎賓茶盤與熱茶 -->
      <polygon points="115,150 185,150 175,255 125,255" fill="#0284c7" />
      <polygon points="135,150 165,150 150,195" fill="#bae6fd" />
      <!-- 頭部與溫婉捲髮 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="110,95 125,65 150,60 175,65 190,95 195,130 175,120 125,120 105,130" fill="#334155" />
      <circle cx="140" cy="112" r="3" fill="#0f172a" />
      <circle cx="162" cy="112" r="3" fill="#0f172a" />
      <path d="M142 128 Q150 138 158 128" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
      <!-- 迎賓茶托盤與茶杯 -->
      <ellipse cx="70" cy="180" rx="24" ry="7" fill="#cbd5e1" stroke="#64748b" stroke-width="2" />
      <polygon points="60,170 80,170 76,182 64,182" fill="#38bdf8" />
      <path d="M68 165 Q70 158 68 153" fill="none" stroke="#94a3b8" stroke-width="1.5" />
      <path d="M72 165 Q74 158 72 153" fill="none" stroke="#94a3b8" stroke-width="1.5" />
    `
  },

  isfj: {
    name: 'ISFJ 守衛者',
    title: 'The Defender',
    color: '#4298b4',
    light: '#93c5fd',
    bg: '#f0f9ff',
    renderFigure: () => `
      <!-- ISFJ: 靠在黃色月亮上的沉穩守護者、手持愛心盾牌 -->
      <polygon points="115,150 185,150 175,255 125,255" fill="#075985" />
      <polygon points="135,150 165,150 150,205" fill="#93c5fd" />
      <!-- 頭部與溫柔短髮 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="115,95 130,65 150,60 170,65 185,95 175,80 150,75 125,80" fill="#475569" />
      <!-- 溫暖安心閉眼 -->
      <path d="M135 112 Q140 116 145 112" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
      <path d="M155 112 Q160 116 165 112" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
      <path d="M144 130 Q150 135 156 130" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
      <!-- 守護愛心盾牌 -->
      <polygon points="55,160 85,160 85,195 70,225 55,195" fill="#38bdf8" stroke="#0284c7" stroke-width="2" />
      <circle cx="70" cy="180" r="6" fill="#ef4444" />
    `
  },

  // ================= 💛 黃色探險家 (Explorers) =================
  estp: {
    name: 'ESTP 企業家',
    title: 'The Entrepreneur',
    color: '#e4ae3a',
    light: '#facc15',
    bg: '#fefce8',
    renderFigure: () => `
      <!-- ESTP: 酷炫墨鏡、金黃夾克手持冠軍獎盃 -->
      <polygon points="115,150 185,150 175,255 125,255" fill="#ca8a04" />
      <polygon points="135,150 165,150 150,205" fill="#0f172a" />
      <!-- 頭部與帥氣刺蝟髮型 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="115,90 120,60 135,50 150,55 165,50 180,60 185,90" fill="#713f12" />
      <!-- 酷炫黑色墨鏡 -->
      <polygon points="128,106 146,106 143,122 131,122" fill="#0f172a" />
      <polygon points="154,106 172,106 169,122 157,122" fill="#0f172a" />
      <line x1="146" y1="112" x2="154" y2="112" stroke="#0f172a" stroke-width="2" />
      <!-- 自信笑 -->
      <path d="M142 130 Q155 138 162 128" fill="none" stroke="#713f12" stroke-width="2.5" stroke-linecap="round" />
      <!-- 破局金盃 -->
      <polygon points="215,160 245,160 238,190 230,205 230,225 215,225" fill="#eab308" stroke="#a16207" stroke-width="2" />
      <circle cx="230" cy="155" r="4" fill="#fef08a" />
    `
  },

  istp: {
    name: 'ISTP 鑑賞家',
    title: 'The Virtuoso',
    color: '#e4ae3a',
    light: '#fbbf24',
    bg: '#fefce8',
    renderFigure: () => `
      <!-- ISTP: 頭頂護目鏡手持萬用工具扳手 -->
      <polygon points="115,150 185,150 175,255 125,255" fill="#d97706" />
      <polygon points="135,150 165,150 150,210" fill="#475569" />
      <!-- 頭部與護目鏡 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="118,90 135,65 150,62 165,65 182,90 175,80 150,75 125,80" fill="#451a03" />
      <!-- 護目鏡鏡片 -->
      <rect x="128" y="78" width="18" height="10" rx="3" fill="#38bdf8" stroke="#0f172a" stroke-width="2" />
      <rect x="154" y="78" width="18" height="10" rx="3" fill="#38bdf8" stroke="#0f172a" stroke-width="2" />
      <line x1="146" y1="83" x2="154" y2="83" stroke="#0f172a" stroke-width="2" />
      <circle cx="140" cy="112" r="3" fill="#0f172a" />
      <circle cx="162" cy="112" r="3" fill="#0f172a" />
      <line x1="144" y1="130" x2="156" y2="130" stroke="#0f172a" stroke-width="2" />
      <!-- 金屬扳手 -->
      <polygon points="60,160 75,145 85,155 70,225 55,220" fill="#94a3b8" stroke="#475569" stroke-width="2" />
      <circle cx="68" cy="153" r="4" fill="#334155" />
    `
  },

  esfp: {
    name: 'ESFP 表演者',
    title: 'The Entertainer',
    color: '#e4ae3a',
    light: '#fde047',
    bg: '#fefce8',
    renderFigure: () => `
      <!-- ESFP: 耀眼金黃洋裝手捧花束、舞台聚光燈熱情揮手 -->
      <polygon points="115,150 185,150 200,255 100,255" fill="#eab308" />
      <polygon points="135,150 165,150 150,195" fill="#fef08a" />
      <!-- 頭部與大波浪棕髮 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="105,95 125,65 150,60 175,65 195,95 200,140 175,125 125,125 100,140" fill="#9a3412" />
      <!-- 燦爛眨眼與笑容 -->
      <circle cx="138" cy="112" r="3" fill="#451a03" />
      <path d="M156 110 Q162 115 168 110" fill="none" stroke="#451a03" stroke-width="2.5" stroke-linecap="round" />
      <path d="M140 128 Q150 142 160 128" fill="#f8fafc" stroke="#451a03" stroke-width="2" />
      <!-- 捧著禮物花束揮手 -->
      <rect x="205" y="160" width="35" height="35" rx="3" fill="#ffffff" stroke="#eab308" stroke-width="2" />
      <line x1="222" y1="160" x2="222" y2="195" stroke="#f97316" stroke-width="2" />
      <circle cx="215" cy="150" r="7" fill="#fbbf24" />
      <circle cx="230" cy="148" r="7" fill="#f472b6" />
      <circle cx="222" cy="142" r="7" fill="#fbbf24" />
    `
  },

  isfp: {
    name: 'ISFP 探險家',
    title: 'The Adventurer',
    color: '#e4ae3a',
    light: '#fef08a',
    bg: '#fefce8',
    renderFigure: () => `
      <!-- ISFP: 貝雷帽畫家少女在畫架前手握調色盤與畫筆 -->
      <polygon points="115,150 185,150 190,255 110,255" fill="#ca8a04" />
      <polygon points="135,150 165,150 150,195" fill="#fde047" />
      <!-- 頭部與貝雷帽 -->
      <polygon points="125,90 175,90 175,135 150,148 125,135" fill="#fde68a" />
      <polygon points="115,95 125,65 150,60 175,65 185,95 175,80 150,75 125,80" fill="#854d0e" />
      <!-- 黃色貝雷帽 -->
      <polygon points="115,75 150,45 185,75 175,85 125,85" fill="#eab308" stroke="#a16207" stroke-width="2" />
      <circle cx="150" cy="50" r="3" fill="#a16207" />
      <circle cx="140" cy="112" r="3" fill="#451a03" />
      <circle cx="162" cy="112" r="3" fill="#451a03" />
      <path d="M142 128 Q150 136 158 128" fill="none" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
      <!-- 畫架與調色盤 -->
      <polygon points="215,150 245,150 255,250 205,250" fill="#78350f" stroke="#451a03" stroke-width="2" />
      <rect x="210" y="160" width="30" height="24" rx="2" fill="#ffffff" />
      <!-- 調色盤 -->
      <ellipse cx="65" cy="180" rx="18" ry="12" fill="#d97706" stroke="#92400e" stroke-width="2" />
      <circle cx="58" cy="178" r="3" fill="#ef4444" />
      <circle cx="66" cy="174" r="3" fill="#38bdf8" />
      <circle cx="72" cy="182" r="3" fill="#22c55e" />
    `
  }
};

function generate16PersonalitiesDioramaSvg(code, cfg) {
  const codeUpper = code.toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <defs>
    <linearGradient id="pedestalTop_${code}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>
    <linearGradient id="pedestalSide_${code}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>
    <filter id="dioramaShadow_${code}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- 幾何柔和背景光圈 -->
  <circle cx="150" cy="150" r="140" fill="${cfg.bg}" stroke="${cfg.color}" stroke-width="3" />
  <circle cx="150" cy="135" r="95" fill="${cfg.color}" opacity="0.1" />

  <!-- 3D 浮空基座 (3D Hexagonal Floating Pedestal) -->
  <g filter="url(#dioramaShadow_${code})">
    <!-- 基座側面 -->
    <polygon points="50,230 150,255 250,230 250,250 150,275 50,250" fill="url(#pedestalSide_${code})" />
    <polygon points="150,255 250,230 250,250 150,275" fill="#64748b" opacity="0.3" />
    <!-- 基座頂面 -->
    <polygon points="150,205 250,230 150,255 50,230" fill="url(#pedestalTop_${code})" stroke="#ffffff" stroke-width="2" />
    
    <!-- 基座上的小碎石裝飾 -->
    <polygon points="75,235 85,232 90,238 80,240" fill="#94a3b8" />
    <polygon points="220,234 230,232 232,238 222,239" fill="#94a3b8" />
  </g>

  <!-- 16Personalities 專屬低多邊形幾何角色立繪 -->
  <g id="character_${code}">
    ${cfg.renderFigure()}
  </g>

  <!-- 標誌性頭頂對話泡泡 (16P Signature Speech Bubble Tag) -->
  <g transform="translate(0, -6)">
    <!-- 泡泡陰影 -->
    <path d="M100 24 Q100 12 115 12 L185 12 Q200 12 200 24 L200 36 Q200 48 185 48 L158 48 L150 56 L142 48 L115 48 Q100 48 100 36 Z" fill="${cfg.color}" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))" />
    <!-- 泡泡文字 -->
    <text x="150" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">${codeUpper}</text>
  </g>
</svg>`;
}

Object.entries(PERSONAS_CONFIG).forEach(([code, cfg]) => {
  const svgContent = generate16PersonalitiesDioramaSvg(code, cfg);
  const filePath = path.join(avatarsDir, `${code}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
  console.log(`✅ Generated 16P Diorama: ${filePath}`);
});

console.log('🎉 16 尊獨立專屬 16Personalities 低多邊形浮空基座立繪生成完畢！');
