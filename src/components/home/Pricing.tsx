'use client'

import { useState } from 'react'
import Button from './Button'
import Eyebrow from './Eyebrow'

type Plan = { name: string; base: number; included: number; overage: number; trial: boolean; items: string[] }

const PLANS: Plan[] = [
  { name: 'Free',     base: 0,     included: 15,  overage: 0,    trial: false, items: ['15 try-ons/month', 'Standard try-on widget with branding'] },
  { name: 'Basic',    base: 14.99, included: 50,  overage: 0.10, trial: true,  items: ['50 monthly try-ons', 'Watermark-free try-on results', 'Basic events & conversion analytics'] },
  { name: 'Standard', base: 39.99, included: 250, overage: 0.09, trial: true,  items: ['250 monthly try-ons', 'Watermark-free try-on results', 'Full analytics tracking', 'Product recommendations after try-on', 'Merchant brand logo on results', 'Email lead capture with bonus try-ons'] },
  { name: 'Pro',      base: 69.99, included: 600, overage: 0.08, trial: true,  items: ['600 monthly try-ons', 'Watermark-free try-on results', 'Full usage & performance analytics', 'Product recommendations after try-on', 'Merchant brand logo on results', 'Email lead capture + bonus try-ons'] },
]
// Highest monthly volume (inclusive) each plan is recommended for; anything above the last is Custom.
const TIER_LIMITS = [15, 100, 400, 600]
const SLIDER_MAX = 800
const SALES_MAIL = '/contact'

const money = (n: number) => '$' + n.toFixed(2)

export default function Pricing() {
  const [tryons, setTryons] = useState(200)
  // -1 = follow the calculator's best fit; otherwise the card the visitor clicked
  const [selected, setSelected] = useState(-1)

  // Free is a hard cap (no overage), so it only fits when volume is within its allowance.
  const costs = PLANS.map(p =>
    p.overage === 0 && tryons > p.included ? Infinity : p.base + Math.max(0, tryons - p.included) * p.overage
  )
  const tierIdx = TIER_LIMITS.findIndex(limit => tryons <= limit)
  const isCustom = tierIdx === -1
  const bestIdx = isCustom ? PLANS.length : tierIdx
  const best = PLANS[bestIdx] as Plan | undefined

  return (
    <section id="pricing" className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 sm:py-16 scroll-mt-[90px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-6 lg:gap-12 items-start mb-6">
        <div data-reveal="" className="flex flex-col gap-4">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="text-[clamp(36px,4.4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.05]">Pay for fits. Not for seats.</h2>
        </div>

        <div data-reveal="" className="flex flex-col gap-2 bg-baft-card border border-baft-line rounded-[18px] px-5 py-4 sm:px-6">
          <div className="flex justify-between items-baseline gap-3">
            <span className="mono-s">Try-ons per month</span>
            <span className="text-[26px] font-[740] tracking-[-0.04em] tabular-nums">{tryons.toLocaleString('en-US')}</span>
          </div>
          <input
            type="range" min={0} max={SLIDER_MAX} step={10} value={tryons}
            onChange={e => { setTryons(Number(e.target.value)); setSelected(-1) }}
            aria-label="Try-ons per month"
          />
          <div className="flex justify-between font-plex text-[10px] tracking-[0.08em] text-baft-faint">
            <span>0</span><span>{SLIDER_MAX.toLocaleString('en-US')}+</span>
          </div>
          <div className="pt-2.5 flex flex-col gap-1">
            <span className="font-plex text-[10.5px] tracking-[0.08em] uppercase text-baft-accent">Best fit · {best ? best.name : 'Custom'}</span>
            <span className="text-[14px] text-baft-body leading-[1.4]">
              {best ? (
                <>
                  About <strong className="text-baft-heading font-[640]">{money(costs[bestIdx])}/mo</strong> at this volume
                  {best.overage > 0 && <>, including {money(best.overage)} per extra try-on</>}.
                </>
              ) : (
                <>Running more try-ons than our plans cover? Talk to us about a custom plan with volume pricing.</>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PLANS.map((p, i) => {
          const hi = selected >= 0 ? selected === i : bestIdx === i
          const tag = i === bestIdx ? 'Best fit' : i === 2 ? 'Most popular' : ''
          return (
            <div
              key={p.name}
              data-reveal=""
              onClick={() => setSelected(i)}
              className={`border border-baft-line rounded-[18px] px-4 py-5 flex flex-col gap-3.5 cursor-pointer transition-all duration-[450ms] ease-signature ${
                hi ? 'bg-baft-ink text-baft-snow' : 'bg-baft-card text-baft-heading'
              }`}
            >
              <div className="flex justify-between items-center gap-3 min-h-[16px]">
                <span className={`font-plex text-[11px] tracking-[0.22em] uppercase ${hi ? 'text-baft-neon' : 'text-baft-accent'}`}>{p.name}</span>
                {tag && <span className="font-plex text-[10px] tracking-[0.12em] uppercase opacity-70">{tag}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[38px] font-[740] tracking-[-0.04em] leading-none tabular-nums">{p.base === 0 ? 'Free' : money(p.base)}</span>
                  {p.base > 0 && <span className="font-plex text-[10.5px] tracking-[0.08em] uppercase opacity-60">/ mo</span>}
                </div>
                <span className="text-[12.5px] opacity-70 leading-[1.4] xl:whitespace-nowrap">
                  {p.overage > 0 ? `${money(p.overage)} per extra try-on after limit` : 'Hard cap · no overage'}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 flex-1 pt-3.5">
                <span className="font-plex text-[10.5px] tracking-[0.12em] uppercase opacity-60">Features</span>
                {p.items.map(it => (
                  <span key={it} className="inline-flex gap-2 items-start text-[13px] xl:text-[12px] leading-[1.4] xl:whitespace-nowrap">
                    <span className="w-1.5 h-1.5 mt-[6px] bg-baft-neon flex-none inline-block" />{it}
                  </span>
                ))}
              </div>
              <span className="font-plex text-[10.5px] tracking-[0.08em] uppercase opacity-60 pt-1">
                {p.trial ? '14-day free trial' : 'No trial needed'}
              </span>
            </div>
          )
        })}
      </div>

      {(() => {
        const hi = selected >= 0 ? selected === PLANS.length : bestIdx === PLANS.length
        return (
          <div
            data-reveal=""
            onClick={() => setSelected(PLANS.length)}
            className={`mt-3 border border-baft-line rounded-[18px] px-5 sm:px-7 py-6 flex flex-col md:flex-row md:items-center justify-between gap-5 cursor-pointer transition-all duration-[450ms] ease-signature ${
              hi ? 'bg-baft-ink text-baft-snow' : 'bg-baft-card text-baft-heading'
            }`}
          >
            <div className="flex flex-col gap-2 max-w-[640px]">
              <div className="flex items-center gap-3">
                <span className={`font-plex text-[11px] tracking-[0.22em] uppercase ${hi ? 'text-baft-neon' : 'text-baft-accent'}`}>Custom</span>
                {isCustom && <span className="font-plex text-[10px] tracking-[0.12em] uppercase opacity-70">Best fit</span>}
              </div>
              <span className="text-[28px] font-[740] tracking-[-0.03em] leading-none">Need more try-ons than our plans cover?</span>
              <p className="text-[14.5px] opacity-80">Contact sales for a custom plan with a tailored try-on limit and pricing.</p>
            </div>
            <div className="flex-none"><Button href={SALES_MAIL}>Contact sales</Button></div>
          </div>
        )
      })()}

      <p className="text-[13.5px] pt-5 px-1">Paid plans start with a 14-day free trial. Extra try-ons are billed per use after your monthly limit. All charges are billed in USD, and recurring and usage-based charges are billed every 30 days.</p>
    </section>
  )
}
