import type { ReactNode } from 'react'

// Baft eyebrow: mono uppercase label with the square bullet prefix.
export default function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-plex text-[11px] tracking-[0.22em] uppercase text-baft-accent whitespace-nowrap">
      <span aria-hidden="true" className="w-1.5 h-1.5 bg-current flex-none" />
      {children}
    </span>
  )
}
