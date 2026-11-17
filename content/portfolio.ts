import type { Locale, Localized } from '@/lib/i18n'

export type PortfolioCategory =
  | 'picture-book'
  | 'funny-fiction'
  | 'young-adult-fiction'
  | 'stage-performance'

export type PortfolioArt = { src: string; width: number; height: number }

export type PortfolioEntry = {
  slug: string
  category: PortfolioCategory
  year: string
  art: PortfolioArt
  reader: Localized<string>
  credit: Localized<string>
  tagline: Localized<string>
  excerpt: Localized<string>
}

export const featuredSlug = '暗號偵探社'

export const portfolioWorks: PortfolioEntry[] = [
  {
    slug: "胡阿布偵探事件簿-誰綁架了黑總統",
    category: 'young-adult-fiction',
    year: '2026',
    art: { src: "/images/book-cover-胡阿布偵探事件簿.webp", width: 1000, height: 1389 },
    reader: { zh: "小說 · 小學中年級以上", en: "Novel · Ages 10+" },
    credit: { zh: "插畫：Salt&Finger", en: "Illustrations by Salt&Finger" },
    tagline: {
      zh: "紅狐狸胡阿布的第一樁大案：掌管陸地的黑猩猩總統不見了。",
      en: "The red fox Hu Abu's first big case: the chimpanzee president who governs the land has vanished.",
    },
    excerpt: {
      zh: "《丁小飛校園日記》、《機器人宅急便》人氣作家郭瀞婷 首部短篇連作小說 歡樂爆笑登場！ 友愛環境、相互扶持、動人親情 真相原來不是最終的答案，每個案件都有更揪心的抉擇！ 三次謎案任務 次次都有驚喜結局！",
      en: "After humans abandon Earth, red fox Hu Abu inherits an eight-generation line of detectives and finally lands the case that could make his name: the chimpanzee president who governs the land has vanished. He sets out with a willow ptarmigan and an amphibious salamander investigator, flying on a vulture-piloted presidential plane into affairs that span land, sea, and sky. Three linked stories, each hiding a harder choice than the mystery itself.",
    },
  },
  {
    slug: "丁小飛校園日記5-我要成為YouTuber",
    category: 'funny-fiction',
    year: '2023',
    art: { src: "/images/book-cover-丁小飛校園日記5-我要成為YouTuber.webp", width: 1000, height: 1401 },
    reader: { zh: "校園日記 · 小學中年級以上", en: "School diary · Ages 8+" },
    credit: { zh: "插畫：水腦", en: "Illustrations by Shui Nao" },
    tagline: {
      zh: "丁小飛架起鏡頭開頻道，才發現做節目比吃飯睡覺還難。",
      en: "Ding Xiaofei sets up a camera and starts a channel, only to find a show is harder than eating or sleeping.",
    },
    excerpt: {
      zh: "★★等待多年，《丁小飛校園日記》最新續集終於登場★★ 且看小小囧男丁小飛如何華麗變身為超人氣Youtuber！ \\小學生好口碑不斷，最想說服爸媽買的書！// 無厘頭功力媲美櫻桃小丸子，搞笑程度更勝《葛瑞的囧日記》， 最爆笑最勵志最有共鳴的校園生存守則！",
      en: "When classmates start their own livestream channels, Ding Xiaofei sets up a camera too, only to find that running a show is far harder than eating or sleeping. He has to pick a channel theme, find a producer, design every episode, and deal with his older brother A-Da, who has abruptly become an \"idiom prophecy master.\" The fifth book turns a livestream beginner's fumbling into a school survival guide.",
    },
  },
  {
    slug: "機器人宅急便2-能寄勇氣嗎",
    category: 'young-adult-fiction',
    year: '2023',
    art: { src: "/images/book-cover-機器人宅急便2.webp", width: 1000, height: 1373 },
    reader: { zh: "橋梁書 · 小學低中年級", en: "Early chapter book · Ages 6–10" },
    credit: { zh: "插畫：摸摸傑夫", en: "Illustrations by Momo Jeff" },
    tagline: {
      zh: "看不見也摸不到的「勇氣」，該怎麼寄給九十六歲的奶奶？",
      en: "How do you deliver \"courage\" — invisible and intangible — to a ninety-six-year-old grandmother?",
    },
    excerpt: {
      zh: "最爆笑的《丁小飛校園日記》系列暢銷作家 郭瀞婷 幽默暖心讀本 機器人宅急便系列第二彈！ 「什麼都可以寄」宅急便面臨關店危機！ 有心人士惡意陷害，讓宅急便生意岌岌可危， 一個女孩的神祕委託，可以挽救宅急便嗎？",
      en: "After their \"we deliver anything\" courier shop becomes locally famous, Bala and Billy are ordered by a robot inspector to fix a compliance problem within three days, or the shop closes and both are shipped back to the factory. Just then a girl walks in wanting to send \"courage\" to her ninety-six-year-old grandmother. Working out how to deliver something invisible becomes their only way to keep the shop open.",
    },
  },
  {
    slug: "機器人宅急便1-什麼都可以寄",
    category: 'young-adult-fiction',
    year: '2022',
    art: { src: "/images/book-cover-機器人宅急便1.webp", width: 1000, height: 1372 },
    reader: { zh: "橋梁書 · 小學低中年級", en: "Early chapter book · Ages 6–10" },
    credit: { zh: "插畫：摸摸傑夫", en: "Illustrations by Momo Jeff" },
    tagline: {
      zh: "二〇九九年，一間「什麼都可以寄」的機器人宅急便開張了。",
      en: "In 2099, a robot courier shop that delivers anything opens for business.",
    },
    excerpt: {
      zh: "最爆笑的《丁小飛校園日記》系列暢銷作家 郭瀞婷全新幽默暖心讀本 你有東西要寄嗎？ 不管是有形的物品，還是無形的期待， 「什麼都可以寄」機器人宅急便全都使命必達， 化不可能為可能，傳遞所有的心意！ ──書末附機器人宅急便手作桌上立牌──",
      en: "In 2099 humans leave everything to robots. Courier Bala is thrown out by her boss for being too thorough and too slow, so she and the robot Billy open their own \"we deliver anything\" shop. Their first customer wants an enormous block of ice delivered to a polar bear, and the pair must beat melting, a blizzard, and some meddling seabirds to finish the job.",
    },
  },
  {
    slug: '小兒子報告-沙發有黑洞',
    category: 'stage-performance',
    year: '2020',
    art: { src: '/images/portfolio/work-sofa-poster.webp', width: 763, height: 1080 },
    reader: {
      zh: '舞台劇本 · 小學以上，親子劇場',
      en: 'Stage play · Ages 6+, family theatre',
    },
    credit: {
      zh: '取材自駱以軍《小兒子》',
      en: "Adapted from Luo Yijun's Little Son",
    },
    tagline: {
      zh: '爸爸和弟弟搭上沙發號太空船，去黑洞裡把哥哥找回來。',
      en: 'Dad and little brother board the Sofa Spaceship to bring big brother back from the black hole.',
    },
    excerpt: {
      zh: '有一天，哥哥阿白為了逃避不想校慶上台致詞，於是在家躲藏起來，而不小心誤入沙發底下的黑洞。為了找回哥哥阿白，弟弟阿甯咕決定和爸爸以及狗狗端端搭乘沙發號太空船進入黑洞異世界中一探究竟……',
      en: 'One day, to avoid having to give a speech on stage at the school anniversary, older brother A-Bai hides at home and accidentally stumbles into a black hole underneath the sofa. To find his brother A-Bai, younger brother A-Ninggu decides to board the Sofa Spaceship with Dad and the dog Duanduan and venture into the alien world of the black hole to see what is there…',
    },
  },
  {
    slug: '57號小豹',
    category: 'picture-book',
    year: '2020',
    art: { src: '/images/portfolio/work-57-leopard.webp', width: 900, height: 600 },
    reader: {
      zh: '繪本 · 親子共讀，4 歲以上',
      en: 'Picture book · Read together, ages 4+',
    },
    credit: { zh: '', en: '' },
    tagline: {
      zh: '如果那個「不一樣」是你喜歡、別人不喜歡的，你會怎麼做？',
      en: "What if the thing that makes you different is something you love — and others don't?",
    },
    excerpt: {
      zh: '57號小豹，是動物園豹群中的一隻豹，牠不希望看起來太獨特，因為身邊的豹群們恐嚇牠：「人類喜歡獵豹看起來很勇猛，如果你看起來不像人類想的那樣，就會被做成衣服或圍巾……」',
      en: 'Everyone has times when they are different from everybody else — very different. Dressing differently; eating differently; speaking differently; thinking differently. But if that "different" is something you like and others don\'t, what will you do?',
    },
  },
  {
    slug: '動物星球偵探事件簿2-推理要在放學後',
    category: 'young-adult-fiction',
    year: '2020',
    art: { src: '/images/portfolio/work-animal-2.webp', width: 626, height: 881 },
    reader: {
      zh: '短篇推理 · 高年級以上',
      en: 'Short mysteries · Ages 10+',
    },
    credit: { zh: '七位作者合著', en: 'By seven authors' },
    tagline: { zh: '放學後，開始推理。', en: 'After school, the deduction begins.' },
    excerpt: {
      zh: '鑰匙又不見了？有請「野貓情報網」來進行大規模搜索。從商朝封印至今的巫術即將全面釋放，唯有到故宮博物院尋找千年古玉來解救……',
      en: "After school, the deduction begins! A detective story collection full of the unbelievable and the surprising. Seven popular authors show off their skills, setting up puzzle after puzzle — waiting for you to solve them!",
    },
  },
  {
    slug: '記憶邊境-河川-火林-烏雲光',
    category: 'young-adult-fiction',
    year: '2019',
    art: { src: '/images/portfolio/work-memory-border.webp', width: 635, height: 900 },
    reader: { zh: '長篇小說 · 青少年', en: 'Novel · Young adult' },
    credit: { zh: '', en: '' },
    tagline: {
      zh: '如果人生可以重來，你想改變哪一段記憶？',
      en: 'If life could start over, which memory would you change?',
    },
    excerpt: {
      zh: '26歲的宋宥安是演藝界的明日之星，原本擁有大好前途的他，卻因為一場車禍陷入昏迷。當他再度睜開眼睛，發現自己身處一個奇特的異境，紫灰色的天空一望無際。',
      en: "If life could start over, which memory would you change? Tina Kuo, the year's most anticipated author, takes on life and death in her latest work that shakes the soul!",
    },
  },
  {
    slug: '動物星球偵探事件簿',
    category: 'young-adult-fiction',
    year: '2019',
    art: { src: '/images/portfolio/work-animal-1.webp', width: 445, height: 641 },
    reader: { zh: '短篇推理 · 高年級以上', en: 'Short mysteries · Ages 10+' },
    credit: {
      zh: '與王宇清、翁裕庭、陳郁如、鄭宗弦、寵物先生合著',
      en: 'With Wang Yuqing, Weng Yuting, Chen Yuju, Zheng Zongxian and Mr. Pet',
    },
    tagline: {
      zh: '六位說故事高手，一場動物大集合的推理。',
      en: 'Six master storytellers, one animal-packed mystery.',
    },
    excerpt: {
      zh: '原創故事 X 華麗陣容，六位作家聯手出擊：《妖怪新聞社》王宇清、《尋找被詛咒的彩畫》翁裕庭、《仙靈傳奇》陳郁如、《暗號偵探社》郭瀞婷、《少年廚俠》鄭宗弦、《虛擬街頭漂流記》寵物先生。',
      en: "Six master storytellers: Wang Yuqing, Weng Yuting, Chen Yuju, Tina Kuo, Zheng Zongxian, and Mr. Pet. The liveliest gathering of animals × a detective story collection you can't stop turning pages for!",
    },
  },
  {
    slug: '暗號偵探社',
    category: 'young-adult-fiction',
    year: '2018',
    art: { src: '/images/portfolio/work-secret-code.webp', width: 900, height: 729 },
    reader: { zh: '長篇小說 · 國中以上', en: 'Novel · Ages 12+' },
    credit: { zh: '', en: '' },
    tagline: {
      zh: '一張離婚協議書，三個孩子，一整個夏天的暗號。',
      en: 'One divorce agreement, three kids, and a whole summer of secret codes.',
    },
    excerpt: {
      zh: '整本小說講的是愛的暗號。在人生的旅途上，每個人都有需要被療癒的事情，那些大大小小的擦傷、瘀青和內心縫不起來的傷疤，都需要愛的暗號來治療。',
      en: 'This is a novel that heals adults and children alike, and its story circles around a junior-high boy named Lanya. Ever since he sees the divorce agreement on his father\'s desk, his world collapses in an instant; fortunately his good friends Chicken Drumstick Hero and Qiqi step forward and accompany him on a journey to try to save his parents\' marriage.',
    },
  },
  {
    slug: '丁小飛校園日記4-聰明眼鏡',
    category: 'funny-fiction',
    year: '2017',
    art: { src: '/images/portfolio/work-ding-4.webp', width: 284, height: 406 },
    reader: { zh: '校園日記 · 小學中年級以上', en: 'School diary · Ages 8+' },
    credit: { zh: '', en: '' },
    tagline: {
      zh: '一句「我也有」，滾成了愈來愈大的謊。',
      en: 'One “me too” rolls into a lie that keeps growing.',
    },
    excerpt: {
      zh: '聽到班上同學炫耀自己有一副全球限量眼鏡，丁小飛脫口而出：「我也有！」為了掩蓋自己說謊的事實，丁小飛開始瞎掰眼鏡的「不在場證明」。',
      en: 'Because of a pair of globally limited-edition "clever glasses," Ding Xiaofei is nicknamed "Ding the Puppet" by his classmates. Everyone starts looking at Xiaofei differently — how can he escape the shadow of being a liar? The most agonizing tug-of-war in his mind — face it bravely together with Ding Xiaofei!',
    },
  },
  {
    slug: '丁小飛校園日記3-副班長爭奪戰',
    category: 'funny-fiction',
    year: '2014',
    art: { src: '/images/portfolio/work-ding-3.webp', width: 289, height: 417 },
    reader: { zh: '校園日記 · 小學中年級以上', en: 'School diary · Ages 8+' },
    credit: { zh: '', en: '' },
    tagline: {
      zh: '副班長頭銜與好朋友，哪一個比較重要？',
      en: 'Vice class president, or a good friend — which matters more?',
    },
    excerpt: {
      zh: '據說有名的人小時候都當過「幹部」，丁小飛決心爭取副班長的職位。誰知半路殺出程咬金——好朋友何李羅不僅被提名，最後還高票當選！妒意如霧氣籠罩丁小飛。',
      en: 'To defend his standing, Ding Xiaofei goes to war! The title of vice class president vs. a good friend — which one matters more? The most moving tug-of-war over friendship — protect what is most precious together with Ding Xiaofei!',
    },
  },
  {
    slug: '丁小飛校園日記1-時光膠囊的祕密',
    category: 'funny-fiction',
    year: '2013',
    art: { src: '/images/portfolio/work-ding-1.webp', width: 637, height: 900 },
    reader: { zh: '校園日記 · 小學中年級以上', en: 'School diary · Ages 8+' },
    credit: { zh: '', en: '' },
    tagline: {
      zh: '小四生丁小飛，最想成為「有名的人」。',
      en: 'Ding Xiaofei, fourth grader, wants more than anything to be famous.',
    },
    excerpt: {
      zh: '丁小飛，萌芽小學四年級，擁有異於常人的自信與夢想。最大的願望是成為「有名的人」。某一天，他優於常人的自信卻受到嚴重打擊：班長程友莘在他寫的讀書心得裡畫了一個笑臉做回應。',
      en: "The school holds a time capsule activity and asks everyone to write a diary entry to themselves fifty years from now. Ding Xiaofei's secret diary entry: the girl he has a crush on actually admires someone else most? Apart from being tall, rich, and handsome, how can he win her heart? The funniest guide to getting along with people — remake yourself together with Ding Xiaofei!",
    },
  },
  {
    slug: '丁小飛校園日記2-誰是最佳小隊長',
    category: 'funny-fiction',
    year: '2013',
    art: { src: '/images/portfolio/work-ding-2.webp', width: 290, height: 418 },
    reader: { zh: '校園日記 · 小學中年級以上', en: 'School diary · Ages 8+' },
    credit: { zh: '', en: '' },
    tagline: {
      zh: '夏令營裡高手如雲，他居然被派去演一匹馬。',
      en: 'At a camp full of high achievers, he gets cast as a horse.',
    },
    excerpt: {
      zh: '為了凸顯自己的不平凡，丁小飛報名參加「未來領袖夏令營」。原以為自己會是大家注目的主角，卻發現一山還有一山高！領袖訓練課程一波接一波，高手較勁一招過一招。',
      en: 'Who is the best team leader? Ding Xiaofei, number one in self-confidence, has his standing shaken once again!! The Future Leaders Summer Camp is full of hidden tigers and crouching dragons — experts lie in ambush everywhere! When faced with someone who steals the spotlight from you, are you willing to just bow down and concede?',
    },
  },
  {
    slug: "你願不願意做我最好的朋友",
    category: 'picture-book',
    year: '2009',
    art: { src: "/images/book-cover-你願不願意做我最好的朋友.webp", width: 200, height: 280 },
    reader: { zh: "繪本 · 親子共讀，學前至低年級", en: "Picture book · Read together, preschool–early grade" },
    credit: { zh: "文·圖：郭瀞婷", en: "Written and illustrated by Tina Kuo" },
    tagline: {
      zh: "小狗舒比出發，去尋找什麼才是「真正的」好朋友。",
      en: "A puppy named Shubi sets out to find what a \"real\" best friend is.",
    },
    excerpt: {
      zh: "當孩子慢慢成長，接觸群體生活之後，「朋友」將成為他們的另一個生活重心，此時父母也一定會擔心自己的孩子如何交朋友，以及是否交到了真正的好朋友。本書以樸素的繪圖風格、簡單的故事情節，藉由一隻小狗舒比尋找好朋友的過程，教導孩子何謂「真正的」好朋友。",
      en: "A puppy named Shubi sets out to find a best friend and meets a monkey, a blue elephant, and an orange-red crab along the way. The picture book uses a simple story to ask what a \"real\" best friend is, with Chinese-English parallel text, zhuyin, and a bilingual story CD.",
    },
  },
  {
    slug: "天使工廠",
    category: 'picture-book',
    year: '2009',
    art: { src: "/images/book-cover-天使工廠.webp", width: 424, height: 580 },
    reader: { zh: "繪本 · 親子共讀，學前至低年級", en: "Picture book · Read together, preschool–early grade" },
    credit: { zh: "文·圖：郭瀞婷", en: "Written and illustrated by Tina Kuo" },
    tagline: {
      zh: "烏龜諾門什麼都不快樂，直到天使工廠寄來一封信。",
      en: "A turtle named Nomen is unhappy with everything — until a letter from the Angel Factory arrives.",
    },
    excerpt: {
      zh: "在地球的另一端，有一個烏龜的世界。那裡的烏龜們都很快樂，不過......烏龜諾門除外！",
      en: "On the other side of the world is a world of turtles, where a turtle named Nomen is unhappy at work, on the walk, and at meals. Then a letter from the \"Angel Factory\" arrives and things begin to change. A picture book about imagination and kindness, with English text alongside the Chinese.",
    },
  },
]

export const coloringBook = {
  slug: '57號小豹著色本',
  art: { src: '/images/portfolio/work-coloring-book.webp', width: 515, height: 455 },
  pdf: '/assets/files/57號小豹著色本.pdf',
}

export const categoryChips: { id: 'all' | PortfolioCategory; label: Localized<string> }[] = [
  { id: 'all', label: { zh: '全部', en: 'All' } },
  { id: 'picture-book', label: { zh: '繪本', en: 'Picture books' } },
  { id: 'funny-fiction', label: { zh: '愛搞笑', en: 'Funny' } },
  { id: 'young-adult-fiction', label: { zh: '青少', en: 'YA' } },
  { id: 'stage-performance', label: { zh: '戲劇', en: 'Stage' } },
]

type Copy = Localized<string>

export type HomeCopy = {
  meta: { title: string; description: string }
  hero: {
    kicker: Copy
    name: Copy
    subtitle: Copy
    lead: Copy
    primaryCta: Copy
    secondaryCta: Copy
    stats: { value: string; caption: Copy }[]
  }
  feature: { label: Copy; line: Copy; cta: Copy }
  works: {
    eyebrow: Copy
    title: Copy
    lead: Copy
    reset: Copy
    countAll: (n: number) => string
    countFiltered: (visible: number, total: number) => string
    emptyTitle: Copy
    emptyBody: Copy
    emptyCta: Copy
    cardCta: Copy
    openAria: (title: string) => string
    dialog: {
      category: Copy
      published: Copy
      reader: Copy
      english: Copy
      available: Copy
      unavailable: Copy
      note: Copy
      noteLink: Copy
    }
  }
  reading: {
    eyebrow: Copy
    title: Copy
    lead: Copy
    cards: { age: Copy; title: Copy; body: Copy; prompts: Copy[]; books: Copy }[]
  }
  about: {
    eyebrow: Copy
    quote: Copy
    source: Copy
    caption: Copy
    name: Copy
    paragraphs: Copy[]
    timelineTitle: Copy
    timeline: { year: string; text: Copy }[]
  }
  story: {
    eyebrow: Copy
    title: Copy
    lead: Copy
    stage: { kind: Copy; title: Copy; body: Copy; credit: Copy }
    coloring: { kind: Copy; title: Copy; body: Copy; cta: Copy }
  }
  contact: {
    eyebrow: Copy
    title: Copy
    lead: Copy
    reachTitle: Copy
    rows: { label: Copy; value: Copy; href?: string }[]
    licenceTitle: Copy
    licence: Copy
    usageTitle: Copy
    usage: { label: Copy; text: Copy }[]
    form: {
      title: Copy
      help: Copy
      name: Copy
      org: Copy
      topic: Copy
      topicPlaceholder: Copy
      email: Copy
      message: Copy
      orgPlaceholder: Copy
      emailPlaceholder: Copy
      messagePlaceholder: Copy
      namePlaceholder: Copy
      topics: { value: string; label: Copy }[]
      errors: { name: Copy; topic: Copy; email: Copy; message: Copy }
      summaryTitle: Copy
      submit: Copy
      sending: Copy
      note: Copy
      successTitle: Copy
      successBody: (who: string, topic: string) => string
      again: Copy
    }
  }
  footer: {
    brand: Copy
    legal: (year: number) => string
    links: { label: Copy; href: string }[]
  }
}

export const homeCopy: Record<Locale, HomeCopy> = {
  zh: {
    meta: {
      title: '郭瀞婷 Tina Kuo · 兒童與青少年文學',
      description:
        '郭瀞婷（Tina Kuo）的作品集：繪本《57號小豹》、校園日記《丁小飛》、青少年小說《暗號偵探社》《記憶邊境》，以及舞台劇《小兒子報告！沙發有黑洞》。',
    },
    hero: {
      kicker: {
        zh: '繪本 · 校園日記 · 青少年小說 · 舞台劇',
        en: 'PICTURE BOOKS · SCHOOL DIARIES · YA FICTION · STAGE',
      },
      name: { zh: '郭瀞婷', en: 'Tina Kuo' },
      subtitle: { zh: 'Tina Kuo · Taipei', en: '郭瀞婷 · Taipei' },
      lead: {
        zh: '從校園裡的尷尬與好笑，到關於記憶、離別與生死的邊境——寫給小學中年級到青少年，也寫給陪他們一起讀的大人。',
        en: 'From the awkward and hilarious corners of school to the borderlands of memory, loss and what comes after — stories for readers from upper elementary through the teen years, and for the grown-ups reading beside them.',
      },
      primaryCta: { zh: '看看作品', en: 'Explore the works' },
      secondaryCta: { zh: '我是出版社或學校', en: "I'm a publisher or school" },
      stats: [
        { value: '', caption: { zh: '部作品', en: 'works' } },
        { value: '', caption: { zh: '個分類', en: 'categories' } },
        { value: '', caption: { zh: '年起的作品', en: 'first published' } },
      ],
    },
    feature: {
      label: { zh: '主推小說 · 2018', en: 'FEATURED NOVEL · 2018' },
      line: {
        zh: '一張離婚協議書，三個孩子，一整個夏天的暗號。',
        en: 'One divorce agreement, three kids, and a whole summer of secret codes.',
      },
      cta: { zh: '翻開這本書', en: 'Open this book' },
    },
    works: {
      eyebrow: { zh: 'The Works', en: 'The Works' },
      title: { zh: '十六部作品，四種讀法', en: 'Sixteen works, four ways to read' },
      lead: {
        zh: '繪本、校園日記、青少年小說、舞台劇——同一個說故事的人，換了四種聲調。點開封面，可以看簡介和書裡的一段話。',
        en: 'Picture books, school diaries, young adult novels, a stage play — one storyteller, four voices. Open a cover for the synopsis and a passage from the book.',
      },
      reset: { zh: '重置篩選', en: 'Reset filters' },
      countAll: (n) => `共 ${n} 部作品`,
      countFiltered: (visible, total) => `顯示 ${visible} 部，共 ${total} 部`,
      emptyTitle: { zh: '這個分類下還沒有作品。', en: 'No works in this category yet.' },
      emptyBody: {
        zh: '試試看其他分類，或按「重置篩選」看全部十六部作品。',
        en: 'Try another category, or reset to see all sixteen works.',
      },
      emptyCta: { zh: '看全部作品', en: 'See all works' },
      cardCta: { zh: '看這部作品', en: 'View this work' },
      openAria: (title) => `查看《${title}》的介紹`,
      dialog: {
        category: { zh: '分類', en: 'Category' },
        published: { zh: '出版', en: 'Published' },
        reader: { zh: '讀者', en: 'Reader' },
        english: { zh: '英文版', en: 'English edition' },
        available: { zh: 'English edition', en: 'Available' },
        unavailable: { zh: '準備中', en: 'Coming soon' },
        note: {
          zh: '想授權、改編或邀約？',
          en: 'Rights, adaptation or an invitation?',
        },
        noteLink: { zh: '前往「聯絡與使用」', en: 'Go to Contact & Use' },
      },
    },
    reading: {
      eyebrow: { zh: 'Reading Together', en: 'Reading Together' },
      title: { zh: '從哪一本開始？', en: 'Where should you start?' },
      lead: {
        zh: '三個階段、三種讀法。以下是編者的建議，不是出版社的分級——孩子讀得下去的那一本，就是對的那一本。',
        en: "Three stages, three ways to read. These are our editor's suggestions, not a publisher's reading levels — the right book is the one your child keeps reading.",
      },
      cards: [
        {
          age: { zh: '小學中年級', en: 'Upper elementary' },
          title: { zh: '先認識丁小飛', en: 'Start with Ding Xiaofei' },
          body: {
            zh: '《丁小飛校園日記》的主角是小學四年級生，滿腦子想成為「有名的人」。他的自信、嫉妒和心虛，幾乎就是這個年齡的孩子每天在教室裡經歷的事。',
            en: "The hero of Ding Xiaofei's School Diary is a fourth grader convinced he is meant to be famous. His confidence, envy and guilty conscience are almost exactly what children this age live through in the classroom every day.",
          },
          prompts: [
            {
              zh: '丁小飛最在意別人怎麼看他，你呢？',
              en: 'Ding Xiaofei cares a lot about how others see him. What about you?',
            },
            {
              zh: '他做的哪一件事，你會做不一樣的決定？',
              en: 'Which of his choices would you have made differently?',
            },
          ],
          books: {
            zh: '從《丁小飛校園日記1：時光膠囊的祕密》開始，系列共五冊。',
            en: "Start with Ding Xiaofei's School Diary 1: The Time Capsule Secret — five books in the series.",
          },
        },
        {
          age: { zh: '高年級', en: 'Grades 5–6' },
          title: { zh: '一起解一個謎', en: 'Solve a mystery together' },
          body: {
            zh: '《動物星球偵探事件簿》是六位、七位作家合寫的短篇推理集，每篇獨立，很適合睡前讀一篇、隔天再猜結局。',
            en: 'Animal Planet Detective Files is a short-story mystery collection by six or seven authors. Each case stands alone, which makes it perfect for one story at bedtime and guessing the ending the next day.',
          },
          prompts: [
            {
              zh: '你最想破哪一個案子？為什麼？',
              en: 'Which case would you most want to crack, and why?',
            },
            {
              zh: '哪一條線索是你先發現的？',
              en: 'Which clue did you spot first?',
            },
          ],
          books: {
            zh: '《動物星球偵探事件簿》與第二集《推理要在放學後》。',
            en: 'Animal Planet Detective Files and its sequel, Mystery After School.',
          },
        },
        {
          age: { zh: '國中以上', en: 'Middle school and up' },
          title: { zh: '談那些不好談的事', en: 'Talk about the hard things' },
          body: {
            zh: '《暗號偵探社》從一張離婚協議書開始，《記憶邊境》則直接走進生與死的交界。這兩本不急著給答案，適合讀完再聊。',
            en: 'The Secret Code Detective Club begins with a divorce agreement, while Memory Border walks straight into the border between life and death. Neither is in a hurry to hand out answers; they are made to be talked about after the last page.',
          },
          prompts: [
            {
              zh: '如果人生可以重來，你想改變哪一段記憶？',
              en: 'If you could live any part of your life again, which memory would you change?',
            },
            {
              zh: '書裡的大人，有哪些話其實沒說出口？',
              en: 'What are the grown-ups in these books not saying out loud?',
            },
          ],
          books: {
            zh: '《暗號偵探社》、《記憶邊境：河川．火林．烏雲光》。',
            en: 'The Secret Code Detective Club; Memory Border: River, Fire Forest, Cloud Light.',
          },
        },
      ],
    },
    about: {
      eyebrow: { zh: 'About the Author', en: 'About the Author' },
      quote: {
        zh: '「我跟你說，小芽，不要害怕。沒關係，只是一張紙而已，還沒經過法官那個大槌子敲幾下，就表示還有希望，懂嗎？」',
        en: "Let me tell you, Xiao Ya — don't be afraid. It's all right. It's only a piece of paper. Until the judge's gavel has come down a few times, there's still hope. Understand?",
      },
      source: {
        zh: '—《暗號偵探社》',
        en: '— The Secret Code Detective Club',
      },
      caption: { zh: '台北，台灣', en: 'Taipei, Taiwan' },
      name: { zh: '郭瀞婷 Tina Kuo', en: 'Tina Kuo' },
      paragraphs: [
        {
          zh: '整天跟可愛又好動小女兒鬥志，偶爾會發呆，但一有空就衝回電腦敲出幾頁要留給孩子以後讀的故事。',
          en: "Spends her days keeping up with a cute and endlessly energetic little daughter. She stares into space now and then, but the moment she has a free minute she rushes back to the keyboard to type out a few more pages of stories for her children to read in years to come.",
        },
        {
          zh: '這個網站由孩子爸 Michael S. Huang 建立：收錄心愛老婆郭瀞婷的作品，也用他的方式把她的故事延伸出去。',
          en: "This site was built by the kids' dad, Michael S. Huang: a home for his beloved wife Tina Kuo's work, and his own way of carrying her stories further.",
        },
      ],
      timelineTitle: { zh: '創作年表', en: 'Timeline' },
      timeline: [
        {
          year: '2021',
          text: {
            zh: '依《57號小豹》手繪的著色本上線，開放下載',
            en: 'A coloring book drawn from Little Leopard No. 57 goes online as a free download',
          },
        },
        {
          year: '2020',
          text: {
            zh: '《小兒子報告! 沙發有黑洞》舞台劇、《動物星球偵探事件簿2》、《57號小豹》',
            en: 'Little Son Report! The Sofa Has a Black Hole on stage; Animal Planet Detective Files 2; Little Leopard No. 57',
          },
        },
        {
          year: '2019',
          text: {
            zh: '《記憶邊境：河川．火林．烏雲光》、《動物星球偵探事件簿》',
            en: 'Memory Border: River, Fire Forest, Cloud Light; Animal Planet Detective Files',
          },
        },
        {
          year: '2018',
          text: { zh: '《暗號偵探社》', en: 'The Secret Code Detective Club' },
        },
        {
          year: '2017',
          text: { zh: '《丁小飛校園日記》1–4 冊', en: "Ding Xiaofei's School Diary, books 1–4" },
        },
      ],
    },
    story: {
      eyebrow: { zh: 'Beyond the Books', en: 'Beyond the Books' },
      title: { zh: '故事不只停在書裡', en: "The story doesn't stop at the page" },
      lead: {
        zh: '一本繪本變成著色本，一本散文集變成舞台劇。這個家的週末，常常花在把故事再往前推一點。',
        en: 'A picture book becomes a coloring book; a collection of family essays becomes a stage play. Weekends in this house often go toward pushing a story a little further.',
      },
      stage: {
        kind: { zh: '舞台劇 · 2020', en: 'STAGE · 2020' },
        title: {
          zh: '小兒子報告! 沙發有黑洞',
          en: 'Little Son Report! The Sofa Has a Black Hole',
        },
        body: {
          zh: '取材自駱以軍《小兒子》。哥哥阿白為了逃避校慶致詞躲進沙發底下的黑洞，弟弟阿甯咕和爸爸、狗狗端端只好搭上沙發號太空船去找他。',
          en: "Adapted from Luo Yijun's Little Son. To dodge a school-anniversary speech, older brother A-Bai hides inside a black hole under the sofa. Younger brother A-Ninggu, Dad and the dog Duanduan have no choice but to board the Sofa Spaceship and go find him.",
        },
        credit: {
          zh: '海報提供：AMcreative 夢田影像',
          en: 'Poster: AMcreative 夢田影像',
        },
      },
      coloring: {
        kind: { zh: '著色本 · 2021', en: 'COLORING BOOK · 2021' },
        title: { zh: '57號小豹著色本', en: 'Little Leopard No. 57 Coloring Book' },
        body: {
          zh: '照著 57 號小豹的造型手繪的幾頁著色本，由孩子爸整理上線。孩子塗得開心，大人也順便療癒一下。',
          en: "A few pages hand-drawn from Little Leopard No. 57's shape and put online by the kids' dad. Children color; grown-ups get a little healing on the side.",
        },
        cta: { zh: '下載著色本（PDF）', en: 'Download the coloring book (PDF)' },
      },
    },
    contact: {
      eyebrow: { zh: 'Contact & Use', en: 'Contact & Use' },
      title: { zh: '聯絡與使用', en: 'Contact & Use' },
      lead: {
        zh: '邀約、採訪、教學使用，或只是讀完想說一句話，都可以從這裡開始。',
        en: 'Invitations, interviews, classroom use — or just a sentence after finishing a book. Start here.',
      },
      reachTitle: { zh: '直接找到作者', en: 'Reach the author' },
      rows: [
        {
          label: { zh: 'Facebook', en: 'Facebook' },
          value: { zh: '@tinachingting', en: '@tinachingting' },
          href: 'https://www.facebook.com/tinachingting',
        },
        {
          label: { zh: '本站', en: 'This site' },
          value: {
            zh: '由孩子爸 Michael S. Huang 建立與維護',
            en: 'Built and maintained by Michael S. Huang',
          },
        },
        {
          label: { zh: '原始網站', en: 'Original site' },
          value: { zh: 'tinakuobooks.com', en: 'tinakuobooks.com' },
          href: 'https://www.tinakuobooks.com',
        },
      ],
      licenceTitle: { zh: '授權', en: 'Licence' },
      licence: {
        zh: '本站文字與書封圖像以 CC BY 4.0 授權釋出，轉載請註明作者郭瀞婷與原始出處 tinakuobooks.com。書封與插畫的著作權屬原出版社與繪者所有。',
        en: 'Text and cover images on this site are released under CC BY 4.0. When reposting, credit the author Tina Kuo and the original source tinakuobooks.com. Copyright in the covers and illustrations remains with the original publishers and illustrators.',
      },
      usageTitle: { zh: '作品使用', en: 'Using the work' },
      usage: [
        {
          label: { zh: '教學', en: 'Teaching' },
          text: {
            zh: '可複製、朗讀、改作教材，請註明作者與出處',
            en: 'Copy, read aloud or adapt for materials, with credit to the author and source',
          },
        },
        {
          label: { zh: '改編', en: 'Adaptation' },
          text: {
            zh: '戲劇、有聲書與影視改編，請先來信洽談',
            en: 'For stage, audiobook, film or TV adaptation, write first',
          },
        },
        {
          label: { zh: '外版', en: 'Foreign editions' },
          text: {
            zh: '部分作品已有英文版，其他語言請來信',
            en: 'Some works have English editions; for other languages, write to us',
          },
        },
      ],
      form: {
        title: { zh: '寫信給作者', en: 'Write to the author' },
        help: {
          zh: '通常 3 個工作日內回覆。要談授權或邀約，請在事由裡選對應項。',
          en: 'Replies usually within 3 working days. For rights or invitations, choose the matching subject.',
        },
        name: { zh: '稱呼', en: 'Name' },
        org: { zh: '機構（選填）', en: 'Organization (optional)' },
        topic: { zh: '事由', en: 'Subject' },
        topicPlaceholder: { zh: '請選擇', en: 'Choose one' },
        email: { zh: '電子郵件', en: 'Email' },
        message: { zh: '想說的話', en: 'Your message' },
        orgPlaceholder: { zh: '學校、出版社或書店', en: 'School, publisher or bookshop' },
        emailPlaceholder: { zh: 'name@example.com', en: 'name@example.com' },
        messagePlaceholder: {
          zh: '活動時間與人數、想授權的作品，或你讀到的那一頁。',
          en: 'Dates and numbers, the work you want to license, or the page you read.',
        },
        namePlaceholder: { zh: '例如：林老師', en: 'e.g. Ms Lin' },
        topics: [
          {
            value: 'rights',
            label: { zh: '授權 / 外版洽談', en: 'Rights / foreign editions' },
          },
          { value: 'visit', label: { zh: '邀約與合作', en: 'Visits & collaboration' } },
          { value: 'press', label: { zh: '採訪', en: 'Press' } },
          {
            value: 'teaching',
            label: { zh: '教學與閱讀推廣', en: 'Teaching & reading promotion' },
          },
          { value: 'reader', label: { zh: '讀者來信', en: 'Reader mail' } },
        ],
        errors: {
          name: {
            zh: '請填一個稱呼，方便回信時稱呼你。',
            en: 'Please add a name so we know how to address you.',
          },
          topic: {
            zh: '請選擇事由，我們好把它轉給對應的人。',
            en: 'Choose a subject so we can route your message.',
          },
          email: {
            zh: '這個信箱看起來不完整，請檢查是否包含 @ 和後面的網域。',
            en: 'That email looks incomplete — check for @ and the domain.',
          },
          message: {
            zh: '請至少寫 10 個字，說一下時間、地點或你讀到的那一頁。',
            en: 'Write at least 10 characters: dates, a location, or the page you read.',
          },
        },
        summaryTitle: { zh: '還有幾處需要補充：', en: 'A few things still need filling in:' },
        submit: { zh: '送出這封信', en: 'Send the letter' },
        sending: { zh: '正在送出…', en: 'Sending…' },
        note: {
          zh: '這是一份示範表單，內容不會真的寄出。',
          en: 'This is a demo form; nothing is actually sent.',
        },
        successTitle: { zh: '信已經放在桌上了', en: 'The letter is on the desk' },
        successBody: (who, topic) =>
          `${who}，你的「${topic}」已經記在這張桌子上了。這是一份示範表單，內容沒有真的寄出；接上真實信箱後，作者會在 3 個工作日內回覆你。`,
        again: { zh: '再寫一封', en: 'Write another' },
      },
    },
    footer: {
      brand: { zh: '郭瀞婷 Tina Kuo · 台北', en: 'Tina Kuo · Taipei' },
      legal: (year) =>
        `© ${year} 郭瀞婷 · 由 Michael S. Huang 建立 · 內容以 CC BY 4.0 授權`,
      links: [
        { label: { zh: '作品', en: 'Works' }, href: '/works' },
        { label: { zh: '主題', en: 'Collections' }, href: '/collections' },
        { label: { zh: '關於', en: 'About' }, href: '/about/' },
        { label: { zh: 'English', en: '中文' }, href: '/en' },
        { label: { zh: 'RSS', en: 'RSS' }, href: '/feed.xml' },
        {
          label: { zh: '原始碼', en: 'Source' },
          href: 'https://github.com/mhuang74-blog/tinakuobooks_nextjs',
        },
      ],
    },
  },
  en: {
    meta: {
      title: "Tina Kuo · Children's & Young Adult Literature",
      description:
        "Tina Kuo's portfolio: the picture book Little Leopard No. 57, the Ding Xiaofei school diaries, the YA novels The Secret Code Detective Club and Memory Border, and the stage play Little Son Report! The Sofa Has a Black Hole.",
    },
    hero: {
      kicker: {
        zh: '繪本 · 校園日記 · 青少年小說 · 舞台劇',
        en: 'PICTURE BOOKS · SCHOOL DIARIES · YA FICTION · STAGE',
      },
      name: { zh: '郭瀞婷', en: 'Tina Kuo' },
      subtitle: { zh: 'Tina Kuo · Taipei', en: '郭瀞婷 · Taipei' },
      lead: {
        zh: '從校園裡的尷尬與好笑，到關於記憶、離別與生死的邊境——寫給小學中年級到青少年，也寫給陪他們一起讀的大人。',
        en: 'From the awkward and hilarious corners of school to the borderlands of memory, loss and what comes after — stories for readers from upper elementary through the teen years, and for the grown-ups reading beside them.',
      },
      primaryCta: { zh: '看看作品', en: 'Explore the works' },
      secondaryCta: { zh: '我是出版社或學校', en: "I'm a publisher or school" },
      stats: [
        { value: '', caption: { zh: '部作品', en: 'works' } },
        { value: '', caption: { zh: '個分類', en: 'categories' } },
        { value: '', caption: { zh: '年起的作品', en: 'first published' } },
      ],
    },
    feature: {
      label: { zh: '主推小說 · 2018', en: 'FEATURED NOVEL · 2018' },
      line: {
        zh: '一張離婚協議書，三個孩子，一整個夏天的暗號。',
        en: 'One divorce agreement, three kids, and a whole summer of secret codes.',
      },
      cta: { zh: '翻開這本書', en: 'Open this book' },
    },
    works: {
      eyebrow: { zh: 'The Works', en: 'The Works' },
      title: { zh: '十六部作品，四種讀法', en: 'Sixteen works, four ways to read' },
      lead: {
        zh: '繪本、校園日記、青少年小說、舞台劇——同一個說故事的人，換了四種聲調。點開封面，可以看簡介和書裡的一段話。',
        en: 'Picture books, school diaries, young adult novels, a stage play — one storyteller, four voices. Open a cover for the synopsis and a passage from the book.',
      },
      reset: { zh: '重置篩選', en: 'Reset filters' },
      countAll: (n) => `${n} works`,
      countFiltered: (visible, total) => `Showing ${visible} of ${total} works`,
      emptyTitle: { zh: '這個分類下還沒有作品。', en: 'No works in this category yet.' },
      emptyBody: {
        zh: '試試看其他分類，或按「重置篩選」看全部十六部作品。',
        en: 'Try another category, or reset to see all sixteen works.',
      },
      emptyCta: { zh: '看全部作品', en: 'See all works' },
      cardCta: { zh: '看這部作品', en: 'View this work' },
      openAria: (title) => `Open ${title}`,
      dialog: {
        category: { zh: '分類', en: 'Category' },
        published: { zh: '出版', en: 'Published' },
        reader: { zh: '讀者', en: 'Reader' },
        english: { zh: '英文版', en: 'English edition' },
        available: { zh: 'English edition', en: 'Available' },
        unavailable: { zh: '準備中', en: 'Coming soon' },
        note: {
          zh: '想授權、改編或邀約？',
          en: 'Rights, adaptation or an invitation?',
        },
        noteLink: { zh: '前往「聯絡與使用」', en: 'Go to Contact & Use' },
      },
    },
    reading: {
      eyebrow: { zh: 'Reading Together', en: 'Reading Together' },
      title: { zh: '從哪一本開始？', en: 'Where should you start?' },
      lead: {
        zh: '三個階段、三種讀法。以下是編者的建議，不是出版社的分級——孩子讀得下去的那一本，就是對的那一本。',
        en: "Three stages, three ways to read. These are our editor's suggestions, not a publisher's reading levels — the right book is the one your child keeps reading.",
      },
      cards: [
        {
          age: { zh: '小學中年級', en: 'Upper elementary' },
          title: { zh: '先認識丁小飛', en: 'Start with Ding Xiaofei' },
          body: {
            zh: '《丁小飛校園日記》的主角是小學四年級生，滿腦子想成為「有名的人」。他的自信、嫉妒和心虛，幾乎就是這個年齡的孩子每天在教室裡經歷的事。',
            en: "The hero of Ding Xiaofei's School Diary is a fourth grader convinced he is meant to be famous. His confidence, envy and guilty conscience are almost exactly what children this age live through in the classroom every day.",
          },
          prompts: [
            {
              zh: '丁小飛最在意別人怎麼看他，你呢？',
              en: 'Ding Xiaofei cares a lot about how others see him. What about you?',
            },
            {
              zh: '他做的哪一件事，你會做不一樣的決定？',
              en: 'Which of his choices would you have made differently?',
            },
          ],
          books: {
            zh: '從《丁小飛校園日記1：時光膠囊的祕密》開始，系列共五冊。',
            en: "Start with Ding Xiaofei's School Diary 1: The Time Capsule Secret — five books in the series.",
          },
        },
        {
          age: { zh: '高年級', en: 'Grades 5–6' },
          title: { zh: '一起解一個謎', en: 'Solve a mystery together' },
          body: {
            zh: '《動物星球偵探事件簿》是六位、七位作家合寫的短篇推理集，每篇獨立，很適合睡前讀一篇、隔天再猜結局。',
            en: 'Animal Planet Detective Files is a short-story mystery collection by six or seven authors. Each case stands alone, which makes it perfect for one story at bedtime and guessing the ending the next day.',
          },
          prompts: [
            {
              zh: '你最想破哪一個案子？為什麼？',
              en: 'Which case would you most want to crack, and why?',
            },
            {
              zh: '哪一條線索是你先發現的？',
              en: 'Which clue did you spot first?',
            },
          ],
          books: {
            zh: '《動物星球偵探事件簿》與第二集《推理要在放學後》。',
            en: 'Animal Planet Detective Files and its sequel, Mystery After School.',
          },
        },
        {
          age: { zh: '國中以上', en: 'Middle school and up' },
          title: { zh: '談那些不好談的事', en: 'Talk about the hard things' },
          body: {
            zh: '《暗號偵探社》從一張離婚協議書開始，《記憶邊境》則直接走進生與死的交界。這兩本不急著給答案，適合讀完再聊。',
            en: 'The Secret Code Detective Club begins with a divorce agreement, while Memory Border walks straight into the border between life and death. Neither is in a hurry to hand out answers; they are made to be talked about after the last page.',
          },
          prompts: [
            {
              zh: '如果人生可以重來，你想改變哪一段記憶？',
              en: 'If you could live any part of your life again, which memory would you change?',
            },
            {
              zh: '書裡的大人，有哪些話其實沒說出口？',
              en: 'What are the grown-ups in these books not saying out loud?',
            },
          ],
          books: {
            zh: '《暗號偵探社》、《記憶邊境：河川．火林．烏雲光》。',
            en: 'The Secret Code Detective Club; Memory Border: River, Fire Forest, Cloud Light.',
          },
        },
      ],
    },
    about: {
      eyebrow: { zh: 'About the Author', en: 'About the Author' },
      quote: {
        zh: '「我跟你說，小芽，不要害怕。沒關係，只是一張紙而已，還沒經過法官那個大槌子敲幾下，就表示還有希望，懂嗎？」',
        en: "Let me tell you, Xiao Ya — don't be afraid. It's all right. It's only a piece of paper. Until the judge's gavel has come down a few times, there's still hope. Understand?",
      },
      source: { zh: '—《暗號偵探社》', en: '— The Secret Code Detective Club' },
      caption: { zh: '台北，台灣', en: 'Taipei, Taiwan' },
      name: { zh: '郭瀞婷 Tina Kuo', en: 'Tina Kuo' },
      paragraphs: [
        {
          zh: '整天跟可愛又好動小女兒鬥志，偶爾會發呆，但一有空就衝回電腦敲出幾頁要留給孩子以後讀的故事。',
          en: "Spends her days keeping up with a cute and endlessly energetic little daughter. She stares into space now and then, but the moment she has a free minute she rushes back to the keyboard to type out a few more pages of stories for her children to read in years to come.",
        },
        {
          zh: '這個網站由孩子爸 Michael S. Huang 建立：收錄心愛老婆郭瀞婷的作品，也用他的方式把她的故事延伸出去。',
          en: "This site was built by the kids' dad, Michael S. Huang: a home for his beloved wife Tina Kuo's work, and his own way of carrying her stories further.",
        },
      ],
      timelineTitle: { zh: '創作年表', en: 'Timeline' },
      timeline: [
        {
          year: '2021',
          text: {
            zh: '依《57號小豹》手繪的著色本上線，開放下載',
            en: 'A coloring book drawn from Little Leopard No. 57 goes online as a free download',
          },
        },
        {
          year: '2020',
          text: {
            zh: '《小兒子報告! 沙發有黑洞》舞台劇、《動物星球偵探事件簿2》、《57號小豹》',
            en: 'Little Son Report! The Sofa Has a Black Hole on stage; Animal Planet Detective Files 2; Little Leopard No. 57',
          },
        },
        {
          year: '2019',
          text: {
            zh: '《記憶邊境：河川．火林．烏雲光》、《動物星球偵探事件簿》',
            en: 'Memory Border: River, Fire Forest, Cloud Light; Animal Planet Detective Files',
          },
        },
        {
          year: '2018',
          text: { zh: '《暗號偵探社》', en: 'The Secret Code Detective Club' },
        },
        {
          year: '2017',
          text: { zh: '《丁小飛校園日記》1–4 冊', en: "Ding Xiaofei's School Diary, books 1–4" },
        },
      ],
    },
    story: {
      eyebrow: { zh: 'Beyond the Books', en: 'Beyond the Books' },
      title: { zh: '故事不只停在書裡', en: "The story doesn't stop at the page" },
      lead: {
        zh: '一本繪本變成著色本，一本散文集變成舞台劇。這個家的週末，常常花在把故事再往前推一點。',
        en: 'A picture book becomes a coloring book; a collection of family essays becomes a stage play. Weekends in this house often go toward pushing a story a little further.',
      },
      stage: {
        kind: { zh: '舞台劇 · 2020', en: 'STAGE · 2020' },
        title: {
          zh: '小兒子報告! 沙發有黑洞',
          en: 'Little Son Report! The Sofa Has a Black Hole',
        },
        body: {
          zh: '取材自駱以軍《小兒子》。哥哥阿白為了逃避校慶致詞躲進沙發底下的黑洞，弟弟阿甯咕和爸爸、狗狗端端只好搭上沙發號太空船去找他。',
          en: "Adapted from Luo Yijun's Little Son. To dodge a school-anniversary speech, older brother A-Bai hides inside a black hole under the sofa. Younger brother A-Ninggu, Dad and the dog Duanduan have no choice but to board the Sofa Spaceship and go find him.",
        },
        credit: {
          zh: '海報提供：AMcreative 夢田影像',
          en: 'Poster: AMcreative 夢田影像',
        },
      },
      coloring: {
        kind: { zh: '著色本 · 2021', en: 'COLORING BOOK · 2021' },
        title: { zh: '57號小豹著色本', en: 'Little Leopard No. 57 Coloring Book' },
        body: {
          zh: '照著 57 號小豹的造型手繪的幾頁著色本，由孩子爸整理上線。孩子塗得開心，大人也順便療癒一下。',
          en: "A few pages hand-drawn from Little Leopard No. 57's shape and put online by the kids' dad. Children color; grown-ups get a little healing on the side.",
        },
        cta: { zh: '下載著色本（PDF）', en: 'Download the coloring book (PDF)' },
      },
    },
    contact: {
      eyebrow: { zh: 'Contact & Use', en: 'Contact & Use' },
      title: { zh: '聯絡與使用', en: 'Contact & Use' },
      lead: {
        zh: '邀約、採訪、教學使用，或只是讀完想說一句話，都可以從這裡開始。',
        en: 'Invitations, interviews, classroom use — or just a sentence after finishing a book. Start here.',
      },
      reachTitle: { zh: '直接找到作者', en: 'Reach the author' },
      rows: [
        {
          label: { zh: 'Facebook', en: 'Facebook' },
          value: { zh: '@tinachingting', en: '@tinachingting' },
          href: 'https://www.facebook.com/tinachingting',
        },
        {
          label: { zh: '本站', en: 'This site' },
          value: {
            zh: '由孩子爸 Michael S. Huang 建立與維護',
            en: 'Built and maintained by Michael S. Huang',
          },
        },
        {
          label: { zh: '原始網站', en: 'Original site' },
          value: { zh: 'tinakuobooks.com', en: 'tinakuobooks.com' },
          href: 'https://www.tinakuobooks.com',
        },
      ],
      licenceTitle: { zh: '授權', en: 'Licence' },
      licence: {
        zh: '本站文字與書封圖像以 CC BY 4.0 授權釋出，轉載請註明作者郭瀞婷與原始出處 tinakuobooks.com。書封與插畫的著作權屬原出版社與繪者所有。',
        en: 'Text and cover images on this site are released under CC BY 4.0. When reposting, credit the author Tina Kuo and the original source tinakuobooks.com. Copyright in the covers and illustrations remains with the original publishers and illustrators.',
      },
      usageTitle: { zh: '作品使用', en: 'Using the work' },
      usage: [
        {
          label: { zh: '教學', en: 'Teaching' },
          text: {
            zh: '可複製、朗讀、改作教材，請註明作者與出處',
            en: 'Copy, read aloud or adapt for materials, with credit to the author and source',
          },
        },
        {
          label: { zh: '改編', en: 'Adaptation' },
          text: {
            zh: '戲劇、有聲書與影視改編，請先來信洽談',
            en: 'For stage, audiobook, film or TV adaptation, write first',
          },
        },
        {
          label: { zh: '外版', en: 'Foreign editions' },
          text: {
            zh: '部分作品已有英文版，其他語言請來信',
            en: 'Some works have English editions; for other languages, write to us',
          },
        },
      ],
      form: {
        title: { zh: '寫信給作者', en: 'Write to the author' },
        help: {
          zh: '通常 3 個工作日內回覆。要談授權或邀約，請在事由裡選對應項。',
          en: 'Replies usually within 3 working days. For rights or invitations, choose the matching subject.',
        },
        name: { zh: '稱呼', en: 'Name' },
        org: { zh: '機構（選填）', en: 'Organization (optional)' },
        topic: { zh: '事由', en: 'Subject' },
        topicPlaceholder: { zh: '請選擇', en: 'Choose one' },
        email: { zh: '電子郵件', en: 'Email' },
        message: { zh: '想說的話', en: 'Your message' },
        orgPlaceholder: { zh: '學校、出版社或書店', en: 'School, publisher or bookshop' },
        emailPlaceholder: { zh: 'name@example.com', en: 'name@example.com' },
        messagePlaceholder: {
          zh: '活動時間與人數、想授權的作品，或你讀到的那一頁。',
          en: 'Dates and numbers, the work you want to license, or the page you read.',
        },
        namePlaceholder: { zh: '例如：林老師', en: 'e.g. Ms Lin' },
        topics: [
          {
            value: 'rights',
            label: { zh: '授權 / 外版洽談', en: 'Rights / foreign editions' },
          },
          { value: 'visit', label: { zh: '邀約與合作', en: 'Visits & collaboration' } },
          { value: 'press', label: { zh: '採訪', en: 'Press' } },
          {
            value: 'teaching',
            label: { zh: '教學與閱讀推廣', en: 'Teaching & reading promotion' },
          },
          { value: 'reader', label: { zh: '讀者來信', en: 'Reader mail' } },
        ],
        errors: {
          name: {
            zh: '請填一個稱呼，方便回信時稱呼你。',
            en: 'Please add a name so we know how to address you.',
          },
          topic: {
            zh: '請選擇事由，我們好把它轉給對應的人。',
            en: 'Choose a subject so we can route your message.',
          },
          email: {
            zh: '這個信箱看起來不完整，請檢查是否包含 @ 和後面的網域。',
            en: 'That email looks incomplete — check for @ and the domain.',
          },
          message: {
            zh: '請至少寫 10 個字，說一下時間、地點或你讀到的那一頁。',
            en: 'Write at least 10 characters: dates, a location, or the page you read.',
          },
        },
        summaryTitle: { zh: '還有幾處需要補充：', en: 'A few things still need filling in:' },
        submit: { zh: '送出這封信', en: 'Send the letter' },
        sending: { zh: '正在送出…', en: 'Sending…' },
        note: {
          zh: '這是一份示範表單，內容不會真的寄出。',
          en: 'This is a demo form; nothing is actually sent.',
        },
        successTitle: { zh: '信已經放在桌上了', en: 'The letter is on the desk' },
        successBody: (who, topic) =>
          `${who}, your “${topic}” note is now on this desk. This is a demo form — nothing was actually sent; once a real inbox is connected, the author will reply within 3 working days.`,
        again: { zh: '再寫一封', en: 'Write another' },
      },
    },
    footer: {
      brand: { zh: '郭瀞婷 Tina Kuo · 台北', en: 'Tina Kuo · Taipei' },
      legal: (year) =>
        `© ${year} Tina Kuo · Site by Michael S. Huang · Content under CC BY 4.0`,
      links: [
        { label: { zh: '作品', en: 'Works' }, href: '/en/works' },
        { label: { zh: '主題', en: 'Collections' }, href: '/en/collections' },
        { label: { zh: '關於', en: 'About' }, href: '/en/about' },
        { label: { zh: 'English', en: '中文' }, href: '/' },
        { label: { zh: 'RSS', en: 'RSS' }, href: '/en/feed.xml' },
        {
          label: { zh: '原始碼', en: 'Source' },
          href: 'https://github.com/mhuang74-blog/tinakuobooks_nextjs',
        },
      ],
    },
  },
}
