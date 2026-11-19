# Works page content audit — HTML report

## Context

The site has 16 published works (17 Chinese `/works` posts including the coloring activity), each with a Chinese page and an English route. The ask: for every post, decide whether the copy is site-original or copied, judge whether it serves parents of elementary-to-high-school readers, teachers, and publisher agents, and produce a scored HTML summary in `docs/`.

Current state, verified this session: `docs/works-catalog.md` already holds self-written `summary_zh` / `summary_en` and full bibliographic data for all 16 works, but 10 live pages still carry publisher/retailer copy. Across the 13 pages that could be diffed against their books.com.tw product page, 9 bodies are ≥70% retailer text (12+ character matching runs); 4 more wrap a 50–62% publisher pull-quote around a short authored summary. Mean score 49/100; 10 of 16 below 50; no page cites a source; no work page names its illustrator.

Deliverable: one self-contained `docs/works-content-audit.html` with the scoring table, per-work cards, systemic findings, and a prioritised fix list. No app code changes.

## Output

- Create `docs/works-content-audit.html`. Static, UTF-8, `lang="en"`, no external fonts/images/scripts, no build step, not linked from the Next app.
- English report prose; keep work titles and quoted evidence in Traditional Chinese.
- Include the coloring activity as a flagged non-work, excluded from the mean.

## Scoring

`Overall = (Originality × 0.40 + Audience fit × 0.35 + Editorial craft × 0.25) × 10`, rounded half up.

| Component | Weight | 10 | 7–9 | 4–6 | 1–3 |
|---|---|---|---|---|---|
| Originality | 40% | Written for this site throughout | Authored summary; publisher line clearly quoted | Paraphrase or a long quotation doing most of the work | Retailer/production copy dominant |
| Audience fit | 35% | Age, kind, content note, teacher/parent entry point, credits, rights/edition data, fluent EN | Most of those | Some | Missing or misleading |
| Editorial craft | 25% | Distinct description, no duplication, clean typography/translation | Minor duplication or typography issues | Repeated blocks, translationese | Broken/truncated text, sentence-level copying |

Audience = parents of elementary-to-high-school readers, teachers, publisher agents. Do not score "literary merit of the book"; score the page's content.

## Audit dataset

### Summary table rows (16 published works, ascending score)

| # | Work | Year | Type | Origin | O | A | C | Score | Main problem |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 動物星球偵探事件簿 | 2019 | 選集 | Retailer copy | 1 | 3 | 3 | 22 | Six-author name list, no story synopsis; co-authors uncredited |
| 2 | 動物星球偵探事件簿2：推理要在放學後 | 2020 | 選集 | Retailer copy | 1 | 5 | 3 | 29 | Seven story pitches pasted; co-authors uncredited |
| 3 | 記憶邊境：河川．火林．烏雲光 | 2019 | 小說 | Retailer copy | 1 | 6 | 4 | 35 | Full retailer synopsis; no death/coma content note |
| 4 | 小兒子報告！沙發有黑洞 | 2020 | 音樂劇 | Production copy | 3 | 5 | 3 | 37 | Uncredited producer copy; no playwrights or production data |
| 5 | 丁小飛校園日記2：誰是最佳小隊長？ | 2013 | 小說 | Near-verbatim | 2 | 6 | 3 | 37 | Publisher blurb; English body ends mid-sentence |
| 6 | 57號小豹 | 2020 | 繪本 | Retailer copy | 2 | 6 | 4 | 39 | Blurb repeated three times; tunnel spoiler; illustrator missing |
| 7 | 丁小飛校園日記1：時光膠囊的祕密 | 2013 | 小說 | Near-verbatim | 2 | 6 | 4 | 39 | Paraphrased publisher copy; no series frame |
| 8 | 丁小飛校園日記3：副班長爭奪戰 | 2014 | 小說 | Near-verbatim | 2 | 6 | 4 | 39 | Publisher copy; two awards omitted |
| 9 | 丁小飛校園日記4：聰明眼鏡 | 2017 | 小說 | Retailer copy | 2 | 6 | 4 | 39 | Publisher copy; anniversary edition unmentioned |
| 10 | 暗號偵探社 | 2018 | 小說 | Near-verbatim | 2 | 7 | 5 | 45 | Strong material buried in publisher copy; awards hidden |
| 11 | 天使工廠：每個人都可以成為別人的天使 | 2009 | 繪本 | Mixed | 7 | 5 | 7 | 63 | Paraphrased e-book blurb; availability unclear |
| 12 | 你願不願意做我最好的朋友？ | 2009 | 繪本 | Mixed | 7 | 6 | 7 | 67 | Out-of-print status missing; long pull-quote |
| 13 | 機器人宅急便1：什麼都可以寄 | 2022 | 橋梁書 | Mixed | 8 | 6 | 7 | 71 | Bridge book filed under YA; no series data |
| 14 | 機器人宅急便2：能寄勇氣嗎？ | 2023 | 橋梁書 | Mixed | 8 | 6 | 7 | 71 | Same taxonomy problem; no series data |
| 15 | 丁小飛校園日記5：我要成為YouTuber | 2023 | 小說 | Mixed | 8 | 7 | 7 | 74 | Series context missing; paper out of stock |
| 16 | 胡阿布偵探事件簿：誰綁架了黑總統？ | 2026 | 小說 | Site-authored | 8 | 7 | 7 | 74 | Good synopsis; no ISBN/publisher/rights data |

Activity (not scored in the mean): 57號小豹著色本, 2021, Origin "Site-authored + quoted article", O 5 / A 5 / C 5 = 50.

Mean of the 16 published works: **49/100**. Bands: 4 at ≥70, 2 at 50–69, 8 at 30–49, 2 below 30.

Origin legend (render next to the table):
- **Site-authored** — the body was written for this site; publisher copy appears only as a short pull-quote.
- **Mixed** — authored summary plus publisher paraphrase or a long publisher pull-quote (roughly half the body).
- **Near-verbatim** — 70–89% of the body is also on the retailer page, with light edits.
- **Retailer copy** — ≥90% of the body is also on the retailer page.
- **Production copy** — promotional copy about a stage production, provenance not stated.
- **Site-authored + quoted article** — original framing; a quoted third-party passage supplies part of the body (activity page only).

### Stat cards (exact values)

Render as seven cards, each with a large number, a one-line label, and a one-line note:

| Number | Label | Note |
|---|---|---|
| 16 | Published works audited | plus 1 activity page, scored separately |
| 49/100 | Mean score | n = 16 |
| 10/16 | Pages below 50 | need a rewrite |
| 9/16 | Bodies at ≥70% retailer copy | 12+ character overlap |
| 0/16 | Pages citing a source | no provenance on any work page |
| 0 | Illustrator credits on work pages | 13 works credit a separate illustrator |
| 10/16 | English bodies that translate retailer copy | literal, sentence-level renderings |

Direct answer to the originality question, to render above the stat cards:

> No page shows evidence of automated scraping. Nine republish publisher or retailer copy almost verbatim, five mix an authored summary with publisher text or a long quotation, one is authored with a short publisher pull-quote, and one reprints production copy. The problem is republication, not a bot.

### Executive summary (exact text)

> Four pages are close to ready, two are workable, and ten need a rewrite. The pattern is not bad writing — it is missing editing. Nine pages republish publisher or retailer marketing copy almost verbatim, and five more mix an authored summary with publisher text or a long pull-quote. Meanwhile `docs/works-catalog.md` already contains sourced, self-written summaries and bibliographic data for every one of the sixteen, with gaps marked where a field is unverified; only six of those summaries reach the page, and ten pages still run publisher, retailer, or production copy.
>
> For parents and teachers the pages lack age, content notes, series order and availability. For publisher agents they lack publisher, ISBN, rights and collaborator credits, and ten English routes read as literal translations. The site's licence statement also promises CC BY 4.0 over copy the author does not own.
>
> This audit cannot tell whether text was copied by hand or by script; it measures where the text comes from. On that measure, the catalogue reads as a retailer mirror rather than an author's portfolio.

### Work cards (exact title, verdict, evidence, fix)

Render in three groups, ascending score inside each group.

**Group A — Needs a rewrite (below 50)**

1. **動物星球偵探事件簿** · 2019 · 選集 · Retailer copy · 22
   - Verdict: A retailer name-list is doing the work of a synopsis. The page tells a parent which six authors are involved and nothing about the six stories, and the author field implies Tina wrote the whole book.
   - Evidence:
     - 72% of the body and 98% of the description are 12+ character runs also found on books.com.tw `0010828481` (the publisher's "original stories × line-up" block).
     - Front matter (`author: tina`) and JSON-LD (`author: Person`) credit only Tina; the catalogue records five co-authors and Tina's story 〈智人，你還在地球上嗎？〉.
     - No age band, ISBN, publisher, story titles, or reading order.
   - Fix: **P0** — replace with the catalogue summary, credit all six authors and Tina's story, add metadata.

2. **動物星球偵探事件簿2：推理要在放學後** · 2020 · 選集 · Retailer copy · 29
   - Verdict: Seven one-paragraph story pitches are pasted in as the book description; Tina's own story is never named, and six co-authors are missing from the author field.
   - Evidence:
     - 100% of the body and 98% of the description match books.com.tw `0010867614`.
     - Catalogue: six co-authors and Tina's 〈神祕的螺旋麵包〉; none of that reaches the page.
     - The English body translates the retailer's general blurb, not the Chinese page's story list, so the two languages describe different things.
   - Fix: **P0** — rewrite and credit all seven authors; add a "read one story at a time" note for teachers.

3. **記憶邊境：河川．火林．烏雲光** · 2019 · 小說 · Retailer copy · 35
   - Verdict: The retailer synopsis is reprinted in full, including the three-trial mechanism and the novel's central question. A book about a coma and death reaches parents with no content note.
   - Evidence:
     - 100% of body and description match books.com.tw `E050052801`.
     - The English body is a sentence-by-sentence translation of the same copy.
     - The catalogue award (2018 誠品年度最期待作家) and 10+ age band are absent; nothing warns about the death/coma material.
   - Fix: **P0** — rewrite from the catalogue summary; **P1** — add a content note and award.

4. **小兒子報告！沙發有黑洞** · 2020 · 音樂劇 · Production copy · 37
   - Verdict: A production blurb and an uncited essay about 駱以軍's Facebook writing, with no credit for the people who actually wrote the musical.
   - Evidence:
     - The description repeats the body's last paragraph verbatim.
     - Catalogue: Tina's role is 故事構成; 林孟寰 and 張元 are the playwrights. The page shows Tina as the author and omits both.
     - No venue, run dates, duration, age guidance, or producer credit; the long essay's provenance is not stated in the file.
   - Fix: **P0** — correct the credits; **P1** — rewrite as a production page with first run, creative team, and suitability.

5. **丁小飛校園日記2：誰是最佳小隊長？** · 2013 · 小說 · Near-verbatim · 37
   - Verdict: Near-verbatim publisher blurb, and the English body stops mid-sentence.
   - Evidence:
     - 77% of the Chinese body matches books.com.tw `0010973799`.
     - The English body ends "how will Ding Xiaofei break through the…" with no completion.
     - The award (2013 第65梯次好書大家讀) and series position are absent.
   - Fix: **P0** — replace the body; fix the truncated English.

6. **57號小豹** · 2020 · 繪本 · Retailer copy · 39
   - Verdict: The publisher blurb appears three times — description, pull-quote, body — and the page reveals the tunnel discovery. The parent-facing message that sold the book is left out.
   - Evidence:
     - 100% of body and description match books.com.tw `0010873969`.
     - The publisher copy targets anxious parents ("獻給同樣為孩子成長而心焦的父母…心理健康"); the page drops it.
     - Illustrator 傅馨逸 is not credited; the page says only 郭瀞婷.
   - Fix: **P0** — replace the copy, add the illustrator and a parent note, remove the tunnel spoiler.

7. **丁小飛校園日記1：時光膠囊的祕密** · 2013 · 小說 · Near-verbatim · 39
   - Verdict: A lightly edited publisher character intro and plot synopsis. Readable, but it gives no reason to read this page instead of the shop page.
   - Evidence:
     - 73% of the body matches books.com.tw `0010973797`; the description paraphrases the publisher's series introduction.
     - No series frame (1 of 5), age band, publisher, or ISBN.
     - The paper edition is out of stock at the retailer with an e-book available; the page says nothing about availability.
   - Fix: **P1** — rewrite from the catalogue summary; add series and availability.

8. **丁小飛校園日記3：副班長爭奪戰** · 2014 · 小說 · Near-verbatim · 39
   - Verdict: Near-verbatim publisher copy, with the two awards the publisher actually lists left off the page.
   - Evidence:
     - 84% of the body matches books.com.tw `0010973803`.
     - Catalogue awards: 2014 第66梯次好書大家讀 and 2016 臺南兒童文學月優質本土兒童文學; neither appears.
     - The simplified-Chinese edition (皮小飛的臭屁日記3) is unmentioned.
   - Fix: **P1** — rewrite; add awards and edition data.

9. **丁小飛校園日記4：聰明眼鏡** · 2017 · 小說 · Retailer copy · 39
   - Verdict: Ninety percent publisher copy, including the publisher's own pull-quote; the tenth-anniversary edition is not identified as such.
   - Evidence:
     - 90% of the body matches books.com.tw `0010973805`; 24% of the description.
     - Catalogue: 2023 tenth-anniversary edition with a new cover and reset text; the page shows the 2017 first publication only.
     - No series frame or age band.
   - Fix: **P1** — rewrite; add edition and series data.

10. **暗號偵探社** · 2018 · 小說 · Near-verbatim · 45
    - Verdict: The best raw material in the catalogue — a strong hook, a real excerpt, and a shelf of awards — presented as publisher copy, with the awards and the excerpt's status hidden.
    - Evidence:
      - 74% of the body and 100% of the description match books.com.tw `0011017028`.
      - The novel excerpt is unlabelled; the publisher lists nine awards/selection lists, the catalogue three, the page zero.
      - English renders 小芽 as "Xiaoya" while the protagonist is "Lanya" elsewhere on the same page.
    - Fix: **P0** — label the excerpt and add awards; **P1** — add a divorce content note and fix the English names.

**Group B — Workable but thin (50–69)**

11. **天使工廠：每個人都可以成為別人的天使** · 2009 · 繪本 · Mixed · 63
    - Verdict: A short paraphrase of the e-book blurb, too thin for an agent and silent on availability; the paper edition's status is unconfirmed and the e-book is from a different publisher.
    - Evidence:
      - The pull-quote is verbatim from the readmoo listing (`在地球的另一端…烏龜諾門除外！`); the three-sentence body paraphrases it. 47% of body characters, including the quote, sit in 12+ character runs; the description is a paraphrase (0%).
      - Three sentences of content; no publisher (靜思人文志業), ISBN, or e-book publisher (華品文創) on the page.
      - The date `2009-01-01` implies a day the catalogue says is unknown. The "內頁附英文對照" claim is confirmed by the e-book listing, so it is not a defect.
    - Fix: **P1** — expand with catalogue metadata, state the availability caveat, and stop implying a day-precision date.

12. **你願不願意做我最好的朋友？** · 2009 · 繪本 · Mixed · 67
    - Verdict: A site summary plus a long publisher pull-quote; clear for parents, but the page never says the book is out of print and cannot be bought.
    - Evidence:
      - 62% of the body is 12+ character runs from books.com.tw `0010457505`, almost all the quoted paragraph.
      - Catalogue status 絕版; the page shows no availability.
      - "附注音" is asserted without a source; the publisher listing confirms the CD and bilingual text only.
    - Fix: **P1** — add out-of-print status, trim the quote, verify or drop the zhuyin claim.

**Group C — Close to ready (70+)**

13. **機器人宅急便1：什麼都可以寄** · 2022 · 橋梁書 · Mixed · 71
    - Verdict: A clear authored summary with a long publisher advertisement above it; the page then files a 6–10 bridge book under Young Adult.
    - Evidence:
      - 57% of the body is the publisher blockquote; the plot summary itself is original.
      - Collection `young-adult-fiction`; the shelf label says 橋梁書 · 小學低中年級.
      - No series position (1 of 2), publisher, ISBN, or page count.
    - Fix: **P1** — fix the taxonomy, trim the quote, add metadata.

14. **機器人宅急便2：能寄勇氣嗎？** · 2023 · 橋梁書 · Mixed · 71
    - Verdict: Same structure as book 1, with the same misclassification and no series context.
    - Evidence:
      - 50% of the body is the publisher blockquote.
      - Collection `young-adult-fiction` for a 6–10 bridge book.
      - No "2 of 2" frame, ISBN, or page count.
    - Fix: **P1** — fix the taxonomy, trim the quote, add series metadata.

15. **丁小飛校園日記5：我要成為YouTuber** · 2023 · 小說 · Mixed · 74
    - Verdict: An authored summary under the longest publisher tagline in the catalogue; the page gives no series context and no availability.
    - Evidence:
      - 53% of the body is the publisher blockquote (122 characters).
      - No mention of books 1–4; the catalogue notes the paper edition is out of stock while an e-book is available.
      - The English summary is a faithful translation of the site's Chinese summary, not the tagline — one of the few EN pages that reads as authored.
    - Fix: **P1** — trim the quote, add series order and availability.

16. **胡阿布偵探事件簿：誰綁架了黑總統？** · 2026 · 小說 · Site-authored · 74
    - Verdict: The best-structured page: an authored synopsis that states the premise, the cast, and the three-story structure. It still lacks the bibliographic and rights data an agent needs.
    - Evidence:
      - The body matches the catalogue's self-written `summary_zh`; the blockquote is the publisher tagline.
      - books.com.tw `0011047555` returned a blocked page twice today, so a text diff against the retailer was not possible; originality rests on the catalogue's provenance note.
      - No ISBN (9786267808047), publisher, 240 pp, age band, series, or e-book edition on the page; the description repeats the first two sentences of the body.
    - Fix: **P1** — add metadata and dedupe the description.

**Activity (outside the 16; not in the mean)**

- **57號小豹著色本** · 2021 · Activity · Site-authored + quoted article · 50
  - Verdict: An activity post, not a published work: a short original intro wrapped around a quoted news article and a PDF derived from the picture book.
  - Evidence:
    - Front matter credits 孩子爸 Michael; the body says the pages were drawn by "家裡小妹" — neither credit is in the catalogue, which excludes activities.
    - The PDF reproduces the 57號小豹 character; no licence or permission line accompanies the download.
    - Mixed 著/着 characters; the quoted article is linked, but the PDF's rights are not addressed.
  - Fix: **P1** — decide activity vs work; **P0** — add a licence/permission line or remove the download; credit the illustrator.

### Systemic findings (exact text, severity labels)

Render as an ordered list of `<article>` or `<li>` items with a severity chip (`Critical`, `High`, `Medium`).

1. **Critical — The licence contradicts itself.** The site says "本站文字與書封圖像以 CC BY 4.0 授權釋出" and, in the next sentence, that cover/illustration copyright belongs to the publishers (`content/portfolio.ts:827–828`, repeated at `1224–1225`). Nine page bodies are ≥70% retailer copy; that text is not the author's to license. Agents and teachers will read the first sentence as permission.
2. **Critical — The replacement copy already exists.** `docs/works-catalog.md` records self-written `summary_zh` / `summary_en` for all 16 works, plus the bibliographic fields it has (ISBN, publisher, page count, age band, awards, editions, status), with blanks where unverified. Only 6 pages use those summaries; 10 still run publisher, retailer, or production copy. This is a content-plumbing fix, not a writing project.
3. **High — Collaborators disappear.** 動物星球 1 and 2 credit only Tina although five and six co-authors wrote them; the musical omits playwrights 林孟寰 and 張元 and the production; 13 works credit a separate illustrator and no work page names one. `lib/seo.ts:136–170` emits a single `Person` author, so search engines see the same under-crediting.
4. **High — English routes overclaim editions and read as translation.** Ten of sixteen English bodies are sentence-by-sentence renderings of the Chinese retailer copy, including a dangling sentence and inconsistent character naming. The contact copy says "部分作品已有英文版" (`content/portfolio.ts:849–850`), which a foreign-rights agent will read as publisher-issued editions. The catalogue marks six English titles as proposed translations and records the rest as existing on this site, not as editions from a publisher.
5. **High — Nothing answers the next question.** The work-page fact list (`components/work-detail.tsx:94–101`) shows collection, a reader label, year, language, and author only. A parent cannot see age band, availability, or content notes; a teacher cannot see awards, curriculum links, or discussion prompts; an agent cannot see publisher, ISBN, page count, editions, or rights.
6. **Medium — The same publisher block appears up to three times.** Three pages repeat one block in all three slots — description, pull-quote, body (57號小豹, 記憶邊境, 暗號偵探社). Three more repeat it in two slots (動物星球 1 and 2: description and pull-quote; 小兒子: description and body). The description is reused as the meta description and in `CreativeWork.description`, so search snippets duplicate retailer copy instead of saying something new.
7. **Medium — The taxonomy mislabels readers.** 機器人宅急便 1–2 (ages 6–10) and 動物星球 1–2 (ages 10+) sit in `young-adult-fiction`; 57號小豹著色本 is a downloadable activity treated as a Work under `story-continues` and credited to Michael, while the catalogue deliberately excludes activities.
8. **Medium — Zero provenance.** No work page cites a source for its copy, and none of the catalogue's `sources` reach the page. The only citation on any `/works` page is the coloring post's link to a news article. A reader cannot tell author's writing from publisher marketing.

Minor defects to list in the appendix, not as findings:
- 丁小飛2 English body ends mid-sentence.
- 暗號 English uses both "Lanya" and "Xiaoya".
- 57號小豹著色本 mixes 著/着.
- 動物星球2 title uses " - " where the catalogue uses "：".
- 小兒子 title uses "!" where the catalogue uses "！".
- 記憶邊境 English body ends with two blank lines.

### Remediation table (exact rows)

| Priority | Action | Pages | Source |
|---|---|---|---|
| P0 | Replace body + description with the catalogue's authored summary in both languages; keep publisher lines only as a labelled, attributed quote of ≤2 lines | 57號小豹, 丁小飛 1–4, 動物星球 1–2, 記憶邊境, 暗號偵探社, 小兒子 | `docs/works-catalog.md` `summary_zh` / `summary_en` |
| P0 | Rewrite the licence line: CC BY covers only original site text; publisher copy, covers, illustrations excluded. Remove or qualify "部分作品已有英文版" | Contact pages, footer | `content/portfolio.ts:827–828`, `849–850` |
| P0 | Correct creator credits everywhere, including JSON-LD: co-authors, playwrights, illustrators, Tina's role | 動物星球 1–2, 小兒子, all illustrated works | `docs/works-catalog.md` contributors/illustrators |
| P0 | Resolve the coloring PDF: written permission from illustrator/publisher, a licence line, or remove the download | 57號小豹著色本 | `content/portfolio.ts:297–301` |
| P1 | Add a metadata panel: kind, age band, publisher, first published, ISBN, binding/pages, series, editions, availability, awards | all 16 | `docs/works-catalog.md` |
| P1 | Add a "For parents & teachers" block: 2–3 discussion questions, content note (divorce, death, bullying, animal death), read-aloud length/reading time | all 16, prioritise 暗號偵探社, 記憶邊境, 動物星球 | editorial |
| P1 | English editorial pass: remove truncation, unify names, rewrite translationese, label as site translation | 10 literal-translation pages | `content/works/en/*.md` |
| P1 | Fix taxonomy: add an early-reader/bridge category or rename Young Adult; move 機器人 1–2; decide whether the coloring PDF is a Work | collections, 機器人 1–2, 著色本 | `content/collections.ts`, `docs/works-catalog.md` §2 |
| P2 | Dedupe description vs body; write a distinct 1–2 sentence hook per page | 6 duplicated pages + all `description` fields | `content/works/zh/*.md` |
| P2 | Normalise typography and titles (`著/着`, `！/!`, `：` vs ` - `), remove stray blank lines | 4 pages | `content/works/*` |
| P2 | Add a provenance footnote with the catalogue source URL and review date | all 16 | `docs/works-catalog.md` `sources` |

### Appendix — copy overlap with retailer pages

Include this table with a caption explaining the metric: normalized page text, shared runs of ≥12 characters, measured 2026-11-19 via `r.jina.ai` on the books.com.tw product page. `—` = not comparable.

| Work | Body overlap | Description overlap | Product ID |
|---|---|---|---|
| 57號小豹 | 100% | 100% | 0010873969 |
| 動物星球偵探事件簿 | 72% | 98% | 0010828481 |
| 動物星球偵探事件簿2 | 100% | 98% | 0010867614 |
| 暗號偵探社 | 74% | 100% | 0011017028 |
| 記憶邊境 | 100% | 100% | E050052801 |
| 丁小飛1 | 73% | 0%* | 0010973797 |
| 丁小飛2 | 77% | 45% | 0010973799 |
| 丁小飛3 | 84% | 0%* | 0010973803 |
| 丁小飛4 | 90% | 24% | 0010973805 |
| 丁小飛5 | 53% | 8% | 0010973807 |
| 機器人宅急便1 | 57% | 0% | 0010928035 |
| 機器人宅急便2 | 50% | 8% | 0010957261 |
| 你願不願意做我最好的朋友？ | 62% | 8% | 0010457505 |
| 胡阿布偵探事件簿 | — | — | 0011047555 (blocked) |
| 天使工廠 | 47% | 0% | readmoo 210016425000101 |
| 小兒子報告！沙發有黑洞 | — | — | no comparable product page |

`*` The description is a paraphrase of a different publisher block; no 12+ character run matched. Do not describe it as copied.

### Appendix — method and limits (exact text)

> **What was read.** All 17 Chinese and 17 English work files, `content/portfolio.ts`, `content/collections.ts`, `components/work-detail.tsx`, `lib/seo.ts`, and `docs/works-catalog.md`.
>
> **How overlap was measured.** Each Chinese body and description was normalised (whitespace, markdown punctuation removed) and compared with the full text of its books.com.tw product page, fetched through `r.jina.ai` on 2026-11-19; 天使工廠 is compared with its readmoo e-book listing (`210016425000101`), fetched directly the same day. The percentage is the share of the page text covered by matching runs of at least 12 characters. A 12-character run in Chinese is a phrase, not an incidental match. This measures textual provenance, not intent and not copyright infringement.
>
> **What was not verified.** The 胡阿布 product page was blocked twice; 小兒子 has no comparable product page. No external plagiarism database, AI-text detector, or human illustrator review was used. Publisher copy is quoted here as evidence; the report does not reproduce whole passages.
>
> **What the score is.** An editorial judgment about the page, not the book: originality of the copy, fit for the stated audiences, and editorial finish. A high score does not mean the book is better.

## HTML specification

### File shell

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Works page content audit — tinakuobooks</title>
  <style>/* all CSS inline */</style>
</head>
<body>
  <a class="skip" href="#scores">Skip to scores</a>
  <header class="masthead">…</header>
  <main>…</main>
  <footer>…</footer>
</body>
</html>
```

No `<script>`, no external `<link>`, no remote images. All data hard-coded. No table of contents; the page is linear.

The scores table must use `<thead>` and one `<tbody>`; the 16 data rows go in that `<tbody>` so the verification selector counts exactly 16.

### Sections, in order

1. **Masthead** — eyebrow `CONTENT AUDIT · 2026-11-19`; `<h1>What the works pages actually say</h1>`; standfirst: `Originality and audience fit for 16 published works, scored against the publisher copy they compete with.`; meta line: `Scope: content/works/zh, content/works/en, content/portfolio.ts · Companion data: docs/works-catalog.md`.
2. **Verdict at a glance** — the direct-answer paragraph, then seven stat cards with the exact values above, then the three-paragraph executive summary as `<p>` elements.
3. **How the score works** — weights table + rubric table + one line: `Audience = parents of elementary-to-high-school readers, teachers, and publisher agents. The score judges the page, not the book.`

   Weights table rows, exact:

   | Component | Weight | Question |
   |---|---|---|
   | Originality | 40% | Is the copy written for this site, or republished from a publisher/retailer? |
   | Audience fit | 35% | Does the page answer a parent, a teacher, and a publisher agent? |
   | Editorial craft | 25% | Is it finished — distinct blurb, clean text, fluent English? |

   Then the rubric table from **Scoring** above, and the formula line `Overall = (O × 0.40 + A × 0.35 + C × 0.25) × 10`.
4. **Scores by work** — `<section id="scores">`; table with columns `#`, `Work`, `Year`, `Type`, `Origin`, `O`, `A`, `C`, `Score`, `Main problem`; caption `16 published works, worst first. The activity page is scored separately below.`; origin legend after the table; a separate `<aside>` for `57號小豹著色本` with `Not a published work · 50/100` and the line `A downloadable activity, not a published work; scored for completeness and excluded from the mean.`
5. **Work by work** — `<h2>Work by work</h2>`; three `<section>` groups with `<h3>` `Needs a rewrite (below 50)`, `Workable but thin (50–69)`, `Close to ready (70+)`; 16 `<article class="work" data-work="<slug>">` cards in the order above, then the activity card under its own `<h3>Activity page</h3>`. Card structure: header (`<span class="rank">#1</span>`, `<h4>` title, `<p class="meta">2020 · 繪本</p>`, origin badge, score chip), then `<p class="verdict">`, `<h5>Evidence</h5><ul>`, `<p class="fix"><strong>P0</strong> …</p>`.
6. **What is systemic** — intro line `The problems repeat across pages; fixing them once fixes most of the catalogue.` then eight numbered findings with severity chips.
7. **Fix order** — intro line `P0 is a correctness or licensing problem; P1 is audience fit; P2 is finish.`; then the remediation table.
8. **Method and limits** — appendix text; the overlap table.
9. **Footer** — `Prepared 2026-11-19 for tinakuobooks.com · Internal document; not linked from the site.`

### CSS tokens and rules

- `:root { --paper:#fbfaf7; --ink:#1c1b18; --muted:#6a675e; --rule:#ddd8cc; --surface:#fff; --accent:#8a3b2e; --good:#2f6b4f; --warn:#9a6b1f; --bad:#a33a2f; }`
- Dark mode via `@media (prefers-color-scheme: dark)` overriding the same variables (`--paper:#171614`, `--ink:#efebe2`, `--muted:#a8a294`, `--rule:#3a3730`, `--surface:#201e1a`, `--accent:#d98b78`, `--good:#7fb99a`, `--warn:#d1a35a`, `--bad:#e08c7d`). Set `color-scheme: light dark` on `:root`.
- Font stack: `system-ui, -apple-system, "Segoe UI", "Noto Sans TC", "PingFang TC", sans-serif`. Base 16px, line-height 1.6. `main { max-width: 1080px; margin: 0 auto; padding: 0 20px 80px; }`
- No web fonts, no images, no gradients. One accent per element; score chips are outlined rectangles with text, not colour-only dots.
- Score chip classes: `.score.good` (≥70), `.score.warn` (50–69), `.score.bad` (<50); text `22/100` etc. Use `.score` only in cards; table score cells are plain `<td class="num">22</td>` so the verification count stays 17.
- Table: `width:100%; border-collapse:collapse; font-size:0.95rem`; `th,td { text-align:left; padding:10px 12px; border-bottom:1px solid var(--rule); vertical-align:top; }`; numeric cells `font-variant-numeric: tabular-nums; text-align:right`; wrap the table in `<div class="table-wrap" role="region" aria-label="Scores by work" tabindex="0">` with `overflow-x:auto`.
- Cards: `article.work { background:var(--surface); border:1px solid var(--rule); border-radius:10px; padding:20px 22px; margin:0 0 18px; }`; header grid `grid-template-columns:auto 1fr auto auto; gap:12px; align-items:baseline;` collapsing to two rows under 640px.
- Findings: `.finding { border-left:4px solid var(--bad); padding:4px 0 4px 16px; margin:24px 0; }`; severity chip inline.
- `@media (max-width:640px)`: masthead title 1.75rem; cards padding 16px; hide the `Type` column? No — keep all columns, let the wrapper scroll. Do not shrink text below 14px.
- `@media print`: `body { background:#fff; color:#000; } .skip, .legend { display:none; } a { color:#000; text-decoration:none; } article.work, .finding { break-inside:avoid; } table { font-size:10pt; }`
- Visible focus: `a:focus-visible, [tabindex]:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }`
- `.skip` visually hidden until focus.

### Content constraints

- Do not add recommendations beyond the remediation table.
- Do not claim automated scraping, plagiarism, or legal infringement; use "retailer copy", "overlap", "provenance unverified".
- Use `2026-11-19` as the audit date everywhere.
- Preserve the Chinese titles exactly as in the files (including `！`, `：`, `？`).
- The mean is 49, not 49.1; state "mean 49/100 (n=16)".

## Verification

Prerequisites: repo root, no server on 4173. If Chromium is not installed for Playwright, run `pnpm exec playwright install chromium` once.

1. Start a static server: `python3 -m http.server 4173 --directory docs` (background; keep running for the checks).
2. Render both widths:
   - `pnpm exec playwright screenshot --viewport-size="1280,900" --full-page http://127.0.0.1:4173/works-content-audit.html /tmp/audit-desktop.png`
   - `pnpm exec playwright screenshot --viewport-size="390,844" --full-page http://127.0.0.1:4173/works-content-audit.html /tmp/audit-mobile.png`
3. Assert structure and no external requests with a throwaway Node script using `@playwright/test`:
   ```js
   const { chromium } = require('@playwright/test');
   (async () => {
     const browser = await chromium.launch();
     const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
     const errors = [], external = [];
     page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
     page.on('pageerror', e => errors.push(e.message));
     page.on('request', r => { if (!r.url().startsWith('http://127.0.0.1:4173')) external.push(r.url()); });
     await page.goto('http://127.0.0.1:4173/works-content-audit.html');
     const rows = await page.locator('#scores tbody tr').count();
     const cards = await page.locator('article.work').count();
     const scores = await page.locator('article.work .score').allTextContents();
     const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
     const body = await page.textContent('body');
     console.log({ rows, cards, scores: scores.length, overflow, external, errors, mean: body.includes('49/100') });
     await browser.close();
     if (rows !== 16 || cards !== 17 || scores.length !== 17 || overflow || external.length || errors.length || !body.includes('49/100')) process.exit(1);
   })();
   ```
   Expected: `rows=16`, `cards=17` (16 works + activity), 17 score chips, no overflow, no external requests, no console errors, mean present. Exit 0.
4. Inspect `/tmp/audit-desktop.png` and `/tmp/audit-mobile.png`: masthead, stat cards, table, three groups, findings, remediation, appendix all render; no clipped Chinese titles; score chips show text.
5. Content check: confirm the 16 table titles match `content/works/zh/*.md` (excluding 著色本) and every score equals `(O*0.4 + A*0.35 + C*0.25)*10` rounded. Use a one-off shell check (e.g. paste the 16 rows into a Node/Python calculation) and fix any mismatch.
6. Stop the server.

## Critical files & anchors

- `docs/works-catalog.md` — the authored `summary_zh` / `summary_en`, bibliographic fields, awards, status, contributors; the source for almost every P0/P1 fix.
- `content/portfolio.ts:825–850` — the CC BY sentence and the "some works have English editions" claim; duplicate copy at `1222–1247`.
- `components/work-detail.tsx:94–101` — the facts list that omits every field the audiences need.
- `lib/seo.ts:136–170` — `workJsonLd` emits one Person author, no publisher/ISBN.
- `content/collections.ts:7–12` — the five collection IDs; `young-adult-fiction` is the misclassification.
- `content/works/zh/*.md`, `content/works/en/*.md` — the 17 pairs under audit.

## Assumptions & contingencies

- **Report language:** English prose, Chinese titles and quotes. The request is in English; the content is Chinese. No translation of the whole report.
- **Weights:** 40/35/25. If the user later wants different weights, recompute from the O/A/C columns; do not re-audit.
- **Activity inclusion:** the coloring post is included because it is a `/works` page, but excluded from the mean because `docs/works-catalog.md` §2 excludes activities. If the user wants only catalogue works, delete the activity card and the aside; the 16-work mean is unchanged.
- **Unretrieved source:** 胡阿布's retailer page was blocked. Its 8/7/7 score rests on the catalogue's provenance note, not a diff. If the page becomes reachable, add its overlap numbers and adjust only if the body proves copied.
- **Coverage metric:** shared runs ≥12 characters is a conservative phrase-level test; it can miss heavy paraphrasing (丁小飛1/3 descriptions score 0% but are paraphrases). The report must say so, and must not call those descriptions copied.
- **No legal conclusion:** the licensing finding is about a contradiction visible in the repo, not a legal opinion. If the user wants a legal review, this report is input, not a substitute.
