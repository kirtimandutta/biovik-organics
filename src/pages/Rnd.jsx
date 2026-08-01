import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const METRICS = [
  { label: 'ACTIVE PATENTS', value: '12', accent: 'cyan' },
  { label: 'LAB STRAINS', value: '48', accent: 'emerald' },
  { label: 'FIELD TRIALS', value: '27', accent: 'cyan' },
  { label: 'R&D CYCLES / YR', value: '6', accent: 'emerald' },
]

const LAB_TAGS = ['Bangalore, IN', 'Food Security Focus', 'Multi-Project Pipeline']

const BHRAMHA_FEATURES = [
  'Advanced Formulation Calculations',
  'Custom Client Solution Engine',
  'Multi-Vertical Machine Learning',
]

function FeatureVideo({ src, poster, glow = 'default', label }) {
  const shell =
    glow === 'cyan'
      ? 'border-cyan-400/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] hover:border-cyan-400/50'
      : 'border-white/10 shadow-[0_0_40px_rgba(0,242,254,0.1)] hover:border-cyan-400/40'

  return (
    <div className="relative">
      <div
        className={`pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-[radial-gradient(ellipse_at_center,_rgba(0,242,254,0.12),_transparent_70%)] blur-xl ${
          glow === 'cyan' ? 'opacity-100' : 'opacity-70'
        }`}
      />
      <div
        className={`relative overflow-hidden rounded-2xl border bg-black/40 backdrop-blur-md transition-all duration-500 ${shell}`}
      >
        <div className="aspect-video w-full">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="metadata"
            poster={poster}
            aria-label={label}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}

export default function Rnd() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#1a0a2e]">
      <div className="cellular-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,#2e1065_0%,#5b21b6_42%,#7c3aed_72%,#4c1d95_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(192,132,252,0.35),_transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36 lg:px-14">
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-3xl md:mb-16"
        >
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            R&D
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.2em] text-white sm:text-5xl md:text-6xl">
            Research & Synthetics
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-relaxed text-white md:text-lg">
            Advancing deep-science biotechnology and AI-driven formulation pipelines from our
            primary research facility in Bangalore.
          </p>
        </motion.header>

        {/* Metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:mb-24 lg:grid-cols-4"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-[#08080a]/90 px-5 py-8 backdrop-blur-md md:px-7 md:py-10"
            >
              <p className="mb-3 font-display text-[16px] tracking-[0.28em] text-white">
                {m.label}
              </p>
              <p
                className={`font-display text-4xl font-bold tracking-[0.12em] md:text-5xl ${
                  m.accent === 'cyan'
                    ? 'text-cyan-400 drop-shadow-[0_0_18px_rgba(0,242,254,0.35)]'
                    : 'text-emerald-400 drop-shadow-[0_0_18px_rgba(16,185,129,0.3)]'
                }`}
              >
                {m.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Section 1 â€” Biovik Labs */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 border border-white/10 bg-white/5 p-6 backdrop-blur-md md:mb-24 md:p-8 lg:p-10"
        >
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
            <div>
              <p className="mb-3 font-display text-[16px] font-semibold tracking-[0.3em] text-cyan-400">
                FACILITY & PIPELINE
              </p>
              <h2 className="mb-5 font-display text-3xl font-light uppercase tracking-tight text-white md:text-4xl">
                Biovik Labs
              </h2>
              <p className="mb-8 font-body text-sm font-light leading-relaxed text-white md:text-base">
                Biovik operates from a state-of-the-art research and development facility in
                Bangalore, where our team is focused on advancing biotechnology through innovative
                and practical research. We are building economical, safe, and functional solutions
                aimed at addressing global food security challenges, while continuing to develop
                multiple projects across a broader biotechnology pipeline.
              </p>
              <div className="flex flex-wrap gap-3">
                {LAB_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-default border border-white/10 bg-black/40 px-3 py-2 font-display text-[16px] tracking-[0.2em] text-white transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/5 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.12)]"
                  >
                    [ {tag} ]
                  </span>
                ))}
              </div>
            </div>

            <FeatureVideo
              src="/assets/videos/biovik-labs-tour.mp4"
              poster="/assets/images/biovik-labs-thumb.jpg"
              label="Biovik Labs facility tour"
              glow="default"
            />
          </div>
        </motion.section>

        {/* Section 2 â€” Bhramha */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8 lg:p-10"
        >
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
            <div className="order-2 md:order-1">
              <FeatureVideo
                src="/assets/videos/bhramha-ai-demo.mp4"
                poster="/assets/images/bhramha-ai-thumb.jpg"
                label="Bhramha AI platform demo"
                glow="cyan"
              />
            </div>

            <div className="order-1 md:order-2">
              <p className="mb-3 font-display text-[16px] font-semibold tracking-[0.3em] text-emerald-400">
                DEEP-SCIENCE AI PLATFORM
              </p>
              <h2 className="mb-5 font-display text-3xl font-light uppercase tracking-tight text-white md:text-4xl">
                Bhramha
              </h2>
              <p className="mb-8 font-body text-sm font-light leading-relaxed text-white md:text-base">
                At Biovik, we are advancing R&D with Bhramha, a deep-science AI platform developed by
                Biovik Labs. Designed to assist our scientists, it performs advanced calculations,
                supports formulation development, and helps us build solutions aligned with client
                requirements. Built on machine learning, it also has applications across other
                biotechnology verticals that we aim to commercialise over time.
              </p>
              <ul className="space-y-3">
                {BHRAMHA_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="group flex items-center gap-3 border border-white/10 bg-black/30 px-4 py-3 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:shadow-[0_0_24px_rgba(0,242,254,0.1)]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-emerald-500/40 text-emerald-400 transition-colors group-hover:border-cyan-400/50 group-hover:text-cyan-400">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span className="font-display text-xs tracking-[0.16em] text-white transition-colors group-hover:text-white md:text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
