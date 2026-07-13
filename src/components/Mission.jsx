import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export default function Mission() {
  return (
    <section id="mission" className="relative border-t border-zinc-800 bg-black">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-20 lg:px-14 lg:py-40">
        <motion.div {...fadeUp}>
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            THE CORE MISSION
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            The future of food security
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="flex flex-col justify-end border-l-0 border-zinc-800 lg:border-l lg:pl-12"
        >
          <p className="font-body text-base font-light leading-relaxed text-zinc-400 md:text-lg">
            Traditional agriculture is hitting a ceiling. Yields plateau. Inputs climb.
            Climate pressure tightens every season. Biovik Organics reprograms plant
            productivity from the cellular level up — bridging high-tech cellular biology
            with accessible farming through a specialized bio-engineered algae injected
            into plants to maximize photosynthesis and drastically increase crop production.
          </p>
          <p className="mt-6 font-body text-base font-light leading-relaxed text-zinc-400 md:text-lg">
            We do not optimize the field around the plant. We upgrade the plant itself —
            unlocking photosynthetic capacity that conventional breeding and chemistry
            cannot reach.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
