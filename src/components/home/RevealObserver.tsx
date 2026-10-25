'use client'

import { useEffect } from 'react'

// Flips every [data-reveal] element to "in" as it scrolls into view.
export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.setAttribute('data-reveal', 'in'))
      return
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.setAttribute('data-reveal', 'in')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.12 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Without JS the observer never runs, so show everything.
  return (
    <noscript>
      <style>{'[data-reveal]{opacity:1;transform:none;filter:none}'}</style>
    </noscript>
  )
}
