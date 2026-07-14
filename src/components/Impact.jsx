import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const METRICS = [
  {
    value: 40,
    prefix: '+',
    suffix: '%',
    label: 'PHOTOSYNTHETIC EFFICIENCY',
    decimals: 0,
  },
  {
    value: 2.5,
    prefix: '',
    suffix: 'x',
    label: 'CROP PRODUCTION ACCELERATION',
    decimals: 1,
  },
  {
    value: 0,
    prefix: '',
    suffix: '%',
    label: 'SYNTHETIC CHEMICAL RESIDUE',
    decimals: 0,
  },
]

function AnimatedValue({ value, prefix, suffix, decimals, active }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return undefined

    let frame
    const duration = 1600
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, value])

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString()

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

export default function Impact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section id="impact" className="relative overflow-hidden border-t border-zinc-800 bg-black">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/impact-backdrop.png')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/45" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            MEASURED IMPACT
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl">
            Performance at cellular scale
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="grid border border-white/15 bg-black/30 md:grid-cols-3"
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flex flex-col items-start px-6 py-12 md:px-8 md:py-16 lg:px-10 ${
                i < METRICS.length - 1
                  ? 'border-b border-white/15 md:border-b-0 md:border-r'
                  : ''
              }`}
            >
              <p className="font-display text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl">
                <AnimatedValue
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                  active={inView}
                />
              </p>
              <p className="mt-6 font-display text-xs font-semibold tracking-[0.28em] text-zinc-300 md:text-sm">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
