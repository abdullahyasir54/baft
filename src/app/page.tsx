import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LogoCloud from '@/components/LogoCloud'
import ProcessShowcase from '@/components/ProcessShowcase'
import Impact from '@/components/Impact'
import Marquee from '@/components/Marquee'
import Testimonial from '@/components/Testimonial'
import Pricing from '@/components/Pricing'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoCloud />
      <ProcessShowcase />
      <Impact />
      <Marquee />
      <Testimonial />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  )
}
