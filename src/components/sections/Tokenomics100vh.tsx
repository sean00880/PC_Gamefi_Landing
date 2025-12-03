'use client'

import { Coins, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Lock, Gift, Flame, Building2, Sparkles } from 'lucide-react'
import { TOKENOMICS } from '@/lib/constants'

const utilities = [
  {
    icon: Lock,
    title: 'Staking Tiers',
    description: 'Stake $PCGF to unlock allocation tiers from Bronze to Quantum.'
  },
  {
    icon: Gift,
    title: 'Revenue Share',
    description: 'Earn a share of platform fees from every successful IGO.'
  },
  {
    icon: Flame,
    title: 'Deflationary Burns',
    description: 'A portion of all taxes are burned, reducing supply over time.'
  },
  {
    icon: Building2,
    title: 'Governance Rights',
    description: 'Vote on project listings, platform upgrades, and treasury allocation.'
  }
]

export function Tokenomics100vh() {
  // Use static tokenomics constants
  const taxDetails = [
    {
      icon: ArrowUpRight,
      label: 'Buy Tax',
      value: TOKENOMICS.buyTax,
      description: 'Split between rewards & liquidity',
      color: 'text-primary'
    },
    {
      icon: ArrowDownLeft,
      label: 'Sell Tax',
      value: TOKENOMICS.sellTax,
      description: 'Funds marketing & development',
      color: 'text-secondary'
    },
    {
      icon: ArrowLeftRight,
      label: 'Transfer Tax',
      value: TOKENOMICS.transferTax,
      description: 'Free peer-to-peer transfers',
      color: 'text-accent'
    }
  ]

  // Format total supply from constants
  const displaySupply = TOKENOMICS.displaySupply
  const rawSupply = TOKENOMICS.supply

  return (
    <section className="flex min-h-screen flex-col justify-center bg-card py-20" id="tokenomics">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
            <Coins className="h-4 w-4" />
            $PCGF Token
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Tokenomics
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {TOKENOMICS.description}
          </p>
        </div>

        {/* Total Supply - Hero Display */}
        <div className="mb-16 flex justify-center">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-12 text-center">
            {/* Background decoration */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative">
              <div className="mb-2 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                Total Supply
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                {displaySupply}
              </div>
              <div className="mt-3 font-mono text-lg text-muted-foreground">
                {rawSupply} $PCGF
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column - Tax structure */}
          <div className="rounded-3xl border border-border bg-background p-8">
            <h3 className="mb-6 text-2xl font-bold text-foreground">Tax Structure</h3>
            <div className="grid gap-4">
              {taxDetails.map((tax) => {
                const Icon = tax.icon
                return (
                  <div
                    key={tax.label}
                    className="flex items-center gap-4 rounded-2xl bg-muted/30 p-5 transition-colors hover:bg-muted/50"
                  >
                    <div className={`rounded-xl bg-background p-3 shadow-sm ${tax.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{tax.label}</span>
                        <span className="text-3xl font-bold text-foreground">{tax.value}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tax.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Tax summary */}
            <div className="mt-6 rounded-2xl bg-muted/50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Simple & Transparent</span>
                <span className="font-semibold text-foreground">No hidden fees</span>
              </div>
            </div>
          </div>

          {/* Right column - Token utility */}
          <div className="rounded-3xl border border-border bg-background p-8">
            <h3 className="mb-6 text-2xl font-bold text-foreground">Token Utility</h3>
            <div className="grid gap-4">
              {utilities.map((util) => {
                const Icon = util.icon
                return (
                  <div key={util.title} className="flex items-start gap-4 rounded-2xl bg-muted/30 p-5 transition-colors hover:bg-muted/50">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">{util.title}</h4>
                      <p className="text-sm text-muted-foreground">{util.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-6 text-center">
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="mt-2 text-muted-foreground">Liquidity Locked</div>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 text-center">
            <div className="text-3xl font-bold text-secondary">Audited</div>
            <div className="mt-2 text-muted-foreground">By CertiK & SolidProof</div>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 text-center">
            <div className="text-3xl font-bold text-accent">No Max Wallet</div>
            <div className="mt-2 text-muted-foreground">Accumulate Freely</div>
          </div>
        </div>
      </div>
    </section>
  )
}
