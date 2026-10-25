'use client'

import { useEffect, useState } from 'react'
import Button from './Button'

const links = [
  { label: 'Process', href: '/#process' },
  { label: 'Impact',  href: '/#features' },
  { label: 'Admin',   href: '/#admin' },
  { label: 'Widget',  href: '/#demo' },
  { label: 'Pricing', href: '/#pricing' },
]

export default function SiteNav() {
  const [renders, setRenders] = useState(418200)

  useEffect(() => {
    const timer = setInterval(() => setRenders(r => r + Math.floor(Math.random() * 3)), 1400)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="sticky top-0 z-20 px-6 pt-4">
      <nav className="max-w-[1216px] mx-auto bg-baft-ink text-baft-snow rounded-[18px] py-3 pr-[14px] pl-6 flex items-center justify-between gap-5 flex-wrap">
        <a href="/#top" className="flex items-center">
          <img src="/images/baft-logo-white.png" alt="baft" className="h-[22px] w-auto block" />
        </a>
        <div className="flex items-center gap-0.5 flex-wrap">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[13.5px] font-[560] text-baft-snow no-underline px-[14px] py-2 rounded-full hover:bg-white/[0.08]">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 font-plex text-[10.5px] tracking-[0.12em] uppercase text-baft-snow/60 whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-baft-neon inline-block animate-blink" />
            Live · {renders.toLocaleString('en-US')} renders today
          </span>
          <Button size="sm" href="/#pricing">Install on Shopify</Button>
        </div>
      </nav>
    </div>
  )
}
