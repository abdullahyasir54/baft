'use client'

import { useState } from 'react'

const BEFORE_AFTER_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB8Xj6NpBaadcJ98kmCa4iz-9FOzcANmL_f8Ql_nn4CS1ag-nLEy1Zqwb6-lz0K4vZxFRRvDLaxEjHfThI1oeJnAOJJOyMxO6Y5oUlMlf_GyU3Yy0qVCk_VYM7BDHg_2AtG_Fy3SUm1DXMjFsFfXvsfIakDYETD2NRmXriZYfAH9Vrbp351YubGd2mjLWwvkDNFFF0jZP4EkWmOmOlYjrBwb8slV7RE5ejD7exOe5gQUZOfhk7cvwL4VV0yG9YmwMdhjz-MULoGvgI'

function BASlider() {
  const [value, setValue] = useState(50)
  return (
    <div className="relative w-full h-full cursor-ew-resize overflow-hidden">
      {/* Before */}
      <div className="absolute inset-0 grayscale">
        <img src={BEFORE_AFTER_IMG} alt="Before" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 font-label-bold text-[10px] text-white/50 tracking-widest uppercase bg-black/40 px-2 py-1 backdrop-blur-sm">
          Before
        </div>
      </div>
      {/* After */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
        <img
          src={BEFORE_AFTER_IMG}
          alt="After"
          className="h-full object-cover"
          style={{ width: '100vw', maxWidth: 'none' }}
        />
        <div className="absolute top-4 right-4 font-label-bold text-[10px] text-primary-fixed tracking-widest uppercase bg-black/40 px-2 py-1 backdrop-blur-sm">
          After
        </div>
      </div>
      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none"
        style={{ left: `${value}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 rounded-full animate-pulse bg-white/20 blur-md" />
          <svg className="text-black w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 16l-4-4 4-4M17 8l4 4-4 4" />
          </svg>
        </div>
      </div>
      {/* Range input overlay */}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />
      <div className="absolute inset-0 border-2 border-primary-fixed/30 m-base pointer-events-none" />
    </div>
  )
}

const steps = [
  {
    number: '01',
    bg: '#D6E702',
    textColor: 'text-black',
    glowClass: 'bg-[#FE5953]',
    borderAccent: 'border-[#D6E702]/30',
    badge: null,
    badgeColor: '',
    title: 'Upload Photo',
    description: 'Upload garment assets or model photography directly into the Baft dashboard.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWcDpdwxO0M0CMJEWg9Mu1V5_26tL45r6nsxhKV3ESVRcXLbKn_NHkZMW0FcBuk6SYqdJZXrx064uniBx58aekRmd78lUXrkw2TvZorFCcRI67q0ZKyfIg9wMATUoL8dJ_N_-6x4ahf_UFYayHw6dceJKogKatIxCy6lhi-ZA3LxyoJPgtRVaDZmnbvBdA9B-35oab6WvpCsk_DiX4cxUfB6BGxJZnYetihjvbXs21gOXUtVltkm1ohHamwyLm1dXaO2Is8sh98lY',
    offsetClass: '',
  },
  {
    number: '02',
    bg: '#FE5953',
    textColor: 'text-white',
    glowClass: 'bg-secondary-fixed',
    borderAccent: 'border-[#FE5953]/30',
    badge: 'NEURAL ENGINE V4.0',
    badgeColor: 'text-[#D6E702]',
    title: 'AI Processes',
    description: 'Our proprietary neural network analyzes fabric drape, lighting, and body geometry in real-time.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8R8dpfK2cNClXGb6IdETGAxnwPMtTGr7uM_QTxIX5jj3ezpxV9cabg3uTt891rWLQQ7BurGLHcnIFOumi1tBgrrUk8Cr1jmhckq1EFVbev3bawYVarn7W6aChR1fcp1LezmUn0f3xS0MKgK1Cbb1ao4ZPA6mzgHg_7Ov9r9sgyMppOIYkVMBAWneBZbyy6V05IR2QdPmqcl3sYzoLmX-As_-PhM9UX4C-sXr2gzphGiaSv8G2oiepFu_-DY2Lebf33vl0QU_4kMA',
    offsetClass: 'mt-lg md:mt-0',
  },
]

export default function ProcessShowcase() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop bg-[#0c0c0c] md:py-32">
      <div className="text-center mb-xl">
        <h2 className="font-headline-lg text-headline-lg mb-sm">
          The Virtual <span className="shiny-gradient">Journey</span>
        </h2>
        <p className="text-white/50 max-w-lg mx-auto">Three steps to hyper-realistic fashion simulation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {/* Steps 01 and 02 */}
        {steps.map(step => (
          <div
            key={step.number}
            className={`liquid-glass p-md relative group overflow-hidden border-2 border-white/10 transition-all duration-300 hover:scale-[1.01] hover:border-white/30 ${step.offsetClass}`}
          >
            <div className={`absolute -top-10 -right-10 w-24 h-24 ${step.glowClass} blur-[60px] opacity-20`} />
            <div className="mb-lg h-64 overflow-hidden relative">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale"
              />
              <div className={`absolute inset-0 border-2 ${step.borderAccent} m-base`} />
            </div>
            <div className="flex items-center gap-sm mb-sm flex-wrap">
              <span
                className={`w-8 h-8 flex items-center justify-center font-bold shrink-0 ${step.textColor}`}
                style={{ backgroundColor: step.bg }}
              >
                {step.number}
              </span>
              {step.badge && (
                <span className={`text-[10px] font-label-bold bg-white/10 px-xs py-[2px] ${step.badgeColor}`}>
                  {step.badge}
                </span>
              )}
              <h3 className="font-headline-md text-headline-md">{step.title}</h3>
            </div>
            <p className="text-white/60">{step.description}</p>
          </div>
        ))}

        {/* Step 03 — Before/After slider */}
        <div className="liquid-glass p-md relative group overflow-hidden border-2 border-white/10 mt-xl md:mt-0 transition-all duration-300 hover:scale-[1.01] hover:border-white/30">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-fixed blur-[60px] opacity-20" />
          <div className="mb-lg h-64 overflow-hidden relative">
            <BASlider />
          </div>
          <div className="flex items-center gap-sm mb-sm flex-wrap">
            <span className="bg-primary-fixed text-black w-8 h-8 flex items-center justify-center font-bold shrink-0">
              03
            </span>
            <span className="text-[10px] font-label-bold bg-white/10 px-xs py-[2px] text-primary-fixed">
              REAL-TIME GEN
            </span>
            <h3 className="font-headline-md text-headline-md">Instant Try-On</h3>
          </div>
          <p className="text-white/60">
            Customers see themselves in your clothes instantly. Purchase confidence reaches an all-time high.
          </p>
        </div>
      </div>
    </section>
  )
}
