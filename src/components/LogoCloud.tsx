const logos = ['VOGUE', 'ZARA', 'BALENCIAGA', 'GUCCI', 'PRADA']

export default function LogoCloud() {
  return (
    <section className="py-lg bg-black/50 border-y border-white/5 backdrop-blur-sm">
      <div className="px-margin-mobile md:px-margin-desktop">
        <p className="text-center text-white/30 font-label-bold text-[10px] uppercase tracking-widest mb-md">
          Trusted by industry leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-xl opacity-40">
          {logos.map(logo => (
            <span key={logo} className="text-xl font-bold tracking-tighter">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
