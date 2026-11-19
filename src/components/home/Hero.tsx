'use client'

import Image from 'next/image'
import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import Button from './Button'
import heroImg from '../../../public/images/hero-flow-v2.png'

const INSTALL_URL = 'https://apps.shopify.com/baft-virtual-try-on'

const facts = [
  { k: 'Setup',    v: 'Theme editor · no code' },
  { k: 'Scope',    v: 'Products or whole collections' },
  { k: 'Controls', v: 'Per-visitor caps · quotas' },
  { k: 'Insights', v: 'Usage, leads & add-to-cart' },
]

const trust = ['Free plan available', '14-day trial on paid plans', 'No code needed']

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
    <section id="top" className="relative scroll-mt-[90px]">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-10 sm:pt-14 pb-10 sm:pb-14 grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-8 items-center">
        <div className="relative isolate flex flex-col gap-7">
          <div aria-hidden="true" className="aurora" />
          <div aria-hidden="true" className="dotgrid" />
          <a
            href="#process"
            className="rise self-start inline-flex items-center gap-2.5 rounded-full bg-baft-card border border-baft-line pl-1.5 pr-3.5 py-1.5 no-underline hover:no-underline group"
            style={{ ['--d' as string]: '0ms' }}
          >
            <span className="font-plex text-[10px] tracking-[0.12em] uppercase bg-baft-ink text-baft-snow rounded-full px-2.5 py-1">Shopify app</span>
            <span className="text-[13px] font-[600] text-baft-heading">AI virtual try-on for apparel</span>
            <ArrowRight size={14} className="text-baft-heading transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <h1 className="text-[clamp(46px,6.6vw,104px)] font-[760] tracking-[-0.045em] leading-[0.92]">
            <span className="rise block" style={{ ['--d' as string]: '80ms' }}>See it on.</span>
            <span className="rise block" style={{ ['--d' as string]: '180ms' }}>Before it <span className="mark">ships.</span></span>
          </h1>

          <p className="rise text-[clamp(17px,1.5vw,21px)] leading-[1.55] max-w-[520px] text-baft-heading/80" style={{ ['--d' as string]: '280ms' }}>
            Baft lets shoppers try on your catalog with one photo or their camera, right on the product page. They see the fit before they buy. You set it up from the Shopify theme editor, without a single line of code.
          </p>

          <div className="rise flex flex-col gap-4" style={{ ['--d' as string]: '360ms' }}>
            <div className="flex gap-3 flex-wrap">
              <Button href={INSTALL_URL}>Add to Shopify <ArrowRight size={16} /></Button>
              <Button variant="ghost" href="/contact">Contact sales</Button>
            </div>
            <ul className="flex gap-x-5 gap-y-2 flex-wrap">
              {trust.map(t => (
                <li key={t} className="inline-flex items-center gap-1.5 text-[13.5px] text-baft-body">
                  <Check size={14} strokeWidth={3} className="text-baft-accent" />{t}
                </li>
              ))}
            </ul>
          </div>

          <dl className="rise grid grid-cols-2 gap-x-6 gap-y-4 mt-2 max-w-[520px]" style={{ ['--d' as string]: '460ms' }}>
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
          style={{ ['--d' as string]: '220ms' }}
        >
          <motion.div style={{ rotateX, rotateY }} className="will-change-transform">
            <Image
              src={heroImg}
              alt="Baft flow: upload your photo, pick a product, see it fitted on you"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="w-full h-auto block select-none"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
