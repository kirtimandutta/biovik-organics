import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dna, GitMerge, Zap } from 'lucide-react'

const PHASES = [
  {
    id: '01',
    title: 'SYNTHESIS',
    subtitle: 'Phase 1',
    icon: Dna,
    body: 'We cultivate a hyper-efficient algae strain engineered for elevated photosynthetic throughput. Controlled bioreactors refine genetic and metabolic pathways so each cell becomes a precision biological engine.',
  },
  {
    id: '02',
    title: 'INTEGRATION',
    subtitle: 'Phase 2',
    icon: GitMerge,
    body: 'The algae interfaces safely with the host plant through root and vascular pathways. Compatibility protocols ensure symbiotic uptake without disrupting native tissue integrity or soil ecology.',
  },
  {
    id: '03',
    title: 'ACCELERATION',
    subtitle: 'Phase 3',
    icon: Zap,
    body: 'Once integrated, the system supercharges carbon capture and photosynthetic yield. Crops accelerate growth cycles, harvest density rises, and production scales without synthetic chemical residue.',
  },
]

export default function Technology() {
  const [active, setActive] = useState(0)
  const ActiveIcon = PHASES[active].icon

  return (
    <section id="technology" className="relative border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl md:mb-24"
        >
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            THE BIOTECH ENGINE
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl">
            From lab strain to living yield
          </h2>
        </motion.div>

        {/* Desktop / tablet: interactive 3-phase grid */}
        <div className="hidden border border-zinc-800 md:grid md:grid-cols-3">
          {PHASES.map((phase, i) => {
            const Icon = phase.icon
            const isActive = active === i
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`group relative flex min-h-[420px] flex-col border-zinc-800 p-8 text-left transition-colors duration-300 lg:p-10 ${
                  i < PHASES.length - 1 ? 'md:border-r' : ''
                } ${isActive ? 'bg-zinc-950' : 'bg-black hover:bg-zinc-950/60'}`}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-display text-sm font-semibold tracking-[0.3em] text-zinc-500">
                    {phase.subtitle}
                  </span>
                  <span
                    className={`font-display text-3xl font-bold tracking-widest transition-colors duration-300 ${
                      isActive ? 'text-emerald-400' : 'text-zinc-700'
                    }`}
                  >
                    {phase.id}
                  </span>
                </div>

                <Icon
                  size={28}
                  strokeWidth={1.25}
                  className={`mb-6 transition-colors duration-300 ${
                    isActive ? 'text-emerald-400' : 'text-zinc-600'
                  }`}
                />

                <h3 className="mb-4 font-display text-2xl font-bold tracking-[0.18em] text-white lg:text-3xl">
                  {phase.title}
                </h3>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.p
                      key={phase.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="mt-auto font-body text-sm font-light leading-relaxed text-zinc-400 lg:text-base"
                    >
                      {phase.body}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div
                  className={`absolute inset-x-0 bottom-0 h-px transition-all duration-300 ${
                    isActive ? 'bg-emerald-500' : 'bg-transparent'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="border border-zinc-800 md:hidden">
          {PHASES.map((phase, i) => {
            const Icon = phase.icon
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`border-zinc-800 p-6 ${i < PHASES.length - 1 ? 'border-b' : ''}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-xs font-semibold tracking-[0.3em] text-zinc-500">
                    {phase.subtitle}
                  </span>
                  <span className="font-display text-2xl font-bold tracking-widest text-emerald-400">
                    {phase.id}
                  </span>
                </div>
                <Icon size={24} strokeWidth={1.25} className="mb-4 text-emerald-400" />
                <h3 className="mb-3 font-display text-xl font-bold tracking-[0.18em] text-white">
                  {phase.title}
                </h3>
                <p className="font-body text-sm font-light leading-relaxed text-zinc-400">
                  {phase.body}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Active phase summary strip (desktop cue) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 hidden items-center gap-4 border border-zinc-800 px-6 py-4 md:flex"
        >
          <ActiveIcon size={18} strokeWidth={1.5} className="text-emerald-400" />
          <p className="font-display text-xs font-semibold tracking-[0.25em] text-zinc-400">
            ACTIVE PROTOCOL — {PHASES[active].subtitle.toUpperCase()}: {PHASES[active].title}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
