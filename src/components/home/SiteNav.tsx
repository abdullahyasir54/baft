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

function LiveCounter({ renders }: { renders: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-plex text-[10.5px] tracking-[0.12em] uppercase text-baft-snow/60 whitespace-nowrap">
      <span className="w-1.5 h-1.5 bg-baft-neon inline-block animate-blink" />
      Live · {renders.toLocaleString('en-US')} renders today
    </span>
  )
}

export default function SiteNav() {
  const [renders, setRenders] = useState(418200)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setRenders(r => r + Math.floor(Math.random() * 3)), 1400)
    return () => clearInterval(timer)
  }, [])

  // Close the mobile menu if the viewport grows into the desktop layout
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div className="sticky top-0 z-20 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav className="max-w-[1216px] mx-auto bg-baft-ink text-baft-snow rounded-[18px] py-2.5 pr-2.5 pl-5 sm:py-3 sm:pr-[14px] sm:pl-6">
        <div className="flex items-center justify-between gap-5">
          <a href="/#top" className="flex items-center" onClick={() => setOpen(false)}>
            <img src="/images/baft-logo-white.png" alt="baft" className="h-[22px] w-auto block" />
          </a>

          <div className="hidden lg:flex items-center gap-0.5">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-[13.5px] font-[560] text-baft-snow no-underline px-[14px] py-2 rounded-full hover:bg-white/[0.08]">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden lg:inline-flex"><LiveCounter renders={renders} /></span>
            <span className="hidden min-[360px]:inline-flex"><Button size="sm" href="/#pricing">Install on Shopify</Button></span>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="lg:hidden w-10 h-10 rounded-full bg-white/[0.08] flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            >
              <span className={`block w-4 h-[1.5px] bg-baft-snow transition-transform duration-300 ease-signature ${open ? 'translate-y-[3.25px] rotate-45' : ''}`} />
              <span className={`block w-4 h-[1.5px] bg-baft-snow transition-transform duration-300 ease-signature ${open ? '-translate-y-[3.25px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="lg:hidden flex flex-col pt-3 pb-2 pr-2.5">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[17px] font-[640] tracking-[-0.01em] text-baft-snow no-underline py-3 border-b border-baft-snow/[0.14]"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-4"><LiveCounter renders={renders} /></div>
          </div>
        )}
      </nav>
    </div>
  )
}
