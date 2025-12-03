'use client'

import { Wallet, Coins, Target, Rocket, Gift, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Link your Web3 wallet to access the PC GameFi platform. We support MetaMask, WalletConnect, and more.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30'
  },
  {
    number: '02',
    icon: Coins,
    title: 'Stake $PCGF',
    description: 'Stake your $PCGF tokens to unlock allocation tiers. Higher stakes mean larger allocations in IGOs.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/30'
  },
  {
    number: '03',
    icon: Target,
    title: 'Join IGOs',
    description: 'Browse upcoming projects, complete KYC if required, and commit your allocation to participate.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/30'
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Receive Tokens',
    description: 'Tokens are automatically distributed to your wallet at TGE. No manual claims required.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30'
  },
  {
    number: '05',
    icon: Gift,
    title: 'Earn Rewards',
    description: 'Collect platform rewards from staking, governance participation, and successful IGO completions.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/30'
  },
  {
    number: '06',
    icon: TrendingUp,
    title: 'Track ROI',
    description: 'Monitor your portfolio performance with our analytics dashboard and AI-powered insights.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/30'
  }
]

const tiers = [
  { name: 'Bronze', stake: '1,000', allocation: '1x', color: 'bg-amber-700' },
  { name: 'Silver', stake: '5,000', allocation: '2x', color: 'bg-gray-400' },
  { name: 'Gold', stake: '25,000', allocation: '5x', color: 'bg-yellow-500' },
  { name: 'Platinum', stake: '100,000', allocation: '10x', color: 'bg-cyan-400' },
  { name: 'Quantum', stake: '500,000', allocation: '25x', color: 'bg-primary' }
]

export function HowItWorks100vh() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-muted/30 py-20 dark:bg-background" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
            Getting Started
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From connecting your wallet to claiming your tokens, here&apos;s everything you need to know.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={`group relative overflow-hidden rounded-3xl border ${step.borderColor} bg-card p-8 transition-all hover:border-primary hover:shadow-xl`}
              >
                {/* Step number background */}
                <div className="pointer-events-none absolute -right-4 -top-4 text-9xl font-bold text-muted/20">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`relative z-10 mb-6 inline-flex rounded-2xl ${step.bgColor} p-4`}>
                  <Icon className={`h-8 w-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="relative z-10 mb-3 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="relative z-10 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Tiers section */}
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <div className="mb-10 text-center">
            <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Staking Tiers
            </h3>
            <p className="text-muted-foreground">
              Your allocation multiplier is determined by the amount of $PCGF you stake.
            </p>
          </div>

          {/* Tiers table */}
          <div className="overflow-x-auto">
            <div className="inline-flex w-full min-w-[600px] gap-4">
              {tiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`flex-1 rounded-2xl border border-border bg-background p-6 text-center transition-all hover:border-primary hover:scale-105 ${
                    index === tiers.length - 1 ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                  }`}
                >
                  <div className={`mx-auto mb-4 h-3 w-16 rounded-full ${tier.color}`} />
                  <div className="mb-2 text-lg font-bold text-foreground">{tier.name}</div>
                  <div className="mb-4 font-mono text-sm text-muted-foreground">
                    {tier.stake} $PCGF
                  </div>
                  <div className="text-2xl font-bold text-primary">{tier.allocation}</div>
                  <div className="text-xs text-muted-foreground">Allocation</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Staking tiers are calculated based on a 7-day average balance. Tier upgrades take effect immediately.
          </div>
        </div>
      </div>
    </section>
  )
}
