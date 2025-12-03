'use client'

import { Coins, Users, TrendingUp, Clock } from 'lucide-react'
import { useStakingStats } from '@/hooks'

export function StakingStats() {
  const { totalStaked, stakerCount } = useStakingStats()

  const stats = [
    {
      label: 'Total Staked',
      value: `${Number(totalStaked / BigInt(1e18)).toLocaleString()} PCGF`,
      icon: Coins,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Active Stakers',
      value: stakerCount.toLocaleString(),
      icon: Users,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      label: 'Max APY',
      value: '25%',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Lock Period',
      value: '7 Days',
      icon: Clock,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ]

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <div className={`mb-4 inline-flex rounded-xl ${stat.bgColor} p-3`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground md:text-3xl">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
