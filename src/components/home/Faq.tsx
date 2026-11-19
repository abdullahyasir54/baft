'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from '../ui/Reveal'

const FAQS = [
  { q: 'How does Baft work?', a: 'A shopper uploads one photo. The neural engine reads body geometry, lighting and pose, then drapes any garment from your catalog with physically accurate fabric behaviour. The render comes back in under a second.' },
  { q: 'Do I need to reshoot my catalog?', a: 'No. Baft works from the product photography you already have. Upload garment assets or model photos into the dashboard and the engine does the rest.' },
  { q: 'How long does setup take?', a: "About 60 seconds. Install the Shopify app, pick which collections get the try-on widget, and it's live on your product pages. No code required." },
  { q: 'What happens to customer photos?', a: "Baft never stores them. A shopper's photo is used only to render their try-on for that session, is never used for training, and is cleared when the session ends. Shoppers who want to keep a look can download the result to their own device. GDPR and CCPA compliant." },
  { q: 'What does a try-on cost beyond the plan?', a: 'Every plan includes a monthly try-on allowance. Beyond it, extra try-ons are $0.10 on Basic, $0.09 on Standard and $0.08 on Pro. The Free plan stops at 15 try-ons, and if you need more than our plans cover, contact sales for a custom plan.' },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 lg:gap-16 items-start scroll-mt-[90px]">
      <Reveal className="flex flex-col gap-5 lg:sticky lg:top-[110px]">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-[clamp(34px,4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.03]">Questions. Straight answers.</h2>
        <p className="text-[16px]">
          Anything else? <a href="/contact" className="text-baft-heading font-[640] underline underline-offset-4">Send us a note</a> or write to hello@baft.agency.
        </p>
      </Reveal>

      <div className="flex flex-col gap-2.5 min-w-0">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className={`rounded-[18px] border transition-colors duration-500 ease-signature ${isOpen ? 'bg-baft-card border-baft-line' : 'bg-transparent border-baft-line-soft hover:bg-baft-card/60'}`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="w-full bg-transparent cursor-pointer px-5 sm:px-6 py-[18px] grid grid-cols-[28px_minmax(0,1fr)_28px] sm:grid-cols-[40px_minmax(0,1fr)_28px] gap-3 items-center text-left text-baft-heading font-archivo text-[clamp(17px,1.5vw,20px)] font-[640] tracking-[-0.01em]"
                  >
                    <span className="font-plex text-[10.5px] tracking-[0.08em] text-baft-faint">{String(i + 1).padStart(2, '0')}</span>
                    <span>{f.q}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-[transform,background-color,color] duration-500 ease-signature ${isOpen ? 'rotate-45 bg-baft-ink text-baft-neon' : 'bg-baft-paper text-baft-heading'}`}>
                      <Plus size={15} strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-6 pl-[60px] sm:pl-[76px] text-[15.5px] max-w-[680px]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
