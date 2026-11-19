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
  art: PortfolioArt
}

export const featuredSlug = '暗號偵探社'

export const portfolioWorks: PortfolioEntry[] = [
  {
    slug: "胡阿布偵探事件簿-誰綁架了黑總統",
    category: 'young-adult-fiction',
    art: { src: "/images/book-cover-胡阿布偵探事件簿.webp", width: 1000, height: 1389 },
  },
  {
    slug: "丁小飛校園日記5-我要成為YouTuber",
    category: 'funny-fiction',
    art: { src: "/images/book-cover-丁小飛校園日記5-我要成為YouTuber.webp", width: 1000, height: 1401 },
  },
  {
    slug: "機器人宅急便2-能寄勇氣嗎",
    category: 'bridge-books',
    art: { src: "/images/book-cover-機器人宅急便2.webp", width: 1000, height: 1373 },
  },
  {
    slug: "機器人宅急便1-什麼都可以寄",
    category: 'bridge-books',
    art: { src: "/images/book-cover-機器人宅急便1.webp", width: 1000, height: 1372 },
  },
  {
    slug: '小兒子報告-沙發有黑洞',
    category: 'stage-performance',
    art: { src: '/images/portfolio/work-sofa-poster.webp', width: 763, height: 1080 },
  },
  {
    slug: '57號小豹',
    category: 'picture-book',
    art: { src: '/images/book-cover-57號小豹-portrait.webp', width: 1000, height: 1400 },
  },
  {
    slug: '動物星球偵探事件簿2-推理要在放學後',
    category: 'young-adult-fiction',
    art: { src: '/images/portfolio/work-animal-2.webp', width: 626, height: 881 },
  },
  {
    slug: '記憶邊境-河川-火林-烏雲光',
    category: 'young-adult-fiction',
    art: { src: '/images/portfolio/work-memory-border.webp', width: 635, height: 900 },
  },
  {
    slug: '動物星球偵探事件簿',
    category: 'young-adult-fiction',
    art: { src: '/images/portfolio/work-animal-1.webp', width: 445, height: 641 },
  },
  {
    slug: '暗號偵探社',
    category: 'young-adult-fiction',
    art: { src: '/images/book-cover-暗號偵探社.webp', width: 1400, height: 1811 },
  },
  {
    slug: '丁小飛校園日記4-聰明眼鏡',
    category: 'funny-fiction',
    art: { src: '/images/portfolio/work-ding-4.webp', width: 284, height: 406 },
  },
  {
    slug: '丁小飛校園日記3-副班長爭奪戰',
    category: 'funny-fiction',
    art: { src: '/images/portfolio/work-ding-3.webp', width: 289, height: 417 },
  },
  {
    slug: '丁小飛校園日記2-誰是最佳小隊長',
    category: 'funny-fiction',
    art: { src: '/images/portfolio/work-ding-2.webp', width: 290, height: 418 },
  },
  {
    slug: '丁小飛校園日記1-時光膠囊的祕密',
    category: 'funny-fiction',
    art: { src: '/images/portfolio/work-ding-1.webp', width: 637, height: 900 },
  },
  {
    slug: "你願不願意做我最好的朋友",
    category: 'picture-book',
    art: { src: "/images/book-cover-你願不願意做我最好的朋友.webp", width: 200, height: 280 },
  },
  {
    slug: "天使工廠",
    category: 'picture-book',
    art: { src: "/images/book-cover-天使工廠.webp", width: 424, height: 580 },
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
  { id: 'bridge-books', label: { zh: '橋梁書', en: 'Early chapter books' } },
  { id: 'young-adult-fiction', label: { zh: '推理與奇想', en: 'Mystery & fantasy' } },
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
    age: { zh: '小學低年級', en: 'Early elementary' },
    title: { zh: '從看圖到自己讀一章', en: 'From looking at pictures to reading a chapter' },
    body: {
      zh: [{ text: '和孩子讀《57號小豹》時，可以請孩子先說說圖上發生了什麼。想試著自己讀一章，可以從芭拉和比利接到第一件包裹的故事開始。' }],
      en: [{ text: 'With Little Leopard No. 57, let children tell you what’s happening in the picture before you read the words. If they’re ready to try a chapter on their own, start with Bala and Billy’s first delivery.' }],
    },
    prompts: [
      {
        zh: '你會在包著冰塊的箱子上寫什麼提醒？',
        en: 'What warning would you write on a box with a block of ice in it?',
      },
    ],
    books: {
      zh: [{ work: '57號小豹' }, { text: '、' }, { work: '機器人宅急便1-什麼都可以寄' }],
      en: [{ work: '57號小豹' }, { text: ' or ' }, { work: '機器人宅急便1-什麼都可以寄' }],
    },
  },
  {
    age: { zh: '小學中年級', en: 'Grades 3–4' },
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
        zh: '丁小飛希望同學怎麼看他？他做了什麼讓你看出來？',
        en: 'How does Ding Xiaofei want his classmates to see him? What does he do that tells you so?',
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
        { text: '第一冊有六篇，第二冊有七篇。可以各挑一篇，讀到快揭曉時先停一下，說說現在最可疑的是誰。' },
      ],
      en: [
        { work: '動物星球偵探事件簿' },
        {
          text: ' has six stories in the first volume and seven in the second. Pick one, pause just before the reveal, and see whether you suspect the same character.',
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
        zh: '宋宥安重回記憶裡的時候，哪件事在他眼裡有了不同的意思？',
        en: 'When Song Youan goes back into a memory, what looks different to him this time?',
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
        zh: '繪本 · 橋梁書 · 小說 · 音樂劇',
        en: 'PICTURE BOOKS · EARLY CHAPTER BOOKS · FICTION · MUSICAL THEATRE',
      },
      name: { zh: '郭瀞婷', en: 'Tina Kuo' },
      subtitle: { zh: 'Tina Kuo · Taipei', en: '郭瀞婷 · Taipei' },
      lead: {
        zh: '可以從小豹的繪本開始，也可以陪丁小飛過一天，再走到關於記憶和告別的小說裡。這裡有給孩子和青少年的故事，也有陪讀時可以聊的話題。',
        en: 'Start with a little leopard, spend a school day with Ding Xiaofei, or pick up a novel about memory and loss. There are stories here for children and teens, and things to talk about with the adults reading alongside them.',
      },
      primaryCta: { zh: '看看作品', en: 'Explore the works' },
      secondaryCta: { zh: '出版、授權與學校邀約', en: "Rights & school enquiries" },
      stats: [
        { value: '', caption: { zh: '部作品', en: 'works' } },
        { value: '', caption: { zh: '個分類', en: 'categories' } },
        { value: '', caption: { zh: '年起的作品', en: 'first published' } },
      ],
    },
    feature: {
      label: { zh: '主推小說 · 2018', en: 'FEATURED NOVEL · 2018' },
      line: {
        zh: '爸媽沒說出口的事，藍芽想從日常裡找出答案。',
        en: 'Lanya looks for clues in the everyday things his parents leave unsaid.',
      },
      cta: { zh: '翻開這本書', en: 'Open this book' },
    },
    works: {
      eyebrow: { zh: 'The Works', en: 'The Works' },
      title: { zh: '作品書架', en: 'Browse the works' },
      lead: {
        zh: '點開封面，就能看到故事簡介、適讀年齡和完整作品頁。',
        en: 'Open a cover for a short introduction, reading guidance and a link to the full work page.',
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
        zh: '可以依孩子現在想讀的故事挑一本，再從角色遇到的事聊起。',
        en: "Pick a story that suits what your reader is in the mood for, and start with something that happens to a character.",
      },
      cards: readingCards,
    },
    about: {
      eyebrow: { zh: 'About the Author', en: 'About the Author' },
      caption: { zh: '台北，台灣', en: 'Taipei, Taiwan' },
      name: { zh: '郭瀞婷 Tina Kuo', en: 'Tina Kuo' },
      paragraphs: [
        {
          zh: [
            {
              text: '整天跟可愛又好動的小女兒鬥智，偶爾會發呆，但一有空就衝回電腦敲出幾頁要留給孩子以後讀的故事。',
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
          zh: '取材自駱以軍《小兒子》的親子音樂劇。哥哥阿白意外掉進黑洞，一家人只好把客廳的沙發當成太空船。',
          en: "A family musical based on Luo Yijun's Little Son. After A-Bai falls into a black hole, the family sofa has to do duty as a spaceship.",
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
          zh: '家裡小妹照著 57 號小豹的造型畫了幾張線稿，由孩子爸整理成可以列印的著色本。',
          en: "Michael put together this printable colouring book from pages his younger sister drew of Little Leopard No. 57.",
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
        zh: '本站原創介紹文字採 CC BY 4.0 授權。轉載時請註明撰文者與出處 tinakuobooks.com。使用書籍內文、封面、插畫或劇照，請向權利人洽詢。',
        en: 'Original editorial text on this site is available under CC BY 4.0. Credit the writer and tinakuobooks.com when reusing it. For book text, covers, illustrations or production images, contact the relevant rights holder.',
      },
      usageTitle: { zh: '作品使用', en: 'Using the work' },
      usage: [
        {
          label: { zh: '教學', en: 'Teaching' },
          text: {
            zh: '可依本站原創介紹的授權使用文字。若要使用書中內容作為教材，請先洽詢。',
            en: 'Use the site introductions under their licence. Get in touch about using material from the books in class.',
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
            zh: '本站提供英文作品介紹。若要洽詢翻譯出版，請來信註明書名、語種與地區。',
            en: 'The site includes English introductions. For translation rights, please send the title, language and territory.',
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
        { text: ' 建立 · 原創介紹文字採 CC BY 4.0 授權' },
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
        zh: '繪本 · 橋梁書 · 小說 · 音樂劇',
        en: 'PICTURE BOOKS · EARLY CHAPTER BOOKS · FICTION · MUSICAL THEATRE',
      },
      name: { zh: '郭瀞婷', en: 'Tina Kuo' },
      subtitle: { zh: 'Tina Kuo · Taipei', en: '郭瀞婷 · Taipei' },
      lead: {
        zh: '可以從小豹的繪本開始，也可以陪丁小飛過一天，再走到關於記憶和告別的小說裡。這裡有給孩子和青少年的故事，也有陪讀時可以聊的話題。',
        en: 'Start with a little leopard, spend a school day with Ding Xiaofei, or pick up a novel about memory and loss. There are stories here for children and teens, and things to talk about with the adults reading alongside them.',
      },
      primaryCta: { zh: '看看作品', en: 'Explore the works' },
      secondaryCta: { zh: '出版、授權與學校邀約', en: "Rights & school enquiries" },
      stats: [
        { value: '', caption: { zh: '部作品', en: 'works' } },
        { value: '', caption: { zh: '個分類', en: 'categories' } },
        { value: '', caption: { zh: '年起的作品', en: 'first published' } },
      ],
    },
    feature: {
      label: { zh: '主推小說 · 2018', en: 'FEATURED NOVEL · 2018' },
      line: {
        zh: '爸媽沒說出口的事，藍芽想從日常裡找出答案。',
        en: 'Lanya looks for clues in the everyday things his parents leave unsaid.',
      },
      cta: { zh: '翻開這本書', en: 'Open this book' },
    },
    works: {
      eyebrow: { zh: 'The Works', en: 'The Works' },
      title: { zh: '作品書架', en: 'Browse the works' },
      lead: {
        zh: '點開封面，就能看到故事簡介、適讀年齡和完整作品頁。',
        en: 'Open a cover for a short introduction, reading guidance and a link to the full work page.',
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
        zh: '可以依孩子現在想讀的故事挑一本，再從角色遇到的事聊起。',
        en: "Pick a story that suits what your reader is in the mood for, and start with something that happens to a character.",
      },
      cards: readingCards,
    },
    about: {
      eyebrow: { zh: 'About the Author', en: 'About the Author' },
      caption: { zh: '台北，台灣', en: 'Taipei, Taiwan' },
      name: { zh: '郭瀞婷 Tina Kuo', en: 'Tina Kuo' },
      paragraphs: [
        {
          zh: [
            {
              text: '整天跟可愛又好動的小女兒鬥智，偶爾會發呆，但一有空就衝回電腦敲出幾頁要留給孩子以後讀的故事。',
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
          zh: '取材自駱以軍《小兒子》的親子音樂劇。哥哥阿白意外掉進黑洞，一家人只好把客廳的沙發當成太空船。',
          en: "A family musical based on Luo Yijun's Little Son. After A-Bai falls into a black hole, the family sofa has to do duty as a spaceship.",
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
          zh: '家裡小妹照著 57 號小豹的造型畫了幾張線稿，由孩子爸整理成可以列印的著色本。',
          en: "Michael put together this printable colouring book from pages his younger sister drew of Little Leopard No. 57.",
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
        zh: '本站原創介紹文字採 CC BY 4.0 授權。轉載時請註明撰文者與出處 tinakuobooks.com。使用書籍內文、封面、插畫或劇照，請向權利人洽詢。',
        en: 'Original editorial text on this site is available under CC BY 4.0. Credit the writer and tinakuobooks.com when reusing it. For book text, covers, illustrations or production images, contact the relevant rights holder.',
      },
      usageTitle: { zh: '作品使用', en: 'Using the work' },
      usage: [
        {
          label: { zh: '教學', en: 'Teaching' },
          text: {
            zh: '可依本站原創介紹的授權使用文字。若要使用書中內容作為教材，請先洽詢。',
            en: 'Use the site introductions under their licence. Get in touch about using material from the books in class.',
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
            zh: '本站提供英文作品介紹。若要洽詢翻譯出版，請來信註明書名、語種與地區。',
            en: 'The site includes English introductions. For translation rights, please send the title, language and territory.',
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
        { text: ' · Original editorial text under CC BY 4.0' },
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
