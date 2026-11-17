'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { CloseIcon } from '@/components/icons'
import { NewsletterForm } from '@/components/newsletter-form'
import { ui, type Locale } from '@/lib/i18n'

type SubscribeContextValue = {
  openSubscribe: () => void
}

const SubscribeContext = createContext<SubscribeContextValue | null>(null)

const iconStyle = { '--od-icon-size': '18px' } as CSSProperties

export function useSubscribe(): SubscribeContextValue {
  const context = useContext(SubscribeContext)
  if (!context) throw new Error('useSubscribe must be used inside SubscribeProvider')
  return context
}

type ProviderProps = {
  locale: Locale
  children: ReactNode
}

export function SubscribeProvider({ locale, children }: ProviderProps) {
  const strings = ui[locale]
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  const openSubscribe = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    setOpen(true)
  }, [])

  const closeSubscribe = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog || !dialog.open) return
    dialog.close()
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby="subscribe-title"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeSubscribe()
        }}
        className="subscribe-dialog"
      >
        <div className="dialog-inner">
          <button
            type="button"
            onClick={closeSubscribe}
            aria-label={strings.close}
            className="dialog-close"
          >
            <CloseIcon className="od-icon" style={iconStyle} />
          </button>

          <h2 id="subscribe-title" className="dialog-title">
            {strings.subscribeTitle}
          </h2>
          <p className="dialog-blurb">{strings.subscribeDescription}</p>

          <NewsletterForm locale={locale} />
        </div>
      </dialog>
    </SubscribeContext.Provider>
  )
}

type ButtonProps = {
  locale: Locale
  className?: string
  label?: string
}

export function SubscribeButton({ locale, className, label }: ButtonProps) {
  const { openSubscribe } = useSubscribe()
  return (
    <button type="button" onClick={openSubscribe} className={className}>
      {label ?? ui[locale].subscribe}
    </button>
  )
}
