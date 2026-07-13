import type { Metadata } from 'next'
import { Syne, Hanken_Grotesk } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Baft AI | Virtual Try-On Revitalized',
  description: 'Baft AI merges hyper-realistic rendering with Shopify simplicity. Elevate your brand experience and slash return rates by 40%.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${hanken.variable} font-hanken overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
