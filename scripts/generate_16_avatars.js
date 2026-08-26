import fs from 'fs';
import path from 'path';

const avatarsDir = path.resolve('public/avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// 16 種類型專屬配置與 SVG 向量繪製
const TYPES_CONFIG = {
  // 紫色分析家 (NT)
  entj: {
    name: 'ENTJ 指揮官',
    color: '#88619a',
    lightColor: '#c084fc',
    bg: '#f3e8ff',
    prop: 'crown_sword',
    hairColor: '#312e81',
    outfit: '#581c87'
  },
  intj: {
    name: 'INTJ 建築師',
    color: '#88619a',
    lightColor: '#a855f7',
    bg: '#f3e8ff',
    prop: 'blueprint_chess',
    hairColor: '#4338ca',
    outfit: '#3b0764'
  },
  entp: {
    name: 'ENTP 辯論家',
    color: '#88619a',
    lightColor: '#9333ea',
    bg: '#f3e8ff',
    prop: 'mic_gesture',
    hairColor: '#4c1d95',
    outfit: '#6b21a8'
  },
  intp: {
    name: 'INTP 邏輯學家',
    color: '#88619a',
    lightColor: '#7e22ce',
    bg: '#f3e8ff',
    prop: 'flask_atom',
    hairColor: '#3730a3',
    outfit: '#5b21b6'
  },

  // 綠色外交家 (NF)
  infj: {
    name: 'INFJ 提倡者',
    color: '#33a474',
    lightColor: '#4ade80',
    bg: '#ecfdf5',
    prop: 'hood_lantern',
    hairColor: '#064e3b',
    outfit: '#047857'
  },
  infp: {
    name: 'INFP 調停者',
    color: '#33a474',
    lightColor: '#86efac',
    bg: '#ecfdf5',
    prop: 'flower_quill',
    hairColor: '#78350f',
    outfit: '#059669'
  },
  enfj: {
    name: 'ENFJ 主人公',
    color: '#33a474',
    lightColor: '#22c55e',
    bg: '#ecfdf5',
    prop: 'torch_hero',
    hairColor: '#14532d',
    outfit: '#047857'
  },
  enfp: {
    name: 'ENFP 競選者',
    color: '#33a474',
    lightColor: '#34d399',
    bg: '#ecfdf5',
    prop: 'balloon_spark',
    hairColor: '#92400e',
    outfit: '#10b981'
  },

  // 藍色守護者 (SJ)
  estj: {
    name: 'ESTJ 總經理',
    color: '#4298b4',
    lightColor: '#38bdf8',
    bg: '#e0f2fe',
    prop: 'clipboard_suit',
    hairColor: '#1e293b',
    outfit: '#0284c7'
  },
  istj: {
    name: 'ISTJ 物流師',
    color: '#4298b4',
    lightColor: '#60a5fa',
    bg: '#e0f2fe',
    prop: 'ledger_glasses',
    hairColor: '#0f172a',
    outfit: '#0369a1'
  },
  esfj: {
    name: 'ESFJ 執政官',
    color: '#4298b4',
    lightColor: '#7dd3fc',
    bg: '#e0f2fe',
    prop: 'teacup_welcome',
    hairColor: '#334155',
    outfit: '#0284c7'
  },
  isfj: {
    name: 'ISFJ 守衛者',
    color: '#4298b4',
    lightColor: '#93c5fd',
    bg: '#e0f2fe',
    prop: 'shield_medical',
    hairColor: '#475569',
    outfit: '#075985'
  },

  // 黃色探險家 (SP)
  estp: {
    name: 'ESTP 企業家',
    color: '#e4ae3a',
    lightColor: '#facc15',
    bg: '#fefce8',
    prop: 'sunglass_trophy',
    hairColor: '#713f12',
    outfit: '#ca8a04'
  },
  istp: {
    name: 'ISTP 鑑賞家',
    color: '#e4ae3a',
    lightColor: '#fbbf24',
    bg: '#fefce8',
    prop: 'goggle_wrench',
    hairColor: '#451a03',
    outfit: '#d97706'
  },
  esfp: {
    name: 'ESFP 表演者',
    color: '#e4ae3a',
    lightColor: '#fde047',
    bg: '#fefce8',
    prop: 'stage_mic_star',
    hairColor: '#9a3412',
    outfit: '#eab308'
  },
  isfp: {
    name: 'ISFP 探險家',
    color: '#e4ae3a',
    lightColor: '#fef08a',
    bg: '#fefce8',
    prop: 'guitar_palette',
    hairColor: '#854d0e',
    outfit: '#d97706'
  }
};

function renderSvgProp(prop, type) {
  switch (prop) {
    case 'crown_sword':
      return `
        <!-- ENTJ: 皇冠與寶劍 -->
        <path d="M125 70 L135 48 L150 62 L165 48 L175 70 Z" fill="#fbbf24" stroke="#d97706" stroke-width="3" />
        <circle cx="150" cy="58" r="4" fill="#ef4444" />
        <!-- 寶劍 -->
        <rect x="220" y="140" width="8" height="90" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="2" />
        <rect x="208" y="155" width="32" height="6" rx="2" fill="#fbbf24" stroke="#d97706" stroke-width="2" />
        <circle cx="224" cy="235" r="6" fill="#fbbf24" />
      `;
    case 'blueprint_chess':
      return `
        <!-- INTJ: 建築藍圖與西洋棋 -->
        <!-- 眼鏡 -->
        <rect x="126" y="110" width="20" height="12" rx="3" fill="none" stroke="#1e1b4b" stroke-width="3"/>
        <rect x="154" y="110" width="20" height="12" rx="3" fill="none" stroke="#1e1b4b" stroke-width="3"/>
        <line x1="146" y1="116" x2="154" y2="116" stroke="#1e1b4b" stroke-width="3"/>
        <!-- 藍圖卷軸 -->
        <rect x="60" y="160" width="40" height="70" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="2" transform="rotate(-15 60 160)"/>
        <line x1="68" y1="175" x2="92" y2="175" stroke="#ffffff" stroke-width="2" stroke-dasharray="3,2" transform="rotate(-15 60 160)"/>
        <!-- 棋子 -->
        <path d="M220 180 L230 165 L240 180 L235 210 L225 210 Z" fill="#4c1d95" stroke="#2e1065" stroke-width="2" />
      `;
    case 'mic_gesture':
      return `
        <!-- ENTP: 麥克風與辯論演說手勢 -->
        <line x1="220" y1="160" x2="245" y2="135" stroke="#fbbf24" stroke-width="3"/>
        <circle cx="70" cy="165" r="14" fill="#475569" stroke="#1e293b" stroke-width="2"/>
        <rect x="67" y="179" width="6" height="30" rx="2" fill="#0f172a" />
        <path d="M62 165 C62 155 78 155 78 165" fill="none" stroke="#94a3b8" stroke-width="2" />
        <!-- 領帶/標誌 -->
        <polygon points="150,150 144,190 150,205 156,190" fill="#38bdf8" />
      `;
    case 'flask_atom':
      return `
        <!-- INTP: 化學燒瓶與原子軌道 -->
        <!-- 眼鏡 -->
        <circle cx="136" cy="115" r="9" fill="none" stroke="#312e81" stroke-width="3" />
        <circle cx="164" cy="115" r="9" fill="none" stroke="#312e81" stroke-width="3" />
        <line x1="145" y1="115" x2="155" y2="115" stroke="#312e81" stroke-width="3" />
        <!-- 燒瓶 -->
        <path d="M75 160 L85 160 L85 175 L98 205 C100 210 95 215 90 215 L70 215 C65 215 60 210 62 205 L75 175 Z" fill="#c084fc" stroke="#581c87" stroke-width="2" />
        <circle cx="80" cy="195" r="4" fill="#ffffff" opacity="0.8"/>
        <!-- 原子環 -->
        <ellipse cx="225" cy="165" rx="18" ry="8" fill="none" stroke="#38bdf8" stroke-width="2" transform="rotate(30 225 165)" />
        <ellipse cx="225" cy="165" rx="18" ry="8" fill="none" stroke="#ec4899" stroke-width="2" transform="rotate(-30 225 165)" />
        <circle cx="225" cy="165" r="5" fill="#fbbf24" />
      `;
    case 'hood_lantern':
      return `
        <!-- INFJ: 綠袍連帽與明燈 -->
        <!-- 木杖與燈 -->
        <path d="M70 70 L65 240" stroke="#78350f" stroke-width="6" stroke-linecap="round" />
        <path d="M70 70 Q85 80 85 95 L85 115" stroke="#78350f" stroke-width="4" fill="none" />
        <!-- 吊燈 -->
        <rect x="76" y="115" width="18" height="24" rx="3" fill="#fbbf24" stroke="#b45309" stroke-width="2" />
        <polygon points="73,115 85,105 97,115" fill="#78350f" />
        <circle cx="85" cy="127" r="5" fill="#ffffff" />
      `;
    case 'flower_quill':
      return `
        <!-- INFP: 花環與羽毛筆 -->
        <!-- 頭頂花環 -->
        <circle cx="130" cy="72" r="6" fill="#f472b6" />
        <circle cx="143" cy="68" r="6" fill="#fbbf24" />
        <circle cx="157" cy="68" r="6" fill="#60a5fa" />
        <circle cx="170" cy="72" r="6" fill="#f472b6" />
        <!-- 羽毛筆 -->
        <path d="M225 140 Q245 160 220 215 L215 215 Q228 175 225 140" fill="#34d399" stroke="#059669" stroke-width="2" />
        <!-- 手中花朵 -->
        <circle cx="75" cy="180" r="10" fill="#f472b6" />
        <circle cx="75" cy="180" r="4" fill="#fbbf24" />
        <line x1="75" y1="190" x2="75" y2="220" stroke="#059669" stroke-width="3" />
      `;
    case 'torch_hero':
      return `
        <!-- ENFJ: 英雄火炬與桂冠 -->
        <path d="M125 75 Q150 65 175 75" fill="none" stroke="#fbbf24" stroke-width="4" stroke-linecap="round" />
        <!-- 火炬 -->
        <path d="M225 160 L235 220 L220 220 Z" fill="#78350f" stroke="#451a03" stroke-width="2"/>
        <path d="M218 160 Q228 125 238 160 Q228 145 218 160" fill="#f97316" />
        <path d="M222 160 Q228 135 234 160" fill="#fde047" />
      `;
    case 'balloon_spark':
      return `
        <!-- ENFP: 靈感氣球與彩帶 -->
        <ellipse cx="230" cy="90" rx="16" ry="20" fill="#f43f5e" />
        <path d="M230 110 Q235 140 225 170" fill="none" stroke="#94a3b8" stroke-width="2" />
        <polygon points="145,150 155,150 150,185" fill="#f59e0b" />
        <!-- 星芒 -->
        <path d="M70 120 L75 110 L80 120 L90 125 L80 130 L75 140 L70 130 L60 125 Z" fill="#fbbf24" />
      `;
    case 'clipboard_suit':
      return `
        <!-- ESTJ: 商務背心與公文板 -->
        <polygon points="144,148 156,148 153,195 150,205 147,195" fill="#0284c7" />
        <!-- 公文夾板 -->
        <rect x="60" y="150" width="34" height="48" rx="3" fill="#38bdf8" stroke="#0369a1" stroke-width="2" />
        <rect x="70" y="145" width="14" height="8" rx="2" fill="#64748b" />
        <line x1="68" y1="162" x2="86" y2="162" stroke="#ffffff" stroke-width="2" />
        <line x1="68" y1="172" x2="86" y2="172" stroke="#ffffff" stroke-width="2" />
        <line x1="68" y1="182" x2="80" y2="182" stroke="#ffffff" stroke-width="2" />
      `;
    case 'ledger_glasses':
      return `
        <!-- ISTJ: 物流帳本與量尺 -->
        <!-- 方框眼鏡 -->
        <rect x="130" y="112" width="16" height="12" rx="2" fill="none" stroke="#0f172a" stroke-width="3"/>
        <rect x="154" y="112" width="16" height="12" rx="2" fill="none" stroke="#0f172a" stroke-width="3"/>
        <line x1="146" y1="118" x2="154" y2="118" stroke="#0f172a" stroke-width="3"/>
        <!-- 帳本 -->
        <rect x="210" y="155" width="38" height="52" rx="3" fill="#0284c7" stroke="#075985" stroke-width="2"/>
        <line x1="216" y1="155" x2="216" y2="207" stroke="#f8fafc" stroke-width="2"/>
      `;
    case 'teacup_welcome':
      return `
        <!-- ESFJ: 溫馨茶杯托盤 -->
        <ellipse cx="75" cy="185" rx="20" ry="6" fill="#cbd5e1" stroke="#64748b" stroke-width="2" />
        <path d="M63 175 C63 190 87 190 87 175 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
        <!-- 熱氣 -->
        <path d="M72 168 Q75 160 72 155" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
        <path d="M78 168 Q81 160 78 155" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      `;
    case 'shield_medical':
      return `
        <!-- ISFJ: 守護盾牌與愛心徽章 -->
        <path d="M60 150 L85 150 L85 185 Q85 205 72 215 Q60 205 60 185 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2" />
        <circle cx="72" cy="175" r="7" fill="#ffffff" />
        <path d="M70 175 L74 175 M72 173 L72 177" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
      `;
    case 'sunglass_trophy':
      return `
        <!-- ESTP: 墨鏡與破局金盃 -->
        <!-- 酷炫墨鏡 -->
        <polygon points="128,112 146,112 143,124 131,124" fill="#0f172a" />
        <polygon points="154,112 172,112 169,124 157,124" fill="#0f172a" />
        <line x1="146" y1="116" x2="154" y2="116" stroke="#0f172a" stroke-width="2"/>
        <!-- 獎盃 -->
        <path d="M215 160 L235 160 L230 185 Q225 195 225 205 L225 215 L220 215 L220 205 Q220 195 215 185 Z" fill="#eab308" stroke="#a16207" stroke-width="2" />
      `;
    case 'goggle_wrench':
      return `
        <!-- ISTP: 護目鏡與萬用扳手 -->
        <!-- 頭頂護目鏡 -->
        <rect x="130" y="80" width="18" height="10" rx="3" fill="#38bdf8" stroke="#0f172a" stroke-width="2" />
        <rect x="152" y="80" width="18" height="10" rx="3" fill="#38bdf8" stroke="#0f172a" stroke-width="2" />
        <!-- 扳手 -->
        <path d="M65 160 L75 150 Q85 160 80 170 L65 210 L55 205 L70 165 Z" fill="#94a3b8" stroke="#475569" stroke-width="2" />
      `;
    case 'stage_mic_star':
      return `
        <!-- ESFP: 舞台麥克風與星光 -->
        <circle cx="230" cy="155" r="12" fill="#eab308" stroke="#a16207" stroke-width="2"/>
        <rect x="227" y="167" width="6" height="32" rx="2" fill="#0f172a" />
        <path d="M60 110 L65 95 L70 110 L85 115 L70 120 L65 135 L60 120 L45 115 Z" fill="#facc15" />
      `;
    case 'guitar_palette':
      return `
        <!-- ISFP: 藝術畫家帽與吉他 -->
        <!-- 畫家貝雷帽 -->
        <path d="M125 78 Q150 55 175 78 Z" fill="#d97706" stroke="#92400e" stroke-width="2" />
        <circle cx="150" cy="62" r="3" fill="#d97706" />
        <!-- 木吉他 -->
        <path d="M60 160 Q75 150 70 180 Q85 190 75 220 Q55 225 50 200 Q55 175 60 160 Z" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <line x1="68" y1="165" x2="88" y2="125" stroke="#78350f" stroke-width="4" />
      `;
    default:
      return '';
  }
}

function generateSvgAvatar(code, cfg) {
  const codeUpper = code.toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad_${code}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${cfg.bg}" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <filter id="softShadow_${code}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="${cfg.color}" flood-opacity="0.15" />
    </filter>
  </defs>

  <!-- 圓形背景卡 -->
  <circle cx="150" cy="150" r="140" fill="url(#bgGrad_${code})" stroke="${cfg.color}" stroke-width="4" />

  <!-- 幾何背景光暈 -->
  <circle cx="150" cy="130" r="95" fill="${cfg.color}" opacity="0.08" />

  <!-- 角色身體與服裝 (16Personalities 經典 2D 扁平幾何) -->
  <g filter="url(#softShadow_${code})">
    <!-- 披肩/身體 -->
    <path d="M105 250 L100 165 Q150 140 200 165 L195 250 Z" fill="${cfg.outfit}" stroke="#1e1b4b" stroke-width="3" stroke-linejoin="round" />
    
    <!-- 領口/內襯襯衫 -->
    <polygon points="135,148 165,148 150,185" fill="#ffffff" stroke="#1e1b4b" stroke-width="2" />

    <!-- 頭部臉型 (16P 經典幾何方圓下巴) -->
    <path d="M118 100 L118 135 Q150 160 182 135 L182 100 Z" fill="#fde68a" stroke="#1e1b4b" stroke-width="3" stroke-linejoin="round" />

    <!-- 髮型 -->
    <path d="M112 105 Q115 70 150 70 Q185 70 188 105 Q180 85 150 85 Q120 85 112 105 Z" fill="${cfg.hairColor}" stroke="#1e1b4b" stroke-width="3" stroke-linejoin="round" />

    <!-- 五官 (經典簡約極簡 16P 表情) -->
    <ellipse cx="138" cy="116" rx="3.5" ry="5" fill="#1e1b4b" />
    <ellipse cx="162" cy="116" rx="3.5" ry="5" fill="#1e1b4b" />
    <!-- 眉毛 -->
    <line x1="132" y1="107" x2="144" y2="108" stroke="#1e1b4b" stroke-width="2.5" stroke-linecap="round" />
    <line x1="156" y1="108" x2="168" y2="107" stroke="#1e1b4b" stroke-width="2.5" stroke-linecap="round" />
    <!-- 微笑 -->
    <path d="M142 134 Q150 142 158 134" fill="none" stroke="#1e1b4b" stroke-width="2.5" stroke-linecap="round" />
    <!-- 鼻子 -->
    <path d="M150 120 L152 127 L148 127" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" />

    <!-- 16 種獨立專屬道具與配件 -->
    ${renderSvgProp(cfg.prop, code)}
  </g>

  <!-- 底部徽章標籤 -->
  <rect x="75" y="246" width="150" height="30" rx="15" fill="${cfg.color}" />
  <text x="150" y="266" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">${codeUpper}</text>
</svg>`;
}

Object.entries(TYPES_CONFIG).forEach(([code, cfg]) => {
  const svgContent = generateSvgAvatar(code, cfg);
  const filePath = path.join(avatarsDir, `${code}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
  console.log(`Generated: ${filePath}`);
});

console.log('✅ Successfully generated all 16 distinct 2D vector personality SVGs!');
