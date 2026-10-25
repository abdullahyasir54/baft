import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Baft AI | Virtual Try-On for Shopify',
  description: "Baft drapes your full catalog onto every customer's body with neural fabric physics. Shoppers see the fit before they buy. Set up from the Shopify theme editor without a single line of code.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
