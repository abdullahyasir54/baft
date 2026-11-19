'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Maximize2, X } from 'lucide-react'
import Chip, { type ChipTone } from './Chip'
import Eyebrow from './Eyebrow'
import Reveal from '../ui/Reveal'
import Spotlight from '../ui/Spotlight'
import themeImg from '../../../public/images/feature-theme-editor-v2.png'
import catalogImg from '../../../public/images/feature-catalog-v2.png'
import limitsImg from '../../../public/images/feature-limits-v2.png'
import insightsImg from '../../../public/images/feature-insights-v2.png'

type Feature = { kicker: string; title: string; body: string; image: StaticImageData; chips: [string, ChipTone][]; span: string }

// Wide screenshots take the 7-column cells, squarer ones the 5-column cells.
const features: Feature[] = [
  {
    kicker: 'Setup',
    title: 'Add it from the theme editor.',
    body: 'Drop the Baft try-on button onto any product page as a native theme block. No template edits, no Liquid, no developer.',
    image: themeImg,
    chips: [['No code', 'ink'], ['Theme block', 'sky']],
    span: 'lg:col-span-7',
  },
  {
    kicker: 'Catalog',
    title: "Decide what's tryable.",
    body: 'Enable try-on across your whole store, a curated set of products, or entire collections. Switch scope any time.',
    image: catalogImg,
    chips: [['All products', 'ink'], ['Collections', 'ink']],
    span: 'lg:col-span-5',
  },
  {
    kicker: 'Controls',
    title: 'Set the limits. Hold the line.',
    body: 'Cap try-ons per visitor, pick a reset window, and let shoppers unlock bonus try-ons by sharing their email. All inside your monthly quota.',
    image: limitsImg,
    chips: [['Per-visitor caps', 'ink'], ['Email unlock', 'sky']],
    span: 'lg:col-span-5',
  },
  {
    kicker: 'Insights',
    title: 'See what try-on does.',
    body: 'Generations, visitors, add-to-cart events, conversion and satisfaction. With daily activity and a per-product breakdown.',
    image: insightsImg,
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
      <Reveal className="flex justify-between items-end gap-6 flex-wrap">
        <div className="flex flex-col gap-5">
          <Eyebrow>Inside Shopify admin</Eyebrow>
          <h2 className="text-[clamp(34px,4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.03] max-w-[16ch]">
            Live in minutes. <span className="mark">Yours to control.</span>
          </h2>
        </div>
        <p className="text-[16px] max-w-[380px]">Four screens run the whole thing. Click any of them for a closer look.</p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {features.map((f, i) => (
          <Reveal key={f.kicker} delay={(i % 2) * 0.08} className={f.span}>
            <Spotlight className="group h-full bg-baft-card border border-baft-line rounded-[22px] p-5 sm:p-7 flex flex-col gap-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-36px_rgba(22,18,31,0.4)]">
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="mono-kicker">{String(i + 1).padStart(2, '0')} · {f.kicker}</span>
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
                className="relative flex-1 flex items-center justify-center w-full rounded-[16px] overflow-hidden bg-baft-paper cursor-zoom-in"
              >
                <Image
                  src={f.image}
                  alt={f.title}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-auto block transition-transform duration-700 ease-signature group-hover:scale-[1.025]"
                />
                <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-baft-ink text-baft-snow flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={15} />
                </span>
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
            transition={{ duration: 0.25 }}
            onClick={() => setZoom(null)}
            className="fixed inset-0 z-50 bg-baft-ink/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[1200px] w-full max-h-full rounded-[20px] overflow-hidden bg-baft-paper"
            >
              <Image src={zoom.image} alt={zoom.title} sizes="100vw" className="w-full h-auto max-h-[86vh] object-contain block" />
              <button
                type="button"
                autoFocus
                onClick={() => setZoom(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-baft-ink text-baft-snow flex items-center justify-center cursor-pointer"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
