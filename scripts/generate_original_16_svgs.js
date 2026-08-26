import fs from 'fs';
import path from 'path';

const avatarsDir = path.resolve('public/avatars');
const distAvatarsDir = path.resolve('dist/avatars');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(distAvatarsDir)) fs.mkdirSync(distAvatarsDir, { recursive: true });

// 16 款 100% 原創、高品質、零版權風險且現代精緻的向量立繪 SVG
const ORIGINAL_16_PERSONAS = {
  // ================= 💜 紫色戰略分析家 (Analysts) =================
  entj: {
    code: 'ENTJ',
    name: '統御指揮官',
    color: '#88619a',
    grad1: '#7e22ce',
    grad2: '#c084fc',
    bg: '#faf5ff',
    render: () => `
      <!-- ENTJ: 原創紫金披風女統帥，手持金權杖 -->
      <path d="M90 140 L70 260 L230 260 L210 140 Z" fill="url(#cape_entj)" />
      <!-- 俐落西裝內襯 -->
      <path d="M110 140 L190 140 L180 260 L120 260 Z" fill="#4c1d95" />
      <polygon points="135,140 165,140 150,195" fill="#f8fafc" />
      <polygon points="146,140 154,140 150,185" fill="#c084fc" />
      <!-- 臉部與膚色漸層 -->
      <ellipse cx="150" cy="115" rx="36" ry="42" fill="url(#skin_entj)" />
      <!-- 幹練紫色短髮與挑染 -->
      <path d="M110 115 Q115 70 150 65 Q185 70 190 115 Q180 90 150 85 Q120 90 110 115 Z" fill="#3b0764" />
      <path d="M125 75 Q150 60 175 75 Q165 65 135 65 Z" fill="#a855f7" />
      <!-- 精緻金冠 -->
      <polygon points="130,68 138,40 150,55 162,40 170,68" fill="url(#gold_entj)" stroke="#b45309" stroke-width="1.5" />
      <circle cx="150" cy="50" r="3.5" fill="#ef4444" />
      <!-- 自信眼神與微抿自信笑 -->
      <ellipse cx="136" cy="112" rx="4.5" ry="3" fill="#1e1b4b" />
      <circle cx="137" cy="111" r="1.5" fill="#ffffff" />
      <ellipse cx="164" cy="112" rx="4.5" ry="3" fill="#1e1b4b" />
      <circle cx="165" cy="111" r="1.5" fill="#ffffff" />
      <path d="M142 132 Q150 137 158 132" fill="none" stroke="#7e22ce" stroke-width="2.5" stroke-linecap="round" />
      <!-- 金色指揮權杖 -->
      <line x1="225" y1="110" x2="225" y2="250" stroke="url(#gold_entj)" stroke-width="5" stroke-linecap="round" />
      <circle cx="225" cy="105" r="9" fill="url(#gold_entj)" />
      <circle cx="225" cy="105" r="4" fill="#c084fc" />
    `
  },

  intj: {
    code: 'INTJ',
    name: '遠見架構師',
    color: '#88619a',
    grad1: '#6b21a8',
    grad2: '#a855f7',
    bg: '#faf5ff',
    render: () => `
      <!-- INTJ: 深紫西裝、金絲眼鏡、手握精密藍圖與懸浮西洋棋 -->
      <path d="M105 140 L195 140 L185 260 L115 260 Z" fill="#2e1065" />
      <polygon points="135,140 165,140 150,195" fill="#9333ea" />
      <polygon points="146,140 154,140 150,185" fill="#f8fafc" />
      <!-- 臉部 -->
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_intj)" />
      <!-- 銀灰優雅旁分髮型 -->
      <path d="M112 110 Q118 65 150 62 Q185 68 188 110 Q170 85 150 82 Q125 85 112 110 Z" fill="#cbd5e1" />
      <!-- 現代方框眼鏡 -->
      <rect x="125" y="105" width="20" height="13" rx="2.5" fill="none" stroke="#1e1b4b" stroke-width="2" />
      <rect x="155" y="105" width="20" height="13" rx="2.5" fill="none" stroke="#1e1b4b" stroke-width="2" />
      <line x1="145" y1="111" x2="155" y2="111" stroke="#1e1b4b" stroke-width="2" />
      <circle cx="135" cy="111" r="2" fill="#3b0764" />
      <circle cx="165" cy="111" r="2" fill="#3b0764" />
      <line x1="144" y1="133" x2="156" y2="133" stroke="#3b0764" stroke-width="2" stroke-linecap="round" />
      <!-- 懸浮全像藍圖 -->
      <polygon points="65,160 105,140 115,220 75,240" fill="#38bdf8" opacity="0.85" stroke="#0284c7" stroke-width="1.5" />
      <line x1="78" y1="175" x2="98" y2="165" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" />
      <line x1="82" y1="195" x2="102" y2="185" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2" />
      <!-- 懸浮國王棋子 -->
      <circle cx="225" cy="160" r="7" fill="url(#gold_intj)" />
      <polygon points="218,170 232,170 230,200 220,200" fill="#581c87" />
    `
  },

  entp: {
    code: 'ENTP',
    name: '思想破局者',
    color: '#88619a',
    grad1: '#9333ea',
    grad2: '#d8b4fe',
    bg: '#faf5ff',
    render: () => `
      <!-- ENTP: 演說講台、手勢生動、懸浮立體麥克風 -->
      <path d="M110 145 L190 145 L180 260 L120 260 Z" fill="#581c87" />
      <polygon points="135,145 165,145 150,195" fill="#38bdf8" />
      <!-- 臉部 -->
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_entp)" />
      <!-- 蓬鬆俐落黑紫短髮 -->
      <path d="M112 110 Q120 60 150 55 Q182 60 188 110 Q170 80 150 78 Q125 80 112 110 Z" fill="#1e1b4b" />
      <path d="M130 65 Q145 50 160 65 Q150 55 135 60 Z" fill="#a855f7" />
      <!-- 慧黠眼神與標誌性歪嘴笑 -->
      <circle cx="136" cy="112" r="3.5" fill="#1e1b4b" />
      <circle cx="137" cy="110" r="1.5" fill="#ffffff" />
      <circle cx="164" cy="112" r="3.5" fill="#1e1b4b" />
      <circle cx="165" cy="110" r="1.5" fill="#ffffff" />
      <path d="M142 130 Q155 140 162 128" fill="none" stroke="#1e1b4b" stroke-width="2.5" stroke-linecap="round" />
      <!-- 專屬辯論講台與立體麥克風 -->
      <polygon points="60,185 95,185 90,260 65,260" fill="#334155" />
      <circle cx="78" cy="170" r="7" fill="#94a3b8" />
      <line x1="78" y1="177" x2="78" y2="185" stroke="#0f172a" stroke-width="2.5" />
      <!-- 靈感激盪火花 -->
      <polygon points="220,130 226,118 232,130 244,136 232,142 226,154 220,142 208,136" fill="#fbbf24" />
    `
  },

  intp: {
    code: 'INTP',
    name: '求真邏輯家',
    color: '#88619a',
    grad1: '#7e22ce',
    grad2: '#38bdf8',
    bg: '#faf5ff',
    render: () => `
      <!-- INTP: 白袍科研少女、原子模型、發光化學燒杯 -->
      <path d="M105 145 L195 145 L200 260 L100 260 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
      <polygon points="135,145 165,145 150,210" fill="#7e22ce" />
      <!-- 臉部 -->
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_intp)" />
      <!-- 紫色雙馬尾或微捲髮 -->
      <path d="M110 115 Q115 65 150 60 Q185 65 190 115 Q170 85 150 80 Q125 85 110 115 Z" fill="#3b0764" />
      <circle cx="105" cy="120" r="12" fill="#3b0764" />
      <circle cx="195" cy="120" r="12" fill="#3b0764" />
      <!-- 圓框眼鏡 -->
      <circle cx="136" cy="112" r="9" fill="none" stroke="#1e1b4b" stroke-width="2" />
      <circle cx="164" cy="112" r="9" fill="none" stroke="#1e1b4b" stroke-width="2" />
      <line x1="145" y1="112" x2="155" y2="112" stroke="#1e1b4b" stroke-width="2" />
      <!-- 好奇眼神 -->
      <circle cx="136" cy="112" r="2.5" fill="#3b0764" />
      <circle cx="164" cy="112" r="2.5" fill="#3b0764" />
      <!-- 懸浮原子模型 -->
      <circle cx="225" cy="165" r="6" fill="#fbbf24" />
      <ellipse cx="225" cy="165" rx="18" ry="7" fill="none" stroke="#38bdf8" stroke-width="1.5" transform="rotate(30 225 165)" />
      <ellipse cx="225" cy="165" rx="18" ry="7" fill="none" stroke="#ec4899" stroke-width="1.5" transform="rotate(-30 225 165)" />
      <!-- 發光燒瓶 -->
      <polygon points="70,185 80,185 80,198 94,225 60,225 70,198" fill="#c084fc" stroke="#581c87" stroke-width="1.5" />
    `
  },

  // ================= 💚 綠色心靈外交家 (Diplomats) =================
  infj: {
    code: 'INFJ',
    name: '心靈啟迪者',
    color: '#33a474',
    grad1: '#047857',
    grad2: '#34d399',
    bg: '#f0fdf4',
    render: () => `
      <!-- INFJ: 翡翠連帽長袍、白鬚智慧法杖、心靈極光 -->
      <path d="M100 145 L200 145 L210 260 L90 260 Z" fill="#047857" />
      <path d="M110 90 Q150 50 190 90 L185 150 Q150 165 115 150 Z" fill="#065f46" />
      <ellipse cx="150" cy="120" rx="30" ry="34" fill="url(#skin_infj)" />
      <!-- 慈祥白鬚 -->
      <path d="M135 130 Q150 180 165 130 Z" fill="#f8fafc" />
      <circle cx="140" cy="115" r="2.5" fill="#064e3b" />
      <circle cx="160" cy="115" r="2.5" fill="#064e3b" />
      <!-- 翡翠水晶法杖 -->
      <line x1="70" y1="75" x2="70" y2="255" stroke="#78350f" stroke-width="5" stroke-linecap="round" />
      <polygon points="60,75 70,45 80,75 70,95" fill="#34d399" stroke="#059669" stroke-width="1.5" />
      <circle cx="70" cy="70" r="4.5" fill="#ffffff" />
    `
  },

  infp: {
    code: 'INFP',
    name: '夢境調停詩人',
    color: '#33a474',
    grad1: '#059669',
    grad2: '#86efac',
    bg: '#f0fdf4',
    render: () => `
      <!-- INFP: 綠意花環少女、懸浮發光蝴蝶、百合羽筆 -->
      <path d="M110 150 L190 150 L200 260 L100 260 Z" fill="#059669" />
      <ellipse cx="150" cy="115" rx="34" ry="38" fill="url(#skin_infp)" />
      <!-- 柔美綠色長波浪髮 -->
      <path d="M112 110 Q118 65 150 60 Q182 65 188 110 Q195 150 175 140 Q150 135 125 140 Q105 150 112 110 Z" fill="#065f46" />
      <!-- 夢幻花環 -->
      <circle cx="130" cy="72" r="5" fill="#f472b6" />
      <circle cx="143" cy="68" r="5" fill="#fbbf24" />
      <circle cx="157" cy="68" r="5" fill="#60a5fa" />
      <circle cx="170" cy="72" r="5" fill="#f472b6" />
      <!-- 恬靜閉眼微笑 -->
      <path d="M136 114 Q141 118 146 114" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <path d="M154 114 Q159 118 164 114" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <path d="M144 130 Q150 135 156 130" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <!-- 懸浮發光綠蝴蝶 -->
      <path d="M225 145 Q235 135 240 145 Q235 155 225 145 Z" fill="#34d399" />
      <path d="M225 145 Q235 155 240 145 Q235 135 225 145 Z" fill="#34d399" />
      <circle cx="225" cy="145" r="2.5" fill="#fbbf24" />
    `
  },

  enfj: {
    code: 'ENFJ',
    name: '熱忱領航者',
    color: '#33a474',
    grad1: '#047857',
    grad2: '#fbbf24',
    bg: '#f0fdf4',
    render: () => `
      <!-- ENFJ: 英勇披風領袖、金桂冠、雙手持守護長劍 -->
      <path d="M95 140 L75 260 L225 260 L205 140 Z" fill="#065f46" />
      <path d="M110 140 L190 140 L180 260 L120 260 Z" fill="#047857" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_enfj)" />
      <!-- 沉穩黑髮與英雄金冠 -->
      <path d="M112 110 Q118 65 150 60 Q182 65 188 110 Q170 85 150 82 Q125 85 112 110 Z" fill="#0f172a" />
      <path d="M125 75 Q150 65 175 75" fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" />
      <circle cx="138" cy="112" r="3" fill="#064e3b" />
      <circle cx="162" cy="112" r="3" fill="#064e3b" />
      <path d="M142 130 Q150 136 158 130" fill="none" stroke="#064e3b" stroke-width="2.5" stroke-linecap="round" />
      <!-- 正義長劍立於身前 -->
      <line x1="150" y1="165" x2="150" y2="260" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" />
      <rect x="135" y="180" width="30" height="5" rx="1.5" fill="#fbbf24" />
      <circle cx="150" cy="165" r="5" fill="#fbbf24" />
    `
  },

  enfp: {
    code: 'ENFP',
    name: '靈感探索家',
    color: '#33a474',
    grad1: '#10b981',
    grad2: '#f59e0b',
    bg: '#f0fdf4',
    render: () => `
      <!-- ENFP: 綠色風衣、行囊背包、彩帶星光 -->
      <path d="M110 145 L190 145 L180 260 L120 260 Z" fill="#10b981" />
      <polygon points="135,145 165,145 150,195" fill="#f59e0b" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_enfp)" />
      <!-- 活潑短髮與背包揹帶 -->
      <path d="M112 110 Q120 60 150 55 Q182 60 188 110 Q175 80 150 78 Q125 80 112 110 Z" fill="#065f46" />
      <circle cx="136" cy="112" r="3" fill="#064e3b" />
      <path d="M156 110 Q162 114 168 110" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <path d="M140 128 Q150 140 160 128" fill="#f8fafc" stroke="#064e3b" stroke-width="2" />
      <!-- 雙肩行囊與星光 -->
      <rect x="92" y="150" width="16" height="40" rx="3" fill="#92400e" />
      <rect x="192" y="150" width="16" height="40" rx="3" fill="#92400e" />
      <polygon points="230,90 235,80 240,90 250,95 240,100 235,110 230,100 220,95" fill="#fbbf24" />
    `
  },

  // ================= 💙 藍色秩序守護者 (Sentinels) =================
  estj: {
    code: 'ESTJ',
    name: '磐石統帥官',
    color: '#4298b4',
    grad1: '#0284c7',
    grad2: '#38bdf8',
    bg: '#f0f9ff',
    render: () => `
      <!-- ESTJ: 筆挺商務西裝、天藍量尺、效率公事夾板 -->
      <path d="M110 140 L190 140 L180 260 L120 260 Z" fill="#0369a1" />
      <polygon points="135,140 165,140 150,205" fill="#f8fafc" />
      <polygon points="146,140 154,140 150,195" fill="#0284c7" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_estj)" />
      <!-- 幹練女性主管短髮盤髮 -->
      <path d="M112 110 Q118 65 150 60 Q182 65 188 110 Q170 85 150 82 Q125 85 112 110 Z" fill="#1e293b" />
      <circle cx="178" cy="85" r="9" fill="#1e293b" />
      <!-- 現代眼鏡與堅定眼神 -->
      <rect x="126" y="106" width="18" height="12" rx="2" fill="none" stroke="#0f172a" stroke-width="2" />
      <rect x="156" y="106" width="18" height="12" rx="2" fill="none" stroke="#0f172a" stroke-width="2" />
      <line x1="144" y1="112" x2="156" y2="112" stroke="#0f172a" stroke-width="2" />
      <line x1="142" y1="132" x2="158" y2="132" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
      <!-- 天藍精準量尺與公事夾板 -->
      <polygon points="215,140 245,130 250,220 220,230" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5" />
      <line x1="222" y1="150" x2="228" y2="152" stroke="#ffffff" stroke-width="2" />
      <line x1="225" y1="170" x2="231" y2="172" stroke="#ffffff" stroke-width="2" />
      <line x1="228" y1="190" x2="234" y2="192" stroke="#ffffff" stroke-width="2" />
    `
  },

  istj: {
    code: 'ISTJ',
    name: '精準物流師',
    color: '#4298b4',
    grad1: '#0369a1',
    grad2: '#7dd3fc',
    bg: '#f0f9ff',
    render: () => `
      <!-- ISTJ: 深藍西裝學者、皮革手帳與鋼筆 -->
      <path d="M110 140 L190 140 L180 260 L120 260 Z" fill="#0f172a" />
      <polygon points="135,140 165,140 150,205" fill="#f8fafc" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_istj)" />
      <!-- 儒雅銀灰髮 -->
      <path d="M112 110 Q118 65 150 62 Q182 65 188 110 Q170 85 150 82 Q125 85 112 110 Z" fill="#94a3b8" />
      <rect x="126" y="106" width="18" height="12" rx="2" fill="none" stroke="#0f172a" stroke-width="2" />
      <rect x="156" y="106" width="18" height="12" rx="2" fill="none" stroke="#0f172a" stroke-width="2" />
      <line x1="144" y1="112" x2="156" y2="112" stroke="#0f172a" stroke-width="2" />
      <line x1="144" y1="132" x2="156" y2="132" stroke="#0f172a" stroke-width="2" />
      <!-- 精裝皮革手帳與鋼筆 -->
      <rect x="60" y="160" width="35" height="50" rx="3" fill="#78350f" stroke="#451a03" stroke-width="1.5" />
      <line x1="225" y1="145" x2="235" y2="185" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
    `
  },

  esfj: {
    code: 'ESFJ',
    name: '溫暖執政官',
    color: '#4298b4',
    grad1: '#0284c7',
    grad2: '#bae6fd',
    bg: '#f0f9ff',
    render: () => `
      <!-- ESFJ: 親切款待主人、手端精緻蛋糕與茶點 -->
      <path d="M110 145 L190 145 L180 260 L120 260 Z" fill="#0284c7" />
      <polygon points="135,145 165,145 150,195" fill="#f8fafc" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_esfj)" />
      <!-- 溫婉捲髮與陽光微笑 -->
      <path d="M112 110 Q118 65 150 60 Q182 65 188 110 Q175 80 150 78 Q125 80 112 110 Z" fill="#475569" />
      <circle cx="138" cy="112" r="3" fill="#0f172a" />
      <circle cx="162" cy="112" r="3" fill="#0f172a" />
      <path d="M142 128 Q150 138 158 128" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
      <!-- 精緻慶典蛋糕與茶點托盤 -->
      <rect x="205" y="160" width="35" height="20" rx="2" fill="#38bdf8" />
      <circle cx="215" cy="155" r="3" fill="#ef4444" />
      <circle cx="225" cy="155" r="3" fill="#fbbf24" />
      <circle cx="235" cy="155" r="3" fill="#ef4444" />
    `
  },

  isfj: {
    code: 'ISFJ',
    name: '守護天使',
    color: '#4298b4',
    grad1: '#075985',
    grad2: '#93c5fd',
    bg: '#f0f9ff',
    render: () => `
      <!-- ISFJ: 親切守護護士帽、愛心守護徽章 -->
      <path d="M110 145 L190 145 L180 260 L120 260 Z" fill="#0ea5e9" />
      <polygon points="135,145 165,145 150,195" fill="#f8fafc" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_isfj)" />
      <!-- 柔順短髮與護士天使帽 -->
      <path d="M112 110 Q118 65 150 60 Q182 65 188 110 Q175 80 150 78 Q125 80 112 110 Z" fill="#334155" />
      <polygon points="135,68 165,68 160,50 140,50" fill="#ffffff" stroke="#38bdf8" stroke-width="1.5" />
      <path d="M148 54 L152 54 M150 52 L150 56" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
      <!-- 溫暖閉眼守護 -->
      <path d="M136 114 Q141 118 146 114" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
      <path d="M154 114 Q159 118 164 114" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
      <path d="M144 130 Q150 135 156 130" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
      <!-- 愛心守護盾牌 -->
      <polygon points="65,160 95,160 95,195 80,220 65,195" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5" />
      <circle cx="80" cy="180" r="5" fill="#ef4444" />
    `
  },

  // ================= 💛 黃色自由探險家 (Explorers) =================
  estp: {
    code: 'ESTP',
    name: '破局冒險家',
    color: '#e4ae3a',
    grad1: '#ca8a04',
    grad2: '#fde047',
    bg: '#fefce8',
    render: () => `
      <!-- ESTP: 酷炫墨鏡、金黃運動夾克、斜背運動包 -->
      <path d="M110 145 L190 145 L180 260 L120 260 Z" fill="#eab308" />
      <polygon points="135,145 165,145 150,195" fill="#0f172a" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_estp)" />
      <!-- 金棕刺蝟短髮與墨鏡 -->
      <path d="M112 110 Q120 55 150 50 Q180 55 188 110 Q175 75 150 72 Q125 75 112 110 Z" fill="#854d0e" />
      <!-- 酷炫黑色墨鏡 -->
      <polygon points="128,105 146,105 143,120 131,120" fill="#0f172a" />
      <polygon points="154,105 172,105 169,120 157,120" fill="#0f172a" />
      <line x1="146" y1="110" x2="154" y2="110" stroke="#0f172a" stroke-width="2" />
      <path d="M142 130 Q155 140 162 128" fill="none" stroke="#713f12" stroke-width="2.5" stroke-linecap="round" />
      <!-- 斜背運動旅行包 -->
      <line x1="120" y1="145" x2="225" y2="220" stroke="#475569" stroke-width="4" />
      <rect x="205" y="190" width="35" height="25" rx="3" fill="#334155" />
    `
  },

  istp: {
    code: 'ISTP',
    name: '精湛匠人',
    color: '#e4ae3a',
    grad1: '#d97706',
    grad2: '#fbbf24',
    bg: '#fefce8',
    render: () => `
      <!-- ISTP: 頭頂護目鏡、工裝背心、手持萬用機械工具 -->
      <path d="M110 145 L190 145 L180 260 L120 260 Z" fill="#d97706" />
      <polygon points="135,145 165,145 150,205" fill="#334155" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_istp)" />
      <!-- 帥氣短髮與頭頂護目鏡 -->
      <path d="M112 110 Q118 65 150 62 Q182 65 188 110 Q175 80 150 78 Q125 80 112 110 Z" fill="#451a03" />
      <rect x="128" y="75" width="18" height="10" rx="3" fill="#38bdf8" stroke="#0f172a" stroke-width="1.5" />
      <rect x="154" y="75" width="18" height="10" rx="3" fill="#38bdf8" stroke="#0f172a" stroke-width="1.5" />
      <line x1="146" y1="80" x2="154" y2="80" stroke="#0f172a" stroke-width="1.5" />
      <circle cx="138" cy="112" r="3" fill="#0f172a" />
      <circle cx="162" cy="112" r="3" fill="#0f172a" />
      <!-- 金屬萬用扳手 -->
      <polygon points="65,150 80,135 90,145 75,215 60,210" fill="#94a3b8" stroke="#475569" stroke-width="1.5" />
    `
  },

  esfp: {
    code: 'ESFP',
    name: '星光表演家',
    color: '#e4ae3a',
    grad1: '#eab308',
    grad2: '#fde047',
    bg: '#fefce8',
    render: () => `
      <!-- ESFP: 金黃舞裙、雙手金色沙錘、星光舞台 -->
      <path d="M110 145 L190 145 L205 260 L95 260 Z" fill="#eab308" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_esfp)" />
      <!-- 熱情大捲髮 -->
      <path d="M105 110 Q118 60 150 55 Q182 60 195 110 Q205 150 175 135 Q150 130 125 135 Q95 150 105 110 Z" fill="#78350f" />
      <circle cx="138" cy="112" r="3" fill="#451a03" />
      <path d="M156 110 Q162 114 168 110" fill="none" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
      <path d="M140 128 Q150 140 160 128" fill="#f8fafc" stroke="#451a03" stroke-width="2" />
      <!-- 雙手金色沙錘 -->
      <circle cx="65" cy="155" r="9" fill="url(#gold_esfp)" />
      <line x1="65" y1="164" x2="65" y2="185" stroke="#78350f" stroke-width="3" stroke-linecap="round" />
      <circle cx="235" cy="155" r="9" fill="url(#gold_esfp)" />
      <line x1="235" y1="164" x2="235" y2="185" stroke="#78350f" stroke-width="3" stroke-linecap="round" />
    `
  },

  isfp: {
    code: 'ISFP',
    name: '靈性藝術家',
    color: '#e4ae3a',
    grad1: '#ca8a04',
    grad2: '#fef08a',
    bg: '#fefce8',
    render: () => `
      <!-- ISFP: 貝雷帽藝術家少女、木質畫架、繽紛調色盤 -->
      <path d="M110 145 L190 145 L180 260 L120 260 Z" fill="#ca8a04" />
      <polygon points="135,145 165,145 150,195" fill="#fef08a" />
      <ellipse cx="150" cy="115" rx="35" ry="40" fill="url(#skin_isfp)" />
      <!-- 俏皮短髮與黃色貝雷帽 -->
      <path d="M112 110 Q118 65 150 60 Q182 65 188 110 Q175 80 150 78 Q125 80 112 110 Z" fill="#713f12" />
      <path d="M115 70 Q150 40 185 70 L175 80 L125 80 Z" fill="#eab308" stroke="#a16207" stroke-width="1.5" />
      <circle cx="150" cy="46" r="3" fill="#a16207" />
      <circle cx="138" cy="112" r="3" fill="#451a03" />
      <circle cx="162" cy="112" r="3" fill="#451a03" />
      <path d="M142 128 Q150 136 158 128" fill="none" stroke="#451a03" stroke-width="2.5" stroke-linecap="round" />
      <!-- 調色盤與木質畫筆 -->
      <ellipse cx="65" cy="175" rx="18" ry="12" fill="#d97706" stroke="#92400e" stroke-width="1.5" />
      <circle cx="58" cy="173" r="3" fill="#ef4444" />
      <circle cx="66" cy="170" r="3" fill="#38bdf8" />
      <circle cx="72" cy="177" r="3" fill="#22c55e" />
      <line x1="220" y1="140" x2="235" y2="185" stroke="#78350f" stroke-width="3" stroke-linecap="round" />
    `
  }
};

function generateSvgWrapper(code, cfg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad_${code}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${cfg.bg}" />
      <stop offset="85%" stop-color="${cfg.bg}" />
      <stop offset="100%" stop-color="${cfg.color}" stop-opacity="0.25" />
    </radialGradient>
    <linearGradient id="skin_${code}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fffbeb" />
      <stop offset="100%" stop-color="#fde68a" />
    </linearGradient>
    <linearGradient id="gold_${code}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="cape_${code}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${cfg.grad1}" />
      <stop offset="100%" stop-color="${cfg.grad2}" />
    </linearGradient>
    <filter id="shadow_${code}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.18" />
    </filter>
  </defs>

  <!-- 精緻外圓光圈與柔和背景 -->
  <circle cx="150" cy="150" r="142" fill="url(#bgGrad_${code})" stroke="${cfg.color}" stroke-width="3.5" />
  
  <!-- 浮空微光裝飾環 -->
  <circle cx="150" cy="140" r="95" fill="none" stroke="${cfg.color}" stroke-width="1" stroke-dasharray="4,4" opacity="0.4" />

  <!-- 角色人物圖層 -->
  <g filter="url(#shadow_${code})">
    ${cfg.render()}
  </g>

  <!-- 頂部精緻光芒稱號徽章 -->
  <g transform="translate(0, -2)">
    <rect x="95" y="14" width="110" height="28" rx="14" fill="${cfg.color}" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.25))" />
    <text x="150" y="33" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="900" font-size="13.5" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">${cfg.code}</text>
  </g>
</svg>`;
}

Object.entries(ORIGINAL_16_PERSONAS).forEach(([code, cfg]) => {
  const svgContent = generateSvgWrapper(code, cfg);
  const destPublic = path.join(avatarsDir, `${code}.svg`);
  const destDist = path.join(distAvatarsDir, `${code}.svg`);

  fs.writeFileSync(destPublic, svgContent, 'utf-8');
  fs.writeFileSync(destDist, svgContent, 'utf-8');
  console.log(`✅ [${code}.svg] 100% 原創精緻立繪生成成功`);
});

// 四大家族總覽
fs.copyFileSync(path.join(avatarsDir, 'entj.svg'), path.join(avatarsDir, 'strategist.svg'));
fs.copyFileSync(path.join(avatarsDir, 'infp.svg'), path.join(avatarsDir, 'empath.svg'));
fs.copyFileSync(path.join(avatarsDir, 'estj.svg'), path.join(avatarsDir, 'sentinel.svg'));
fs.copyFileSync(path.join(avatarsDir, 'isfp.svg'), path.join(avatarsDir, 'explorer.svg'));

fs.copyFileSync(path.join(avatarsDir, 'entj.svg'), path.join(distAvatarsDir, 'strategist.svg'));
fs.copyFileSync(path.join(avatarsDir, 'infp.svg'), path.join(distAvatarsDir, 'empath.svg'));
fs.copyFileSync(path.join(avatarsDir, 'estj.svg'), path.join(distAvatarsDir, 'sentinel.svg'));
fs.copyFileSync(path.join(avatarsDir, 'isfp.svg'), path.join(distAvatarsDir, 'explorer.svg'));

console.log('🎉 16 尊 100% 原創、零版權風險、精緻現代的向量立繪已全數生成完畢！');
