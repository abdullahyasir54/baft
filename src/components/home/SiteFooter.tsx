const columns = [
  { title: 'Product', links: [['Process', '/#process'], ['Impact', '/#features'], ['Pricing', '/#pricing'], ['Shopify App Store', '#']] },
  { title: 'Company', links: [['Merchants', '/#merchant'], ['Contact', '/#cta'], ['Careers', '#']] },
  { title: 'Legal',   links: [['Privacy policy', '/privacy'], ['Terms of service', '/terms']] },
]

export default function SiteFooter() {
  return (
    <footer className="max-w-[1216px] mx-auto px-6 pb-6">
      <div className="bg-baft-ink text-baft-snow rounded-[18px] pt-12 px-10 pb-7 flex flex-col gap-12">
        <div className="flex justify-between gap-12 flex-wrap">
          <div className="flex flex-col gap-4 max-w-[340px]">
            <img src="/images/baft-logo-white.png" alt="baft" className="h-10 w-auto block self-start" />
            <p className="text-[14.5px] text-baft-snow/65">
              Virtual try-on for Shopify. Neural fabric physics that drape your catalog onto every customer.
            </p>
          </div>
          <div className="flex gap-16 flex-wrap">
            {columns.map(col => (
              <div key={col.title} className="flex flex-col gap-2.5">
                <span className="font-plex text-[10px] tracking-[0.16em] uppercase text-baft-snow/50">{col.title}</span>
                {col.links.map(([label, href]) => (
                  <a key={label} href={href} className="text-[13.5px] text-baft-snow no-underline hover:underline">{label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-baft-snow/[0.14] pt-5 flex justify-between gap-4 flex-wrap font-plex text-[10.5px] tracking-[0.08em] uppercase text-baft-snow/50">
          <span>© 2026 Baft AI · Neural draping engine</span>
          <span>Shopify app · Neural engine v4.0</span>
        </div>
      </div>
    </footer>
  )
}
