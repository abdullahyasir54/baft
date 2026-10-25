'use client'

import { useState } from 'react'
import Chip from './Chip'
import Eyebrow from './Eyebrow'

const PLANS = [
  { name: 'Starter',      base: 14.99, included: 200,  items: ['50 SKUs', 'Standard AI engine', 'Shopify integration'] },
  { name: 'Professional', base: 39.99, included: 1000, items: ['Unlimited SKUs', 'Ultra-HD rendering', 'Priority support', 'Custom theme UI'] },
  { name: 'Scale',        base: 69.99, included: 3000, items: ['API access', 'Dedicated AI training', 'Custom contracts'] },
]
const OVERAGE = 0.08

const money = (n: number) => '$' + n.toFixed(2)

export default function Pricing() {
  const [tryons, setTryons] = useState(600)
  const [yearly, setYearly] = useState(false)
  // -1 = follow the calculator's best fit; otherwise the card the visitor clicked
  const [selected, setSelected] = useState(1)

  const mul = yearly ? 0.8 : 1
  const costs = PLANS.map(p => p.base * mul + Math.max(0, tryons - p.included) * OVERAGE)
  const bestIdx = costs.indexOf(Math.min(...costs))

  return (
    <section id="pricing" className="max-w-[1216px] mx-auto px-6 md:px-12 py-14 sm:py-20 border-t border-baft-line scroll-mt-[90px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-10 lg:gap-12 items-start">
        <div data-reveal="" className="lg:sticky lg:top-[110px] flex flex-col gap-7">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="text-[clamp(36px,4.4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.05]">Pay for fits. Not for seats.</h2>

          <div className="flex flex-col gap-[14px] bg-baft-card border border-baft-line rounded-[18px] p-5 sm:p-7">
            <div className="flex justify-between items-baseline gap-3">
              <span className="mono-s">Try-ons per month</span>
              <span className="text-[36px] font-[740] tracking-[-0.04em] tabular-nums">{tryons.toLocaleString('en-US')}</span>
            </div>
            <input
              type="range" min={0} max={6000} step={50} value={tryons}
              onChange={e => { setTryons(Number(e.target.value)); setSelected(-1) }}
              aria-label="Try-ons per month"
            />
            <div className="flex justify-between font-plex text-[10px] tracking-[0.08em] text-baft-faint">
              <span>0</span><span>6,000</span>
            </div>
            <div className="border-t border-baft-line-soft pt-4 flex flex-col gap-1.5">
              <span className="font-plex text-[10.5px] tracking-[0.08em] uppercase text-baft-accent">Best fit · {PLANS[bestIdx].name}</span>
              <span className="text-[15px] text-baft-body">
                About <strong className="text-baft-heading font-[640]">{money(costs[bestIdx])}/mo</strong> at this volume, including $0.08 per extra try-on.
              </span>
            </div>
          </div>

          <div className="flex gap-1.5">
            <button type="button" onClick={() => setYearly(false)} className="cursor-pointer" aria-pressed={!yearly}>
              <Chip tone={yearly ? 'neon' : 'ink'}>Monthly</Chip>
            </button>
            <button type="button" onClick={() => setYearly(true)} className="cursor-pointer" aria-pressed={yearly}>
              <Chip tone={yearly ? 'ink' : 'neon'}>Yearly · −20%</Chip>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {PLANS.map((p, i) => {
            const hi = selected >= 0 ? selected === i : bestIdx === i
            const tag = i === bestIdx ? 'Best fit for your volume' : i === 1 ? 'Most popular' : ''
            return (
              <div
                key={p.name}
                data-reveal=""
                onClick={() => setSelected(i)}
                className={`border border-baft-line rounded-[18px] px-5 sm:px-7 py-[22px] flex flex-col gap-[14px] cursor-pointer transition-all duration-[450ms] ease-signature ${
                  hi ? 'bg-baft-ink text-baft-snow' : 'bg-baft-card text-baft-heading'
                }`}
              >
                <div className="flex justify-between items-center gap-3">
                  <span className={`font-plex text-[11px] tracking-[0.22em] uppercase ${hi ? 'text-baft-neon' : 'text-baft-accent'}`}>{p.name}</span>
                  {tag && <span className="font-plex text-[10px] tracking-[0.12em] uppercase opacity-70">{tag}</span>}
                </div>
                <div className="flex justify-between items-end gap-4 flex-wrap">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[40px] font-[740] tracking-[-0.04em] leading-none tabular-nums">{money(p.base * mul)}</span>
                    <span className="font-plex text-[10.5px] tracking-[0.08em] uppercase opacity-60">/ mo</span>
                  </div>
                  <span className="font-plex text-[10.5px] tracking-[0.08em] uppercase opacity-60">
                    {p.included.toLocaleString('en-US')} try-ons included · est. {money(costs[i])}
                  </span>
                </div>
                <div className="flex gap-x-5 gap-y-2 flex-wrap">
                  {p.items.map(it => (
                    <span key={it} className="inline-flex gap-2 items-center text-[14.5px]">
                      <span className="w-1.5 h-1.5 bg-baft-neon flex-none inline-block" />{it}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
          <p className="text-[13.5px] pt-2 px-1">Every plan starts with 14 days free and 10 try-ons. Cancel from your Shopify admin any time.</p>
        </div>
      </div>
    </section>
  )
}
