import Button from './Button'
import Reveal from '../ui/Reveal'

const INSTALL_URL = 'https://apps.shopify.com/baft-virtual-try-on'

export default function FinalCta() {
  return (
    <section id="cta" className="max-w-[1440px] mx-auto px-3 sm:px-6 py-6 sm:py-8 scroll-mt-[90px]">
      <Reveal>
      <div data-theme="dark" className="relative overflow-hidden bg-baft-ink text-baft-snow rounded-[18px] px-6 py-14 sm:px-12 sm:py-20 flex flex-col gap-8">
        <div aria-hidden="true" className="absolute -top-48 right-[-10%] w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(212,228,36,0.22),transparent_62%)] pointer-events-none" />
        <div aria-hidden="true" className="absolute -bottom-56 left-[-8%] w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(199,172,236,0.18),transparent_62%)] pointer-events-none" />
        <h2 className="relative text-[clamp(40px,6vw,96px)] font-[760] tracking-[-0.045em] leading-[0.93] max-w-[14ch] text-baft-snow">
          Let them try it on before they buy.
        </h2>
        <div className="relative flex justify-between items-end gap-6 flex-wrap">
          <div className="flex gap-3 flex-wrap">
            <Button href={INSTALL_URL}>Start free on Shopify →</Button>
            <Button variant="ghost" href="/contact">Contact sales</Button>
          </div>
          <p className="text-[14px] text-baft-snow/65 max-w-[340px]">The free plan covers 15 try-ons a month. Add the block from your theme editor and it’s on your product pages.</p>
        </div>
      </div>
      </Reveal>
    </section>
  )
}
