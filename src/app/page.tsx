import SiteNav from '@/components/home/SiteNav'
import Hero from '@/components/home/Hero'
import Process from '@/components/home/Process'
import Impact from '@/components/home/Impact'
import AdminFeatures from '@/components/home/AdminFeatures'
import Demo from '@/components/home/Demo'
import Quote from '@/components/home/Quote'
import Pricing from '@/components/home/Pricing'
import Faq from '@/components/home/Faq'
import FinalCta from '@/components/home/FinalCta'
import SiteFooter from '@/components/home/SiteFooter'
import RevealObserver from '@/components/home/RevealObserver'

export default function Home() {
  return (
    <div className="baft relative min-h-screen overflow-clip">
      <SiteNav />
      <main>
        <Hero />
        <Process />
        <Impact />
        <AdminFeatures />
        <Demo />
        <Quote />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <RevealObserver />
    </div>
  )
}
