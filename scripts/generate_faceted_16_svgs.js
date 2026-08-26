import fs from 'fs';
import path from 'path';

const avatarsDir = path.resolve('public/avatars');
const distAvatarsDir = path.resolve('dist/avatars');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(distAvatarsDir)) fs.mkdirSync(distAvatarsDir, { recursive: true });

// 16 尊正統「幾何分面棱角折線 (Low-Poly Faceted) 線條感」原創高品質 SVG 立繪
const FACETED_16_PERSONAS = {
  // ================= 💜 紫色戰略分析家 (Analysts) =================
  intj: {
    code: 'INTJ',
    name: '架構師',
    color: '#88619a',
    bg: '#f5f3ff',
    render: () => `
      <!-- INTJ: 棱角分面鬍鬚軍師、沉思托腮、沙盤戰術台 -->
      <!-- 披肩外套分面 -->
      <polygon points="105,145 150,135 150,255 90,255" fill="#581c87" />
      <polygon points="150,135 195,145 210,255 150,255" fill="#4c1d95" />
      <polygon points="125,140 150,135 150,195 125,190" fill="#7e22ce" />
      <polygon points="150,135 175,140 175,190 150,195" fill="#6b21a8" />
      <!-- 棱角分面頭部 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <polygon points="135,135 150,140 150,150 135,145" fill="#f59e0b" />
      <polygon points="150,140 165,135 165,145 150,150" fill="#d97706" />
      <!-- 棱角幾何紫色短髮與鬢角 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#3b0764" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#2e1065" />
      <polygon points="125,60 150,55 140,75" fill="#581c87" />
      <polygon points="150,55 175,60 160,75" fill="#3b0764" />
      <!-- 沉思八字鬍鬚 -->
      <polygon points="130,126 150,128 145,135 130,132" fill="#3b0764" />
      <polygon points="150,128 170,126 170,132 155,135" fill="#2e1065" />
      <!-- 棱角眼睛 -->
      <polygon points="130,108 142,108 138,114 130,112" fill="#1e1b4b" />
      <polygon points="158,108 170,108 170,112 162,114" fill="#1e1b4b" />
      <!-- 戰術沙盤台與旗幟 -->
      <polygon points="70,225 130,210 140,260 80,260" fill="#cbd5e1" />
      <polygon points="130,210 150,215 140,260" fill="#94a3b8" />
      <line x1="95" y1="220" x2="95" y2="200" stroke="#475569" stroke-width="2" />
      <polygon points="95,200 108,206 95,212" fill="#7e22ce" />
      <line x1="120" y1="215" x2="120" y2="195" stroke="#475569" stroke-width="2" />
      <polygon points="120,195 133,201 120,207" fill="#a855f7" />
    `
  },

  intp: {
    code: 'INTP',
    name: '邏輯學家',
    color: '#88619a',
    bg: '#f5f3ff',
    render: () => `
      <!-- INTP: 紫鏡白袍女學者、手舉試劑燒瓶、思考姿態 -->
      <!-- 白袍幾何分面 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
      <polygon points="130,140 150,135 150,220 130,215" fill="#6b21a8" />
      <polygon points="150,135 170,140 170,215 150,220" fill="#581c87" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何紫色後梳長髮 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#581c87" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#4c1d95" />
      <polygon points="90,120 115,95 110,140" fill="#3b0764" />
      <!-- 方框紫色眼鏡 -->
      <polygon points="124,104 144,104 142,118 126,118" fill="none" stroke="#3b0764" stroke-width="2.5" />
      <polygon points="156,104 176,104 174,118 158,118" fill="none" stroke="#3b0764" stroke-width="2.5" />
      <line x1="144" y1="110" x2="156" y2="110" stroke="#3b0764" stroke-width="2.5" />
      <!-- 手舉發光試管燒瓶 -->
      <polygon points="180,140 220,95 230,105 190,150" fill="#fde68a" />
      <polygon points="215,80 230,80 230,95 242,120 208,120 215,95" fill="#c084fc" stroke="#581c87" stroke-width="1.5" />
      <circle cx="225" cy="108" r="3" fill="#ffffff" />
    `
  },

  entj: {
    code: 'ENTJ',
    name: '指揮官',
    color: '#88619a',
    bg: '#f5f3ff',
    render: () => `
      <!-- ENTJ: 俐落套裝金冠女統帥、手持指揮教鞭 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#6b21a8" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#581c87" />
      <polygon points="125,140 150,135 150,195 125,190" fill="#9333ea" />
      <polygon points="150,135 175,140 175,190 150,195" fill="#7e22ce" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何黑紫霸氣短髮 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#1e1b4b" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#0f172a" />
      <polygon points="190,95 215,125 185,130" fill="#1e1b4b" />
      <!-- 金色皇冠 -->
      <polygon points="130,65 140,40 150,55 160,40 170,65" fill="#fbbf24" stroke="#b45309" stroke-width="1.5" />
      <circle cx="150" cy="50" r="3" fill="#ef4444" />
      <!-- 犀利眼神與自信微笑 -->
      <polygon points="132,108 144,108 140,114 132,112" fill="#1e1b4b" />
      <polygon points="156,108 168,108 168,112 160,114" fill="#1e1b4b" />
      <line x1="142" y1="130" x2="158" y2="130" stroke="#1e1b4b" stroke-width="2.5" stroke-linecap="round" />
      <!-- 指向前方指揮教鞭 -->
      <line x1="180" y1="160" x2="250" y2="130" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round" />
      <circle cx="180" cy="160" r="5" fill="#fbbf24" />
    `
  },

  entp: {
    code: 'ENTP',
    name: '辯論家',
    color: '#88619a',
    bg: '#f5f3ff',
    render: () => `
      <!-- ENTP: 講台前手持立體麥克風、演說辯論姿態 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#7e22ce" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#6b21a8" />
      <polygon points="130,140 150,135 150,195" fill="#f8fafc" />
      <polygon points="150,135 170,140 170,195" fill="#e2e8f0" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何短髮折線 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#334155" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#1e293b" />
      <polygon points="125,60 150,55 140,75" fill="#475569" />
      <!-- 慧黠眼神與歪嘴笑 -->
      <polygon points="132,108 144,108 140,114 132,112" fill="#1e1b4b" />
      <polygon points="156,108 168,108 168,112 160,114" fill="#1e1b4b" />
      <path d="M142 128 Q155 138 162 126" fill="none" stroke="#1e1b4b" stroke-width="2.5" stroke-linecap="round" />
      <!-- 演說講台與立體麥克風 -->
      <polygon points="210,180 245,180 240,260 215,260" fill="#3b0764" />
      <line x1="228" y1="180" x2="215" y2="135" stroke="#475569" stroke-width="3" stroke-linecap="round" />
      <polygon points="208,130 220,124 224,136 212,142" fill="#f43f5e" />
    `
  },

  // ================= 💚 綠色心靈外交家 (Diplomats) =================
  infj: {
    code: 'INFJ',
    name: '提倡者',
    color: '#33a474',
    bg: '#f0fdf4',
    render: () => `
      <!-- INFJ: 綠袍白鬚長老、手持木製法杖 -->
      <polygon points="100,145 150,135 150,260 85,260" fill="#047857" />
      <polygon points="150,135 200,145 215,260 150,260" fill="#065f46" />
      <!-- 臉部與長袍連帽折線 -->
      <polygon points="115,90 150,55 185,90 180,145 150,155 120,145" fill="#064e3b" />
      <polygon points="125,95 150,90 150,135 125,130" fill="#fde68a" />
      <polygon points="150,90 175,95 175,130 150,135" fill="#fcd34d" />
      <!-- 幾何白鬚 -->
      <polygon points="130,130 150,135 150,190 135,170" fill="#f8fafc" />
      <polygon points="150,135 170,130 165,170 150,190" fill="#e2e8f0" />
      <!-- 慈祥眼神 -->
      <polygon points="135,110 145,110 140,114" fill="#064e3b" />
      <polygon points="155,110 165,110 160,114" fill="#064e3b" />
      <!-- 木製魔杖與水晶寶珠 -->
      <line x1="65" y1="70" x2="65" y2="260" stroke="#78350f" stroke-width="5" stroke-linecap="round" />
      <polygon points="55,65 65,40 75,65 65,85" fill="#34d399" stroke="#059669" stroke-width="1.5" />
      <circle cx="65" cy="62" r="4" fill="#ffffff" />
    `
  },

  infp: {
    code: 'INFP',
    name: '調停者',
    color: '#33a474',
    bg: '#f0fdf4',
    render: () => `
      <!-- INFP: 綠裙花環少女、手持綠色花朵、環繞發光蝴蝶 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#059669" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#047857" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何綠金長髮 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#15803d" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#166534" />
      <polygon points="95,120 115,95 105,145" fill="#15803d" />
      <!-- 幾何花環 -->
      <polygon points="128,70 138,65 142,75" fill="#f472b6" />
      <polygon points="144,65 156,65 150,75" fill="#fbbf24" />
      <polygon points="158,65 168,70 160,75" fill="#60a5fa" />
      <!-- 恬靜閉眼與微甜笑容 -->
      <path d="M135 112 Q140 116 145 112" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <path d="M155 112 Q160 116 165 112" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <path d="M142 128 Q150 134 158 128" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <!-- 手持花朵與幾何蝴蝶 -->
      <polygon points="210,160 235,145 240,165 220,175" fill="#fbbf24" stroke="#d97706" stroke-width="1.5" />
      <polygon points="65,110 80,95 85,110 75,115" fill="#34d399" />
      <polygon points="65,110 80,125 85,110 75,115" fill="#34d399" />
    `
  },

  enfj: {
    code: 'ENFJ',
    name: '主人公',
    color: '#33a474',
    bg: '#f0fdf4',
    render: () => `
      <!-- ENFJ: 綠色披風英勇領袖、雙手扶持巨型長劍 -->
      <polygon points="90,140 70,260 230,260 210,140" fill="#065f46" />
      <polygon points="110,140 150,135 150,260 100,260" fill="#047857" />
      <polygon points="150,135 190,140 200,260 150,260" fill="#064e3b" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何黑髮長披髮 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#0f172a" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#1e293b" />
      <polygon points="100,120 115,95 105,150" fill="#0f172a" />
      <!-- 堅毅眼神 -->
      <polygon points="132,108 144,108 140,114 132,112" fill="#064e3b" />
      <polygon points="156,108 168,108 168,112 160,114" fill="#064e3b" />
      <line x1="142" y1="130" x2="158" y2="130" stroke="#064e3b" stroke-width="2.5" stroke-linecap="round" />
      <!-- 身前巨型正義長劍 -->
      <line x1="150" y1="160" x2="150" y2="260" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round" />
      <rect x="132" y="175" width="36" height="6" rx="2" fill="#fbbf24" />
      <circle cx="150" cy="160" r="5" fill="#fbbf24" />
    `
  },

  enfp: {
    code: 'ENFP',
    name: '活動家',
    color: '#33a474',
    bg: '#f0fdf4',
    render: () => `
      <!-- ENFP: 綠色風衣、行囊背包、揮手熱情活動家 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#10b981" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#059669" />
      <polygon points="135,140 150,135 150,195" fill="#f59e0b" />
      <polygon points="150,135 165,140 165,195" fill="#d97706" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 蓬鬆幾何綠短髮 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#047857" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#065f46" />
      <!-- 燦爛笑容與眨眼 -->
      <circle cx="136" cy="112" r="3" fill="#064e3b" />
      <path d="M156 110 Q162 114 168 110" fill="none" stroke="#064e3b" stroke-width="2" stroke-linecap="round" />
      <path d="M140 128 Q150 138 160 128" fill="#f8fafc" stroke="#064e3b" stroke-width="2" />
      <!-- 斜背行囊背包與揮手 -->
      <polygon points="70,160 95,150 90,210 65,220" fill="#92400e" />
      <polygon points="190,150 230,120 240,135 200,165" fill="#fde68a" />
    `
  },

  // ================= 💙 藍色秩序守護者 (Sentinels) =================
  istj: {
    code: 'ISTJ',
    name: '物流師',
    color: '#4298b4',
    bg: '#f0f9ff',
    render: () => `
      <!-- ISTJ: 老成學者、藍色西裝、手持文件夾與鋼筆 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#0369a1" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#075985" />
      <polygon points="135,140 165,140 150,205" fill="#f8fafc" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何銀灰短髮 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#64748b" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#475569" />
      <!-- 方框藍色眼鏡 -->
      <polygon points="124,105 144,105 142,118 126,118" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <polygon points="156,105 176,105 174,118 158,118" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <line x1="144" y1="111" x2="156" y2="111" stroke="#0284c7" stroke-width="2.5" />
      <!-- 手持檔案夾與鋼筆 -->
      <polygon points="60,165 95,150 90,225 55,235" fill="#475569" stroke="#334155" stroke-width="1.5" />
      <line x1="225" y1="145" x2="235" y2="185" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
    `
  },

  isfj: {
    code: 'ISFJ',
    name: '守護者',
    color: '#4298b4',
    bg: '#f0f9ff',
    render: () => `
      <!-- ISFJ: 護士帽、醫護守衛套裝、親切守護姿態 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#0ea5e9" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#0284c7" />
      <polygon points="135,140 165,140 150,195" fill="#f8fafc" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 柔順幾何短髮與護士帽 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#334155" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#1e293b" />
      <!-- 幾何護士帽與十字 -->
      <polygon points="130,68 170,68 162,48 138,48" fill="#ffffff" stroke="#38bdf8" stroke-width="1.5" />
      <line x1="150" y1="52" x2="150" y2="64" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
      <line x1="144" y1="58" x2="156" y2="58" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
      <!-- 溫柔眼神與微笑 -->
      <circle cx="136" cy="112" r="3" fill="#0f172a" />
      <circle cx="164" cy="112" r="3" fill="#0f172a" />
      <path d="M142 128 Q150 136 158 128" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
    `
  },

  estj: {
    code: 'ESTJ',
    name: '管理者',
    color: '#4298b4',
    bg: '#f0f9ff',
    render: () => `
      <!-- ESTJ: 盤髮女主管、藍色量尺、幹練管理者姿態 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#0284c7" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#0369a1" />
      <polygon points="135,140 165,140 150,195" fill="#f8fafc" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幹練盤髮短髮 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#1e293b" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#0f172a" />
      <polygon points="180,75 200,65 205,85 185,90" fill="#1e293b" />
      <!-- 現代方框眼鏡 -->
      <polygon points="124,105 144,105 142,118 126,118" fill="none" stroke="#0f172a" stroke-width="2.5" />
      <polygon points="156,105 176,105 174,118 158,118" fill="none" stroke="#0f172a" stroke-width="2.5" />
      <line x1="144" y1="111" x2="156" y2="111" stroke="#0f172a" stroke-width="2.5" />
      <!-- 手持天藍色幾何量尺 -->
      <polygon points="205,140 245,120 250,210 210,225" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5" />
      <line x1="215" y1="145" x2="220" y2="148" stroke="#ffffff" stroke-width="2" />
      <line x1="220" y1="165" x2="225" y2="168" stroke="#ffffff" stroke-width="2" />
      <line x1="225" y1="185" x2="230" y2="188" stroke="#ffffff" stroke-width="2" />
    `
  },

  esfj: {
    code: 'ESFJ',
    name: '執政官',
    color: '#4298b4',
    bg: '#f0f9ff',
    render: () => `
      <!-- ESFJ: 親切款待主廚/管家、手端生日蛋糕與雨傘 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#0ea5e9" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#0284c7" />
      <polygon points="125,160 175,160 170,260 130,260" fill="#f8fafc" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何棕黑短髮 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#334155" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#1e293b" />
      <circle cx="136" cy="112" r="3" fill="#0f172a" />
      <circle cx="164" cy="112" r="3" fill="#0f172a" />
      <path d="M140 128 Q150 138 160 128" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
      <!-- 手端慶典蛋糕與幾何雨傘 -->
      <rect x="205" y="160" width="40" height="25" rx="2" fill="#38bdf8" />
      <line x1="215" y1="150" x2="215" y2="160" stroke="#fbbf24" stroke-width="2" />
      <line x1="225" y1="148" x2="225" y2="160" stroke="#ef4444" stroke-width="2" />
      <line x1="235" y1="150" x2="235" y2="160" stroke="#fbbf24" stroke-width="2" />
      <polygon points="50,150 85,130 90,165 55,180" fill="#38bdf8" />
    `
  },

  // ================= 💛 黃色自由探險家 (Explorers) =================
  istp: {
    code: 'ISTP',
    name: '鑑賞家',
    color: '#e4ae3a',
    bg: '#fefce8',
    render: () => `
      <!-- ISTP: 護目鏡黃色工裝、手持電鑽工具與扳手 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#d97706" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#b45309" />
      <polygon points="135,140 165,140 150,205" fill="#334155" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 帥氣短髮與頭頂護目鏡 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#451a03" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#291102" />
      <!-- 幾何護目鏡 -->
      <polygon points="126,75 146,75 143,88 128,88" fill="#38bdf8" stroke="#0f172a" stroke-width="1.5" />
      <polygon points="154,75 174,75 171,88 156,88" fill="#38bdf8" stroke="#0f172a" stroke-width="1.5" />
      <!-- 眨眼專注笑 -->
      <circle cx="136" cy="112" r="3" fill="#0f172a" />
      <path d="M156 110 Q162 114 168 110" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
      <!-- 手持電鑽工具與扳手 -->
      <polygon points="190,145 235,130 245,150 200,165" fill="#475569" />
      <line x1="235" y1="130" x2="255" y2="120" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
      <polygon points="65,165 75,150 85,160 70,230 55,225" fill="#94a3b8" />
    `
  },

  isfp: {
    code: 'ISFP',
    name: '冒險家',
    color: '#e4ae3a',
    bg: '#fefce8',
    render: () => `
      <!-- ISFP: 刺蝟金髮工裝少女、手握調色盤與畫筆 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#eab308" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#ca8a04" />
      <polygon points="125,160 175,160 170,260 130,260" fill="#a16207" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何刺蝟金色亮髮 -->
      <polygon points="105,95 115,50 135,40 150,55 130,85" fill="#facc15" />
      <polygon points="135,40 165,40 150,55" fill="#eab308" />
      <polygon points="165,40 185,50 195,95 170,85 150,55" fill="#ca8a04" />
      <!-- 靈動眼神與微笑 -->
      <circle cx="136" cy="112" r="3" fill="#451a03" />
      <circle cx="164" cy="112" r="3" fill="#451a03" />
      <path d="M142 128 Q150 136 158 128" fill="none" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
      <!-- 幾何調色盤與細畫筆 -->
      <polygon points="55,160 85,140 95,185 60,200" fill="#d97706" stroke="#92400e" stroke-width="1.5" />
      <circle cx="68" cy="165" r="3" fill="#ef4444" />
      <circle cx="78" cy="160" r="3" fill="#38bdf8" />
      <circle cx="82" cy="175" r="3" fill="#22c55e" />
      <line x1="225" y1="135" x2="245" y2="180" stroke="#78350f" stroke-width="3" stroke-linecap="round" />
    `
  },

  estp: {
    code: 'ESTP',
    name: '企業家',
    color: '#e4ae3a',
    bg: '#fefce8',
    render: () => `
      <!-- ESTP: 酷炫墨鏡、黃色運動套裝、斜背運動包 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#facc15" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#eab308" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何金棕刺蝟短髮 -->
      <polygon points="110,95 125,60 150,55 150,85 120,95" fill="#854d0e" />
      <polygon points="150,55 175,60 190,95 180,95 150,85" fill="#713f12" />
      <!-- 酷炫黑色墨鏡 -->
      <polygon points="126,105 146,105 143,120 128,120" fill="#0f172a" />
      <polygon points="154,105 174,105 171,120 156,120" fill="#0f172a" />
      <line x1="146" y1="110" x2="154" y2="110" stroke="#0f172a" stroke-width="2" />
      <path d="M142 128 Q155 138 162 126" fill="none" stroke="#713f12" stroke-width="2.5" stroke-linecap="round" />
      <!-- 斜背 SPORT 運動包 -->
      <line x1="115" y1="145" x2="225" y2="215" stroke="#475569" stroke-width="4" />
      <polygon points="205,190 245,185 240,225 200,230" fill="#334155" />
    `
  },

  esfp: {
    code: 'ESFP',
    name: '表演者',
    color: '#e4ae3a',
    bg: '#fefce8',
    render: () => `
      <!-- ESFP: 幾何金黃舞裙、雙手金色沙錘、熱情舞蹈 -->
      <polygon points="105,145 150,135 150,260 90,260" fill="#facc15" />
      <polygon points="150,135 195,145 210,260 150,260" fill="#eab308" />
      <polygon points="125,145 175,145 190,260 110,260" fill="#fbbf24" />
      <!-- 臉部折線 -->
      <polygon points="120,95 150,85 150,140 115,130" fill="#fde68a" />
      <polygon points="150,85 180,95 185,130 150,140" fill="#fcd34d" />
      <!-- 幾何大波浪灰黑短髮 -->
      <polygon points="105,95 125,60 150,55 150,85 115,95" fill="#475569" />
      <polygon points="150,55 175,60 195,95 185,95 150,85" fill="#334155" />
      <polygon points="90,115 110,95 100,140" fill="#475569" />
      <polygon points="190,95 210,115 200,140" fill="#334155" />
      <!-- 燦爛眨眼與笑容 -->
      <circle cx="136" cy="112" r="3" fill="#451a03" />
      <path d="M156 110 Q162 114 168 110" fill="none" stroke="#451a03" stroke-width="2" stroke-linecap="round" />
      <path d="M140 128 Q150 140 160 128" fill="#f8fafc" stroke="#451a03" stroke-width="2" />
      <!-- 雙手金色沙錘 -->
      <polygon points="55,145 75,130 85,150 65,165" fill="#fbbf24" stroke="#b45309" stroke-width="1.5" />
      <line x1="65" y1="165" x2="55" y2="185" stroke="#78350f" stroke-width="3" stroke-linecap="round" />
      <polygon points="245,145 225,130 215,150 235,165" fill="#fbbf24" stroke="#b45309" stroke-width="1.5" />
      <line x1="235" y1="165" x2="245" y2="185" stroke="#78350f" stroke-width="3" stroke-linecap="round" />
    `
  }
};

function generateFacetedSvg(code, cfg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <defs>
    <filter id="facetShadow_${code}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.2" />
    </filter>
  </defs>

  <!-- 柔和純淨圓形背景 -->
  <circle cx="150" cy="150" r="142" fill="${cfg.bg}" stroke="${cfg.color}" stroke-width="3.5" />
  
  <!-- 幾何線條感光環 -->
  <polygon points="150,30 235,80 270,165 235,250 150,270 65,250 30,165 65,80" fill="none" stroke="${cfg.color}" stroke-width="1" stroke-dasharray="4,4" opacity="0.35" />

  <!-- 幾何棱角折線人物 -->
  <g filter="url(#facetShadow_${code})">
    ${cfg.render()}
  </g>

  <!-- 頂部棱角徽章 -->
  <g transform="translate(0, -2)">
    <polygon points="105,16 195,16 205,30 195,44 105,44 95,30" fill="${cfg.color}" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))" />
    <text x="150" y="34" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="900" font-size="13" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">${cfg.code}</text>
  </g>
</svg>`;
}

Object.entries(FACETED_16_PERSONAS).forEach(([code, cfg]) => {
  const svgContent = generateFacetedSvg(code, cfg);
  const destPublic = path.join(avatarsDir, `${code}.svg`);
  const destDist = path.join(distAvatarsDir, `${code}.svg`);

  fs.writeFileSync(destPublic, svgContent, 'utf-8');
  fs.writeFileSync(destDist, svgContent, 'utf-8');
  console.log(`✅ [${code}.svg] 幾何棱角分面線條立繪生成成功`);
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

console.log('🎉 16 尊正統幾何棱角折線 (Low-Poly Faceted) 線條感立繪已全數生成！');
