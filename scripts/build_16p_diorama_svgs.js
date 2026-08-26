import fs from 'fs';
import path from 'path';

const officialDir = path.resolve('public/avatars/official');
const avatarsDir = path.resolve('public/avatars');
const distAvatarsDir = path.resolve('dist/avatars');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(distAvatarsDir)) fs.mkdirSync(distAvatarsDir, { recursive: true });

const PERSONAS_CONFIG = {
  // 💜 戰略分析家 (Analysts)
  intj: { code: 'INTJ', color: '#88619a', bg: '#fbf7fd', sub: '架構師' },
  intp: { code: 'INTP', color: '#88619a', bg: '#fbf7fd', sub: '邏輯學家' },
  entj: { code: 'ENTJ', color: '#88619a', bg: '#fbf7fd', sub: '指揮官' },
  entp: { code: 'ENTP', color: '#88619a', bg: '#fbf7fd', sub: '辯論家' },

  // 💚 心靈外交家 (Diplomats)
  infj: { code: 'INFJ', color: '#33a474', bg: '#f2fbf6', sub: '提倡者' },
  infp: { code: 'INFP', color: '#33a474', bg: '#f2fbf6', sub: '調停者' },
  enfj: { code: 'ENFJ', color: '#33a474', bg: '#f2fbf6', sub: '主人公' },
  enfp: { code: 'ENFP', color: '#33a474', bg: '#f2fbf6', sub: '競選者' },

  // 💙 秩序守護者 (Sentinels)
  istj: { code: 'ISTJ', color: '#4298b4', bg: '#f1f9fc', sub: '物流師' },
  isfj: { code: 'ISFJ', color: '#4298b4', bg: '#f1f9fc', sub: '守衛者' },
  estj: { code: 'ESTJ', color: '#4298b4', bg: '#f1f9fc', sub: '總經理' },
  esfj: { code: 'ESFJ', color: '#4298b4', bg: '#f1f9fc', sub: '執政官' },

  // 💛 自由探險家 (Explorers)
  istp: { code: 'ISTP', color: '#e4ae3a', bg: '#fefcf3', sub: '鑑賞家' },
  isfp: { code: 'ISFP', color: '#e4ae3a', bg: '#fefcf3', sub: '探險家' },
  estp: { code: 'ESTP', color: '#e4ae3a', bg: '#fefcf3', sub: '企業家' },
  esfp: { code: 'ESFP', color: '#e4ae3a', bg: '#fefcf3', sub: '表演者' }
};

function wrapCharacterWithDiorama(code, rawSvgContent, cfg) {
  // 提取原始 SVG 內部的 defs 與內容
  let styleMatch = rawSvgContent.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  let styleContent = styleMatch ? styleMatch[1] : '';

  // 移除外層 <svg> 標籤，保留圖形本體
  let bodyContent = rawSvgContent
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '')
    .replace(/<defs[\s\S]*?<\/defs>/i, '')
    .replace(/<title[\s\S]*?<\/title>/i, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <style>
      ${styleContent}
    </style>
    <linearGradient id="pedestalTop_${code}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>
    <linearGradient id="pedestalSide_${code}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>
    <filter id="shadow_${code}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.18" />
    </filter>
  </defs>

  <!-- 現代圓形漸變背景 -->
  <circle cx="200" cy="200" r="192" fill="${cfg.bg}" stroke="${cfg.color}" stroke-width="4" />
  
  <!-- 幾何光環背景飾線 -->
  <polygon points="200,30 320,80 370,200 320,320 200,370 80,320 30,200 80,80" fill="none" stroke="${cfg.color}" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.3" />

  <!-- 3D 浮空岩石基座 (3D Floating Hexagonal Pedestal) -->
  <g filter="url(#shadow_${code})">
    <polygon points="70,335 200,365 330,335 330,355 200,385 70,355" fill="url(#pedestalSide_${code})" />
    <polygon points="200,365 330,335 330,355 200,385" fill="#64748b" opacity="0.35" />
    <polygon points="200,305 330,335 200,365 70,335" fill="url(#pedestalTop_${code})" stroke="#ffffff" stroke-width="2" />
    
    <!-- 基座碎石點綴 -->
    <polygon points="105,340 118,336 124,344 112,347" fill="#94a3b8" />
    <polygon points="285,338 298,335 302,343 289,345" fill="#94a3b8" />
  </g>

  <!-- 原汁原味 16Personalities 正版正統人物圖層 (等比例完美置中於基座上) -->
  <g transform="translate(40, 20) scale(0.8)">
    ${bodyContent}
  </g>

  <!-- 頂部標誌性對話泡泡 (Speech Bubble Tag) -->
  <g transform="translate(0, -2)">
    <path d="M140 32 Q140 16 160 16 L240 16 Q260 16 260 32 L260 48 Q260 64 240 64 L208 64 L200 74 L192 64 L160 64 Q140 64 140 48 Z" fill="${cfg.color}" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))" />
    <text x="200" y="45" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle" letter-spacing="2">${cfg.code}</text>
  </g>
</svg>`;
}

async function main() {
  console.log('🚀 開始將 16 尊原版正統人物立繪整合至 3D 浮空基座與對話泡泡模組...');

  Object.entries(PERSONAS_CONFIG).forEach(([code, cfg]) => {
    const rawFile = path.join(officialDir, `${code}.svg`);
    if (!fs.existsSync(rawFile)) {
      console.error(`❌ 找不到原版檔: ${rawFile}`);
      return;
    }

    const rawSvg = fs.readFileSync(rawFile, 'utf-8');
    const finalSvg = wrapCharacterWithDiorama(code, rawSvg, cfg);

    const destPublic = path.join(avatarsDir, `${code}.svg`);
    const destDist = path.join(distAvatarsDir, `${code}.svg`);

    fs.writeFileSync(destPublic, finalSvg, 'utf-8');
    fs.writeFileSync(destDist, finalSvg, 'utf-8');

    console.log(`✅ [${code}.svg] 原版人物 + 3D 浮空基座整合成功`);
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

  console.log('🎉 16 尊正版人物 + 3D 浮空基座原創立繪已全數就緒，完美維持原人物特徵！');
}

main();
