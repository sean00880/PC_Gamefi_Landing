import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { StakingDashboard } from '@/components/staking/StakingDashboard'
import { StakingTiers } from '@/components/staking/StakingTiers'
import { StakingStats } from '@/components/staking/StakingStats'

// Force dynamic rendering to avoid Wagmi SSG issues
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Staking | PC GameFi',
  description: 'Stake PCGF tokens to earn rewards and unlock exclusive benefits.',
}

export default function StakePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
            Staking
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Stake PCGF, Earn Rewards
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Stake your PCGF tokens to earn passive rewards, unlock allocation multipliers,
            and gain early access to the hottest IGOs.
          </p>
        </div>
      </section>

      {/* Staking Stats */}
      <StakingStats />

      {/* Staking Dashboard */}
      <StakingDashboard />

      {/* Staking Tiers */}
      <StakingTiers />
    </main>
  )
}
