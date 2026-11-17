import { WorkCard } from '@/components/work-card'
import type { Locale } from '@/lib/i18n'
import type { Work } from '@/lib/works'
import { toWorkCardData } from '@/lib/work-card'

type Props = {
  works: Work[]
  locale: Locale
  linkMode: 'legacy' | 'next'
  emptyTitle?: string
  emptyBody?: string
}

export function WorksGrid({ works, locale, linkMode, emptyTitle, emptyBody }: Props) {
  if (works.length === 0) {
    return (
      <div className="shelf-empty">
        <p className="empty-title">{emptyTitle ?? '—'}</p>
        {emptyBody ? <p className="empty-body">{emptyBody}</p> : null}
      </div>
    )
  }

  return (
    <div className="shelf">
      {works.map((work) => (
        <WorkCard
          key={work.slug}
          work={toWorkCardData(work, locale)}
          locale={locale}
          linkMode={linkMode}
        />
      ))}
    </div>
  )
}
