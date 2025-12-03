'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket, Mail, Bell, Sparkles } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'

export function CTA100vh() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-foreground py-20">
      {/* Background effects */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-background)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-background)_1px,transparent_1px)] bg-[size:100px_100px] opacity-5" />

        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-5 py-2 text-sm font-semibold text-background/80 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span>Limited Early Access</span>
        </div>

        {/* Headline */}
        <h2 className="mb-8 text-4xl font-bold tracking-tight text-background md:text-5xl lg:text-6xl xl:text-7xl">
          Ready to Level Up Your{' '}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            GameFi Portfolio?
          </span>
        </h2>

        {/* Subtext */}
        <p className="mx-auto mb-12 max-w-2xl text-xl text-background/60">
          Join 200,000+ investors already using PC GameFi to access the best
          gaming projects before they launch.
        </p>

        {/* Email signup */}
        <div className="mx-auto mb-10 max-w-md">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 w-full rounded-xl border border-background/20 bg-background/10 pl-12 pr-4 text-background placeholder:text-background/40 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button size="lg" className="h-14 px-8">
              <Bell className="mr-2 h-5 w-5" />
              Subscribe
            </Button>
          </div>
          <p className="mt-3 text-sm text-background/40">
            Get notified about new IGOs, platform updates, and exclusive opportunities.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="h-16 min-w-[220px] text-lg">
            <Link href="/projects">
              <Rocket className="mr-2 h-5 w-5" />
              Launch App
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-16 min-w-[220px] border-background/20 bg-transparent text-lg text-background hover:bg-background/10 hover:text-background"
          >
            <Link href="#how-it-works">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-primary">$15.35M</div>
            <div className="mt-2 text-background/60">Total Raised</div>
          </div>
          <div className="rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-secondary">42.51x</div>
            <div className="mt-2 text-background/60">Avg ATH ROI</div>
          </div>
          <div className="rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-accent">50+</div>
            <div className="mt-2 text-background/60">Projects Launched</div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="text-sm text-background/50">Join the community:</span>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-5 py-2.5 text-sm font-medium text-background transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
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

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  )
}
