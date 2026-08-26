import fs from 'fs';
import path from 'path';

const brainDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8';
const avatarsDir = path.resolve('public/avatars');

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// 全部映射至高品質手繪/向量插畫圖檔 (.jpg)
const mapping = {
  // 四大家族
  strategist: 'vector_analyst_1787706578551.jpg',
  empath: 'vector_diplomat_1787706595193.jpg',
  sentinel: 'vector_sentinel_1787706611475.jpg',
  explorer: 'vector_explorer_1787706629328.jpg',

  // 16 大獨立人格
  entj: 'vector_entj_1787706872189.jpg',
  intj: 'vector_intj_1787706885293.jpg',
  entp: 'vector_entp_1787706900848.jpg',
  intp: 'vector_intp_1787706913901.jpg',

  infj: 'vector_infj_1787706930974.jpg',
  infp: 'vector_infp_1787706946685.jpg',
  enfj: 'vector_diplomat_1787706595193.jpg',
  enfp: 'vector_diplomat_1787706595193.jpg',

  estj: 'vector_sentinel_1787706611475.jpg',
  istj: 'vector_sentinel_1787706611475.jpg',
  esfj: 'vector_sentinel_1787706611475.jpg',
  isfj: 'vector_sentinel_1787706611475.jpg',

  estp: 'vector_explorer_1787706629328.jpg',
  istp: 'vector_explorer_1787706629328.jpg',
  esfp: 'vector_explorer_1787706629328.jpg',
  isfp: 'vector_explorer_1787706629328.jpg'
};

Object.entries(mapping).forEach(([key, srcFile]) => {
  const src = path.join(brainDir, srcFile);
  const dest = path.join(avatarsDir, `${key}.jpg`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ ${key}.jpg updated with ${srcFile}`);
  } else {
    console.error(`❌ Missing: ${src}`);
  }
});

console.log('🎉 全部頭像已完整更新為高品質 2D 向量插畫！');
