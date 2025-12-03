'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface GridMotionProps {
  items?: (string | React.ReactNode)[]
  gradientColor?: string
  className?: string
}

export default function GridMotion({
  items = [],
  gradientColor = 'black',
  className = ''
}: GridMotionProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)

  const totalItems = 28
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`)
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX
    }

    const updateMotion = () => {
      const maxMoveAmount = 300
      const baseDuration = 0.8
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2]

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1
          const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction

          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + (inertiaFactors[index % inertiaFactors.length] ?? 0.3),
            ease: 'power3.out',
            overwrite: 'auto'
          })
        }
      })
    }

    const removeAnimationLoop = gsap.ticker.add(updateMotion)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(updateMotion)
    }
  }, [])

  return (
    <div className={`h-full w-full overflow-hidden ${className}`} ref={gridRef}>
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
      >
        {/* Diagonal Grid Container - rotated -15deg */}
        <div
          className="relative z-[2] grid gap-4"
          style={{
            width: '150vw',
            height: '150vh',
            gridTemplateRows: 'repeat(4, 1fr)',
            gridTemplateColumns: '100%',
            transform: 'rotate(-15deg)',
            transformOrigin: 'center center'
          }}
        >
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(7, 1fr)',
                willChange: 'transform'
              }}
              ref={el => { rowRefs.current[rowIndex] = el }}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex]
                return (
                  <div key={itemIndex} className="relative aspect-[4/3]">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-[#111] text-white text-xl">
                      {typeof content === 'string' && (content.startsWith('http') || content.startsWith('/')) ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${content})` }}
                        />
                      ) : (
                        <div className="relative z-[1] p-4 text-center">{content}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Fullview overlay */}
        <div className="pointer-events-none absolute inset-0" />
      </section>
    </div>
  )
}
