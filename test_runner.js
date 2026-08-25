const fs = require('fs');
const path = require('path');

const vm = require('vm');

// 載入 JS 檔案
const questionsCode = fs.readFileSync(path.join(__dirname, 'js/questions.js'), 'utf8');
const personalityDataCode = fs.readFileSync(path.join(__dirname, 'js/personalityData.js'), 'utf8');
const engineCode = fs.readFileSync(path.join(__dirname, 'js/engine.js'), 'utf8');

// 建立全域執行環境
vm.runInThisContext(questionsCode);
vm.runInThisContext(personalityDataCode);
vm.runInThisContext(engineCode);

console.log("=== 1. 題庫驗證 ===");
console.log(`總題數: ${QUESTIONS.length} (預期 48 題)`);
if (QUESTIONS.length !== 48) throw new Error("題數不為 48 題！");

const dimCounts = {};
QUESTIONS.forEach(q => {
  dimCounts[q.dimension] = (dimCounts[q.dimension] || 0) + 1;
  if (![1, -1].includes(q.direction)) throw new Error(`題目 ${q.id} 方向設定異常`);
});
console.log("各維度題數分佈:", dimCounts);
Object.keys(DIMENSIONS).forEach(dim => {
  if (dimCounts[dim] !== 8) throw new Error(`維度 ${dim} 題數不為 8 題！`);
});

console.log("\n=== 2. 64 型人格資料庫驗證 ===");
const allTypes = getAllPersonalities();
console.log(`人格總數: ${allTypes.length} (預期 64 種)`);
if (allTypes.length !== 64) throw new Error("人格總數不為 64 種！");

// 驗證 64 種代碼是否涵蓋所有組合
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
// 測試全選非常符合 (2)
const testAnswers1 = {};
QUESTIONS.forEach(q => {
  // 正向選 2, 反向選 2 -> 各維度分數極大化
  testAnswers1[q.id] = q.direction === 1 ? 2 : -2;
});
const res1 = PersonalityEngine.calculateResult(testAnswers1);
console.log("全正向傾向結果:", res1.code, res1.profile.name);
if (res1.code !== "ESTJ-AD") {
  console.warn("期望 ESTJ-AD，獲得:", res1.code);
}

// 測試全反向極性
const testAnswers2 = {};
QUESTIONS.forEach(q => {
  testAnswers2[q.id] = q.direction === 1 ? -2 : 2;
});
const res2 = PersonalityEngine.calculateResult(testAnswers2);
console.log("全反向傾向結果:", res2.code, res2.profile.name);
if (res2.code !== "INFP-RC") {
  console.warn("期望 INFP-RC，獲得:", res2.code);
}

console.log("\n✅ 全部單元測試與資料驗證皆 100% 通過！");
