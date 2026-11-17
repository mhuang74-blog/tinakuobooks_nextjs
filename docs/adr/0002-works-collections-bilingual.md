# 0002 — Works and collections instead of posts and tags

## Status

Accepted

## Context

The Jekyll site modelled everything as blog posts with tags
(`Funny Fiction`, `Young Adult Fiction`, …), which produced post URLs such as
`/57號小豹`, tag pages such as `/tag/picture-book/`, and an RSS feed. That is a
blog model applied to a catalogue.

The catalogue has a different shape: a small set of works, each with one
author, one collection, one cover, and one publication date; some works are
downloadable activities rather than books.

At the same time the site needs two language editions without duplicating the
catalogue.

## Decision

Model content as **Works** and **Collections** in typed modules and Markdown:

- One Work = one canonical Chinese Markdown file plus an optional English
  file paired by filename.
- One Collection per Work, replacing free-form tags. Collection identity drives
  the accent colour, cover, and description.
- Preserve every legacy Chinese URL (`/<slug>`, `/tag/<id>/`, `/author/<id>/`,
  `/about/`, feeds) so existing links and search results keep working.
- Put English pages under `/en` with English slugs
  (`/en/works/<english-slug>`), and cross-link each pair with `hreflang`.
- A Work without an English file simply has no English route (`slugEn` empty),
  and the English index filters it out so no dead links are generated. The
  Chinese page shows a translation-pending notice instead.

## Consequences

- The URL space is intentionally asymmetric: Chinese work URLs are legacy slugs
  at the root, English work URLs live under `/en/works`.
- Adding a language edition means adding one Markdown file, not code.
- The English index is not a translation of the Chinese index; it only lists
  translated works. Counts differ until the catalogue is fully translated.
- Changing a Chinese slug breaks a public URL; a redirect must be added at the
  hosting layer, because the static export cannot emit redirects.
