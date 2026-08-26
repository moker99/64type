import fs from 'fs';
import path from 'path';

const brainDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8';
const avatarsDir = path.resolve('public/avatars');

const mapping = {
  // 四大矩陣首頁專屬立繪
  strategist: 'avatar_strategist_warm_1787681455933.jpg',
  empath: 'avatar_empath_warm_1787706379283.jpg',
  sentinel: 'avatar_sentinel_warm_1787706394354.jpg',
  explorer: 'avatar_explorer_warm_1787706412703.jpg',

  // 16 大人格各自專屬配置
  entj: 'avatar_strategist_1787650069440.jpg',
  intj: 'avatar_strategist_warm_1787681455933.jpg',
  entp: 'avatar_sentinel_1787650102705.jpg',
  intp: 'avatar_strategist_1787650069440.jpg',

  infj: 'avatar_empath_1787650086558.jpg',
  infp: 'avatar_empath_warm_1787706379283.jpg',
  enfj: 'avatar_empath_warm_1787706379283.jpg',
  enfp: 'avatar_empath_1787650086558.jpg',

  estj: 'avatar_sentinel_warm_1787706394354.jpg',
  istj: 'avatar_sentinel_1787650102705.jpg',
  esfj: 'avatar_strategist_warm_1787681455933.jpg',
  isfj: 'avatar_sentinel_warm_1787706394354.jpg',

  estp: 'avatar_explorer_warm_1787706412703.jpg',
  istp: 'avatar_explorer_1787650122959.jpg',
  esfp: 'avatar_explorer_warm_1787706412703.jpg',
  isfp: 'avatar_explorer_1787650122959.jpg'
};

Object.entries(mapping).forEach(([key, srcFile]) => {
  const src = path.join(brainDir, srcFile);
  const dest = path.join(avatarsDir, `${key}.jpg`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ ${key}.jpg updated with ${srcFile}`);
  } else {
    console.error(`Missing: ${src}`);
  }
});
