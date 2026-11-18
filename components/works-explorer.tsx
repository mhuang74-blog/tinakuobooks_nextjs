'use client'

import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { WorkCard } from '@/components/work-card'
import type { CollectionId } from '@/content/collections'
import { ui, type Locale } from '@/lib/i18n'
import { seriesYearOrder } from '@/lib/work-order'
import type { WorkCardData } from '@/lib/work-card'

type SortKey = 'newest' | 'oldest' | 'title'

type CollectionFilter = {
  id: CollectionId
  name: string
  count: number
}

type Props = {
  works: WorkCardData[]
  collections: CollectionFilter[]
  locale: Locale
  linkMode: 'legacy' | 'next'
}

function normalize(value: string, locale: Locale): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase(locale === 'zh' ? 'zh-Hant' : 'en')
}

export function WorksExplorer({ works, collections, locale, linkMode }: Props) {
  const strings = ui[locale]
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname() ?? '/'

  const currentSearch = searchParams.toString()

  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [collection, setCollection] = useState<CollectionId | 'all'>(() => {
    const value = searchParams.get('collection')
    return value && collections.some((item) => item.id === value)
      ? (value as CollectionId)
      : 'all'
  })
  const [sort, setSort] = useState<SortKey>(() => {
    const value = searchParams.get('sort')
    return value === 'oldest' || value === 'title' ? value : 'newest'
  })

  const deferredQuery = useDeferredValue(query)
  const localeName = locale === 'zh' ? 'zh-Hant' : 'en'

  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (collection !== 'all') params.set('collection', collection)
    if (sort !== 'newest') params.set('sort', sort)
    const search = params.toString()
    if (search === currentSearch) return
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false })
  }, [query, collection, sort, pathname, router, currentSearch])

  const visible = useMemo(() => {
    const needle = normalize(deferredQuery.trim(), locale)

    const filtered = works.filter((work) => {
      if (collection !== 'all' && work.collectionId !== collection) return false
      if (!needle) return true
      return normalize(
        `${work.title} ${work.description} ${work.collectionName} ${work.authorName}`,
        locale,
      ).includes(needle)
    })

    return filtered.sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title, localeName)
      if (sort === 'oldest') {
        return (
          -seriesYearOrder(a, b) ||
          a.date.localeCompare(b.date) ||
          a.title.localeCompare(b.title, localeName)
        )
      }
      return (
        seriesYearOrder(a, b) ||
        b.date.localeCompare(a.date) ||
        a.title.localeCompare(b.title, localeName)
      )
    })
  }, [works, collection, deferredQuery, sort, locale, localeName])

  function clearFilters() {
    setQuery('')
    setCollection('all')
    setSort('newest')
  }

  return (
    <>
      <div className="works-tools">
        <div className="works-search">
          <label className="tool-label" htmlFor="works-search">
            {strings.searchLabel}
          </label>
          <input
            id="works-search"
            className="input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={strings.searchPlaceholder}
          />
        </div>

        <div className="works-sort">
          <label className="tool-label" htmlFor="works-sort">
            {strings.sortLabel}
          </label>
          <select
            id="works-sort"
            className="select"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            <option value="newest">{strings.sortNewest}</option>
            <option value="oldest">{strings.sortOldest}</option>
            <option value="title">{strings.sortTitle}</option>
          </select>
        </div>

        <button className="link-btn" type="button" onClick={clearFilters}>
          {strings.clearFilters}
        </button>
      </div>

      <div className="filters">
        <div className="chip-rail" role="group" aria-label={strings.navCollections}>
          <button
            className="chip-btn"
            type="button"
            aria-pressed={collection === 'all'}
            onClick={() => setCollection('all')}
          >
            {strings.filterAll}
          </button>
          {collections.map((item) => (
            <button
              key={item.id}
              className="chip-btn"
              type="button"
              aria-pressed={collection === item.id}
              onClick={() => setCollection(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count" role="status" aria-live="polite">
        {strings.resultCount(visible.length)}
      </p>

      {visible.length === 0 ? (
        <div className="shelf-empty">
          <p className="empty-title">{strings.emptyTitle}</p>
          <p className="empty-body">{strings.emptyBody}</p>
          <button className="btn btn-primary" type="button" onClick={clearFilters}>
            {strings.clearFilters}
          </button>
        </div>
      ) : (
        <div className="shelf">
          {visible.map((work) => (
            <WorkCard key={work.slug} work={work} locale={locale} linkMode={linkMode} />
          ))}
        </div>
      )}
    </>
  )
}
