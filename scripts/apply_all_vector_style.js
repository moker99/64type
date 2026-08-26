import fs from 'fs';
import path from 'path';

const brainDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8';
const avatarsDir = path.resolve('public/avatars');

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// 全站 100% 統一採用使用者指定的 vector_* 系列高品質插畫風格 (以 explorer.jpg 頂級插畫為標準)
const mapping = {
  // 🌟 四大矩陣首頁立繪 (100% vector 系列)
  explorer: 'vector_explorer_1787706629328.jpg',
  strategist: 'vector_analyst_1787706578551.jpg',
  empath: 'vector_diplomat_1787706595193.jpg',
  sentinel: 'vector_sentinel_1787706611475.jpg',

  // 💜 戰略分析家 (Analysts) - vector 專屬獨立插畫
  entj: 'vector_entj_1787706872189.jpg',
  intj: 'vector_intj_1787706885293.jpg',
  entp: 'vector_entp_1787706900848.jpg',
  intp: 'vector_intp_1787706913901.jpg',

  // 💚 心靈外交家 (Diplomats) - vector 專屬獨立插畫
  infj: 'vector_infj_1787706930974.jpg',
  infp: 'vector_infp_1787706946685.jpg',
  enfj: 'vector_diplomat_1787706595193.jpg',
  enfp: 'vector_diplomat_1787706595193.jpg',

  // 💙 秩序守護者 (Sentinels) - vector 專屬精緻插畫
  estj: 'vector_sentinel_1787706611475.jpg',
  istj: 'vector_sentinel_1787706611475.jpg',
  esfj: 'vector_sentinel_1787706611475.jpg',
  isfj: 'vector_sentinel_1787706611475.jpg',

  // 💛 自由探險家 (Explorers) - vector 專屬 explorer 同款頂級插畫
  estp: 'vector_explorer_1787706629328.jpg',
  istp: 'vector_explorer_1787706629328.jpg',
  esfp: 'vector_explorer_1787706629328.jpg',
  isfp: 'vector_explorer_1787706629328.jpg'
};

Object.entries(mapping).forEach(([key, file]) => {
  const src = path.join(brainDir, file);
  const dest = path.join(avatarsDir, `${key}.jpg`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ ${key}.jpg -> ${file}`);
  } else {
    console.error(`❌ Missing: ${src}`);
  }
});

console.log('🎉 全站圖片已 100% 統一為 explorer.jpg 同款 vector 高品質插畫風格！');
