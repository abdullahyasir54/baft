const stats = [
  { value: '-40%', color: 'text-[#D6E702]', label: 'Return Rate' },
  { value: '+18%', color: 'text-white',      label: 'Conversion Lift' },
  { value: '2.4x', color: 'text-[#FE5953]', label: 'User Retention' },
  { value: '∞',    color: 'text-primary-fixed', label: 'Future Proof' },
]

export default function Impact() {
  return (
    <section className="py-32 px-margin-mobile md:px-margin-desktop bg-[#0c0c0c] text-white">
      <div className="text-center mb-24">
        <h2 className="font-display-lg text-headline-lg md:text-[64px] mb-sm">
          Commerce <span className="shiny-gradient">Impact</span>
        </h2>
        <p className="text-white/40">Hard metrics that drive the future of retail.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {stats.map(stat => (
          <div key={stat.label} className="liquid-glass p-xl border border-white/5 text-center">
            <div className={`text-[64px] font-bold tracking-tighter ${stat.color} mb-base`}>
              {stat.value}
            </div>
            <p className="font-label-bold text-label-bold uppercase tracking-widest text-white/40">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
