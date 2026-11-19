'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Chip, { type ChipTone } from './Chip'
import Eyebrow from './Eyebrow'
import Reveal from '../ui/Reveal'
import Spotlight from '../ui/Spotlight'
import themeImg from '../../../public/images/feature-theme-editor-v2.png'
import catalogImg from '../../../public/images/feature-catalog-v2.png'
import limitsImg from '../../../public/images/feature-limits-v2.png'
import insightsImg from '../../../public/images/feature-insights-v2.png'

type Feature = { kicker: string; title: string; body: string; image: StaticImageData; alt: string; chips: [string, ChipTone][]; span: string }

// Wide screenshots take the 7-column cells, squarer ones the 5-column cells.
const features: Feature[] = [
  {
    kicker: 'Setup',
    title: 'Add it from the theme editor.',
    body: 'Drop the Baft try-on button onto any product page as a native theme block. No template edits, no Liquid, no developer.',
    image: themeImg,
    alt: 'Shopify theme editor with a Virtual try-on block added to the product page template, between the variant picker and the buy buttons',
    chips: [['No code', 'ink'], ['Theme block', 'sky']],
    span: 'lg:col-span-7',
  },
  {
    kicker: 'Catalog',
    title: 'Decide what’s tryable.',
    body: 'Enable try-on across your whole store, a curated set of products, or entire collections. Switch scope any time.',
    image: catalogImg,
    alt: 'Try-on availability screen with Collections selected: New arrivals, Outerwear and Denim switched on, Accessories off',
    chips: [['All products', 'ink'], ['Collections', 'ink']],
    span: 'lg:col-span-5',
  },
  {
    kicker: 'Controls',
    title: 'Set the limits. Hold the line.',
    body: 'Cap try-ons per visitor, pick a reset window, and let shoppers unlock bonus try-ons by sharing their email. All inside your monthly quota.',
    image: limitsImg,
    alt: 'Usage limits screen: 3 free try-ons per shopper per day, email unlock on with 5 bonus try-ons, and a monthly quota bar at 62%',
    chips: [['Per-visitor caps', 'ink'], ['Email unlock', 'sky']],
    span: 'lg:col-span-5',
  },
  {
    kicker: 'Insights',
    title: 'See what try-on does.',
    body: 'Generations, visitors, add-to-cart events, conversion and satisfaction. With daily activity and a per-product breakdown.',
    image: insightsImg,
    alt: 'Performance dashboard for the last 30 days: shopper funnel, 31% conversion rate, daily activity chart and top products',
    chips: [['Live metrics', 'ink'], ['Satisfaction', 'pink']],
    span: 'lg:col-span-7',
  },
]

export default function AdminFeatures() {
  const [zoom, setZoom] = useState<Feature | null>(null)

  // Escape closes the enlarged view; the page behind doesn't scroll while it's open.
  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(null)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [zoom])

  return (
    <section id="admin" className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 sm:py-16 flex flex-col gap-8 sm:gap-10 scroll-mt-[90px]">
      <Reveal className="flex flex-col gap-5">
        <Eyebrow>What you control</Eyebrow>
        <h2 className="text-[clamp(34px,4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.03]">
          Live in minutes.<br /><span className="mark mark-hang">Yours to control.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {features.map((f, i) => (
          <Reveal key={f.kicker} delay={(i % 2) * 0.08} className={f.span}>
          <Spotlight className="group/card h-full bg-baft-card border border-baft-line rounded-[18px] p-5 sm:p-7 flex flex-col gap-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-36px_rgba(22,18,31,0.4)]">
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between gap-3">
                <span className="mono-kicker whitespace-nowrap">{String(i + 1).padStart(2, '0')} · {f.kicker}</span>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {f.chips.map(([label, tone]) => <Chip key={label} tone={tone}>{label}</Chip>)}
                </div>
              </div>
              <h3 className="text-[clamp(24px,2.4vw,34px)] font-[720] tracking-[-0.03em] leading-[1.08]">{f.title}</h3>
              <p className="text-[15.5px] max-w-[520px]">{f.body}</p>
            </div>
            <button
              type="button"
              onClick={() => setZoom(f)}
              aria-label={`Enlarge screenshot: ${f.title}`}
              className="group relative flex-1 flex items-center justify-center w-full rounded-[12px] overflow-hidden bg-baft-paper cursor-zoom-in"
            >
              <Image src={f.image} alt={f.alt} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full h-auto block transition-transform duration-500 ease-signature group-hover:scale-[1.02]" />
              <span className="absolute bottom-3 right-3 font-plex text-[10px] tracking-[0.08em] uppercase bg-baft-ink text-baft-snow rounded-full px-3 py-[7px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">Enlarge</span>
            </button>
          </Spotlight>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            key="zoom"
            role="dialog"
            aria-modal="true"
            aria-label={zoom.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setZoom(null)}
            className="fixed inset-0 z-50 bg-baft-ink/85 flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
          >
            <div className="relative max-w-[1200px] w-full max-h-full rounded-[18px] overflow-hidden bg-baft-paper">
              <Image src={zoom.image} alt={zoom.alt} sizes="100vw" className="w-full h-auto max-h-[86vh] object-contain block" />
              <button
                type="button"
                autoFocus
                onClick={() => setZoom(null)}
                className="absolute top-3 right-3 font-plex text-[10px] tracking-[0.08em] uppercase bg-baft-ink text-baft-snow rounded-full px-3.5 py-2 cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
