const trustItems = ['60-second setup', 'No code required', 'Shopify Certified']

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7K_3JN_npi8qbrs67_c7JJ7WjtggKTxuIoyfMqR4apIvidt1aMqCnjd4Ih6cae6X0ME2ChOAuzGgVg-cvR6pvXrf93uMPt_gYwUjnkwdxLkOv_-boI_XI06ELj2BITdPvxqEPIafnR3gwct5WIDz3JMZGOMgD3WoLZN5dJNsTY5bJgexbtdzDY7UuGKYy6L2y_ZMGHWUl3NfiJAnOFHtrFIbook9E6mm5n0bOWGVguudIMPQLW7yk2jSBiUVc2KtvkuZg6X8AHnI"
          alt=""
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c0c]/50 to-[#0c0c0c]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-margin-mobile max-w-5xl">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-md leading-none tracking-[-0.06em] md:text-[110px]">
          Virtual Try-On. <br />
          <span className="shiny-gradient">Revitalized.</span>
        </h1>

        <p className="font-body-lg text-body-lg text-white/60 mb-lg max-w-2xl mx-auto">
          Baft AI merges hyper-realistic rendering with Shopify simplicity. Elevate your brand experience and slash return rates by 40%.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-md">
          <button className="apple-btn px-xl py-md font-label-bold text-label-bold flex items-center gap-sm shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            Add to Shopify
          </button>
          <button className="text-white/80 font-label-bold text-label-bold hover:text-white transition-colors flex items-center gap-sm">
            View Demo Suite
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="mt-lg flex flex-wrap justify-center gap-lg">
          {trustItems.map(item => (
            <div key={item} className="flex items-center gap-xs text-white/50 text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
