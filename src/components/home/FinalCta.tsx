import Button from './Button'

export default function FinalCta() {
  return (
    <section id="cta" className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 sm:py-16 scroll-mt-[90px]">
      <div data-reveal="" className="flex flex-col gap-8">
        <h2 className="text-[clamp(40px,5.6vw,80px)] font-[760] tracking-[-0.04em] leading-[0.95] max-w-[16ch]">
          Transform your store. Open the future.
        </h2>
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <div className="flex gap-3 flex-wrap">
            <Button href="https://apps.shopify.com/baft-virtual-try-on">Start free trial</Button>
            <Button variant="ghost" href="/contact">Contact sales</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
