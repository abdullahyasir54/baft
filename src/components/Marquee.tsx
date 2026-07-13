const logos = ['VOGUE', 'ZARA', 'SHOP-VAC', 'BALENCIAGA', 'GUCCI', 'PRADA']

export default function Marquee() {
  return (
    <section className="py-lg bg-black overflow-hidden border-y border-white/10">
      <div className="flex items-center whitespace-nowrap animate-marquee opacity-50">
        {[...logos, ...logos].map((logo, i) => (
          <span key={i} className="font-headline-md text-headline-md font-bold text-white mx-md">
            {logo}
          </span>
        ))}
      </div>
    </section>
  )
}
