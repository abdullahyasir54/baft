'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import Reveal from '../ui/Reveal'
import Spotlight from '../ui/Spotlight'

const stats = [
  { prefix: '−', value: 40, label: 'Return rate',       body: 'Fewer "it didn\'t fit" returns once shoppers have seen the drape on their own body.' },
  { prefix: '+', value: 18, label: 'Conversion lift',   body: 'Median lift across merchants in the first 90 days after install.' },
  { prefix: '',  value: 94, label: 'Satisfaction rate', body: 'Shoppers rate every drape. 94% say it sits right.' },
  { prefix: '',  value: 31, label: 'Try-on to cart',    body: 'Nearly a third of try-ons end in an add-to-cart event.' },
]

const ease = (t: number) => 1 - Math.pow(1 - t, 3)

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  // 0 → 1 progress of the count-up, eased over 1.6s once the panel is visible
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setProgress(1); return }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 1600)
      setProgress(ease(t))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  return (
    <section id="features" className="max-w-[1440px] mx-auto px-3 sm:px-6 py-6 sm:py-8 scroll-mt-[90px]">
      <div ref={ref} data-theme="dark" className="relative overflow-hidden bg-baft-ink rounded-[24px] px-5 py-10 sm:px-10 sm:py-14">
        <div aria-hidden="true" className="absolute -top-40 -right-24 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(212,228,36,0.16),transparent_65%)] pointer-events-none" />
        <div aria-hidden="true" className="absolute -bottom-52 -left-24 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(199,172,236,0.14),transparent_65%)] pointer-events-none" />

        <Reveal className="relative flex justify-between items-end gap-6 flex-wrap mb-8 sm:mb-10">
          <h2 className="text-[clamp(34px,4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.03] max-w-[14ch] text-baft-snow">Hard metrics. Real stores.</h2>
          <span className="font-plex text-[10.5px] tracking-[0.12em] uppercase text-baft-snow/55">Live merchants · measured vs. pre-install baseline</span>
        </Reveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {stats.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.07} className="h-full">
              <Spotlight className="h-full bg-white/[0.045] ring-1 ring-white/[0.07] rounded-[18px] p-6 sm:p-7 flex flex-col gap-4 transition-transform duration-500 ease-signature hover:-translate-y-1">
                <span className="text-[clamp(52px,5vw,76px)] font-[740] tracking-[-0.05em] leading-[0.9] tabular-nums text-baft-neon">
                  {m.prefix}{Math.round(m.value * progress)}%
                </span>
                <span aria-hidden="true" className="block h-[3px] rounded-full bg-white/[0.08] overflow-hidden">
                  <span className="block h-full bg-baft-neon rounded-full origin-left" style={{ transform: `scaleX(${(m.value / 100) * progress})` }} />
                </span>
                <span className="font-plex text-[11px] tracking-[0.22em] uppercase text-baft-snow">{m.label}</span>
                <p className="text-[14.5px] max-w-[30ch] text-baft-snow/65">{m.body}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
