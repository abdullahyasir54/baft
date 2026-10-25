import Chip, { type ChipTone } from './Chip'

const features: { kicker: string; title: string; body: string; image: string; chips: [string, ChipTone][] }[] = [
  {
    kicker: 'Feature 02 · Setup',
    title: 'Add it from the theme editor.',
    body: 'Drop the Baft try-on button onto any product page as a native theme block. No template edits, no Liquid, no developer.',
    image: '/images/feature-theme-editor.png',
    chips: [['No code', 'ink'], ['Theme block', 'sky']],
  },
  {
    kicker: 'Feature 03 · Catalog',
    title: "Decide what's tryable.",
    body: 'Enable try-on across your whole store, a curated set of products, or entire collections. Switch scope any time.',
    image: '/images/feature-catalog.png',
    chips: [['All products', 'ink'], ['Collections', 'ink']],
  },
  {
    kicker: 'Feature 04 · Controls',
    title: 'Set the limits. Hold the line.',
    body: 'Cap try-ons per visitor, pick a reset window, and let shoppers unlock bonus try-ons by sharing their email. All inside your monthly quota.',
    image: '/images/feature-limits.png',
    chips: [['Per-visitor caps', 'ink'], ['Email unlock', 'sky']],
  },
  {
    kicker: 'Feature 05 · Insights',
    title: 'See what try-on does.',
    body: 'Generations, visitors, add-to-cart events, conversion and satisfaction. With daily activity and a per-product breakdown.',
    image: '/images/feature-insights.png',
    chips: [['Live metrics', 'ink'], ['Satisfaction', 'pink']],
  },
]

export default function AdminFeatures() {
  return (
    <section id="admin" className="max-w-[1216px] mx-auto px-6 md:px-12 pb-14 sm:pb-20 flex flex-col gap-12 sm:gap-14 scroll-mt-[90px]">
      <div data-reveal="" className="flex justify-between items-end gap-8 flex-wrap pb-8 border-b border-baft-ink">
        <h2 className="text-[clamp(36px,4.4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.05] max-w-[16ch]">
          Live in minutes. <span className="mark">Yours to control.</span>
        </h2>
        <span className="font-plex text-[10.5px] tracking-[0.12em] uppercase text-baft-body">Everything merchants get inside Shopify admin</span>
      </div>

      {features.map((f, i) => {
        // Alternate text/image sides row by row
        const textFirst = i % 2 === 0
        return (
          <div key={f.kicker} data-reveal="" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6 md:gap-10 items-center">
            <div className={`flex flex-col gap-[18px] max-w-[440px] order-1 ${textFirst ? 'md:order-1' : 'md:order-2'}`}>
              <span className="mono-kicker">{f.kicker}</span>
              <h3 className="text-[clamp(28px,3.2vw,44px)] font-[720] tracking-[-0.03em] leading-[1.05]">{f.title}</h3>
              <p className="text-[16.5px]">{f.body}</p>
              <div className="flex gap-1.5 flex-wrap">
                {f.chips.map(([label, tone]) => <Chip key={label} tone={tone}>{label}</Chip>)}
              </div>
            </div>
            <div className={`rounded-[18px] overflow-hidden border border-baft-line bg-baft-card order-2 ${textFirst ? 'md:order-2' : 'md:order-1'}`}>
              <img src={f.image} alt={f.title} className="w-full h-auto block" />
            </div>
          </div>
        )
      })}
    </section>
  )
}
