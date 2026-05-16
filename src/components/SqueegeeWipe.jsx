import { motion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import squeegeeImg from '../assets/squeegee.png'
import heroBg from '../assets/hero-bg.jpg'

export default function SqueegeeWipe({ scrollYProgress, squeegeeY, blurClipBottom }) {
  const [squeakActive, setSqueakActive] = useState(false)
  const prevProgress = useRef(0)
  const hasFinished = useRef(false)

  // Clip path for the blurred layer: shrinks from bottom as scroll increases
  // inset(0 0 X% 0) — clip from bottom
  const clipPath = useTransform(blurClipBottom, (val) => {
    const pct = parseFloat(val)
    return `inset(0 0 ${pct}% 0)`
  })

  // Slight tilt on the squeegee
  const squeegeeRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, -1, -2])

  // Motion blur intensity increases mid-wipe
  const motionBlur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 3, 3, 0])
  const squeegeeFilter = useTransform(motionBlur, (v) => v > 0.3 ? `blur(${v}px)` : 'none')

  // Shine streak opacity
  const shineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v >= 0.98 && !hasFinished.current) {
        hasFinished.current = true
        setSqueakActive(true)
        setTimeout(() => setSqueakActive(false), 800)
      }
      if (v < 0.9) hasFinished.current = false
      prevProgress.current = v
    })
    return unsub
  }, [scrollYProgress])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* LAYER 1 — Sharp (bottom, always visible) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: 'brightness(0.75) saturate(1.3)',
          zIndex: 1,
        }}
      />

      {/* Clean water streak below squeegee */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 3,
          y: squeegeeY,
          opacity: shineOpacity,
        }}
      >
        <div
          style={{
            height: '6px',
            background: 'linear-gradient(180deg, rgba(0,212,255,0.35) 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(0,212,255,0.4)',
          }}
        />
      </motion.div>

      {/* Squeak pulse flash at bottom */}
      {squeakActive && (
        <div
          className="squeak-pulse absolute inset-x-0 bottom-0"
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #00D4FF, #FFB347, #00D4FF, transparent)',
            zIndex: 10,
          }}
        />
      )}

      {/* LAYER 2 — Blurred (top, clips away as squeegee wipes) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: 'blur(22px) brightness(0.55) saturate(0.7)',
          clipPath,
          zIndex: 2,
          transform: 'scale(1.05)',
        }}
      />

      {/* Frosted tint over the blurred area */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10,22,40,0.45) 0%, rgba(0,60,100,0.25) 100%)',
          clipPath,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* SQUEEGEE graphic */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '-64px',
          zIndex: 5,
          y: squeegeeY,
          rotate: squeegeeRotate,
          transformOrigin: 'center center',
        }}
      >
        <motion.div
          style={{
            filter: squeegeeFilter,
          }}
        >
          <img
            src={squeegeeImg}
            alt="squeegee"
            style={{
              width: '100%',
              height: '72px',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
