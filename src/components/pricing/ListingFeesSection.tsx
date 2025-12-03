'use client'

import { Clock, Check, Zap, Star, type LucideIcon } from 'lucide-react'
import { LISTING_FEES } from '@/lib/pricing'

const iconMap: Record<string, LucideIcon> = {
  standard: Clock,
  priority: Zap,
  featured: Star,
}

export function ListingFeesSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Listing Fees
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            One-time fees for project submissions. Subscribers get up to 100% off listing fees.
          </p>
        </div>

        {/* Listing options */}
        <div className="grid gap-8 md:grid-cols-3">
          {LISTING_FEES.map((listing) => {
            const Icon = iconMap[listing.id] || Clock

            return (
              <div
                key={listing.id}
                className="rounded-3xl border border-border bg-background p-8"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                {/* Header */}
                <h3 className="mb-2 text-xl font-bold text-foreground">{listing.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{listing.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    ${listing.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground"> one-time</span>
                </div>

                {/* Processing time */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {listing.processingTime}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {listing.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="mt-8 w-full rounded-xl bg-muted py-3 font-semibold text-foreground hover:bg-muted/80">
                  Select {listing.name}
                </button>
              </div>
            )
          })}
        </div>

        {/* Discount note */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-foreground">
            <span className="font-semibold">Subscribers save big!</span>{' '}
            <span className="text-muted-foreground">
              Starter: 25% off • Professional: 50% off • Enterprise: Free listings
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
