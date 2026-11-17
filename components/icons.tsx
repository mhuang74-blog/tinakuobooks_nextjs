import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5H16.7V4.4a22 22 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1v2.1H7.7v3h2.6V21z" />
    </svg>
  )
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1-5.7 6.1H1.6l7.5-8.5L1.2 3h6.6l4.5 5.6zm-1.1 16h1.8L7.7 4.8H5.8z" />
    </svg>
  )
}

export function LinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M10 13.5a4 4 0 0 0 5.7.1l2.6-2.6a4 4 0 1 0-5.7-5.7L11.4 6.5" />
      <path d="M14 10.5a4 4 0 0 0-5.7-.1l-2.6 2.6a4 4 0 1 0 5.7 5.7l1.2-1.2" />
    </svg>
  )
}

export function RssIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14" />
      <circle cx="6" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}
