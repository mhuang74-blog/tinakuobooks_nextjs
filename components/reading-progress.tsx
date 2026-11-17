'use client'

import { useEffect, useRef } from 'react'

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      bar.style.transform = `scaleX(${progress})`
    }

    const sync = () => {
      bar.hidden = media.matches
      if (!media.matches) update()
    }

    sync()
    media.addEventListener('change', sync)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div ref={barRef} className="reading-progress" aria-hidden="true" style={{ transform: 'scaleX(0)' }} />
}
