'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { WorkDialog } from '@/components/portfolio/work-dialog'
import type { Locale } from '@/lib/i18n'
import type { ShelfEntry } from '@/lib/portfolio'

type OpenState = {
  entry: ShelfEntry
  trigger: HTMLElement
}

type WorkDialogContextValue = {
  openWork: (entry: ShelfEntry, trigger: HTMLElement) => void
}

const WorkDialogContext = createContext<WorkDialogContextValue | null>(null)

export function useWorkDialog(): WorkDialogContextValue {
  const context = useContext(WorkDialogContext)
  if (!context) throw new Error('useWorkDialog must be used inside HomeDialogProvider')
  return context
}

type Props = {
  locale: Locale
  children: ReactNode
}

export function HomeDialogProvider({ locale, children }: Props) {
  const [active, setActive] = useState<OpenState | null>(null)

  const openWork = useCallback((entry: ShelfEntry, trigger: HTMLElement) => {
    setActive({ entry, trigger })
  }, [])

  const closeWork = useCallback(() => {
    setActive(null)
  }, [])

  const value = useMemo(() => ({ openWork }), [openWork])

  return (
    <WorkDialogContext.Provider value={value}>
      {children}
      <WorkDialog
        entry={active?.entry ?? null}
        locale={locale}
        trigger={active?.trigger ?? null}
        onClosed={closeWork}
      />
    </WorkDialogContext.Provider>
  )
}
