# Rewrite the works pages from authored catalogue copy

## Context

`docs/works-catalog.md` holds sourced, self-written `summary_zh` / `summary_en` and verified bibliographic data for all 16 works, but the live pages still run publisher, retailer, and production copy: the audit in `specs/original_contents_v2.md` measured 9 of 13 checkable bodies as ≥70 % retailer text against their books.com.tw product pages, 10 of 16 pages below 50/100; no work page names its illustrator; one English body stops mid-sentence; the licence line claims CC BY 4.0 over text the author does not own. Two 6–10 bridge books also sit in the Young Adult collection.

Deliverable: rewrite all 17 Chinese and 17 English work files from the catalogue's authored summaries; add bibliographic facts to the Chinese frontmatter and render them, plus a parents/teachers block, on every work page; carry the facts into JSON-LD; fix the taxonomy, credits, and licence claims. No audit report, no new docs, no `docs/*.html`.

Decisions already taken (do not re-open): facts live in Chinese frontmatter and render as a panel; each page gets one content note and two discussion questions; 機器人宅急便 moves to a new `bridge-books` collection; the colouring PDF stays and is credited; no provenance footnote on pages.

`docs/works-catalog.md` is not edited and stays the research record. Runtime facts live in the work files only: the site never reads the catalogue at request or render time. The one exception is `scripts/validate-content.ts`, which diffs frontmatter against those YAML fences during `prebuild` so a transcription slip fails the build instead of shipping.

## Approach

Ordered so `pnpm build` and `pnpm test:e2e` pass after each step. Do not batch steps, and do not reorder 2/3 — the collection ID must exist before the markdown references it, and the markdown collection and the portfolio `category` must change in the same step or `scripts/validate-content.ts` fails.

### 1. Facts data model and loader

Create `lib/work-facts.ts` (no equivalent exists; `lib/works.ts` carries title/description/body only). Import `Localized` and `Locale` from `@/lib/i18n`.

```ts
export type PublishPrecision = 'day' | 'month' | 'year'
export type WorkStatus = '在版' | '絕版'
export type WorkEdition = { label: string; date: string; note: string }
export type WorkCredits = {
  role: string            // 文 | 文·圖 | 合著 | 故事構成 | 繪
  illustrator: string
  coAuthors: string[]
  playwrights: string[]
  adaptationSource: string
}
export type TitleStatus = 'verified-existing' | 'official' | 'proposed'
export type WorkFacts = {
  kind: string            // 繪本 | 橋梁書 | 小說 | 選集 | 音樂劇 | 著色本
  ageBand: string         // exact catalogue label
  titleStatus: TitleStatus // English title provenance; the EN file records it
  publisher: string
  publishedPrecision: PublishPrecision
  isbn: string
  format: string          // 精裝 | 平裝 | ''
  pages: number | null
  printing: string        // 全彩印刷 | 雙色印刷 | 單色印刷 | ''
  series: string
  seriesPosition: number | null
  seriesTotal: number | null
  status: WorkStatus
  statusNote: Localized<string>
  awards: string[]
  editions: WorkEdition[]
  credits: WorkCredits
  contentNote: Localized<string>
  discussion: Localized<string[]>
}
```

`statusNote` is `Localized<string>` because it prints on English pages too: a Chinese-only caveat would render `In print（紙本缺貨，電子書在售）`. `titleStatus` drives the site-translation notice: six works are `proposed` (胡阿布, 丁小飛5, 機器人宅急便 1–2, 你願不願意, 天使工廠), ten are `verified-existing`.

Term dictionaries plus one lookup:

```ts
export const workTerms = {
  kind: { 繪本: 'Picture book', 橋梁書: 'Early chapter book', 小說: 'Novel',
          選集: 'Anthology', 音樂劇: 'Musical', 著色本: 'Coloring book' },
  ageBand: { 學前至低年級: 'Preschool–grade 2',
             學前至低年級（親子共讀）: 'Preschool–grade 2, read together',
             小學低中年級（橋梁書）: 'Grades 1–4',
             小學中年級: 'Grades 3–4',
             小學中年級以上: 'Grade 3 and up',
             小學中年級以上（10–12 歲）: 'Grades 3–4 (ages 10–12)',
             小學高年級以上: 'Grade 5 and up',
             '10 歲以上': 'Ages 10+',
             國中以上: 'Ages 12+',
             親子共賞: 'Family audiences' },
  format: { 精裝: 'Hardcover', 平裝: 'Paperback' },
  printing: { 全彩印刷: 'Full colour', 雙色印刷: 'Two-colour', 單色印刷: 'One-colour' },
  role: { 文: 'Text', '文·圖': 'Text and illustrations', 合著: 'Co-author',
          故事構成: 'Story structure', 繪: 'Illustrations' },
  status: { 在版: 'In print', 絕版: 'Out of print' },
} as const

export type WorkTermGroup = keyof typeof workTerms

export function term(group: WorkTermGroup, value: string, locale: Locale): string {
  const table = workTerms[group] as Record<string, string>
  return (locale === 'en' ? table[value] : value) ?? value
}
```

Unknown values pass through unchanged; step 4's validation is what rejects them.

In `lib/works.ts`:
- add `facts: WorkFacts` to `Work`;
- extend `ZhFrontMatter` with `kind`, `ageBand`, `publisher`, `publishedPrecision`, `isbn`, `format`, `pages`, `printing`, `series`, `seriesPosition`, `seriesTotal`, `status`, `statusNote`, `awards`, `editions`, `credits`, `contentNote`, `discussion`; extend `EnFrontMatter` with `titleStatus`, `statusNote`, `contentNote`, `discussion`;
- build `WorkFacts` in `loadWorks()`: Chinese values from the Chinese file; `statusNote` / `contentNote` / `discussion` from each locale's own file, falling back to the Chinese value when the English file omits them; `titleStatus` from the English file, default `'proposed'`;
- treat every new key as optional with neutral defaults (`''`, `null`, `[]`, `'day'`, `'在版'`, `'proposed'`) so the tree builds before step 3 lands.

Coercion: `pages` / `seriesPosition` / `seriesTotal` accept a number or a numeric string, else `null`; `format` / `printing` keep only strings present in `workTerms`, else `''`; `editions` keeps only objects with string `label`, `date`, `note`; `awards` keeps only `string[]`.

### 2. Add the `bridge-books` collection

No work points at it yet, so the tree stays green.

- `content/collections.ts`: add `'bridge-books'` to `CollectionId`; insert the entry after `picture-book`:
  `{ id: 'bridge-books', name: { zh: '橋梁書', en: 'Early Chapter Books' }, description: { zh: '從繪本到長篇的橋梁', en: 'The bridge from picture books to novels' }, cover: '/images/collection-bridge-books.webp', accent: 'var(--collection-bridge)' }`.
- `app/globals.css`: add `--collection-bridge: #3f6b63;` after `--collection-picture`.
- Asset: fetch a Pexels photo and record it like the other five. Verified this session: `https://images.pexels.com/photos/8499572/pexels-photo-8499572.jpeg?auto=compress&cs=tinysrgb&w=1600` (photo 8499572, RDNE Stock project — children reading at tables in a school library; 1600×1067, same 3:2 as the existing tiles). Save as `assets/source-images/stock/collection-bridge-books.jpg`, run `pnpm images` (writes `/public/images/collection-bridge-books.webp`), and add this line to the provenance comment above the array, matching the existing format: `//   bridge-books         8499572   RDNE Stock project — children reading at tables in a school library`. Do not promote `tags.jpg`: it and the other seven loose stock files carry no recorded source, and every collection cover in that comment block does.
- Copy that counts the collection list changes here, in the same commit as the new tile: `app/(zh)/collections/page.tsx` lead → `六個主題，六種閱讀的方式。挑一個喜歡的，讓故事繼續延伸。` and its metadata description → `依主題瀏覽郭瀞婷的作品：愛搞笑、青少、繪本、橋梁書、戲劇與故事延伸。`; `app/(en)/en/collections/page.tsx` lead → `Six collections, six ways to read. Pick one and let the story continue.` and its description → `Browse Tina Kuo works by collection: funny fiction, young adult fiction, picture books, early chapter books, stage performance, and story continuations.` The hero's “四種讀法” stays until step 3, because the portfolio chips still number four.

### 3. Rewrite the content files

Every file in `content/works/zh/` and `content/works/en/` gets a new body and new frontmatter. This step also carries the portfolio changes that validation ties to the markdown (`category`), because `entry.category` must equal `work.collectionId`.

**Chinese frontmatter** — keep the keys `title`, `description`, `date`, `author`, `collection`, `languages`, `cover`; set `title` to the catalogue's `title_zh` and replace `description` with the table's zh line; add the step-1 keys. Values come from the matching `### <title>` entry in `docs/works-catalog.md`; copy, do not re-research.

Normalisations:
- `publishedPrecision` ← `date_precision`.
- Split `binding_pages` on `" / "`: `精裝 / 30 頁 / 全彩印刷` → `format: 精裝`, `pages: 30`, `printing: 全彩印刷`. Strip `頁`. Drop parentheticals from `printing` (`雙色印刷（二版）` → `雙色印刷`; the edition is already recorded in `editions`). Empty `binding_pages` → `''`, `null`, `''`.
- `credits` ← `role`; `illustrator` ← `illustrators[0]` (for 你願不願意 and 天使工廠 that is `郭瀞婷`; for 小兒子 it is `''`); `coAuthors` ← `contributors` when `role: 合著`; `playwrights` ← `contributors` when `kind: 音樂劇`; `adaptationSource` is `駱以軍《小兒子》` only for `小兒子報告-沙發有黑洞`, else `''`.
- `statusNote` ← the availability caveat, in the author's words, only where it changes the meaning: 丁小飛1 and 丁小飛5 zh `紙本缺貨，電子書在售` / en `paper out of stock; e-book available`; 天使工廠 zh `紙本供貨未確認，電子書由華品文創發行` / en `paper availability unconfirmed; e-book from 華品文創`; `''` elsewhere. Each file stores a plain string — Chinese in the zh file, English in the en file — and `loadWorks()` pairs them into the `Localized<string>`; a Chinese parenthesis on `/en/works/…` is the defect this avoids.
- `seriesPosition` / `seriesTotal`, use exactly: 丁小飛1–5 → 1–5 of 5; 機器人宅急便1–2 → 1–2 of 2; 動物星球偵探事件簿 and its sequel → 1–2 of 2; 胡阿布偵探事件簿 → `''`/`''` (series recorded, single volume, no number in the title); everything else `''`/`''`.
- `editions` ← each catalogue edition's `label`, `date`, `note` verbatim, in catalogue order; drop its `publisher` and `isbn` (not in `WorkEdition`).
- `awards` ← the catalogue `awards` list verbatim, same order.
- 天使工廠 keeps `date: "2009-01-01"` (frontmatter and `datePublished` need a full date) with `publishedPrecision: year`.
- 機器人宅急便1 and 2: `collection: bridge-books`.
- 動物星球偵探事件簿2: `title: "動物星球偵探事件簿2：推理要在放學後"`.
- 小兒子報告-沙發有黑洞: `title: "小兒子報告！沙發有黑洞"`.

**English frontmatter** — keep the keys `title`, `description`, `slug`; replace `description` with the table's en line; add `titleStatus` (copy the catalogue's `title_en_status` for that work), `statusNote` (English, matching the zh caveat), `contentNote` and `discussion`. Delete the two stray trailing blank lines in `content/works/en/記憶邊境-河川-火林-烏雲光.md`.

**Portfolio changes in this same step** (`content/portfolio.ts`):
- add `'bridge-books'` to the `PortfolioCategory` union, then set `categoryChips` to exactly, in this order: `[{ id: 'all', label: { zh: '全部', en: 'All' } }, { id: 'picture-book', label: { zh: '繪本', en: 'Picture books' } }, { id: 'bridge-books', label: { zh: '橋梁書', en: 'Early chapter books' } }, { id: 'funny-fiction', label: { zh: '愛搞笑', en: 'Funny' } }, { id: 'young-adult-fiction', label: { zh: '青少', en: 'YA' } }, { id: 'stage-performance', label: { zh: '戲劇', en: 'Stage' } }]` — sentence case for chips, matching the existing `Picture books` / `Funny` pattern; the tile keeps Title Case like `Picture Book`.
- set `category: 'bridge-books'` on 機器人宅急便1 and 2;
- replace the stage title in **both** locale blocks: `story.stage.title` at line 774 and line 1171 (each block repeats it) → `zh: '小兒子報告！沙發有黑洞'` / `en: 'Little Son Report! The Sofa Has a Black Hole'`. Both occurrences carry the half-width `!` today; the English string is unchanged.
- hero copy, both locale blocks: `works.title` → `十六部作品，五種讀法` / `Sixteen works, five ways to read` (keep the count); `works.lead` → zh `繪本、橋梁書、校園日記、青少年小說、舞台劇——同一個說故事的人，換了五種聲調。點開封面，看簡介、適讀年齡和出版資訊。`, en `Picture books, early chapter books, school diaries, young adult novels, a stage play — one storyteller, five voices. Open a cover for the synopsis, reading age, and publication details.` Step 7 removes the excerpts, so no page may promise a passage from the book.
- `app/(zh)/works/page.tsx` lead → `從愛搞笑的校園日記到橋梁書、青少年小說、繪本與戲劇，這裡收錄了郭瀞婷的每一部作品。`; `app/(en)/en/works/page.tsx` lead → `From slapstick school diaries to early chapter books, young adult novels, picture books, and stage adaptations — every work by Tina Kuo in one place.` Both pages render the new 橋梁書 chip, so their leads must name it.
- `portfolioWorks`: three `tagline` values quote a publisher line verbatim and must be rewritten — measured against each work's own page and `tagline_zh`: 記憶邊境 (17 characters of 17), 57號小豹 (11 of 22: `如果那個「不一樣」是你喜歡`), 丁小飛3 (10 of 16). Use exactly:
  記憶邊境-河川-火林-烏雲光 → zh `一場車禍把他送到生死邊境，三次機會改寫一段記憶。` / en `A crash leaves him at the border of life and death, with three chances to rewrite one memory.`
  57號小豹 → zh `一隻不想被看見的豹，最後得面對自己身上的「不一樣」。` / en `A leopard that would rather not be seen ends up facing what makes it different.`
  丁小飛校園日記3-副班長爭奪戰 → zh `為了副班長，他開始對最好的朋友動手腳。` / en `To win the deputy post, he starts playing tricks on his best friend.`
  Leave the other thirteen unchanged; Verification step 4 re-measures all sixteen. 動物星球2's `放學後，開始推理。` overlaps its publisher text only through the book's own title (`推理要在放學後`), so it is not in the list.

**Body shape (both locales, every work):**

1. Paragraph 1 is the catalogue's `summary_zh` (Chinese file) / `summary_en` (English file), verbatim apart from whitespace. No publisher blurb survives.
2. Paragraph 2 is one authored sentence naming the kind, the age band, and — when `series` is set — the position and count. Free wording, no shared template across pages. Series and imprint names stay in Chinese in both locales. Print the catalogue `ageBand` label verbatim except where a trailing parenthetical restates the kind on the same line — only `小學低中年級（橋梁書）` (機器人宅急便 1–2) qualifies, so those two write `小學低中年級` / `Grades 1–4`. Keep the `（親子共讀）` and `（10–12 歲）` parentheticals; they add information. Example: zh `橋梁書，小學低中年級適讀，是《機器人宅急便》系列的第一集，全系列共兩冊。` / en `An early chapter book for grades 1–4; book 1 of 2 in the 機器人宅急便 series.`
3. Paragraph 3 is one short sentence, only where the catalogue records a fact paragraph 1 leaves out:
   - 動物星球偵探事件簿 (vol 1): zh `六篇故事各自獨立，可以分開讀。` / en `The six stories stand alone and can be read in any order.` — vol 1's summary never says this; vol 2's already ends `每篇皆可獨立閱讀。`, so vol 2 gets nothing.
   - 著色本: the existing download line.
   Every other page stops after paragraph 2. 動物星球 1 and 2 lose their bulleted author lists because the co-authors now render in the panel's `合著` row, and 小兒子's production credit already sits inside `summary_zh`.

Hard rules:
- No `>` blockquotes anywhere. Delete every publisher pull-quote and the colouring post's quoted article; the storm.mg link stays as an inline link inside our own sentence.
- No bullet lists; the name lists and story pitches in 動物星球 1 and 2 are replaced by paragraph 1.
- No ending in anything you write. Paragraph 2, paragraph 3 and the description set up the premise and the choice; they never state how a book resolves. Paragraph 1 is the catalogue's authored summary and is exempt apart from the one override below — do not delete summary sentences to satisfy this rule.
- Chinese bodies 100–320 characters; English bodies 50–260 words. Measured today the shortest catalogue summaries are 75 zh characters (你願不願意) and 44 en words after the override, so a lower floor would be dead validation.
- English is written from the Chinese authored body, never from the old retailer translation. Glossary, used exactly: 丁小飛 Ding Xiaofei; 何李羅 He Li-Luo; 程友莘 Cheng Youshen; 金思高 Jin Sigao; 阿達 A-Da; 阿白 A-Bai; 阿甯咕 A-Ninggu; 端端 Duanduan; 藍芽 **Lanya** (never “Xiaoya”, never “小芽”); 雞腿俠 Chicken Drumstick Hero; 琪琪 Qiqi; 舒比 Shubi; 諾門 Nomen; 芭拉 Bala; 比利 Billy; 胡阿布 Hu Abu; 宋宥安 Song Youan; 郭瀞婷 Tina Kuo; 駱以軍 Luo Yijun.
- Co-author, illustrator, and playwright names stay in Chinese characters in both locales. Invent no romanisations.
- No sentence you write may contain a 12+ character run also present in that work's `tagline_zh`. The copied catalogue summary is the only place a shared run may survive, and only where it states plot: measured today that is 小兒子 (13 chars, `沙發號太空船進入黑洞異世界`); 機器人宅急便2 is 9 chars, under the threshold. Do not extend either.

**Sentence overrides.** Paragraph 1 is the catalogue summary verbatim except one sentence, which gives away the ending of a picture book whose whole point is the discovery:

| slug | catalogue sentence | replacement (zh) | replacement (en) |
|---|---|---|---|
| 57號小豹 | zh `牠開始模仿其他豹，甚至挖洞把自己藏起來，卻挖出一條通往園外的地道。` / en `It copies the other leopards and even digs a hole to hide in, only to dig a tunnel out of the zoo.` | `牠開始模仿其他豹，甚至挖洞把自己藏起來。` | `It copies the other leopards and even digs a hole to hide in.` |

Everything else in every summary stays verbatim, including 你願不願意's 注音 and CD: the retailer title itself records `(附CD)(中英對照)`, so both are sourced facts. The colouring page has no catalogue summary and is written from scratch.

**Description** (both locales; reused as meta/OG description and card blurb). Rules: one sentence, ≤ 70 Chinese characters / ≤ 40 English words (bounds measured against the catalogue's own opening sentences, max 73 zh / 39 en), never a reveal of the ending, and never a substring of paragraph 1 — `.detail-blurb` sits immediately above the body, so a copied sentence would render twice. Write exactly these:

| slug | description zh | description en |
|---|---|---|
| 胡阿布偵探事件簿-誰綁架了黑總統 | 黑猩猩總統憑空消失，狐狸偵探胡阿布第一次接到真正的大案。 | The chimpanzee president vanishes, and fox detective Hu Abu lands his first real case. |
| 丁小飛校園日記5-我要成為YouTuber | 同學都在直播，丁小飛也架起鏡頭，才發現做節目沒那麼簡單。 | Everyone in class is livestreaming, so Ding Xiaofei starts a channel and finds it is not so easy. |
| 機器人宅急便2-能寄勇氣嗎 | 有人要把「勇氣」寄給九十六歲的奶奶，可是勇氣看不見也摸不到。 | Someone wants courage delivered to a grandmother of ninety-six, but courage cannot be seen or held. |
| 機器人宅急便1-什麼都可以寄 | 二〇九九年，兩個被淘汰的機器人開了一間「什麼都可以寄」的店。 | In 2099, two cast-off robots open a shop that will deliver anything. |
| 小兒子報告-沙發有黑洞 | 哥哥躲進沙發底下的黑洞，弟弟和爸爸只好開太空船去把他找回來。 | A brother hides in a black hole under the sofa, so the family boards a spaceship to fetch him. |
| 57號小豹 | 一隻不想被看見的豹，該怎麼面對自己身上的「不一樣」？ | A leopard that would rather not be seen has to face what makes it different. |
| 動物星球偵探事件簿2-推理要在放學後 | 七位作家、七隻動物、七個放學後的謎團。 | Seven writers, seven animals, seven puzzles to solve after school. |
| 記憶邊境-河川-火林-烏雲光 | 二十六歲的宋宥安在車禍後醒來，發現自己站在生與死的邊境。 | Song Youan wakes after a crash to find himself standing at the border of life and death. |
| 動物星球偵探事件簿 | 六位作家各寫一則動物當家的偵探故事，胡阿布也在其中。 | Six writers, six detective stories with animals in charge — Hu Abu among them. |
| 暗號偵探社 | 一張離婚協議書，讓藍芽的夏天變成解謎現場。 | One divorce agreement turns Lanya's summer into a case to solve. |
| 丁小飛校園日記4-聰明眼鏡 | 為了不輸給同學，丁小飛說了一個關於限量眼鏡的謊。 | Not to lose to a classmate, Ding Xiaofei tells a lie about limited-edition glasses. |
| 丁小飛校園日記3-副班長爭奪戰 | 副班長的位子只有一個，丁小飛的好朋友卻也被提名了。 | There is only one deputy post, and Ding Xiaofei's best friend has been nominated too. |
| 丁小飛校園日記2-誰是最佳小隊長 | 夏令營裡處處有人比他強，丁小飛只能在話劇裡演一匹馬。 | At summer camp everyone outshines him, and Ding Xiaofei is cast as a horse. |
| 丁小飛校園日記1-時光膠囊的祕密 | 五十年後才打開的日記裡，丁小飛寫下了一個不能說的祕密。 | In a diary sealed for fifty years, Ding Xiaofei writes a secret he cannot say aloud. |
| 你願不願意做我最好的朋友 | 小狗舒比出發去找最好的朋友，一路上遇見猴子、大象和螃蟹。 | Puppy Shubi sets out to find a best friend and meets a monkey, an elephant, and a crab. |
| 天使工廠 | 烏龜諾門什麼都不快樂，直到「天使工廠」寄來一封信。 | Turtle Nomen is unhappy about everything, until a letter arrives from the Angel Factory. |
| 57號小豹著色本 | 依《57號小豹》造型手繪的著色頁，可下載列印。 | Hand-drawn colouring pages based on Little Leopard No. 57, free to download and print. |

These are drafts for the copy pass, not scripture: if one reads as a spoiler against the finished body, fix the sentence, not the table's rule.

**Content note and questions.** `contentNote` is the exact Chinese string below (`""` ⇒ the panel omits the note); English is a faithful translation of the same line. `discussion` is exactly these two Chinese questions in this order; English is their translation (second person, sentence case, ≤ 25 words each).

| slug | contentNote (zh) | question 1 | question 2 |
|---|---|---|---|
| 動物星球偵探事件簿 | 含街頭連續虐狗案與動物死亡的描述。 | 六篇故事裡，哪一個動物的處境最讓你放不下？ | 如果你是偵探，你會先問哪一個問題？ |
| 動物星球偵探事件簿2-推理要在放學後 | 含校園靈異、霸凌與寵物失蹤的情節。 | 七篇故事可以分開讀，你最想先讀哪一篇？ | 哪一篇的線索是你自己先看出來的？ |
| 記憶邊境-河川-火林-烏雲光 | 主要情節是車禍昏迷與生死抉擇，涉及死亡場景。 | 如果只能重返一段記憶，宋宥安應該選哪一段？ | 書裡的「邊境」，你覺得像什麼地方？ |
| 小兒子報告-沙發有黑洞 | 舞台劇，含親子衝突與短暫分離的情節。 | 如果你是阿甯咕，你會帶誰一起進黑洞？ | 這齣戲裡的大人，哪一句話你最想接下去說？ |
| 丁小飛校園日記2-誰是最佳小隊長 | 主題是夏令營競爭與同儕較勁。 | 丁小飛演「一隻馬」的時候，心裡在想什麼？ | 輸給比你強的人，你會怎麼做？ |
| 57號小豹 | 豹群以「被人類做成衣服或圍巾」嚇唬主角，含動物受害的想像。 | 57號小豹為什麼想把自己藏起來？ | 如果有人說你「太不一樣」，你想怎麼回答？ |
| 丁小飛校園日記1-時光膠囊的祕密 | 主題是暗戀與校園人際。 | 丁小飛想變成「有名的人」，出名能解決他的問題嗎？ | 程友莘畫的一個笑臉，為什麼讓他坐立難安？ |
| 丁小飛校園日記3-副班長爭奪戰 | 含嫉妒、排擠與對好友惡作劇的情節。 | 丁小飛對好朋友使了小手段，他該怎麼補救？ | 副班長和好朋友，你會選哪一個？ |
| 丁小飛校園日記4-聰明眼鏡 | 含說謊、被誣賴偷竊與同儕排擠的情節。 | 一句謊話為什麼會滾成一個雪球？ | 如果大家誤會你偷錢，你會怎麼說？ |
| 暗號偵探社 | 以父母的離婚協議書開場，涉及家庭衝突與逃學。 | 藍芽在爸爸桌上看到的只是一張紙，為什麼世界會崩塌？ | 這本書裡有哪些沒說出口的「暗號」？ |
| 天使工廠 | 主角長期不快樂，可作為情緒話題的引子。 | 諾門為什麼什麼都不快樂？ | 如果天使工廠寫信給你，信上會寫什麼？ |
| 你願不願意做我最好的朋友 | 全書中英對照，適合親子共讀。 | 舒比遇見的動物裡，誰最像好朋友？ | 你覺得「真正的」好朋友會做什麼、不會做什麼？ |
| 機器人宅急便1-什麼都可以寄 | 含被解僱與職場挫折的情節，以幽默方式呈現。 | 芭拉被解僱，是因為她做得太慢還是太認真？ | 如果什麼都能寄，你想寄什麼給誰？ |
| 機器人宅急便2-能寄勇氣嗎 | 含店面倒閉危機與被送回工廠的情節，以幽默方式呈現。 | 「勇氣」看不見也摸不到，你會怎麼寄？ | 三天內要保住店面，你會先做哪一件事？ |
| 丁小飛校園日記5-我要成為YouTuber | 主題是直播、同儕比較與兄弟鬥嘴。 | 丁小飛的頻道該拍什麼，才會有人想看？ | 如果影片沒人按讚，你還會繼續拍嗎？ |
| 胡阿布偵探事件簿-誰綁架了黑總統 | 含綁架案與權力鬥爭情節，動物角色互為獵食者與獵物。 | 三個短篇裡，哪一個真相最出乎意料？ | 真相之外那個「更難的抉擇」，你會怎麼選？ |
| 57號小豹著色本 | （空字串） | 你最想先塗哪一頁？ | 57號小豹身上的顏色，你想怎麼配？ |

**Colouring page (part of this step).** `content/works/zh/57號小豹著色本.md` and its English pair. Step 4 makes every field mandatory, so the file needs the full set, not just the interesting ones:

`kind: 著色本`, `ageBand: 學前至低年級`, `publisher: ""`, `publishedPrecision: day`, `isbn: ""`, `format: ""`, `pages: ""`, `printing: ""`, `series: ""`, `seriesPosition: ""`, `seriesTotal: ""`, `status: 在版`, `statusNote: ""`, `awards: []`, `editions: []`, `credits: { role: 繪, illustrator: 家裡小妹, coAuthors: [], playwrights: [], adaptationSource: "" }`, `contentNote: ""`, and the two `discussion` questions from the table. English file: `titleStatus: proposed`, `statusNote: ""`, `contentNote: ""`, plus the English questions and the translated body. New body per the shape above (no blockquote; the storm.mg link inline), `description` → zh `依《57號小豹》造型手繪的著色頁，可下載列印。` / en `Hand-drawn colouring pages based on Little Leopard No. 57, free to download and print.`, and this closing sentence in both bodies:

zh `著色頁由家裡小妹依《57號小豹》造型手繪，隨本站文字以 CC BY 4.0 釋出；《57號小豹》的角色與書封著作權屬原出版社與繪者。`
en `The line art was drawn by 家裡小妹 from the Little Leopard No. 57 character and is released under CC BY 4.0 with the rest of this site's original text; rights in the character and cover art remain with the publisher and illustrator.`

Use `家裡小妹` in both locales — the site's existing term. The page never states her relationship to the author, so do not add "author's sister". Normalise 著/着 to 著. Keep `author: michael`, the PDF path, and the download line.

### 4. Make the facts required

In `scripts/validate-content.ts`, per Chinese file require and check: `kind`, `ageBand`, `publisher` (string; `""` allowed only for `57號小豹著色本`), `publishedPrecision` ∈ `{day,month,year}` consistent with `date` (`year` ⇒ `MM-DD` is `01-01`), `isbn` (string, `""` allowed), `format` ∈ `{精裝,平裝,''}`, `pages` (positive integer or `""`), `printing` ∈ `{全彩印刷,雙色印刷,單色印刷,''}`, `series` (string), `seriesPosition`/`seriesTotal` (positive integers or `""`, both or neither), `status` ∈ `{在版,絕版}`, `awards` (`string[]`), `editions` (array of `{label,date,note}` with valid dates), `credits.role` ∈ `workTerms.role`, `credits.illustrator` (string), `credits.coAuthors`/`playwrights` (`string[]`), `statusNote` (string, may be `""`), `contentNote` (string, may be `""`), `discussion` (exactly 2 non-empty strings).

Per English file require `titleStatus` ∈ `{verified-existing,official,proposed}`, `statusNote` (string; non-empty whenever the Chinese file's is non-empty), `contentNote` (string), `discussion` (exactly 2 non-empty strings), and a body of ≥ 50 words.

Reject any `kind`, `ageBand`, `format`, `printing`, `role` value absent from `workTerms`. That is the guard keeping `term()` from passing Chinese through to English pages.

Then make the transcription self-checking, so the 17 hand-copied fact sets cannot drift from the research record: in the same script, parse each ` ```yaml ` fence in `docs/works-catalog.md` with `gray-matter` (16 fences, all valid YAML), match entries by `slug`, and for every Chinese work compare `title`, `date`, `publisher`, `isbn`, `format`, `pages`, `printing`, `series`, `seriesPosition`, `seriesTotal`, `status`, `awards`, `editions` (label/date/note), `credits.role`, `credits.illustrator`, `credits.coAuthors`, `credits.playwrights` against that entry. Print one error per mismatch and exit non-zero. The only work exempt is `57號小豹著色本`, which has no catalogue entry. This runs in `prebuild`, so a later catalogue edit flags the page it invalidates instead of silently diverging — and it is why `publisher` is copied verbatim, including `AM創意（安徒生和莫札特的創意劇場）`.

### 5. Facts panel and parents/teachers block

New `components/work-facts.tsx` exporting `WorkFactsPanel({ facts, date, locale, author, collection, languages }: { facts: WorkFacts; date: string; locale: Locale; author: ReactNode; collection: string; languages: string })`; import `ReactNode` from `react`, `formatDate` and `ui` from `@/lib/i18n`, `term` from `@/lib/work-facts`; inside, `const strings = ui[locale]`.

In `components/work-detail.tsx`, after `<p className="detail-blurb">`, replace the `facts` array + `authorCard` `dl` with `<WorkFactsPanel facts={work.facts} date={work.date} locale={locale} author={authorCard} collection={collection.name[locale]} languages={formatWorkLanguages(work.languages, locale)} />`. Delete the local `facts` array; keep `collectionCard` and `authorCard`. Also delete the `detailReader` key (`讀者` / `Readers`) from both locale blocks of `ui` in `lib/i18n.ts` — the panel's `類型` row replaces it and no other file reads it.

Panel is `<dl className="fact-list fact-list-wide">`; each row renders as `<div><dt>{strings[key]}</dt><dd>…</dd></div>` and is omitted when its value is empty:

| `strings` key | value |
|---|---|
| `collection` | `collection` prop |
| `typeKind` | `` `${term('kind', facts.kind, locale)} · ${term('ageBand', facts.ageBand, locale)}` `` |
| `publisher` | `facts.publisher` |
| `firstPublished` | `day` → `formatDate(date, locale)`; `month` → `YYYY-MM`; `year` → zh `2009 年` / en `2009` |
| `isbn` | `facts.isbn` |
| `binding` | non-empty parts of `term('format', facts.format, locale)`, `${facts.pages} 頁` / `${facts.pages} pp`, `term('printing', facts.printing, locale)` joined by ` · ` |
| `series` | `facts.series`, plus ` ${facts.seriesPosition} / ${facts.seriesTotal}` when both present |
| `availability` | `term('status', facts.status, locale)`, plus `（${facts.statusNote[locale]}）` on zh and ` (${facts.statusNote[locale]})` on en when non-empty |
| `awards` | `facts.awards.join(locale === 'zh' ? '、' : '; ')` |
| `role` | `term('role', facts.credits.role, locale)` |
| `illustrator` | `facts.credits.illustrator` |
| `coAuthors` | `facts.credits.coAuthors.join('、')` |
| `playwrights` | `facts.credits.playwrights.join('、')` |
| `sourceWork` | `facts.credits.adaptationSource` |
| `editions` | `<ul>` of `label · formatDate(date, locale) · note` |
| `language` | `languages` prop |
| `author` | the `author` node |

After the body `Markdown` block, before `detail-foot` (in `work-detail.tsx`, so the values come off `work.facts`):

```tsx
<section className="work-notes" aria-labelledby="work-notes-heading">
  <h2 id="work-notes-heading">{strings.forFamilies}</h2>
  {work.facts.contentNote[locale] ? (
    <p className="work-note"><strong>{strings.contentNote}</strong> {work.facts.contentNote[locale]}</p>
  ) : null}
  <p className="work-note-label">{strings.discussion}</p>
  <ol className="work-questions">
    {work.facts.discussion[locale].map((question) => <li key={question}>{question}</li>)}
  </ol>
</section>
```

For `locale === 'en'`, render `<p className="notice">{strings.siteTranslation}</p>` above the body beside the existing `translationPending` notice — but only when `work.facts.titleStatus === 'proposed'`. Six works qualify (胡阿布, 丁小飛5, 機器人宅急便 1–2, 你願不願意, 天使工廠); the other ten carry publisher-confirmed English titles and would be mislabelled by the notice.

Add to both locale blocks of `ui` in `lib/i18n.ts` (only the keys below are new; `collection` = `主題`/`Collection` and `language` = `語言`/`Language` already exist — reuse them):

```
forFamilies:   '給家長與老師'      / 'For parents & teachers'
contentNote:   '內容提醒'          / 'Content note'
discussion:    '可以一起聊的問題'  / 'Questions to talk about'
typeKind:      '類型'              / 'Type'
publisher:     '出版社'            / 'Publisher'
firstPublished:'初版'              / 'First published'
isbn:          'ISBN'              / 'ISBN'
binding:       '裝訂'              / 'Binding'
series:        '系列'              / 'Series'
availability:  '供貨'              / 'Availability'
awards:        '獎項'              / 'Awards'
role:          '角色'              / 'Role'
illustrator:   '繪者'              / 'Illustrator'
coAuthors:     '合著'              / 'Co-authors'
playwrights:   '編劇'              / 'Playwrights'
sourceWork:    '原作'              / 'Source'
editions:      '版本'              / 'Editions'
siteTranslation: '英文書名與摘要是本站翻譯，不是出版社發行的版本。' / 'The English title and summary are site translations, not a publisher-issued edition.'
```

CSS in `app/globals.css`, beside `.fact-list`:
`.fact-list-wide { grid-template-columns: repeat(3, minmax(0, 1fr)); }`
`.work-notes { margin-top: clamp(28px,4vw,48px); padding-top: clamp(20px,3vw,32px); border-top: 1px solid var(--rule); max-width: 44em; }`
`.work-note { margin-top: 10px; color: var(--ink-2); }`
`.work-note-label { margin-top: 22px; font-size: 11.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); }`
`.work-questions { margin: 8px 0 0; padding-left: 1.35rem; list-style: decimal; }`

Put `.fact-list-wide` immediately after `.fact-list dd`. Do not add breakpoint rules for it: the existing `@media (max-width: 640px)` `.fact-list { grid-template-columns: 1fr 1fr; }` and `@media (max-width: 420px)` `.fact-list { grid-template-columns: 1fr; }` come later in the file and already collapse it to 2 then 1 column.

### 6. JSON-LD

In `lib/seo.ts` `workJsonLd`, extract the existing name expression to `leadName` and add:

```ts
author: [
  { '@type': 'Person', name: leadName },
  ...work.facts.credits.coAuthors.map((name) => ({ '@type': 'Person', name })),
],
illustrator: work.facts.credits.illustrator
  ? { '@type': 'Person', name: work.facts.credits.illustrator }
  : undefined,
contributor: work.facts.credits.playwrights.length
  ? work.facts.credits.playwrights.map((name) => ({ '@type': 'Person', name }))
  : undefined,
publisher: work.facts.publisher
  ? { '@type': 'Organization', name: work.facts.publisher }
  : undefined,
isbn: work.facts.isbn || undefined,
numberOfPages: work.facts.pages ?? undefined,
awards: work.facts.awards.join('; ') || undefined,
```

Leave `description`, `datePublished`, `inLanguage`, `url`, `image`, `workTranslation` unchanged.

### 7. Drop the duplicated publisher blocks from the shelf and dialog

`portfolioWorks.excerpt` (and `reader`, `credit`) duplicate what the pages and the facts panel now say; the dialog reuses the shelf entry.

- `content/portfolio.ts`: delete `reader`, `credit`, `excerpt` from `PortfolioEntry`, from all 16 entries, and from the `HomeCopy` `dialog` block's `reader` key (it has no other consumer).
- `lib/portfolio.ts`: `ShelfEntry` loses `credit` and `excerpt`, keeps `reader` but derives it, and gains `facts: WorkFacts` (same object as `work.facts`, not a copy). Set:
  `facts: work.facts,` and `reader: `${term('kind', work.facts.kind, locale)} · ${term('ageBand', work.facts.ageBand, locale)}`,` — import `term` from `@/lib/work-facts`.
- `components/portfolio/work-dialog.tsx`: add `const strings = ui[locale]` beside `copy`; drop the `<blockquote className="excerpt">` and the `dialog-credit` paragraph; the facts array becomes
  `[[strings.typeKind, entry.reader], [copy.dialog.published[locale], entry.year], [copy.dialog.category[locale], entry.categoryName], [strings.publisher, entry.facts.publisher], [strings.availability, term('status', entry.facts.status, locale)], [copy.dialog.language[locale], formatWorkLanguages(entry.languages, locale)]]` — 6 rows, and every value is non-empty for all 16 entries (the only work with `publisher: ""` is the colouring page, which is not in `portfolioWorks`). Import `term` from `@/lib/work-facts`.
- Delete the now-unused `.excerpt` and `.dialog-credit` rules from `app/globals.css`.
- `tests/site.spec.ts`: the dialog assertion `toHaveCount(4)` becomes `toHaveCount(6)`.

### 8. Licence and English-edition claims

`content/portfolio.ts`, both locale blocks (`contact.licence`, ~827–828 and ~1223–1225):

zh `本站由郭瀞婷撰寫的文字以 CC BY 4.0 授權釋出，轉載請註明作者郭瀞婷與原始出處 tinakuobooks.com。書封、插畫與出版社文案的著作權屬原出版社與繪者所有，不在本授權範圍內。`
en `Original text written for this site by Tina Kuo is released under CC BY 4.0; when reposting, credit the author and tinakuobooks.com. Covers, illustrations, and publisher copy remain the copyright of the original publishers and illustrators and are not covered by this licence.`

Replace the `外版 / Foreign editions` usage row in both blocks:

zh `英文摘要由本站翻譯，不是出版社發行的版本；其他語言請來信`
en `English summaries on this site are our translations, not publisher-issued editions; for other languages, write to us`

Footer `legal` parts, both locales: zh final text ` 建立 · 本站原創文字以 CC BY 4.0 授權`; en final text ` · Original site text under CC BY 4.0`.

## Critical files & anchors

- `docs/works-catalog.md` — every fact, `summary_zh`, `summary_en`, `tagline_zh`. Read the work's entry before writing; do not re-research and do not edit this file.
- `lib/works.ts` — `Work`, `ZhFrontMatter`/`EnFrontMatter`, `loadWorks()`; the only place markdown becomes data.
- `components/work-detail.tsx` (~79–100 the facts array; ~150 the body section) — the panel replaces the `dl`; `work-notes` goes after the body.
- `content/portfolio.ts` — shelf entries (26–295), licence/usage (825–850, 1222–1247), hero works copy (577–580, 977–980), stage title at **774 and 1171** (both locale blocks).
- `lib/portfolio.ts` — `toShelfEntry` is the single derivation point for card and dialog facts.
- `content/collections.ts` — `CollectionId`, the array, and the cover-provenance comment block at 15–21 that must gain the new line.

## Verification

Prerequisites: repo root; `pnpm`; Chromium for Playwright (`pnpm exec playwright install chromium` once if missing).

1. `pnpm lint && pnpm typecheck && pnpm build` — `prebuild` runs `scripts/validate-content.ts`; must exit 0 and print `content: 17 works, …, portfolio: 16 works`.
2. `pnpm test:e2e` — the updated dialog test passes.
3. Body provenance, throwaway script in `/tmp` (no repo files added): for each of the 16 catalogue works, whitespace-normalise `summary_zh`, apply the one sentence override from step 3, and assert the result is a substring of the matching Chinese body; same for `summary_en` against the English body; assert no work body has a line starting with `>`. Then two separate spoiler checks: `grep -F 地道 content/works/zh/57號小豹.md` and `grep -F 地道 content/works/zh/57號小豹著色本.md` both return nothing, and `grep -Fw tunnel content/works/en/57號小豹.md` and `grep -Fw tunnel content/works/en/57號小豹著色本.md` both return nothing. Also assert every Chinese body contains its own `ageBand` string verbatim, except 機器人宅急便 1–2, which per paragraph 2 use `小學低中年級` (the parenthetical dropped) — check those two against the stripped form. Then assert each of the 34 descriptions is not a substring of its own body and is within bounds (≤ 70 zh characters, ≤ 40 en words). Expected 16/16 each locale, 0 blockquotes, 0 spoiler hits, 15/15 verbatim plus 2/2 stripped, 34/34 descriptions distinct and in bounds. The colouring page has no catalogue summary; check it by hand in step 5.
4. Publisher-overlap, throwaway script: for each of the 16 portfolio works, drop paragraph 1 (catalogue summary plus the override), then assert no 12-character run of the remainder (body tail, paragraph 3, `description`, `portfolioWorks.tagline`) appears in that work's `tagline_zh`. Expected 0 matches for all 16. Print the paragraph-1/tagline runs separately; only 小兒子's 13-character plot phrase may appear.
5. `pnpm dev`, then check these surfaces:
   - `/57號小豹` — panel shows `繪本 · 學前至低年級`, `親子天下`, `2020年10月29日`, ISBN `9789575036935`, `精裝 · 30 頁 · 全彩印刷`, `傅馨逸`, `在版`; the content note names the clothes-and-scarf threat; 2 questions.
   - `/天使工廠` — first published renders `2009` with no month or day; availability carries the e-book caveat.
   - `/你願不願意做我最好的朋友` — availability `絕版`.
   - `/tag/bridge-books/` — 2 works; `/collections` — six tiles including 橋梁書 with a rendered cover; `/works` — filter chip 橋梁書 returns 2.
   - `/en/works/little-leopard-no-57` — English panel (`Picture book · Preschool–grade 2`); **no** site-translation notice, because that title is `verified-existing`. `/en/works/angel-factory` — notice present, `titleStatus: proposed`.
   - `/57號小豹著色本` — 家裡小妹 credited, CC BY line present, PDF download returns 200.
   - View source on `/動物星球偵探事件簿`: JSON-LD `author` is 6 `Person`s including `王宇清`, `illustrator` is `九子`, `publisher` is `小麥田`, `isbn` is `9789578544161`, `numberOfPages` is `288`.
   - `/` and `/en` contact section show the new licence sentence and the “English summaries are our translations” line; the footer legal line changed.
   - `/works` and `/en/works` leads name 橋梁書 / early chapter books and the chip filters to 2.
   - `/en/works/angel-factory` availability reads `In print (paper availability unconfirmed; e-book from 華品文創)` — no Chinese parenthesis around English text.
6. Add one Playwright test to `tests/site.spec.ts`: `/動物星球偵探事件簿` visibly contains `ISBN`, `9789578544161`, `九子`, and 2 `.work-questions` items; `/en/works/animal-planet-detective-files` contains `For parents & teachers` and 2 questions; the `CreativeWork` JSON-LD has `author.length === 6` and `illustrator.name === '九子'`.

## Assumptions

- Co-author, illustrator, and playwright names stay in Chinese on English pages; no romanisation beyond the glossary in step 3. Official English names, if supplied later, go into `workTerms`-style maps, not into prose.
- Edition labels, award names, and publisher names are shown untranslated on English pages; translating Taiwanese prize names or imprints would assert facts the catalogue does not verify.
- 天使工廠 keeps `2009-01-01` as its machine date because frontmatter and `datePublished` need a full date; `publishedPrecision: year` controls what the page shows. Change both together if a month is confirmed.
- `young-adult-fiction` keeps its id and its five remaining works (暗號偵探社, 記憶邊境, 動物星球 1–2, 胡阿布). Only the 6–10 bridge books move. 動物星球 1–2 and 胡阿布 are 10–12 reads sitting under a 青少 label — accepted for now, because fixing it means either renaming a legacy `/tag/young-adult-fiction/` URL (a redirect decision, not this change) or adding a shared "older readers" collection. Note the misfit in the PR body instead of improvising a taxonomy.
- The colouring PDF stays under the author's statement that the line art is original; if permission must be documented later, only that closing sentence changes.
