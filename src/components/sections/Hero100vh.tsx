'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket, Gamepad2, Zap, Shield } from 'lucide-react'
import { SOCIAL_LINKS, STATS } from '@/lib/constants'
import GridMotion from '@/components/grid-motion'
import InteractiveRevealOverlay from '@/components/interactive-reveal-overlay'

// Game cover images for the grid
const gameCovers = [
  '/game-covers/game1.jpg',
  '/game-covers/game2.jpg',
  '/game-covers/game3.jpg',
  '/game-covers/game4.jpg',
  '/game-covers/game5.jpg',
  '/game-covers/game6.jpg',
  '/game-covers/game7.jpg',
  '/game-covers/game9.jpg',
  '/game-covers/game11.jpg',
  '/game-covers/game12.jpg',
  '/game-covers/game14.jpg',
  '/game-covers/game15.jpg',
  '/game-covers/game16.jpg',
  '/game-covers/game17.jpg',
  '/game-covers/game18.jpg',
  '/game-covers/game1.jpg',
  '/game-covers/game2.jpg',
  '/game-covers/game3.jpg',
  '/game-covers/game4.jpg',
  '/game-covers/game5.jpg',
  '/game-covers/game6.jpg',
  '/game-covers/game7.jpg',
  '/game-covers/game9.jpg',
  '/game-covers/game11.jpg',
]

export function Hero100vh() {
  return (
    <InteractiveRevealOverlay
      revealRadius={180}
      enableSmokyReveal={true}
    >
      {/* GridMotion Carousel - positioned as background via InteractiveRevealOverlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <GridMotion
          items={gameCovers}
          gradientColor="hsl(var(--background))"
          className="opacity-60"
        />
      </div>

      {/* Main content - centered (z-50 to be above all overlay layers) */}
      <div 
        className="relative z-[50] flex flex-1 flex-col items-center justify-center px-6 py-20 bg-[radial-gradient(circle_at_center,white,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,black,transparent_100%)]"
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary backdrop-blur-sm">
            <Rocket className="h-4 w-4 animate-pulse" />
            <span>The Premier GameFi Launchpad</span>
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">v2.0</span>
          </div>

          {/* Headline with 3D text shadows */}
          <h1
            className="mb-8 text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl"
            style={{
              textShadow: `
                2px 2px 4px rgba(0, 0, 0, 0.3),
                4px 4px 8px rgba(0, 0, 0, 0.2),
                6px 6px 12px rgba(0, 0, 0, 0.1),
                0 0 20px rgba(var(--primary-rgb, 127, 242, 82), 0.2)
              `
            }}
          >
            Launch Into the{' '}
            <span className="relative inline-block">
              <span
                className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                style={{
                  textShadow: `
                    2px 2px 8px rgba(127, 242, 82, 0.4),
                    4px 4px 12px rgba(34, 211, 238, 0.3),
                    0 0 30px rgba(127, 242, 82, 0.5)
                  `
                }}
              >
                Future
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full text-primary/50"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C47.6667 2.16667 141.4 -2.5 199 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {' '}of Gaming
          </h1>

          {/* Subheadline with subtle shadow */}
          <p
            className="mx-auto mb-12 max-w-3xl text-xl text-muted-foreground md:text-2xl"
            style={{
              textShadow: `
                1px 1px 2px rgba(0, 0, 0, 0.3),
                2px 2px 4px rgba(0, 0, 0, 0.2)
              `
            }}
          >
            Access exclusive IGOs, stake for allocations, and join the next generation
            of blockchain gaming through our quantum-tier system.
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-14 min-w-[200px] text-lg">
              <Link href="/projects">
                <Gamepad2 className="mr-2 h-5 w-5" />
                Explore IGOs
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 min-w-[200px] text-lg">
              <Link href="#how-it-works">
                How It Works
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Stats row */}
          <div className="mb-12 inline-flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-border/50 bg-card/50 px-8 py-6 backdrop-blur-sm md:gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{STATS.athRoi}</div>
              <div className="text-sm text-muted-foreground">Avg ATH ROI</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground md:text-4xl">{STATS.totalRaised}</div>
              <div className="text-sm text-muted-foreground">Total Raised</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground md:text-4xl">{STATS.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Audited Smart Contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-secondary" />
              <span className="text-sm">Multi-Chain Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-accent" />
              <span className="text-sm">50+ Successful Launches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom social bar (z-50 to be above overlay layers) */}
      <div className="relative z-[50] border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-sm text-muted-foreground">Join our growing community</span>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
              >
                {link.platform === 'Twitter' ? (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                )}
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce z-[60]">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </InteractiveRevealOverlay>
  )
}
