'use client'

import { useState } from 'react'

type Billing = 'monthly' | 'yearly'

const plans = [
  {
    name: 'STARTER',
    nameColor: 'text-[#D6E702]',
    price: { monthly: '$14.99', yearly: '$11.99' },
    borderClass: 'border-white/10',
    trialBorder: 'border-[#D6E702]',
    trialText: 'text-white/80',
    features: ['50 SKUs Included', 'Standard AI Engine', 'Shopify Integration'],
    featureColor: 'text-white/60',
    checkColor: 'text-[#D6E702]',
    extra: '$0.08 / extra try-on',
    extraColor: 'text-[#D6E702]',
    cta: 'Select Plan',
    ctaClass: 'border-2 border-white text-white hover:bg-white hover:text-black',
    featured: false,
    scaleClass: '',
  },
  {
    name: 'PROFESSIONAL',
    nameColor: 'text-[#D6E702]',
    price: { monthly: '$39.99', yearly: '$31.99' },
    borderClass: 'border-[#D6E702]',
    trialBorder: 'border-[#D6E702]',
    trialText: 'text-[#D6E702]',
    features: ['Unlimited SKUs', 'Ultra-HD AI Rendering', 'Priority Support', 'Custom Theme UI'],
    featureColor: 'text-white',
    checkColor: 'text-[#D6E702]',
    extra: '$0.08 / extra try-on',
    extraColor: 'text-[#D6E702]',
    cta: 'Select Pro',
    ctaClass: 'bg-[#D6E702] text-black hard-shadow hover:translate-x-[2px] hover:translate-y-[2px]',
    featured: true,
    scaleClass: 'md:scale-105 z-10 shadow-2xl',
  },
  {
    name: 'SCALE',
    nameColor: 'text-primary-fixed',
    price: { monthly: '$69.99', yearly: '$55.99' },
    borderClass: 'border-white/10',
    trialBorder: 'border-primary-fixed',
    trialText: 'text-white/80',
    features: ['API Access', 'Dedicated AI Training', 'Custom Contracts'],
    featureColor: 'text-white/60',
    checkColor: 'text-primary-fixed',
    extra: '$0.08 / extra try-on',
    extraColor: 'text-primary-fixed',
    cta: 'Select Scale',
    ctaClass: 'border-2 border-white text-white hover:bg-white hover:text-black',
    featured: false,
    scaleClass: '',
  },
]

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  )
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')

  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop bg-[#0c0c0c] md:py-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
        <div>
          <h2 className="font-display-lg text-headline-lg mb-sm">
            Scalable <span className="shiny-gradient">Intelligence.</span>
          </h2>
          <p className="text-white/50">Choose the layer that fits your brand&apos;s ambitions.</p>
        </div>
        <div className="bg-white/5 p-xs border border-white/10 flex">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-lg py-sm font-label-bold text-label-bold transition-colors ${billing === 'monthly' ? 'bg-white text-black' : 'text-white/50'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-lg py-sm font-label-bold text-label-bold transition-colors ${billing === 'yearly' ? 'bg-white text-black' : 'text-white/50'}`}
          >
            Yearly (-20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`liquid-glass p-lg border-2 ${plan.borderClass} flex flex-col relative ${plan.scaleClass} transition-all duration-300 hover:scale-[1.01]`}
          >
            {plan.featured && (
              <div className="absolute top-0 right-0 bg-[#D6E702] text-black px-md py-xs font-label-bold text-xs">
                MOST POPULAR
              </div>
            )}
            <div className="mb-lg">
              <div className={`font-label-bold text-label-bold ${plan.nameColor} mb-sm`}>{plan.name}</div>
              <div className="text-display-lg-mobile font-bold">
                {plan.price[billing]}
                <span className="text-lg text-white/40">/mo</span>
              </div>
              <div className={`mt-xs text-xs font-label-bold ${plan.trialText} border-l-2 ${plan.trialBorder} pl-2 uppercase tracking-wider`}>
                14 days free trial — 10 Tryons
              </div>
            </div>

            <ul className="space-y-sm mb-xl flex-grow">
              {plan.features.map(f => (
                <li key={f} className={`flex items-center gap-sm ${plan.featureColor}`}>
                  <CheckIcon className={plan.checkColor} />
                  {f}
                </li>
              ))}
              <li className={`flex items-center gap-sm font-label-bold text-label-bold ${plan.extraColor}`}>
                <PlusIcon className={plan.extraColor} />
                {plan.extra}
              </li>
            </ul>

            <button className={`w-full py-md font-label-bold text-label-bold transition-all ${plan.ctaClass}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
