import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { privacyCopy } from '@/content/privacy'
import { homeHref, ui } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'

const strings = ui.en
const copy = privacyCopy.en

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  title: copy.title,
  description: copy.lead,
  path: '/en/privacy',
  alternates: { zh: '/privacy', en: '/en/privacy', xDefault: '/privacy' },
})

export default function EnPrivacyPage() {
  return (
    <>
      <div className="wrap detail-crumbs">
        <Breadcrumbs
          items={[{ label: strings.home, href: homeHref('en') }, { label: strings.privacy }]}
        />
      </div>

      <header className="wrap page-head">
        <p className="eyebrow">{strings.privacy}</p>
        <h1 className="page-title">{copy.title}</h1>
        <p className="page-lead">{copy.lead}</p>
      </header>

      <div className="wrap page-body">
        {copy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="section-title">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </>
  )
}
