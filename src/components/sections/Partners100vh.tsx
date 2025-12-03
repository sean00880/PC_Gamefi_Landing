'use client'

import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote: "PC GameFi has completely changed how I approach GameFi investments. The allocation system is fair, and the vetting process gives me confidence in every project.",
    author: 'Alex Chen',
    role: 'Early Investor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    roi: '35x avg ROI'
  },
  {
    quote: "As a project founder, PC GameFi provided us with a dedicated community of genuine gamers. Our IGO sold out in minutes and we gained lifelong supporters.",
    author: 'Sarah Kim',
    role: 'CEO, MetaRacers',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    roi: '$2.5M raised'
  },
  {
    quote: "The AI Scout feature is incredible. It saved me hours of research and helped me identify hidden gems before they went mainstream.",
    author: 'Marcus Johnson',
    role: 'DeFi Analyst',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    roi: '28x on last IGO'
  }
]

const partners = [
  { name: 'CertiK', type: 'Security Audit' },
  { name: 'Chainlink', type: 'Oracle Partner' },
  { name: 'Polygon', type: 'Network Partner' },
  { name: 'Arbitrum', type: 'Network Partner' },
  { name: 'BSC', type: 'Network Partner' },
  { name: 'OpenSea', type: 'NFT Partner' },
  { name: 'Uniswap', type: 'DEX Partner' },
  { name: 'CoinGecko', type: 'Data Partner' }
]

const backers = [
  'Animoca Brands',
  'Spartan Group',
  'Merit Circle',
  'DeFiance Capital',
  'Mechanism Capital',
  'GSR Markets'
]

export function Partners100vh() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Testimonials */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
              Community Voices
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              What Our Users Say
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="group relative rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-xl"
              >
                {/* Quote icon */}
                <Quote className="mb-6 h-10 w-10 text-primary/30" />

                {/* Quote text */}
                <blockquote className="mb-8 text-lg leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {testimonial.roi}
                  </div>
                </div>

                {/* Stars */}
                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners grid */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
              Trusted Partners & Integrations
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {partner.name}
                </div>
                <div className="text-xs text-muted-foreground">{partner.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Backers */}
        <div className="rounded-3xl border border-border bg-muted/30 p-8 md:p-12">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
              Backed By Industry Leaders
            </h3>
            <p className="mt-2 text-muted-foreground">
              Strategic investors who believe in our vision
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {backers.map((backer) => (
              <div
                key={backer}
                className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {backer}
              </div>
            ))}
          </div>
        </div>

        {/* Trust metrics */}
        <div className="mt-16 grid gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">4.9/5</div>
            <div className="mt-1 text-sm text-muted-foreground">User Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">200K+</div>
            <div className="mt-1 text-sm text-muted-foreground">Community Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">50+</div>
            <div className="mt-1 text-sm text-muted-foreground">Partners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">24/7</div>
            <div className="mt-1 text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
