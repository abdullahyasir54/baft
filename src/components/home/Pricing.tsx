'use client'

import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import Button from './Button'
import Reveal from '../ui/Reveal'

const INSTALL_URL = 'https://apps.shopify.com/baft-virtual-try-on'

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
const CUSTOM = PLANS.length
// A representative volume for each plan, used when a visitor clicks a plan.
const PRESETS = [15, 50, 250, 600, SLIDER_MAX]

const money = (n: number) => '$' + n.toFixed(2)

// Dollar amount that glides to its new value instead of snapping.
function AnimatedMoney({ value }: { value: number }) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, v => money(v))
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.45, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [mv, value])
  return <motion.span>{text}</motion.span>
}

export default function Pricing() {
  const [tryons, setTryons] = useState(200)

  // Free is a hard cap (no overage), so it only fits when volume is within its allowance.
  const costs = PLANS.map(p =>
    p.overage === 0 && tryons > p.included ? Infinity : p.base + Math.max(0, tryons - p.included) * p.overage
  )
  const tierIdx = TIER_LIMITS.findIndex(limit => tryons <= limit)
  const isCustom = tierIdx === -1
  const bestIdx = isCustom ? CUSTOM : tierIdx
  const best = PLANS[bestIdx] as Plan | undefined

  return (
    <section id="pricing" className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 sm:py-16 scroll-mt-[90px]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 lg:gap-12 items-start mb-6">
        <Reveal className="flex flex-col gap-5">
          <h2 className="text-[clamp(34px,4vw,56px)] font-[720] tracking-[-0.03em] leading-[1.03]">Pay for fits. Not for seats.</h2>
          <p className="text-[16px] max-w-[440px]">Set the slider to the try-ons you expect in a month. The plan that fits is the dark one.</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex flex-col gap-3 bg-baft-card border border-baft-line rounded-[18px] px-5 py-5 sm:px-6 shadow-[0_24px_50px_-40px_rgba(22,18,31,0.5)]">
            <div className="flex justify-between items-baseline gap-3">
              <label htmlFor="tryons" className="mono-s">Try-ons per month</label>
              <span className="text-[30px] font-[740] tracking-[-0.04em] tabular-nums leading-none">{tryons.toLocaleString('en-US')}{tryons >= SLIDER_MAX ? '+' : ''}</span>
            </div>
            <input
              id="tryons"
              className="range"
              type="range" min={0} max={SLIDER_MAX} step={5} value={tryons}
              onChange={e => setTryons(Number(e.target.value))}
              style={{ ['--pct' as string]: `${(tryons / SLIDER_MAX) * 100}%` }}
            />
            <div className="flex gap-1.5 flex-wrap pt-1">
              {[...PLANS.map(p => p.name), 'Custom'].map((name, i) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setTryons(PRESETS[i])}
                  aria-pressed={bestIdx === i}
                  className={`cursor-pointer font-plex text-[10px] tracking-[0.1em] uppercase rounded-full px-3 py-[7px] transition-colors duration-300 ${
                    bestIdx === i ? 'bg-baft-ink text-baft-snow' : 'bg-baft-paper text-baft-body hover:text-baft-heading'
                  }`}
                >{name}</button>
              ))}
            </div>
            <p aria-live="polite" className="pt-1 text-[14px] leading-[1.45]">
              <span className="font-plex text-[10.5px] tracking-[0.08em] uppercase text-baft-accent mr-2">Best fit · {best ? best.name : 'Custom'}</span>
              {best ? (
                <>
                  About <strong className="text-baft-heading font-[640] tabular-nums"><AnimatedMoney value={costs[bestIdx]} />/mo</strong> at this volume
                  {best.overage > 0 && <>, including {money(best.overage)} per extra try-on</>}.
                </>
              ) : (
                <>Running more try-ons than our plans cover? Talk to us about a custom plan with volume pricing.</>
              )}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PLANS.map((p, i) => {
          const hi = bestIdx === i
          const tag = hi ? 'Best fit' : i === 2 ? 'Most popular' : ''
          return (
            <Reveal key={p.name} delay={i * 0.06} className="h-full">
              <div
                onClick={() => setTryons(PRESETS[i])}
                className={`relative h-full border rounded-[18px] px-4 py-5 flex flex-col gap-3.5 cursor-pointer transition-[background-color,color,border-color,transform,box-shadow] duration-500 ease-signature ${
                  hi ? 'bg-baft-ink text-baft-snow border-baft-ink -translate-y-1.5 shadow-[0_30px_60px_-30px_rgba(22,18,31,0.65)]' : 'bg-baft-card text-baft-heading border-baft-line hover:-translate-y-1 hover:border-baft-ink'
                }`}
              >
                <div className="flex justify-between items-center gap-3 min-h-[22px]">
                  <span className={`font-plex text-[11px] tracking-[0.22em] uppercase ${hi ? 'text-baft-neon' : 'text-baft-accent'}`}>{p.name}</span>
                  {tag && (
                    <span className={`font-plex text-[9.5px] tracking-[0.12em] uppercase rounded-full px-2.5 py-1 ${hi ? 'bg-baft-neon text-baft-ink' : 'bg-baft-paper text-baft-body'}`}>{tag}</span>
                  )}
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
                <ul className="flex flex-col gap-1.5 flex-1 pt-2">
                  {p.items.map(it => (
                    <li key={it} className="inline-flex gap-2 items-start text-[13px] xl:text-[12px] leading-[1.4] xl:whitespace-nowrap">
                      <span aria-hidden="true" className="sq mt-[6px]" />{it}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="font-plex text-[10.5px] tracking-[0.08em] uppercase opacity-60">
                    {p.trial ? '14-day free trial' : 'No trial needed'}
                  </span>
                  <a
                    href={INSTALL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    aria-label={`Install Baft on Shopify, ${p.name} plan`}
                    className={`inline-flex items-center gap-1 text-[13px] font-[640] no-underline hover:underline ${hi ? 'text-baft-neon' : 'text-baft-heading'}`}
                  >
                    Install →
                  </a>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.1}>
        <div
          onClick={() => setTryons(PRESETS[CUSTOM])}
          className={`mt-3 border rounded-[18px] px-5 sm:px-7 py-6 flex flex-col md:flex-row md:items-center justify-between gap-5 cursor-pointer transition-colors duration-300 ${
            isCustom ? 'bg-baft-ink text-baft-snow border-baft-ink' : 'bg-baft-card text-baft-heading border-baft-line'
          }`}
        >
          <div className="flex flex-col gap-2 max-w-[640px]">
            <div className="flex items-center gap-3">
              <span className={`font-plex text-[11px] tracking-[0.22em] uppercase ${isCustom ? 'text-baft-neon' : 'text-baft-accent'}`}>Custom</span>
              {isCustom && <span className="font-plex text-[9.5px] tracking-[0.12em] uppercase rounded-full px-2.5 py-1 bg-baft-neon text-baft-ink">Best fit</span>}
            </div>
            <span className="text-[clamp(22px,2.2vw,28px)] font-[740] tracking-[-0.03em] leading-[1.1]">Need more try-ons than our plans cover?</span>
            <p className={`text-[14.5px] ${isCustom ? 'text-baft-snow/70' : ''}`}>Contact sales for a custom plan with a tailored try-on limit and pricing.</p>
          </div>
          <div className="flex-none" onClick={e => e.stopPropagation()}><Button href="/contact">Contact sales →</Button></div>
        </div>
      </Reveal>

      <p className="text-[13.5px] pt-5 px-1">Paid plans start with a 14-day free trial. Extra try-ons are billed per use after your monthly limit. All charges are billed in USD, and recurring and usage-based charges are billed every 30 days.</p>
    </section>
  )
}
