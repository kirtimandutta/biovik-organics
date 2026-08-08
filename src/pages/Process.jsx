import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Beaker, Droplets, SprayCan } from 'lucide-react'

const STAGES = [
  {
    id: '01',
    title: 'CREATING MICROBIAL CULTURE',
    description:
      'Cultivating specialized bio-engine microbial strains in highly monitored environments.',
    detail:
      'Bioreactors maintain sterile temperature, pH, and nutrient curves while colony density is sequenced in real time. Only strains meeting photosynthetic and metabolic thresholds advance to extraction.',
    image: '/assets/process/microbial-culture.svg',
  },
  {
    id: '02',
    title: 'EXTRACTION OF SECONDARY METABOLITES (ENZYMES)',
    description:
      'Isolating essential biological enzymes and secondary metabolites responsible for accelerated cellular uptake.',
    detail:
      'Centrifugation and membrane filtration separate active enzyme fractions from culture media. Potency assays verify uptake-acceleration markers before any compounding begins.',
    image: '/assets/process/enzyme-extraction.svg',
  },
  {
    id: '03',
    title: 'BLENDING',
    description:
      'Synergistically combining active compounds to guarantee uniform potency and stability across batches.',
    detail:
      'Active fractions are proportioned under controlled shear and humidity. Homogeneity sensors lock batch variance so every litre of CuraMix carries identical bio-catalytic strength.',
    image: '/assets/process/blending.svg',
  },
  {
    id: '04',
    title: 'BOTTLING (Biovik CuraMix)',
    description:
      'Precision packaging under sterile conditions to preserve active shelf life and molecular integrity.',
    detail:
      'Fill lines operate in ISO-grade clean zones. Sealed vessels protect enzyme integrity from oxygen and light until field deployment.',
    image: '/assets/process/bottling.png',
  },
  {
    id: '05',
    title: 'FIELD TRIALS & DEPLOYMENT',
    description:
      'Drone-assisted and targeted crop application verifying field performance, growth response, and soil health metrics.',
    detail:
      'Pilot plots validate canopy response, soil microbiome markers, and yield delta. Successful protocols scale into guided spray and drone delivery programs.',
    image: '/assets/process/field-trials.svg',
  },
]

function mlToLitersLabel(ml) {
  const liters = ml / 1000
  if (Number.isInteger(liters)) return `${liters}L`
  return `${parseFloat(liters.toFixed(2))}L`
}

function formatDoseRange(minMl, maxMl) {
  const primary = `${minMl.toLocaleString()} mL – ${maxMl.toLocaleString()} mL`
  if (maxMl >= 1000) {
    return `${primary} (${mlToLitersLabel(minMl)} – ${mlToLitersLabel(maxMl)})`
  }
  return primary
}

function StageImage({ src, title, active }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative mb-6 flex aspect-[16/10] items-center justify-center overflow-hidden border bg-black/40 transition-all duration-500 ${
        active ? 'border-cyan-400/40 shadow-[inset_0_0_40px_rgba(0,242,254,0.08)]' : 'border-white/10'
      }`}
    >
      {!failed ? (
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          className={`h-full w-full object-contain p-4 transition-all duration-500 ${
            active ? 'opacity-100 scale-100' : 'opacity-70 scale-[0.98]'
          }`}
        />
      ) : (
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <div className="h-16 w-16 rounded-full border border-dashed border-cyan-400/30" />
          <span className="font-display text-[16px] tracking-[0.28em] text-white">
            {title.slice(0, 18)}…
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-3 border border-dashed border-white/5" />
    </div>
  )
}

function DoseCalculator() {
  const [volume, setVolume] = useState(100)

  const dose = useMemo(() => {
    const v = Math.max(0, Number(volume) || 0)
    const minMl = Math.round(v * 5)
    const maxMl = Math.round(v * 10)
    return { v, minMl, maxMl }
  }, [volume])

  return (
    <div className="border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 text-cyan-400">
          <Beaker size={18} strokeWidth={1.5} />
        </span>
        <div>
          <p className="font-display text-[16px] tracking-[0.28em] text-white">CALCULATOR</p>
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-white">
            WATER VOLUME → DOSAGE
          </p>
        </div>
      </div>

      <label
        htmlFor="water-volume"
        className="mb-3 block font-display text-[16px] tracking-[0.28em] text-white"
      >
        WATER VOLUME (L)
      </label>

      <div className="mb-5 flex items-center gap-4">
        <input
          id="water-volume"
          type="number"
          min={1}
          max={10000}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-28 border border-white/10 bg-black/40 px-3 py-2.5 font-display text-lg tracking-[0.12em] text-cyan-400 outline-none transition-colors focus:border-cyan-400/50"
        />
        <input
          type="range"
          min={1}
          max={500}
          value={Math.min(500, Math.max(1, Number(volume) || 1))}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-400"
          aria-label="Water volume slider"
        />
      </div>

      <div className="border border-cyan-400/20 bg-cyan-400/5 px-5 py-5">
        <p className="mb-2 font-display text-[16px] tracking-[0.28em] text-emerald-400">
          RECOMMENDED DOSAGE
        </p>
        <p className="font-display text-lg font-bold tracking-[0.06em] text-white md:text-xl">
          {formatDoseRange(dose.minMl, dose.maxMl)}
        </p>
        <p className="mt-2 font-body text-sm font-light text-white">
          Biovik Formula for {dose.v || 0}L water
        </p>
      </div>
    </div>
  )
}

export default function Process() {
  const [activeId, setActiveId] = useState(STAGES[0].id)
  const active = STAGES.find((s) => s.id === activeId) ?? STAGES[0]

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
          className="mb-10 max-w-3xl md:mb-12"
        >
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            PROCESS
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.2em] text-white sm:text-5xl md:text-6xl">
            The Biological Engine
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-relaxed text-white md:text-lg">
            A 5-stage precision synthesis pipeline transforming lab-grade microbial cultures into
            high-efficiency field bio-catalysts.
          </p>
        </motion.header>

        {/* Featured process video */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto my-12 w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_40px_rgba(0,0,0,0.45)] transition-all duration-500 hover:border-white/25 md:rounded-3xl">
            <div className="aspect-video w-full">
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="metadata"
              >
                <source src="/assets/videos/biovik-process.mp4?v=grade-shadows" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>

        {/* Pipeline progress rail */}
        <div className="mb-8 hidden items-center gap-1 md:flex">
          {STAGES.map((stage, i) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveId(stage.id)}
              onMouseEnter={() => setActiveId(stage.id)}
              className="group flex flex-1 flex-col items-start gap-2"
              aria-pressed={activeId === stage.id}
            >
              <div className="flex w-full items-center gap-1">
                <span
                  className={`h-1 flex-1 transition-colors duration-300 ${
                    activeId === stage.id ? 'bg-cyan-400' : 'bg-white/10 group-hover:bg-cyan-400/40'
                  }`}
                />
                {i < STAGES.length - 1 && <span className="h-px w-2 bg-white/10" />}
              </div>
              <span
                className={`font-display text-[16px] tracking-[0.22em] transition-colors ${
                  activeId === stage.id ? 'text-cyan-400' : 'text-white group-hover:text-white'
                }`}
              >
                {stage.id}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {STAGES.map((stage, i) => {
            const isActive = activeId === stage.id
            return (
              <motion.button
                key={stage.id}
                type="button"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.06 }}
                onClick={() => setActiveId(stage.id)}
                onMouseEnter={() => setActiveId(stage.id)}
                aria-pressed={isActive}
                className={`group relative flex flex-col border bg-white/5 p-5 text-left backdrop-blur-md transition-all duration-500 md:p-6 ${
                  isActive
                    ? 'border-cyan-400/50 shadow-[0_0_40px_rgba(0,242,254,0.14)]'
                    : 'border-white/10 hover:border-cyan-400/50'
                }`}
              >
                <StageImage src={stage.image} title={stage.title} active={isActive} />

                <div className="mb-3 flex items-center justify-between gap-2">
                  <span
                    className={`font-display text-2xl font-bold tracking-widest transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400/50'
                    }`}
                  >
                    {stage.id}
                  </span>
                  {isActive && (
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  )}
                </div>

                <h2 className="mb-3 font-display text-sm font-bold uppercase leading-snug tracking-[0.16em] text-white md:text-[13px]">
                  {stage.title}
                </h2>
                <p className="font-body text-xs font-light leading-relaxed text-white md:text-sm">
                  {stage.description}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Technical breakdown panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-6 border border-cyan-400/20 bg-white/5 p-6 backdrop-blur-md md:p-8"
          >
            <p className="mb-2 font-display text-[16px] tracking-[0.3em] text-cyan-400">
              STAGE {active.id} — TECHNICAL BREAKDOWN
            </p>
            <h3 className="mb-4 font-display text-xl font-bold uppercase tracking-[0.2em] text-white">
              {active.title}
            </h3>
            <p className="max-w-3xl font-body text-sm font-light leading-relaxed text-white md:text-base">
              {active.detail}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dosing & Application */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 border border-white/10 bg-white/5 p-6 backdrop-blur-md md:mt-28 md:p-10 lg:p-12"
        >
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="mb-3 font-display text-[16px] font-semibold tracking-[0.35em] text-emerald-400">
              HOW TO APPLY
            </p>
            <h2 className="font-display text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-4xl">
              Dosing & Application Protocol
            </h2>
          </div>

          <div className="relative mx-auto mb-8 w-full max-w-5xl md:mb-10">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_40px_rgba(0,0,0,0.45)] transition-all duration-500 hover:border-white/25 md:rounded-3xl">
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                >
                  <source src="/assets/videos/biovikwaterrequired.mp4?v=grade-shadows" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ol className="space-y-5">
              <li className="flex gap-5 border border-white/10 bg-black/30 p-5 transition-colors hover:border-cyan-400/30">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-cyan-400/30 text-cyan-400">
                  <Droplets size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="mb-1 font-display text-[16px] tracking-[0.28em] text-white">
                    STEP 01
                  </p>
                  <p className="font-body text-sm font-light leading-relaxed text-white md:text-base">
                    Mix 5–10 mL of Biovik formulation per 1 Litre of water.
                  </p>
                </div>
              </li>
              <li className="flex gap-5 border border-white/10 bg-black/30 p-5 transition-colors hover:border-cyan-400/30">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-emerald-500/30 text-emerald-400">
                  <SprayCan size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="mb-1 font-display text-[16px] tracking-[0.28em] text-white">
                    STEP 02
                  </p>
                  <p className="font-body text-sm font-light leading-relaxed text-white md:text-base">
                    Spray evenly over crops at guided, equal intervals for maximum absorption.
                  </p>
                </div>
              </li>
            </ol>

            <DoseCalculator />
          </div>
        </motion.section>
      </div>
    </div>
  )
}
