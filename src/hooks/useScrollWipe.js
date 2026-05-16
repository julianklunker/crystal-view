import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function useScrollWipe() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Squeegee moves from -10% to 110% of container height
  const squeegeeY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Clip amount for the blurred top layer: clip bottom grows so blurred area shrinks
  const blurClipBottom = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Opacity for the frosted overlay fades out as wipe completes
  const frostOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Hero content fades/slides up as scroll begins
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -60])

  return { containerRef, scrollYProgress, squeegeeY, blurClipBottom, frostOpacity, heroOpacity, heroY }
}
