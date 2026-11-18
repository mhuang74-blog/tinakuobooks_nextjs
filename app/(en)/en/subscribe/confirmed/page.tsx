import type { Metadata } from 'next'
import Link from 'next/link'
import { confirmCopy, isConfirmStatus } from '@/content/subscribe'
import { homeHref, ui } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'

const strings = ui.en

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  title: strings.newsletterTitle,
  description: strings.newsletterBody,
  path: '/en/subscribe/confirmed',
  noindex: true,
})

export default async function EnSubscribeConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const copy = confirmCopy.en[isConfirmStatus(status) ? status : 'invalid']

  return (
    <div className="wrap page-body">
      <p className="eyebrow">{strings.newsletterTitle}</p>
      <h1 className="page-title">{copy.title}</h1>
      <p className="page-lead">{copy.body}</p>
      <div className="page-cta">
        <Link className="btn btn-primary" href={homeHref('en')}>
          {strings.backHome}
        </Link>
      </div>
    </div>
  )
}
