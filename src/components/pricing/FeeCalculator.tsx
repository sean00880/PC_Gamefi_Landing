'use client'

import { useState } from 'react'
import { Calculator, TrendingDown } from 'lucide-react'
import { PRICING_PLANS, calculatePlatformFee, calculateListingFee } from '@/lib/pricing'

export function FeeCalculator() {
  const [raiseAmount, setRaiseAmount] = useState(100000)
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [selectedListing, setSelectedListing] = useState('standard')

  const platformFee = calculatePlatformFee(raiseAmount, selectedPlan)
  const listingFee = calculateListingFee(selectedListing, selectedPlan)

  const totalFees = platformFee.feeAmount + listingFee.finalPrice
  const netProceeds = raiseAmount - platformFee.feeAmount

  // Calculate savings compared to free tier
  const freeFee = calculatePlatformFee(raiseAmount, 'free')
  const freeListing = calculateListingFee(selectedListing, 'free')
  const freeTotalFees = freeFee.feeAmount + freeListing.finalPrice
  const savings = freeTotalFees - totalFees

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Fee Calculator
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Calculate Your Fees
          </h2>
          <p className="text-muted-foreground">
            See exactly how much you'll pay based on your raise and subscription plan.
          </p>
        </div>

        {/* Calculator */}
        <div className="rounded-3xl border border-border bg-background p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Inputs */}
            <div className="space-y-6">
              {/* Raise amount */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">
                  Expected Raise Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    value={raiseAmount}
                    onChange={(e) => setRaiseAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-8 pr-4 text-foreground focus:border-primary focus:outline-none"
                    min={0}
                    step={10000}
                  />
                </div>
                {/* Quick amounts */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[50000, 100000, 250000, 500000, 1000000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setRaiseAmount(amount)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        raiseAmount === amount
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      ${amount >= 1000000 ? `${amount / 1000000}M` : `${amount / 1000}K`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscription plan */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">
                  Subscription Plan
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/30 py-3 px-4 text-foreground focus:border-primary focus:outline-none"
                >
                  {PRICING_PLANS.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} ({plan.platformFeeBps / 100}% platform fee)
                    </option>
                  ))}
                </select>
              </div>

              {/* Listing type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">
                  Listing Type
                </label>
                <select
                  value={selectedListing}
                  onChange={(e) => setSelectedListing(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/30 py-3 px-4 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="standard">Standard ($500)</option>
                  <option value="priority">Priority ($2,000)</option>
                  <option value="featured">Featured ($5,000)</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {/* Platform fee */}
              <div className="rounded-2xl bg-muted/30 p-4">
                <div className="mb-1 text-sm text-muted-foreground">Platform Fee ({platformFee.feePercent}%)</div>
                <div className="text-2xl font-bold text-foreground">
                  ${platformFee.feeAmount.toLocaleString()}
                </div>
              </div>

              {/* Listing fee */}
              <div className="rounded-2xl bg-muted/30 p-4">
                <div className="mb-1 text-sm text-muted-foreground">
                  Listing Fee
                  {listingFee.discount > 0 && (
                    <span className="ml-2 text-secondary">
                      (-${listingFee.discount.toLocaleString()})
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  {listingFee.discount > 0 && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${listingFee.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-foreground">
                    ${listingFee.finalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Total fees */}
              <div className="rounded-2xl border border-border bg-background p-4">
                <div className="mb-1 text-sm text-muted-foreground">Total Fees</div>
                <div className="text-3xl font-bold text-foreground">
                  ${totalFees.toLocaleString()}
                </div>
              </div>

              {/* Net proceeds */}
              <div className="rounded-2xl bg-primary/10 p-4">
                <div className="mb-1 text-sm text-primary">Net Proceeds (Before Listing)</div>
                <div className="text-3xl font-bold text-foreground">
                  ${netProceeds.toLocaleString()}
                </div>
              </div>

              {/* Savings */}
              {savings > 0 && (
                <div className="flex items-center gap-3 rounded-2xl bg-secondary/10 p-4">
                  <TrendingDown className="h-6 w-6 text-secondary" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      You're saving vs. Free tier
                    </div>
                    <div className="text-xl font-bold text-secondary">
                      ${savings.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
