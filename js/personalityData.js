/**
 * 64型人格資料庫 (64-Type Persona Dynamics Database)
 * 結合 16 大基礎 MBTI 原型與 4 種心態-驅力維度 (AD, AC, RD, RC)
 * 衍生出 64 個獨立且深度豐富的人格檔案。
 */

// 64 型專屬標題、座右銘與代表性關鍵詞配置表
const TYPE_DEFINITIONS = {
  // ==================== 1. ENTJ 系列 (天生統御者) ====================
  "ENTJ-AD": {
    name: "熾陽星際統帥",
    tagline: "開疆拓土的絕對領航者，以無畏魄力重塑格局",
    group: "戰略統御矩陣",
    badge: "👑",
    superpowers: ["遠見佈局與戰略決斷", "強大氣場與號召力", "逆境突破與抗壓破局"],
    blindspots: ["偶爾缺乏對他人情緒的耐心", "易因高標準給人施加無形壓力"],
    careers: ["企業創辦人/CEO", "戰略諮詢合夥人", "投資並購總監", "大型變革項目操盤手"],
    loveStyle: "霸道且專一，渴望能與自己平起平坐、彼此激發潛能的強大伴侶。",
    stressRecharge: "高強度運動、短暫切斷外部通訊、獨自規劃下一階段的宏偉藍圖。",
    goldenMatch: "INFP-AC",
    growthMatch: "ISFJ-RD"
  },
  "ENTJ-AC": {
    name: "盛世盟約領袖",
    tagline: "兼具鐵腕決策與從容胸襟，以共榮願景凝聚群雄",
    group: "戰略統御矩陣",
    badge: "🏛️",
    superpowers: ["宏觀戰略與人際凝聚兼備", "極具感染力的演講與激勵", "游刃有餘的危機公關"],
    blindspots: ["過度追求完美協同可能拖慢節奏", "不自覺承擔過多組織重擔"],
    careers: ["跨國組織領袖", "品牌生態操盤人", "風險投資人", "政經智庫主持"],
    loveStyle: "慷慨大度且充滿保護欲，支持伴侶追求夢想，注重精神層面的深度默契。",
    stressRecharge: "主辦精緻私人沙龍、沉浸式閱讀哲學歷史、大自然徒步漫遊。",
    goldenMatch: "INFP-RC",
    growthMatch: "ISTP-AD"
  },
  "ENTJ-RD": {
    name: "深空精密裁決者",
    tagline: "暗夜中的鋒芒戰略家，以極致精準掃除一切阻礙",
    group: "戰略統御矩陣",
    badge: "⚔️",
    superpowers: ["深層風險預判與漏洞撲滅", "雷厲風行的執行力", "刀刃般銳利的邏輯審視"],
    blindspots: ["容易陷入嚴苛自省與過度警覺", "對他人的微小失誤容忍度極低"],
    careers: ["對沖基金經理", "重組轉型操盤手", "高階安全顧問", "頂尖架構師"],
    loveStyle: "謹慎慢熱但忠誠如磐石，需要伴侶給予絕對的智性尊重與安心支持。",
    stressRecharge: "棋類博弈、高階程式或複雜邏輯拆解、深度靜態冥想。",
    goldenMatch: "INTP-AC",
    growthMatch: "ESFJ-AD"
  },
  "ENTJ-RC": {
    name: "鋼鐵慈悲改革官",
    tagline: "將深刻的自省轉化為利他制度，以理性構築有溫度的秩序",
    group: "戰略統御矩陣",
    badge: "⚖️",
    superpowers: ["兼顧制度效率與人文關懷", "洞悉體系弊端並精準改良", "高情商的結構化溝通"],
    blindspots: ["常在情感期待與現實邏輯中內耗", "難以開口向他人尋求情感支援"],
    careers: ["社會企業家", "醫療/教育體系改革高管", "法務合規總監", "非營利基金會CEO"],
    loveStyle: "深情而內斂，願意為彼此的長遠未來默默打點一切，重視責任與價值觀一致。",
    stressRecharge: "靜心烹飪、手作工藝、撰寫深度反思日記、聆聽古典交響樂。",
    goldenMatch: "INFJ-AD",
    growthMatch: "ESTP-RC"
  },

  // ==================== 2. ENTP 系列 (思維破局者) ====================
  "ENTP-AD": {
    name: "次元穿梭發明家",
    tagline: "打破一切常規的創新風暴，以顛覆式思維開拓全新紀元",
    group: "自由探索矩陣",
    badge: "💡",
    superpowers: ["無窮無盡的創意腦洞", "驚人的臨場辯才與說服力", "敏銳捕捉新興趨勢"],
    blindspots: ["容易喜新厭舊而忽視細節落地", "辯論時可能無意間刺傷他人自尊"],
    careers: ["科技連續創業家", "顛覆性產品發明人", "創意總監", "天使投資人"],
    loveStyle: "幽默靈動、驚喜不斷，需要能跟上自己思維跳躍節奏的有趣靈魂。",
    stressRecharge: "探索全新領域的未知技術、極限運動、自駕公路旅行。",
    goldenMatch: "INFJ-AC",
    growthMatch: "ISTJ-RD"
  },
  "ENTP-AC": {
    name: "靈感火花引路人",
    tagline: "用幽默與智慧點燃他人，讓前瞻思維在歡聲笑語中落地生根",
    group: "自由探索矩陣",
    badge: "✨",
    superpowers: ["跨界思維融合與共識激發", "極強的同理溝通與氛圍調節", "將複雜概念生動轉化"],
    blindspots: ["可能因過於熱心而承諾過多項目", "在瑣碎行政事務上容易分心"],
    careers: ["創新加速器導師", "高端脫口秀/媒體人", "未來趨勢演說家", "體驗設計大師"],
    loveStyle: "如同春風拂面般溫暖有趣，擅長製造生活浪漫，重視心靈共鳴與共同成長。",
    stressRecharge: "與志同道合的好友暢談至深夜、沉浸式即興戲劇、漫無目的漫遊城市。",
    goldenMatch: "INTJ-RC",
    growthMatch: "ISFP-AD"
  },
  "ENTP-RD": {
    name: "暗影思辨解構師",
    tagline: "洞悉表象背後的底層邏輯，以無情批判重塑思維邊界",
    group: "自由探索矩陣",
    badge: "🔍",
    superpowers: ["極其敏銳的邏輯悖論捕捉", "高超的反向工程思維", "前瞻性風險對沖"],
    blindspots: ["容易陷入過度質疑與智力優越感", "行動前反覆推演導致錯失時機"],
    careers: ["網絡安全專家", "量化交易研究員", "哲學/法學學者", "高階戰略紅隊專家"],
    loveStyle: "外冷內熱的智性戀者，需要安靜但高質量的思想交流，極度排斥膚淺與虛偽。",
    stressRecharge: "深度研究神秘小眾知識、解密遊戲、獨自進行長途騎行。",
    goldenMatch: "INFJ-RC",
    growthMatch: "ESFJ-AC"
  },
  "ENTP-RC": {
    name: "深邃哲思造夢者",
    tagline: "在無限思想宇宙中漫遊，用溫柔智慧撫平世界的認知隔閡",
    group: "自由探索矩陣",
    badge: "🌌",
    superpowers: ["深刻的直覺洞察與哲思共情", "化解尖銳矛盾的隱喻溝通", "多元視角包容力"],
    blindspots: ["容易被情緒共振與思維混亂消耗精力", "在做殘酷抉擇時常猶豫不決"],
    careers: ["心理諮商名家", "前瞻科幻作家", "跨文化交流學者", "紀錄片導演"],
    loveStyle: "溫柔、細膩且充滿詩意，渴望與伴侶建立超越現實的精神聖所。",
    stressRecharge: "在安靜的咖啡館寫作、沉浸於星空觀測、古典哲學經典閱讀。",
    goldenMatch: "INTJ-AD",
    growthMatch: "ESTJ-RC"
  },

  // ==================== 3. ENFJ 系列 (光芒引路人) ====================
  "ENFJ-AD": {
    name: "太陽神殿啟蒙者",
    tagline: "以無比的熱忱與宏大信念，帶領眾人衝破迷霧邁向新生",
    group: "心靈共鳴矩陣",
    badge: "☀️",
    superpowers: ["強大的願景感染力與演說魅力", "激發他人內在潛能", "堅定果決的道德勇氣"],
    blindspots: ["過於理想主義而低估現實殘酷", "有時會將自身價值觀強加於他人"],
    careers: ["教育機構創辦人", "社會運動領袖", "頂尖演說家/教練", "品牌精神舵手"],
    loveStyle: "全心投入且極富感染力，以崇高的熱情呵護伴侶，期待共同改變世界。",
    stressRecharge: "森林浴、參與公益活動、高能量音樂會放鬆身心。",
    goldenMatch: "INTP-RC",
    growthMatch: "ISTP-RD"
  },
  "ENFJ-AC": {
    name: "心靈交響共鳴家",
    tagline: "萬物皆有回響，用極致的愛與包容編織人與人之間的黃金紐帶",
    group: "心靈共鳴矩陣",
    badge: "🕊️",
    superpowers: ["頂級的同理心與氛圍掌控", "化解仇恨與建立深度信任", "群體智慧催化"],
    blindspots: ["過度取悅他人導致自身筋疲力竭", "害怕衝突而不敢直言硬傷"],
    careers: ["首席文化官 (CCO)", "非營利領袖", "婚姻與家庭治療大師", "跨國公關總監"],
    loveStyle: "無微不至的溫暖守護者，時刻關注伴侶的情感需求，提供極致的安全感。",
    stressRecharge: "香氛水療、與摯友圍爐夜話、靜心園藝與花藝設計。",
    goldenMatch: "INTP-AD",
    growthMatch: "ISTJ-AD"
  },
  "ENFJ-RD": {
    name: "敏銳變革守護官",
    tagline: "在溫潤外表下擁有清醒洞察，以精細策略守護眾人福祉",
    group: "心靈共鳴矩陣",
    badge: "🛡️",
    superpowers: ["對群體情緒暗流的超前感知", "精準的情感動員與策略推進", "極高的倫理自律"],
    blindspots: ["容易為他人的過錯過度自責", "過度警惕潛在危機而精神緊繃"],
    careers: ["危機管理專家", "政策研究顧問", "組織發展 (OD) 總監", "高階職場導師"],
    loveStyle: "深沉、專注且富有原則，願意成為伴侶永遠遮風避雨的堅固堡壘。",
    stressRecharge: "海邊散步、手寫信件或散文創作、安靜的茶道體驗。",
    goldenMatch: "INFP-AD",
    growthMatch: "ESTP-AD"
  },
  "ENFJ-RC": {
    name: "靈魂聖殿療癒者",
    tagline: "傾聽世間最微弱的呼喚，以深邃共感撫慰每一個受傷的靈魂",
    group: "心靈共鳴矩陣",
    badge: "🕯️",
    superpowers: ["深層心理洞察與創傷療癒", "無條件的傾聽與接納", "精神層面的昇華引導"],
    blindspots: ["極易吸收環境中的負能量", "容易忽視自身的物質與生理需求"],
    careers: ["深度心理治療師", "心靈導師", "人道主義特使", "文藝評論家"],
    loveStyle: "靈魂伴侶的極致追尋者，追求精神上的純粹與全然交付。",
    stressRecharge: "冥想正念、遠離都市的靜修、在流水聲中讀詩放空。",
    goldenMatch: "ISTP-AC",
    growthMatch: "ENTJ-AD"
  },

  // ==================== 4. ENFP 系列 (靈感追夢家) ====================
  "ENFP-AD": {
    name: "星火燎原開拓者",
    tagline: "帶著對世界的無盡好奇，勇敢點燃每一個看似瘋狂的夢想",
    group: "自由探索矩陣",
    badge: "🚀",
    superpowers: ["無限熱情與自發感染力", "快速整合跨領域資源", "敢於挑戰不可能的勇氣"],
    blindspots: ["容易衝動決策且難以堅持枯燥瑣事", "注意力分散導致多線作戰焦慮"],
    careers: ["新創孵化器負責人", "全方位內容創作者", "前衛策展人", "行銷冒險家"],
    loveStyle: "熱烈奔放、充滿驚喜冒險，渴望與伴侶一起探索世界的每一個未知角落。",
    stressRecharge: "即興出發的旅行、自由塗鴉創作、嘗試極限運動。",
    goldenMatch: "INTJ-AC",
    growthMatch: "ISTJ-RC"
  },
  "ENFP-AC": {
    name: "極光狂歡造夢家",
    tagline: "願每個人都能被看見與熱愛，以純粹光芒照亮周遭的每一個角落",
    group: "自由探索矩陣",
    badge: "🌈",
    superpowers: ["天生的親和力與人際破冰", "將枯燥生活轉化為奇幻冒險", "敏銳發掘他人閃光點"],
    blindspots: ["難以對他人說「不」而過載", "面對沉重現實時容易產生逃避心態"],
    careers: ["活動體驗策劃師", "社群營運主理人", "兒童文學家/插畫家", "演藝人員"],
    loveStyle: "如陽光般溫暖明朗，善於創造甜蜜回憶，注重每天的情感交流與儀式感。",
    stressRecharge: "遊樂園暢玩、沉浸式手作烘焙、與好友舉辦主題派對。",
    goldenMatch: "INTJ-RD",
    growthMatch: "ISTJ-AD"
  },
  "ENFP-RD": {
    name: "幻境深思追尋者",
    tagline: "在奔放的想像中保持清醒自省，以深邃獨創性開拓自我世界",
    group: "自由探索矩陣",
    badge: "🔮",
    superpowers: ["深層洞察與原創概念提煉", "在混亂中捕捉直覺靈感", "獨立特行的破局力"],
    blindspots: ["經常在自我懷疑與雄心壯志間擺盪", "對繁複細節有天然抗拒"],
    careers: ["獨立導演/編劇", "概念藝術家", "創新戰略顧問", "前沿潮流研究員"],
    loveStyle: "既熱情又渴望個人專屬空間，需要伴侶理解自己的多面性與精神追求。",
    stressRecharge: "夜間城市漫步、欣賞前衛藝術展、獨自創作音樂。",
    goldenMatch: "INFJ-AD",
    growthMatch: "ESTJ-AD"
  },
  "ENFP-RC": {
    name: "微光溫柔守夢人",
    tagline: "懷揣柔軟的理想主義，以細膩共感守護每顆純真脆弱的心靈",
    group: "自由探索矩陣",
    badge: "🌸",
    superpowers: ["極度細膩的情感共振", "賦予平凡事物詩意的美感", "安撫他人焦慮的溫柔力量"],
    blindspots: ["過度敏感易受言語刺傷", "做決策時過多受當下情緒牽動"],
    careers: ["心理諮商師", "療癒系插畫家", "獨立出版人", "公益志業發起人"],
    loveStyle: "細膩深情、百分百信任，渴望建立彼此坦誠、心靈無隔閡的溫馨小宇宙。",
    stressRecharge: "看溫馨老電影、收集自然標本、在被窩裡聽白噪音閱讀。",
    goldenMatch: "INTJ-AD",
    growthMatch: "ESTJ-RD"
  },

  // ==================== 5. ESTJ 系列 (鐵律執行官) ====================
  "ESTJ-AD": {
    name: "磐石秩序統帥",
    tagline: "鋼鐵般的意志與極致效率，以無可撼動的原則守護秩序與成果",
    group: "秩序精算矩陣",
    badge: "🏰",
    superpowers: ["強悍的專案推進與執行力", "明確果斷的組織決策", "建立高效穩固的標準作業流程"],
    blindspots: ["過度看重規則而顯得缺乏彈性", "容易忽視團隊成員的情緒反饋"],
    careers: ["營運長 (COO)", "工程項目總指揮", "軍事/警政高級主管", "製造業高管"],
    loveStyle: "務實可靠、說到做到，用實質的物質保障與長遠規劃表達深厚愛意。",
    stressRecharge: "規律的高強度重訓、整理車庫或工具箱、依照清單完成生活目標。",
    goldenMatch: "ISFP-AC",
    growthMatch: "INFP-RD"
  },
  "ESTJ-AC": {
    name: "金牌陣營執政官",
    tagline: "凝聚團隊力量的定海神針，以嚴謹而溫厚的領導力帶領全員致勝",
    group: "秩序精算矩陣",
    badge: "🚩",
    superpowers: ["將集體凝聚力轉化為實質產出", "優秀的資源調配與人際協調", "公正無私的領導作風"],
    blindspots: ["可能因堅持傳統而抗拒有價值的創新", "過於操勞細節導致疲憊"],
    careers: ["大型機構行政總監", "學校校長/院長", "供應鏈管理專家", "體育團隊總教練"],
    loveStyle: "傳統穩重、重視家庭責任與承諾，是伴侶人生中最堅實可靠的後盾。",
    stressRecharge: "主持家庭或好友烤肉聚會、觀看體育賽事、戶外露營垂釣。",
    goldenMatch: "ISFP-RC",
    growthMatch: "INFP-AD"
  },
  "ESTJ-RD": {
    name: "精密審計破綻者",
    tagline: "鷹隼般犀利的審視目光，精益求精，絕不放過任何細微瑕疵",
    group: "秩序精算矩陣",
    badge: "📐",
    superpowers: ["極致嚴密的邏輯與合規審查", "危機預警與風險隔離", "高難度問題的系統化拆解"],
    blindspots: ["過度苛求完美讓身邊人倍感壓力", "難以坦率接納不同做事方式"],
    careers: ["合規總監 (CCO)", "法醫/高級審計師", "航空安全專家", "質量控制 (QA) 負責人"],
    loveStyle: "嚴謹慢熱，用無微不至的實際行動照顧伴侶，重視承諾與原則。",
    stressRecharge: "沉浸式拼圖、精細模型組裝、整理財務報表與資產配置。",
    goldenMatch: "INTP-AC",
    growthMatch: "ENFP-AC"
  },
  "ESTJ-RC": {
    name: "良序善治守望者",
    tagline: "以審慎謙遜的心態維護制度基石，用細膩責任感照拂集體每一個角落",
    group: "秩序精算矩陣",
    badge: "🛡️",
    superpowers: ["深思熟慮的制度改良", "極具耐心的基層溝通", "化解組織內部摩擦的務實智慧"],
    blindspots: ["面對激烈變革時容易焦慮不安", "常常將過多責任攬在自己肩上"],
    careers: ["人資副總裁", "公共政策執行官", "社區運營領袖", "醫療機構營運主管"],
    loveStyle: "體貼入微、恪盡職守，願意在日常瑣碎中默默付出，營造安定溫暖的家。",
    stressRecharge: "整理花園、手寫手帳、與家人共享溫馨晚餐、安靜散步。",
    goldenMatch: "INFP-AD",
    growthMatch: "ENTP-AD"
  },

  // ==================== 6. ESTP 系列 (極速先鋒者) ====================
  "ESTP-AD": {
    name: "雷霆突擊先鋒",
    tagline: "活在當下的極速行動派，在危機與未知中以敏捷身手開闢生路",
    group: "自由探索矩陣",
    badge: "⚡",
    superpowers: ["驚人的危機應變與肉身本能", "精準捕捉瞬時商機", "無所畏懼的冒險精神"],
    blindspots: ["缺乏長遠戰略規劃", "容易因追求刺激而承擔過高不必要風險"],
    careers: ["急診特勤/極限消防", "頂級銷售冠軍", "外匯/高頻操盤手", "極限運動員"],
    loveStyle: "直接、熱烈且充满激情，喜歡帶給伴侶心跳加速的刺激體驗與浪漫驚喜。",
    stressRecharge: "高速度卡丁車、極限運動、搏擊訓練、現場狂歡聚會。",
    goldenMatch: "ISFJ-AC",
    growthMatch: "INFJ-RD"
  },
  "ESTP-AC": {
    name: "風雲破局外交官",
    tagline: "八面玲瓏的魅力磁場，以靈動手腕與務實智慧化解一切僵局",
    group: "自由探索矩陣",
    badge: "🌪️",
    superpowers: ["出神入化的人際溝通與商務談判", "迅速化解現場尷尬與爭端", "極強的實戰適應力"],
    blindspots: ["可能給人過於圓滑或缺乏深度的印象", "對複雜抽象理論缺乏耐心"],
    careers: ["商務拓展 (BD) 總監", "知名經紀人", "頂級公關專家", "房地產投資操盤手"],
    loveStyle: "風趣幽默、出手闊綽，擅長逗伴侶開心，渴望一起享受人世間的一切美好。",
    stressRecharge: "高端社交酒會、高爾夫運動、品嚐米其林美食、海島度假。",
    goldenMatch: "ISFJ-RC",
    growthMatch: "INFJ-AD"
  },
  "ESTP-RD": {
    name: "暗夜精準破譯者",
    tagline: "在喧囂現實中保持冷靜獵手直覺，以極致觀察力捕捉破局瞬息",
    group: "自由探索矩陣",
    badge: "🎯",
    superpowers: ["微表情與環境細節捕捉", "高壓下的極度冷靜與精確反應", "實用主義解題專家"],
    blindspots: ["可能對他人過於冷漠或功利化", "容易隱藏真實情緒而不願示弱"],
    careers: ["刑偵專家/特工", "精密設備維修大師", "特技賽車手", "談判專家"],
    loveStyle: "外冷內熱、行動大於言語，會在關鍵時刻挺身而出護伴侶周全。",
    stressRecharge: "射擊靶場訓練、拆解機械改裝、獨自駕車狂飆、深度睡眠。",
    goldenMatch: "INFJ-AC",
    growthMatch: "ENFP-RC"
  },
  "ESTP-RC": {
    name: "市井暖陽擺渡人",
    tagline: "看透生活的本質依然熱愛生活，用務實幽默撫平生活的粗礪",
    group: "自由探索矩陣",
    badge: "🍺",
    superpowers: ["接地氣的智慧與治癒力", "極具感染力的樂觀心態", "隨手解決生活難題的能力"],
    blindspots: ["有時逃避深刻的情感討論", "理財規劃上偶有隨興揮霍傾向"],
    careers: ["餐飲/酒吧主理人", "實境節目製作人", "社區體育教練", "旅遊達人"],
    loveStyle: "真實隨和、不矯揉造作，帶給伴侶無窮的歡樂與最踏實的生活陪伴。",
    stressRecharge: "路邊攤擼串聊天、看熱血動作電影、按摩水療放鬆肌肉。",
    goldenMatch: "INFJ-AD",
    growthMatch: "INTJ-RD"
  },

  // ==================== 7. ESFJ 系列 (溫暖守護者) ====================
  "ESFJ-AD": {
    name: "金輝聚落守護者",
    tagline: "熱情洋溢的大家長，以無私擔當構建人人安居樂業的溫暖大家庭",
    group: "心靈共鳴矩陣",
    badge: "🌻",
    superpowers: ["強大的社群組織與凝聚力", "無微不至的照顧本能", "果斷建立和諧秩序"],
    blindspots: ["過度在意外界評價與社會認可", "容易干涉過多他人的個人選擇"],
    careers: ["高端活動策劃總監", "醫療護理長", "客戶成功 (CSM) 總監", "家族辦公室主管"],
    loveStyle: "全心全意的奉獻型伴侶，渴望與伴侶建立受所有人祝福的模範家庭。",
    stressRecharge: "為家人烹飪大餐、精心佈置家居環境、與好友聚餐傾訴。",
    goldenMatch: "ISTP-AC",
    growthMatch: "INTP-RD"
  },
  "ESFJ-AC": {
    name: "甘霖春雨滋養家",
    tagline: "溫潤無聲的愛意化身，以細膩共情讓每個相遇的人如沐春風",
    group: "心靈共鳴矩陣",
    badge: "🍯",
    superpowers: ["頂級的情緒價值提供者", "化解人際隔閡的溫柔力量", "建立持久深厚的人際網絡"],
    blindspots: ["極度害怕被排擠或冷落", "難以拒絕他人無理要求而委屈自己"],
    careers: ["幼兒教育名師", "非營利志工領袖", "私人管家主管", "心理健康輔導員"],
    loveStyle: "溫柔體貼、善解人意，會把伴侶的喜好牢記於心並給予無盡關懷。",
    stressRecharge: "芳香精油泡澡、烘焙甜點分享給鄰居、聽抒情音樂放空。",
    goldenMatch: "ISTP-RC",
    growthMatch: "INTP-AD"
  },
  "ESFJ-RD": {
    name: "深思勤慎家園官",
    tagline: "在熱忱中融入審慎自省，以踏實周密的努力確保集體平安順遂",
    group: "心靈共鳴矩陣",
    badge: "🕯️",
    superpowers: ["細緻入微的後勤保障能力", "對家庭與組織隱患的敏銳防範", "極高的忠誠度與責任心"],
    blindspots: ["經常因擔心他人而陷入過度焦慮", "對微小的冷淡反應過度解讀"],
    careers: ["公立醫院行政主管", "高端養老機構負責人", "學校教務主任", "福利保障專員"],
    loveStyle: "忠誠深情、默默付出，重視生活細節與承諾，期待細水長流的相伴。",
    stressRecharge: "收納整理房間、寫感恩日記、看溫馨治癒系電視劇。",
    goldenMatch: "ISTP-AD",
    growthMatch: "ENTP-RD"
  },
  "ESFJ-RC": {
    name: "月下慈心守望者",
    tagline: "帶著謙卑與同理行走人間，用最溫柔的雙手撫平歲月的波瀾",
    group: "心靈共鳴矩陣",
    badge: "🌙",
    superpowers: ["極度深沉的情感陪伴力", "善於撫慰傷痛與孤獨", "創造溫馨祥和的人際氛圍"],
    blindspots: ["過於壓抑自己的負面情緒", "面對重大變革時感到無助逃避"],
    careers: ["安寧緩和醫療專家", "特教老師", "慈善機構專案經理", "心靈療癒作家"],
    loveStyle: "細膩純粹、全情投入，渴望一份安穩平靜、心靈相依的真摯愛戀。",
    stressRecharge: "漫步在安靜的林蔭道、泡一杯熱茶閱讀、祈禱或正念冥想。",
    goldenMatch: "ISFP-AD",
    growthMatch: "ENTJ-AD"
  },

  // ==================== 8. ESFP 系列 (璀璨焦點家) ====================
  "ESFP-AD": {
    name: "耀目光芒巨星",
    tagline: "世界就是我的舞台，以無窮的熱力與自信將每一天活成傳奇盛宴",
    group: "自由探索矩陣",
    badge: "🌟",
    superpowers: ["無與倫比的舞台魅力與感染力", "瞬間引爆全場熱情的掌控力", "樂觀勇敢的生活態度"],
    blindspots: ["缺乏對長遠財務與人生的規劃", "容易因衝動消費或享樂過度而受挫"],
    careers: ["演藝明星/主持人", "頂尖時尚造型師", "大型派對策劃主理人", "運動品牌代言人"],
    loveStyle: "熱烈浪漫、大膽示愛，喜歡帶伴侶體驗各種光鮮亮麗的精彩生活。",
    stressRecharge: "盡情跳舞發洩精力、瘋狂購物血拼、做全身SPA保養。",
    goldenMatch: "ISTJ-AC",
    growthMatch: "INTJ-RD"
  },
  "ESFP-AC": {
    name: "歡樂甘泉製造機",
    tagline: "笑聲是世上最強大的魔法，用天真爛漫與熱情驅散一切陰霾",
    group: "自由探索矩陣",
    badge: "🎉",
    superpowers: ["天然的幽默感與開心果體質", "拉近任何人距離的親和力", "活在當下的極致快樂力"],
    blindspots: ["遇到嚴肅問題時習慣嬉皮笑臉帶過", "難以長期專注於單調枯燥工作"],
    careers: ["喜劇演員/網紅", "幼兒律動指導", "主題樂園核心演職人員", "美妝時尚博主"],
    loveStyle: "甜蜜可愛、充滿活力，總能把平凡日常過成驚喜連連的情人節。",
    stressRecharge: "卡拉OK歡唱、吃美味甜點、與寵物瘋狂玩耍。",
    goldenMatch: "ISTJ-RC",
    growthMatch: "INTJ-AD"
  },
  "ESFP-RD": {
    name: "浮世清醒行者",
    tagline: "在熱鬧繁華中保持自我審視，以精湛技藝演繹生活的真實與力量",
    group: "自由探索矩陣",
    badge: "🎭",
    superpowers: ["對美感與當下潮流的敏銳捕捉", "隨機應變的表演與展示天賦", "冷暖自知的自省能力"],
    blindspots: ["熱鬧過後容易產生巨大的空虛感", "害怕被人看穿內心的孤獨與脆弱"],
    careers: ["攝影師/藝術指導", "獨立音樂人", "高級調酒師", "珠寶設計師"],
    loveStyle: "追求質感與激情並存，希望伴侶既能陪自己狂歡，又能看懂自己的深沉。",
    stressRecharge: "獨自去海邊聽浪、彈奏吉他或鋼琴、精緻護膚放空。",
    goldenMatch: "INTJ-AC",
    growthMatch: "ISFJ-AD"
  },
  "ESFP-RC": {
    name: "暖陽微風撫慰者",
    tagline: "用最純真善良的心擁抱世界，把溫柔與歡笑留給身邊的每一個人",
    group: "自由探索矩陣",
    badge: "🎈",
    superpowers: ["純粹自然的共情與體貼", "將美與溫暖融入生活細節", "讓人放下防備的親切感"],
    blindspots: ["容易受他人情緒牽連而感到委屈", "缺乏堅定的拒絕立場"],
    careers: ["花藝生活館館主", "生活美學博主", "寵物美容與療癒師", "社工陪伴員"],
    loveStyle: "溫順依戀、體貼入微，渴望與伴侶在平凡煙火氣中長相廝守。",
    stressRecharge: "漫步花市、抱著毛絨玩具入睡、看輕鬆浪漫喜劇電影。",
    goldenMatch: "INTJ-AD",
    growthMatch: "ESTJ-AD"
  },

  // ==================== 9. INTJ 系列 (戰略架構師) ====================
  "INTJ-AD": {
    name: "深空星圖總策劃",
    tagline: "掌控未來的終極棋手，以超凡遠見與絕對自信下出顛覆世界的一著棋",
    group: "戰略統御矩陣",
    badge: "♟️",
    superpowers: ["洞穿事物本質的超級直覺", "宏大而精密的長期戰略規劃", "毫不妥協的執行決心"],
    blindspots: ["對低效與蠢鈍缺乏容忍度", "容易顯得過於傲慢冷酷不易親近"],
    careers: ["前沿科技首席架構師", "宏觀對沖基金創始人", "戰略決策智庫首領", "深科技創業者"],
    loveStyle: "極度理智而忠貞不渝，尋找智力旗鼓相當、能共同征服星辰大海的伴侶。",
    stressRecharge: "完全隔離的獨處時間、高難度科學/哲學思考、在腦海中模擬推演宇宙法則。",
    goldenMatch: "ENFP-AC",
    growthMatch: "ESFP-RC"
  },
  "INTJ-AC": {
    name: "理性星火播種者",
    tagline: "將深邃智慧化作前行火種，以從容胸懷引導團隊邁向更高維度",
    group: "戰略統御矩陣",
    badge: "🔭",
    superpowers: ["將複雜未來藍圖清晰轉化為路線圖", "卓越的智性引導力", "沉著穩健的危機控盤"],
    blindspots: ["容易在人際協商中感到精力損耗", "對細節事務的繁瑣感到厭煩"],
    careers: ["大學終身教授/院長", "跨國企業首席戰略官 (CSO)", "研發中心總監", "科普領袖"],
    loveStyle: "深沉篤定、尊重伴侶的獨立靈魂，樂於為對方的成長提供全方位智力支援。",
    stressRecharge: "參觀天文台或科技展、靜心閱讀硬核著作、獨自進行深度徒步。",
    goldenMatch: "ENFP-AD",
    growthMatch: "ESFP-AD"
  },
  "INTJ-RD": {
    name: "暗黑深淵洞悉者",
    tagline: "潛伏於思維最深處的審判之刃，以極致精準解剖現實的每一個漏洞",
    group: "戰略統御矩陣",
    badge: "🗡️",
    superpowers: ["極度敏銳的危機與漏洞預警", "刀鋒般凌厲的系統重構能力", "孤膽前行的強悍心智"],
    blindspots: ["過度懷疑與防禦機制過強", "容易陷入孤立無援的自證循環"],
    careers: ["加密演算法專家", "國家級安全戰略家", "量子計算研究員", "深度調查記者"],
    loveStyle: "防線極高但一旦認定便刻骨銘心，需要極度真誠、透明且堅定不移的伴侶。",
    stressRecharge: "在完全安靜的暗室冥想、編寫高難度演算法、深度自省覆盤。",
    goldenMatch: "ENFP-RC",
    growthMatch: "ESFJ-AC"
  },
  "INTJ-RC": {
    name: "隱士智者守護官",
    tagline: "將冷峻智慧沈澱為深沉善意，在幕後默默為所愛之人鋪就光明之路",
    group: "戰略統御矩陣",
    badge: "📜",
    superpowers: ["深謀遠慮的全局護航力", "精準的情感動態邏輯解析", "極其深厚持久的責任感"],
    blindspots: ["常常將心事深埋心底不願求助", "在情感表達上過於笨拙內斂"],
    careers: ["首席風險官 (CRO)", "核心智囊/幕僚長", "高端私享顧問", "理論物理學家"],
    loveStyle: "內斂而極度深情，用無聲的周全安排守護伴侶，需要心有靈犀的深層默契。",
    stressRecharge: "整理藏書、研究古籍或歷史檔案、在深夜伴著古典樂沉思。",
    goldenMatch: "ENTP-AC",
    growthMatch: "ESTP-AD"
  },

  // ==================== 10. INTP 系列 (真理探索者) ====================
  "INTP-AD": {
    name: "真理之門破譯官",
    tagline: "純粹理性的狂熱追尋者，以強大邏輯建構解釋萬物的統一理論",
    group: "秩序精算矩陣",
    badge: "🧩",
    superpowers: ["頂級的抽象邏輯與概念建模", "一眼看穿底層邏輯漏洞", "純粹求知的強烈專注力"],
    blindspots: ["對人情世故缺乏興趣與耐心", "容易沉浸於理論而忽略實踐成果"],
    careers: ["理論科學家", "AI演算法科學家", "系統核心架構師", "前沿哲學教授"],
    loveStyle: "笨拙卻純真，喜歡與伴侶探討宇宙奧秘，將對方視為自己世界中最獨特的存在。",
    stressRecharge: "獨自編程探索新技術、拆解研究精密玩具、打硬核策略遊戲。",
    goldenMatch: "ENFJ-AC",
    growthMatch: "ESFJ-RD",
    avatar: "./avatars/intp.jpg"
  },
  "INTP-AC": {
    name: "智慧花火漫遊者",
    tagline: "充滿好奇的思維頑童，以開放包容的姿態在知識星海中自由穿梭",
    group: "自由探索矩陣",
    badge: "🧪",
    superpowers: ["跨學科知識的驚人融會貫通", "溫和包容的學術交流心態", "將抽象難題趣味化解構"],
    blindspots: ["日常瑣事管理較為混亂", "在做最終承諾時容易陷入選擇困難"],
    careers: ["科普作家/播客主", "開源項目核心維護者", "遊戲主數值設計師", "創新思維顧問"],
    loveStyle: "隨和幽默、思想自由，尊重彼此的獨立空間，希望像朋友一樣無話不談。",
    stressRecharge: "逛維基百科兔子洞、探索小眾硬核論壇、泡在圖書館一整天。",
    goldenMatch: "ENFJ-AD",
    growthMatch: "ESTJ-RD"
  },
  "INTP-RD": {
    name: "冷眼旁觀審判者",
    tagline: "以最苛刻的批判性視角審視現實，絕不容許任何邏輯瑕疵存在",
    group: "秩序精算矩陣",
    badge: "🔬",
    superpowers: ["無懈可擊的邏輯批判能力", "精確到極致的細節定義", "不受任何情緒干擾的客觀性"],
    blindspots: ["容易陷入虛無主義或智性孤僻", "嚴苛的挑錯習慣易引發人際緊張"],
    careers: ["形式化驗證專家", "同行評審 (Peer Review) 主管", "代碼安全審計專家", "邏輯學學者"],
    loveStyle: "極度謹慎防禦，只有通過其嚴格邏輯檢驗的靈魂才能走進其內心世界。",
    stressRecharge: "戴降噪耳機在無人處沉思、單機解密遊戲通關、自製複雜思維導圖。",
    goldenMatch: "ENFJ-AD",
    growthMatch: "ESFJ-AD"
  },
  "INTP-RC": {
    name: "微光哲思修補匠",
    tagline: "在繁雜的世界背後默默修補思維框架，用溫柔智慧尋求內在寧靜",
    group: "自由探索矩陣",
    badge: "🛠️",
    superpowers: ["深邃細膩的模型推演", "善於發現被眾人忽視的隱藏規律", "謙遜安靜的利他智慧"],
    blindspots: ["過度內耗且缺乏主動爭取意識", "面對社交場合容易不知所措"],
    careers: ["小眾語言編譯器開發者", "古籍與文獻數位化專家", "後台數據分析師", "獨立撰稿人"],
    loveStyle: "安靜陪伴、細膩敏感，需要伴侶給予足夠的耐心與安全感來打開心扉。",
    stressRecharge: "看星空紀錄片、整理電子筆記系統、聽Lo-Fi純音樂放空。",
    goldenMatch: "ENFJ-AD",
    growthMatch: "ESTJ-AD"
  },

  // ==================== 11. INFJ 系列 (心靈領航者) ====================
  "INFJ-AD": {
    name: "宿命星辰引導者",
    tagline: "洞悉人類靈魂深處的先知，以不可動搖的信念指引時代的心靈覺醒",
    group: "心靈共鳴矩陣",
    badge: "🔮",
    superpowers: ["穿透表象的超感直覺", "強大的人格感召力與信念感", "深謀遠慮的人生指導"],
    blindspots: ["過於理想主義而難以妥協", "容易因背負過多使命感而心力交瘁"],
    careers: ["精神導師/哲學作家", "非營利組織戰略領袖", "前瞻心理學家", "深刻社會紀錄片導演"],
    loveStyle: "專注純粹、追求靈魂相融，渴望一份超越世俗考驗的崇高之愛。",
    stressRecharge: "遠離塵囂的深山靜修、手寫深度冥想筆記、在安靜美術館漫步。",
    goldenMatch: "ENTP-AC",
    growthMatch: "ESTP-AD"
  },
  "INFJ-AC": {
    name: "翡翠之泉療癒師",
    tagline: "將智慧與慈悲融入每一次相遇，以安寧的力量溫暖人世間的冰冷",
    group: "心靈共鳴矩陣",
    badge: "🌿",
    superpowers: ["極具穿透力的共情與撫慰", "無形中化解深層心理矛盾", "啟迪他人重拾生命希望"],
    blindspots: ["容易吸收太多他人的悲傷而內耗", "難以向他人表達自己的脆弱與需要"],
    careers: ["心理健康中心主任", "臨終關懷導師", "高端藝術治療師", "教育慈善家"],
    loveStyle: "溫潤如玉、全心呵護，注重心靈默契與精神共鳴，給予伴侶極致包容。",
    stressRecharge: "點香氛蠟燭冥想、在花園中靜坐、聆聽大自然聲音（雨聲、浪聲）。",
    goldenMatch: "ENTP-AD",
    growthMatch: "ESTP-RD"
  },
  "INFJ-RD": {
    name: "深夜孤燈警世者",
    tagline: "在黑夜中獨自守望人間命運，以銳利洞見預警潛在的精神危機",
    group: "心靈共鳴矩陣",
    badge: "🕯️",
    superpowers: ["對人性陰暗面與社會危機的敏銳洞察", "文字與隱喻的強大力量", "堅不可摧的道德底線"],
    blindspots: ["容易陷入悲觀主義與孤芳自賞", "對人際背叛有極強的心理創傷防禦"],
    careers: ["深度調查作家", "倫理學學者", "高階心理分析師", "獨立思想家"],
    loveStyle: "防線極深但深情入骨，只對能看懂自己內心深淵的靈魂伴侶敞開。",
    stressRecharge: "深夜寫作、在無人街道夜行、沉浸式閱讀存在主義經典。",
    goldenMatch: "ENTP-RD",
    growthMatch: "ESTP-AD"
  },
  "INFJ-RC": {
    name: "靜謐深海守護仙",
    tagline: "心如深海般寬廣而神秘，默默用微光守護著每一份珍貴的善意",
    group: "心靈共鳴矩陣",
    badge: "🌊",
    superpowers: ["深不見底的包容與同理", "無聲勝有聲的精神陪伴", "將痛苦昇華為藝術的能力"],
    blindspots: ["過度隱忍導致自我消耗", "在需要果斷切割關係時難以狠下心"],
    careers: ["詩人/純文學作家", "私人心理顧問", "隱士藝術家", "動物救助倡導者"],
    loveStyle: "無比深情而含蓄，願為所愛之人默默奉獻一切，渴望靈魂的全然共振。",
    stressRecharge: "在浴缸中泡熱水澡、抱著寵物發呆、在雨天靜靜聽音樂讀散文。",
    goldenMatch: "ENTP-AD",
    growthMatch: "ESTP-AC"
  },

  // ==================== 12. INFP 系列 (靈魂調停者) ====================
  "INFP-AD": {
    name: "孤勇星芒追夢者",
    tagline: "懷揣純粹赤子之心，以溫柔卻不可撼動的勇氣守護內心信念",
    group: "心靈共鳴矩陣",
    badge: "🦄",
    superpowers: ["堅不可摧的內在價值體系", "極具原創性的藝術創造力", "激勵他人忠於真我的力量"],
    blindspots: ["在殘酷現實面前容易感到幻滅", "面對繁雜瑣事容易逃避拖延"],
    careers: ["獨立原創音樂人", "奇幻小說家", "人道主義倡導者", "遊戲世界觀架構師"],
    loveStyle: "浪漫純真、追求至高無上的真愛，渴望與伴侶建立精神童話王國。",
    stressRecharge: "沉浸於自己幻想的宇宙、彈唱吉他、在草地上曬太陽放空。",
    goldenMatch: "ENFJ-RD",
    growthMatch: "ESTJ-AC"
  },
  "INFP-AC": {
    name: "微風花語吟遊詩人",
    tagline: "萬物皆有靈性，用充滿愛與詩意的眼光發現生活中的每一處美好",
    group: "心靈共鳴矩陣",
    badge: "🌸",
    superpowers: ["驚人的審美直覺與文字感知", "讓人倍感安全的共情能力", "化解尖銳對立的溫和力量"],
    blindspots: ["過於敏感脆弱易受傷害", "常常為了迎合他人而壓抑自己真實想法"],
    careers: ["繪本插畫家", "芳療師/身心靈療癒師", "兒童文學作家", "手作生活美學家"],
    loveStyle: "溫柔至極、細膩體貼，會為伴侶手寫長信、製作充滿回憶的專屬禮物。",
    stressRecharge: "漫步植物園、收集落葉與羽毛、手作乾燥花或陶藝。",
    goldenMatch: "ENTJ-AD",
    growthMatch: "ESTJ-AD"
  },
  "INFP-RD": {
    name: "暗夜星河編織者",
    tagline: "在痛苦與孤獨中淬鍊靈魂之光，以深沉文字撫慰同在黑暗中的行者",
    group: "心靈共鳴矩陣",
    badge: "🌙",
    superpowers: ["將深沉情感轉化為震撼作品的能力", "深刻的人性洞察力", "不隨波逐流的獨立品格"],
    blindspots: ["容易陷入長時間的情緒低潮與內耗", "對外界批評防禦過度"],
    careers: ["獨立電影編劇/導演", "純文學作家", "心理專題撰稿人", "暗黑系藝術插畫家"],
    loveStyle: "內斂而炙熱，尋找能讀懂自己孤獨與眼淚的靈魂共鳴者。",
    stressRecharge: "深夜聽黑膠唱片、獨自看文藝電影流淚、在日記本中寫下私密詩篇。",
    goldenMatch: "ENTJ-AC",
    growthMatch: "ESTJ-AD"
  },
  "INFP-RC": {
    name: "深海靈魂共鳴詩人",
    tagline: "靜靜棲息於心靈的幽微深處，以無盡的溫柔包容世間所有的孤獨與遺憾",
    group: "心靈共鳴矩陣",
    badge: "🕊️",
    superpowers: ["極致的情感共振與治癒力", "捕捉世界微小美好的純淨心靈", "無條件的精神接納"],
    blindspots: ["極度缺乏安全感，容易退縮進自我世界", "在現實競爭中常感到格格不入"],
    careers: ["心理諮商師", "自由撰稿人", "動物庇護所負責人", "非營利文創策劃"],
    loveStyle: "一生只夠愛一人般的深情純粹，需要伴侶溫柔細緻的呵護與堅定承諾。",
    stressRecharge: "抱著貓咪曬太陽、看著窗外的雨水發呆、在安靜的咖啡館角落下筆作畫。",
    goldenMatch: "ENTJ-AC",
    growthMatch: "ESTJ-AD"
  },

  // ==================== 13. ISTJ 系列 (秩序基石者) ====================
  "ISTJ-AD": {
    name: "鋼鐵長城守望官",
    tagline: "恪盡職守的終極基石，以鋼鐵般的紀律與可靠度維繫世界的穩定運轉",
    group: "秩序精算矩陣",
    badge: "🛡️",
    superpowers: ["無可挑剔的責任感與執行力", "超強的事實記憶與流程梳理", "臨危不亂的沉穩心態"],
    blindspots: ["對未經證實的新想法持保守懷疑態度", "不善於表達內心柔軟情感"],
    careers: ["資深法官/檢察官", "核心數據庫管理員", "大型金融機構風控總監", "核能安全工程師"],
    loveStyle: "務實寡言、言出必行，會將伴侶的未來納入嚴密規劃並全力保障。",
    stressRecharge: "按部就班整理工作台、修剪草坪、嚴格按照作息睡眠、看硬核歷史紀錄片。",
    goldenMatch: "ESFP-AC",
    growthMatch: "ENFP-RD"
  },
  "ISTJ-AC": {
    name: "春風化雨掌舵官",
    tagline: "嚴謹中不失溫和力量，以紮實的付出與穩健的步伐護航集體平安前行",
    group: "秩序精算矩陣",
    badge: "⚓",
    superpowers: ["極具耐心的事務協調", "將混亂梳理為秩序的非凡能力", "深受所有人信任的沉穩人品"],
    blindspots: ["過於操勞細節而忽略自身休息", "面對突發變更時需要較長適應期"],
    careers: ["公務機構核心秘書長", "資深會計師事務所合夥人", "物流網絡營運總監", "圖書館館長"],
    loveStyle: "忠誠可靠、細水長流，用默默的陪伴與實質的生活照顧詮釋最真摯的愛。",
    stressRecharge: "洗車打蠟、按字母順序整理書架、品嚐熱茶、安靜垂釣。",
    goldenMatch: "ESFP-AD",
    growthMatch: "ENFP-AC"
  },
  "ISTJ-RD": {
    name: "暗室玄冰審判者",
    tagline: "絕不妥協的客觀標尺，以精密自律掃除一切漏洞與僥倖心理",
    group: "秩序精算矩陣",
    badge: "⚖️",
    superpowers: ["極度敏銳的事實漏洞與偽證捕捉", "嚴苛的自我要求與高標準產出", "堅定防守底線的魄力"],
    blindspots: ["容易給人冷冰冰、不近人情的壓迫感", "過度聚焦缺點而忽略整體進步"],
    careers: ["國家審計官", "法證科學專家", "合規監察專員", "航空事故調查員"],
    loveStyle: "深沉內斂、慎重至極，一旦許下承諾便是一輩子的契約與守候。",
    stressRecharge: "獨自做高難度數獨、精細手工雕刻、整理財務收支記帳。",
    goldenMatch: "ENFP-AD",
    growthMatch: "ESFP-AD"
  },
  "ISTJ-RC": {
    name: "古道清風守護者",
    tagline: "默默守護傳統與諾言，用一生懸命的專注在平凡中築起非凡的安定",
    group: "秩序精算矩陣",
    badge: "🏯",
    superpowers: ["持之以恆的工匠精神", "令人安心的周到細緻", "在逆境中默默咬牙堅持的韌性"],
    blindspots: ["容易壓抑內心焦慮而不願給人添麻煩", "難以坦然應對人際矛盾"],
    careers: ["文物修復大師", "檔案管理專員", "傳統手藝傳承人", "資深後勤主管"],
    loveStyle: "傳統真摯、體貼入微，渴望與伴侶過著規律、踏實且互敬互愛的寧靜生活。",
    stressRecharge: "手寫書法、打理盆栽、在安靜的鄉間小路散步、喝一杯溫熱的牛奶。",
    goldenMatch: "ENFP-AD",
    growthMatch: "ESFP-AD"
  },

  // ==================== 14. ISTP 系列 (靈巧巨匠者) ====================
  "ISTP-AD": {
    name: "疾風機械獵手",
    tagline: "冷靜敏銳的實戰大師，以出神入化的雙手與技術化解一切物理世界難題",
    group: "自由探索矩陣",
    badge: "⚙️",
    superpowers: ["秒懂機械與物理系統運作機制", "高壓下的極限冷靜與應變", "高效俐落的動手解決力"],
    blindspots: ["對人際情感交流感到麻木厭煩", "規則束縛過多時容易叛逆破局"],
    careers: ["試飛員/賽車工程師", "極限救難特工", "頂級外科手術專家", "硬件架構破解專家"],
    loveStyle: "酷感十足、尊重個人邊界，用實際行動而非甜言蜜語保護心愛之人。",
    stressRecharge: "改裝摩托車或電腦、極限滑雪、打靶射擊、獨自一人駕車遠行。",
    goldenMatch: "ESFJ-AC",
    growthMatch: "ENFJ-RD"
  },
  "ISTP-AC": {
    name: "逍遙工匠百事通",
    tagline: "手藝精湛且隨遇而安，以務實幽默與高超技能成為朋友圈中的全能救星",
    group: "自由探索矩陣",
    badge: "🔧",
    superpowers: ["萬物皆可修復的動手天賦", "冷靜幽默的破冰方式", "在混沌中快速找到實用解法"],
    blindspots: ["討厭繁文縟節與長遠承諾", "在情感討論中習慣轉移話題"],
    careers: ["頂級木藝/金工大師", "戶外野外求生教練", "音響與錄音工程師", "無人機系統專家"],
    loveStyle: "隨性自在、不給彼此壓力，喜歡帶著伴侶一起探索有趣的實體活動。",
    stressRecharge: "在工作台打磨木器、釣魚、看科普拆解視頻、露營烤肉。",
    goldenMatch: "ESFJ-AD",
    growthMatch: "ENFJ-RC"
  },
  "ISTP-RD": {
    name: "暗夜獨行解構者",
    tagline: "在陰影中觀察物理法則的冷酷獵手，以極致精準解剖事物的內在核心",
    group: "自由探索矩陣",
    badge: "🗡️",
    superpowers: ["對複雜系統漏洞的本能直覺", "不受任何威脅動搖的定力", "獨立解決一切棘手故障"],
    blindspots: ["容易顯得過於孤僻冷淡", "自我要求極高導致精神緊繃"],
    careers: ["網絡滲透測試專家", "重型武器研發顧問", "高風險設備檢測員", "鐘錶精密修復師"],
    loveStyle: "少言寡語、防線極高，一旦認可便會默默為伴侶掃除所有現實障礙。",
    stressRecharge: "拆解組裝精密手錶、打高難度動作單機遊戲、深夜獨自健身。",
    goldenMatch: "ENFJ-AD",
    growthMatch: "ESFJ-AD"
  },
  "ISTP-RC": {
    name: "山林隱墨手藝人",
    tagline: "淡泊名利，將深邃情感寄託於精湛手藝之中，以沉靜匠心守護內在乾坤",
    group: "自由探索矩陣",
    badge: "🪵",
    superpowers: ["極其細膩的觸覺與空間感知", "化腐朽為神奇的重塑天賦", "不卑不亢的處世智慧"],
    blindspots: ["過度封閉內心情緒", "面對社交過載時容易徹底失聯"],
    careers: ["陶藝大師", "古典樂器製作師", "國家公園巡護員", "古建築修繕專家"],
    loveStyle: "樸實無華、默默守護，用親手製作的物件與安靜的陪伴傳遞深情。",
    stressRecharge: "沉浸於木雕或陶藝製作、在森林中呼吸清冽空氣、靜靜研磨刀具。",
    goldenMatch: "ENFJ-AD",
    growthMatch: "ESFJ-AD"
  },

  // ==================== 15. ISFJ 系列 (慈愛守望者) ====================
  "ISFJ-AD": {
    name: "溫柔堅定守護使",
    tagline: "潤物細無聲的堅實護盾，以無私奉獻與篤定擔當為所愛之人遮風擋雨",
    group: "心靈共鳴矩陣",
    badge: "🛡️",
    superpowers: ["驚人的細節關懷與照顧本能", "臨危不亂的後勤支撐力", "堅守底線的默默勇氣"],
    blindspots: ["過於習慣付出而忽視自身需求", "面對突發變故時內心極其焦慮"],
    careers: ["資深護理長", "家庭辦公室總管", "私人特教顧問", "金牌社工督導"],
    loveStyle: "無微不至、堅定專一，把照顧伴侶的飲食起居視為最幸福的日常。",
    stressRecharge: "整理溫馨的家、為心愛的人做烘焙、在安靜陽台泡一杯熱可可。",
    goldenMatch: "ESTP-AD",
    growthMatch: "ENTP-RD"
  },
  "ISFJ-AC": {
    name: "明燈春煦照拂者",
    tagline: "如同春日暖陽般溫厚安詳，用無盡的耐心與包容撫平周遭的一切焦慮",
    group: "心靈共鳴矩陣",
    badge: "🕯️",
    superpowers: ["讓人感到無比安心的親和力", "細緻入微的團隊後勤支援", "凝聚人心的溫柔紐帶"],
    blindspots: ["不善於拒絕他人過分請求", "常常壓抑委屈只為維持表面平靜"],
    careers: ["幼兒園園長", "資深小學名師", "社區關懷主任", "客戶關係經理"],
    loveStyle: "體貼入微、善解人意，願為伴侶建立最溫馨安全、避風遮雨的港灣。",
    stressRecharge: "手作針織刺繡、整理家庭相冊、與閨蜜摯友喝下午茶傾訴。",
    goldenMatch: "ESTP-AD",
    growthMatch: "ENTP-AD"
  },
  "ISFJ-RD": {
    name: "暗香浮動持家者",
    tagline: "在慎思明辨中守護家園，以極致細膩的安排防患未然、撫慰人心",
    group: "心靈共鳴矩陣",
    badge: "🪴",
    superpowers: ["敏銳捕捉他人未說出口的苦衷", "井井有條的資產與生活打理", "深思熟慮的風險防範"],
    blindspots: ["容易為微小瑣事思慮過度失眠", "對他人的冷淡眼神極度敏感"],
    careers: ["資深遺產信託專員", "醫療紀錄分析師", "高級家政督導", "文檔管理專家"],
    loveStyle: "深情謹慎、體貼入微，需要伴侶不斷給予肯定的言語與真誠回饋。",
    stressRecharge: "按收納盒分類整理衣櫃、泡腳敷面膜、聽舒緩白噪音入眠。",
    goldenMatch: "ESTP-AC",
    growthMatch: "ENTP-AD"
  },
  "ISFJ-RC": {
    name: "月華溫潤守護仙",
    tagline: "甘願退居幕後的慈悲之光，以純淨無私的愛默默承擔人世間的風雨",
    group: "心靈共鳴矩陣",
    badge: "🌙",
    superpowers: ["深沉安靜的傾聽與陪伴", "極度體貼的情緒共感", "在平凡生活中營造極致溫馨"],
    blindspots: ["容易陷入自我犧牲的悲情心態", "缺乏為自己爭取權益的勇氣"],
    careers: ["安寧病房護理師", "特殊兒童療癒師", "慈善義工導師", "圖書修補專員"],
    loveStyle: "一生一世的溫柔相守，把全部的愛奉獻給對方，渴望同等的珍惜與深情。",
    stressRecharge: "在安靜的雨天讀一本治癒系小說、給植物澆水修剪、看著星空發呆。",
    goldenMatch: "ESTP-AC",
    growthMatch: "ENTJ-AD"
  },

  // ==================== 16. ISFP 系列 (靈動藝術家) ====================
  "ISFP-AD": {
    name: "荒野原野自由魂",
    tagline: "追隨內心最純粹的直覺，以灑脫無畏的姿態在大地之上揮灑生命色彩",
    group: "自由探索矩陣",
    badge: "🎨",
    superpowers: ["天生的美學感知與空間張力", "活在當下的超強適應力", "不被世俗定義的自由靈魂"],
    blindspots: ["排斥長遠規劃與枯燥束縛", "情緒來臨時容易衝動行事"],
    careers: ["先鋒時尚設計師", "戶外探險攝影師", "紋身藝術大師", "景觀設計師"],
    loveStyle: "隨性浪漫、真摯熱烈，喜歡帶著伴侶在山海自然間體驗自由的微風。",
    stressRecharge: "大自然露營衝浪、沉浸式油畫塗鴉、聽現場搖滾音樂會。",
    goldenMatch: "ESTJ-AD",
    growthMatch: "ENTJ-RD"
  },
  "ISFP-AC": {
    name: "彩虹畫筆造夢家",
    tagline: "世界是一幅待染的畫布，用溫柔筆觸為身邊的每一個人添上一抹亮色",
    group: "自由探索矩陣",
    badge: "🌈",
    superpowers: ["溫暖獨特的情感表達天賦", "發掘日常細微之美的眼睛", "無壓力的人際陪伴感"],
    blindspots: ["容易在衝突面前選擇退縮逃避", "對金錢與競爭缺乏野心"],
    careers: ["兒童插畫家", "甜點烘焙藝術師", "寵物寫真攝影師", "室內軟裝設計師"],
    loveStyle: "甜蜜浪漫、充滿童心，擅長用手作禮物與驚喜營造戀愛的美好氛圍。",
    stressRecharge: "逛手作市集、烘焙香甜點心、抱著寵物曬太陽聽歌。",
    goldenMatch: "ESTJ-AD",
    growthMatch: "ENTJ-AD"
  },
  "ISFP-RD": {
    name: "深谷幽蘭獨行客",
    tagline: "在繁華之外靜靜綻放，以極致細膩的心靈捕捉天地間轉瞬即逝的詩意",
    group: "自由探索矩陣",
    badge: "🪷",
    superpowers: ["極度深沉的情感提煉力", "對色彩、光影與音樂的超敏反應", "不卑不亢的個人格調"],
    blindspots: ["容易陷入自閉式的情緒內耗", "對外界的評頭論足極度抗拒"],
    careers: ["獨立民謠音樂人", "純藝術雕塑家", "高級香氛調香師", "野生動物觀察員"],
    loveStyle: "慢熱而深邃，只有真正懂自己美學與精神世界的靈魂才能走近。",
    stressRecharge: "獨自去幽靜森林徒步、在暗房沖洗黑白底片、彈奏空靈鼓放空。",
    goldenMatch: "ESTJ-AC",
    growthMatch: "ENTJ-AD"
  },
  "ISFP-RC": {
    name: "微光精靈守護者",
    tagline: "用最純淨柔軟的心靈觸碰世界，以無聲的美好溫暖人間每一個角落",
    group: "自由探索矩陣",
    badge: "🌿",
    superpowers: ["與自然生靈的天然溝通力", "將情感化為治癒畫面的天賦", "極致溫柔的情感陪伴"],
    blindspots: ["過於自卑或害怕給他人添麻煩", "難以在複雜社會競爭中保護自己"],
    careers: ["自然療癒指導師", "花藝設計師", "繪本作家", "手工藝人"],
    loveStyle: "如水般溫柔清澈，願默默守候伴侶身邊，分享生活中的每滴甘甜。",
    stressRecharge: "在清晨採集露水與鮮花、聽著流水聲畫水彩、照顧多肉植物。",
    goldenMatch: "ESTJ-AD",
    growthMatch: "ENTJ-AD"
  }
};

const GROUP_META = {
  "戰略統御矩陣": {
    name: "戰略統御矩陣",
    enName: "Analysts · 戰略分析家",
    badge: "👑",
    avatar: "./avatars/strategist.svg",
    color: "#88619a",
    desc: "宏觀遠見、意志堅定，善於破解複雜問題與引領變革的統帥原型。"
  },
  "心靈共鳴矩陣": {
    name: "心靈共鳴矩陣",
    enName: "Diplomats · 心靈外交家",
    badge: "✨",
    avatar: "./avatars/empath.svg",
    color: "#33a474",
    desc: "深層同理、追求和諧與理想，以純淨情感啟迪人心的靈魂導師。"
  },
  "秩序精算矩陣": {
    name: "秩序精算矩陣",
    enName: "Sentinels · 秩序守護者",
    badge: "🛡️",
    avatar: "./avatars/sentinel.svg",
    color: "#4298b4",
    desc: "嚴謹務實、構建系統，守護穩定秩序與落實執行的高效柱石。"
  },
  "自由探索矩陣": {
    name: "自由探索矩陣",
    enName: "Explorers · 自由探險家",
    badge: "⚡",
    avatar: "./avatars/explorer.svg",
    color: "#e4ae3a",
    desc: "敏捷隨性、熱愛實踐與冒險，勇於挑戰未知並享受當下的先驅者。"
  }
};

/**
 * 根據 6 位代碼取得完整人格數據
 */
function getPersonalityProfile(code) {
  const fallbackGroup = GROUP_META["戰略統御矩陣"];
  const baseType = (code ? code.split('-')[0] : 'entj').toLowerCase();
  const avatarPath = `./avatars/${baseType}.svg`;

  if (TYPE_DEFINITIONS[code]) {
    const data = TYPE_DEFINITIONS[code];
    const groupMeta = GROUP_META[data.group] || fallbackGroup;
    return {
      code,
      ...data,
      baseType: baseType.toUpperCase(),
      avatar: avatarPath,
      groupColor: groupMeta.color,
      groupEnName: groupMeta.enName
    };
  }

  return {
    code,
    name: `${code} 探索開拓者`,
    tagline: "在未知光譜中綻放獨特光芒的智慧靈魂",
    group: "自由探索矩陣",
    badge: "✨",
    avatar: "./avatars/explorer.jpg",
    groupColor: "#06b6d4",
    groupEnName: "Explorer & Pioneer",
    superpowers: ["多維度敏銳感知", "快速環境適應力", "獨立客觀思考"],
    blindspots: ["需注意在多元可能性中保持專注", "適時排解內在壓力"],
    careers: ["全方位跨界專家", "戰略創新顧問", "項目主理人"],
    loveStyle: "重視相互尊重、精神共鳴與共同進步。",
    stressRecharge: "親近自然、充足睡眠與深度獨處反思。",
    goldenMatch: "ENTJ-AD",
    growthMatch: "ISFP-RC"
  };
}

/**
 * 取得全部 64 種人格列表
 */
function getAllPersonalities() {
  const codes = Object.keys(TYPE_DEFINITIONS);
  return codes.map(code => getPersonalityProfile(code));
}
