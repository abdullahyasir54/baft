'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import Button from './Button'

const INSTALL_URL = 'https://apps.shopify.com/baft-virtual-try-on'

const links = [
  { label: 'Process', id: 'process' },
  { label: 'Impact',  id: 'features' },
  { label: 'Admin',   id: 'admin' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'FAQ',     id: 'faq' },
]

function LiveCounter({ renders }: { renders: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-plex text-[10.5px] tracking-[0.12em] uppercase text-baft-snow/60 whitespace-nowrap">
      <span className="w-1.5 h-1.5 bg-baft-neon inline-block animate-blink" />
      Live · <span className="tabular-nums">{renders.toLocaleString('en-US')}</span> renders today
    </span>
  )
}

export default function SiteNav() {
  const [renders, setRenders] = useState(418)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [hovered, setHovered] = useState('')

  // Page scroll progress, drawn as a thin neon line under the bar.
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

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

  // Highlight the link for whichever section crosses the middle of the screen.
  useEffect(() => {
    const els = links.map(l => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id)
        else setActive(cur => (cur === e.target.id ? '' : cur))
      }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const pill = hovered || active

  return (
    <div className="sticky top-0 z-30 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main"
        className="relative max-w-[1440px] mx-auto bg-baft-ink/90 backdrop-blur-xl text-baft-snow rounded-[18px] py-2.5 pr-2.5 pl-5 sm:py-3 sm:pr-[14px] sm:pl-6 shadow-[0_10px_40px_-12px_rgba(22,18,31,0.45)] ring-1 ring-white/[0.06] overflow-hidden"
      >
        <div className="flex items-center justify-between gap-5">
          <a href="/#top" className="flex items-center" onClick={() => setOpen(false)}>
            <img src="/images/baft-logo-white.png" alt="Baft" width={66} height={22} className="h-[22px] w-auto block" />
          </a>

          <div className="hidden lg:flex items-center gap-0.5" onMouseLeave={() => setHovered('')}>
            {links.map(l => (
              <a
                key={l.id}
                href={`/#${l.id}`}
                onMouseEnter={() => setHovered(l.id)}
                aria-current={active === l.id ? 'true' : undefined}
                className="relative text-[13.5px] font-[560] text-baft-snow no-underline px-[14px] py-2 rounded-full"
              >
                {pill === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.1]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden xl:inline-flex"><LiveCounter renders={renders} /></span>
            <span className="hidden min-[360px]:inline-flex"><Button size="sm" href={INSTALL_URL}>Install on Shopify</Button></span>
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

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              key="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col pt-3 pb-3 pr-2.5">
                {links.map(l => (
                  <a
                    key={l.id}
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="text-[17px] font-[640] tracking-[-0.01em] text-baft-snow no-underline py-3"
                  >
                    {l.label}
                  </a>
                ))}
                <a href="/contact" onClick={() => setOpen(false)} className="text-[17px] font-[640] tracking-[-0.01em] text-baft-snow no-underline py-3">Contact</a>
                <div className="pt-3"><LiveCounter renders={renders} /></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute left-0 right-0 bottom-0 h-[2px] bg-baft-neon origin-left"
        />
      </nav>
    </div>
  )
}
