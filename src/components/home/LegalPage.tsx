import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import Eyebrow from './Eyebrow'

type Section = { heading: string; body: string[] }

// Headings arrive as "4. Image & Try-On Data Retention"; split off the number
// so it can sit in the mono gutter.
const split = (heading: string) => {
  const m = heading.match(/^(\d+)\.\s*(.*)$/)
  return m ? { n: m[1].padStart(2, '0'), title: m[2] } : { n: '', title: heading }
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function LegalPage({ title, updated, intro, sections }: {
  title: string
  updated: string
  intro: string
  sections: Section[]
}) {
  const items = sections.map(s => ({ ...s, ...split(s.heading), id: slug(split(s.heading).title) }))

  return (
    <div className="baft relative min-h-screen overflow-clip">
      <SiteNav />
      <main className="max-w-[1216px] mx-auto px-6 md:px-12 pt-8 sm:pt-12 pb-14 sm:pb-20 flex flex-wrap gap-10 lg:gap-12 items-start">
        <aside className="flex-[1_1_300px] flex flex-col gap-6 lg:sticky lg:top-[110px]">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="text-[clamp(44px,5.6vw,80px)] font-[760] tracking-[-0.04em] leading-[0.95]">{title}</h1>
          <p className="text-[16px] max-w-[380px]">{intro}</p>
          <span className="mono-s">Last updated · {updated}</span>
          <nav aria-label="Sections" className="hidden lg:flex flex-col border-t border-baft-line mt-2">
            {items.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="grid grid-cols-[32px_minmax(0,1fr)] gap-2 py-2 border-b border-baft-line-soft text-[13.5px] font-[560] text-baft-heading no-underline hover:text-baft-accent"
              >
                <span className="font-plex text-[10.5px] tracking-[0.08em] text-baft-faint pt-[3px]">{s.n}</span>
                <span>{s.title}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex flex-col flex-[2_1_480px] min-w-0 border-t border-baft-ink">
          {items.map(s => (
            <section
              key={s.id}
              id={s.id}
              className="grid grid-cols-[32px_minmax(0,1fr)] sm:grid-cols-[48px_minmax(0,1fr)] gap-3 sm:gap-4 py-7 sm:py-8 border-b border-baft-line scroll-mt-[110px]"
            >
              <span className="font-plex text-[10.5px] tracking-[0.08em] text-baft-faint pt-2">{s.n}</span>
              <div className="flex flex-col gap-4">
                <h2 className="text-[clamp(22px,2.2vw,28px)] font-[720] tracking-[-0.03em] leading-[1.15]">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="text-[15.5px] max-w-[640px]">{p}</p>
                ))}
              </div>
            </section>
          ))}
          <p className="text-[13.5px] pt-6">
            Questions? Write to <a href="mailto:baft.support@gmail.com" className="text-baft-heading font-[640] underline">baft.support@gmail.com</a>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
