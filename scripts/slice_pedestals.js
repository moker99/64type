import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userUploadDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8/.user_uploaded';
const avatarsDir = path.resolve('public/avatars');

async function main() {
  const img7Path = path.join(userUploadDir, 'media_1787708676206.png');
  const img4Path = path.join(userUploadDir, 'media_1787708278652.png');

  const meta7 = await sharp(img7Path).metadata();
  console.log('meta7:', meta7.width, meta7.height);

  const meta4 = await sharp(img4Path).metadata();
  console.log('meta4:', meta4.width, meta4.height);

  // 1. 從 7 人物圖中精確裁剪 (media_1787708676206.png)
  // 圖片尺寸 924 x 970
  // ISFP, ISFJ, INFJ, ESFP, ESTJ, INTJ, INFP
  const unitW = Math.floor(meta7.width / 7); // ~132px

  const sevenTypes = [
    { code: 'isfp', index: 0 },
    { code: 'isfj', index: 1 },
    { code: 'infj', index: 2 },
    { code: 'esfp', index: 3 },
    { code: 'estj', index: 4 },
    { code: 'intj', index: 5 },
    { code: 'infp', index: 6 }
  ];

  for (const item of sevenTypes) {
    const left = Math.max(0, item.index * unitW - 10);
    const width = Math.min(meta7.width - left, unitW + 20);
    const dest = path.join(avatarsDir, `${item.code}.jpg`);
    await sharp(img7Path)
      .extract({ left, top: 0, width, height: meta7.height })
      .resize(400, 400, { fit: 'cover', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .jpeg({ quality: 95 })
      .toFile(dest);
    console.log(`✅ Extracted ${item.code}.jpg from 7-pedestal banner`);
  }

  // 2. 從 4 人物分析家圖中精確裁剪 (media_1787708278652.png)
  // INTJ, INTP, ENTJ, ENTP
  const unitW4 = Math.floor(meta4.width / 4); // ~256px
  const fourTypes = [
    { code: 'intj_classic', index: 0 },
    { code: 'intp', index: 1 },
    { code: 'entj', index: 2 },
    { code: 'entp', index: 3 }
  ];

  for (const item of fourTypes) {
    const left = item.index * unitW4;
    const width = unitW4;
    const dest = path.join(avatarsDir, `${item.code.replace('_classic', '')}.jpg`);
    await sharp(img4Path)
      .extract({ left, top: 0, width, height: meta4.height })
      .resize(400, 400, { fit: 'cover', background: { r: 245, g: 243, b: 255, alpha: 1 } })
      .jpeg({ quality: 95 })
      .toFile(dest);
    console.log(`✅ Extracted ${item.code}.jpg from 4-analyst banner`);
  }

  // 3. 補齊剩餘獨立類型 (ESTP, ISTP, ISTJ, ESFJ, ENFJ, ENFP)
  // 每一型都擁有自己截然不同的專屬高品質人設立繪
  const remainingMappings = {
    // 探險家系列
    estp: 'vector_explorer_1787706629328.jpg',
    istp: 'avatar_explorer_warm_1787706412703.jpg',
    // 守護者系列
    istj: 'avatar_sentinel_warm_1787706394354.jpg',
    esfj: 'avatar_strategist_warm_1787681455933.jpg',
    // 外交家系列
    enfj: 'avatar_empath_warm_1787706379283.jpg',
    enfp: 'vector_diplomat_1787706595193.jpg',

    // 四大家族展示
    strategist: 'vector_analyst_1787706578551.jpg',
    empath: 'avatar_empath_warm_1787706379283.jpg',
    sentinel: 'avatar_sentinel_warm_1787706394354.jpg',
    explorer: 'avatar_explorer_warm_1787706412703.jpg'
  };

  const brainDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8';
  for (const [key, file] of Object.entries(remainingMappings)) {
    const src = path.join(brainDir, file);
    const dest = path.join(avatarsDir, `${key}.jpg`);
    if (fs.existsSync(src)) {
      await sharp(src)
        .resize(400, 400, { fit: 'cover' })
        .jpeg({ quality: 95 })
        .toFile(dest);
      console.log(`✅ Configured distinct ${key}.jpg from ${file}`);
    }
  }
}

main().catch(console.error);
