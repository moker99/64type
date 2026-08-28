import fs from 'fs';
import path from 'path';

const avatarsDir = path.resolve('public/avatars');
const distAvatarsDir = path.resolve('dist/avatars');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(distAvatarsDir)) fs.mkdirSync(distAvatarsDir, { recursive: true });

const PERSONAS = [
  { code: 'entj', group: 'analyst', color: '#88619a', bg: '#1e102d' },
  { code: 'intj', group: 'analyst', color: '#88619a', bg: '#1e102d' },
  { code: 'entp', group: 'analyst', color: '#88619a', bg: '#1e102d' },
  { code: 'intp', group: 'analyst', color: '#88619a', bg: '#1e102d' },

  { code: 'enfj', group: 'diplomat', color: '#33a474', bg: '#0d281e' },
  { code: 'infj', group: 'diplomat', color: '#33a474', bg: '#0d281e' },
  { code: 'enfp', group: 'diplomat', color: '#33a474', bg: '#0d281e' },
  { code: 'infp', group: 'diplomat', color: '#33a474', bg: '#0d281e' },

  { code: 'estj', group: 'sentinel', color: '#3b82f6', bg: '#0f1d38' },
  { code: 'istj', group: 'sentinel', color: '#3b82f6', bg: '#0f1d38' },
  { code: 'esfj', group: 'sentinel', color: '#3b82f6', bg: '#0f1d38' },
  { code: 'isfj', group: 'sentinel', color: '#3b82f6', bg: '#0f1d38' },

  { code: 'estp', group: 'explorer', color: '#eab308', bg: '#2b1e09' },
  { code: 'istp', group: 'explorer', color: '#eab308', bg: '#2b1e09' },
  { code: 'esfp', group: 'explorer', color: '#eab308', bg: '#2b1e09' },
  { code: 'isfp', group: 'explorer', color: '#eab308', bg: '#2b1e09' },
];

for (const p of PERSONAS) {
  const pngPath = path.join(avatarsDir, `${p.code}.png`);
  if (!fs.existsSync(pngPath)) {
    console.error(`PNG not found for ${p.code}`);
    continue;
  }

  const pngBase64 = fs.readFileSync(pngPath).toString('base64');
  const dataUri = `data:image/png;base64,${pngBase64}`;

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="glow_${p.code}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.color}" stop-opacity="0.35" />
      <stop offset="60%" stop-color="${p.color}" stop-opacity="0.12" />
      <stop offset="100%" stop-color="${p.bg}" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow_${p.code}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- 深色漸變底圓 -->
  <circle cx="200" cy="200" r="192" fill="${p.bg}" stroke="${p.color}" stroke-width="3" stroke-opacity="0.4" />
  
  <!-- 能量光暈中心 -->
  <circle cx="200" cy="220" r="160" fill="url(#glow_${p.code})" />
  
  <!-- 幾何星芒外環飾線 -->
  <polygon points="200,25 325,75 375,200 325,325 200,375 75,325 25,200 75,75" fill="none" stroke="${p.color}" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.35" />

  <!-- 原創 2.5D 浮空立繪角色主體 -->
  <image href="${dataUri}" x="30" y="20" width="340" height="350" preserveAspectRatio="xMidYMid meet" filter="url(#shadow_${p.code})" />
</svg>`;

  fs.writeFileSync(path.join(avatarsDir, `${p.code}.svg`), svgContent);
  fs.writeFileSync(path.join(distAvatarsDir, `${p.code}.svg`), svgContent);

  // Copy PNG to dist as well
  fs.copyFileSync(pngPath, path.join(distAvatarsDir, `${p.code}.png`));
  console.log(`Generated SVG and bundled PNG for: ${p.code}`);
}

// 產生四大代表角色別名
const aliases = [
  { alias: 'strategist', target: 'entj' },
  { alias: 'empath', target: 'infp' },
  { alias: 'sentinel', target: 'estj' },
  { alias: 'explorer', target: 'estp' },
];

for (const a of aliases) {
  const srcSvg = path.join(avatarsDir, `${a.target}.svg`);
  const srcPng = path.join(avatarsDir, `${a.target}.png`);
  
  fs.copyFileSync(srcSvg, path.join(avatarsDir, `${a.alias}.svg`));
  fs.copyFileSync(srcSvg, path.join(distAvatarsDir, `${a.alias}.svg`));
  
  fs.copyFileSync(srcPng, path.join(avatarsDir, `${a.alias}.png`));
  fs.copyFileSync(srcPng, path.join(distAvatarsDir, `${a.alias}.png`));
  console.log(`Created alias: ${a.alias} -> ${a.target}`);
}

console.log('🎉 全部 16 尊原創 2.5D 浮空地台立繪 SVG 與 PNG 封裝完畢！');
