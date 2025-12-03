'use client'

import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react'

// ========================================
//     INTERACTIVE REVEAL OVERLAY
//     Dual-layer smoke + mask reveal system
//     Based on MEMELinked pattern
// ========================================

interface InteractiveRevealOverlayProps {
  children: React.ReactNode
  revealRadius?: number
  enableSmokyReveal?: boolean
  className?: string
}

export default function InteractiveRevealOverlay({
  children,
  revealRadius = 180,
  enableSmokyReveal = true,
  className = ''
}: InteractiveRevealOverlayProps) {
  // ==================== REFS ====================
  const containerRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const smokeRef = useRef<HTMLDivElement>(null)

  // ==================== STATE ====================
  const [isDark, setIsDark] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [smoothMousePos, setSmoothMousePos] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const [intensity, setIntensity] = useState(0.5)
  const [smoothIntensity, setSmoothIntensity] = useState(0.5)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // ==================== THEME DETECTION ====================
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])

  // ==================== DIMENSIONS ====================
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current
        setDimensions({ width: offsetWidth, height: offsetHeight })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ==================== SMOOTH ANIMATION LOOP ====================
  useEffect(() => {
    let animationId: number
    const animate = () => {
      // Lerp towards target values (0.06 = slow smooth for organic feel)
      setSmoothMousePos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.06,
        y: prev.y + (mousePos.y - prev.y) * 0.06
      }))
      setSmoothIntensity(prev => prev + (intensity - prev) * 0.05)
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [mousePos, intensity])

  // ==================== MOUSE TRACKING ====================
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      // Convert to percentage coordinates
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      setMousePos({ x, y })
      setIsHovering(true)

      // Distance from center (0 = center, 1 = edge)
      const distFromCenter = Math.sqrt(
        Math.pow((x - 50) / 50, 2) + Math.pow((y - 50) / 50, 2)
      )
      // Intensity: HIGH at center, LOW at edges
      setIntensity(1 - Math.min(distFromCenter, 1))
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setIntensity(0.5)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // ==================== COMPUTED REVEAL VALUES ====================
  // Convert percentage position to pixel position for masks
  const pixelX = (smoothMousePos.x / 100) * dimensions.width
  const pixelY = (smoothMousePos.y / 100) * dimensions.height

  // Reveal hole size: SMALLER at center, LARGER at edges (clears more at edges)
  const revealHoleSize = revealRadius * (1.5 + (1 - smoothIntensity) * 1.5)

  // Smoke opacity: HIGHER at center (intensify), LOWER at edges (clear)
  const smokeOpacity = 0.15 + smoothIntensity * 0.5

  // Foreground mask opacity: slightly reduced at edges for softer feel
  const maskOpacity = 0.85 + smoothIntensity * 0.15

  // ==================== SMOKE LAYER GRADIENT ====================
  const smokeMaskGradient = useMemo(() => {
    if (!isHovering) return 'none'

    const seamlessRadius = revealHoleSize * 2.5

    if (enableSmokyReveal) {
      // Ultra-gradual, imperceptible fade with many transition points
      return `radial-gradient(
        circle ${seamlessRadius}px at ${pixelX}px ${pixelY}px,
        transparent 20%,
        rgba(0,0,0,0.05) 30%,
        rgba(0,0,0,0.15) 40%,
        rgba(0,0,0,0.3) 50%,
        rgba(0,0,0,0.5) 60%,
        rgba(0,0,0,0.7) 70%,
        rgba(0,0,0,0.85) 80%,
        rgba(0,0,0,0.95) 90%,
        black 100%
      )`
    }

    return `radial-gradient(
      circle ${seamlessRadius}px at ${pixelX}px ${pixelY}px,
      transparent 30%,
      black 100%
    )`
  }, [isHovering, revealHoleSize, pixelX, pixelY, enableSmokyReveal])

  // ==================== FOREGROUND MASK GRADIENT ====================
  const foregroundMaskGradient = useMemo(() => {
    if (!isHovering) return 'none'

    const spotlightRadius = revealHoleSize * 2.2

    if (enableSmokyReveal) {
      // Inverted mask: transparent center (reveals content), opaque edges
      return `radial-gradient(
        circle ${spotlightRadius}px at ${pixelX}px ${pixelY}px,
        transparent 15%,
        rgba(0,0,0,0.08) 25%,
        rgba(0,0,0,0.25) 40%,
        rgba(0,0,0,0.5) 55%,
        rgba(0,0,0,0.75) 70%,
        rgba(0,0,0,0.9) 85%,
        black 100%
      )`
    }

    return `radial-gradient(
      circle ${spotlightRadius}px at ${pixelX}px ${pixelY}px,
      transparent 20%,
      black 100%
    )`
  }, [isHovering, revealHoleSize, pixelX, pixelY, enableSmokyReveal])

  // ==================== RENDER ====================
  return (
    <section
      ref={containerRef}
      className={`relative flex min-h-screen flex-col overflow-hidden bg-background ${className}`}
    >
      {/* Children (carousel/content) sits at base z-index */}
      {children}

      {/* 🌫️ SMOKE MIDDLE LAYER - z-10
          Radial gradient smoke that CLEARS at cursor position
          Both layers clear together to reveal carousel */}
      <div
        ref={smokeRef}
        className="pointer-events-none absolute inset-0 z-[10]"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 80% 70% at 50% 50%,
                rgba(4,8,4,0.95) 0%,
                rgba(4,8,4,0.8) 25%,
                rgba(4,8,4,0.5) 50%,
                rgba(4,8,4,0.2) 75%,
                transparent 100%)`
            : `radial-gradient(ellipse 80% 70% at 50% 50%,
                rgba(220,217,205,0.9) 0%,
                rgba(220,217,205,0.7) 25%,
                rgba(220,217,205,0.4) 50%,
                rgba(220,217,205,0.15) 75%,
                transparent 100%)`,
          opacity: smokeOpacity,
          maskImage: smokeMaskGradient,
          WebkitMaskImage: smokeMaskGradient,
          transition: 'opacity 0.3s ease-out'
        }}
      />

      {/* 🌀 SMOKE INTENSIFY LAYER - z-12
          Additional smoke that appears at CENTER only (intensity > 0.6) */}
      {isHovering && smoothIntensity > 0.5 && (
        <div
          className="pointer-events-none absolute inset-0 z-[12]"
          style={{
            background: isDark
              ? `radial-gradient(circle ${revealRadius * (0.8 + smoothIntensity)}px at ${pixelX}px ${pixelY}px,
                  rgba(2,6,2,${(smoothIntensity - 0.5) * 0.6}) 0%,
                  transparent 100%)`
              : `radial-gradient(circle ${revealRadius * (0.8 + smoothIntensity)}px at ${pixelX}px ${pixelY}px,
                  rgba(200,197,185,${(smoothIntensity - 0.5) * 0.5}) 0%,
                  transparent 100%)`,
          }}
        />
      )}

      {/* 🖤 FOREGROUND MASK LAYER - z-40
          Theme-aware solid overlay with transparent hole at cursor
          This is the "top" layer that reveals carousel + smoke behind */}
      <div
        ref={maskRef}
        className={`pointer-events-none absolute inset-0 z-[40] ${
          enableSmokyReveal ? 'transition-opacity duration-300' : ''
        }`}
        style={{
          backgroundColor: isDark
            ? 'hsl(var(--background))'
            : 'hsl(var(--background))',
          maskImage: foregroundMaskGradient,
          WebkitMaskImage: foregroundMaskGradient,
          opacity: maskOpacity
        }}
      />

      {/* Subtle edge vignette for depth - z-45 */}
      <div
        className="pointer-events-none absolute inset-0 z-[45]"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 50% 50%,
            transparent 0%,
            transparent 60%,
            hsl(var(--background) / 0.15) 85%,
            hsl(var(--background) / 0.3) 100%)`
        }}
      />

      {/* Diagonal shimmer animation - subtle ambient effect - z-8 */}
      <div
        className="pointer-events-none absolute inset-0 z-[8] animate-shimmer-diagonal opacity-10"
        style={{
          background: `linear-gradient(-45deg,
            transparent 0%,
            transparent 40%,
            hsl(var(--background) / 0.03) 45%,
            hsl(var(--background) / 0.06) 50%,
            hsl(var(--background) / 0.03) 55%,
            transparent 60%,
            transparent 100%)`,
          backgroundSize: '400% 400%'
        }}
      />
    </section>
  )
}
