import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ScrollyStory() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const rafRef = useRef(0)
  const smoothProgress = useRef(0)
  const targetProgress = useRef(0)
  const [expanded, setExpanded] = useState(false)
  const [activePanel, setActivePanel] = useState(0)
  // Tall runway so scrub feels slower; ~55vh of scroll per second of video
  const [trackVh, setTrackVh] = useState(600)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return undefined

    video.pause()
    video.loop = false

    let running = true
    let lastTs = performance.now()

    const readScrollProgress = () => {
      const rect = container.getBoundingClientRect()
      const scrollable = container.offsetHeight - window.innerHeight
      if (scrollable <= 0) return 0
      return Math.min(1, Math.max(0, -rect.top / scrollable))
    }

    const tick = (ts) => {
      if (!running) return

      const dt = Math.min(0.05, (ts - lastTs) / 1000)
      lastTs = ts

      targetProgress.current = readScrollProgress()

      // Ease toward scroll target — higher = snappier, lower = silkier
      const ease = 1 - Math.exp(-dt * 9)
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * ease

      if (video.duration && Number.isFinite(video.duration)) {
        const targetTime = smoothProgress.current * video.duration
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          try {
            video.currentTime = targetTime
          } catch {
            // ignore mid-seek race
          }
        }
      }

      const panel = Math.min(2, Math.floor(smoothProgress.current * 3))
      setActivePanel((prev) => (prev === panel ? prev : panel))

      rafRef.current = requestAnimationFrame(tick)
    }

    const onScrollOrResize = () => {
      targetProgress.current = readScrollProgress()
    }

    const onLoaded = () => {
      video.pause()
      const vh = Math.max(450, Math.ceil(video.duration * 55))
      setTrackVh(vh)
      smoothProgress.current = readScrollProgress()
      targetProgress.current = smoothProgress.current
    }

    video.addEventListener('loadedmetadata', onLoaded)
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    if (video.readyState >= 1) onLoaded()
    onScrollOrResize()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      running = false
      video.removeEventListener('loadedmetadata', onLoaded)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollToMission = () => {
    document.querySelector('#mission')?.scrollIntoView({ behavior: 'smooth' })
  }

  const rowVh = trackVh / 3
  const panelStyle = (index) => ({
    opacity: activePanel === index ? 1 : 0.22,
    transform: activePanel === index ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 0.55s ease, transform 0.55s ease',
  })

  return (
    <div
      ref={containerRef}
      className="scrolly-story relative"
      style={{ height: `${trackVh}vh` }}
    >
      {/* Sticky full-viewport video plane */}
      <div className="scrolly-sticky sticky top-0 z-0 h-svh w-screen overflow-hidden">
        <video
          ref={videoRef}
          id="bg-video"
          className="h-full w-full object-cover"
          src="/videos/story.mp4?v=1080p45"
          muted
          playsInline
          preload="auto"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
          }}
        />
        <div className="cellular-grid pointer-events-none absolute inset-0 opacity-60" />
      </div>

      {/* Overlay rows — absolute over the 300vh track so they pass across the sticky video */}
      <div className="scrolly-overlay pointer-events-none absolute inset-0 z-10">
        {/* Row 1 — Hero */}
        <section id="hero" className="relative w-full" style={{ height: `${rowVh}vh` }}>
          <div
            className="sticky top-0 flex h-svh w-full items-end justify-start px-5 pb-28 pt-32 md:px-10 md:pb-32 lg:px-14"
            style={panelStyle(0)}
          >
            <div className="pointer-events-auto mx-auto w-full max-w-[1400px]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7 }}
                className="mb-5 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400 md:text-sm"
              >
                BIOVIK ORGANICS
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-5xl font-display text-[1.575rem] font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-[2.1rem] md:text-[2.625rem] lg:text-[3.15rem] xl:text-[3.85rem]"
              >
                Boosting plant
                <br />
                efficiency through
                <br />
                biological engine
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-10"
              >
                <button
                  type="button"
                  onClick={scrollToMission}
                  className="border border-white px-8 py-3 font-display text-sm font-semibold tracking-[0.28em] text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  LEARN MORE
                </button>
              </motion.div>
            </div>
            <button
              type="button"
              aria-label="Scroll to mission"
              onClick={scrollToMission}
              className="scroll-indicator pointer-events-auto absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-emerald-400"
            >
              <ChevronDown size={28} strokeWidth={1.25} />
            </button>
          </div>
        </section>

        {/* Row 2 — Mission */}
        <section id="mission" className="relative w-full" style={{ height: `${rowVh}vh` }}>
          <div
            className="sticky top-0 flex h-svh w-full items-center justify-center px-5 md:px-10 lg:px-14"
            style={panelStyle(1)}
          >
            <div className="pointer-events-auto mx-auto grid w-full max-w-[1400px] gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="mb-4 font-display text-[1.08rem] font-semibold tracking-[0.35em] text-emerald-400">
                  THE CORE MISSION
                </p>
                <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  The future of food security
                </h2>
              </div>
              <div className="flex flex-col justify-end border-l-0 border-white/10 lg:border-l lg:pl-12">
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
              </div>
            </div>
          </div>
        </section>

        {/* Row 3 — Technology */}
        <section id="technology" className="relative w-full" style={{ height: `${rowVh}vh` }}>
          <div
            className="sticky top-0 flex h-svh w-full items-center justify-center px-5 md:px-10 lg:px-14"
            style={panelStyle(2)}
          >
            <div className="pointer-events-auto mx-auto w-full max-w-[1400px]">
              <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
                THE BIOTECH ENGINE
              </p>
              <h2 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl">
                From lab strain to living yield
              </h2>
              <div className="mt-14 grid gap-8 border-t border-white/15 pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/15">
                {[
                  { id: '01', title: 'SYNTHESIS', subtitle: 'Phase 1' },
                  { id: '02', title: 'INTEGRATION', subtitle: 'Phase 2' },
                  { id: '03', title: 'ACCELERATION', subtitle: 'Phase 3' },
                ].map((phase) => (
                  <div key={phase.id} className="md:px-8">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-display text-sm font-semibold tracking-[0.3em] text-zinc-400">
                        {phase.subtitle}
                      </span>
                      <span className="font-display text-3xl font-bold tracking-widest text-emerald-400">
                        {phase.id}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold tracking-[0.18em] text-white">
                      {phase.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
