export default function Quote() {
  return (
    <section id="merchant" className="max-w-[1216px] mx-auto px-6 md:px-12 pb-14 sm:pb-20 scroll-mt-[90px]">
      <div data-reveal="" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-12 items-end">
        <div className="md:col-span-2 flex flex-col gap-8">
          <span className="text-[clamp(80px,8vw,120px)] leading-[0.6] font-[760] text-baft-pink tracking-[-0.05em]">“</span>
          <p className="text-[clamp(24px,2.6vw,36px)] font-[680] tracking-[-0.03em] leading-[1.15] text-baft-heading text-balance">
            Baft didn&apos;t just change our conversion rate; it changed how we design. Knowing customers can{' '}
            <span className="mark">see the drape instantly</span> has redefined our digital catalog.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {/* Avatar placeholder until a real portrait is supplied */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--pink-tint-chip)] flex items-center justify-center">
            <span className="text-[28px] font-[740] tracking-[-0.04em] text-baft-pink-text">ES</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[17px] font-[640]">Elena Sterling</span>
            <span className="mono-s">CEO · Sterling Collective</span>
          </div>
          <div className="flex gap-6 border-t border-baft-line pt-4">
            <div className="flex flex-col">
              <span className="text-[28px] font-[740] tracking-[-0.04em] text-baft-pink-text">−52%</span>
              <span className="font-plex text-[10px] tracking-[0.12em] uppercase text-baft-body">Returns</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[28px] font-[740] tracking-[-0.04em] text-baft-sky-text">+23%</span>
              <span className="font-plex text-[10px] tracking-[0.12em] uppercase text-baft-body">Conversion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
