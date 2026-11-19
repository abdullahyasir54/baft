'use client'

import Image from 'next/image'
import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import Button from './Button'
import heroImg from '../../../public/images/hero-flow-v2.png'

const INSTALL_URL = 'https://apps.shopify.com/baft-virtual-try-on'

const facts = [
  { k: 'Setup',    v: 'Theme editor · no code' },
  { k: 'Scope',    v: 'Products or whole collections' },
  { k: 'Controls', v: 'Per-visitor caps · quotas' },
  { k: 'Insights', v: 'Usage, leads & add-to-cart' },
]

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` })

export default function Hero() {
  const reduce = useReducedMotion()
  const stage = useRef<HTMLDivElement>(null)

  // Pointer position over the graphic, -0.5 → 0.5, smoothed into a slight tilt.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 140, damping: 18 })
  const sy = useSpring(py, { stiffness: 140, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5])
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !stage.current) return
    const r = stage.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { px.set(0); py.set(0) }

  return (
    <section id="top" className="max-w-[1440px] mx-auto px-6 md:px-12 pt-10 sm:pt-14 pb-10 sm:pb-12 grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-8 items-center scroll-mt-[90px]">
      <div className="relative isolate flex flex-col gap-7">
        <div aria-hidden="true" className="aurora" />
        <div aria-hidden="true" className="dotgrid" />

        <a
          href="#process"
          className="rise self-start inline-flex items-center gap-2.5 rounded-full bg-baft-card border border-baft-line pl-1.5 pr-3.5 py-1.5 no-underline hover:no-underline group"
          style={d(0)}
        >
          <span className="font-plex text-[10px] tracking-[0.12em] uppercase bg-baft-ink text-baft-snow rounded-full px-2.5 py-1">Shopify app</span>
          <span className="text-[13px] font-[600] text-baft-heading">AI virtual try-on for apparel</span>
          <span aria-hidden="true" className="text-baft-heading transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>

        <h1 className="text-[clamp(46px,6.6vw,104px)] font-[760] tracking-[-0.045em] leading-[0.92]">
          <span className="rise block" style={d(80)}>See it on.</span>
          <span className="rise block" style={d(180)}>Before it <br className="hidden lg:block" /><span className="mark lg:-ml-2">ships.</span></span>
        </h1>

        <p className="rise text-[clamp(17px,1.5vw,21px)] leading-[1.55] max-w-[500px] text-baft-heading/80" style={d(280)}>
          Shoppers add one photo, or use their camera, and see your clothes on themselves right on the product page. You add it from the Shopify theme editor. No code.
        </p>

        <div className="rise flex flex-col gap-3.5" style={d(360)}>
          <div className="flex gap-3 flex-wrap">
            <Button href={INSTALL_URL}>Add to Shopify →</Button>
            <Button variant="ghost" href="/contact">Contact sales</Button>
          </div>
          <p className="text-[13.5px]">There’s a free plan. Paid plans start with a 14-day trial.</p>
        </div>

        <dl className="rise grid grid-cols-2 gap-x-6 gap-y-4 mt-2 max-w-[500px]" style={d(460)}>
          {facts.map(f => (
            <div key={f.k} className="flex flex-col gap-1">
              <dt className="mono-s">{f.k}</dt>
              <dd className="text-[14.5px] font-semibold leading-snug">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        ref={stage}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="rise [perspective:1400px] lg:-mr-6"
        style={d(220)}
      >
        <motion.figure style={{ rotateX, rotateY }} className="relative will-change-transform">
          <Image
            src={heroImg}
            alt="Three cards: a shopper’s own photo, a linen suit from the store, and the same shopper wearing the suit with an Add to cart button"
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="w-full h-auto block select-none"
            draggable={false}
          />
          {/* A margin note on the graphic, placed in its empty top-left corner. */}
          <figcaption className="hidden lg:flex absolute left-[25%] top-[6%] items-start gap-2 font-plex text-[11px] leading-[1.5] tracking-[0.04em] text-baft-body -rotate-2">
            <span>same photo,<br />new suit</span>
            <svg aria-hidden="true" width="74" height="40" viewBox="0 0 74 40" fill="none" className="mt-2 text-baft-heading">
              <path d="M2 6c18-6 44-3 62 22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M54 27.5l10.5 1 .5-10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
