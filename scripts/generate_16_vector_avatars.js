import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const brainDir = '/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8';
const avatarsDir = path.resolve('public/avatars');
const distAvatarsDir = path.resolve('dist/avatars');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(distAvatarsDir)) fs.mkdirSync(distAvatarsDir, { recursive: true });

// 100% 統一採用 explorer.jpg 同款的「頂級向量插畫藝術風格 (vector_* 系列)」
const vectorMasterConfigs = {
  // 💜 戰略分析家 (Analysts)
  entj: { src: 'vector_entj_1787706872189.jpg', label: 'ENTJ 皇家指揮官' },
  intj: { src: 'vector_intj_1787706885293.jpg', label: 'INTJ 藍圖建築師' },
  entp: { src: 'vector_entp_1787706900848.jpg', label: 'ENTP 辯論演說家' },
  intp: { src: 'vector_intp_1787706913901.jpg', label: 'INTP 邏輯科學家' },

  // 💚 心靈外交家 (Diplomats)
  infj: { src: 'vector_infj_1787706930974.jpg', label: 'INFJ 靈魂提倡者' },
  infp: { src: 'vector_infp_1787706946685.jpg', label: 'INFP 夢境調停者' },
  enfj: { src: 'vector_diplomat_1787706595193.jpg', label: 'ENFJ 主人公導師' },
  enfp: { src: 'vector_diplomat_1787706595193.jpg', label: 'ENFP 靈感競選者' },

  // 💙 秩序守護者 (Sentinels)
  estj: { src: 'vector_sentinel_1787706611475.jpg', label: 'ESTJ 總經理' },
  istj: { src: 'vector_sentinel_1787706611475.jpg', label: 'ISTJ 物流師' },
  esfj: { src: 'vector_sentinel_1787706611475.jpg', label: 'ESFJ 執政官' },
  isfj: { src: 'vector_sentinel_1787706611475.jpg', label: 'ISFJ 守衛者' },

  // 💛 自由探險家 (Explorers)
  estp: { src: 'vector_explorer_1787706629328.jpg', label: 'ESTP 破局企業家' },
  istp: { src: 'vector_explorer_1787706629328.jpg', label: 'ISTP 鑑賞匠人' },
  esfp: { src: 'vector_explorer_1787706629328.jpg', label: 'ESFP 舞台表演者' },
  isfp: { src: 'vector_explorer_1787706629328.jpg', label: 'ISFP 探險藝術家' },

  // 四大家族總覽
  strategist: { src: 'vector_analyst_1787706578551.jpg', label: '戰略分析家家族' },
  empath: { src: 'vector_diplomat_1787706595193.jpg', label: '心靈外交家家族' },
  sentinel: { src: 'vector_sentinel_1787706611475.jpg', label: '秩序守護者家族' },
  explorer: { src: 'vector_explorer_1787706629328.jpg', label: '自由探險家家族' }
};

Object.entries(vectorMasterConfigs).forEach(([key, cfg]) => {
  const srcPath = path.join(brainDir, cfg.src);
  const destPublic = path.join(avatarsDir, `${key}.jpg`);
  const destDist = path.join(distAvatarsDir, `${key}.jpg`);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPublic);
    fs.copyFileSync(srcPath, destDist);

    // 透過 sips 標準化為 500x500 高畫質正方形
    execSync(`sips -z 500 500 "${destPublic}"`);
    execSync(`sips -z 500 500 "${destDist}"`);

    console.log(`✅ [${key}.jpg] 100% 同款向量風格已就緒 (${cfg.label})`);
  } else {
    console.error(`❌ 找不到母檔: ${srcPath}`);
  }
});

console.log('🎉 16 種人格已全部 100% 統一為 explorer.jpg 同款頂級向量插畫風格！');
