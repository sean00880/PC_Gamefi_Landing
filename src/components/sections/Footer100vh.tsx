'use client'

import Link from 'next/link'
import { Gamepad2, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants'

const footerLinks = {
  platform: [
    { name: 'Projects', href: '/projects' },
    { name: 'Staking', href: '#', disabled: true },
    { name: 'Governance', href: '#', disabled: true },
    { name: 'Analytics', href: '#', disabled: true }
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Whitepaper', href: '#' },
    { name: 'Audit Reports', href: '#' },
    { name: 'Brand Kit', href: '#' }
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Disclaimer', href: '#' }
  ]
}

const chains = [
  { name: 'Ethereum', color: 'bg-blue-500' },
  { name: 'BSC', color: 'bg-yellow-500' },
  { name: 'Polygon', color: 'bg-purple-500' },
  { name: 'Arbitrum', color: 'bg-blue-400' },
  { name: 'Solana', color: 'bg-gradient-to-r from-purple-500 to-cyan-500' }
]

export function Footer100vh() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-foreground">PC GameFi</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The premier launchpad for Web3 gaming. Access exclusive IGOs, stake for allocations,
              and join the future of blockchain gaming.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {link.platform === 'Twitter' ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* Supported chains */}
            <div className="mt-6">
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Supported Chains
              </div>
              <div className="flex flex-wrap gap-2">
                {chains.map((chain) => (
                  <span
                    key={chain.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    <span className={`h-2 w-2 rounded-full ${chain.color}`} />
                    {chain.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.disabled
                        ? 'pointer-events-none text-muted-foreground/50'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {link.name}
                    {link.disabled && (
                      <span className="ml-2 text-xs text-muted-foreground/50">(Soon)</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 md:flex md:items-center md:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-foreground">Stay Updated</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Get the latest IGO announcements and platform updates.
            </p>
          </div>
          <div className="mt-4 flex gap-3 md:mt-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 md:w-64"
            />
            <button className="h-12 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} PC GameFi. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              All systems operational
            </span>
            <span>v2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
