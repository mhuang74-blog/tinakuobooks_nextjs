import Link from 'next/link'
import { Fragment } from 'react'
import type { InlinePart } from '@/lib/inline'
import { workHref, type Locale } from '@/lib/i18n'
import { formatWorkTitle } from '@/lib/portfolio'
import { getWorkBySlug } from '@/lib/works'

type Props = { parts: InlinePart[]; locale: Locale }

/**
 * Strings are long-lived authored data, so a part's own content is a stable
 * React key; the counter only disambiguates identical runs.
 */
function partKey(part: InlinePart, seen: Map<string, number>): string {
  const base =
    'text' in part
      ? `text:${part.text}`
      : 'work' in part
        ? `work:${part.work}`
        : `href:${part.href}`
  const count = seen.get(base) ?? 0
  seen.set(base, count + 1)
  return `${base}#${count}`
}

export function InlineText({ parts, locale }: Props) {
  const legacy = locale === 'zh'
  const seen = new Map<string, number>()

  return (
    <>
      {parts.map((part) => {
        const key = partKey(part, seen)

        if ('text' in part) return <Fragment key={key}>{part.text}</Fragment>

        if ('work' in part) {
          const work = getWorkBySlug(part.work)
          if (!work) throw new Error(`Inline work reference not found: ${part.work}`)
          const label = formatWorkTitle(locale, part.label?.[locale] ?? work.title[locale])
          const href = workHref(locale, work)
          return legacy ? (
            <a key={key} href={href}>
              {label}
            </a>
          ) : (
            <Link key={key} href={href}>
              {label}
            </Link>
          )
        }

        return (
          <a key={key} href={part.href} rel="noopener">
            {part.label}
          </a>
        )
      })}
    </>
  )
}
