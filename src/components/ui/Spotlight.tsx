'use client'

import type { MouseEvent, ReactNode } from 'react'

// Wrapper that feeds the cursor position to the .spotlight CSS highlight.
export default function Spotlight({ children, className = '', onClick }: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div className={`spotlight ${className}`} onMouseMove={onMove} onClick={onClick}>
      {children}
    </div>
  )
}
