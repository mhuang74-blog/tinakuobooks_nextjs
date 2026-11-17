import type { ReactNode } from 'react'
import { RevealObserver } from '@/components/portfolio/reveal-observer'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SubscribeProvider } from '@/components/subscribe-provider'
import { ui, type Locale } from '@/lib/i18n'
import { getAllWorks } from '@/lib/works'

type Props = {
  locale: Locale
  children: ReactNode
}

export function SiteShell({ locale, children }: Props) {
  const pairs = getAllWorks().map((work) => ({
    slug: work.slug,
    slugEn: work.slugEn,
  }))

  return (
    <SubscribeProvider locale={locale}>
      <a href="#main" className="skip-link">
        {ui[locale].skipToContent}
      </a>
      <SiteHeader locale={locale} pairs={pairs} />
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
      <RevealObserver />
    </SubscribeProvider>
  )
}
