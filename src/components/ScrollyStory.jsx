import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ScrollyStory() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const rafRef = useRef(0)
  const smoothProgress = useRef(0)
  const targetProgress = useRef(0)
  const scrollVel = useRef(0)
  const [activePanel, setActivePanel] = useState(0)
  // Wide runway so scrub feels slower; ~80vw of scroll per second of video
  const [trackVw, setTrackVw] = useState(800)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return undefined

    video.pause()
    video.loop = false

    let running = true
    let lastTs = performance.now()

    const readScrollProgress = () => {
      const scrollable = container.scrollWidth - container.clientWidth
      if (scrollable <= 0) return 0
      return Math.min(1, Math.max(0, container.scrollLeft / scrollable))
    }

    const tick = (ts) => {
      if (!running) return

      const dt = Math.min(0.05, (ts - lastTs) / 1000)
      lastTs = ts

      // Apply damped wheel momentum to horizontal scroll
      if (Math.abs(scrollVel.current) > 0.05) {
        container.scrollLeft += scrollVel.current
        scrollVel.current *= Math.exp(-dt * 7)
      } else {
        scrollVel.current = 0
      }

      targetProgress.current = readScrollProgress()

      // Soft follow — lower = silkier video scrub
      const ease = 1 - Math.exp(-dt * 3.2)
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * ease

      if (video.duration && Number.isFinite(video.duration)) {
        const targetTime = smoothProgress.current * video.duration
        if (Math.abs(video.currentTime - targetTime) > 0.008) {
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

    // Map vertical wheel / trackpad to horizontal momentum
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      // Soften large wheel spikes so scrub doesn't jump
      scrollVel.current += e.deltaY * 0.55
      // Cap velocity so one flick can't teleport across the track
      const maxVel = container.clientWidth * 0.12
      scrollVel.current = Math.max(-maxVel, Math.min(maxVel, scrollVel.current))
    }

    const onLoaded = () => {
      video.pause()
      const vw = Math.max(600, Math.ceil(video.duration * 80))
      setTrackVw(vw)
      // Recalc after layout width update
      requestAnimationFrame(() => {
        smoothProgress.current = readScrollProgress()
        targetProgress.current = smoothProgress.current
      })
    }

    video.addEventListener('loadedmetadata', onLoaded)
    container.addEventListener('scroll', onScrollOrResize, { passive: true })
    container.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('resize', onScrollOrResize)
    if (video.readyState >= 1) onLoaded()
    onScrollOrResize()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      running = false
      video.removeEventListener('loadedmetadata', onLoaded)
      container.removeEventListener('scroll', onScrollOrResize)
      container.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollToMission = () => {
    const container = containerRef.current
    const mission = document.querySelector('#mission')
    if (!container || !mission) return
    container.scrollTo({ left: mission.offsetLeft, behavior: 'smooth' })
  }

  const colVw = trackVw / 3
  const panelStyle = (index) => ({
    opacity: activePanel === index ? 1 : 0.22,
    transform: activePanel === index ? 'translateX(0)' : 'translateX(12px)',
    transition: 'opacity 0.55s ease, transform 0.55s ease',
  })

  return (
    <div
      ref={containerRef}
      className="scrolly-story h-svh w-full overflow-x-auto overflow-y-hidden"
    >
      <div className="relative h-full" style={{ width: `${trackVw}vw` }}>
        {/* Sticky full-viewport video plane (pins to left while scrolling horizontally) */}
        <div className="scrolly-sticky sticky left-0 top-0 z-0 h-full w-screen overflow-hidden">
          <video
            ref={videoRef}
            id="bg-video"
            className="h-full w-full object-cover"
            src="/videos/story.mp4?v=1080p"
            muted
            playsInline
            preload="auto"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                'radial-gradient(ellipse at center, transparent 18%, rgba(91,33,182,0.21) 55%, rgba(46,16,101,0.43) 78%, rgba(26,10,46,0.55) 100%)',
                'linear-gradient(155deg, rgba(46,16,101,0.27) 0%, rgba(91,33,182,0.17) 42%, rgba(124,58,237,0.13) 72%, rgba(76,29,149,0.24) 100%)',
              ].join(', '),
            }}
          />
          <div className="cellular-grid pointer-events-none absolute inset-0 opacity-60" />
        </div>

        {/* Overlay columns — absolute over the wide track so they pass across the sticky video */}
        <div className="scrolly-overlay pointer-events-none absolute inset-0 z-10 flex h-full">
          {/* Col 1 — Hero */}
          <section
            id="hero"
            className="relative h-full shrink-0"
            style={{ width: `${colVw}vw` }}
          >
            <div
              className="sticky left-0 top-0 flex h-full w-screen items-end justify-start px-5 pb-28 pt-32 md:px-10 md:pb-32 lg:px-14"
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
                    to="/process"
                    className="inline-block border border-white px-8 py-3 font-display text-sm font-semibold tracking-[0.28em] text-white transition-all duration-300 hover:bg-white hover:text-black"
                  >
                    LEARN MORE
                  </Link>
                </motion.div>
              </div>
              <button
                type="button"
                aria-label="Scroll to mission"
                onClick={scrollToMission}
                className="scroll-indicator pointer-events-auto absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-emerald-400"
              >
                <ChevronRight size={28} strokeWidth={1.25} />
              </button>
            </div>
          </section>

          {/* Col 2 — Mission */}
          <section
            id="mission"
            className="relative h-full shrink-0"
            style={{ width: `${colVw}vw` }}
          >
            <div
              className="sticky left-0 top-0 flex h-full w-screen items-center justify-center px-5 md:px-10 lg:px-14"
              style={panelStyle(1)}
            >
              <div className="pointer-events-auto mx-auto w-full max-w-[1400px]">
                <h2 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Food Built Civilisations
                </h2>
                <p className="mt-6 max-w-3xl font-body text-base font-light leading-relaxed text-zinc-200 md:mt-8 md:text-lg lg:text-xl">
                  It should never be broken by war, geopolitics, or climate chaos.
                </p>
              </div>
            </div>
          </section>

          {/* Col 3 — Technology */}
          <section
            id="technology"
            className="relative h-full shrink-0"
            style={{ width: `${colVw}vw` }}
          >
            <div
              className="sticky left-0 top-0 flex h-full w-screen items-center justify-center px-5 md:px-10 lg:px-14"
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
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
