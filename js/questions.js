/**
 * 64型人格心理測驗 - 60題深度精準題庫 (60-Question Psychometric Bank)
 * 涵蓋 6 大雙極核心維度，每維度 10 題 (5 正向題 + 5 反向題 對稱平衡設計)
 */

const DIMENSIONS = {
  EI: {
    name: "能量獲取",
    codeA: "E",
    labelA: "外向 Extravert",
    descA: "透過社交互動、外在探索與行動來獲取能量",
    codeB: "I",
    labelB: "內向 Introvert",
    descB: "透過獨處沉澱、深度反思與內在世界獲取能量",
    color: "#6366f1"
  },
  SN: {
    name: "資訊感知",
    codeA: "S",
    labelA: "實感 Sensing",
    descA: "專注具體細節、現實經驗與可驗證的事實",
    codeB: "N",
    labelB: "直覺 Intuition",
    descB: "洞察潛在關聯、未來趨勢與抽象宏觀願景",
    color: "#06b6d4"
  },
  TF: {
    name: "決策邏輯",
    codeA: "T",
    labelA: "理智 Thinking",
    descA: "依據客觀規律、邏輯因果與客觀標準做判斷",
    codeB: "F",
    labelB: "情感 Feeling",
    descB: "基於人際和諧、價值認同與同理共感做決定",
    color: "#ec4899"
  },
  JP: {
    name: "生活處事",
    codeA: "J",
    labelA: "條理 Judging",
    descA: "喜好明確計畫、結構秩序、預先安排與掌控感",
    codeB: "P",
    labelB: "靈活 Perceiving",
    descB: "喜好隨機應變、保持彈性、開放可能性與自發性",
    color: "#10b981"
  },
  AR: {
    name: "心態韌性",
    codeA: "A",
    labelA: "篤定自信 Assertive",
    descA: "面對壓力與未知從容自信，較少自我懷疑或焦慮",
    codeB: "R",
    labelB: "審慎敏銳 Reflective",
    descB: "對環境細節極具洞察，精益求精且常做深度自省",
    color: "#f59e0b"
  },
  DC: {
    name: "行動驅力",
    codeA: "D",
    labelA: "開拓主導 Driver",
    descA: "目標導向、敢於引領變革、追求突破與影響力",
    codeB: "C",
    labelB: "協同共鳴 Connective",
    descB: "凝聚團隊、倡導共好、注重關係連結與集體共識",
    color: "#8b5cf6"
  }
};

const QUESTIONS = [
  // ==================== 維度 1: EI (能量獲取: E vs I) - 10 題 ====================
  {
    id: 1,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "在忙碌的一週結束後，我更傾向於參加熱鬧的聚會或朋友活動來放鬆充電。",
    direction: 1,
    scenario: "社交與充電模式"
  },
  {
    id: 2,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "在團體討論中，我通常會在腦中反覆推敲成熟後才開口，而非邊說邊想。",
    direction: -1,
    scenario: "表達與思考習慣"
  },
  {
    id: 3,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "認識新的朋友對我來說自然而令人興奮，我很少在初次見面的場合感到拘謹。",
    direction: 1,
    scenario: "破冰與新社交"
  },
  {
    id: 4,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "長時間處於人群嘈雜的環境中，即使大家都很友善，我也會迅速感到精力被消耗殆盡。",
    direction: -1,
    scenario: "環境精力消耗"
  },
  {
    id: 5,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "我喜歡主動發起活動並帶動現場氣氛，成為群體中推動對話與互動的人。",
    direction: 1,
    scenario: "群體動力角色"
  },
  {
    id: 6,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "比起向多人分享近況，我更享受一對一深度對話或完全安靜的個人時光。",
    direction: -1,
    scenario: "人際深度偏好"
  },
  {
    id: 7,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "當面臨困惑或靈感時，我習慣找人即時討論碰撞想法，這比自己閉門思索更有效率。",
    direction: 1,
    scenario: "思維激發管道"
  },
  {
    id: 8,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "連續幾天沒有獨處時間會讓我感到煩躁不安，我需要自己的私密空間恢復元氣。",
    direction: -1,
    scenario: "獨處需求強度"
  },
  {
    id: 9,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "在大型活動或公開場合中，我很容易主動融入不同的圈子並與陌生人相談甚歡。",
    direction: 1,
    scenario: "開放社交彈性"
  },
  {
    id: 10,
    dimension: "EI",
    dimensionName: "能量獲取",
    text: "我習慣在心中建構豐富的內在世界，很多深刻的感受和想法很少主動對外傾訴。",
    direction: -1,
    scenario: "內在精神隱私"
  },

  // ==================== 維度 2: SN (資訊感知: S vs N) - 10 題 ====================
  {
    id: 11,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "在評估新想法時，我更看重具體的實踐經驗與已被驗證的實際數據，而非天馬行空的理論。",
    direction: 1,
    scenario: "資訊評估依據"
  },
  {
    id: 12,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "我常被事物的象徵意義、未來趨勢與潛在可能性深深吸引，勝過當下的眼前瑣事。",
    direction: -1,
    scenario: "想像與願景"
  },
  {
    id: 13,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "我擅長觀察生活周遭的環境細節（如擺設變化、他人外表變化或具體數值錯誤）。",
    direction: 1,
    scenario: "細節洞察力"
  },
  {
    id: 14,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "當接收到零散的資訊時，我常能直覺地在腦海中拼湊出宏觀的全貌與背後模式。",
    direction: -1,
    scenario: "模式辨識與直覺"
  },
  {
    id: 15,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "在執行任務時，我偏好遵循明確、具步驟指引的操作手冊，而不是自由發揮的模糊指南。",
    direction: 1,
    scenario: "操作方式偏好"
  },
  {
    id: 16,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "我常常思考「如果世界是另一個樣子會如何」等哲學或科幻概念，並樂此不疲。",
    direction: -1,
    scenario: "概念探索"
  },
  {
    id: 17,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "我更信任看得見、摸得著且當下可用的實際資源，對未來的空泛承諾持保留態度。",
    direction: 1,
    scenario: "現實務實取向"
  },
  {
    id: 18,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "我常被他人認為是富有想像力或具前瞻性的人，經常提出跳脫框架的新奇觀點。",
    direction: -1,
    scenario: "跳脫框架思維"
  },
  {
    id: 19,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "我喜歡描述事情發生的具體事實與時間線順序，而不習慣過度加油添醋或抽象隱喻。",
    direction: 1,
    scenario: "陳述風格"
  },
  {
    id: 20,
    dimension: "SN",
    dimensionName: "資訊感知",
    text: "比起反覆執行已經熟練的工作，我更享受探索全新且未曾涉足的原創領域。",
    direction: -1,
    scenario: "創新探索偏好"
  },

  // ==================== 維度 3: TF (決策邏輯: T vs F) - 10 題 ====================
  {
    id: 21,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "面臨重要抉擇時，我會優先分析客觀利弊與因果關係，盡量避免情緒主觀影響判斷。",
    direction: 1,
    scenario: "核心抉擇機制"
  },
  {
    id: 22,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "當朋友找我傾訴時，我會先同理對方的感受並給予情感支持，而非急著替他分析問題並找解法。",
    direction: -1,
    scenario: "共情與傾聽"
  },
  {
    id: 23,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "在團隊合作中，我認為「把事情做對做好（效率與正確性）」比「顧及每個人當下的心情感受」更重要。",
    direction: 1,
    scenario: "原則 vs 氛圍"
  },
  {
    id: 24,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "做決定時，如果某個方案會讓身邊的人感到委屈或受傷，即使邏輯上最優，我也會非常猶豫。",
    direction: -1,
    scenario: "人際價值取捨"
  },
  {
    id: 25,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "我能坦然指出討論中的邏輯漏洞或事實矛盾，並認為真理越辯越明是理所當然的。",
    direction: 1,
    scenario: "辯論與思辨"
  },
  {
    id: 26,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "我對他人的情緒微表情與氛圍變化非常敏感，並本能地努力維持人際場域的和諧溫暖。",
    direction: -1,
    scenario: "同理心感知"
  },
  {
    id: 27,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "在評價一件工作成果時，我更看重是否達到了既定的客觀標準，而非過程中的人情苦勞。",
    direction: 1,
    scenario: "評價標準依歸"
  },
  {
    id: 28,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "維持深厚的人際信任與情感連結對我的人生至關重要，甚至高於單純的名利與事成功。",
    direction: -1,
    scenario: "終極價值追求"
  },
  {
    id: 29,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "當制度與個人特例產生衝突時，我傾向維護制度的普遍公平性，避免因人設事。",
    direction: 1,
    scenario: "公平法理準繩"
  },
  {
    id: 30,
    dimension: "TF",
    dimensionName: "決策邏輯",
    text: "在給予他人反饋時，我會費心修飾措辭以照顧對方自尊，避免過於刺耳生硬。",
    direction: -1,
    scenario: "反饋溝通同理"
  },

  // ==================== 維度 4: JP (生活處事: J vs P) - 10 題 ====================
  {
    id: 31,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "出門旅行或處理專案前，我習慣制定詳細的行程清單與時間表，這讓我有掌控感與安全感。",
    direction: 1,
    scenario: "規劃與掌控"
  },
  {
    id: 32,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "我更享受根據當下的心情與靈感隨興行動，過於死板的日常排程會讓我感到束縛窒息。",
    direction: -1,
    scenario: "彈性自發性"
  },
  {
    id: 33,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "我習慣在截止日期（Deadline）前早早完成任務，難以忍受把事情拖到最後一刻的焦慮。",
    direction: 1,
    scenario: "時間管理風格"
  },
  {
    id: 34,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "在面對多種可能時，我偏好保留選擇的餘地（Keep options open），直到最後才做最終定案。",
    direction: -1,
    scenario: "決策開放度"
  },
  {
    id: 35,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "我的工作空間、電腦桌面與文件夾通常井然有序、分類明確，能快速定位所需物品。",
    direction: 1,
    scenario: "秩序與整理"
  },
  {
    id: 36,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "當計畫被突如其來的變化打亂時，我通常能迅速調適心態，並在混沌與變化中找到樂趣。",
    direction: -1,
    scenario: "抗變異與適應"
  },
  {
    id: 37,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "完成一項計畫並在清單上打勾（Checklist）帶給我很強的成就感與放鬆感。",
    direction: 1,
    scenario: "目標閉環偏好"
  },
  {
    id: 38,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "我常常在最後關頭（Last minute）由腎上腺素激發出最強的工作效率與創造力。",
    direction: -1,
    scenario: "爆發衝刺模式"
  },
  {
    id: 39,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "我喜歡凡事早做決斷、拍板定案，懸而未決的未定狀態會讓我心中懸著一塊大石。",
    direction: 1,
    scenario: "定案確定性偏好"
  },
  {
    id: 40,
    dimension: "JP",
    dimensionName: "生活處事",
    text: "我對突發的新奇機會抱持極大熱情，願意為了有趣的變數隨時調整既定安排。",
    direction: -1,
    scenario: "擁抱突發奇想"
  },

  // ==================== 維度 5: AR (心態韌性: A vs R) - 10 題 ====================
  {
    id: 41,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "即使在高度不確定或突發危機中，我通常也能保持內心平靜，堅信自己有能力妥善應對。",
    direction: 1,
    scenario: "危機定力"
  },
  {
    id: 42,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "我經常在事情結束後反覆重播過程，思考自己是否哪裡說得不夠好或可以做得更完美。",
    direction: -1,
    scenario: "自我審視與反思"
  },
  {
    id: 43,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "我不太會因為外界的批評或非議而長期陷入內耗，能夠快速翻篇並專注於下一步前進。",
    direction: 1,
    scenario: "心理抗壓與復原"
  },
  {
    id: 44,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "我對潛在的風險與細微漏洞高度警覺，常在事前做好最壞打算以防患於未然。",
    direction: -1,
    scenario: "風險敏銳度"
  },
  {
    id: 45,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "對於自己做出的決定與選擇，我很少產生強烈的後悔感或「如果當初...」的懷疑。",
    direction: 1,
    scenario: "自信決斷感"
  },
  {
    id: 46,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "追求卓越對我而言是一種內在渴望，哪怕得到他人讚賞，我也總能看到自己尚待精進的微小缺點。",
    direction: -1,
    scenario: "完美主義傾向"
  },
  {
    id: 47,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "在公開場合發表個人意見或展示成果時，我鮮少感到緊張膽怯或自我懷疑。",
    direction: 1,
    scenario: "舞台與展現自信"
  },
  {
    id: 48,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "我容易覺察到環境中潛在的負面評價或微小冷淡，並花費精力去思考背後原因。",
    direction: -1,
    scenario: "環境情緒警覺"
  },
  {
    id: 49,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "面對未曾嘗試的高難度任務，我通常會先抱持樂觀自信的態度，相信兵來將擋、水來土掩。",
    direction: 1,
    scenario: "樂觀開拓心態"
  },
  {
    id: 50,
    dimension: "AR",
    dimensionName: "心態韌性",
    text: "在面臨重大考驗前，我往往會因焦慮而反覆確認每一個步驟，甚至影響睡眠質量。",
    direction: -1,
    scenario: "考前慎重焦慮"
  },

  // ==================== 維度 6: DC (行動驅力: D vs C) - 10 題 ====================
  {
    id: 51,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "當團體缺乏方向時，我會本能地挺身而出主導大局，分配任務並推動整體進度前進。",
    direction: 1,
    scenario: "領導與開拓"
  },
  {
    id: 52,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "在推動專案時，我更注重建立全員參與的共識，確保每位夥伴的聲音都被傾聽與尊重。",
    direction: -1,
    scenario: "共識與協同"
  },
  {
    id: 53,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "我喜歡設定具有挑戰性、顛覆傳統的遠大目標，並享受突破阻礙帶來的征服快感。",
    direction: 1,
    scenario: "目標攻堅"
  },
  {
    id: 54,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "我擅長拉近人與人之間的距離，搭建信任橋樑，成為團隊中不可或缺的黏著劑。",
    direction: -1,
    scenario: "人際凝聚力"
  },
  {
    id: 55,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "在面臨僵局時，我寧可做出有爭議但能迅速打破困局的果斷行動，也不願在妥協中停滯不前。",
    direction: 1,
    scenario: "破局果決度"
  },
  {
    id: 56,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "「一個人走得快，一群人走得遠」是我深信的理念，我總是把集體的長期和諧與共榮放在首位。",
    direction: -1,
    scenario: "集體共榮願景"
  },
  {
    id: 57,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "在競爭環境中，我渴望成為領先者並獲得話語權，主動掌控事態的發展方向。",
    direction: 1,
    scenario: "競爭與掌控欲"
  },
  {
    id: 58,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "看到團隊成員彼此支持並共同達成目標，比我自己一個人獲得光鮮榮譽更讓我感動。",
    direction: -1,
    scenario: "成就感來源"
  },
  {
    id: 59,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "我習慣以結果為導向（Outcome-driven），敢於打破陳規舊習以追求效率與突破。",
    direction: 1,
    scenario: "結果導向變革"
  },
  {
    id: 60,
    dimension: "DC",
    dimensionName: "行動驅力",
    text: "我非常注重團隊的心理安全感，會主動花心思照顧隊友的感受，確保沒有人被冷落。",
    direction: -1,
    scenario: "包容照顧本能"
  }
];

const SCALE_OPTIONS = [
  { value: 2, label: "非常符合", shortLabel: "非常符合", color: "#6366f1", scaleSize: "large" },
  { value: 1, label: "偏向符合", shortLabel: "偏符合", color: "#818cf8", scaleSize: "medium" },
  { value: 0, label: "中立 / 視情況", shortLabel: "中立", color: "#94a3b8", scaleSize: "small" },
  { value: -1, label: "偏向不符", shortLabel: "偏不符", color: "#f472b6", scaleSize: "medium" },
  { value: -2, label: "非常不符", shortLabel: "非常不符", color: "#ec4899", scaleSize: "large" }
];
