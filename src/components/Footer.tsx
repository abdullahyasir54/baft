const links = [
  { label: 'Privacy Policy',    href: '#' },
  { label: 'Terms of Service',  href: '#' },
  { label: 'Shopify App Store', href: '#' },
  { label: 'Contact',           href: '#' },
]

export default function Footer() {
  return (
    <footer className="w-full py-xl px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-md bg-black border-t-2 border-white/10">
      <div className="font-headline-md text-headline-md text-white">Baft</div>
      <div className="flex gap-lg flex-wrap justify-center">
        {links.map(link => (
          <a key={link.label} href={link.href} className="text-white/60 hover:text-white transition-all font-body-md text-body-md">
            {link.label}
          </a>
        ))}
      </div>
      <div className="text-white/40 font-body-md text-body-md">© 2024 Baft AI. All rights reserved.</div>
    </footer>
  )
}
