import Button from './Button'

const facts = [
  { k: 'Setup',    v: 'Theme editor · no code' },
  { k: 'Scope',    v: 'Products or whole collections' },
  { k: 'Controls', v: 'Per-visitor caps · quotas' },
  { k: 'Insights', v: 'Usage, leads & add-to-cart' },
]

export default function Hero() {
  return (
    <section id="top" className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 sm:py-12 flex flex-col gap-8 scroll-mt-[90px]">
      <h1 data-reveal="" className="text-[clamp(44px,6.4vw,92px)] font-[760] tracking-[-0.04em] leading-[0.95] max-w-[14ch]">
        See it on.<br />Before it <span className="mark">ships.</span>
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-8 sm:gap-10 items-center">
        <div data-reveal="" className="flex flex-col gap-7 pb-3">
          <p className="text-[clamp(18px,1.6vw,22px)] leading-[1.55] max-w-[480px] text-baft-heading">
            Baft drapes your full catalog onto every customer&apos;s body with neural fabric physics. Shoppers see the fit before they buy. Set up from the Shopify theme editor without a single line of code.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button href="https://apps.shopify.com/baft-virtual-try-on">Add to Shopify</Button>
            <Button variant="ghost" href="/contact">Contact sales</Button>
          </div>
          <div className="flex flex-col gap-3.5 mt-4">
            {facts.map(f => (
              <div key={f.k} className="flex justify-between gap-4">
                <span className="mono-s">{f.k}</span>
                <span className="text-[15px] font-semibold">{f.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal="" className="rounded-[18px] overflow-hidden border border-baft-line bg-baft-card">
          <img src="/images/hero-flow.png" alt="Baft flow: upload your photo, pick a product, see it fitted on you" className="w-full h-auto block" />
        </div>
      </div>
    </section>
  )
}
