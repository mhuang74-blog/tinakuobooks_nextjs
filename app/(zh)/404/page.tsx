import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { NotFoundContent } from '@/components/not-found-content'
import { ui } from '@/lib/i18n'

const strings = ui.zh

export const metadata: Metadata = {
  ...buildMetadata({
    locale: 'zh',
    title: '404',
    description: strings.notFoundBody,
    path: '/404',
    noindex: true,
  }),
  robots: { index: false, follow: false },
}

export default function NotFoundPage() {
  return <NotFoundContent />
}
