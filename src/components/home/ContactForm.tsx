'use client'

import { useState, type FormEvent } from 'react'
import Button from './Button'

const TOPICS = ['Sales · custom plan', 'Support', 'Something else']

const field = 'w-full bg-baft-card border border-baft-line rounded-[12px] px-4 py-3 text-[15px] text-baft-heading font-archivo outline-none focus:border-baft-ink'

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(f.entries()), topic }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Something went wrong.')
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 bg-baft-card border border-baft-line rounded-[18px] p-5 sm:p-8">
      <div className="flex flex-col gap-2">
        <span className="mono-s">Topic</span>
        <div className="flex gap-2 flex-wrap">
          {TOPICS.map(t => (
            <button
              key={t} type="button" onClick={() => setTopic(t)} aria-pressed={topic === t}
              className={`cursor-pointer rounded-full px-4 py-2 text-[13px] font-[600] ${topic === t ? 'bg-baft-ink text-baft-snow' : 'bg-baft-paper text-baft-heading border border-baft-line'}`}
            >{t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2"><span className="mono-s">Name</span><input name="name" required className={field} /></label>
        <label className="flex flex-col gap-2"><span className="mono-s">Email</span><input name="email" type="email" required className={field} /></label>
      </div>
      <label className="flex flex-col gap-2"><span className="mono-s">Store URL (optional)</span><input name="store" placeholder="your-store.myshopify.com" className={field} /></label>
      <label className="flex flex-col gap-2"><span className="mono-s">Message</span><textarea name="message" required rows={6} className={field} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex items-center gap-4 flex-wrap">
        <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 font-archivo font-[640] rounded-full px-[26px] py-[13px] text-[14px] bg-[var(--action-primary-bg)] text-[var(--action-primary-text)] cursor-pointer disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send message →'}
        </button>
        {status === 'sent' && <span className="text-[13.5px]">Thanks! Your message is on its way. We’ll reply by email.</span>}
        {status === 'error' && <span className="text-[13.5px] text-[#C2372A]">{error}</span>}
      </div>
    </form>
  )
}
