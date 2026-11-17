'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon } from '@/components/icons'
import { LanguageToggle, type WorkPair } from '@/components/language-toggle'
import { SubscribeButton } from '@/components/subscribe-provider'
import { aboutHref, homeHref, ui, worksHref, type Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  pairs: WorkPair[]
}

type NavItem = {
  key: 'works' | 'reading' | 'about' | 'story' | 'contact'
  label: string
  href: string
  kind: 'route' | 'legacy' | 'anchor'
}

function normalizePath(pathname: string): string {
  let decoded = pathname
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    // keep the raw value when the segment is malformed
  }
  return decoded.length > 1 ? decoded.replace(/\/+$/, '') : decoded
}

const iconStyle = { '--od-icon-size': '18px' } as CSSProperties

export function SiteHeader({ locale, pairs }: Props) {
  const pathname = usePathname() ?? '/'
  const strings = ui[locale]
  const [open, setOpen] = useState(false)
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null)
  const [lastPath, setLastPath] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const path = normalizePath(pathname)
  const isHome = path === (locale === 'zh' ? '/' : '/en')

  // A route change closes the mobile panel (React's "adjust state on prop change").
  if (lastPath !== path) {
    setLastPath(path)
    if (open) setOpen(false)
    if (!isHome && activeAnchor !== null) setActiveAnchor(null)
  }

  const activeRoute = useMemo<'works' | 'about' | null>(() => {
    if (locale === 'zh') {
      if (path === '/about') return 'about'
      if (
        path === '/works' ||
        path === '/collections' ||
        /^\/tag\/[^/]+$/.test(path) ||
        /^\/author\/[^/]+$/.test(path)
      ) {
        return 'works'
      }
      if (pairs.some((pair) => path === `/${pair.slug}`)) return 'works'
      return null
    }

    if (path === '/en/about') return 'about'
    if (
      path === '/en/works' ||
      /^\/en\/works\/[^/]+$/.test(path) ||
      path === '/en/collections' ||
      /^\/en\/collections\/[^/]+$/.test(path) ||
      /^\/en\/authors\/[^/]+$/.test(path)
    ) {
      return 'works'
    }
    return null
  }, [path, locale, pairs])

  const home = homeHref(locale)
  const items: NavItem[] =
    locale === 'zh'
      ? [
          { key: 'works', label: strings.navWorks, href: worksHref('zh'), kind: 'route' },
          {
            key: 'reading',
            label: strings.navReading,
            href: isHome ? '#reading' : '/#reading',
            kind: 'anchor',
          },
          {
            key: 'about',
            label: strings.navAbout,
            href: aboutHref('zh'),
            kind: 'legacy',
          },
          {
            key: 'story',
            label: strings.navStory,
            href: isHome ? '#story' : '/#story',
            kind: 'anchor',
          },
          {
            key: 'contact',
            label: strings.navContact,
            href: isHome ? '#contact' : '/#contact',
            kind: 'anchor',
          },
        ]
      : [
          { key: 'works', label: strings.navWorks, href: worksHref('en'), kind: 'route' },
          {
            key: 'reading',
            label: strings.navReading,
            href: isHome ? '#reading' : '/en#reading',
            kind: 'anchor',
          },
          {
            key: 'about',
            label: strings.navAbout,
            href: aboutHref('en'),
            kind: 'route',
          },
          {
            key: 'story',
            label: strings.navStory,
            href: isHome ? '#story' : '/en#story',
            kind: 'anchor',
          },
          {
            key: 'contact',
            label: strings.navContact,
            href: isHome ? '#contact' : '/en#contact',
            kind: 'anchor',
          },
        ]

  const writeHref = isHome ? '#write' : locale === 'zh' ? '/#write' : '/en#write'

  function currentFor(item: NavItem): 'page' | 'location' | undefined {
    if (item.kind === 'anchor') {
      return isHome && activeAnchor === item.key ? 'location' : undefined
    }
    return activeRoute === item.key ? 'page' : undefined
  }

  // Highlight the home anchors that are in view.
  useEffect(() => {
    if (!isHome) return

    const sections = ['reading', 'story', 'contact']
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    if (sections.length === 0 || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveAnchor(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => {
      observer.observe(section)
    })
    return () => observer.disconnect()
  }, [isHome])

  // Escape closes; a click outside the panel closes.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
    }

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (panelRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onPointerDown)
    }
  }, [open])

  const renderLink = (item: NavItem, className?: string) => {
    const current = currentFor(item)
    if (item.kind === 'anchor' || item.kind === 'legacy') {
      return (
        <a
          key={item.key}
          href={item.href}
          aria-current={current}
          className={className}
          onClick={className ? () => setOpen(false) : undefined}
        >
          {item.label}
        </a>
      )
    }

    return (
      <Link
        key={item.key}
        href={item.href}
        aria-current={current}
        className={className}
        onClick={className ? () => setOpen(false) : undefined}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <header className="site-head">
      <div className="wrap head-inner">
        <a className="brand" href={home}>
          <span className="brand-seal" aria-hidden="true">
            <svg viewBox="0 0 34 34" role="presentation" focusable="false">
              <rect x="1" y="1" width="32" height="32" rx="3" fill="#BE4129" />
              <text
                x="17"
                y="23"
                textAnchor="middle"
                fontSize="17"
                fill="#F6F3E8"
                fontFamily="'Songti SC','Source Han Serif SC',serif"
              >
                婷
              </text>
            </svg>
          </span>
          <span className="brand-name">{locale === 'zh' ? '郭瀞婷' : 'Tina Kuo'}</span>
        </a>

        <nav className="nav" id="primary-nav" aria-label={locale === 'zh' ? '主導覽' : 'Main'}>
          {items.map((item) => renderLink(item))}
        </nav>

        <a className="btn btn-primary head-cta" href={writeHref}>
          {strings.writeToAuthor}
        </a>

        <LanguageToggle locale={locale} pairs={pairs} />

        <SubscribeButton locale={locale} className="btn btn-ghost head-subscribe" />

        <button
          ref={triggerRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-label">{strings.menu}</span>
          <MenuIcon className="od-icon" style={iconStyle} />
        </button>

        {open ? (
          <div className="nav-panel" id="mobile-menu" ref={panelRef}>
            {items.map((item) => renderLink(item, 'nav-panel-link'))}
            <div className="nav-panel-foot">
              <LanguageToggle locale={locale} pairs={pairs} />
              <SubscribeButton
                locale={locale}
                className="btn btn-ghost"
                label={strings.subscribe}
              />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
