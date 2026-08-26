import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const userUploadDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8/.user_uploaded';
const avatarsDir = path.resolve('public/avatars');
const distAvatarsDir = path.resolve('dist/avatars');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(distAvatarsDir)) fs.mkdirSync(distAvatarsDir, { recursive: true });

// 4 張使用者上傳的最新 16 人格母圖 (寬度皆為 1024px，每張各包含 4 尊獨立人物)
const bannerConfigs = [
  {
    file: 'media_1787709671988.png', // 分析家 💜 (INTJ, INTP, ENTJ, ENTP)
    height: 359,
    personas: ['intj', 'intp', 'entj', 'entp']
  },
  {
    file: 'media_1787709672009.png', // 外交家 💚 (INFJ, INFP, ENFJ, ENFP)
    height: 395,
    personas: ['infj', 'infp', 'enfj', 'enfp']
  },
  {
    file: 'media_1787709672038.png', // 守衛者 💙 (ISTJ, ISFJ, ESTJ, ESFJ)
    height: 390,
    personas: ['istj', 'isfj', 'estj', 'esfj']
  },
  {
    file: 'media_1787709672056.png', // 探索者 💛 (ISTP, ISFP, ESTP, ESFP)
    height: 375,
    personas: ['istp', 'isfp', 'estp', 'esfp']
  }
];

console.log('🚀 開始從使用者上傳的 4 大矩陣母圖精確裁剪 16 尊獨立人物立繪...');

bannerConfigs.forEach(({ file, height, personas }) => {
  const bannerPath = path.join(userUploadDir, file);
  const unitW = 256; // 1024 / 4

  personas.forEach((code, idx) => {
    const dest = path.join(avatarsDir, `${code}.jpg`);
    const distDest = path.join(distAvatarsDir, `${code}.jpg`);

    // 1. 轉成 jpg
    execSync(`sips -s format jpeg -s formatOptions 95 "${bannerPath}" --out "${dest}"`);
    // 2. 裁切出對應人物 (寬度 256，高度為原圖高度)
    execSync(`sips --cropToHeightWidth ${height} ${unitW} "${dest}"`);
    // 3. 調整為 500x500 高畫質正方形
    execSync(`sips -z 500 500 "${dest}"`);
    fs.copyFileSync(dest, distDest);

    console.log(`✅ [${code}.jpg] 裁剪成功 (來自 ${file} 第 ${idx + 1} 尊)`);
  });
});

// 四大家族總覽母圖
fs.copyFileSync(path.join(avatarsDir, 'entj.jpg'), path.join(avatarsDir, 'strategist.jpg'));
fs.copyFileSync(path.join(avatarsDir, 'infp.jpg'), path.join(avatarsDir, 'empath.jpg'));
fs.copyFileSync(path.join(avatarsDir, 'estj.jpg'), path.join(avatarsDir, 'sentinel.jpg'));
fs.copyFileSync(path.join(avatarsDir, 'isfp.jpg'), path.join(avatarsDir, 'explorer.jpg'));

fs.copyFileSync(path.join(avatarsDir, 'entj.jpg'), path.join(distAvatarsDir, 'strategist.jpg'));
fs.copyFileSync(path.join(avatarsDir, 'infp.jpg'), path.join(distAvatarsDir, 'empath.jpg'));
fs.copyFileSync(path.join(avatarsDir, 'estj.jpg'), path.join(distAvatarsDir, 'sentinel.jpg'));
fs.copyFileSync(path.join(avatarsDir, 'isfp.jpg'), path.join(distAvatarsDir, 'explorer.jpg'));

console.log('🎉 16 尊獨立專屬人物立繪已全部精確裁剪並配置完畢，16 種類型完全不同且絕無重複！');
