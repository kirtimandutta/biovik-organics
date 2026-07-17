import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollVideo from './ScrollVideo'

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export default function Mission() {
  const [expanded, setExpanded] = useState(false)

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

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-20 lg:px-14 lg:py-40">
        <motion.div {...fadeUp}>
          <p className="mb-4 font-display text-[1.08rem] font-semibold tracking-[0.35em] text-emerald-400">
            THE CORE MISSION
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            The future of food security
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="flex flex-col justify-end border-l-0 border-white/10 lg:border-l lg:pl-12"
        >
          <p className="font-body text-base font-light leading-relaxed text-zinc-200 md:text-lg">
            Traditional agriculture is hitting a ceiling. Yields plateau. Inputs climb.
            Climate pressure tightens every season.
            {expanded && (
              <>
                {' '}
                Biovik Organics reprograms plant productivity from the cellular level up —
                bridging high-tech cellular biology with accessible farming through a
                specialized bio-engineered algae injected into plants to maximize
                photosynthesis and drastically increase crop production.
              </>
            )}
          </p>

          {expanded && (
            <p className="mt-6 font-body text-base font-light leading-relaxed text-zinc-200 md:text-lg">
              We do not optimize the field around the plant. We upgrade the plant itself —
              unlocking photosynthetic capacity that conventional breeding and chemistry
              cannot reach.
            </p>
          )}

          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-8 self-start font-display text-sm font-semibold tracking-[0.28em] text-emerald-400 transition-colors hover:text-white"
          >
            {expanded ? 'READ LESS' : 'READ MORE'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
