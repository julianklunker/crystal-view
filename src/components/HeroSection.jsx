import { motion } from 'framer-motion'
import { useScrollWipe } from '../hooks/useScrollWipe'
import WaterDroplets from './WaterDroplets'
import SqueegeeWipe from './SqueegeeWipe'
import { useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

export default function HeroSection() {
  const { containerRef, scrollYProgress, squeegeeY, blurClipBottom, frostOpacity, heroOpacity, heroY } = useScrollWipe()
  const [wipeProgress, setWipeProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => setWipeProgress(v))

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '280vh' }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          style={{ opacity: frostOpacity }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-xs tracking-widest uppercase text-white/50 font-medium">Scroll to reveal</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </motion.div>

        {/* The wipe engine */}
        <SqueegeeWipe
          scrollYProgress={scrollYProgress}
          squeegeeY={squeegeeY}
          blurClipBottom={blurClipBottom}
        />

        {/* Water droplets canvas — sits over blurred area */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 4 }}
        >
          <WaterDroplets wipeProgress={wipeProgress} />
        </div>

        {/* Hero content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6"
          >
            <span
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: 'rgba(0,212,255,0.12)',
                border: '1px solid rgba(0,212,255,0.35)',
                color: '#00D4FF',
                backdropFilter: 'blur(8px)',
              }}
            >
              Premium Window Cleaning
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="font-display mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#F0F8FF',
              textShadow: '0 4px 40px rgba(0,0,0,0.6)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            Clarity{' '}
            <span className="shimmer-text italic">Redefined.</span>
          </motion.h1>

          {/* Sub headline */}
          <motion.p
            className="max-w-xl mb-10"
            style={{
              color: 'rgba(240,248,255,0.72)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            We don't just clean windows — we transform how you see the world.
            Precision squeegee work for luxury homes & commercial spaces.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a
              href="#contact"
              className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #0099CC)',
                color: '#0A1628',
                boxShadow: '0 4px 20px rgba(0,212,255,0.35)',
              }}
            >
              Get a Free Quote
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#F0F8FF',
                backdropFilter: 'blur(12px)',
              }}
            >
              Our Services
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { num: '500+', label: 'Projects Done' },
              { num: '4.9★', label: 'Avg Rating' },
              { num: '10yr', label: 'Experience' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div style={{ color: '#00D4FF', fontSize: '1.3rem', fontWeight: 700 }}>{num}</div>
                <div style={{ color: 'rgba(240,248,255,0.5)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
