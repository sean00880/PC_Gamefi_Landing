'use client'

import { TrendingUp, Users, DollarSign, Trophy, Target, Rocket } from 'lucide-react'
import { useStakingStats } from '@/hooks'
import { formatEther } from 'viem'

// Utility to format large numbers
function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K`
  }
  return value.toString()
}

export function Stats100vh() {
  // Get real staking stats from contract (when deployed)
  const { totalStaked, stakerCount } = useStakingStats()

  // Format staked amount
  const totalStakedNumber = Number(formatEther(totalStaked))
  const totalStakedFormatted = totalStakedNumber > 0
    ? `$${formatNumber(totalStakedNumber * 0.001)}` // Assuming ~$0.001 per PCGF
    : '$15.35M' // Fallback

  // Stats with dynamic values where available
  const stats = [
    {
      icon: TrendingUp,
      value: '42.51x',
      label: 'Average ATH ROI',
      description: 'Historical returns on completed IGOs',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: DollarSign,
      value: totalStakedFormatted,
      label: 'Total Raised',
      description: 'Capital raised for GameFi projects',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: Users,
      value: stakerCount > 0 ? formatNumber(stakerCount) + '+' : '200K+',
      label: 'Active Users',
      description: 'Growing community of gamers',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: Trophy,
      value: '50+',
      label: 'Successful Launches',
      description: 'Projects taken to market',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Target,
      value: '98%',
      label: 'Fill Rate',
      description: 'IGO participation rate',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: Rocket,
      value: '8',
      label: 'Blockchains',
      description: 'Multi-chain ecosystem',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ]

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-foreground py-20">
      {/* Background pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-5"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-background)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-background)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Gradient accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-1/2 w-1/3 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 h-1/2 w-1/3 bg-gradient-to-tl from-secondary/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block rounded-full border border-background/20 bg-background/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-background/80">
            By the Numbers
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-background md:text-5xl lg:text-6xl">
            Proven Track Record
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-background/60">
            Real results from real launches. Our numbers speak louder than words.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-background/10 bg-background/5 p-8 backdrop-blur-sm transition-all hover:border-background/20 hover:bg-background/10"
              >
                {/* Icon */}
                <div className={`mb-6 inline-flex rounded-2xl ${stat.bgColor} p-4`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>

                {/* Value */}
                <div className="mb-2 text-5xl font-bold text-background md:text-6xl">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="mb-2 text-xl font-semibold text-background/90">
                  {stat.label}
                </div>

                {/* Description */}
                <p className="text-sm text-background/50">
                  {stat.description}
                </p>

                {/* Decorative gradient */}
                <div
                  aria-hidden
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${stat.bgColor} opacity-0 blur-3xl transition-opacity group-hover:opacity-50`}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-background/60">
            Join thousands of investors who trust PC GameFi for their GameFi allocations
          </p>
        </div>
      </div>
    </section>
  )
}
