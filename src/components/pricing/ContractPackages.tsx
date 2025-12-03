'use client'

import { Check, Lock, Code, Coins, Flame, Users, Key, Sparkles, type LucideIcon } from 'lucide-react'
import { CONTRACT_PACKAGES } from '@/lib/pricing'

const iconMap: Record<string, LucideIcon> = {
  'standard-tax': Coins,
  'zero-tax': Code,
  deflationary: Flame,
  reflection: Users,
  'multisig-vesting': Key,
  'milestone-vesting': Check,
  custom: Sparkles,
}

const tierColors: Record<string, string> = {
  starter: 'bg-blue-500/10 text-blue-500',
  professional: 'bg-purple-500/10 text-purple-500',
  enterprise: 'bg-amber-500/10 text-amber-500',
}

export function ContractPackages() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Smart Contract Templates
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose from battle-tested contract templates. Higher tiers unlock advanced features
            and custom development.
          </p>
        </div>

        {/* Packages grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CONTRACT_PACKAGES.map((pkg) => {
            const Icon = iconMap[pkg.id] || Code
            const isLimited = !pkg.included.includes('free')
            const lowestTier = pkg.included[0] || 'starter'

            return (
              <div
                key={pkg.id}
                className="group relative rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                {/* Lock indicator for restricted packages */}
                {isLimited && lowestTier && (
                  <div className="absolute -right-2 -top-2">
                    <div className={`rounded-full px-2 py-1 text-xs font-semibold ${tierColors[lowestTier] || tierColors.starter}`}>
                      {lowestTier.charAt(0).toUpperCase() + lowestTier.slice(1)}+
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="mb-2 font-bold text-foreground">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>

                {/* Available in */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {pkg.included.map((tier) => (
                    <span
                      key={tier}
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${tierColors[tier]}`}
                    >
                      {tier}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Custom development CTA */}
        <div className="mt-12 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-background to-amber-500/5 p-8 text-center md:p-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-500">Enterprise Only</span>
          </div>
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            Need a Custom Contract?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Our enterprise plan includes bespoke smart contract development. Whether you need
            unique tokenomics, custom vesting logic, or integration with your existing systems.
          </p>
          <button className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black hover:bg-amber-400">
            Upgrade to Enterprise
          </button>
        </div>
      </div>
    </section>
  )
}
