import fs from 'fs';
import path from 'path';
import https from 'https';

const officialDir = path.resolve('public/avatars/official');
if (!fs.existsSync(officialDir)) fs.mkdirSync(officialDir, { recursive: true });

const personas = [
  // 💜 Analysts
  { code: 'intj', slug: 'intj-architect-male' },
  { code: 'intp', slug: 'intp-logician-female' },
  { code: 'entj', slug: 'entj-commander-male' },
  { code: 'entp', slug: 'entp-debater-male' },
  // 💚 Diplomats
  { code: 'infj', slug: 'infj-advocate-male' },
  { code: 'infp', slug: 'infp-mediator-female' },
  { code: 'enfj', slug: 'enfj-protagonist-female' },
  { code: 'enfp', slug: 'enfp-campaigner-female' },
  // 💙 Sentinels
  { code: 'istj', slug: 'istj-logistician-male' },
  { code: 'isfj', slug: 'isfj-defender-female' },
  { code: 'estj', slug: 'estj-executive-male' },
  { code: 'esfj', slug: 'esfj-consul-female' },
  // 💛 Explorers
  { code: 'istp', slug: 'istp-virtuoso-male' },
  { code: 'isfp', slug: 'isfp-adventurer-female' },
  { code: 'estp', slug: 'estp-entrepreneur-male' },
  { code: 'esfp', slug: 'esfp-entertainer-female' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🚀 下載 16 尊原汁原味正版向量人物立繪...');
  for (const p of personas) {
    const url = `https://www.16personalities.com/static/images/personality-types/avatars/${p.slug}.svg?v=3`;
    const dest = path.join(officialDir, `${p.code}.svg`);
    try {
      await downloadFile(url, dest);
      console.log(`✅ 下載成功: ${p.code}.svg (${p.slug})`);
    } catch (e) {
      console.error(`❌ 下載失敗: ${p.code} ->`, e.message);
    }
  }
}

main();
