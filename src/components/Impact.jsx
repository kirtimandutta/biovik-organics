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
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const metricsRef = useRef(null)
  const rafRef = useRef(0)
  const smoothProgress = useRef(0)
  const targetProgress = useRef(0)
  const [trackVh, setTrackVh] = useState(550)
  const [panelActive, setPanelActive] = useState(false)
  const inView = useInView(metricsRef, { once: true, amount: 0.4 })

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

      const active =
        smoothProgress.current > 0.02 && smoothProgress.current < 0.98
      setPanelActive((prev) => (prev === active ? prev : active))

      rafRef.current = requestAnimationFrame(tick)
    }

    const onScrollOrResize = () => {
      targetProgress.current = readScrollProgress()
    }

    const onLoaded = () => {
      video.pause()
      // Match story scrub pacing (~55vh per second of footage)
      const vh = Math.max(220, Math.ceil(video.duration * 55))
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

  return (
    <div
      ref={containerRef}
      id="impact"
      className="scrolly-story relative border-t border-zinc-800"
      style={{ height: `${trackVh}vh` }}
    >
      <div className="scrolly-sticky sticky top-0 z-0 h-svh w-screen overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/videos/impact.mp4?v=1080p45"
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

      <div className="scrolly-overlay pointer-events-none absolute inset-0 z-10">
        <section className="relative w-full" style={{ height: `${trackVh}vh` }}>
          <div
            className="sticky top-0 flex h-svh w-full items-center"
            style={{
              opacity: panelActive ? 1 : 0.35,
              transform: panelActive ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.55s ease, transform 0.55s ease',
            }}
          >
            <div className="pointer-events-auto mx-auto w-full max-w-[1400px] px-5 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
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
                ref={metricsRef}
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
          </div>
        </section>
      </div>
    </div>
  )
}
