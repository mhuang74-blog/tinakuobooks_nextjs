export type FeedEntry = {
  title: string
  description: string
  url: string
  date: string
  authorName: string
}

export type FeedOptions = {
  title: string
  subtitle: string
  siteUrl: string
  feedUrl: string
  language: string
  entries: FeedEntry[]
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function isoDate(date: string): string {
  return `${date}T00:00:00+08:00`
}

export function renderAtom(options: FeedOptions): string {
  const updated = options.entries[0]?.date ?? '2021-03-07'

  const entries = options.entries
    .map(
      (entry) => `  <entry>
    <title>${escapeXml(entry.title)}</title>
    <link href="${escapeXml(entry.url)}" rel="alternate" type="text/html"/>
    <id>${escapeXml(entry.url)}</id>
    <published>${isoDate(entry.date)}</published>
    <updated>${isoDate(entry.date)}</updated>
    <author><name>${escapeXml(entry.authorName)}</name></author>
    <summary>${escapeXml(entry.description)}</summary>
  </entry>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${options.language}">
  <title>${escapeXml(options.title)}</title>
  <subtitle>${escapeXml(options.subtitle)}</subtitle>
  <link href="${escapeXml(options.feedUrl)}" rel="self" type="application/atom+xml"/>
  <link href="${escapeXml(options.siteUrl)}" rel="alternate" type="text/html"/>
  <id>${escapeXml(options.siteUrl)}</id>
  <updated>${isoDate(updated)}</updated>
${entries}
</feed>
`
}

export function renderRss(options: FeedOptions): string {
  const lastBuildDate = new Date(isoDate(options.entries[0]?.date ?? '2021-03-07')).toUTCString()

  const items = options.entries
    .map(
      (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(entry.url)}</link>
      <guid isPermaLink="true">${escapeXml(entry.url)}</guid>
      <pubDate>${new Date(isoDate(entry.date)).toUTCString()}</pubDate>
      <description>${escapeXml(entry.description)}</description>
    </item>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(options.title)}</title>
    <link>${escapeXml(options.siteUrl)}</link>
    <description>${escapeXml(options.subtitle)}</description>
    <language>${options.language}</language>
    <atom:link href="${escapeXml(options.feedUrl)}" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`
}
