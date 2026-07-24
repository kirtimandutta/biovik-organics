import { motion } from 'framer-motion'
import { Beaker, FileBadge, FlaskConical, Leaf } from 'lucide-react'

const METRICS = [
  { label: 'ACTIVE PATENTS', value: '12', accent: 'cyan' },
  { label: 'LAB STRAINS', value: '48', accent: 'emerald' },
  { label: 'FIELD TRIALS', value: '27', accent: 'cyan' },
  { label: 'R&D CYCLES / YR', value: '6', accent: 'emerald' },
]

const FOCUS = [
  {
    icon: FlaskConical,
    title: 'PHOTOSYNTHETIC THROUGHPUT',
    body: 'Pushing quantum yield of algae–plant hybrids beyond conventional breeding ceilings.',
  },
  {
    icon: Beaker,
    title: 'SYMBIOTIC STABILITY',
    body: 'Long-duration vascular coexistence protocols under multi-climate stress matrices.',
  },
  {
    icon: Leaf,
    title: 'ZERO-RESIDUE OUTPUT',
    body: 'Validating chemical-free harvest profiles across staple and specialty crop classes.',
  },
  {
    icon: FileBadge,
    title: 'IP & REGULATORY PATH',
    body: 'Expanding patent coverage while aligning formulations with agricultural compliance frameworks.',
  },
]

export default function Rnd() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#0a0a0c]">
      <div className="cellular-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,242,254,0.06),_transparent_60%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36 lg:px-14">
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-3xl md:mb-20"
        >
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            R&D
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.2em] text-white sm:text-5xl md:text-6xl">
            Research & Synthetics
          </h1>
          <p className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-zinc-400 md:text-lg">
            A live analytical surface of Biovik’s lab pipeline — metrics, patents, and the research
            vectors shaping the next biological engine.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-[#0a0a0c]/90 px-5 py-8 backdrop-blur-md md:px-7 md:py-10"
            >
              <p className="mb-3 font-display text-[10px] tracking-[0.28em] text-zinc-500">
                {m.label}
              </p>
              <p
                className={`font-display text-4xl font-bold tracking-[0.12em] md:text-5xl ${
                  m.accent === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'
                }`}
              >
                {m.value}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-white">
            RESEARCH FOCUS
          </h2>
          <span className="flex items-center gap-2 font-display text-[10px] tracking-[0.25em] text-zinc-500">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            LAB LIVE
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {FOCUS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.07 }}
                className="flex gap-5 border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-colors hover:border-cyan-400/30 md:p-7"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-cyan-400">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-white">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm font-light leading-relaxed text-zinc-400">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
