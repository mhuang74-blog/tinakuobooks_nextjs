import { homeCopy } from '@/content/portfolio'
import { type Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
}

export function SiteFooter({ locale }: Props) {
  const copy = homeCopy[locale].footer
  const year = new Date().getFullYear()

  return (
    <footer className="site-foot">
      <div className="wrap foot-inner">
        <p className="foot-brand">{copy.brand[locale]}</p>
        <p className="foot-contact">
          <a href="https://www.tinakuobooks.com" rel="noopener">
            tinakuobooks.com
          </a>
        </p>
        <p className="foot-legal">{copy.legal(year)}</p>
      </div>
      <div className="wrap foot-links">
        {copy.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label[locale]}
          </a>
        ))}
      </div>
    </footer>
  )
}
