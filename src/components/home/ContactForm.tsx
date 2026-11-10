'use client'

import { useState, type FormEvent } from 'react'
import Button from './Button'

const EMAIL = 'baft.support@gmail.com'
const TOPICS = ['Sales · custom plan', 'Support', 'Something else']

const field = 'w-full bg-baft-card border border-baft-line rounded-[12px] px-4 py-3 text-[15px] text-baft-heading font-archivo outline-none focus:border-baft-ink'

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0])
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = [
      `Name: ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      `Store: ${f.get('store') || '-'}`,
      '',
      `${f.get('message')}`,
    ].join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Baft · ${topic}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
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
      <div className="flex items-center gap-4 flex-wrap">
        <button type="submit" className="inline-flex items-center gap-2 font-archivo font-[640] rounded-full px-[26px] py-[13px] text-[14px] bg-[var(--action-primary-bg)] text-[var(--action-primary-text)] cursor-pointer">Send message →</button>
        {sent && <span className="text-[13.5px]">Your email app should open. If not, write to {EMAIL}.</span>}
      </div>
    </form>
  )
}
