'use client'

import { useState } from 'react'
import Eyebrow from './Eyebrow'

const FAQS = [
  { q: 'How does Baft work?', a: 'A shopper uploads one photo. The neural engine reads body geometry, lighting and pose, then drapes any garment from your catalog with physically accurate fabric behaviour. The render comes back in under a second.' },
  { q: 'Do I need to reshoot my catalog?', a: 'No. Baft works from the product photography you already have. Upload garment assets or model photos into the dashboard and the engine does the rest.' },
  { q: 'How long does setup take?', a: "About 60 seconds. Install the Shopify app, pick which collections get the try-on widget, and it's live on your product pages. No code required." },
  { q: 'What happens to customer photos?', a: "Baft never stores them. A shopper's photo is used only to render their try-on for that session, is never used for training, and is cleared when the session ends. Shoppers who want to keep a look can download the result to their own device. GDPR and CCPA compliant." },
  { q: 'What does a try-on cost beyond the plan?', a: 'Every plan includes a monthly try-on allowance. Beyond it, extra try-ons are $0.08 each on any tier.' },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="max-w-[1216px] mx-auto px-6 md:px-12 pb-14 sm:pb-20 flex flex-wrap gap-8 lg:gap-12 items-start">
      <div data-reveal="" className="flex-[1_1_300px] flex flex-col gap-5 lg:sticky lg:top-[110px]">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-[clamp(32px,3.6vw,44px)] font-[720] tracking-[-0.03em] leading-[1.05]">Questions. Straight answers.</h2>
        <p className="text-[16px]">Anything else? Write to hello@baft.agency.</p>
      </div>
      <div className="flex flex-col flex-[2_1_480px] min-w-0 border-t border-baft-ink">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} data-reveal="" className="border-b border-baft-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full bg-transparent cursor-pointer py-[18px] grid grid-cols-[32px_minmax(0,1fr)_24px] sm:grid-cols-[48px_minmax(0,1fr)_24px] gap-4 items-baseline text-left text-baft-heading font-archivo text-[clamp(17px,1.6vw,21px)] font-[640] tracking-[-0.01em]"
              >
                <span className="font-plex text-[10.5px] tracking-[0.08em] text-baft-faint">{String(i + 1).padStart(2, '0')}</span>
                <span>{f.q}</span>
                <span className="font-plex text-[18px] text-baft-accent text-right">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <p className="pb-7 pl-12 sm:pl-16 text-[15.5px] max-w-[620px]">{f.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
