import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

const INQUIRY_TYPES = [
  'Partnership',
  'Product Inquiry',
  'R&D Collaboration',
  'Press / Media',
  'Other',
]

const inputClass =
  'w-full border border-white/10 bg-white/[0.04] px-4 py-3.5 font-body text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_24px_rgba(0,242,254,0.08)]'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiry: INQUIRY_TYPES[0],
    message: '',
  })

  useEffect(() => {
    const product = searchParams.get('product')
    const inquiry = searchParams.get('inquiry')
    const nextInquiry =
      inquiry && INQUIRY_TYPES.includes(inquiry) ? inquiry : product ? 'Product Inquiry' : null

    setForm((prev) => ({
      ...prev,
      ...(nextInquiry ? { inquiry: nextInquiry } : {}),
      ...(product
        ? {
            message: `Soil report submission for ${product}.\n\nCrop type:\nGrowing cycle:\nAdditional notes:\n`,
          }
        : {}),
    }))
  }, [searchParams])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-[#1a0a2e]">
      <div className="cellular-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,#2e1065_0%,#5b21b6_42%,#7c3aed_72%,#4c1d95_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(192,132,252,0.35),_transparent_55%)]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:px-14">
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.35em] text-emerald-400">
            CONTACT
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.2em] text-white sm:text-5xl md:text-6xl">
            Partner With Biovik
          </h1>
          <p className="mt-6 font-body text-base font-light leading-relaxed text-zinc-400 md:text-lg">
            Tell us about your crop systems, research goals, or distribution networks. Our team
            responds with a calibrated next step.
          </p>
          <div className="mt-10 space-y-3 border-t border-white/10 pt-8">
            <p className="font-display text-[10px] tracking-[0.28em] text-zinc-500">DIRECT</p>
            <a
              href="mailto:harshchandak97@gmail.com"
              className="block font-display text-sm tracking-[0.12em] text-cyan-400 transition-colors hover:text-white"
            >
              harshchandak97@gmail.com
            </a>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-9"
        >
          {submitted ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <p className="mb-3 font-display text-xs tracking-[0.3em] text-emerald-400">
                TRANSMISSION RECEIVED
              </p>
              <p className="max-w-sm font-body text-sm font-light text-zinc-400">
                Thank you. A Biovik specialist will follow up shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 font-display text-xs tracking-[0.28em] text-cyan-400 transition-colors hover:text-white"
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-display text-[10px] tracking-[0.28em] text-zinc-500"
                >
                  NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={onChange}
                  placeholder="Full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-display text-[10px] tracking-[0.28em] text-zinc-500"
                >
                  WORK EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry"
                  className="mb-2 block font-display text-[10px] tracking-[0.28em] text-zinc-500"
                >
                  INQUIRY TYPE
                </label>
                <select
                  id="inquiry"
                  name="inquiry"
                  value={form.inquiry}
                  onChange={onChange}
                  className={`${inputClass} appearance-none`}
                >
                  {INQUIRY_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-[#0a0a0c] text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-display text-[10px] tracking-[0.28em] text-zinc-500"
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Describe your inquiry…"
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 border border-cyan-400/60 bg-cyan-400/10 px-6 py-4 font-display text-sm font-semibold tracking-[0.28em] text-cyan-400 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_32px_rgba(0,242,254,0.35)]"
              >
                INITIATE CONTACT
                <Send
                  size={16}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
