'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const INSTALL_URL = 'https://apps.shopify.com/baft-virtual-try-on'

// Phone-only install bar that appears once the hero's own button has scrolled away.
export default function StickyCta() {
  const { scrollY, scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', y => {
    // Hidden at the very bottom too, where the final call-to-action takes over.
    setShow(y > 640 && scrollYProgress.get() < 0.9)
  })

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="sticky"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed left-3 right-3 bottom-3 z-30 pb-[env(safe-area-inset-bottom)]"
        >
          <a
            href={INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 bg-baft-ink text-baft-snow rounded-full pl-5 pr-2 py-2 no-underline shadow-[0_18px_40px_-14px_rgba(22,18,31,0.6)] ring-1 ring-white/[0.08]"
          >
            <span className="text-[14px] font-[640]">Try Baft free on Shopify</span>
            <span className="inline-flex items-center gap-1.5 bg-baft-neon text-baft-ink rounded-full px-4 py-2.5 text-[13px] font-[680]">Install <ArrowRight size={14} /></span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
