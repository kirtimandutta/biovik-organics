import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Box, Check, Droplets, Package, Pause, Play, Send } from 'lucide-react'
import { getProduct, productList } from '../data/productsData'

function ProductMedia({ src, fallback, name }) {
  const [failed, setFailed] = useState(false)
  const [current, setCurrent] = useState(src)

  if (failed) {
    return (
      <div className="flex flex-col items-center gap-3 text-white">
        <Box size={48} strokeWidth={1.25} className="text-cyan-400/40" />
        <span className="font-display text-[16px] tracking-[0.28em]">{name.toUpperCase()}</span>
      </div>
    )
  }

  return (
    <img
      src={current}
      alt={`${name} product showcase`}
      className="h-full w-full object-contain p-8 md:p-12"
      onError={() => {
        if (current !== fallback) setCurrent(fallback)
        else setFailed(true)
      }}
    />
  )
}

function ProductHeroMedia({ product }) {
  const videoRef = useRef(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    setVideoFailed(false)
    setIsPlaying(true)
    const video = videoRef.current
    if (!video || !product.videoSrc) return undefined

    video.load()
    const play = video.play()
    if (play?.catch) {
      play.catch(() => setIsPlaying(false))
    }
  }, [product.id, product.videoSrc])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      const play = video.play()
      if (play?.catch) {
        play.catch(() => setIsPlaying(false))
      } else {
        setIsPlaying(true)
      }
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  if (!product.videoSrc || videoFailed) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_0_40px_rgba(0,242,254,0.15)]">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(0,242,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
        <ProductMedia
          src={product.image}
          fallback={product.imageFallback}
          name={product.name}
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_0_40px_rgba(0,242,254,0.15)]">
      <video
        key={product.id}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        preload="auto"
        poster={product.poster || product.image}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setVideoFailed(true)}
      >
        <source src={product.videoSrc} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.2)] backdrop-blur-md transition-all hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300"
      >
        {isPlaying ? (
          <Pause size={18} strokeWidth={1.75} />
        ) : (
          <Play size={18} strokeWidth={1.75} className="ml-0.5" />
        )}
      </button>
    </div>
  )
}

export default function ProductDetail() {
  const { productId } = useParams()
  const product = getProduct(productId)

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const orderTo = `/contact?product=${encodeURIComponent(product.name)}&inquiry=Product%20Inquiry`
  const others = productList.filter((p) => p.id !== product.id)

  return (
    <div className="relative min-h-svh overflow-hidden bg-[#08080a] text-white">
      <div className="cellular-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,242,254,0.08),_transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-28 md:px-12 md:pt-32">
        <Link
          to="/products"
          className="mb-10 inline-flex items-center gap-2 font-display text-xs tracking-[0.22em] text-white transition-colors hover:text-cyan-400"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          ALL FORMULATIONS
        </Link>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
        >
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
              {product.category}
            </p>
            <h1 className="font-display text-4xl font-light tracking-tight md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-3 font-display text-sm tracking-[0.18em] text-emerald-400">
              {product.tagline}
            </p>
            <p className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-white">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {product.specs.map((spec) => (
                <span
                  key={spec}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-display text-[16px] uppercase tracking-widest text-cyan-300"
                >
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {product.contactCta && (
                <Link
                  to={product.contactCta.to}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-500/10 px-6 py-3 text-xs uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-400 hover:text-black"
                >
                  {product.contactCta.label}
                </Link>
              )}
              <Link
                to={orderTo}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-xs uppercase tracking-widest text-white transition-all hover:border-cyan-400/40 hover:text-cyan-400"
              >
                <Package size={14} strokeWidth={1.75} />
                Order / Request Custom Batch
              </Link>
            </div>
          </div>

          <ProductHeroMedia product={product} />
        </motion.section>

        {/* Science */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl md:p-10"
        >
          <p className="mb-2 font-mono text-[16px] uppercase tracking-[0.3em] text-emerald-400">
            MECHANISM OF ACTION & SCIENCE
          </p>
          <h2 className="mb-4 font-display text-2xl font-light tracking-tight md:text-3xl">
            How {product.name} Works
          </h2>
          <p className="mb-10 max-w-3xl font-body text-sm font-light leading-relaxed text-white md:text-base">
            {product.details}
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {product.science.map((item, i) => (
              <div
                key={item.title}
                className="border border-white/10 bg-black/30 p-5 transition-colors hover:border-cyan-400/30"
              >
                <span className="mb-3 block font-display text-2xl font-bold tracking-widest text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 font-display text-sm font-bold tracking-[0.16em] text-white">
                  {item.title}
                </h3>
                <p className="font-body text-sm font-light leading-relaxed text-white">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" strokeWidth={2} />
                <span className="font-display text-xs tracking-[0.14em] text-white">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Dosing */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid gap-6 md:grid-cols-3"
        >
          {[
            { icon: Droplets, label: 'MIX RATIO', value: product.dosing.mix },
            { icon: Send, label: 'FREQUENCY', value: product.dosing.frequency },
            { icon: Package, label: 'APPLICATION MODE', value: product.dosing.mode },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center border border-cyan-400/30 text-cyan-400">
                <Icon size={18} strokeWidth={1.5} />
              </span>
              <p className="mb-2 font-mono text-[16px] uppercase tracking-[0.28em] text-white">
                {label}
              </p>
              <p className="font-body text-sm leading-relaxed text-white">{value}</p>
            </div>
          ))}
        </motion.section>

        {/* Inquiry CTA */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6 backdrop-blur-xl md:flex-row md:items-center md:p-8"
        >
          <div>
            <p className="mb-2 font-mono text-[16px] uppercase tracking-[0.28em] text-cyan-400">
              INQUIRY & ORDER
            </p>
            <h2 className="font-display text-xl font-light tracking-tight md:text-2xl">
              Partner on a {product.name} deployment
            </h2>
            <p className="mt-2 max-w-xl font-body text-sm font-light text-white">
              Request a custom batch, field trial allocation, or formulation consult with Biovik Labs.
            </p>
          </div>
          <Link
            to={orderTo}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-500/10 px-6 py-3.5 text-xs uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-400 hover:text-black"
          >
            Order / Request Custom Batch
          </Link>
        </motion.section>

        {/* Other products */}
        <div>
          <p className="mb-5 font-display text-xs tracking-[0.28em] text-white">
            OTHER FORMULATIONS
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md transition-all hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(0,242,254,0.1)]"
              >
                <p className="mb-1 font-mono text-[16px] tracking-widest text-cyan-400">
                  {p.category}
                </p>
                <p className="font-display text-lg font-bold tracking-[0.08em] text-white">
                  {p.name}
                </p>
                <p className="mt-3 font-display text-[16px] tracking-[0.22em] text-white transition-colors group-hover:text-cyan-400">
                  KNOW MORE â†’
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
