import SiteNav from '@/components/home/SiteNav'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import Process from '@/components/home/Process'
import Impact from '@/components/home/Impact'
import AdminFeatures from '@/components/home/AdminFeatures'
import Pricing from '@/components/home/Pricing'
import Faq from '@/components/home/Faq'
import FinalCta from '@/components/home/FinalCta'
import SiteFooter from '@/components/home/SiteFooter'
import StickyCta from '@/components/home/StickyCta'

export default function Home() {
  return (
    <div className="baft relative min-h-screen overflow-clip">
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Process />
        <Impact />
        <AdminFeatures />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  )
}
