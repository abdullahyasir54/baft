'use client'

import { useEffect, useRef, useState } from 'react'
import Eyebrow from './Eyebrow'

const steps = [
  {
    n: '01', meta: 'Product page', image: '/images/step-product.png',
    title: 'Tap Virtual Try-On.',
    body: "The Baft button sits right beside Add to cart on your product page. A native theme block, in your store's own styling.",
    readout: 'Product page · Theme block · native',
  },
  {
    n: '02', meta: 'Upload or camera', image: '/images/step-upload.png',
    title: 'Add a photo. Or use the camera.',
    body: 'Shoppers upload a portrait or use their webcam. The photo is processed securely and never stored.',
    readout: 'Upload or camera · Secure · not stored',
  },
  {
    n: '03', meta: 'See it on', image: '/images/step-result.png',
    title: 'See it on you. Right there.',
    body: 'The garment drapes onto their own body in seconds. Save, share, add to cart. And rate whether the drape sits right.',
    readout: 'See it on · Add to cart · from try-on',
  },
]

export default function Process() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // The step whose center is closest to the viewport center is active.
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2
      let best = 0
      let dist = Infinity
      stepRefs.current.forEach((el, i) => {
        if (!el) return
        const b = el.getBoundingClientRect()
        const d = Math.abs((b.top + b.bottom) / 2 - mid)
        if (d < dist) { dist = d; best = i }
      })
      setActive(best)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="process" className="max-w-[1216px] mx-auto px-6 md:px-12 py-20 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-16 items-start scroll-mt-[90px]">
      <div className="sticky top-[110px] flex flex-col gap-6">
        <Eyebrow>Feature 01 · Storefront</Eyebrow>
        <div className="text-[clamp(80px,9vw,140px)] font-[760] tracking-[-0.05em] leading-[0.85] text-baft-heading">
          {steps[active].n}
        </div>
        <h2 className="text-[clamp(32px,3.6vw,48px)] font-[720] tracking-[-0.03em] leading-[1.05]">
          See it on you. <span className="mark">Right there.</span>
        </h2>
        <p className="text-[17px] max-w-[420px]">
          Shoppers tap Virtual Try-On on the product page, add a photo or use their camera, and watch the garment drape onto their own body in seconds.
        </p>
        <span className="font-plex text-[10.5px] tracking-[0.12em] uppercase text-baft-accent">{steps[active].meta}</span>
        <div className="flex gap-1.5 mt-2">
          {steps.map((s, i) => (
            <span
              key={s.n}
              className={`block h-[3px] transition-all duration-[600ms] ease-signature ${i === active ? 'w-10 bg-baft-ink' : 'w-3 bg-baft-line'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {steps.map((s, i) => (
          <div
            key={s.n}
            ref={el => { stepRefs.current[i] = el }}
            data-reveal=""
            className="grid grid-cols-[56px_minmax(0,1fr)] gap-5 py-7 border-t border-baft-line content-start"
          >
            <div className="col-span-full rounded-[18px] overflow-hidden border border-baft-line bg-baft-card flex items-center justify-center p-6">
              <img src={s.image} alt={s.title} className="max-w-full max-h-[380px] w-auto h-auto block" />
            </div>
            <span className="font-plex text-[11px] tracking-[0.22em] text-baft-accent">{s.n}</span>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[clamp(24px,2.6vw,34px)] font-[720] tracking-[-0.03em] leading-[1.1]">{s.title}</h3>
              <p className="text-[15.5px] max-w-[480px]">{s.body}</p>
              <span className="mono-s">{s.readout}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
