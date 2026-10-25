import Button from './Button'

export default function FinalCta() {
  return (
    <section id="cta" className="max-w-[1216px] mx-auto px-6 md:px-12 pb-6 scroll-mt-[90px]">
      <div data-reveal="" className="border-t border-baft-ink pt-14 pb-12 flex flex-col gap-7">
        <h2 className="text-[clamp(40px,5.6vw,80px)] font-[760] tracking-[-0.04em] leading-[0.95] max-w-[16ch]">
          Transform your store. Open the future.
        </h2>
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <div className="flex gap-3 flex-wrap">
            <Button href="#pricing">Start free trial</Button>
            <Button variant="ghost" href="#demo">Try the widget</Button>
          </div>
          <span className="font-plex text-[10.5px] tracking-[0.12em] uppercase text-baft-body">
            1,200+ Shopify merchants · 14 days free · live in 60s
          </span>
        </div>
      </div>
    </section>
  )
}
