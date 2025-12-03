/**
 * PC GameFi - Reown AppKit Configuration
 *
 * Follows GROWSZ biosphere patterns established in MEMELinked.
 * Each ecosystem gets its own Reown projectId but shares the same
 * configuration patterns for consistency.
 */

import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, base, bsc, polygon, arbitrum, avalanche, optimism } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

// =============================================================================
// CONFIGURATION
// =============================================================================

// PC GameFi's dedicated Reown project ID
// Each GROWSZ ecosystem has its own projectId for:
// - Separate metrics/analytics in Reown Cloud
// - Independent rate limits and SLAs
// - Clean separation of concerns
export const PCGAMEFI_PROJECT_ID = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || ''

if (!PCGAMEFI_PROJECT_ID) {
  console.warn('[PC GameFi] Missing NEXT_PUBLIC_REOWN_PROJECT_ID - wallet features will be limited')
}

// =============================================================================
// SUPPORTED NETWORKS
// =============================================================================

// EVM chains supported by PC GameFi launchpad
// Matches the chains where smart contracts are deployed
export const SUPPORTED_NETWORKS: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,    // Ethereum Mainnet
  base,       // Base (Coinbase L2)
  bsc,        // BNB Smart Chain
  polygon,    // Polygon
  arbitrum,   // Arbitrum One
  avalanche,  // Avalanche C-Chain
  optimism,   // Optimism
]

// Network metadata for UI
export const NETWORK_METADATA: Record<number, { name: string; symbol: string; logo: string }> = {
  1: { name: 'Ethereum', symbol: 'ETH', logo: '/chains/ethereum.svg' },
  8453: { name: 'Base', symbol: 'ETH', logo: '/chains/base.svg' },
  56: { name: 'BNB Chain', symbol: 'BNB', logo: '/chains/bnb.svg' },
  137: { name: 'Polygon', symbol: 'MATIC', logo: '/chains/polygon.svg' },
  42161: { name: 'Arbitrum', symbol: 'ETH', logo: '/chains/arbitrum.svg' },
  43114: { name: 'Avalanche', symbol: 'AVAX', logo: '/chains/avalanche.svg' },
  10: { name: 'Optimism', symbol: 'ETH', logo: '/chains/optimism.svg' },
}

// =============================================================================
// WAGMI ADAPTER
// =============================================================================

// Wagmi adapter for EVM chain interactions
// This provides the bridge between Reown AppKit and wagmi hooks
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId: PCGAMEFI_PROJECT_ID,
  networks: SUPPORTED_NETWORKS,
})

// Export wagmi config for use with wagmi hooks
export const wagmiConfig = wagmiAdapter.wagmiConfig

// =============================================================================
// APPKIT METADATA
// =============================================================================

// PC GameFi branding for wallet connection modals
export const APPKIT_METADATA = {
  name: 'PC GameFi',
  description: 'Premier IGO Launchpad for Gaming Projects',
  url: 'https://pcgamefi.com', // Update with actual domain
  icons: ['https://pcgamefi.com/logo.png'], // Update with actual logo
}

// =============================================================================
// APPKIT FEATURES
// =============================================================================

// Feature flags for AppKit modal
export const APPKIT_FEATURES = {
  // Analytics - enable for production
  analytics: process.env.NODE_ENV === 'production',

  // Email wallets (social login)
  email: true,

  // Socials (Google, Discord, etc.) - mutable array for AppKit compatibility
  socials: ['google', 'discord', 'x'] as ('google' | 'discord' | 'x')[],

  // On-ramp (buy crypto with fiat)
  onramp: true,

  // Swaps (in-modal token swaps)
  swaps: false, // Disabled - users should use DEX
}

// =============================================================================
// THEME
// =============================================================================

// PC GameFi brand colors for AppKit theming
export const APPKIT_THEME_VARIABLES = {
  '--w3m-color-mix': '#10b981', // Primary green
  '--w3m-color-mix-strength': 20,
  '--w3m-accent': '#10b981',
  '--w3m-border-radius-master': '12px',
}
