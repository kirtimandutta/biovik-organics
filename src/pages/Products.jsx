import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Box, FileUp } from 'lucide-react'
import { productList } from '../data/productsData'

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}

const easeOut = [0.22, 1, 0.36, 1]

function ProductMedia({ src, fallback, name }) {
  const [failed, setFailed] = useState(false)
  const [current, setCurrent] = useState(src)

  if (failed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="flex flex-col items-center gap-3 text-zinc-600"
      >
        <Box size={36} strokeWidth={1.25} className="text-cyan-400/40" />
        <span className="font-display text-[10px] tracking-[0.28em]">{name.toUpperCase()}</span>
      </motion.div>
    )
  }

  return (
    <motion.img
      key={current}
      src={current}
      alt={`${name} product logo`}
      className="h-full w-full object-contain p-6 md:p-8"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: easeOut }}
      onError={() => {
        if (current !== fallback) setCurrent(fallback)
        else setFailed(true)
      }}
    />
  )
}

export default function Products() {
  const videoRef = useRef(null)
  const cardsRef = useRef(null)
  const frozenRef = useRef(false)
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVideoReady) return undefined

    video.pause()
    video.loop = false
    frozenRef.current = false

    const lockFinalFrame = () => {
      const vid = videoRef.current
      if (!vid?.duration || Number.isNaN(vid.duration)) return
      const finalTime = Math.max(0, vid.duration - 0.05)
      try {
        if (Math.abs(vid.currentTime - finalTime) > 0.01) {
          vid.currentTime = finalTime
        }
      } catch {
        // ignore mid-seek race
      }
      frozenRef.current = true
    }

    const handleScroll = () => {
      const vid = videoRef.current
      const cards = cardsRef.current
      if (!vid || !cards || !vid.duration || Number.isNaN(vid.duration)) return

      const cardsTop = cards.getBoundingClientRect().top + window.scrollY
      const scrollTriggerDistance = Math.max(1, cardsTop - window.innerHeight * 0.3)
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollTriggerDistance))

      if (progress >= 1) {
        lockFinalFrame()
        return
      }

      frozenRef.current = false
      const maxDuration = Math.max(0, vid.duration - 0.05)
      const targetTime = maxDuration * progress

      requestAnimationFrame(() => {
        if (!videoRef.current) return
        try {
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.02) {
            videoRef.current.currentTime = targetTime
          }
        } catch {
          // ignore mid-seek race
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isVideoReady])

  return (
    <div className="relative min-h-svh bg-[#08080a] pb-32 pt-24 text-white">
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden">
        <motion.video
          ref={videoRef}
          src="/assets/videos/biovik-products-showcase.mp4"
          className="h-full w-full scale-105 object-cover brightness-110 contrast-125"
          muted
          playsInline
          preload="auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoReady ? 0.6 : 0 }}
          transition={{ duration: 1.1, ease: easeOut }}
          onLoadedMetadata={() => setIsVideoReady(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080a]/80 via-[#08080a]/30 to-[#08080a]/90" />
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse at center, transparent 18%, rgba(91,33,182,0.11) 55%, rgba(46,16,101,0.22) 78%, rgba(26,10,46,0.28) 100%)',
              'linear-gradient(155deg, rgba(46,16,101,0.14) 0%, rgba(91,33,182,0.08) 42%, rgba(124,58,237,0.07) 72%, rgba(76,29,149,0.12) 100%)',
            ].join(', '),
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <header className="mb-16 flex min-h-[70vh] flex-col justify-center pt-8">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.05, ease: easeOut }}
            className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400"
          >
            PRODUCTS
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.85, delay: 0.15, ease: easeOut }}
            className="font-display text-5xl font-light tracking-tight drop-shadow-lg md:text-7xl"
          >
            ENGINEERED FORMULATIONS
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.28, ease: easeOut }}
            className="mt-4 max-w-2xl rounded-xl border border-white/10 bg-black/30 p-4 font-body text-base leading-relaxed text-zinc-300 backdrop-blur-md"
          >
            Living biological systems packaged for precision deployment — each formulation tuned for
            a distinct layer of crop care and farm efficiency.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.4, ease: easeOut }}
            className="mt-8 inline-flex w-fit animate-bounce items-center gap-2 rounded-full border border-cyan-400/30 bg-black/70 px-5 py-2.5 font-display text-[10px] uppercase tracking-[0.25em] text-cyan-400 backdrop-blur-md"
          >
            Scroll to complete animation flow ↓
          </motion.div>
        </header>

        <div ref={cardsRef} className="grid gap-8 pt-12 md:grid-cols-2">
          {productList.map((product, i) => {
            const detailTo = `/products/${product.id}`
            const baseDelay = 0.08 + i * 0.08
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: baseDelay, ease: easeOut }}
                className="group flex flex-col rounded-3xl border border-white/10 bg-black/60 p-8 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/60"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.85, delay: baseDelay + 0.08, ease: easeOut }}
                >
                  <Link
                    to={detailTo}
                    className="relative mb-6 flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/40 transition-opacity hover:opacity-90 md:h-48"
                  >
                    <ProductMedia
                      src={product.image}
                      fallback={product.imageFallback}
                      name={product.name}
                    />
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: baseDelay + 0.12, ease: easeOut }}
                  className="mb-1 font-mono text-xs uppercase tracking-widest text-cyan-400"
                >
                  {product.category}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: baseDelay + 0.16, ease: easeOut }}
                >
                  <Link to={detailTo}>
                    <h2 className="mb-2 text-3xl font-bold text-white transition-colors hover:text-cyan-400">
                      {product.name}
                    </h2>
                  </Link>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: baseDelay + 0.2, ease: easeOut }}
                  className="mb-4 font-display text-xs tracking-[0.16em] text-emerald-400/90"
                >
                  {product.tagline}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: baseDelay + 0.24, ease: easeOut }}
                  className="mb-6 flex-1 text-sm leading-relaxed text-zinc-300"
                >
                  {product.description}
                </motion.p>

                {product.specs?.[0] && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: baseDelay + 0.28, ease: easeOut }}
                    className="mb-6 inline-block w-fit rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-widest text-cyan-300"
                  >
                    {product.specs[0]}
                  </motion.span>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: baseDelay + 0.32, ease: easeOut }}
                  className="mt-auto flex flex-col gap-3"
                >
                  <Link
                    to={detailTo}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-500/10 px-6 py-3 text-xs uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-400 hover:text-black"
                  >
                    Know More
                    <ArrowRight size={14} strokeWidth={1.75} />
                  </Link>

                  {product.contactCta && (
                    <Link
                      to={product.contactCta.to}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-xs uppercase tracking-widest text-zinc-300 transition-all hover:border-cyan-400/40 hover:text-cyan-400"
                    >
                      <FileUp size={14} strokeWidth={1.75} />
                      {product.contactCta.label}
                    </Link>
                  )}
                </motion.div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
