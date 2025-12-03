'use client'

import { Wallet, Coins, UserCheck, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Wallet,
    step: '01',
    title: 'Sign-Up',
    description: 'Signup and connect your crypto wallet to get started with PC GameFi.',
  },
  {
    icon: Coins,
    step: '02',
    title: 'Stake Tokens',
    description: 'Unlock your tier and power up your allocation multiplier for IGOs.',
  },
  {
    icon: UserCheck,
    step: '03',
    title: 'Complete KYC',
    description: 'Apply for whitelist on IDO pools and verify your information.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Join IGO',
    description: 'Pay in crypto and claim your tokens upon listing. Start investing!',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Get Started
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How To Join
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Follow these simple steps to start participating in exclusive IGOs and earn rewards.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
            >
              {/* Step number badge */}
              <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                Step {step.step}
              </div>

              {/* Icon */}
              <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <step.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connection line (except last) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
