'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket, Sparkles, TrendingUp } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-24 md:pb-24 md:pt-32">
      {/* Background decoration */}
      <div
        aria-hidden
        className="absolute inset-0 isolate opacity-40 dark:opacity-20"
      >
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Rocket className="h-4 w-4" />
            <span>Next-Gen GameFi Launchpad</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Discover the Future of{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Web3 Gaming
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Access high-quality IGOs through our quantum-tier allocation system.
            Fair, transparent, and built for the future of blockchain gaming.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="min-w-[180px]">
              <Link href="/projects">
                Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[160px]">
              <Link href="#tokenomics">
                View Tokenomics
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Join our community:</span>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {link.platform === 'Twitter' ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Early Access</h3>
            <p className="text-sm text-muted-foreground">Get exclusive access to the most promising GameFi projects before public launch.</p>
          </div>

          <div className="group rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-secondary hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">Leverage our AI Scout to analyze projects, tokenomics, and community sentiment.</p>
          </div>

          <div className="group rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">High ROI</h3>
            <p className="text-sm text-muted-foreground">Track record of successful launches with average ROI exceeding 40x.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
