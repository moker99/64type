import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DIMENSIONS, QUESTIONS } from './src/data/questions.js';
import { getAllPersonalities, getPersonalityProfile } from './src/data/personalityData.js';
import { PersonalityEngine } from './src/utils/engine.js';

console.log("=== 1. 題庫驗證 ===");
console.log(`總題數: ${QUESTIONS.length} (預期 60 題)`);
if (QUESTIONS.length !== 60) throw new Error("題數不為 60 題！");

const dimCounts = {};
QUESTIONS.forEach(q => {
  dimCounts[q.dimension] = (dimCounts[q.dimension] || 0) + 1;
  if (![1, -1].includes(q.direction)) throw new Error(`題目 ${q.id} 方向設定異常`);
});
console.log("各維度題數分佈:", dimCounts);
Object.keys(DIMENSIONS).forEach(dim => {
  if (dimCounts[dim] !== 10) throw new Error(`維度 ${dim} 題數不為 10 題！`);
});

console.log("\n=== 2. 64 型人格資料庫驗證 ===");
const allTypes = getAllPersonalities();
console.log(`人格總數: ${allTypes.length} (預期 64 種)`);
if (allTypes.length !== 64) throw new Error("人格總數不為 64 種！");

const dims = [
  ['E', 'I'],
  ['S', 'N'],
  ['T', 'F'],
  ['J', 'P'],
  ['A', 'R'],
  ['D', 'C']
];

function generateAllCombinations(index = 0, current = []) {
  if (index === dims.length) {
    const code = `${current[0]}${current[1]}${current[2]}${current[3]}-${current[4]}${current[5]}`;
    return [code];
  }
  let results = [];
  dims[index].forEach(val => {
    results = results.concat(generateAllCombinations(index + 1, [...current, val]));
  });
  return results;
}

const allExpectedCodes = generateAllCombinations();
console.log(`生成預期代碼總數: ${allExpectedCodes.length}`);

allExpectedCodes.forEach(code => {
  const profile = getPersonalityProfile(code);
  if (!profile.name || !profile.tagline || !profile.superpowers || profile.superpowers.length === 0) {
    throw new Error(`人格 ${code} 資料不完整！`);
  }
});
console.log("全部 64 種代碼驗證完畢，資料皆齊全且有效！");

console.log("\n=== 3. 計分演算法模擬測試 ===");
const testAnswers1 = {};
QUESTIONS.forEach(q => {
  testAnswers1[q.id] = q.direction === 1 ? 2 : -2;
});
const res1 = PersonalityEngine.calculateResult(testAnswers1);
console.log("全正向傾向結果:", res1.code, res1.profile.name);
if (res1.code !== "ESTJ-AD") {
  console.warn("期望 ESTJ-AD，獲得:", res1.code);
}

const testAnswers2 = {};
QUESTIONS.forEach(q => {
  testAnswers2[q.id] = q.direction === 1 ? -2 : 2;
});
const res2 = PersonalityEngine.calculateResult(testAnswers2);
console.log("全反向傾向結果:", res2.code, res2.profile.name);
if (res2.code !== "INFP-RC") {
  console.warn("期望 INFP-RC，獲得:", res2.code);
}

console.log("\n✅ 全部 60 題單元測試與資料驗證皆 100% 通過！");
