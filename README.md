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
pnpm run scan:secrets         # tracked files only
pnpm run scan:secrets:history # every commit reachable from any ref
pnpm run scan:secrets:bundle  # built browser output (run after pnpm run build)
```

`pnpm run build` runs `prebuild` → `scripts/validate-content.ts` first, which
fails the build on broken front matter, duplicate English slugs, missing covers,
or stale `<!--more-->` markers. `vercel.json` pins `buildCommand` to
`pnpm run build` so the same validation runs on Vercel.

## Content

All content lives in the repository; there is no CMS.

```
content/
  works/zh/<legacy-slug>.md   canonical work, credits, and Traditional Chinese introduction
  works/en/<legacy-slug>.md   English title, route slug, shelf preview, and introduction
  collections.ts              collection definitions (names, descriptions, covers, accents)
  authors.ts                  author profiles
  about.ts                    about copy for the home teaser and the about pages
  portfolio.ts                shelf order, cover art, filters, and home-page copy
```

- Pairing is by filename. `content/works/en/57號小豹.md` is the English version
  of `content/works/zh/57號小豹.md`.
- `date` is always a quoted `YYYY-MM-DD` string. It is interpreted in
  `Asia/Taipei` so server and client render the same date.
- `languages` lists the languages in which the Work was published: `zh-Hant`,
  `zh-Hans`, or `en`. The canonical edition is Chinese; add `zh-Hans` for
  simplified-Chinese editions and `en` for bilingual books.
  `scripts/validate-content.ts` fails on missing, unknown, or duplicate codes.
- The Chinese filename is the legacy public URL (`/<slug>`); never rename it
  without adding a redirect at the hosting layer.
- `featuredSlug` in `content/portfolio.ts` chooses the homepage hero and dialog
  entry. `portfolioWorks` order is the shelf order (newest first) and must cover
  every work; `scripts/validate-content.ts` fails when a slug is missing.
- Copy that must contain a link is authored as `InlinePart[]`
  (`lib/inline.ts`) and rendered with `components/inline-text.tsx`: `{ text }`
  for literal text, `{ href, label }` for an external link, and `{ work }` for a
  work page, whose title and href are resolved from `content/works` at render
  time (an unknown slug throws and fails the build).


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

### Inquiry email

The home-page inquiry form posts to `app/api/inquiry/route.ts`, which sends one
plain-text message through [Resend](https://resend.com) to
`tina@tinakuobooks.com` with the visitor's address in `Reply-To`. The route
never echoes visitor HTML and `to`/`from` are fixed, so it is not an open relay.

Set these variables on the Vercel project for Production and Preview:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key. Without it the route answers `503 not_configured`. |
| `TURNSTILE_SECRET_KEY` | yes | Cloudflare Turnstile secret, checked with Siteverify before every send. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | yes | Turnstile site key, read at build time. Without it the widget is not rendered. |
| `INQUIRY_FROM_EMAIL` | no | Sender address. Defaults to `Tina Kuo Website <website@tinakuobooks.com>`. |

`tinakuobooks.com` is the domain verified in Resend; its DKIM record is
`resend._domainkey.tinakuobooks.com`. `send.tinakuobooks.com` is only the
Return-Path subdomain — the Forge `CNAME` to `send.forge.rmta.net`, the
`feedback.forge.rmta.net` MX, and the SPF for Forge's IPs (`rmta.net` is
Resend's own mail infrastructure). It is not a sending identity: a `from`
address on it is rejected with `403 validation_error`, so both `from`
defaults stay on `tinakuobooks.com`. That SPF is per-hostname, so the root
record — managed by Email Routing — is unrelated. `tina@tinakuobooks.com` is
not a real mailbox: it is a Cloudflare Email Routing forward to
`proteiosic.software@gmail.com`.

### Newsletter

Both subscribe entry points — the header `訂閱` dialog and the inline section on
work pages — render `components/newsletter-form.tsx`, which posts JSON to
`app/api/subscribe/route.ts`. The route validates the payload, checks Turnstile,
and sends a branded confirmation email through Resend. Nothing is written to the
audience until the recipient opens the signed link: `GET
/api/subscribe/confirm?token=…` verifies an HMAC over `{ email, name, locale,
iat }` (48-hour TTL, `SUBSCRIBE_CONFIRM_SECRET`), then creates or re-uses the
Resend contact, adds it to the newsletter segment, and opts it into the
newsletter topic. Confirmation lands on `/subscribe/confirmed?status=…`
(`/en/…` for English) with `noindex`; the statuses are `ok`, `invalid`,
`expired`, `unsubscribed`, and `error`.

There is no database. Rate limiting is per serverless instance (5 per 10 minutes
per IP, 3 per 10 minutes per address) and the `website` field is a honeypot that
answers `200` without sending. Errors never echo the address, name, or token.

Set these variables on the Vercel project for Production and Preview:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Sends the confirmation email. Shared with the inquiry route. |
| `RESEND_CONTACTS_API_KEY` | yes | Full-access key for the Contacts API. A sending-only key is rejected with `restricted_api_key`. |
| `RESEND_NEWSLETTER_SEGMENT_ID` | yes | Segment that receives broadcasts. Without it the route answers `503 not_configured`. |
| `RESEND_NEWSLETTER_TOPIC_ID` | no | Topic shown on Resend's unsubscribe page; without it contacts still get broadcasts through the segment. |
| `SUBSCRIBE_CONFIRM_SECRET` | yes | HMAC key for confirmation links (`openssl rand -base64 32`). Rotating it invalidates outstanding links. |
| `TURNSTILE_SECRET_KEY` | yes | Checked with Siteverify before every send. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | yes | Read at build time; without it the widget is not rendered. |
| `SUBSCRIBE_FROM_EMAIL` | no | Sender address. Defaults to `Tina Kuo <website@tinakuobooks.com>`. |
| `SUBSCRIBE_SITE_URL` | no | Origin used in confirmation links. Defaults to `https://www.tinakuobooks.com`; set it to `http://localhost:3000` to confirm locally. |

In the Resend dashboard: verify `tinakuobooks.com` under Domains (its DKIM
lives at `resend._domainkey.tinakuobooks.com`; the `send` subdomain is only
the Return-Path). Delivery and the confirmation mail must send from an
address on that exact domain — a subdomain such as `send.` is not a verified
sending domain and returns `403`. Also create a
**Newsletter** segment and a **Newsletter** topic (default subscription
`opt_in`, visibility `public`), and add a string contact property `locale` with
fallback `zh`. The contact payload sets `first_name`, `properties.locale`, and
the segment/topic membership.

The production account is already provisioned: the **Newsletter** segment, the
**Newsletter** topic (opt-in, public) and the `locale` string property exist.
Read their IDs from `RESEND_NEWSLETTER_SEGMENT_ID` and
`RESEND_NEWSLETTER_TOPIC_ID` on the Vercel project instead of hard-coding them
here; they are Config variables, not secrets.

One API quirk worth knowing: `PATCH /contacts/{id}/topics` takes a **bare
array** — `[{ "id": "<topic>", "subscription": "opt_in" }]`. The published
OpenAPI schema describes an object with a `topics` key, and that shape is
rejected with `422` ("the field must be an array"), so do not rewrite the
confirm route to match the docs.

Vercel binds environment variables at deployment time, so a deployment created
before these variables existed keeps answering `503 not_configured` until it is
rebuilt; redeploy after changing them.

To walk the flow end to end on a laptop, put the required variables in
`.env.local`, set `SUBSCRIBE_SITE_URL=http://localhost:3000`, and use a mailbox
you control. Without the override the emailed link points at production, whose
`SUBSCRIBE_CONFIRM_SECRET` differs, so the locally signed token is rejected
there. The origin is never taken from the request `Host` header: a spoofed host
would put an attacker's domain in the confirmation link.

Mailchimp is no longer called: the old `list-manage` form target, the honeypot
field name, and the `CH_NAME` field are gone. To migrate an audience, export it
to CSV, import only `subscribed` rows as Resend contacts with `locale=zh`, send
one broadcast containing `{{{RESEND_UNSUBSCRIBE_URL}}}` so imported contacts can
opt out, and keep the Mailchimp audience read-only for 30 days before deleting
it.

### Secret handling

All server credentials live in the Vercel project's Environment Variables
(Production and Preview) as **Secret** entries. The repository stores only the
names, in `.env.example`; never values. `.env*` is gitignored.

Only `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is browser-visible and may carry the
`NEXT_PUBLIC_` prefix. Never prefix a server credential with `NEXT_PUBLIC_`.

Local checks (also run in CI):

```sh
pnpm run scan:secrets           # tracked files
pnpm run scan:secrets:history   # every commit reachable from any ref
pnpm run scan:secrets:bundle    # built browser output, after pnpm run build
```

Enable the commit hook once per clone:

```sh
git config core.hooksPath .githooks
```

GitHub secret scanning and push protection are enabled on the repository.

If a credential is exposed, revoke it at the provider first, then replace it:

```sh
vercel env rm RESEND_API_KEY production --yes
vercel env add RESEND_API_KEY production
vercel deploy --prod
```

`SUBSCRIBE_CONFIRM_SECRET` is generated with `openssl rand -base64 32`;
rotating it invalidates outstanding confirmation links. `RESEND_CONTACTS_API_KEY`
is a full-access Resend key: revoke and recreate it in the Resend dashboard,
then update both Production and Preview.

### DNS and bot protection

The zone is on Cloudflare (nameservers moved from Namecheap) and proxied to
Vercel, because a Cloudflare rate limiting rule only sees proxied traffic.
Migration order:

1. Add the zone and import the records **DNS only** — Cloudflare's scan flips
   A/AAAA/CNAME to proxied by default, which would proxy a hostname Vercel has
   not yet re-validated.
2. Switch the nameservers at Namecheap. DNS-only answers still resolve straight
   to Vercel, so the site keeps serving on Vercel's own certificate.
3. Wait until Vercel → Settings → Domains shows a valid configuration and an
   issued certificate for `tinakuobooks.com` and `www.tinakuobooks.com`.
4. Set SSL/TLS mode to **Full (strict)** first, then flip both hostnames to
   **proxied** and confirm `cf-ray` in the response headers.
5. Add a Configuration Rule that bypasses cache for URI path starting with
   `/.well-known/` and never put a redirect or WAF rule on that path.

- `tinakuobooks.com` `A` → `216.198.79.1` and `64.29.17.1`; `www` `CNAME` →
  `c2a15262f57dfef7.vercel-dns-017.com`; both **proxied**. SSL/TLS mode must be
  **Full (strict)** — Flexible loops against Vercel's HTTPS redirect.
- Inbound mail is Cloudflare Email Routing: apex `MX` is
  `route1`–`route3.mx.cloudflare.net` (priorities 37/82/20) and apex SPF is
  `v=spf1 include:_spf.mx.cloudflare.net ~all`. `cf email-routing enable` adds
  and locks the `MX` set and the `cf2024-1._domainkey` DKIM `TXT`; the SPF `TXT`
  is not marked read-only but must equal that template or routing reports
  `spf.foreign`/`misconfigured` — it replaces the old Namecheap include. The
  Google site-verification `TXT` and the Resend records for `send.` stay **DNS
  only**. The catch-all rule stays disabled, so mail to any address without a
  routing rule is rejected at SMTP time instead of dropped. One rule exists:
  `tina@tinakuobooks.com` → `proteiosic.software@gmail.com`, managed with
  `cf email-routing rules`. The Namecheap forwarding MX records were removed
  when routing was enabled.
- Free-plan rate limiting (one rule): path `/api/inquiry`, 10 requests per
  10 seconds per IP, Block with status `429`. Cloudflare Free fixes the counting
  and mitigation periods at 10 seconds and counts by IP only.
- Never cache or block `/.well-known/*`: Vercel answers ACME challenges and
  domain verification there, and a stale cached response blocks certificate
  renewal on a live domain. Cloudflare cannot unproxy a single path — proxying is
  per hostname — so the bypass rule is the only lever. Keep HTML out of the CDN
  too: a cache entry that outlives a deploy pairs old HTML with asset paths the
  new deployment no longer serves.
- The route additionally keeps its own 5-per-10-minutes-per-IP limiter, which is
  per serverless instance.

Proxying adds a CDN hop that Vercel does not recommend, and Vercel's Bot
Protection ruleset does not work behind a reverse proxy
([Vercel](https://vercel.com/docs/security/reverse-proxy)); Turnstile covers the
form instead.

## Licence

Site content is licensed under CC-BY-4.0 with attribution; `LICENSE` holds the
full text. The Jasper2 and Ghost theme licences stayed with the archived Jekyll
repository and are not part of this codebase.
