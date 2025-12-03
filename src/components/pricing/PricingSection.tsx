'use client'

import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/pricing'

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Billing toggle */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-border bg-muted/30 p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="ml-2 rounded-full bg-secondary/20 px-2 py-0.5 text-xs text-secondary">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice / 12
            const isPopular = plan.popular

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border bg-background p-8 ${
                  isPopular
                    ? 'border-primary shadow-lg shadow-primary/10'
                    : 'border-border'
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${Math.round(price)}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-muted-foreground">/mo</span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && plan.yearlyPrice > 0 && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      ${plan.yearlyPrice} billed annually
                    </p>
                  )}
                </div>

                {/* Platform fee highlight */}
                <div className="mb-6 rounded-xl bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Platform Fee</span>
                    <span className="text-2xl font-bold text-foreground">
                      {plan.platformFeeBps / 100}%
                    </span>
                  </div>
                  {plan.listingFeeDiscount > 0 && (
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Listing Discount</span>
                      <span className="font-semibold text-secondary">
                        {plan.listingFeeDiscount}% off
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button
                  className={`w-full rounded-xl py-3 font-semibold transition-colors ${
                    isPopular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {plan.monthlyPrice === 0 ? 'Get Started Free' : 'Subscribe Now'}
                </button>

                {/* Features */}
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 rounded-3xl border border-border bg-gradient-to-r from-primary/5 via-background to-secondary/5 p-8 text-center md:p-12">
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            Need a Custom Solution?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            For large-scale projects, exchanges, or white-label solutions, contact our
            enterprise team for custom pricing and dedicated support.
          </p>
          <button className="rounded-xl bg-foreground px-8 py-3 font-semibold text-background hover:bg-foreground/90">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}
