'use client'

import dynamic from 'next/dynamic'
import { Wallet } from 'lucide-react'

/**
 * WalletButton Component
 *
 * Reown AppKit-powered wallet connection button for PC GameFi.
 * Follows GROWSZ biosphere patterns established in MEMELinked.
 *
 * Features:
 * - Opens Reown AppKit modal (350+ wallets supported)
 * - Shows connected wallet address with truncation
 * - Dropdown menu for wallet actions
 * - Multi-chain support (Ethereum, Base, BSC, Polygon, Arbitrum, Avalanche, Optimism)
 * - SSR-safe: Uses dynamic import with ssr: false
 *
 * @see src/config/appkit.config.ts - AppKit configuration
 * @see src/components/providers/Web3Provider.tsx - Provider setup
 */

// Loading placeholder shown during SSR and initial client load
function WalletButtonSkeleton() {
  return (
    <button
      className="flex items-center gap-2 px-6 py-2.5 bg-primary/50 text-primary-foreground rounded-lg font-semibold opacity-50 cursor-wait"
      disabled
    >
      <Wallet className="w-5 h-5" />
      <span>Loading...</span>
    </button>
  )
}

// Dynamically import the client-only component
const WalletButtonClient = dynamic(
  () => import('./WalletButtonClient').then((mod) => mod.WalletButtonClient),
  {
    ssr: false,
    loading: () => <WalletButtonSkeleton />,
  }
)

export function WalletButton() {
  return <WalletButtonClient />
}
