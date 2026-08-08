import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const SECTIONS = 4
/** Catch-up toward scroll target — high enough to feel locked, soft enough to avoid jitter. */
const SCRUB_SPEED = 14
/** Share of each section used to crossfade into the next clip. */
const CROSSFADE = 0.18

function frameDuration() {
  return 1 / 30
}

function createSeekController(video) {
  let busy = false
  let pending = null
  let safetyTimer = 0

  const flush = () => {
    if (pending == null || busy) return
    const target = pending
    pending = null
    if (!video.duration || !Number.isFinite(video.duration)) return
    if (Math.abs(video.currentTime - target) < frameDuration() * 0.45) return

    busy = true
    window.clearTimeout(safetyTimer)
    safetyTimer = window.setTimeout(() => {
      busy = false
      flush()
    }, 90)

    try {
      if (typeof video.fastSeek === 'function') {
        video.fastSeek(target)
      } else {
        video.currentTime = target
      }
    } catch {
      window.clearTimeout(safetyTimer)
      busy = false
    }
  }

  const onSeeked = () => {
    window.clearTimeout(safetyTimer)
    busy = false
    flush()
  }

  video.addEventListener('seeked', onSeeked)

  return {
    seek(progress) {
      if (!video.duration || !Number.isFinite(video.duration)) return
      const raw = Math.min(1, Math.max(0, progress)) * video.duration
      const step = frameDuration()
      const target = Math.min(
        video.duration,
        Math.max(0, Math.round(raw / step) * step),
      )
      pending = target
      flush()
    },
    destroy() {
      window.clearTimeout(safetyTimer)
      video.removeEventListener('seeked', onSeeked)
    },
  }
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

export default function ScrollyStory() {
  const containerRef = useRef(null)
  const heroVideoRef = useRef(null)
  const missionVideoRef = useRef(null)
  const techVideoRef = useRef(null)
  const ctaVideoRef = useRef(null)
  const rafRef = useRef(0)
  const smoothProgress = useRef(0)
  const targetProgress = useRef(0)
  const [activePanel, setActivePanel] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const videos = [
      heroVideoRef.current,
      missionVideoRef.current,
      techVideoRef.current,
      ctaVideoRef.current,
    ]
    if (!container || videos.some((v) => !v)) return undefined

    const seekers = videos.map((video) => createSeekController(video))

    videos.forEach((video) => {
      video.pause()
      video.loop = false
      video.style.opacity = '0'
      video.style.willChange = 'opacity'
    })
    videos[0].style.opacity = '1'

    let running = true
    let lastTs = performance.now()
    let primedNext = -1

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

      const ease = 1 - Math.exp(-dt * SCRUB_SPEED)
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * ease

      if (
        Math.abs(targetProgress.current - smoothProgress.current) < 0.00008
      ) {
        smoothProgress.current = targetProgress.current
      }

      const p = smoothProgress.current
      const scaled = p * SECTIONS
      const panel = Math.min(SECTIONS - 1, Math.floor(scaled))
      const localProgress = Math.min(1, Math.max(0, scaled - panel))
      const fadeStart = 1 - CROSSFADE

      // Scrub only the active clip — never seek two videos in the same frame.
      seekers[panel].seek(localProgress)

      // During crossfade, hold the next clip at its first frame (opacity only).
      if (panel < SECTIONS - 1 && localProgress > fadeStart) {
        if (primedNext !== panel + 1) {
          seekers[panel + 1].seek(0)
          primedNext = panel + 1
        }
      } else if (localProgress < 0.02) {
        primedNext = -1
      }

      videos.forEach((video, i) => {
        let opacity = 0

        if (i === panel) {
          if (panel < SECTIONS - 1 && localProgress > fadeStart) {
            opacity = 1 - smoothstep(fadeStart, 1, localProgress)
          } else {
            opacity = 1
          }
        } else if (
          i === panel + 1 &&
          panel < SECTIONS - 1 &&
          localProgress > fadeStart
        ) {
          opacity = smoothstep(fadeStart, 1, localProgress)
        }

        video.style.opacity = String(opacity)
      })

      setActivePanel((prev) => (prev === panel ? prev : panel))

      rafRef.current = requestAnimationFrame(tick)
    }

    const onScrollOrResize = () => {
      targetProgress.current = readScrollProgress()
    }

    const onLoaded = () => {
      videos.forEach((video) => video.pause())
      smoothProgress.current = readScrollProgress()
      targetProgress.current = smoothProgress.current
    }

    videos.forEach((video) => video.addEventListener('loadedmetadata', onLoaded))
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    if (videos.some((v) => v.readyState >= 1)) onLoaded()
    onScrollOrResize()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      running = false
      seekers.forEach((s) => s.destroy())
      videos.forEach((video) =>
        video.removeEventListener('loadedmetadata', onLoaded),
      )
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollToMission = () => {
    document.querySelector('#mission')?.scrollIntoView({ behavior: 'smooth' })
  }

  const panelStyle = (index) => ({
    opacity: activePanel === index ? 1 : 0.22,
    transform: activePanel === index ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  })

  return (
    <div ref={containerRef} className="scrolly-story relative">
      {/* Sticky video backdrop — one clip per section */}
      <div className="scrolly-sticky sticky top-0 z-0 h-svh w-screen overflow-hidden">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 1 }}
          src="/videos/hero-section.mp4?v=denoise-clarity"
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={missionVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
          src="/videos/mission-section.mp4?v=scrub-1080"
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={techVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
          src="/videos/tech-section.mp4?v=scrub-1080"
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={ctaVideoRef}
          className="absolute inset-x-0 top-0 w-full object-cover object-top"
          style={{
            opacity: 0,
            height: 'calc(100% + 70px)',
          }}
          src="/videos/cta-section.mp4?v=scrub-1080"
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* Four equal vertical sections stacked over the sticky video */}
      <div className="pointer-events-none relative z-10 -mt-[100svh]">
        {/* Section 1 — Hero */}
        <section
          id="hero"
          className="relative flex h-svh w-full items-end justify-start px-5 pb-28 pt-32 md:px-10 md:pb-32 lg:px-14"
          style={panelStyle(0)}
        >
          <div className="pointer-events-auto mx-auto w-full max-w-[1400px]">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl font-display text-[1.575rem] font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-[2.1rem] md:text-[2.625rem] lg:text-[3.15rem] xl:text-[3.85rem]"
            >
              Democratising
              <br />
              food
              <br />
              security
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-10"
            >
              <Link
                to="/about"
                className="inline-block border border-white bg-black px-8 py-3 font-display text-sm font-semibold tracking-[0.28em] text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                LEARN MORE
              </Link>
            </motion.div>
          </div>
          <button
            type="button"
            aria-label="Scroll to mission"
            onClick={scrollToMission}
            className="scroll-indicator pointer-events-auto absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white transition-colors hover:text-emerald-400"
          >
            <ChevronDown size={28} strokeWidth={1.25} />
          </button>
        </section>

        {/* Section 2 — Mission */}
        <section
          id="mission"
          className="flex h-svh w-full items-center justify-center px-5 md:px-10 lg:px-14"
          style={panelStyle(1)}
        >
          <div className="pointer-events-auto mx-auto w-full max-w-[1400px]">
            <h2 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Food Built Civilisations
            </h2>
            <p className="mt-6 max-w-3xl font-body text-base font-light leading-relaxed text-white md:mt-8 md:text-lg lg:text-xl">
              It should never be broken by war, geopolitics, or climate chaos.
            </p>
          </div>
        </section>

        {/* Section 3 — Technology */}
        <section
          id="technology"
          className="flex h-svh w-full items-center justify-center px-5 md:px-10 lg:px-14"
          style={panelStyle(2)}
        >
          <div className="pointer-events-auto mx-auto w-full max-w-[1400px]">
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {[
                'ECONOMICAL',
                '100% ORGANIC IN NATURE',
                'Built for every climate and soil type.',
              ].map((item) => (
                <div
                  key={item}
                  className="flex min-h-[140px] items-center border border-white/15 px-6 py-8 md:min-h-[180px] md:px-8"
                >
                  <p className="font-display text-xl font-bold uppercase leading-snug tracking-[0.12em] text-white md:text-2xl">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — CTA */}
        <section
          id="field-trial"
          className="flex h-svh w-full items-center justify-center px-5 md:px-10 lg:px-14"
          style={panelStyle(3)}
        >
          <div className="pointer-events-auto mx-auto flex w-full max-w-[1400px] flex-col items-center text-center">
            <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-[0.06em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Request for a free field trial
            </h2>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center justify-center border border-white px-8 py-3.5 font-display text-sm font-semibold tracking-[0.28em] text-white transition-all duration-300 hover:bg-white hover:text-black md:mt-12 md:px-10 md:py-4 md:text-base"
            >
              GET STARTED
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
