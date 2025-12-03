import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { PricingSection } from '@/components/pricing/PricingSection'
import { ListingFeesSection } from '@/components/pricing/ListingFeesSection'
import { FeeCalculator } from '@/components/pricing/FeeCalculator'
import { ContractPackages } from '@/components/pricing/ContractPackages'
import { FAQ } from '@/components/pricing/FAQ'

export const metadata: Metadata = {
  title: 'Pricing | PC GameFi',
  description: 'Flexible pricing plans for IGO launches. From free tier to enterprise solutions.',
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Choose the plan that fits your project. Scale as you grow with flexible subscriptions
            and pay-per-listing options.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <PricingSection />

      {/* Listing Fees */}
      <ListingFeesSection />

      {/* Fee Calculator */}
      <FeeCalculator />

      {/* Contract Packages */}
      <ContractPackages />

      {/* FAQ */}
      <FAQ />
    </main>
  )
}
