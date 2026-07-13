import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Baft AI',
  description: 'The terms that govern use of the Baft AI virtual try-on app for Shopify, for merchants and shoppers alike.',
}

const sections = [
  {
    heading: '1. Acceptance of Terms',
    body: [
      `These Terms of Service ("Terms") govern access to and use of the Baft AI virtual try-on application ("Baft", the "App") by Shopify merchants ("Merchants") and their end customers ("Shoppers"). By installing the App, or by using virtual try-on on a store that has it installed, you agree to be bound by these Terms.`,
      `If you are installing Baft on behalf of a business, you represent that you have authority to bind that business, and "you" refers to that business.`,
    ],
  },
  {
    heading: '2. The Service',
    body: [
      `Baft is a Shopify app that lets Shoppers generate a virtual try-on preview of a Merchant's products using an uploaded or captured photo. Try-on previews are generated for that session on the Shopper's device and are not saved by Baft — see our Privacy Policy for details on how image data is handled.`,
      `We may add, change, or remove features of the App at any time, and may suspend or discontinue the App in whole or part.`,
    ],
  },
  {
    heading: '3. Eligibility & Accounts',
    body: [
      `Merchants must have a valid Shopify account in good standing to install Baft. Shoppers using try-on must be legally able to consent to these Terms in their jurisdiction, or have the consent of a parent or guardian.`,
      `You are responsible for maintaining the security of any account credentials associated with your use of the App and for all activity that occurs under them.`,
    ],
  },
  {
    heading: '4. Merchant Responsibilities',
    body: [
      `Merchants are responsible for the accuracy of the product catalog data (images, titles, variants) supplied to Baft, and for ensuring their own store's use of Baft complies with applicable law, including any disclosures owed to Shoppers.`,
      `Merchants must not use the App to process content that is unlawful, infringing, or that they do not have the right to use.`,
    ],
  },
  {
    heading: '5. Shopper Content & License',
    body: [
      `Any photo a Shopper uploads or captures for try-on remains theirs. By submitting it, the Shopper grants Baft a limited, temporary license to process that image solely to generate the try-on preview for that session, as described in our Privacy Policy. This license ends when the session ends, at which point the image is cleaned up and not retained.`,
      `Shoppers must only submit images they have the right to use, and must not upload images depicting anyone else without that person's consent.`,
    ],
  },
  {
    heading: '6. Fees & Billing',
    body: [
      `Where Baft is offered on a paid plan, fees are billed to the Merchant through Shopify's standard billing system, in accordance with the pricing presented at checkout or in the Shopify App Store listing. Fees are non-refundable except where required by law.`,
    ],
  },
  {
    heading: '7. Acceptable Use',
    body: [
      `You agree not to: reverse engineer or misuse the App's rendering pipeline; attempt to extract, intercept, or persist Shopper images beyond a live session; use the App to harass, defame, or violate the rights of others; or interfere with the App's operation or security.`,
    ],
  },
  {
    heading: '8. Intellectual Property',
    body: [
      `Baft and its underlying technology, branding, and software are owned by us or our licensors and are protected by intellectual property law. These Terms do not grant you any rights to our trademarks, logos, or proprietary technology beyond what is needed to use the App as intended.`,
    ],
  },
  {
    heading: '9. Disclaimers',
    body: [
      `The App and try-on previews are provided "as is" and "as available," without warranties of any kind, express or implied, including fitness for a particular purpose or non-infringement. A try-on preview is a visual approximation and is not a guarantee of exact fit, color, or appearance.`,
    ],
  },
  {
    heading: '10. Limitation of Liability',
    body: [
      `To the fullest extent permitted by law, Baft and its team will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, or data, arising from your use of the App.`,
    ],
  },
  {
    heading: '11. Termination',
    body: [
      `Merchants may uninstall Baft at any time from their Shopify admin. We may suspend or terminate access to the App for any user who violates these Terms or whose use poses a risk to the App, other users, or third parties.`,
    ],
  },
  {
    heading: '12. Changes to These Terms',
    body: [
      `We may update these Terms from time to time. Material changes will be reflected by an updated "Last updated" date below, and where required, we will provide additional notice. Continued use of the App after changes take effect constitutes acceptance of the updated Terms.`,
    ],
  },
  {
    heading: '13. Contact Us',
    body: [
      `Questions about these Terms can be sent to baft.support@gmail.com.`,
    ],
  },
]

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0c0c0c] text-white pt-40 pb-32 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mx-auto">
          <p className="font-label-bold text-label-bold uppercase tracking-widest text-[#D6E702] mb-sm">
            Legal
          </p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-headline-lg mb-sm tracking-tight">
            Terms of Service
          </h1>
          <p className="font-body-md text-body-md text-white/40 mb-xl">
            Last updated: July 13, 2026
          </p>

          <div className="flex flex-col gap-xl">
            {sections.map(section => (
              <section key={section.heading}>
                <h2 className="font-headline-md text-headline-md mb-md">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-sm">
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="font-body-lg text-body-lg text-white/60">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
