import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setSliderPos(pct)
  }, [])

  const onMouseDown = (e) => {
    isDragging.current = true
    updateSlider(e.clientX)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e) => { if (isDragging.current) updateSlider(e.clientX) }
  const onMouseUp = () => {
    isDragging.current = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  const onTouchStart = (e) => {
    isDragging.current = true
    updateSlider(e.touches[0].clientX)
  }
  const onTouchMove = (e) => { if (isDragging.current) updateSlider(e.touches[0].clientX) }
  const onTouchEnd = () => { isDragging.current = false }

  return (
    <section className="py-28 px-6" style={{ background: '#0A1628' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: 'rgba(255,179,71,0.1)',
              border: '1px solid rgba(255,179,71,0.3)',
              color: '#FFB347',
            }}
          >
            The Difference
          </span>
          <h2
            className="font-display text-5xl font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F0F8FF', lineHeight: 1.1 }}
          >
            See the{' '}
            <span style={{ color: '#00D4FF', fontStyle: 'italic' }}>Transformation</span>
          </h2>
          <p style={{ color: 'rgba(240,248,255,0.55)', fontSize: '1rem' }}>
            Drag the slider to reveal the before & after
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          className="relative overflow-hidden rounded-3xl cursor-col-resize select-none"
          style={{
            height: '460px',
            border: '1px solid rgba(0,212,255,0.2)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* AFTER (clean, right side, full width) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200)`,
              filter: 'brightness(0.85) saturate(1.3)',
            }}
          />
          <div
            className="absolute bottom-4 right-4 px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(0,212,255,0.15)',
              border: '1px solid rgba(0,212,255,0.4)',
              color: '#00D4FF',
              backdropFilter: 'blur(8px)',
            }}
          >
            After
          </div>

          {/* BEFORE (dirty, clipped to left side) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200)`,
              filter: 'blur(3px) brightness(0.45) saturate(0.3) sepia(0.4)',
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          />
          <div
            className="absolute bottom-4 left-4 px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(255,179,71,0.15)',
              border: '1px solid rgba(255,179,71,0.4)',
              color: '#FFB347',
              backdropFilter: 'blur(8px)',
              opacity: sliderPos > 15 ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            Before
          </div>

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 flex items-center justify-center"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)', zIndex: 10 }}
          >
            <div
              style={{
                width: '3px',
                height: '100%',
                background: 'linear-gradient(180deg, rgba(0,212,255,0) 0%, #00D4FF 20%, #00D4FF 80%, rgba(0,212,255,0) 100%)',
                boxShadow: '0 0 20px rgba(0,212,255,0.6)',
              }}
            />
            {/* Drag handle */}
            <div
              className="absolute flex items-center justify-center rounded-full"
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #00D4FF, #0099CC)',
                boxShadow: '0 4px 20px rgba(0,212,255,0.5)',
                cursor: 'col-resize',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 5L3 12L8 19M16 5L21 12L16 19" stroke="#0A1628" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
