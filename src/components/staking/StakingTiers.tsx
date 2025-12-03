'use client'

import { Check, Zap, Clock, TrendingUp } from 'lucide-react'
import { STAKING_TIERS } from '@/lib/web3/contracts'
import { formatEther } from 'viem'

const tierStyles: Record<number, { gradient: string; border: string; badge: string }> = {
  0: {
    gradient: 'from-muted/50 to-muted/30',
    border: 'border-border',
    badge: 'bg-muted text-muted-foreground',
  },
  1: {
    gradient: 'from-amber-600/10 to-amber-600/5',
    border: 'border-amber-600/30',
    badge: 'bg-amber-600/20 text-amber-600',
  },
  2: {
    gradient: 'from-gray-400/10 to-gray-400/5',
    border: 'border-gray-400/30',
    badge: 'bg-gray-400/20 text-gray-400',
  },
  3: {
    gradient: 'from-yellow-500/10 to-yellow-500/5',
    border: 'border-yellow-500/30',
    badge: 'bg-yellow-500/20 text-yellow-500',
  },
  4: {
    gradient: 'from-purple-500/10 to-purple-500/5',
    border: 'border-purple-500/30',
    badge: 'bg-purple-500/20 text-purple-500',
  },
  5: {
    gradient: 'from-cyan-500/10 to-cyan-500/5',
    border: 'border-cyan-500/30',
    badge: 'bg-cyan-500/20 text-cyan-500',
  },
}

export function StakingTiers() {
  const tiers = Object.entries(STAKING_TIERS)
    .filter(([key]) => Number(key) > 0) // Exclude "None" tier
    .map(([key, tier]) => ({
      ...tier,
      level: Number(key),
    }))

  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Staking Tiers
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Stake more PCGF to unlock higher tiers with increased allocation multipliers,
            early access to sales, and better APY rates.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {tiers.map((tier) => {
            const defaultStyle = { gradient: 'from-muted/50 to-muted/30', border: 'border-border', badge: 'bg-muted text-muted-foreground' }
            const styles = tierStyles[tier.level] ?? defaultStyle

            return (
              <div
                key={tier.level}
                className={`relative overflow-hidden rounded-3xl border bg-gradient-to-b ${styles.gradient} ${styles.border} p-6`}
              >
                {/* Tier Badge */}
                <div className={`mb-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}>
                  {tier.name}
                </div>

                {/* Required Stake */}
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground">Required Stake</div>
                  <div className="text-2xl font-bold text-foreground">
                    {Number(formatEther(tier.threshold)).toLocaleString()} PCGF
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-background/50 p-2">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {tier.multiplier}x Allocation
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Multiplier
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-background/50 p-2">
                      <Clock className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {tier.earlyAccessHours > 0 ? `${tier.earlyAccessHours}h Early` : 'No Early Access'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Access
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-background/50 p-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {tier.apy}% APY
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Rewards
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Benefits */}
                <div className="mt-6 space-y-2 border-t border-border/50 pt-4">
                  {tier.level >= 1 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary" />
                      Priority support
                    </div>
                  )}
                  {tier.level >= 2 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary" />
                      Exclusive Discord role
                    </div>
                  )}
                  {tier.level >= 3 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary" />
                      Guaranteed allocations
                    </div>
                  )}
                  {tier.level >= 4 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary" />
                      Whitelist priority
                    </div>
                  )}
                  {tier.level >= 5 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-primary" />
                      Private sale access
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-3xl border border-border bg-gradient-to-r from-primary/5 via-background to-secondary/5 p-8 text-center md:p-12">
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            Ready to Stake?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Start staking your PCGF tokens today and unlock exclusive benefits.
            The higher your tier, the more you earn and the better access you get.
          </p>
          <a
            href="#top"
            className="inline-flex rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Start Staking Now
          </a>
        </div>
      </div>
    </section>
  )
}
