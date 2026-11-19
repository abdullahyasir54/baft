import { ArrowRight, Check } from 'lucide-react'
import Button from './Button'
import Reveal from '../ui/Reveal'

const INSTALL_URL = 'https://apps.shopify.com/baft-virtual-try-on'
const points = ['Free plan available', '14-day trial on paid plans', 'Set up from the theme editor']

export default function FinalCta() {
  return (
    <section id="cta" className="max-w-[1440px] mx-auto px-3 sm:px-6 py-6 sm:py-8 scroll-mt-[90px]">
      <Reveal>
        <div data-theme="dark" className="relative overflow-hidden bg-baft-ink text-baft-snow rounded-[24px] px-6 py-14 sm:px-12 sm:py-20 flex flex-col gap-8">
          <div aria-hidden="true" className="absolute -top-48 right-[-10%] w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(212,228,36,0.22),transparent_62%)] pointer-events-none" />
          <div aria-hidden="true" className="absolute -bottom-56 left-[-8%] w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(199,172,236,0.18),transparent_62%)] pointer-events-none" />
          <span className="relative inline-flex items-center gap-2 font-plex text-[11px] tracking-[0.22em] uppercase text-baft-neon">
            <span aria-hidden="true" className="w-1.5 h-1.5 bg-current" />Ready when you are
          </span>
          <h2 className="relative text-[clamp(40px,6vw,96px)] font-[760] tracking-[-0.045em] leading-[0.93] max-w-[15ch] text-baft-snow">
            Transform your store. <span className="text-baft-neon">Open the future.</span>
          </h2>
          <div className="relative flex justify-between items-end gap-6 flex-wrap">
            <div className="flex gap-3 flex-wrap">
              <Button href={INSTALL_URL}>Start free on Shopify <ArrowRight size={16} /></Button>
              <Button variant="ghost" href="/contact">Contact sales</Button>
            </div>
            <ul className="flex gap-x-5 gap-y-2 flex-wrap">
              {points.map(t => (
                <li key={t} className="inline-flex items-center gap-1.5 text-[13.5px] text-baft-snow/70">
                  <Check size={14} strokeWidth={3} className="text-baft-neon" />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
