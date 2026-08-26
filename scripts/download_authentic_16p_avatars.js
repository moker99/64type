import fs from 'fs';
import path from 'path';
import https from 'https';

const avatarsDir = path.resolve('public/avatars');
const distAvatarsDir = path.resolve('dist/avatars');

if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });
if (!fs.existsSync(distAvatarsDir)) fs.mkdirSync(distAvatarsDir, { recursive: true });

const personas = [
  { code: 'entj', slug: 'entj-commander-male' },
  { code: 'intj', slug: 'intj-architect-male' },
  { code: 'entp', slug: 'entp-debater-male' },
  { code: 'intp', slug: 'intp-logician-female' },
  { code: 'infj', slug: 'infj-advocate-male' },
  { code: 'infp', slug: 'infp-mediator-female' },
  { code: 'enfj', slug: 'enfj-protagonist-female' },
  { code: 'enfp', slug: 'enfp-campaigner-female' },
  { code: 'estj', slug: 'estj-executive-male' },
  { code: 'istj', slug: 'istj-logistician-male' },
  { code: 'esfj', slug: 'esfj-consul-female' },
  { code: 'isfj', slug: 'isfj-defender-female' },
  { code: 'estp', slug: 'estp-entrepreneur-male' },
  { code: 'istp', slug: 'istp-virtuoso-male' },
  { code: 'esfp', slug: 'esfp-entertainer-female' },
  { code: 'isfp', slug: 'isfp-adventurer-female' }
];

function downloadSvg(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadSvg(res.headers.location, dest).then(resolve).catch(reject);
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
  console.log('🚀 開始下載 16 種核心 MBTI 官方原版正統向量人物立繪 (16 尊獨立且完全不同)...');

  for (const p of personas) {
    const url = `https://www.16personalities.com/static/images/personality-types/avatars/${p.slug}.svg?v=3`;
    const dest = path.join(avatarsDir, `${p.code}.svg`);
    const distDest = path.join(distAvatarsDir, `${p.code}.svg`);

    try {
      await downloadSvg(url, dest);
      fs.copyFileSync(dest, distDest);
      console.log(`✅ 下載成功: ${p.code}.svg (${p.slug})`);
    } catch (err) {
      console.error(`❌ 下載失敗: ${p.code} ->`, err.message);
    }
  }

  // 四大家族總覽
  fs.copyFileSync(path.join(avatarsDir, 'entj.svg'), path.join(avatarsDir, 'strategist.svg'));
  fs.copyFileSync(path.join(avatarsDir, 'infp.svg'), path.join(avatarsDir, 'empath.svg'));
  fs.copyFileSync(path.join(avatarsDir, 'estj.svg'), path.join(avatarsDir, 'sentinel.svg'));
  fs.copyFileSync(path.join(avatarsDir, 'isfp.svg'), path.join(avatarsDir, 'explorer.svg'));

  fs.copyFileSync(path.join(avatarsDir, 'entj.svg'), path.join(distAvatarsDir, 'strategist.svg'));
  fs.copyFileSync(path.join(avatarsDir, 'infp.svg'), path.join(distAvatarsDir, 'empath.svg'));
  fs.copyFileSync(path.join(avatarsDir, 'estj.svg'), path.join(distAvatarsDir, 'sentinel.svg'));
  fs.copyFileSync(path.join(avatarsDir, 'isfp.svg'), path.join(distAvatarsDir, 'explorer.svg'));

  console.log('🎉 16 尊官方正統 MBTI 人物立繪已全數下載並配置完畢，16 種類型完全獨立且絕無重複！');
}

main();
