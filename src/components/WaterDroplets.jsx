import { useEffect, useRef } from 'react'

function createDroplet(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 8 + Math.random() * 32,
    driftSpeed: 0.15 + Math.random() * 0.4,
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.008 + Math.random() * 0.012,
    wobbleAmp: 0.6 + Math.random() * 1.2,
    opacity: 0.55 + Math.random() * 0.35,
  }
}

function drawDroplet(ctx, d) {
  const { x, y, r, opacity } = d

  ctx.save()
  ctx.globalAlpha = opacity

  // Outer dark rim
  const outerGrad = ctx.createRadialGradient(x, y, r * 0.6, x, y, r)
  outerGrad.addColorStop(0, 'rgba(0,0,0,0)')
  outerGrad.addColorStop(0.75, 'rgba(10,22,40,0.25)')
  outerGrad.addColorStop(1, 'rgba(10,22,40,0.55)')
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = outerGrad
  ctx.fill()

  // Inner refraction — near-transparent
  const innerGrad = ctx.createRadialGradient(
    x - r * 0.25, y - r * 0.25, r * 0.05,
    x, y, r * 0.9
  )
  innerGrad.addColorStop(0, 'rgba(255,255,255,0.18)')
  innerGrad.addColorStop(0.4, 'rgba(200,235,255,0.06)')
  innerGrad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.beginPath()
  ctx.arc(x, y, r * 0.88, 0, Math.PI * 2)
  ctx.fillStyle = innerGrad
  ctx.fill()

  // Bright specular highlight (top-left)
  const specGrad = ctx.createRadialGradient(
    x - r * 0.3, y - r * 0.35, 0,
    x - r * 0.3, y - r * 0.35, r * 0.4
  )
  specGrad.addColorStop(0, 'rgba(255,255,255,0.85)')
  specGrad.addColorStop(0.4, 'rgba(220,245,255,0.3)')
  specGrad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.beginPath()
  ctx.arc(x - r * 0.3, y - r * 0.35, r * 0.4, 0, Math.PI * 2)
  ctx.fillStyle = specGrad
  ctx.fill()

  // Small bottom-right reflection
  const spec2 = ctx.createRadialGradient(
    x + r * 0.28, y + r * 0.28, 0,
    x + r * 0.28, y + r * 0.28, r * 0.18
  )
  spec2.addColorStop(0, 'rgba(0,212,255,0.4)')
  spec2.addColorStop(1, 'rgba(0,212,255,0)')
  ctx.beginPath()
  ctx.arc(x + r * 0.28, y + r * 0.28, r * 0.18, 0, Math.PI * 2)
  ctx.fillStyle = spec2
  ctx.fill()

  ctx.restore()
}

export default function WaterDroplets({ wipeProgress = 0 }) {
  const canvasRef = useRef(null)
  const dropletsRef = useRef([])
  const rafRef = useRef(null)
  const wipeRef = useRef(0)

  useEffect(() => {
    wipeRef.current = wipeProgress
  }, [wipeProgress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      dropletsRef.current = Array.from({ length: 60 }, () => createDroplet(canvas))
    }

    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const wipe = wipeRef.current
      const wipeLineY = wipe * canvas.height

      dropletsRef.current.forEach((d) => {
        d.wobblePhase += d.wobbleSpeed
        const wobble = Math.sin(d.wobblePhase) * d.wobbleAmp

        // Droplets above squeegee drift normally; approaching ones distort downward
        const distFromWipe = wipeLineY - (d.y + d.r)
        if (distFromWipe > 0 && distFromWipe < 80) {
          // Getting pushed by squeegee — accelerate drift
          d.y += d.driftSpeed * (1 + (80 - distFromWipe) / 20)
        } else {
          d.y += d.driftSpeed
        }
        d.x += wobble * 0.05

        // Only draw droplets ABOVE the wipe line
        if (d.y - d.r < wipeLineY) {
          drawDroplet(ctx, d)
        }

        // Wrap around
        if (d.y - d.r > canvas.height || d.y + d.r < 0) {
          const newD = createDroplet(canvas)
          newD.y = -newD.r
          Object.assign(d, newD)
        }
        if (d.x - d.r > canvas.width) d.x = -d.r
        if (d.x + d.r < 0) d.x = canvas.width + d.r
      })
    }

    animate()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  )
}
