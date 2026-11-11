import { NextResponse } from 'next/server'

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!key || !to) return NextResponse.json({ error: 'Email is not configured.' }, { status: 500 })

  let data: Record<string, unknown>
  try { data = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }

  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
  const name = str(data.name, 120)
  const email = str(data.email, 200)
  const store = str(data.store, 200)
  const topic = str(data.topic, 80) || 'General'
  const message = str(data.message, 5000)

  if (data.website) return NextResponse.json({ ok: true }) // honeypot
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please fill in your name, a valid email and a message.' }, { status: 400 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Baft <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `Baft contact · ${topic} · ${name}`,
      text: `Topic: ${topic}\nName: ${name}\nEmail: ${email}\nStore: ${store || '-'}\n\n${message}`,
      html: `<p><b>Topic:</b> ${esc(topic)}<br><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Store:</b> ${esc(store || '-')}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
