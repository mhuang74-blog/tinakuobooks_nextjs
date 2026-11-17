import Link from 'next/link'
import { homeHref, ui, worksHref, type Locale } from '@/lib/i18n'

type Props = { locale?: Locale }

export function NotFoundContent({ locale = 'zh' }: Props) {
  const strings = ui[locale]
  const switchLocale: Locale = locale === 'en' ? 'zh' : 'en'

  return (
    <div data-custom-404 className="wrap not-found">
      <p className="not-found-code">404</p>
      <h1 className="page-title">{strings.notFoundTitle}</h1>
      <p className="page-lead">{strings.notFoundBody}</p>
      <p className="page-meta">Page not found. 這個頁面不存在。</p>

      <div className="page-cta">
        <a className="btn btn-primary" href={homeHref(locale)}>
          {strings.backHome}
        </a>
        <Link className="btn btn-ghost" href={worksHref(locale)}>
          {strings.browseWorks}
        </Link>
        <a className="btn btn-ghost" href={homeHref(switchLocale)} hrefLang={switchLocale}>
          {switchLocale === 'en' ? 'English' : '中文'}
        </a>
        <Link className="btn btn-ghost" href={worksHref(switchLocale)} hrefLang={switchLocale}>
          {switchLocale === 'en' ? 'English works' : '中文作品'}
        </Link>
      </div>
    </div>
  )
}
