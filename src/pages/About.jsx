import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CATEGORIES = [
  { label: 'Organic fertilizers', to: '/products/curamix' },
  { label: 'Organic weedicide', to: '/products/bio-reaper' },
  { label: 'Macro-nutrient solutions', to: '/products/bio-bloom' },
  { label: 'Preventive plant care and disease control', to: '/products/trishul' },
]

const easeOut = [0.22, 1, 0.36, 1]

export default function About() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#1a0a2e]">
      <div className="cellular-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,#2e1065_0%,#5b21b6_42%,#7c3aed_72%,#4c1d95_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(192,132,252,0.35),_transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36 lg:px-14">
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mb-12 max-w-3xl md:mb-16"
        >
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            ABOUT US
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.2em] text-white sm:text-5xl md:text-6xl">
            Biovik Organics
          </h1>
        </motion.header>

        <div className="mx-auto max-w-4xl space-y-10 md:space-y-12">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="font-body text-base font-light leading-relaxed text-zinc-200 md:text-lg"
          >
            Biovik Organics Private Limited is a deep-science, R&amp;D-focused company on a mission
            to democratise food security for governments, farmers, and nations. We use advanced
            biochemistry to create safe, sustainable, and organic solutions that strengthen
            agriculture from the ground up.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: easeOut }}
            className="font-body text-base font-light leading-relaxed text-zinc-200 md:text-lg"
          >
            Founded in 2025 on the belief that food is the fundamental building block of
            civilisation, we began as a research laboratory dedicated to solving one problem: how
            to make food systems more resilient, affordable, and independent. Our work started in
            the lab and quickly grew into a portfolio of practical, field-ready products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: easeOut }}
          >
            <p className="mb-6 font-body text-base font-light leading-relaxed text-zinc-200 md:text-lg">
              Today, Biovik offers four core product categories:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {CATEGORIES.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.32 + i * 0.06, ease: easeOut }}
                >
                  <Link
                    to={item.to}
                    className="group flex min-h-[120px] items-center border border-white/15 bg-black/25 px-6 py-7 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/5 hover:shadow-[0_0_28px_rgba(0,242,254,0.12)] md:min-h-[140px] md:px-8"
                  >
                    <p className="font-display text-lg font-bold uppercase leading-snug tracking-[0.12em] text-white transition-colors group-hover:text-cyan-400 md:text-xl">
                      {item.label}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeOut }}
            className="font-body text-base font-light leading-relaxed text-zinc-200 md:text-lg"
          >
            Our purpose is to make food security accessible to all, so that wars, geopolitical
            tensions, and climate shocks cannot undermine the basic foundation of modern society. We
            are building an agricultural future that is economical, accessible, and sustainable,
            without dependence on imports, harsh chemicals, or external threats.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55, ease: easeOut }}
            className="border-l-2 border-emerald-400/70 pl-6 font-display text-xl font-semibold leading-snug tracking-[0.04em] text-white md:pl-8 md:text-2xl lg:text-3xl"
          >
            Let&apos;s make agriculture economical, accessible, and sustainable — without reliance
            on imports, harsh chemicals, or external threats.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
