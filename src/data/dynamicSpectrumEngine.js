/**
 * 64型心智動力學 - 6大維度百分比深度動態客製化引擎 (Hyper-Personalized Psychometric Engine)
 * 根據受測者 6 大維度的真實量化百分比 (EI, SN, TF, JP, AR, DC)，
 * 即時計算百分比強度等級 (Extreme 85%+ / Strong 70-84% / Moderate 58-69% / Balanced 50-57%)，
 * 動態合成 100% 獨一無二的心理學深度長文、多維度交叉共振、愛情依附剖析與 21 天躍遷指南。
 */

export function getIntensityLevel(percent) {
  if (percent >= 85) return 'extreme';   // 85% ~ 100%: 極致純粹極限態
  if (percent >= 70) return 'strong';    // 70% ~ 84%: 強勢主導顯著態
  if (percent >= 58) return 'moderate';  // 58% ~ 69%: 溫和偏向成熟態
  return 'balanced';                     // 50% ~ 57%: 雙核游移平衡態
}

// 6 大維度在不同百分比區間的精準客製化解析字典
const DIMENSION_PROFILES = {
  EI: {
    E: {
      extreme: (p) => ({
        levelTitle: `外向能量 ${p}% · 極限社交超新星`,
        summary: `你的外向能量達到驚人的 ${p}%，你就像行走的能量發電機，在群體社交、公眾演講與團隊激勵中能獲得極致的充能快感。你的思維極度外顯，習慣「邊說邊思考」。`,
        superpower: `具備強大的公眾感染力與現場破冰力，能瞬間點燃團隊士氣並建立廣闊的人脈網絡。`,
        blindspot: `極端外向可能使你在獨處時感到能量驟降與莫名的焦慮空虛，容易依賴外界回饋來確認自我價值。`,
        growthAdvice: `每週強制安排至少 2 次「45 分鐘完全斷網獨處」，練習向內對話，避免過度向外透支能量。`
      }),
      strong: (p) => ({
        levelTitle: `外向能量 ${p}% · 穩健號召領航者`,
        summary: `你的外向能量達到 ${p}%，善於在人際網絡中發揮影響力，既能自如主導對話，也能在團隊中扮演熱情推動者，同時保持清晰的自我主導權。`,
        superpower: `出色的跨界溝通與團隊協作推進力，能在各種社交場合如魚得水。`,
        blindspot: `在需要高度孤獨鑽研的超長週期任務中，容易因缺乏即時互動反饋而產生疲倦感。`,
        growthAdvice: `在大型專案中採取「衝刺社交 + 深度沉澱」的番茄鐘節奏，保持充沛的心力。`
      }),
      moderate: (p) => ({
        levelTitle: `外向能量 ${p}% · 彈性情境互動者`,
        summary: `外向能量 ${p}% 屬於健康適度的外向形態。你需要與人交流來激發靈感，但也非常重視個人邊界與深度專注時光。`,
        superpower: `不具備攻擊性的親和力，既能融洽參與團體，又懂得何時優雅退場。`,
        blindspot: `偶爾在「迎合社交期望」與「退回舒適圈」之間產生內在微小拉扯。`,
        growthAdvice: `明確劃分「高價值社交」與「無效社交」，將有限的社交心力投注在真正同頻的夥伴身上。`
      }),
      balanced: (p) => ({
        levelTitle: `外向/內向平衡態（E ${p}%）· 雙核情境型切換者 (Ambivert)`,
        summary: `你的外向指數僅為 ${p}%，處於外向與內向的黃金中位線。你既不是純粹的話匣子，也不是沉默的隱士，而是稀有的「雙核情境切換者 (Ambivert)」。`,
        superpower: `能在「大方社交主持」與「深度獨立閉關」之間秒級切換，具備極高的環境適應彈性。`,
        blindspot: `容易因身處不同群體而展現截然相反的面貌，導致身邊人對你的真實性格產生認知落差。`,
        growthAdvice: `接納自己的雙面性，無需逼迫自己成為固定的外向或內向標籤，隨心流切換即可。`
      })
    },
    I: {
      extreme: (p) => ({
        levelTitle: `內向能量 ${p}% · 極深邃精神隱士`,
        summary: `你的內向能量高達 ${p}%，內在精神世界無比浩瀚繁複。你對外界的噪音和低質量社交極度敏感，獨處是你唯一的真正能量充電站。`,
        superpower: `超凡的深度沉浸專注力、獨立構建完整思想體系的能力，能忍受極致孤獨完成宏大創造。`,
        blindspot: `容易將自己徹底封閉在精神孤島中，在外界眼中顯得難以接近甚至冷漠，錯失重要外部機遇。`,
        growthAdvice: `每天主動發送 1 條真誠的問候訊息給信任的朋友，建立微小但可持續的情感對外輸出管道。`
      }),
      strong: (p) => ({
        levelTitle: `內向能量 ${p}% · 獨立思考沉潛者`,
        summary: `內向能量 ${p}% 賦予你敏銳的觀察力與內省深度。你習慣在發言前在腦中深思熟慮，不鳴則已，一鳴驚人。`,
        superpower: `冷靜客觀的洞察視角，不易被外界盲目狂熱帶偏節奏，是團隊裡最具深度的智囊。`,
        blindspot: `在節奏極快的高頻會議或多人頭腦風暴中，容易因反應不及而被搶先定調。`,
        growthAdvice: `在會議前先以文字形式列出 3 個核心觀點，會議一開始即主動發言定錨。`
      }),
      moderate: (p) => ({
        levelTitle: `內向能量 ${p}% · 溫和內斂觀察家`,
        summary: `內向能量 ${p}% 讓你在保持獨立精神的同時，也能自在地與少數志同道合者進行高質量交流。`,
        superpower: `擅長一對一深度對話，具備極佳的傾聽品質與令人安心的沉穩氣場。`,
        blindspot: `面對突如其來的陌生大型社交場景，仍會感到短暫的能量透支。`,
        growthAdvice: `參加活動前提前設定「撤退時間點」，給自己明確的心理安全預期。`
      }),
      balanced: (p) => ({
        levelTitle: `內向/外向平衡態（I ${p}%）· 雙核情境型切換者 (Ambivert)`,
        summary: `你的內向指數為 ${p}%，非常接近 50% 中位線。在熟悉領域你能侃侃而談領導眾人，在私人時刻又能沉浸於書海或嗜好中。`,
        superpower: `能在獨自深耕與對外溝通之間取得近乎完美的動態平衡。`,
        blindspot: `可能在精力充沛與渴望隱居之間週期性波動，容易讓合作夥伴捉摸不定。`,
        growthAdvice: `建立公開透明的個人狀態行事曆，讓身邊人知曉你當前處於「社交開放期」還是「深度閉關期」。`
      })
    }
  },

  SN: {
    N: {
      extreme: (p) => ({
        levelTitle: `直覺前瞻 ${p}% · 跨維度概念狂想家`,
        summary: `你的直覺維度達到極端的 ${p}%，你天生生活在「明天與無限可能」之中。你看事情永遠抓底層底線與未來格局，極度痛恨繁瑣的重複性日常。`,
        superpower: `手術刀般精準的趨勢預判力、跨領域概念融合創新力，能看見別人看不見的隱藏關聯。`,
        blindspot: `「思想在天上，腳步未著地」——極易忽視具體的執行成本、財務報表細節與現實物理限制。`,
        growthAdvice: `每當萌生一個宏大想法時，強制在白紙上寫出「第一步：今晚 15 分鐘能完成的具體動作」。`
      }),
      strong: (p) => ({
        levelTitle: `直覺前瞻 ${p}% · 戰略洞察先驅`,
        summary: `直覺指數 ${p}% 賦予你強大的宏觀架構思維。你善於為團隊指明方向，在混亂中迅速梳理出核心主線。`,
        superpower: `卓越的戰略規劃能力與商業嗅覺，能提前半年至一年感知市場與人際風向變化。`,
        blindspot: `當被迫長時間處理繁瑣瑣碎的行政流程時，心智能量會出現斷崖式暴跌。`,
        growthAdvice: `學會向具備高實感 (S) 的夥伴充分授權細節執行，專注發揮你的戰略核心價值。`
      }),
      moderate: (p) => ({
        levelTitle: `直覺前瞻 ${p}% · 務實創新推進者`,
        summary: `直覺指數 ${p}% 讓你在具備想像力的同時，依然保持對現實可行性的敬畏。`,
        superpower: `能將新穎的點子轉化為可落地的階段性里程碑，是極為難得的實幹型構想者。`,
        blindspot: `在極端保守和極端激進的聲音夾擊下，有時容易陷入自我懷疑的微小糾結。`,
        growthAdvice: `相信你的直覺第一判斷，在 70% 資訊充分時即可大膽推進試錯。`
      }),
      balanced: (p) => ({
        levelTitle: `直覺/實感平衡態（N ${p}%）· 仰望星空且腳踏實地 (Dual Visionary)`,
        summary: `你的直覺維度為 ${p}%，處於完美的中庸地帶。你既能跟高層探討 5 年戰略願景，又能下場親自核對具體實施細則。`,
        superpower: `宏觀戰略與微觀細節的無縫雙重視角，是組織中最不可或缺的全面操盤手。`,
        blindspot: `常常既想保證宏大願景又捨不得放棄每個細節，導致工作負載過重。`,
        growthAdvice: `嚴格區分任務層級，學會抓大放小，避免在非關鍵細節上消耗過多決策心力。`
      })
    },
    S: {
      extreme: (p) => ({
        levelTitle: `實感感知 ${p}% · 極限精度定海神針`,
        summary: `你的實感維度高達 ${p}%，你是極致的「現實主義工匠」。你只相信親眼所見、親手驗證的數據與客觀事實，對虛無縹緲的空想極度免疫。`,
        superpower: `無與倫比的細節把控力、極致的實操落地執行力與高度穩定的交付品質。`,
        blindspot: `容易對顛覆性的概念產生本能的抗拒與懷疑，可能錯過範式轉移時的巨大紅利。`,
        growthAdvice: `每個月主動接觸 1 個完全不懂的全新前沿領域（如新興 AI 應用），練習接納不確定性。`
      }),
      strong: (p) => ({
        levelTitle: `實感感知 ${p}% · 嚴謹數據實幹家`,
        summary: `實感指數 ${p}% 讓你在任何混亂局面下都能迅速錨定關鍵事實。你是團隊中最令人安心的品質把關者。`,
        superpower: `卓越的流程優化與風險排查能力，善於將抽象策略落實為一套可複製的標準作業程序 (SOP)。`,
        blindspot: `有時過於執著於現有成功路徑，在面對突發未知的非線性劇變時適應稍慢。`,
        growthAdvice: `在常規計畫中預留 10% 的「實驗預算」，允許團隊進行低成本的非傳統嘗試。`
      }),
      moderate: (p) => ({
        levelTitle: `實感感知 ${p}% · 務實經驗整合者`,
        summary: `實感指數 ${p}% 兼具實踐導向與開放心態。你重視經驗累積，但也樂於借鑒有價值的新方法。`,
        superpower: `穩紮穩打的成長節奏，具備高抗風險能力與可持續發展潛力。`,
        blindspot: `在需要純直覺跳躍性決策的極少數情境下，可能會因缺乏先例而猶豫。`,
        growthAdvice: `培養「小步快跑、快速迭代」的心態，不必等待所有數據百分之百齊備才開始行動。`
      }),
      balanced: (p) => ({
        levelTitle: `實感/直覺平衡態（S ${p}%）· 仰望星空且腳踏實地 (Dual Visionary)`,
        summary: `實感指數 ${p}% 讓你游刃有餘地在具體事實與宏觀藍圖間切換。你既懂原理又懂實操。`,
        superpower: `極為均衡的資訊輸入架構，能與不同心智偏好的人毫無障礙地協同合作。`,
        blindspot: `在需要極致偏執才能突破的特定技術盲區，有時會因考慮過於周全而分散焦點。`,
        growthAdvice: `在特定關鍵節點設定單一硬指標，聚焦單點爆破。`
      })
    }
  },

  TF: {
    T: {
      extreme: (p) => ({
        levelTitle: `理性思維 ${p}% · 手術刀級純粹邏輯矩陣`,
        summary: `你的理智維度高達驚人的 ${p}%！在你的大腦中，世界是由因果律、效率公式與客觀邏輯構成的。在重大決策時，你能完全剝離個人情緒干擾。`,
        superpower: `鋼鐵般的客觀決策力、無懈可擊的邏輯推演力，在高壓危機中永遠是最清醒的定盤星。`,
        blindspot: `⚠️ 極度危險的盲區：容易將人際關係與情感需求「工具化/數據化」，身邊人極易感到被忽視與冷落！`,
        growthAdvice: `在給出任何「理性解決方案」之前，強制先說一句：「我理解這件事讓你感到很不容易」，開啟情感同理開關。`
      }),
      strong: (p) => ({
        levelTitle: `理性思維 ${p}% · 客觀原則執行者`,
        summary: `理智指數 ${p}% 讓你在面對複雜糾紛時始終以事實與原則為基準，公平公正，不偏不倚。`,
        superpower: `清晰的批判性思維與架構拆解能力，善於建立高效公平的規則與運作體系。`,
        blindspot: `在面對需要純粹情感安慰（而非尋求建議）的朋友或伴侶時，容易因直奔問題而引發衝突。`,
        growthAdvice: `練習區分對方的對話模式是「尋求答案 (Ask for Solution)」還是「需要擁抱 (Need Validation)」。`
      }),
      moderate: (p) => ({
        levelTitle: `理性思維 ${p}% · 溫和理性協調者`,
        summary: `理智指數 ${p}% 具備良好的邏輯骨架，同時保留了對人性的溫度感知。`,
        superpower: `能在講清道理的同時顧及對方感受，溝通說服力極強。`,
        blindspot: `在面對極端不講理或情緒失控的對象時，容易感到無奈與耗竭。`,
        growthAdvice: `認清情緒是非理性的產物，學會適度脫離對話，無需為他人的情緒崩潰買單。`
      }),
      balanced: (p) => ({
        levelTitle: `理智/情感平衡態（T ${p}%）· 情理雙修仲裁大師 (Heart & Mind Balance)`,
        summary: `你的理智得分為 ${p}%，精準落在理智與情感的交匯點。你既有清晰的邏輯大腦，又有溫熱同理的心靈，是罕見的「情理兼修者」。`,
        superpower: `極高的情商與智商共振，在團隊中是最受人信任與愛戴的公正仲裁者與心靈導師。`,
        blindspot: `在面臨「保全制度原則」還是「照顧個人特殊情感」的極限道德抉擇時，內心拉扯最為劇烈。`,
        growthAdvice: `建立「大原則寸步不讓，小細節充滿溫情」的二級處事準則，化解內在拉扯。`
      })
    },
    F: {
      extreme: (p) => ({
        levelTitle: `情感共鳴 ${p}% · 極高靈敏共情海綿`,
        summary: `你的情感維度達到極端的 ${p}%！你對人性的光輝、善意與未言明的委屈擁有雷達般的感知力。你的一切決策皆源自內心深處的崇高價值觀。`,
        superpower: `震撼人心的心靈感染力、深刻的同理共情天賦，能走進最封閉的心靈並帶來真正的療癒。`,
        blindspot: `⚠️ 極度危險的盲區：你是一塊「情緒海綿」，極易無差別吸收周遭所有的負面情緒，導致嚴重心靈內耗！`,
        growthAdvice: `必須在心靈周圍建立「冷酷邊界防護盾」——明確告訴自己：「他的痛苦是他的功課，我無需替他承受」。`
      }),
      strong: (p) => ({
        levelTitle: `情感共鳴 ${p}% · 價值引領守護者`,
        summary: `情感指數 ${p}% 讓你始終將「人的感受與長遠福祉」置於第一位。你具備極強的團隊凝聚與關係修復能力。`,
        superpower: `擅長營造溫暖包容的氛圍，能激發每個人內心深處最美好的善意與潛能。`,
        blindspot: `為了維持表面和諧或避免傷害他人，有時會推遲必要的批評或硬性決策。`,
        growthAdvice: `記住「慈悲不代表軟弱」——及時、真誠的建設性回饋，才是對他人最大的負責任與愛。`
      }),
      moderate: (p) => ({
        levelTitle: `情感共鳴 ${p}% · 真誠同理實踐者`,
        summary: `情感指數 ${p}% 具備健康的同理心，同時具備守護自我邊界的能力。`,
        superpower: `人際關係融洽深厚，能給身邊人帶來真實持久的信任與溫暖。`,
        blindspot: `當遭遇無情利用或惡意辜負時，恢復週期相對較長。`,
        growthAdvice: `將真誠保留給懂得分寸的人，對過度索取者果斷拉開物理與心理距離。`
      }),
      balanced: (p) => ({
        levelTitle: `情感/理智平衡態（F ${p}%）· 情理雙修仲裁大師 (Heart & Mind Balance)`,
        summary: `情感得分 ${p}% 展現出極致的情理平衡。你懂得用理性捍衛底線，用同理溫暖人心。`,
        superpower: `全維度人際洞察力，既能講透客觀利益，又能打動人心深處。`,
        blindspot: `在極限矛盾情境下，需要花費比常人更多的時間來尋求兩全其美的解決之道。`,
        growthAdvice: `接納「世上沒有完美的兩全」，有時局部的不完美正是全局最優解。`
      })
    }
  },

  JP: {
    J: {
      extreme: (p) => ({
        levelTitle: `條理掌控 ${p}% · 極限秩序閉環掌控官`,
        summary: `你的條理維度高達 ${p}%！在你的字典裡沒有「走一步看一步」。你對時間節點、計畫清單與閉環交付有著近乎宗教般的執著。`,
        superpower: `無與倫比的專案推進力、超強的抗拖延體質，能將任何混亂專案在截止日前按時高質量交付。`,
        blindspot: `過高的控制慾容易讓你在突發意外前產生強烈的狂躁焦慮，對計劃外的變更容忍度極低。`,
        growthAdvice: `在每日行事曆中主動預留 20% 的「混沌空白時間 (Chaos Buffer)」，將接納意外正式納入計畫。`
      }),
      strong: (p) => ({
        levelTitle: `條理掌控 ${p}% · 高效目標推進者`,
        summary: `條理指數 ${p}% 讓你始終掌握生活與工作的方向盤。你善於拆解長遠目標，按部就班推進。`,
        superpower: `極高的自律性與可靠度，承諾必達，是團隊中最值得信賴的基石。`,
        blindspot: `當合作夥伴節奏鬆散或拖延時，內心容易積聚無名怒火。`,
        growthAdvice: `多關注「最終結果是否達成」，放寬對他人中間實施路徑與細節節奏的微觀管控。`
      }),
      moderate: (p) => ({
        levelTitle: `條理掌控 ${p}% · 結構彈性兼備者`,
        summary: `條理指數 ${p}% 具備良好的規劃習慣，同時對環境變化保持著健康的開放度。`,
        superpower: `既有明確目標，又能敏捷調整航道，具備優異的抗風險與執行綜合素養。`,
        blindspot: `在多個並行目標衝突時，可能短暫陷入優先級排序的選擇困境。`,
        growthAdvice: `運用艾森豪威爾矩陣，每天清晨僅鎖定 1 件「絕對不能妥協的核心大事」。`
      }),
      balanced: (p) => ({
        levelTitle: `條理/靈活平衡態（J ${p}%）· 敏捷自適應操盤手 (Adaptive Flow)`,
        summary: `你的條理得分為 ${p}%，在規劃與隨性之間找到了極致平衡。你大方向極其清晰，但手法極為靈動。`,
        superpower: `「結構中的自由」——既能制定嚴謹戰略，又能隨風借力、順勢而為。`,
        blindspot: `在極端需要剛性紀律或極端需要狂野隨性的單極環境中，可能需要刻意切換模式。`,
        growthAdvice: `繼續保持這種動態彈性，這是你在不確定時代最具競爭力的核心護城河。`
      })
    },
    P: {
      extreme: (p) => ({
        levelTitle: `靈活應變 ${p}% · 極限自由破局浪人`,
        summary: `你的靈活維度高達 ${p}%！任何僵化的體制、死板的打卡與一眼望到頭的流程都會讓你感到窒息。你的靈感永遠在最後一刻與危機中爆炸！`,
        superpower: `神級的危機即興破局力、極致的環境適應彈性，在未知與混沌中具備天生的狩獵直覺。`,
        blindspot: `⚠️ 嚴重的拖延傾向與承諾過載：容易虎頭蛇尾，開啟大量新專案卻極難堅持完成最後 10% 的收尾！`,
        growthAdvice: `尋找高 J 型夥伴進行「死線綁定」，或使用「微習慣法則」：每天只強制完成 5 分鐘收尾工作。`
      }),
      strong: (p) => ({
        levelTitle: `靈活應變 ${p}% · 敏捷探索先鋒`,
        summary: `靈活指數 ${p}% 讓你在多變的環境中游刃有餘。你討厭設限，享受探索多種可能性的過程。`,
        superpower: `出色的多工處理能力與創新嗅覺，能隨時捕捉突發機遇並迅速調轉船頭。`,
        blindspot: `容易因被更新鮮的事物吸引而頻繁轉移注意力，導致核心戰略無法深度累積。`,
        growthAdvice: `設定「專案上限數量（不超過 3 個）」，未完成舊專案前禁止開啟任何新企劃。`
      }),
      moderate: (p) => ({
        levelTitle: `靈活應變 ${p}% · 開放隨性實踐者`,
        summary: `靈活指數 ${p}% 保持著輕鬆從容的心態，做事講求水到渠成，不給自己施加過度枷鎖。`,
        superpower: `抗壓心態極佳，不易被突發變化打亂陣腳，具備出色的情緒韌性。`,
        blindspot: `在需要長期持續枯燥投入的單調階段，動力容易逐漸消退。`,
        growthAdvice: `把枯燥的長線任務「遊戲化」，為每個里程碑設置即時趣味獎勵。`
      }),
      balanced: (p) => ({
        levelTitle: `靈活/條理平衡態（P ${p}%）· 敏捷自適應操盤手 (Adaptive Flow)`,
        summary: `靈活得分 ${p}% 展現出極致的自適應智慧。你懂得何時該立規矩，何時該打破常規。`,
        superpower: `既不死板僵化，也不散漫拖延，是現代靈活敏捷團隊的最佳協同核心。`,
        blindspot: `在極端條理化的人眼中可能顯得不夠死板，在極端隨性的人眼中又顯得過於認真。`,
        growthAdvice: `堅持用成果說話，你的平衡能力正是你最高效的商業競爭力。`
      })
    }
  },

  AR: {
    A: {
      extreme: (p) => ({
        levelTitle: `篤定抗壓 ${p}% · 鋼鐵意志不滅磐石`,
        summary: `你的篤定抗壓指數達到驚人的 ${p}%！在暴風雨中，所有人都在慌亂，而你依然能保持極致的鎮定與自信。你極少陷入自我懷疑或深夜精神內耗。`,
        superpower: `神經大條般的超強抗擊打能力、無可撼動的自信心，是任何危機時刻所有人目光投向的終極支柱。`,
        blindspot: `⚠️ 過高的心理防禦可能讓你忽視身體發出的慢性疲勞訊號，或在他人表達脆弱時顯得缺乏足夠的同理心。`,
        growthAdvice: `堅強不等於刀槍不入。學會定期卸下重甲，向至親至愛之人流露真實的疲憊與柔軟。`
      }),
      strong: (p) => ({
        levelTitle: `篤定抗壓 ${p}% · 自信沉著掌舵人`,
        summary: `篤定指數 ${p}% 賦予你出色的心理韌性。你相信自己的判斷，面對外界的質疑或挫折能迅速拍拍灰塵重新出發。`,
        superpower: `極高的挫折復原力 (Resilience)，不易被負面評價綁架，始終保持積極向前的動力。`,
        blindspot: `有時可能低估了潛在問題的複雜度或他人對失敗的焦慮感受。`,
        growthAdvice: `在決策前主動邀請團隊中最謹慎的人提出 3 個最壞情境假設，補全盲點。`
      }),
      moderate: (p) => ({
        levelTitle: `篤定抗壓 ${p}% · 穩健樂觀前行者`,
        summary: `篤定指數 ${p}% 具備健康的自我認同，既有前行的勇氣，也保留著必要的謹慎敬畏。`,
        superpower: `情緒基調穩定明朗，能給身邊的團隊和伴侶帶來持續的安全感。`,
        blindspot: `在長期連續遭遇極限挫敗時，仍需要適當的時間進行心理能量重置。`,
        growthAdvice: `建立專屬的「成就檔案清單」，在低潮時翻閱以迅速喚醒內在原動力。`
      }),
      balanced: (p) => ({
        levelTitle: `篤定/審慎平衡態（A ${p}%）· 攻守兼備動態定力 (Balanced Equilibrium)`,
        summary: `你的篤定得分為 ${p}%，在「大膽自信」與「謹慎審慎」之間達成絕妙平衡。你既不盲目狂妄，也不焦慮自卑。`,
        superpower: `極其健康的心理防禦架構，在自信推進的同時始終保持著對風險的敏銳嗅覺。`,
        blindspot: `在需要賭上一切的極限冒險時刻，可能因考慮周全而顯得略微保守。`,
        growthAdvice: `在大方向確定的關鍵戰役中，敢於將 20% 的籌碼押注在爆發性機會上。`
      })
    },
    R: {
      extreme: (p) => ({
        levelTitle: `審慎敏銳 ${p}% · 極限危機預警雷達`,
        summary: `你的審慎維度高達 ${p}%！你的大腦天生配備了全天候運轉的「危機預警雷達」與「完美主義掃描器」。你能提前半年看見暗礁，對潛在紕漏極度敏感。`,
        superpower: `極致的風險規避力、追求完美的卓越匠心，在你經手的事情上絕不可能出現低級漏洞。`,
        blindspot: `⚠️ 嚴重的精神內耗與反芻焦慮：大腦常年處於高警覺戰備狀態，極易引發失眠、慢性疲勞與冒名頂替症候群！`,
        growthAdvice: `每天睡前進行「認知著陸練習」：寫下 3 件「今天已經做得很棒的事」，告訴大腦：「今天已經足夠安全，可以關機了」。`
      }),
      strong: (p) => ({
        levelTitle: `審慎敏銳 ${p}% · 完美主義精算家`,
        summary: `審慎指數 ${p}% 讓你對品質有著極高的自我要求。你總是督促自己不斷進步，不達完美誓不罷休。`,
        superpower: `驚人的自我迭代動力與精益求精的產出質量，永遠能交出超越同儕水準的卓越答卷。`,
        blindspot: `容易因 1% 的小瑕疵而全盤否定 99% 的巨大成就，給自己施加過重的情緒枷鎖。`,
        growthAdvice: `樹立「80分即發布，透過反饋再迭代」的敏捷思維，將自己從完美主義牢籠中解放出來。`
      }),
      moderate: (p) => ({
        levelTitle: `審慎敏銳 ${p}% · 敏銳細緻反思者`,
        summary: `審慎指數 ${p}% 具備良好的自省能力，善於從挫折中提煉經驗教訓，持續優化個人效能。`,
        superpower: `謙遜好學、善於自省，具備極高的成長潛能與長期複利價值。`,
        blindspot: `面對突如其來的公開批評時，內心泛起的漣漪需要一定時間平復。`,
        growthAdvice: `將「對事物的反饋」與「對自我的價值」嚴格解綁，不把外界評價等同於自我本質。`
      }),
      balanced: (p) => ({
        levelTitle: `審慎/篤定平衡態（R ${p}%）· 攻守兼備動態定力 (Balanced Equilibrium)`,
        summary: `審慎得分 ${p}% 展現出極佳的攻守平衡。你既懂得居安思危，又具備敢作敢當的魄力。`,
        superpower: `在風險可控的前提下大膽開拓，心理結構極具抗脆弱性 (Antifragile)。`,
        blindspot: `在極少數極端高壓情況下，需防止謹慎思維滑向無意義的過度分析。`,
        growthAdvice: `堅持用行動打破焦慮，永遠讓行動跑在擔憂的前面。`
      })
    }
  },

  DC: {
    D: {
      extreme: (p) => ({
        levelTitle: `開拓掌控 ${p}% · 極限霸氣破局統帥`,
        summary: `你的開拓維度高達 ${p}%！你是純粹的「獵人與拓荒者」。你只以最終結果論英雄，具備摧枯拉朽的推進力與無可動搖的掌控欲。`,
        superpower: `極強的戰略決斷力、撕裂僵局的破局魄力，在需要強勢領袖的大變革時代能開闢全新帝國。`,
        blindspot: `⚠️ 過強的主導欲容易讓團隊成員噤若寒蟬，不知不覺演變為一言堂，扼殺身邊人的自主創造力。`,
        growthAdvice: `在每次決策會議上，強制規定自己最後一個發言，先聽取每位成員的完整意見再做拍板。`
      }),
      strong: (p) => ({
        levelTitle: `開拓掌控 ${p}% · 成果導向領先者`,
        summary: `開拓指數 ${p}% 讓你在任何環境中都能迅速釐清主次目標，雷厲風行地推動團隊拿取實質戰果。`,
        superpower: `強大的目標聚焦與資源整合能力，不達目的絕不輕易言棄。`,
        blindspot: `當團隊成員跟不上你的快節奏時，容易產生不耐煩與批判情緒。`,
        growthAdvice: `把「賦能培養他人」也列入你的核心 KPI，學會享受看著他人成長的成就感。`
      }),
      moderate: (p) => ({
        levelTitle: `開拓掌控 ${p}% · 穩健進取實踐家`,
        summary: `開拓指數 ${p}% 具備良好的進取心，同時尊重組織現有規則與夥伴節奏。`,
        superpower: `具備良好的說服力與推進力，能以理服人，穩步擴大個人影響力。`,
        blindspot: `在面對極具侵略性的競爭對手時，有時需要更加亮劍果斷。`,
        growthAdvice: `關鍵利益時刻該爭取就勇敢爭取，不主動惹事，但也絕不怕事。`
      }),
      balanced: (p) => ({
        levelTitle: `開拓/協同平衡態（D ${p}%）· 兼聽則明的賢明領袖 (Wise Integrator)`,
        summary: `開拓得分 ${p}% 處於絕妙的中庸之道。你既有統帥的決斷魄力，又有導師的協同胸襟。`,
        superpower: `現代扁平化組織最渴望的領導者模型：能拍板定案，又能深度賦能團隊。`,
        blindspot: `在需要極端強權強推的極少數危機中，可能因顧及各方利益而略微延誤戰機。`,
        growthAdvice: `因地制宜，在常規時期保持協同，在緊急危機時刻果斷啟動專制推進模式。`
      })
    },
    C: {
      extreme: (p) => ({
        levelTitle: `協同共榮 ${p}% · 極致無私賦能導師`,
        summary: `你的協同維度高達 ${p}%！在你的理念中，「大家好才是真的好」。你天生具備極強的利他精神，樂於成全他人、甘居幕後。`,
        superpower: `驚人的團隊凝聚力、如春風化雨般的人格魅力，能將一群性格迥異的人凝聚成堅不可摧的共同體。`,
        blindspot: `⚠️ 過度遷就他人容易讓自己淪為「老好人」，可能為了維持表面的團結而一再退讓自己的核心原則底線！`,
        growthAdvice: `記住「善良必須帶點鋒芒」！明確寫下你的 3 條不可逾越的底線，一旦被觸碰必須立即亮牌反擊。`
      }),
      strong: (p) => ({
        levelTitle: `協同共榮 ${p}% · 團隊和諧賦能者`,
        summary: `協同指數 ${p}% 讓你始終將集體利益放在心上。你是團隊裡最不可或缺的潤滑劑與信任黏著劑。`,
        superpower: `出色的跨部門協調能力、極具同理心的支持型領導力，深受同儕與下屬愛戴。`,
        blindspot: `在面對需要裁決利益衝突的嚴酷競爭時，內心會產生強烈的道德負擔。`,
        growthAdvice: `學會將商業決策與個人人品解綁，制度化、程序化地處理衝突，減少情緒內耗。`
      }),
      moderate: (p) => ({
        levelTitle: `協同共榮 ${p}% · 合作共贏踐行者`,
        summary: `協同指數 ${p}% 秉持互惠互利的合作理念，既善於配合他人，也能維護自身合理利益。`,
        superpower: `健康可靠的人際合作夥伴，具備極佳的長期合作信譽與口碑。`,
        blindspot: `面對極端自私且缺乏契約精神的對手時，容易因初期信任而吃暗虧。`,
        growthAdvice: `合作初期秉持「信任但嚴格審查」原則，用合約與制度為真誠保駕護航。`
      }),
      balanced: (p) => ({
        levelTitle: `協同/開拓平衡態（C ${p}%）· 兼聽則明的賢明領袖 (Wise Integrator)`,
        summary: `協同得分 ${p}% 展現出開拓與包容的和諧統一。你懂得如何成就團隊，更懂得如何帶領團隊打勝仗。`,
        superpower: `剛柔並濟，既能凝聚人心，又能攻城掠地，具備非凡的大將之風。`,
        blindspot: `在極端單一導向的環境中，需要靈活平衡自己的能量分配。`,
        growthAdvice: `堅持你的立身之道，這種兼收並蓄的胸懷將帶你走得更遠。`
      })
    }
  }
};

/**
 * 主生成函數：根據 6 大維度的百分比與人格檔案，動態產生全套客製化診斷報告
 */
export function generateDynamicPersonalizedAnalysis(dimensions, profile) {
  if (!dimensions) return null;

  const { EI, SN, TF, JP, AR, DC } = dimensions;

  // 1. 各維度等級與專屬診斷計算
  const dimKeys = ['EI', 'SN', 'TF', 'JP', 'AR', 'DC'];
  const dimDiagnoses = {};
  const tiers = {};

  dimKeys.forEach(k => {
    const dim = dimensions[k];
    if (!dim) return;
    const domCode = dim.dominantCode || (k === 'EI' ? 'E' : k === 'SN' ? 'N' : k === 'TF' ? 'T' : k === 'JP' ? 'J' : k === 'AR' ? 'A' : 'D');
    const domPct = Math.round(dim.dominantPct || 50);
    const tier = getIntensityLevel(domPct);

    tiers[k] = {
      code: k,
      dim,
      tier,
      percent: domPct,
      label: dim.dominantLabel || `${domCode} ${domPct}%`,
      domCode
    };

    const profileGetter = DIMENSION_PROFILES[k]?.[domCode]?.[tier] || DIMENSION_PROFILES[k]?.[domCode]?.moderate;
    if (profileGetter) {
      dimDiagnoses[k] = {
        domCode,
        domPct,
        tier,
        ...profileGetter(domPct)
      };
    }
  });

  // 2. 排序維度：找出最極端 (Highest Peak) 與最平衡 (Most Balanced)
  const sortedByPercent = Object.values(tiers).sort((a, b) => b.percent - a.percent);
  const highestDim = sortedByPercent[0] || { code: 'TF', percent: 75, domCode: 'T', label: '理智' };
  const lowestDim = sortedByPercent[sortedByPercent.length - 1] || { code: 'JP', percent: 52, domCode: 'J', label: '條理' };

  // 3. 極端與平衡維度即時警報文案
  const extremeDiag = dimDiagnoses[highestDim.code] || {};
  const balancedDiag = dimDiagnoses[lowestDim.code] || {};

  const extremeInsights = `【極值主導維度：${extremeDiag.levelTitle || highestDim.label}】${extremeDiag.summary || ''} ⚠️ 極端盲區提醒：${extremeDiag.blindspot || ''}`;
  const balancedInsights = `【游移調和維度：${balancedDiag.levelTitle || lowestDim.label}】${balancedDiag.summary || ''} 💡 專屬優勢：${balancedDiag.superpower || ''}`;

  // 4. 多維度交叉共振化學反應 (Cross Synthesis)
  const crossSynthesis = (() => {
    const isHighT = tiers.TF?.domCode === 'T' && tiers.TF?.percent >= 70;
    const isHighF = tiers.TF?.domCode === 'F' && tiers.TF?.percent >= 70;
    const isHighA = tiers.AR?.domCode === 'A' && tiers.AR?.percent >= 70;
    const isHighR = tiers.AR?.domCode === 'R' && tiers.AR?.percent >= 70;
    const isHighD = tiers.DC?.domCode === 'D' && tiers.DC?.percent >= 70;
    const isHighN = tiers.SN?.domCode === 'N' && tiers.SN?.percent >= 70;
    const isHighJ = tiers.JP?.domCode === 'J' && tiers.JP?.percent >= 70;
    const isHighP = tiers.JP?.domCode === 'P' && tiers.JP?.percent >= 70;

    if (isHighT && isHighD) {
      return {
        title: '【重裝鋼鐵戰車模式】極致理性 × 強勢破局',
        desc: `你的數據呈現出罕見的「高理智 (${tiers.TF.percent}%) + 高開拓 (${tiers.DC.percent}%)」雙極值共振。在商業與戰略博弈中，你具備如同重裝戰車般的推進力，凡事以最終結果與投入產出比為依歸。身邊人會驚嘆於你的執行魄力，但也容易在你的強勢氣場下感到威壓。`,
        tag: '🔥 鋼鐵推進者'
      };
    }
    if (isHighT && isHighR) {
      return {
        title: '【極限完美算師模式】冷靜邏輯 × 高敏預警',
        desc: `你的「高理智 (${tiers.TF.percent}%) + 高審慎 (${tiers.AR.percent}%)」組合，讓你成為天生的「零缺陷戰略精算師」。你對任何方案的邏輯漏洞與潛在暗礁有著幾乎病態的敏銳度，交付品質極高，但需警惕深夜的過度反芻與自我苛責。`,
        tag: '⚡ 零容錯精算師'
      };
    }
    if (isHighF && isHighA) {
      return {
        title: '【心靈燈塔模式】深層共情 × 剛柔並濟',
        desc: `你的「高情感 (${tiers.TF.percent}%) + 高篤定 (${tiers.AR.percent}%)」組合極為珍貴！你具備強大的同理心能感知人性的痛苦，同時擁有鋼鐵般的心理防禦不會輕易被負能量拖垮，是天生令人安心的心靈引路人。`,
        tag: '💖 剛柔並濟燈塔'
      };
    }
    if (isHighF && isHighR) {
      return {
        title: '【高敏共振海綿模式】極致共情 × 靈魂雷達',
        desc: `你的「高情感 (${tiers.TF.percent}%) + 高敏銳 (${tiers.AR.percent}%)」組合，賦予你直擊靈魂深處的藝術感知力與人際雷達。你對微小的語氣變化極度敏感，需建立嚴格的心靈邊界，避免成為周遭情緒垃圾的接收器。`,
        tag: '🌊 深度共鳴靈魂'
      };
    }
    if (isHighN && isHighP) {
      return {
        title: '【破壞式創新浪人模式】前瞻狂想 × 敏捷應變',
        desc: `你的「高直覺 (${tiers.SN.percent}%) + 高靈活 (${tiers.JP.percent}%)」讓你在變革與混沌時代如魚得水。你總能跳出框架看見非傳統的降維打擊路徑，但必須為自己尋找可靠的落地收尾夥伴。`,
        tag: '🚀 破壞式拓荒者'
      };
    }
    if (isHighN && isHighJ) {
      return {
        title: '【遠見戰略建築師模式】宏觀直覺 × 閉環秩序',
        desc: `你的「高直覺 (${tiers.SN.percent}%) + 高條理 (${tiers.JP.percent}%)」讓你具備「將未來藍圖一磚一瓦建造出來」的帝國締造力。你永遠在為 3 年後的棋局佈局，每一步都有條不紊。`,
        tag: '🏛️ 戰略建築師'
      };
    }
    return {
      title: '【動態多維平衡模式】靈活自適應心智',
      desc: `你的各項維度得分分佈非常均勻，沒有極端的偏執偏向。這賦予你極高的心理彈性與「變色龍般的環境適應力」，在任何團隊與情境中都能迅速找到最佳生存與破局點。`,
      tag: '⚖️ 全能調和者'
    };
  })();

  // 5. 根據 % 數動態生成的愛情依附風格與客製化愛情診斷
  const dynamicLoveDiagnosis = (() => {
    const isHighR = tiers.AR?.domCode === 'R' && tiers.AR?.percent >= 68;
    const isHighA = tiers.AR?.domCode === 'A' && tiers.AR?.percent >= 68;
    const isHighT = tiers.TF?.domCode === 'T' && tiers.TF?.percent >= 68;
    const isHighF = tiers.TF?.domCode === 'F' && tiers.TF?.percent >= 68;

    let attachmentStyle = '安全探索型 (Secure-Exploratory Attachment)';
    let attachmentDesc = '你在親密關係中具備健康的情感表達與邊界感，既能給予伴侶充分的自由，又能及時提供溫暖的回應。';

    if (isHighR && isHighF) {
      attachmentStyle = '高敏焦慮渴望型 (Anxious-Preoccupied Attachment)';
      attachmentDesc = `由於你的審慎度 (${tiers.AR.percent}%) 與情感度 (${tiers.TF.percent}%) 雙高，在戀愛中你極其注重對方的即時反饋。伴侶一次漏接電話或冷淡的回覆，都可能引發你內心長達數小時的「過度解讀風暴」。你需要明確、反覆的言語確認。`;
    } else if (isHighA && isHighT) {
      attachmentStyle = '自主迴避獨立型 (Dismissive-Avoidant Attachment)';
      attachmentDesc = `由於你的抗壓度 (${tiers.AR.percent}%) 與理性度 (${tiers.TF.percent}%) 均處於強勢態，在面對伴侶的情感崩潰或過度依賴時，你的本能反應是「退回洞穴、理性分析」。你討厭窒息的黏膩感，需要大量的個人精神真空期。`;
    } else if (isHighR && isHighT) {
      attachmentStyle = '謹慎恐懼防禦型 (Fearful-Analytical Attachment)';
      attachmentDesc = `你的高理性 (${tiers.TF.percent}%) 與高敏銳 (${tiers.AR.percent}%) 讓你在動心初期極度克制。你習慣像審查併購合約一樣反覆考察對方的真誠度，直到確認 100% 安全才敢慢慢敞開心扉。`;
    }

    return {
      attachmentStyle,
      attachmentDesc,
      customCrushSignal: isHighT
        ? `平時惜字如金的你（理性 ${tiers.TF.percent}%），會主動為對方花費數小時梳理其人生規劃、甚至親手幫對方修電腦或整理繁瑣資料。`
        : `平時自帶保護色（共感 ${tiers.TF.percent}%），會在對方面前毫無防備地展現自己最幼稚、最脆弱的一面，分享童年的秘密。`,
      customSafetyTrigger: isHighR
        ? `在發生分歧時，伴侶能立即放下防禦，看著你的眼睛平靜說：「我們在解決問題，我不會離開你」，這會讓你瞬間卸下所有武裝。`
        : `伴侶給予你完全信任的獨立決策空間，並在關鍵時刻默默站在你身後給予無條件的背書與支援。`
    };
  })();

  // 6. 根據 % 數動態生成的 21 天個人躍遷指南
  const dynamicAscentPlan = {
    phase1: {
      days: 'Day 01 - Day 07',
      title: `階段一：${highestDim.label} 極值能量平衡與身心重置`,
      task: `針對你的極值維度（${highestDim.label} 達 ${highestDim.percent}%），每天進行 20 分鐘的「逆向能量代償」練習，強行中斷慣性大腦迴路，重啟心智彈性。`
    },
    phase2: {
      days: 'Day 08 - Day 14',
      title: `階段二：${tiers.TF.domCode === 'T' ? '理性與情感' : '同理與邊界'} 深度人際校準`,
      task: `針對你的 TF 維度（${tiers.TF.label}），在關鍵對話中實踐「情理分離與主動同理」，升級親密關係與職場跨部門溝通質量。`
    },
    phase3: {
      days: 'Day 15 - Day 21',
      title: `階段三：${lowestDim.label} 弱勢維度突破與巔峰商業輸出`,
      task: `啟動你的平衡調和維度（${lowestDim.label} 處於 ${lowestDim.percent}%），將全套 64 型心智動力學轉化為具體的商業破局與人生藍圖落地執行。`
    }
  };

  return {
    highestDim,
    lowestDim,
    extremeInsights,
    balancedInsights,
    dimDiagnoses,
    tiers,
    crossSynthesis,
    dynamicLoveDiagnosis,
    dynamicAscentPlan
  };
}
