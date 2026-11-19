import type { InlinePart } from '@/lib/inline'
import type { Locale, Localized } from '@/lib/i18n'
import { MICHAEL_HUANG_URLS } from '@/lib/site'

export type PortfolioCategory =
  | 'picture-book'
  | 'bridge-books'
  | 'funny-fiction'
  | 'young-adult-fiction'
  | 'stage-performance'

export type PortfolioArt = { src: string; width: number; height: number }

export type PortfolioEntry = {
  slug: string
  category: PortfolioCategory
  year: string
  art: PortfolioArt
  tagline: Localized<string>
}

export const featuredSlug = '暗號偵探社'

export const portfolioWorks: PortfolioEntry[] = [
  {
    slug: "胡阿布偵探事件簿-誰綁架了黑總統",
    category: 'young-adult-fiction',
    year: '2026',
    art: { src: "/images/book-cover-胡阿布偵探事件簿.webp", width: 1000, height: 1389 },
    tagline: {
      zh: "紅狐狸胡阿布的第一樁大案：掌管陸地的黑猩猩總統不見了。",
      en: "The red fox Hu Abu's first big case: the chimpanzee president who governs the land has vanished.",
    },
  },
  {
    slug: "丁小飛校園日記5-我要成為YouTuber",
    category: 'funny-fiction',
    year: '2023',
    art: { src: "/images/book-cover-丁小飛校園日記5-我要成為YouTuber.webp", width: 1000, height: 1401 },
    tagline: {
      zh: "丁小飛架起鏡頭開頻道，才發現做節目比吃飯睡覺還難。",
      en: "Ding Xiaofei sets up a camera and starts a channel, only to find a show is harder than eating or sleeping.",
    },
  },
  {
    slug: "機器人宅急便2-能寄勇氣嗎",
    category: 'bridge-books',
    year: '2023',
    art: { src: "/images/book-cover-機器人宅急便2.webp", width: 1000, height: 1373 },
    tagline: {
      zh: "看不見也摸不到的「勇氣」，該怎麼寄給九十六歲的奶奶？",
      en: "How do you deliver \"courage\" — invisible and intangible — to a ninety-six-year-old grandmother?",
    },
  },
  {
    slug: "機器人宅急便1-什麼都可以寄",
    category: 'bridge-books',
    year: '2022',
    art: { src: "/images/book-cover-機器人宅急便1.webp", width: 1000, height: 1372 },
    tagline: {
      zh: "二〇九九年，一間「什麼都可以寄」的機器人宅急便開張了。",
      en: "In 2099, a robot courier shop that delivers anything opens for business.",
    },
  },
  {
    slug: '小兒子報告-沙發有黑洞',
    category: 'stage-performance',
    year: '2020',
    art: { src: '/images/portfolio/work-sofa-poster.webp', width: 763, height: 1080 },
    tagline: {
      zh: '爸爸和弟弟搭上沙發號太空船，去黑洞裡把哥哥找回來。',
      en: 'Dad and little brother board the Sofa Spaceship to bring big brother back from the black hole.',
    },
  },
  {
    slug: '57號小豹',
    category: 'picture-book',
    year: '2020',
    art: { src: '/images/book-cover-57號小豹-portrait.webp', width: 1000, height: 1400 },
    tagline: {
      zh: '一隻不想被看見的豹，最後得面對自己身上的「不一樣」。',
      en: 'A leopard that would rather not be seen ends up facing what makes it different.',
    },
  },
  {
    slug: '動物星球偵探事件簿2-推理要在放學後',
    category: 'young-adult-fiction',
    year: '2020',
    art: { src: '/images/portfolio/work-animal-2.webp', width: 626, height: 881 },
    tagline: { zh: '放學後，開始推理。', en: 'After school, the deduction begins.' },
  },
  {
    slug: '記憶邊境-河川-火林-烏雲光',
    category: 'young-adult-fiction',
    year: '2019',
    art: { src: '/images/portfolio/work-memory-border.webp', width: 635, height: 900 },
    tagline: {
      zh: '一場車禍把他送到生死邊境，三次機會改寫一段記憶。',
      en: 'A crash leaves him at the border of life and death, with three chances to rewrite one memory.',
    },
  },
  {
    slug: '動物星球偵探事件簿',
    category: 'young-adult-fiction',
    year: '2019',
    art: { src: '/images/portfolio/work-animal-1.webp', width: 445, height: 641 },
    tagline: {
      zh: '六位說故事高手，一場動物大集合的推理。',
      en: 'Six master storytellers, one animal-packed mystery.',
    },
  },
  {
    slug: '暗號偵探社',
    category: 'young-adult-fiction',
    year: '2018',
    art: { src: '/images/book-cover-暗號偵探社.webp', width: 1400, height: 1811 },
    tagline: {
      zh: '一張離婚協議書，三個孩子，一整個夏天的暗號。',
      en: 'One divorce agreement, three kids, and a whole summer of secret codes.',
    },
  },
  {
    slug: '丁小飛校園日記4-聰明眼鏡',
    category: 'funny-fiction',
    year: '2017',
    art: { src: '/images/portfolio/work-ding-4.webp', width: 284, height: 406 },
    tagline: {
      zh: '一句「我也有」，滾成了愈來愈大的謊。',
      en: 'One “me too” rolls into a lie that keeps growing.',
    },
  },
  {
    slug: '丁小飛校園日記3-副班長爭奪戰',
    category: 'funny-fiction',
    year: '2014',
    art: { src: '/images/portfolio/work-ding-3.webp', width: 289, height: 417 },
    tagline: {
      zh: '為了副班長，他開始對最好的朋友動手腳。',
      en: 'To win the deputy post, he starts playing tricks on his best friend.',
    },
  },
  {
    slug: '丁小飛校園日記2-誰是最佳小隊長',
    category: 'funny-fiction',
    year: '2013',
    art: { src: '/images/portfolio/work-ding-2.webp', width: 290, height: 418 },
    tagline: {
      zh: '夏令營裡高手如雲，他居然被派去演一匹馬。',
      en: 'At a camp full of high achievers, he gets cast as a horse.',
    },
  },
  {
    slug: '丁小飛校園日記1-時光膠囊的祕密',
    category: 'funny-fiction',
    year: '2013',
    art: { src: '/images/portfolio/work-ding-1.webp', width: 637, height: 900 },
    tagline: {
      zh: '小四生丁小飛，最想成為「有名的人」。',
      en: 'Ding Xiaofei, fourth grader, wants more than anything to be famous.',
    },
  },
  {
    slug: "你願不願意做我最好的朋友",
    category: 'picture-book',
    year: '2009',
    art: { src: "/images/book-cover-你願不願意做我最好的朋友.webp", width: 200, height: 280 },
    tagline: {
      zh: "小狗舒比出發，去尋找什麼才是「真正的」好朋友。",
      en: "A puppy named Shubi sets out to find what a \"real\" best friend is.",
    },
  },
  {
    slug: "天使工廠",
    category: 'picture-book',
    year: '2009',
    art: { src: "/images/book-cover-天使工廠.webp", width: 424, height: 580 },
    tagline: {
      zh: "烏龜諾門什麼都不快樂，直到天使工廠寄來一封信。",
      en: "A turtle named Nomen is unhappy with everything — until a letter from the Angel Factory arrives.",
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
  { id: 'bridge-books', label: { zh: '橋梁書', en: 'Early chapter books' } },
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
      language: Copy
      note: Copy
      noteLink: Copy
    }
  }
  reading: {
    eyebrow: Copy
    title: Copy
    lead: Copy
    cards: { age: Copy; title: Copy; body: Localized<InlinePart[]>; prompts: Copy[]; books: Localized<InlinePart[]> }[]
  }
  about: {
    eyebrow: Copy
    quote: Copy
    source: Copy
    caption: Copy
    name: Copy
    paragraphs: Localized<InlinePart[]>[]
    timelineTitle: Copy
    timeline: { year: string; text: Localized<InlinePart[]> }[]
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
    rows: { label: Copy; value: Localized<InlinePart[]>; href?: string }[]
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
      errors: { name: Copy; topic: Copy; email: Copy; message: Copy; send: Copy; captcha: Copy }
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
    legal: (year: number) => InlinePart[]
    links: { label: Copy; href: string }[]
  }
}

const readingCards: HomeCopy['reading']['cards'] = [
  {
    age: { zh: '小學中年級', en: 'Upper elementary' },
    title: { zh: '先認識丁小飛', en: 'Start with Ding Xiaofei' },
    body: {
      zh: [
        {
          text: '《丁小飛校園日記》的主角是小學四年級生，滿腦子想成為「有名的人」。他的自信、嫉妒和心虛，幾乎就是這個年齡的孩子每天在教室裡經歷的事。',
        },
      ],
      en: [
        {
          text: "The hero of Ding Xiaofei's School Diary is a fourth grader convinced he is meant to be famous. His confidence, envy and guilty conscience are almost exactly what children this age live through in the classroom every day.",
        },
      ],
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
      zh: [
        { text: '從' },
        { work: '丁小飛校園日記1-時光膠囊的祕密' },
        { text: '開始，系列共五冊。' },
      ],
      en: [
        { text: 'Start with ' },
        { work: '丁小飛校園日記1-時光膠囊的祕密' },
        { text: ' — five books in the series.' },
      ],
    },
  },
  {
    age: { zh: '高年級', en: 'Grades 5–6' },
    title: { zh: '一起解一個謎', en: 'Solve a mystery together' },
    body: {
      zh: [
        { work: '動物星球偵探事件簿' },
        { text: '是六位、七位作家合寫的短篇推理集，每篇獨立，很適合睡前讀一篇、隔天再猜結局。' },
      ],
      en: [
        { work: '動物星球偵探事件簿' },
        {
          text: ' is a short-story mystery collection by six or seven authors. Each case stands alone, which makes it perfect for one story at bedtime and guessing the ending the next day.',
        },
      ],
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
      zh: [
        { work: '動物星球偵探事件簿' },
        { text: '與第二集' },
        {
          work: '動物星球偵探事件簿2-推理要在放學後',
          label: { zh: '推理要在放學後', en: 'Mystery After School' },
        },
        { text: '。' },
      ],
      en: [
        { work: '動物星球偵探事件簿' },
        { text: ' and its sequel, ' },
        {
          work: '動物星球偵探事件簿2-推理要在放學後',
          label: { zh: '推理要在放學後', en: 'Mystery After School' },
        },
        { text: '.' },
      ],
    },
  },
  {
    age: { zh: '國中以上', en: 'Middle school and up' },
    title: { zh: '談那些不好談的事', en: 'Talk about the hard things' },
    body: {
      zh: [
        { work: '暗號偵探社' },
        { text: '從一張離婚協議書開始，' },
        { work: '記憶邊境-河川-火林-烏雲光', label: { zh: '記憶邊境', en: 'Memory Border' } },
        { text: '則直接走進生與死的交界。這兩本不急著給答案，適合讀完再聊。' },
      ],
      en: [
        { work: '暗號偵探社' },
        { text: ' begins with a divorce agreement, while ' },
        { work: '記憶邊境-河川-火林-烏雲光', label: { zh: '記憶邊境', en: 'Memory Border' } },
        {
          text: ' walks straight into the border between life and death. Neither is in a hurry to hand out answers; they are made to be talked about after the last page.',
        },
      ],
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
      zh: [
        { work: '暗號偵探社' },
        { text: '、' },
        { work: '記憶邊境-河川-火林-烏雲光' },
        { text: '。' },
      ],
      en: [
        { work: '暗號偵探社' },
        { text: '; ' },
        { work: '記憶邊境-河川-火林-烏雲光' },
        { text: '.' },
      ],
    },
  },
]

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
      title: { zh: '十六部作品，五種讀法', en: 'Sixteen works, five ways to read' },
      lead: {
        zh: '繪本、橋梁書、校園日記、青少年小說、舞台劇——同一個說故事的人，換了五種聲調。點開封面，看簡介、適讀年齡和出版資訊。',
        en: 'Picture books, early chapter books, school diaries, young adult novels, a stage play — one storyteller, five voices. Open a cover for the synopsis, reading age, and publication details.',
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
        language: { zh: '語言', en: 'Language' },
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
      cards: readingCards,
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
          zh: [
            {
              text: '整天跟可愛又好動小女兒鬥志，偶爾會發呆，但一有空就衝回電腦敲出幾頁要留給孩子以後讀的故事。',
            },
          ],
          en: [
            {
              text: "Spends her days keeping up with a cute and endlessly energetic little daughter. She stares into space now and then, but the moment she has a free minute she rushes back to the keyboard to type out a few more pages of stories for her children to read in years to come.",
            },
          ],
        },
        {
          zh: [
            { text: '這個網站由孩子爸 ' },
            { href: MICHAEL_HUANG_URLS.zh, label: 'Michael S. Huang' },
            { text: ' 建立：收錄心愛老婆郭瀞婷的作品，也用他的方式把她的故事延伸出去。' },
          ],
          en: [
            { text: "This site was built by the kids' dad, " },
            { href: MICHAEL_HUANG_URLS.en, label: 'Michael S. Huang' },
            {
              text: ": a home for his beloved wife Tina Kuo's work, and his own way of carrying her stories further.",
            },
          ],
        },
      ],
      timelineTitle: { zh: '創作年表', en: 'Timeline' },
      timeline: [
        {
          year: '2026',
          text: {
            zh: [{ work: '胡阿布偵探事件簿-誰綁架了黑總統' }],
            en: [{ work: '胡阿布偵探事件簿-誰綁架了黑總統' }],
          },
        },
        {
          year: '2023',
          text: {
            zh: [
              { work: '機器人宅急便2-能寄勇氣嗎' },
              { text: '、' },
              { work: '丁小飛校園日記5-我要成為YouTuber' },
            ],
            en: [
              { work: '機器人宅急便2-能寄勇氣嗎' },
              { text: '; ' },
              { work: '丁小飛校園日記5-我要成為YouTuber' },
            ],
          },
        },
        {
          year: '2022',
          text: {
            zh: [{ work: '機器人宅急便1-什麼都可以寄' }],
            en: [{ work: '機器人宅急便1-什麼都可以寄' }],
          },
        },
        {
          year: '2021',
          text: {
            zh: [{ text: '依' }, { work: '57號小豹' }, { text: '手繪的著色本上線，開放下載' }],
            en: [
              { text: 'A coloring book drawn from ' },
              { work: '57號小豹' },
              { text: ' goes online as a free download' },
            ],
          },
        },
        {
          year: '2020',
          text: {
            zh: [
              { work: '小兒子報告-沙發有黑洞' },
              { text: '舞台劇、' },
              {
                work: '動物星球偵探事件簿2-推理要在放學後',
                label: { zh: '動物星球偵探事件簿2', en: 'Animal Planet Detective Files 2' },
              },
              { text: '、' },
              { work: '57號小豹' },
            ],
            en: [
              { work: '小兒子報告-沙發有黑洞' },
              { text: ' on stage; ' },
              {
                work: '動物星球偵探事件簿2-推理要在放學後',
                label: { zh: '動物星球偵探事件簿2', en: 'Animal Planet Detective Files 2' },
              },
              { text: '; ' },
              { work: '57號小豹' },
            ],
          },
        },
        {
          year: '2019',
          text: {
            zh: [
              { work: '記憶邊境-河川-火林-烏雲光' },
              { text: '、' },
              { work: '動物星球偵探事件簿' },
            ],
            en: [
              { work: '記憶邊境-河川-火林-烏雲光' },
              { text: '; ' },
              { work: '動物星球偵探事件簿' },
            ],
          },
        },
        {
          year: '2018',
          text: {
            zh: [{ work: '暗號偵探社' }],
            en: [{ work: '暗號偵探社' }],
          },
        },
        {
          year: '2017',
          text: {
            zh: [
              {
                work: '丁小飛校園日記1-時光膠囊的祕密',
                label: { zh: '丁小飛校園日記', en: "Ding Xiaofei's School Diary" },
              },
              { text: '1–4 冊' },
            ],
            en: [
              {
                work: '丁小飛校園日記1-時光膠囊的祕密',
                label: { zh: '丁小飛校園日記', en: "Ding Xiaofei's School Diary" },
              },
              { text: ', books 1–4' },
            ],
          },
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
          zh: '小兒子報告！沙發有黑洞',
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
          value: { zh: [{ text: '@tinachingting' }], en: [{ text: '@tinachingting' }] },
          href: 'https://www.facebook.com/tinachingting',
        },
        {
          label: { zh: '本站', en: 'This site' },
          value: {
            zh: [
              { text: '由孩子爸 ' },
              { href: MICHAEL_HUANG_URLS.zh, label: 'Michael S. Huang' },
              { text: ' 建立與維護' },
            ],
            en: [
              { text: 'Built and maintained by ' },
              { href: MICHAEL_HUANG_URLS.en, label: 'Michael S. Huang' },
            ],
          },
        },
      ],
      licenceTitle: { zh: '授權', en: 'Licence' },
      licence: {
        zh: '本站由郭瀞婷撰寫的文字以 CC BY 4.0 授權釋出，轉載請註明作者郭瀞婷與原始出處 tinakuobooks.com。書封、插畫與出版社文案的著作權屬原出版社與繪者所有，不在本授權範圍內。',
        en: 'Original text written for this site by Tina Kuo is released under CC BY 4.0; when reposting, credit the author and tinakuobooks.com. Covers, illustrations, and publisher copy remain the copyright of the original publishers and illustrators and are not covered by this licence.',
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
            zh: '英文摘要由本站翻譯，不是出版社發行的版本；其他語言請來信',
            en: 'English summaries on this site are our translations, not publisher-issued editions; for other languages, write to us',
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
          send: {
            zh: '信沒有送出，請稍後再試一次。',
            en: 'Your letter did not send. Please try again in a little while.',
          },
          captcha: {
            zh: '請先完成「我不是機器人」驗證，再送出一次。',
            en: 'Please complete the “I am human” check, then send again.',
          },
        },
        summaryTitle: { zh: '還有幾處需要補充：', en: 'A few things still need filling in:' },
        submit: { zh: '送出這封信', en: 'Send the letter' },
        sending: { zh: '正在送出…', en: 'Sending…' },
        note: {
          zh: '送出後會直接寄到作者信箱。',
          en: "Sends straight to the author's inbox.",
        },
        successTitle: { zh: '信已經寄出了', en: 'The letter is on its way' },
        successBody: (who, topic) =>
          `${who}，你的「${topic}」已經寄出，作者會在 3 個工作日內回覆你。`,
        again: { zh: '再寫一封', en: 'Write another' },
      },
    },
    footer: {
      brand: { zh: '郭瀞婷 Tina Kuo · 台北', en: 'Tina Kuo · Taipei' },
      legal: (year) => [
        { text: `© ${year} 郭瀞婷 · 由 ` },
        { href: MICHAEL_HUANG_URLS.zh, label: 'Michael S. Huang' },
        { text: ' 建立 · 本站原創文字以 CC BY 4.0 授權' },
      ],
      links: [
        { label: { zh: '作品', en: 'Works' }, href: '/works' },
        { label: { zh: '主題', en: 'Collections' }, href: '/collections' },
        { label: { zh: '關於', en: 'About' }, href: '/about/' },
        { label: { zh: 'English', en: '中文' }, href: '/en' },
        { label: { zh: 'RSS', en: 'RSS' }, href: '/feed.xml' },
        { label: { zh: '隱私權', en: 'Privacy' }, href: '/privacy' },
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
      title: { zh: '十六部作品，五種讀法', en: 'Sixteen works, five ways to read' },
      lead: {
        zh: '繪本、橋梁書、校園日記、青少年小說、舞台劇——同一個說故事的人，換了五種聲調。點開封面，看簡介、適讀年齡和出版資訊。',
        en: 'Picture books, early chapter books, school diaries, young adult novels, a stage play — one storyteller, five voices. Open a cover for the synopsis, reading age, and publication details.',
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
        language: { zh: '語言', en: 'Language' },
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
      cards: readingCards,
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
          zh: [
            {
              text: '整天跟可愛又好動小女兒鬥志，偶爾會發呆，但一有空就衝回電腦敲出幾頁要留給孩子以後讀的故事。',
            },
          ],
          en: [
            {
              text: "Spends her days keeping up with a cute and endlessly energetic little daughter. She stares into space now and then, but the moment she has a free minute she rushes back to the keyboard to type out a few more pages of stories for her children to read in years to come.",
            },
          ],
        },
        {
          zh: [
            { text: '這個網站由孩子爸 ' },
            { href: MICHAEL_HUANG_URLS.zh, label: 'Michael S. Huang' },
            { text: ' 建立：收錄心愛老婆郭瀞婷的作品，也用他的方式把她的故事延伸出去。' },
          ],
          en: [
            { text: "This site was built by the kids' dad, " },
            { href: MICHAEL_HUANG_URLS.en, label: 'Michael S. Huang' },
            {
              text: ": a home for his beloved wife Tina Kuo's work, and his own way of carrying her stories further.",
            },
          ],
        },
      ],
      timelineTitle: { zh: '創作年表', en: 'Timeline' },
      timeline: [
        {
          year: '2026',
          text: {
            zh: [{ work: '胡阿布偵探事件簿-誰綁架了黑總統' }],
            en: [{ work: '胡阿布偵探事件簿-誰綁架了黑總統' }],
          },
        },
        {
          year: '2023',
          text: {
            zh: [
              { work: '機器人宅急便2-能寄勇氣嗎' },
              { text: '、' },
              { work: '丁小飛校園日記5-我要成為YouTuber' },
            ],
            en: [
              { work: '機器人宅急便2-能寄勇氣嗎' },
              { text: '; ' },
              { work: '丁小飛校園日記5-我要成為YouTuber' },
            ],
          },
        },
        {
          year: '2022',
          text: {
            zh: [{ work: '機器人宅急便1-什麼都可以寄' }],
            en: [{ work: '機器人宅急便1-什麼都可以寄' }],
          },
        },
        {
          year: '2021',
          text: {
            zh: [{ text: '依' }, { work: '57號小豹' }, { text: '手繪的著色本上線，開放下載' }],
            en: [
              { text: 'A coloring book drawn from ' },
              { work: '57號小豹' },
              { text: ' goes online as a free download' },
            ],
          },
        },
        {
          year: '2020',
          text: {
            zh: [
              { work: '小兒子報告-沙發有黑洞' },
              { text: '舞台劇、' },
              {
                work: '動物星球偵探事件簿2-推理要在放學後',
                label: { zh: '動物星球偵探事件簿2', en: 'Animal Planet Detective Files 2' },
              },
              { text: '、' },
              { work: '57號小豹' },
            ],
            en: [
              { work: '小兒子報告-沙發有黑洞' },
              { text: ' on stage; ' },
              {
                work: '動物星球偵探事件簿2-推理要在放學後',
                label: { zh: '動物星球偵探事件簿2', en: 'Animal Planet Detective Files 2' },
              },
              { text: '; ' },
              { work: '57號小豹' },
            ],
          },
        },
        {
          year: '2019',
          text: {
            zh: [
              { work: '記憶邊境-河川-火林-烏雲光' },
              { text: '、' },
              { work: '動物星球偵探事件簿' },
            ],
            en: [
              { work: '記憶邊境-河川-火林-烏雲光' },
              { text: '; ' },
              { work: '動物星球偵探事件簿' },
            ],
          },
        },
        {
          year: '2018',
          text: {
            zh: [{ work: '暗號偵探社' }],
            en: [{ work: '暗號偵探社' }],
          },
        },
        {
          year: '2017',
          text: {
            zh: [
              {
                work: '丁小飛校園日記1-時光膠囊的祕密',
                label: { zh: '丁小飛校園日記', en: "Ding Xiaofei's School Diary" },
              },
              { text: '1–4 冊' },
            ],
            en: [
              {
                work: '丁小飛校園日記1-時光膠囊的祕密',
                label: { zh: '丁小飛校園日記', en: "Ding Xiaofei's School Diary" },
              },
              { text: ', books 1–4' },
            ],
          },
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
          zh: '小兒子報告！沙發有黑洞',
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
          value: { zh: [{ text: '@tinachingting' }], en: [{ text: '@tinachingting' }] },
          href: 'https://www.facebook.com/tinachingting',
        },
        {
          label: { zh: '本站', en: 'This site' },
          value: {
            zh: [
              { text: '由孩子爸 ' },
              { href: MICHAEL_HUANG_URLS.zh, label: 'Michael S. Huang' },
              { text: ' 建立與維護' },
            ],
            en: [
              { text: 'Built and maintained by ' },
              { href: MICHAEL_HUANG_URLS.en, label: 'Michael S. Huang' },
            ],
          },
        },
      ],
      licenceTitle: { zh: '授權', en: 'Licence' },
      licence: {
        zh: '本站由郭瀞婷撰寫的文字以 CC BY 4.0 授權釋出，轉載請註明作者郭瀞婷與原始出處 tinakuobooks.com。書封、插畫與出版社文案的著作權屬原出版社與繪者所有，不在本授權範圍內。',
        en: 'Original text written for this site by Tina Kuo is released under CC BY 4.0; when reposting, credit the author and tinakuobooks.com. Covers, illustrations, and publisher copy remain the copyright of the original publishers and illustrators and are not covered by this licence.',
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
            zh: '英文摘要由本站翻譯，不是出版社發行的版本；其他語言請來信',
            en: 'English summaries on this site are our translations, not publisher-issued editions; for other languages, write to us',
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
          send: {
            zh: '信沒有送出，請稍後再試一次。',
            en: 'Your letter did not send. Please try again in a little while.',
          },
          captcha: {
            zh: '請先完成「我不是機器人」驗證，再送出一次。',
            en: 'Please complete the “I am human” check, then send again.',
          },
        },
        summaryTitle: { zh: '還有幾處需要補充：', en: 'A few things still need filling in:' },
        submit: { zh: '送出這封信', en: 'Send the letter' },
        sending: { zh: '正在送出…', en: 'Sending…' },
        note: {
          zh: '送出後會直接寄到作者信箱。',
          en: "Sends straight to the author's inbox.",
        },
        successTitle: { zh: '信已經寄出了', en: 'The letter is on its way' },
        successBody: (who, topic) =>
          `${who}, your “${topic}” note is on its way. The author will reply within 3 working days.`,
        again: { zh: '再寫一封', en: 'Write another' },
      },
    },
    footer: {
      brand: { zh: '郭瀞婷 Tina Kuo · 台北', en: 'Tina Kuo · Taipei' },
      legal: (year) => [
        { text: `© ${year} Tina Kuo · Site by ` },
        { href: MICHAEL_HUANG_URLS.en, label: 'Michael S. Huang' },
        { text: ' · Original site text under CC BY 4.0' },
      ],
      links: [
        { label: { zh: '作品', en: 'Works' }, href: '/en/works' },
        { label: { zh: '主題', en: 'Collections' }, href: '/en/collections' },
        { label: { zh: '關於', en: 'About' }, href: '/en/about' },
        { label: { zh: 'English', en: '中文' }, href: '/' },
        { label: { zh: 'RSS', en: 'RSS' }, href: '/en/feed.xml' },
        { label: { zh: '隱私權', en: 'Privacy' }, href: '/en/privacy' },
      ],
    },
  },
}
