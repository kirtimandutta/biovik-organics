import { motion } from 'framer-motion'

const SPECS = [
  { label: 'CIN', value: 'U20129KA2025PTC202199' },
  { label: 'ROC', value: 'RoC-Bangalore' },
  {
    label: 'STATUS',
    value: 'Active',
    live: true,
  },
  {
    label: 'DIRECTORS',
    value: 'Hemanthkumar Abhaykumar Mehta · Harshvardhan Chandak',
  },
]

export default function Company() {
  return (
    <section id="company" className="relative border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32 lg:px-14 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            CORPORATE TRANSPARENCY
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl">
            Company registry
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="border border-zinc-800"
        >
          {SPECS.map((spec, i) => (
            <div
              key={spec.label}
              className={`grid gap-2 px-5 py-5 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-8 md:px-8 md:py-6 ${
                i < SPECS.length - 1 ? 'border-b border-zinc-800' : ''
              }`}
            >
              <span className="font-display text-xs font-semibold tracking-[0.3em] text-zinc-500">
                {spec.label}
              </span>
              <span className="flex items-center gap-3 font-body text-sm text-white md:text-base">
                {spec.live && (
                  <span
                    className="pulse-dot inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                    aria-hidden
                  />
                )}
                {spec.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <p className="font-display text-xs font-semibold tracking-[0.28em] text-zinc-500">
            © {new Date().getFullYear()} BIOVIK ORGANICS PRIVATE LIMITED
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:harshchandak97@gmail.com"
              className="font-display text-xs font-semibold tracking-[0.2em] text-zinc-400 transition-colors hover:text-emerald-400"
            >
              harshchandak97@gmail.com
            </a>
            <a
              href="#mission"
              className="font-display text-xs font-semibold tracking-[0.2em] text-zinc-500 transition-colors hover:text-white"
            >
              MISSION
            </a>
            <a
              href="#technology"
              className="font-display text-xs font-semibold tracking-[0.2em] text-zinc-500 transition-colors hover:text-white"
            >
              TECHNOLOGY
            </a>
            <a
              href="#impact"
              className="font-display text-xs font-semibold tracking-[0.2em] text-zinc-500 transition-colors hover:text-white"
            >
              IMPACT
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}
