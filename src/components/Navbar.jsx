import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { productList } from '../data/productsData'

const NAV_LINKS = [
  { label: 'PROCESS', to: '/process' },
  { label: 'PRODUCTS', to: '/products', dropdown: true },
  { label: 'R&D', to: '/rnd' },
  { label: 'CONTACT', to: '/contact' },
]

const linkClass = ({ isActive }) =>
  `font-display text-sm font-semibold tracking-[0.22em] transition-colors ${
    isActive ? 'text-cyan-400' : 'text-white/90 hover:text-cyan-400'
  }`

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const productsActive = location.pathname.startsWith('/products')

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

  useEffect(() => {
    setProductsOpen(false)
    setMobileProductsOpen(false)
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onPointerDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

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
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <li
                  key={link.to}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 font-display text-sm font-semibold tracking-[0.22em] transition-colors ${
                      productsActive ? 'text-cyan-400' : 'text-white/90'
                    }`}
                  >
                    <Link to="/products" className="hover:text-cyan-400">
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-label="Open products menu"
                      aria-expanded={productsOpen}
                      aria-haspopup="true"
                      onClick={() => setProductsOpen((v) => !v)}
                      className="rounded p-0.5 hover:text-cyan-400"
                    >
                      <ChevronDown
                        size={14}
                        strokeWidth={2}
                        className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-black/90 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                      >
                        <Link
                          to="/products"
                          className={`mb-1 block rounded-lg px-3 py-2.5 font-display text-xs tracking-[0.2em] transition-colors ${
                            location.pathname === '/products'
                              ? 'bg-cyan-400/10 text-cyan-400'
                              : 'text-zinc-300 hover:bg-white/5 hover:text-cyan-400'
                          }`}
                        >
                          ALL FORMULATIONS
                        </Link>
                        <div className="my-1 h-px bg-white/10" />
                        {productList.map((product) => {
                          const to = `/products/${product.id}`
                          const active = location.pathname === to
                          return (
                            <Link
                              key={product.id}
                              to={to}
                              className={`block rounded-lg px-3 py-2.5 transition-colors ${
                                active
                                  ? 'bg-cyan-400/10 text-cyan-400'
                                  : 'text-zinc-300 hover:bg-white/5 hover:text-cyan-400'
                              }`}
                            >
                              <span className="block font-display text-xs tracking-[0.16em]">
                                {product.name}
                              </span>
                              <span className="mt-0.5 block font-mono text-[9px] tracking-widest text-zinc-500">
                                {product.category}
                              </span>
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink to={link.to} className={linkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ),
            )}
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
            className="fixed inset-0 z-40 overflow-y-auto bg-[#0a0a0c]/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex min-h-full flex-col justify-center gap-2 px-8 py-24">
              {NAV_LINKS.map((link, i) =>
                link.dropdown ? (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                    className="border-b border-white/10"
                  >
                    <div className="flex items-center justify-between py-5">
                      <Link
                        to="/products"
                        onClick={() => setOpen(false)}
                        className={`font-display text-2xl font-bold tracking-[0.2em] transition-colors ${
                          productsActive ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                        }`}
                      >
                        PRODUCTS
                      </Link>
                      <button
                        type="button"
                        aria-label="Toggle products list"
                        onClick={() => setMobileProductsOpen((v) => !v)}
                        className="text-white/70 hover:text-cyan-400"
                      >
                        <ChevronDown
                          size={22}
                          className={`transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pb-4"
                        >
                          {productList.map((product) => (
                            <Link
                              key={product.id}
                              to={`/products/${product.id}`}
                              onClick={() => setOpen(false)}
                              className="block py-3 pl-2 font-display text-lg tracking-[0.16em] text-zinc-300 transition-colors hover:text-cyan-400"
                            >
                              {product.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
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
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
