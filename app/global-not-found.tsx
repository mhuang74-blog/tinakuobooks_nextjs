import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { NotFoundContent } from '@/components/not-found-content'
import { SiteScripts } from '@/components/site-scripts'
import { SiteShell } from '@/components/site-shell'

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className="min-h-screen bg-paper text-ink">
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js')`}
        </Script>
        <SiteShell locale="zh">
          <NotFoundContent />
        </SiteShell>
        <SiteScripts />
      </body>
    </html>
  )
}
