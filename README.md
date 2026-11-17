# tinakuobooks.com

Bilingual (Traditional Chinese / English) portfolio for the works of Tina Kuo
(郭瀞婷). Built with Next.js App Router and served by the native Next runtime on
Vercel — no CMS, no separate image optimizer service.

## Requirements

- Node.js 22 (`>=20.9.0` is the hard floor for Next 16 and `sharp`)
- pnpm 10 (`corepack enable pnpm`, pinned via `packageManager`)

## Commands

```bash
pnpm install         # install dependencies
pnpm run dev         # local dev server on http://localhost:3000
pnpm run build       # content validation, then next build
pnpm run start       # serve the production build on port 3000
pnpm run lint        # eslint
pnpm run typecheck   # tsc --noEmit
pnpm run test:e2e    # Playwright suite (builds and serves automatically)
pnpm run images      # regenerate WebP covers, OG images, and the legacy PDF copy
```

`pnpm run build` runs `prebuild` → `scripts/validate-content.ts` first, which
fails the build on broken front matter, duplicate English slugs, missing covers,
or stale `<!--more-->` markers. `vercel.json` pins `buildCommand` to
`pnpm run build` so the same validation runs on Vercel.

## Content

All content lives in the repository; there is no CMS.

```
content/
  works/zh/<legacy-slug>.md   canonical work: title, description, date, author, collection, cover
  works/en/<legacy-slug>.md   optional English translation: title, description, slug, body
  collections.ts              the five collections (names, descriptions, covers, accents)
  authors.ts                  author profiles
  about.ts                    about copy for the home teaser and the about pages
  portfolio.ts                home presentation data: shelf order, tags, cover art,
                              reader notes, excerpts, and all home-page copy
```

- Pairing is by filename. `content/works/en/57號小豹.md` is the English version
  of `content/works/zh/57號小豹.md`.
- `date` is always a quoted `YYYY-MM-DD` string. It is interpreted in
  `Asia/Taipei` so server and client render the same date.
- The Chinese filename is the legacy public URL (`/<slug>`); never rename it
  without adding a redirect at the hosting layer.
- `featuredSlug` in `content/portfolio.ts` chooses the homepage hero and dialog
  entry. `portfolioWorks` order is the shelf order (newest first) and must cover
  every work; `scripts/validate-content.ts` fails when a slug is missing.

### Missing or partial translations

- No English file → no English route is generated, the English index omits the
  work, and the Chinese page shows `英文版準備中` / English translation coming soon.
- English file with an empty body → the English page keeps the English title and
  description but renders the Chinese body with a notice.
- `scripts/validate-content.ts` warns (does not fail) in both cases.

## Legacy URL policy

Every URL from the Jekyll site keeps working against the native Next runtime:

| URL | Served by |
| --- | --- |
| `/` | `app/(zh)/page.tsx` |
| `/<chinese-slug>` | `app/(zh)/[slug]/page.tsx` (no trailing slash) |
| `/tag/<collection>/` | `app/(zh)/tag/[slug]/page.tsx`; the trailing slash 308-redirects to `/tag/<collection>` |
| `/author/<author>/` | `app/(zh)/author/[id]/page.tsx`; the trailing slash 308-redirects to `/author/<author>` |
| `/about/` | `app/(zh)/about/page.tsx`; the trailing slash 308-redirects to `/about` |
| `/feed.xml`, `/atom.xml`, tag/author feeds | route handlers |
| `/assets/files/57號小豹著色本.pdf` | `public/assets/files/` |

Chinese legacy routes are linked with plain `<a>` elements so navigation is a
full page load and never depends on an RSC payload for a moved HTML file. New
routes (`/works`, `/collections`, `/en/**`) use `next/link`.

## Images

`assets/source-images/` holds the originals and is not deployed.
`pnpm run images` writes:

- `public/images/<name>.webp` — max width 1600 (800 for author photos)
- `public/og/<name>.jpg` — 1200×630 Open Graph cards for covers and the homepage
- `public/assets/files/57號小豹著色本.pdf` — legacy download

The generated files are committed. Re-run the script when adding new artwork.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: pnpm install,
lint, typecheck, build, and Playwright. It publishes nothing.

The app is a native Next.js app (no `output: 'export'`), hosted on Vercel and
deployed by the Vercel Git integration from
[`mhuang74-blog/tinakuobooks_nextjs`](https://github.com/mhuang74-blog/tinakuobooks_nextjs):

| Target | Trigger |
| --- | --- |
| Preview | every push to a branch other than `main` |
| Production | push to `main` |

`vercel.json` sets `framework: "nextjs"`,
`installCommand: "pnpm install --frozen-lockfile"`, and
`buildCommand: "pnpm run build"`. The project (`tinakuobooks` under
`mhuang74s-projects`) runs Node 22.x; `.vercel/` is gitignored.

`www.tinakuobooks.com` is the Vercel production domain; `tinakuobooks.com`
308-redirects to it. The previous Jekyll repository
([`mhuang74-blog/tinakuobooks`](https://github.com/mhuang74-blog/tinakuobooks))
is archived read-only and no longer serves the domain.

## Licence

Site content is licensed under CC-BY-4.0 with attribution; `LICENSE` holds the
full text. The Jasper2 and Ghost theme licences stayed with the archived Jekyll
repository and are not part of this codebase.
