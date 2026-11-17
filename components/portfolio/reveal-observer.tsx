'use client'

import { useEffect } from 'react'

/**
 * Mirrors the prototype: blocks marked `data-reveal` fade in once, and are
 * shown immediately when motion is reduced or IntersectionObserver is absent.
 */
export function RevealObserver() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (nodes.length === 0) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => {
        node.classList.add('is-in')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    nodes.forEach((node) => {
      observer.observe(node)
    })
    return () => observer.disconnect()
  }, [])

  return null
}
