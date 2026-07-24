import { motion } from 'framer-motion'
import { Box } from 'lucide-react'

const PRODUCTS = [
  {
    name: 'BIOVIK PRIME',
    tag: 'CORE YIELD',
    specs: [
      { label: 'EFFICIENCY GAIN', value: '+40%' },
      { label: 'CYCLE TYPE', value: 'Seasonal' },
      { label: 'RESIDUE', value: '0%' },
    ],
    blurb:
      'Flagship photosynthetic accelerator for staple crops. Maximizes carbon fixation and harvest density across full growth cycles.',
  },
  {
    name: 'BIOVIK SHIELD',
    tag: 'STRESS DEFENSE',
    specs: [
      { label: 'STRESS TOLERANCE', value: 'High' },
      { label: 'CLIMATE BAND', value: 'Arid–Humid' },
      { label: 'RESIDUE', value: '0%' },
    ],
    blurb:
      'Protective symbiotic layer that stabilizes plant performance under heat, drought, and nutrient volatility without chemical coatings.',
  },
  {
    name: 'BIOVIK ROOT-X',
    tag: 'RHIZOSPHERE',
    specs: [
      { label: 'UPTAKE RATE', value: '2.5×' },
      { label: 'INTERFACE', value: 'Root / Vascular' },
      { label: 'RESIDUE', value: '0%' },
    ],
    blurb:
      'Root-zone delivery system engineered for rapid vascular integration and precision nutrient–energy transfer from soil to canopy.',
  },
]

export default function Products() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#0a0a0c]">
      <div className="cellular-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.08),_transparent_50%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36 lg:px-14">
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl md:mb-24"
        >
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            PRODUCTS
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.2em] text-white sm:text-5xl md:text-6xl">
            Engineered Formulations
          </h1>
          <p className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-zinc-400 md:text-lg">
            Living biological systems packaged for deployment — each formulation tuned for a
            distinct layer of the plant productivity stack.
          </p>
        </motion.header>

        <div className="grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="flex flex-col border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-cyan-400/35 hover:shadow-[0_0_36px_rgba(0,242,254,0.1)]"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center border-b border-white/10 bg-gradient-to-br from-cyan-400/5 via-transparent to-emerald-500/10">
                <div className="flex flex-col items-center gap-3 text-zinc-500">
                  <Box size={36} strokeWidth={1.25} className="text-cyan-400/50" />
                  <span className="font-display text-[10px] tracking-[0.3em]">
                    3D MODEL PLACEHOLDER
                  </span>
                </div>
                <div className="absolute inset-4 border border-dashed border-white/10" />
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="mb-2 font-display text-[10px] font-semibold tracking-[0.3em] text-cyan-400">
                  {product.tag}
                </p>
                <h2 className="mb-4 font-display text-xl font-bold tracking-[0.18em] text-white">
                  {product.name}
                </h2>
                <p className="mb-8 flex-1 font-body text-sm font-light leading-relaxed text-zinc-400">
                  {product.blurb}
                </p>
                <ul className="space-y-3 border-t border-white/10 pt-5">
                  {product.specs.map((spec) => (
                    <li
                      key={spec.label}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="font-display text-[10px] tracking-[0.25em] text-zinc-500">
                        {spec.label}
                      </span>
                      <span className="font-display text-sm font-semibold tracking-[0.12em] text-emerald-400">
                        {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
