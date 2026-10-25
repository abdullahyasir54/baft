import type { ReactNode } from 'react'

// Baft chip: mono, uppercase, pill. Ink solid by default; tinted tones pair a
// fill tint with the color's darkened text twin.
export type ChipTone = 'ink' | 'sky' | 'pink' | 'neon'

const tones: Record<ChipTone, string> = {
  ink:  'bg-baft-ink text-baft-snow',
  sky:  'bg-[var(--sky-tint-chip)] text-baft-sky-text',
  pink: 'bg-[var(--pink-tint-chip)] text-baft-pink-text',
  neon: 'bg-[var(--neon-tint)] text-[var(--olive)]',
}

export default function Chip({ children, tone = 'ink' }: { children: ReactNode; tone?: ChipTone }) {
  return (
    <span className={`inline-flex items-center font-plex text-[10px] font-medium tracking-[0.08em] uppercase px-3 py-[7px] rounded-full whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  )
}
