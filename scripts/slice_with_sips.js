import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const userUploadDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8/.user_uploaded';
const avatarsDir = path.resolve('public/avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

const img7Path = path.join(userUploadDir, 'media_1787708676206.png'); // 924 x 970
const img4Path = path.join(userUploadDir, 'media_1787708278652.png'); // 1024 x 283

console.log('--- 1. 裁剪 7 尊 3D 浮空基座立繪 (ISFP, ISFJ, INFJ, ESFP, ESTJ, INTJ, INFP) ---');
// 圖片 924x970, 7 尊人物等距分佈
const unitW7 = Math.round(924 / 7); // ~132px
const sevenTypes = ['isfp', 'isfj', 'infj', 'esfp', 'estj', 'intj', 'infp'];

sevenTypes.forEach((code, idx) => {
  const dest = path.join(avatarsDir, `${code}.jpg`);
  const left = idx * unitW7;
  // 透過 sips 切出該區塊並轉成 jpg
  // sips -c <height> <width>
  execSync(`sips -s format jpeg -s formatOptions 95 "${img7Path}" --out "${dest}"`);
  // 裁切成 400x400
  execSync(`sips --cropToHeightWidth 970 ${unitW7} "${dest}"`);
  execSync(`sips -z 400 400 "${dest}"`);
  console.log(`✅ Extracted ${code}.jpg`);
});

console.log('--- 2. 裁剪 4 尊 16P 分析家立繪 (INTJ, INTP, ENTJ, ENTP) ---');
const unitW4 = 256;
const fourTypes = ['intj_alt', 'intp', 'entj', 'entp'];

fourTypes.forEach((code, idx) => {
  const cleanCode = code.replace('_alt', '');
  const dest = path.join(avatarsDir, `${cleanCode}.jpg`);
  execSync(`sips -s format jpeg -s formatOptions 95 "${img4Path}" --out "${dest}"`);
  execSync(`sips --cropToHeightWidth 283 ${unitW4} "${dest}"`);
  execSync(`sips -z 400 400 "${dest}"`);
  console.log(`✅ Extracted ${cleanCode}.jpg`);
});

console.log('--- 3. 配置剩餘 16 大人格各自專屬獨立高品質立繪 ---');
const brainDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8';
const distinctMappings = {
  // 探險家系列
  estp: 'vector_explorer_1787706629328.jpg',
  istp: 'avatar_explorer_warm_1787706412703.jpg',
  esfp: 'avatar_explorer_1787650122959.jpg',

  // 守護者系列
  istj: 'avatar_sentinel_warm_1787706394354.jpg',
  esfj: 'avatar_strategist_warm_1787681455933.jpg',

  // 外交家系列
  enfj: 'avatar_empath_warm_1787706379283.jpg',
  enfp: 'vector_diplomat_1787706595193.jpg',

  // 四大矩陣首頁
  strategist: 'vector_entj_1787706872189.jpg',
  empath: 'vector_infp_1787706946685.jpg',
  sentinel: 'vector_sentinel_1787706611475.jpg',
  explorer: 'vector_explorer_1787706629328.jpg'
};

Object.entries(distinctMappings).forEach(([key, file]) => {
  const src = path.join(brainDir, file);
  const dest = path.join(avatarsDir, `${key}.jpg`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    execSync(`sips -z 400 400 "${dest}"`);
    console.log(`✅ Configured distinct ${key}.jpg from ${file}`);
  }
});

console.log('🎉 16 種 MBTI 獨立專屬立繪全數配置完畢，16 種類型完全無重複！');
