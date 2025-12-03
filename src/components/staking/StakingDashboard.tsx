'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { WalletButton } from '@/components/WalletButton'
import { Coins, ArrowUpRight, ArrowDownRight, Gift, Lock } from 'lucide-react'
import { useStakingInfo, useStake, useUnstake, useClaimRewards, useTokenBalance, useTokenApprove } from '@/hooks'
import { STAKING_TIERS } from '@/lib/web3/contracts'
import { parseEther, formatEther } from 'viem'

export function StakingDashboard() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake')
  const [amount, setAmount] = useState('')

  // Hooks for staking data
  const { stakedAmount, tier, tierName, multiplier, pendingRewards, isLoading } = useStakingInfo()
  const { balance: tokenBalance } = useTokenBalance()
  const { approve, isPending: isApproving } = useTokenApprove()
  const { stake, isPending: isStaking } = useStake()
  const { unstake, isPending: isUnstaking } = useUnstake()
  const { claimRewards, isPending: isClaiming } = useClaimRewards()

  const handleStake = async () => {
    if (!amount) return
    try {
      const amountWei = parseEther(amount)
      // First approve, then stake
      await approve(amountWei)
      stake(amount) // Pass string amount, hook handles conversion
      setAmount('')
    } catch (error) {
      console.error('Stake failed:', error)
    }
  }

  const handleUnstake = async () => {
    if (!amount) return
    try {
      unstake(amount) // Pass string amount, hook handles conversion
      setAmount('')
    } catch (error) {
      console.error('Unstake failed:', error)
    }
  }

  const handleClaimRewards = async () => {
    try {
      await claimRewards()
    } catch (error) {
      console.error('Claim failed:', error)
    }
  }

  const setMaxAmount = () => {
    if (activeTab === 'stake') {
      setAmount(formatEther(tokenBalance))
    } else {
      setAmount(formatEther(stakedAmount))
    }
  }

  // Calculate next tier progress
  const currentTierThreshold = STAKING_TIERS[tier as keyof typeof STAKING_TIERS]?.threshold || 0n
  const nextTier = Math.min(tier + 1, 5)
  const nextTierThreshold = STAKING_TIERS[nextTier as keyof typeof STAKING_TIERS]?.threshold || 0n
  const progress = nextTierThreshold > currentTierThreshold
    ? Number((stakedAmount - currentTierThreshold) * 100n / (nextTierThreshold - currentTierThreshold))
    : 100

  if (!isConnected) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-3xl border border-border bg-background p-8 text-center md:p-12">
            <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Connect Your Wallet
            </h2>
            <p className="mb-8 text-muted-foreground">
              Connect your wallet to start staking PCGF tokens and earn rewards.
            </p>
            <WalletButton />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Staking Card */}
          <div className="rounded-3xl border border-border bg-background p-6 md:p-8">
            {/* Tab Toggle */}
            <div className="mb-6 flex rounded-xl bg-muted/30 p-1">
              <button
                onClick={() => setActiveTab('stake')}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === 'stake'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ArrowUpRight className="mr-2 inline-block h-4 w-4" />
                Stake
              </button>
              <button
                onClick={() => setActiveTab('unstake')}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === 'unstake'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ArrowDownRight className="mr-2 inline-block h-4 w-4" />
                Unstake
              </button>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Amount
                </label>
                <span className="text-sm text-muted-foreground">
                  Balance: {formatEther(activeTab === 'stake' ? tokenBalance : stakedAmount)} PCGF
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-border bg-muted/30 py-4 pl-4 pr-20 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <button
                  onClick={setMaxAmount}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary/20"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={activeTab === 'stake' ? handleStake : handleUnstake}
              disabled={!amount || isStaking || isUnstaking || isApproving}
              className="w-full rounded-xl bg-primary py-4 font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isApproving ? 'Approving...' : isStaking || isUnstaking ? 'Processing...' : activeTab === 'stake' ? 'Stake PCGF' : 'Unstake PCGF'}
            </button>

            {/* Info */}
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {activeTab === 'stake'
                ? 'Staked tokens are locked for 7 days minimum.'
                : 'Unstaking will forfeit any unclaimed rewards.'}
            </p>
          </div>

          {/* Stats Card */}
          <div className="space-y-4">
            {/* Staking Position */}
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="mb-4 font-semibold text-foreground">Your Position</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Staked Amount</span>
                  <span className="font-semibold text-foreground">
                    {isLoading ? '...' : `${formatEther(stakedAmount)} PCGF`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Tier</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    tier === 0 ? 'bg-muted text-muted-foreground' :
                    tier === 1 ? 'bg-amber-600/20 text-amber-600' :
                    tier === 2 ? 'bg-gray-400/20 text-gray-400' :
                    tier === 3 ? 'bg-yellow-500/20 text-yellow-500' :
                    tier === 4 ? 'bg-purple-500/20 text-purple-500' :
                    'bg-cyan-500/20 text-cyan-500'
                  }`}>
                    {tierName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Allocation Multiplier</span>
                  <span className="font-semibold text-secondary">{multiplier}x</span>
                </div>
              </div>

              {/* Tier Progress */}
              {tier < 5 && (
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress to {STAKING_TIERS[(tier + 1) as keyof typeof STAKING_TIERS]?.name}</span>
                    <span className="text-foreground">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Pending Rewards */}
            <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">Pending Rewards</h3>
                  <div className="text-3xl font-bold text-secondary">
                    {isLoading ? '...' : `${formatEther(pendingRewards)} PCGF`}
                  </div>
                </div>
                <div className="rounded-xl bg-secondary/10 p-3">
                  <Gift className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <button
                onClick={handleClaimRewards}
                disabled={pendingRewards === 0n || isClaiming}
                className="mt-4 w-full rounded-xl border border-secondary bg-secondary/10 py-3 font-semibold text-secondary hover:bg-secondary/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isClaiming ? 'Claiming...' : 'Claim Rewards'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
