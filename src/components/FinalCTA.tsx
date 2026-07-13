export default function FinalCTA() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop bg-[#0c0c0c] relative md:py-32">
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(circle at center, rgba(214,231,2,0.10) 0%, transparent 60%)' }}
      />
      <div className="relative z-10 text-center max-w-4xl mx-auto py-xl border-y-2 border-white/10">
        <h2 className="font-display-lg text-display-lg-mobile md:text-[64px] mb-lg leading-tight">
          Transform Your Store. <br />
          <span className="shiny-gradient">Open the Future.</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-md">
          <button className="bg-[#D6E702] text-black font-label-bold text-headline-md px-xl py-md border-2 border-black hard-shadow">
            Start Free Trial
          </button>
          <p className="text-white/40 max-w-xs text-left text-sm">
            Join 1,200+ Shopify merchants redefining the fashion experience.
          </p>
        </div>
      </div>
    </section>
  )
}
