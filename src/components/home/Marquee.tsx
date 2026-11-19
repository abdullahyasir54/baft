// Scrolling strip of what the app does, in the App Store listing's own terms.
const items = [
  'Photo or camera try-on',
  'Native theme block',
  'No code setup',
  'Products or collections',
  'Per-visitor limits',
  'Email unlock',
  'Watermark-free results',
  'Add-to-cart tracking',
  'Satisfaction feedback',
]

export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex items-center flex-none">
      {items.map(it => (
        <li key={it} className="flex items-center gap-8 pr-8 font-plex text-[11px] tracking-[0.2em] uppercase text-baft-snow/80 whitespace-nowrap">
          {it}<span aria-hidden="true" className="w-1.5 h-1.5 bg-baft-neon flex-none" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6">
      <div className="marquee bg-baft-ink rounded-[18px] py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track">{row(false)}{row(true)}</div>
      </div>
    </div>
  )
}
