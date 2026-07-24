import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'PROCESS', to: '/process' },
  { label: 'PRODUCTS', to: '/products' },
  { label: 'R&D', to: '/rnd' },
  { label: 'CONTACT', to: '/contact' },
]

const linkClass = ({ isActive }) =>
  `font-display text-sm font-semibold tracking-[0.22em] transition-colors ${
    isActive ? 'text-cyan-400' : 'text-white/90 hover:text-cyan-400'
  }`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-black/60 backdrop-blur-md'
            : 'border-transparent bg-black/40 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10 lg:px-14">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center transition-opacity hover:opacity-90"
            aria-label="Biovik home"
          >
            <img
              src="/assets/brand/biovik-logo.png"
              alt="Biovik"
              className="h-8 w-auto object-contain md:h-10"
            />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-cyan-400 lg:hidden"
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0c]/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8 pt-16">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block border-b border-white/10 py-5 font-display text-2xl font-bold tracking-[0.2em] transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
