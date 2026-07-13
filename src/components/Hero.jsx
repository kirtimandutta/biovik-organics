import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollVideo from './ScrollVideo'

export default function Hero() {
  const scrollToMission = () => {
    document.querySelector('#mission')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-svh w-full items-end overflow-hidden bg-black"
    >
      {/* Full-bleed visual plane */}
      <div className="absolute inset-0">
        <ScrollVideo
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero.mp4"
        />
        <div className="cellular-grid absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/[0.33] to-black/[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/[0.48] via-transparent to-black/[0.24]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-28 pt-32 md:px-10 md:pb-32 lg:px-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-5 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400 md:text-sm"
        >
          BIOVIK ORGANICS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display text-[1.575rem] font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-[2.1rem] md:text-[2.625rem] lg:text-[3.15rem] xl:text-[3.85rem]"
        >
          Boosting plant
          <br />
          efficiency through
          <br />
          biological engine
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={scrollToMission}
            className="border border-white px-8 py-3 font-display text-sm font-semibold tracking-[0.28em] text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            LEARN MORE
          </button>
        </motion.div>
      </div>

      <button
        type="button"
        aria-label="Scroll to mission"
        onClick={scrollToMission}
        className="scroll-indicator absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-emerald-400"
      >
        <ChevronDown size={28} strokeWidth={1.25} />
      </button>
    </section>
  )
}
