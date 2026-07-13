const links = ['Process', 'Features', 'Merchant', 'Pricing']

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="font-display-lg-mobile text-display-lg-mobile text-white tracking-tighter">Baft</div>

      <div className="hidden md:flex items-center gap-xl">
        {links.map(link => (
          <a
            key={link}
            href="#"
            className="font-label-bold text-label-bold text-white/80 hover:text-white transition-colors hover:line-through"
          >
            {link}
          </a>
        ))}
      </div>

      <button className="bg-[#D6E702] text-black font-label-bold text-label-bold px-lg py-sm border-2 border-black hard-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
        Get Started
      </button>
    </nav>
  )
}
