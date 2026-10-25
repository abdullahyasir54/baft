'use client'

import { useEffect, useRef, useState } from 'react'
import Button from './Button'

const GARMENTS = ['Linen blazer', 'Wrap dress', 'Denim jacket', 'Knit set']
const SIZES = ['XS', 'S', 'M', 'L', 'XL']
const LOG = [
  { at: 5,  text: 'Reading body geometry' },
  { at: 30, text: 'Matching scene lighting' },
  { at: 55, text: 'Simulating drape · 2.1M verts' },
  { at: 85, text: 'Compositing final render' },
]

type Phase = 'idle' | 'rendering' | 'done'

// Set to a model photo path (e.g. '/images/demo-model.jpg') to replace the placeholder.
const MODEL_PHOTO: string | null = null

export default function Demo() {
  const [garment, setGarment] = useState(0)
  const [size, setSize] = useState(2)
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => () => clearInterval(timer.current), [])

  const reset = () => {
    clearInterval(timer.current)
    setPhase('idle')
    setProgress(0)
  }

  const render = () => {
    clearInterval(timer.current)
    setPhase('rendering')
    setProgress(0)
    let p = 0
    timer.current = setInterval(() => {
      p = Math.min(100, p + 1 + Math.random() * 2.5)
      setProgress(p)
      if (p >= 100) {
        clearInterval(timer.current)
        setPhase('done')
      }
    }, 40)
  }

  const pct = Math.round(progress)
  const fit = 92 + garment + (size === 2 ? 2 : 0)
  const phaseLabel = phase === 'idle' ? 'Idle · awaiting input' : phase === 'rendering' ? 'Rendering · neural engine v4.0' : 'Done · fit ready'
  const renderLabel = phase === 'idle' ? 'Render try-on' : phase === 'rendering' ? 'Rendering…' : 'Render again'

  return (
    <section id="demo" className="max-w-[1216px] mx-auto px-6 md:px-12 pb-14 sm:pb-20 scroll-mt-[90px]">
      <div
        data-reveal=""
        data-theme="dark"
        className="bg-baft-ink text-baft-snow rounded-[18px] p-[clamp(24px,3vw,40px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-8 sm:gap-10"
      >
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 font-plex text-[11px] tracking-[0.22em] uppercase text-baft-neon">
            <span className="w-1.5 h-1.5 bg-current" />The widget · as your shoppers see it
          </span>
          <h2 className="text-[clamp(30px,3.4vw,44px)] font-[720] tracking-[-0.03em] leading-[1.05] text-baft-snow">Pick a piece. Watch it drape.</h2>
          <p className="text-[16px] text-baft-snow/65 max-w-[420px]">
            This is the exact flow your customer gets on a product page. No app, no account. One photo and a size.
          </p>

          <div className="flex flex-col gap-2.5">
            <span className="font-plex text-[10px] tracking-[0.16em] uppercase text-baft-snow/50">Garment</span>
            <div className="flex gap-1.5 flex-wrap">
              {GARMENTS.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => { setGarment(i); reset() }}
                  className={`font-archivo text-[14px] font-[560] px-4 py-2.5 rounded-full cursor-pointer border transition-all duration-[250ms] ease-signature ${
                    i === garment ? 'bg-baft-snow text-baft-ink border-baft-snow' : 'bg-transparent text-baft-snow border-baft-snow/25'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-plex text-[10px] tracking-[0.16em] uppercase text-baft-snow/50">Size</span>
            <div className="flex gap-1.5 flex-wrap">
              {SIZES.map((z, i) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => { setSize(i); reset() }}
                  className={`font-plex text-[12px] w-11 h-11 rounded-full cursor-pointer border transition-all duration-[250ms] ease-signature ${
                    i === size ? 'bg-baft-neon text-baft-ink border-baft-neon' : 'bg-transparent text-baft-snow border-baft-snow/25'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <Button onClick={render} disabled={phase === 'rendering'}>{renderLabel}</Button>
            <span className="font-plex text-[10.5px] tracking-[0.08em] uppercase text-baft-snow/50">Neural engine v4.0</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] max-h-[400px] rounded-[14px] overflow-hidden bg-white/5 border border-baft-snow/[0.14]">
            <div
              className="absolute inset-0 transition-[filter] duration-[800ms] ease-signature"
              style={{ filter: phase === 'rendering' ? 'saturate(0.2) contrast(1.1)' : 'none' }}
            >
              {MODEL_PHOTO ? (
                <img src={MODEL_PHOTO} alt="Model wearing the selected garment" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_50%_35%,rgba(246,244,247,0.10),transparent_65%)]">
                  <span className="font-plex text-[10.5px] tracking-[0.12em] uppercase text-baft-snow/35">Model photo</span>
                </div>
              )}
            </div>

            {/* Scan line */}
            <div
              className="absolute inset-x-0 h-0.5 bg-baft-neon pointer-events-none transition-[top] duration-[120ms] ease-linear"
              style={{ top: `${progress}%`, opacity: phase === 'rendering' ? 1 : 0 }}
            />

            <div className="absolute left-4 right-4 bottom-4 flex flex-col gap-1.5 pointer-events-none">
              {LOG.map(l => (
                <span
                  key={l.text}
                  className={`font-plex text-[10.5px] tracking-[0.08em] uppercase transition-colors duration-300 ${
                    phase !== 'idle' && progress >= l.at ? 'text-baft-neon' : 'text-baft-snow/35'
                  }`}
                >
                  {l.text}
                </span>
              ))}
            </div>

            {phase === 'done' && (
              <div className="absolute top-4 left-4 right-4 flex flex-wrap justify-between gap-2 pointer-events-none">
                <span className="font-plex text-[10px] tracking-[0.16em] uppercase bg-baft-neon text-baft-ink px-2.5 py-1.5 rounded-full">
                  Fit {fit}% · size {SIZES[size]} recommended
                </span>
                <span className="font-plex text-[10px] tracking-[0.16em] uppercase bg-baft-snow text-baft-ink px-2.5 py-1.5 rounded-full">
                  {GARMENTS[garment]} · {SIZES[size]}
                </span>
              </div>
            )}
          </div>

          <div className="h-[3px] bg-baft-snow/[0.14] rounded-sm overflow-hidden">
            <div className="h-full bg-baft-neon transition-[width] duration-[120ms] ease-linear" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between font-plex text-[10.5px] tracking-[0.08em] uppercase text-baft-snow/50">
            <span>{phaseLabel}</span>
            <span>{pct}%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
