'use client'

import Image, { type StaticImageData } from 'next/image'
import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import Eyebrow from './Eyebrow'
import Reveal from '../ui/Reveal'
import productImg from '../../../public/images/step-product-v3.png'
import uploadImg from '../../../public/images/step-upload-v2.png'
import resultImg from '../../../public/images/step-result-v3.png'

const STEP_MS = 5200

const steps: { n: string; meta: string; image: StaticImageData; title: string; body: string; readout: string }[] = [
  {
    n: '01', meta: 'Product page', image: productImg,
    title: 'Tap Virtual Try-On.',
    body: "The Baft button sits right beside Add to cart on your product page. A native theme block, in your store's own styling.",
    readout: 'Product page · Theme block · native',
  },
  {
    n: '02', meta: 'Upload or camera', image: uploadImg,
    title: 'Add a photo. Or use the camera.',
    body: 'Shoppers upload a portrait or use their webcam. The photo is processed securely and never stored.',
    readout: 'Upload or camera · Secure · not stored',
  },
  {
    n: '03', meta: 'See it on', image: resultImg,
    title: 'See it on you. Right there.',
    body: 'The garment drapes onto their own body in seconds. Save, share, add to cart. And rate whether the drape sits right.',
    readout: 'See it on · Add to cart · from try-on',
  },
]

export default function Process() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const running = inView && !paused

  // The progress bar is the clock: it pauses with hover/focus or when the section
  // is off screen, and the next step starts only when its fill animation ends.
  const onFilled = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setActive(a => (a + 1) % steps.length)
  }

  return (
    <section id="process" ref={ref} className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 sm:py-16 scroll-mt-[90px]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>How it works · Storefront</Eyebrow>
            <h2 className="text-[clamp(34px,4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.03]">
              Three taps from <span className="mark">doubt to cart.</span>
            </h2>
            <p className="text-[17px] max-w-[460px]">
              Shoppers tap Virtual Try-On on the product page, add a photo or use their camera, and watch the garment drape onto their own body in seconds.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              role="tablist"
              aria-label="Try-on steps"
              className={`flex flex-col gap-2 ${running ? '' : 'paused'}`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {steps.map((s, i) => {
                const on = i === active
                return (
                  <button
                    key={s.n}
                    type="button"
                    role="tab"
                    id={`step-tab-${i}`}
                    aria-selected={on}
                    aria-controls="step-panel"
                    onClick={() => setActive(i)}
                    className={`relative text-left rounded-[16px] px-5 py-4 cursor-pointer overflow-hidden transition-colors duration-500 ease-signature ${
                      on ? 'bg-baft-card shadow-[0_18px_40px_-24px_rgba(22,18,31,0.35)]' : 'bg-transparent hover:bg-baft-card/60'
                    }`}
                  >
                    <span className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 items-baseline">
                      <span className={`font-plex text-[11px] tracking-[0.22em] ${on ? 'text-baft-accent' : 'text-baft-faint'}`}>{s.n}</span>
                      <span className="flex flex-col gap-2">
                        <span className={`text-[clamp(19px,1.8vw,24px)] font-[700] tracking-[-0.02em] leading-[1.15] ${on ? 'text-baft-heading' : 'text-baft-heading/55'}`}>{s.title}</span>
                        <motion.span
                          initial={false}
                          animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden flex flex-col gap-2.5"
                        >
                          <span className="text-[15px] leading-[1.6] text-baft-body max-w-[460px]">{s.body}</span>
                          <span className="mono-s pb-1">{s.readout}</span>
                        </motion.span>
                      </span>
                    </span>
                    {on && (
                      <span aria-hidden="true" className="absolute left-0 right-0 bottom-0 h-[3px] bg-baft-line-soft">
                        <span key={active} onAnimationEnd={onFilled} className="fill-bar block h-full bg-baft-ink" style={{ ['--dur' as string]: `${STEP_MS}ms` }} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            id="step-panel"
            role="tabpanel"
            aria-labelledby={`step-tab-${active}`}
            className="relative h-[460px] sm:h-[560px] lg:h-[620px]"
          >
            <span aria-hidden="true" className="absolute -top-2 right-0 font-[760] tracking-[-0.06em] leading-none text-[clamp(120px,16vw,240px)] text-baft-ink/[0.045] select-none">
              {steps[active].n}
            </span>
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 14, scale: i === active ? 1 : 0.985 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ pointerEvents: i === active ? 'auto' : 'none' }}
                aria-hidden={i !== active}
              >
                <Image
                  src={s.image}
                  alt={i === active ? s.title : ''}
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className="max-h-full w-auto h-auto max-w-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
