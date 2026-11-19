import type { Metadata, Viewport } from 'next'
import MotionProvider from '@/components/ui/MotionProvider'
import './globals.css'

const description = "Baft lets shoppers try on your apparel with a photo or their camera, right on the product page. Set up from the Shopify theme editor without a single line of code."

export const metadata: Metadata = {
  metadataBase: new URL('https://baft.agency'),
  title: 'Baft AI | Virtual Try-On for Shopify',
  description,
  openGraph: {
    title: 'Baft AI | Virtual Try-On for Shopify',
    description,
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'A shopper’s photo, a linen suit, and the shopper wearing the suit' }],
  },
  twitter: { card: 'summary_large_image', title: 'Baft AI | Virtual Try-On for Shopify', description },
}

export const viewport: Viewport = { themeColor: '#16121F' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        {/* Without JS the scroll reveals never run, so show everything. */}
        <noscript>
          <style>{'[data-rv]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
