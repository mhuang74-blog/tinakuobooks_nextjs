export type WorkOrderKey = {
  date: string
  title: string
}

const SERIES_TITLE = /^(.*?)(\d+)\s*[:：]/

type SeriesKey = { prefix: string; number: number }

function seriesKey(title: string): SeriesKey | null {
  const match = SERIES_TITLE.exec(title)
  if (!match) return null
  const prefix = match[1].trim()
  if (!prefix) return null
  return { prefix, number: Number(match[2]) }
}

/**
 * Newest-first comparison for two numbered works from the same series in the
 * same publish year. Negative means `a` comes first; positive means `b` comes
 * first; 0 means this rule does not apply and the caller's date fallback decides.
 */
export function seriesYearOrder(a: WorkOrderKey, b: WorkOrderKey): number {
  if (a.date.slice(0, 4) !== b.date.slice(0, 4)) return 0
  const aSeries = seriesKey(a.title)
  const bSeries = seriesKey(b.title)
  if (!aSeries || !bSeries || aSeries.prefix !== bSeries.prefix) return 0
  return bSeries.number - aSeries.number
}
