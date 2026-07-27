import { motion } from 'framer-motion'
import ScrollVideo from './ScrollVideo'

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export default function Mission() {
  return (
    <section id="mission" className="section section--clip relative flex w-full items-center bg-black">
      <div className="video-container">
        <ScrollVideo
          className="h-full w-full object-cover"
          src="/videos/mission.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/[0.33] to-black/[0.21]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/[0.45] via-black/[0.24] to-black/[0.30]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <motion.h2
          {...fadeUp}
          className="max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Food Built Civilisations
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-6 max-w-3xl font-body text-base font-light leading-relaxed text-zinc-200 md:mt-8 md:text-lg lg:text-xl"
        >
          It should never be broken by war, geopolitics, or climate chaos.
        </motion.p>
      </div>
    </section>
  )
}
