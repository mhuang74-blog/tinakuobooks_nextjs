import type { Localized } from '@/lib/i18n'

/**
 * One run of copy: literal text, an external link, or a reference to a work
 * page (resolved at render time so titles never drift from content/works).
 */
export type InlinePart =
  | { text: string }
  | { href: string | Localized<string>; label: string }
  | { work: string; label?: Localized<string> }
