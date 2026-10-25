'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { prefix: '−', value: 40, label: 'Return rate',       color: 'text-baft-pink-text',  body: 'Fewer "it didn\'t fit" returns once shoppers have seen the drape on their own body.' },
  { prefix: '+', value: 18, label: 'Conversion lift',   color: 'text-baft-sky-text',   body: 'Median lift across merchants in the first 90 days after install.' },
  { prefix: '',  value: 94, label: 'Satisfaction rate', color: 'text-baft-lav-text',   body: 'Shoppers rate every drape. 94% say it sits right.' },
  { prefix: '',  value: 31, label: 'Try-on to cart',    color: 'text-baft-peach-text', body: 'Nearly a third of try-ons end in an add-to-cart event.' },
]

const ease = (t: number) => 1 - Math.pow(1 - t, 3)

export default function Impact() {
  const ref = useRef<HTMLElement>(null)
  // 0 → 1 progress of the count-up, eased over 1.6s once the section is visible
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / 1600)
        setProgress(ease(t))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="features" ref={ref} className="max-w-[1216px] mx-auto px-6 md:px-12 pb-20 scroll-mt-[90px]">
      <div data-reveal="" className="flex justify-between items-end gap-8 flex-wrap pb-8 border-b border-baft-ink">
        <h2 className="text-[clamp(36px,4.4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.05] max-w-[14ch]">Hard metrics. Real stores.</h2>
        <span className="font-plex text-[10.5px] tracking-[0.12em] uppercase text-baft-body">Live merchants · measured vs. Pre-install baseline</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))]">
        {stats.map(m => (
          <div key={m.label} data-reveal="" className="py-7 pr-6 border-r border-baft-line flex flex-col gap-[14px] hover:bg-baft-card">
            <span className={`text-[clamp(44px,4.6vw,64px)] font-[740] tracking-[-0.045em] leading-[0.95] tabular-nums ${m.color}`}>
              {m.prefix}{Math.round(m.value * progress)}%
            </span>
            <span className="font-plex text-[11px] tracking-[0.22em] uppercase text-baft-heading">{m.label}</span>
            <p className="text-[14.5px] max-w-[28ch]">{m.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
