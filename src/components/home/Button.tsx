'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'

// Baft button: pills only. Primary = neon, ghost = solid ink (never an outline
// on light). Drifts toward the cursor on hover ("magnetic" CTA).
type Props = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'sm'
  href?: string
  onClick?: () => void
  disabled?: boolean
}

const variants = {
  primary: 'bg-[var(--action-primary-bg)] text-[var(--action-primary-text)]',
  ghost:   'bg-[var(--action-ghost-bg)] text-[var(--action-ghost-text)]',
}

const sizes = {
  md: 'px-[26px] py-[13px] text-[14px]',
  sm: 'px-[18px] py-[9px] text-[13px]',
}

export default function Button({ children, variant = 'primary', size = 'md', href, onClick, disabled = false }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el || disabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.transition = 'transform 0.08s linear'
    el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.3}px)`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.transform = 'translate(0, 0)'
  }

  const className = `inline-flex items-center gap-2 font-archivo font-[640] rounded-full whitespace-nowrap no-underline hover:no-underline ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-[0.45] cursor-default' : 'cursor-pointer'}`

  if (href) {
    return (
      <a ref={el => { ref.current = el }} href={href} className={className} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        {children}
      </a>
    )
  }

  return (
    <button ref={el => { ref.current = el }} type="button" disabled={disabled} onClick={onClick} className={className} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </button>
  )
}
