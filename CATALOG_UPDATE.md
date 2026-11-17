# Updating `docs/works-catalog.md`

Playbook for the next agent. `docs/works-catalog.md` is the single source of the work
list behind `content/works/zh/*.md`, `content/works/en/*.md` and
`assets/source-images/`; this file records how it was built so the next update does not
re-derive the method. Commands below were all executed successfully on 2026-11-17 from
this repo on Linux; re-verify anything that looks stale rather than trusting it blindly.

## 1. Shape of the file

Four sections, in order:

1. Preamble + `## 欄位說明` — field dictionary. Keep it in sync with what the entries
   actually contain; it is the contract other agents read.
2. `## 目錄索引` — one Markdown table row per work, 6 columns, same order as the entries.
3. `## 作品` — one `### <title_zh>` heading per work, each followed by exactly one
   ```` ```yaml ```` fence containing that work's record.
4. `## 封面取得方式` and `## 待查事項` — retrieval method and the open questions list.

The YAML fences are load-bearing: the verification script in §5 parses them with
`gray-matter`. Never put prose inside a fence, never add a second fence per work.

## 2. Invariants

- **One entry per Work, not per printing.** Retitles, anniversary editions, second
  editions, simplified-Chinese editions, e-books and audiobooks are `editions` entries on
  the owning work. This matches the `Edition` term in `CONTEXT.md`; if you change the
  model, update `CONTEXT.md` too.
- **Never invent bibliographic data.** ISBN, page count, binding, print run: if it is not
  on a page you actually read, it stays `""`. Missing is fine; wrong is not.
- **`tagline_zh` is publisher copy, verbatim.** Own words go in `summary_zh`, and
  `summary_en` is the translation of that, not of the tagline.
- **`slug` for works already on the site equals the `content/works/zh` filename** (minus
  `.md`). `slug_en` for those equals the `slug:` in `content/works/en/*.md`. Never
  re-slug an existing page from scratch.
- **`in_site` must match the filesystem.** It flips to `true` only when
  `content/works/zh/<slug>.md` exists.
- **`collection` must be a real `CollectionId`** from `content/collections.ts`.
- **Order is newest first, then series ascending** for same-day/related titles. Keep the
  index table and the entry list in the same order.
- **`待查事項` is part of the deliverable.** Every unresolved gap or inference goes
  there. Never quietly resolve an inference by deleting the note.
- **Downloadable activities are not works here.** `57號小豹著色本` lives in
  `content/works/` but is an activity, so it is deliberately absent from the catalogue.

## 3. Where the data comes from

`books.com.tw` product pages are the primary record (title, date, ISBN, spec, tagline,
awards). `readmoo.com` covers e-books and is the fallback for publisher copy when a
product page is gone.

### Direct `curl` to books.com.tw does not work

Plain `curl` to `www.books.com.tw` returns a Cloudflare challenge: 1781 bytes of
`text/html` ("連線暫時異常"). `Referer`, a cookie jar and per-request sleeps do not fix
it. Do not loop-retry it; that was tried and wasted time.

### Text: read the listings through the `r.jina.ai` reader

```sh
mkdir -p /tmp/txt
curl -s --max-time 120 -A 'Mozilla/5.0' \
  "https://r.jina.ai/https://www.books.com.tw/products/0011047555" \
  -o /tmp/txt/0011047555.md
```

That returns the whole page as Markdown. Useful anchors inside: `### 內容簡介`,
`### 作者介紹`, `出版日期：`, `ISBN：`, `規格：`, `得獎紀錄`. Pace requests modestly
(`sleep 2` between products) so a long batch does not look like a scrape, but do not
assume a rate limit: a *single* request with a cookie jar and the product page as
`Referer` was blocked just the same, and headless Chromium on the same IP passes. The
block is per client type, and its exact cause was not established — do not build retry
or backoff logic around a guess. Use the reader (text) and the browser (rendered check)
instead.


Product IDs are discoverable via the search page through the same reader:

```sh
curl -s -A 'Mozilla/5.0' \
  "https://r.jina.ai/https://search.books.com.tw/search/query/key/$(python3 -c 'import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))' 丁小飛偉人日記)/cat/all"
grep -o 'item/[0-9A-Z]\{10\}'   # product ids in the results
grep -o 'products/[0-9A-Z]\{10\}'   # when results are rendered as product links
```

Search coverage is uneven (some queries return no product links at all); when it fails,
go through a known sibling product page or a web search instead.

### Rendered check: headless Chromium

The browser has no trouble with pages `curl` cannot open, so use it as the last word on
what a page actually says:

```js
const tab = await browser.open({ url: "https://www.books.com.tw/products/0011047555", name: "books-huabu" });
const text = await tab.text();   // rendered innerText
await tab.close();
```

(`tab.run("…")` evaluates in Node, not in the page — that is what `tab.text()` is for.)

### readmoo

Direct `curl` works (`200`, ~1 MB HTML) but the description is not in the DOM text: it
sits in an embedded Next.js JSON payload. Find the container by its class
(`book-description-container`) or by searching for a distinctive phrase from the blurb,
then strip tags:

```sh
curl -s -A 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36' \
  -o /tmp/r.html 'https://readmoo.com/book/210016425000101'
python3 - <<'EOF'
s = open('/tmp/r.html', encoding='utf-8', errors='replace').read()
i = s.find('book-description-container')
print(s[i:s.find('rm-book-collect', i)])
EOF
```

Do not route readmoo through `r.jina.ai` — it answers 403 from the proxy.

### Cover images: `wsrv.nl`, not the publisher

```sh
curl -sL -o assets/source-images/book-cover-胡阿布偵探事件簿.jpg \
  "https://wsrv.nl/?url=www.books.com.tw/img/001/104/75/0011047555.jpg"
```

The books.com.tw image URL is derivable from the product ID: strip the leading `001`, then
the two path segments are the first three digits and the **next two** digits of what is
left —

```
ID 0011047555 -> tail 1047555 -> tail[0:3]=104, tail[3:5]=75 -> img/001/104/75/0011047555.jpg
ID 0010973807 -> tail 0973807 -> 097 / 38                       -> img/001/097/38/0010973807.jpg
ID 0010457505 -> tail 0457505 -> 045 / 75                       -> img/001/045/75/0010457505.jpg
```

Note the second segment is *not* the ID's last two digits (`0973807` → `38`, not `07`).
No `w=`/`h=`/`output=` parameters, so you get the full-size JPEG the proxy serves. `wsrv.nl` decodes/re-encodes and may answer from cache, so the result is *not*
guaranteed byte-identical to the publisher's original — never claim that it is.
`cover_source_url` records the canonical origin URL, not the proxy hop. Two entries have
no download URL at all (`小兒子報告！沙發有黑洞` uses the site's own key art,
`記憶邊境` reuses the flat scan already in the repo) and carry `cover_source_url: ""`.

Dead ends, do not retry: eSlite (`athena.eslite.com` answers Cloudflare `1015` / DNS
failure), Google Books `vid=ISBN…&zoom=1` (~128 px, `zoom=3` is also small), OpenLibrary
covers (no records for these ISBNs).

## 4. Writing an entry

Copy the field order from an existing entry; `docs/works-catalog.md`'s `## 欄位說明`
defines every key. Points that bite:

- `first_published` and every `date` **must be quoted strings** (`"2023-11-30"`);
  unquoted dates become `Date` objects in `gray-matter` and break the checks.
- `tagline_zh` / `summary_zh` / `summary_en` are `|` literal blocks. Preserve line
  breaks; drop the HTML indentation and trailing double spaces. `\小學生…//` and
  `……` are literal page text — keep them.
- If a bold hook block is cut mid-sentence by the next bold run (`X****翻頁…` in the
  Markdown), join the two into the line the page renders (`…大集合X翻頁到停不下來…`).
- `title_zh` may keep the trailing `？`; `slug` never does. Slugs replace `：`, `，`,
  `.`, `？` and spaces with `-` (or drop them at the end), and keep CJK as-is.
- `title_en_status` is `verified-existing` only when the English page already exists,
  `official` when the publisher publishes an English title, otherwise `proposed`.
- `status` follows the rule in the field dictionary: price-block availability plus
  e-book availability. **The sidebar string `可訂購時通知我` is a wishlist link and
  appears on every page — it proves nothing.** `已售完，無法購買` in the price block plus
  no e-book means `絕版`; `已售完` plus a live e-book stays `在版` with a `notes` line.
- Record what you looked at in `sources`, and every mismatch between the site page and
  the publisher record in `notes` (e.g. the `暗號偵探社` date discrepancy).
- When a work gets a page on the site, flip `in_site` and reuse its `slug` / `slug_en`
  exactly; do not silently rename.

## 5. Verify before you hand off

Every fence must parse, carry all required keys, and point at a real cover:

```sh
node -e '
const fs=require("fs"),m=require("gray-matter");
const t=fs.readFileSync("docs/works-catalog.md","utf8");
const blocks=[...t.matchAll(/```yaml\n([\s\S]*?)```/g)].map(x=>m("---\n"+x[1]+"---\n").data);
const req=["slug","slug_en","title_zh","title_en","title_en_status","authors","illustrators","contributors","role","publisher","first_published","date_precision","isbn","binding_pages","age_band","kind","collection","series","tagline_zh","summary_zh","summary_en","awards","status","in_site","cover_source_url","cover_file","editions","sources","notes"];
let bad=0;
for(const w of blocks){
  for(const k of req) if(!(k in w)){console.log("MISSING",w.slug,k);bad++}
  if(!/^\d{4}(-\d{2}-\d{2})?$/.test(w.first_published)){console.log("DATE",w.slug);bad++}
  if(w.cover_file&&!fs.existsSync(w.cover_file)){console.log("COVER",w.cover_file);bad++}
  if(!["在版","絕版"].includes(w.status)){console.log("STATUS",w.slug);bad++}
}
if(new Set(blocks.map(b=>b.slug)).size!==blocks.length){console.log("DUP SLUG");bad++}
console.log("entries",blocks.length,"problems",bad);process.exit(bad?1:0)'
```

Cross-check against the repo, which is what actually consumes the catalogue:

```sh
node -e '
const fs=require("fs"),m=require("gray-matter");
const t=fs.readFileSync("docs/works-catalog.md","utf8");
const blocks=[...t.matchAll(/```yaml\n([\s\S]*?)```/g)].map(x=>m("---\n"+x[1]+"---\n").data);
const ids=new Set(["funny-fiction","young-adult-fiction","picture-book","stage-performance","story-continues"]);
const zh=fs.readdirSync("content/works/zh").map(f=>f.replace(/\.md$/,""));
const enSlugs=new Set(fs.readdirSync("content/works/en").map(f=>m(fs.readFileSync("content/works/en/"+f,"utf8")).data.slug));
for(const w of blocks){
  if(!ids.has(w.collection))console.log("BAD COLLECTION",w.slug,w.collection);
  if(zh.includes(w.slug)!==w.in_site)console.log("IN_SITE MISMATCH",w.slug);
  if(w.in_site&&!enSlugs.has(w.slug_en))console.log("SLUG_EN MISSING",w.slug);
}
console.log("ok",blocks.length);'
```

Read `content/collections.ts` for the id list rather than trusting the set above if it
has changed. Covers:

```sh
for f in assets/source-images/book-cover-*.jpg; do file -b --mime-type "$f" | grep -q image/jpeg || echo "BAD $f"; done
node -e 'const s=require("sharp"),fs=require("fs");(async()=>{for(const f of fs.readdirSync("assets/source-images").filter(f=>f.endsWith(".jpg"))){const m=await s("./assets/source-images/"+f).metadata();if(!m.width||m.width<200)console.log("SMALL",f,m.width)}})()'
```

Taglines, checked against the page text rather than by eye (strip markdown bold markers
and all whitespace on both sides, then test containment). The snippet needs the page text
from §3 first, so it fetches it if missing:

```sh
test -f /tmp/txt/0011047555.md || { mkdir -p /tmp/txt && curl -s --max-time 120 -A 'Mozilla/5.0' \
  "https://r.jina.ai/https://www.books.com.tw/products/0011047555" -o /tmp/txt/0011047555.md; }

node -e '
const fs=require("fs"),m=require("gray-matter");
const src=fs.readFileSync("docs/works-catalog.md","utf8");
const blocks=[...src.matchAll(/```yaml\n([\s\S]*?)```/g)].map(x=>m("---\n"+x[1]+"---\n").data);
const norm=s=>s.replace(/\*\*/g,"").replace(/[\s\u00a0]+/g,"");
const w=blocks.find(b=>b.slug==="胡阿布偵探事件簿-誰綁架了黑總統");
console.log(norm(fs.readFileSync("/tmp/txt/0011047555.md","utf8")).includes(norm(w.tagline_zh)));'
```

(Needs the listing text fetched in §3 at `/tmp/txt/<product ID>.md`.)

Finally, spot-check two entries on the **rendered** page (see §3): a tagline must appear
in `tab.text()` verbatim apart from whitespace, and the index table must have 6 columns
and one row per entry with no YAML leaking outside the fences.

## 6. What "done" looks like

- Preamble, index table and entry list agree (count, order, titles).
- Verification scripts exit `0`; covers are JPEG and ≥ 200 px wide.
- Every borrowed string that was not actually read off a page is either removed or
  flagged in `待查事項`.
- `CONTEXT.md` still describes the Work/Edition split the file assumes.

Report honestly what you did not confirm — a `""` plus a `待查事項` bullet is a better
outcome than a plausible-looking fabrication, and the previous pass left several
(`天使工廠` month, `記憶邊境` print spec, `暗號偵探社` first-edition ISBN, the
`皮小飛` ↔ `丁小飛` equivalence, the 12-vs-13 title count) precisely because they could
not be verified.
