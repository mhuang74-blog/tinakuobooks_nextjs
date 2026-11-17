# 0001 — Static Next.js portfolio on GitHub Pages

## Status

Accepted

## Context

The site was a Jekyll/Jasper2 blog: a Chinese-only portfolio of eleven works,
built by Ruby and deployed to the `gh-pages` branch through Travis CI. The
content is small and changes rarely, but the presentation needed a redesign and
the owner wanted English pages.

Hosting is GitHub Pages, which serves static files only. There is no budget for
a Node server, no CMS, and no database.

## Decision

Move to Next.js App Router with TypeScript and Tailwind, built with
`output: 'export'` and deployed as static files to the existing `gh-pages`
branch.

- No server runtime, no `next/image` optimizer, no ISR, no redirects or
  rewrites, no server actions.
- All dynamic behavior is client-side: search, filtering, share buttons, the
  subscribe dialog, and the mobile menu.
- Content is Markdown + typed data modules read at build time. A pre-build
  validator fails the build on broken content.
- Legacy Chinese URLs are preserved by exporting flat HTML files and moving
  `about`/`tag`/`author` pages into directory indexes in a post-build step.
- Search is a client-side filter over the eleven works shipped with the page.
  Pagefind or Algolia would add build complexity and hosting size for a corpus
  this small.

## Consequences

- GitHub Pages keeps working with no infrastructure change; `.nojekyll` is
  required so `/_next/` assets are served.
- Moving between the Chinese and English trees is a full page load because each
  tree has its own root layout and `<html lang>`.
- Adding a server-only feature later (echoed comments, server search) would
  require leaving GitHub Pages.
- Non-ASCII dynamic route parameters need care: Next emits percent-encoded
  duplicates during static export, which the post-build step removes.
