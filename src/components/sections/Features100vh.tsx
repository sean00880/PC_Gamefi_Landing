'use client'

import type { ReactNode } from 'react'
import { Cpu, Shield, Zap, Target, BarChart3, Users, Globe, Lock } from 'lucide-react'

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-28 duration-200 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:20px_20px]"
    />
    <div className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-xl border border-border bg-background shadow-lg">
      {children}
    </div>
  </div>
)

const features = [
  {
    icon: Target,
    title: 'Guaranteed Allocations',
    description: 'Stake $PCGF tokens to secure your spot in the most anticipated GameFi launches. No more FOMO.',
    color: 'text-primary'
  },
  {
    icon: Shield,
    title: 'Vetted Projects',
    description: 'Every project undergoes rigorous due diligence including smart contract audits and team verification.',
    color: 'text-secondary'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track ROI, monitor portfolio performance, and get AI-powered insights on market trends.',
    color: 'text-accent'
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'Tokens are distributed automatically post-TGE. No manual claims, no delays, no hassle.',
    color: 'text-primary'
  },
  {
    icon: Globe,
    title: 'Multi-Chain Support',
    description: 'Access IGOs across Ethereum, BSC, Polygon, Arbitrum, and Solana from a single dashboard.',
    color: 'text-secondary'
  },
  {
    icon: Users,
    title: 'Community Governance',
    description: 'Vote on which projects get listed. Your voice shapes the future of PC GameFi.',
    color: 'text-accent'
  },
  {
    icon: Lock,
    title: 'Secure Escrow',
    description: 'All funds are held in audited smart contracts until project milestones are met.',
    color: 'text-primary'
  },
  {
    icon: Cpu,
    title: 'AI-Powered Research',
    description: 'Our AI Scout analyzes tokenomics, team history, and social sentiment to rate every project.',
    color: 'text-secondary'
  }
]

export function Features100vh() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-muted/30 py-20 dark:bg-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
            Platform Features
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Win in GameFi
            </span>
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl">
            PC GameFi combines cutting-edge technology with community-driven governance
            to deliver the most comprehensive IGO experience.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-1 overflow-hidden rounded-3xl border border-border bg-card sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group relative p-8 transition-colors hover:bg-muted/50 ${
                  index < 4 ? 'border-b border-border' : ''
                } ${index % 4 !== 3 ? 'lg:border-r lg:border-border' : ''} ${
                  index % 2 === 0 ? 'sm:border-r sm:border-border' : ''
                }`}
              >
                <CardDecorator>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </CardDecorator>
                <div className="mt-6 text-center">
                  <h3 className="mb-3 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="text-4xl font-bold text-primary">50+</div>
            <div className="mt-2 text-muted-foreground">Projects Launched</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="text-4xl font-bold text-secondary">8</div>
            <div className="mt-2 text-muted-foreground">Supported Chains</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="text-4xl font-bold text-accent">$15M+</div>
            <div className="mt-2 text-muted-foreground">Total Volume</div>
          </div>
        </div>
      </div>
    </section>
  )
}
