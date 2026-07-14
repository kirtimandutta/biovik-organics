import { useEffect, useRef } from 'react'

/**
 * @param {'visible' | 'section-center'} [playAt]
 *   visible — play once ~35% of the video is on screen (default)
 *   section-center — play only after the parent section's center hits the viewport center
 */
export default function ScrollVideo({ src, className = '', playAt = 'visible' }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    if (playAt === 'section-center') {
      const section = video.closest('section') || video

      const sync = () => {
        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const viewportCenter = window.innerHeight / 2
        // Start slightly early — ~18% of viewport height before true center
        const leadIn = window.innerHeight * 0.18
        const hasReachedCenter = sectionCenter <= viewportCenter + leadIn
        const stillInView = rect.bottom > 0 && rect.top < window.innerHeight

        if (hasReachedCenter && stillInView) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }

      sync()
      window.addEventListener('scroll', sync, { passive: true })
      window.addEventListener('resize', sync)
      return () => {
        window.removeEventListener('scroll', sync)
        window.removeEventListener('resize', sync)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [playAt])

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}
