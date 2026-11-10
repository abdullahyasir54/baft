import type { Metadata } from 'next'
import SiteNav from '@/components/home/SiteNav'
import SiteFooter from '@/components/home/SiteFooter'
import Eyebrow from '@/components/home/Eyebrow'
import ContactForm from '@/components/home/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Baft AI',
  description: 'Talk to the Baft team about a custom plan, support, or anything else.',
}

export default function ContactPage() {
  return (
    <div className="baft relative min-h-screen overflow-clip">
      <SiteNav />
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 sm:py-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-10 lg:gap-16 items-start">
        <div className="flex flex-col gap-6 lg:sticky lg:top-[110px]">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-[clamp(44px,5.6vw,80px)] font-[760] tracking-[-0.04em] leading-[0.95]">Let&apos;s talk.</h1>
          <p className="text-[17px] max-w-[420px]">
            Need a custom plan, have a question about the app, or want help getting set up? Send us a note and we&apos;ll get back to you.
          </p>
          <a href="mailto:baft.support@gmail.com" className="text-baft-heading font-[640] underline">baft.support@gmail.com</a>
        </div>
        <ContactForm />
      </main>
      <SiteFooter />
    </div>
  )
}
