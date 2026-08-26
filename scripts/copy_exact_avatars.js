import fs from 'fs';
import path from 'path';

const brainDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8';
const avatarsDir = path.resolve('public/avatars');

const mapping = {
  entj: 'vector_entj_1787706872189.jpg',
  intj: 'vector_intj_1787706885293.jpg',
  entp: 'vector_entp_1787706900848.jpg',
  intp: 'vector_intp_1787706913901.jpg',
  infj: 'vector_infj_1787706930974.jpg',
  infp: 'vector_infp_1787706946685.jpg',
  enfj: 'avatar_empath_warm_1787706379283.jpg',
  enfp: 'vector_diplomat_1787706595193.jpg',
  estj: 'vector_sentinel_1787706611475.jpg',
  istj: 'avatar_sentinel_warm_1787706394354.jpg',
  esfj: 'avatar_strategist_warm_1787681455933.jpg',
  isfj: 'avatar_sentinel_1787650102705.jpg',
  estp: 'avatar_explorer_warm_1787706412703.jpg',
  istp: 'vector_explorer_1787706629328.jpg',
  esfp: 'avatar_explorer_1787650122959.jpg',
  isfp: 'vector_analyst_1787706578551.jpg'
};

Object.entries(mapping).forEach(([key, srcFile]) => {
  const src = path.join(brainDir, srcFile);
  const dest = path.join(avatarsDir, `${key}.jpg`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${key}.jpg from ${srcFile}`);
  } else {
    console.error(`Source missing: ${src}`);
  }
});
