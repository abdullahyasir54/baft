'use client'

import { useEffect, useRef } from 'react'

type RGB = [number, number, number]

// Brand ramp for a light background: deep neon at the ragged top edge, pure
// neon through the middle, fading to a pale tint that melts into the paper.
const C0: RGB = [170, 188, 16]
const C1: RGB = [212, 228, 36]
const C2: RGB = [238, 242, 190]

const fract = (x: number) => x - Math.floor(x)
// Stable pseudo-random value per grid cell.
const hash = (i: number, j: number) => fract(Math.sin(i * 127.1 + j * 311.7) * 43758.5453)
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))

// Canvas field of "breathing" dots that thins out toward the top and swells
// near the cursor. Purely decorative; sits behind content and ignores pointer events.
export default function DotField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, raf = 0, visible = true
    // Eased pointer (canvas coordinates); starts far away so nothing swells.
    const target = { x: -9999, y: -9999 }
    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width; H = r.height
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (ms: number) => {
      const t = ms / 1000
      ctx.clearRect(0, 0, W, H)
      const step = Math.max(14, Math.min(W / 1600, H / 940) * 20.5)
      const top = H * 0.1
      const radius = 0.37 * step
      pointer.x += (target.x - pointer.x) * 0.12
      pointer.y += (target.y - pointer.y) * 0.12

      const cols = Math.ceil(W / step) + 1
      const rows = Math.ceil(H / step) + 1
      for (let j = 0; j < rows; j++) {
        const y = j * step
        if (y < top - 2 * step) continue
        // v: 0 at the top of the band → 1 at the bottom; the field is fully dense by ~H*.36.
        const v = clamp01((y - top) / (H - top))
        let color = v < 0.55 ? mix(C0, C1, v / 0.55) : mix(C1, C2, (v - 0.55) / 0.45)
        color = mix(color, C2, clamp01((y / H - 0.9) / 0.1))
        ctx.fillStyle = `rgb(${color[0] | 0},${color[1] | 0},${color[2] | 0})`

        for (let i = 0; i < cols; i++) {
          const a = hash(i, j)
          const keep = Math.min(1, v * 1.6 + 0.12) - a * 0.6
          // Dropped dots vanish, except a few stragglers that roughen the top edge.
          if (keep <= 0 && hash(i + 71.7, j + 13.9) > 0.08) continue
          const b = hash(i + 19.3, j + 47.1)
          const wave = reduce ? 0.7 : 0.5 + 0.5 * Math.sin(t * (1.6 + b * 2.6) + a * Math.PI * 2 + Math.sin(t * 0.7 + i * 0.21 + j * 0.13) * 1.4)
          let size = (0.42 + 0.58 * Math.pow(wave, 1.3)) * Math.min(1, 0.5 + v * 0.6) * (keep > 0 ? 1 : 0.8)
          const x = i * step
          const dx = x - pointer.x, dy = y - pointer.y
          size = Math.min(1.05, size + 0.7 * Math.exp(-(dx * dx + dy * dy) / (step * step * 22)))
          ctx.beginPath()
          ctx.arc(x, y, size * radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = (ms: number) => {
      draw(ms)
      if (visible && !reduce) raf = requestAnimationFrame(loop)
    }
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop) }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = canvas.getBoundingClientRect()
      target.x = e.clientX - r.left; target.y = e.clientY - r.top
    }
    const onLeave = () => { target.x = -9999; target.y = -9999 }

    const ro = new ResizeObserver(() => { resize(); if (reduce || !visible) draw(0) })
    ro.observe(canvas)
    // Only animate while the field is on screen.
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start() })
    io.observe(canvas)
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
    }
    resize(); start()

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
