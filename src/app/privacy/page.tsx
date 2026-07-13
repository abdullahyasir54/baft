import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Baft AI',
  description: 'How Baft AI collects, uses, and protects data — including customer photos used for virtual try-on — across the Baft Shopify app.',
}

const sections = [
  {
    heading: '1. Overview',
    body: [
      `Baft AI ("Baft", "we", "us", or "our") provides a virtual try-on application for Shopify merchants. This Privacy Policy explains what data we collect from merchants and their customers (“Shoppers”) when the Baft app is installed on a Shopify store, how we use it, and the choices you have.`,
      `By installing Baft on your store, or by using virtual try-on on a store that has Baft installed, you agree to the practices described here. If you do not agree, please do not use the app or the try-on feature.`,
    ],
  },
  {
    heading: '2. Data We Collect',
    body: [
      `From merchants: store name and domain, contact and billing information, product catalog data (images, titles, variants) needed to power try-on, and usage analytics about how the app is configured and used.`,
      `From shoppers: photos or images a shopper uploads or captures to generate a virtual try-on render, body/fit inputs the shopper voluntarily provides (such as height or size), device and browser information, and interaction data (e.g. which products were tried on).`,
      `Shopper photos are processed to generate try-on renders and are not used to build a marketing profile of the shopper, and are never sold.`,
    ],
  },
  {
    heading: '3. How We Use Data',
    body: [
      `To generate virtual try-on renders and deliver the core functionality of the app.`,
      `To operate, maintain, secure, and improve Baft, including diagnosing errors and preventing abuse.`,
      `To communicate with merchants about their account, billing, and material changes to the app or this policy.`,
      `To produce aggregated, de-identified analytics (e.g. conversion or return-rate impact) shared with merchants about their own store — this aggregated data cannot be used to identify an individual shopper.`,
    ],
  },
  {
    heading: '4. Image & Try-On Data Retention',
    body: [
      `Shopper-uploaded photos are used to render a try-on result and are retained only as long as needed to provide the session and short-term support/debugging, after which they are automatically deleted from active storage — by default within 30 days, unless the shopper has saved a look to their own account or a merchant's data-retention plan specifies otherwise.`,
      `Shoppers can request immediate deletion of an uploaded photo at any time, as described in Section 7.`,
    ],
  },
  {
    heading: '5. Sharing & Third Parties',
    body: [
      `Shopify: Baft operates on the Shopify platform and receives store and order data through Shopify's APIs, governed also by Shopify's own privacy policy.`,
      `Service providers: we use vetted infrastructure, cloud hosting, and machine-learning inference providers solely to render try-on results and run the app — under contracts that prohibit them from using shopper photos for their own purposes.`,
      `Merchants: a merchant using Baft on their store can see aggregate analytics but does not receive a shopper's raw uploaded photos by default.`,
      `Legal: we may disclose data if required by law, subpoena, or to protect the rights, property, or safety of Baft, our merchants, or others.`,
      `We do not sell shopper photos or personal data to third parties.`,
    ],
  },
  {
    heading: '6. Cookies & Similar Technologies',
    body: [
      `Baft and Shopify use cookies and similar technologies to keep a try-on session working, remember preferences, and understand aggregate app usage. You can control cookies through your browser settings; disabling them may limit try-on functionality.`,
    ],
  },
  {
    heading: '7. Your Rights & Choices',
    body: [
      `Depending on where you live (including under GDPR in the EU/UK and CCPA/CPRA in California), you may have the right to access, correct, delete, or export your personal data, and to object to or restrict certain processing.`,
      `To exercise these rights — including requesting deletion of an uploaded try-on photo — contact us using the details in Section 10. We will respond within the timeframe required by applicable law.`,
    ],
  },
  {
    heading: '8. Children’s Privacy',
    body: [
      `Baft is not directed to children under 16, and we do not knowingly collect personal data, including photos, from children under 16. If you believe a child has provided us data, contact us and we will delete it.`,
    ],
  },
  {
    heading: '9. International Data Transfers & Security',
    body: [
      `Data may be processed in countries other than your own. Where required, we rely on appropriate safeguards (such as standard contractual clauses) for cross-border transfers.`,
      `We use industry-standard technical and organizational measures — including encryption in transit and access controls — to protect data. No system is perfectly secure, and we cannot guarantee absolute security.`,
    ],
  },
  {
    heading: '10. Contact Us',
    body: [
      `Questions about this policy, or requests to access or delete your data, can be sent to baft.support@gmail.com.`,
    ],
  },
  {
    heading: '11. Changes to This Policy',
    body: [
      `We may update this Privacy Policy from time to time. Material changes will be reflected by an updated "Last updated" date below, and where required, we will provide additional notice.`,
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0c0c0c] text-white pt-40 pb-32 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mx-auto">
          <p className="font-label-bold text-label-bold uppercase tracking-widest text-[#D6E702] mb-sm">
            Legal
          </p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-headline-lg mb-sm tracking-tight">
            Privacy Policy
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
