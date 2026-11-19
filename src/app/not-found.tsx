import SiteNav from '@/components/home/SiteNav'
import SiteFooter from '@/components/home/SiteFooter'
import Button from '@/components/home/Button'

export default function NotFound() {
  return (
    <div className="baft relative min-h-screen overflow-clip">
      <SiteNav />
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 sm:py-28 flex flex-col gap-6 items-start">
        <span className="mono-s">Error 404</span>
        <h1 className="text-[clamp(44px,5.6vw,80px)] font-[760] tracking-[-0.04em] leading-[0.95]">That page doesn’t <span className="mark">fit.</span></h1>
        <p className="text-[17px] max-w-[440px]">The link is broken or the page has moved. The home page has everything.</p>
        <Button href="/">Back to home →</Button>
      </main>
      <SiteFooter />
    </div>
  )
}
