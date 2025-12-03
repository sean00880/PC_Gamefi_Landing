'use client'

import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, type State } from 'wagmi'
import { createAppKit } from '@reown/appkit/react'
import {
  wagmiAdapter,
  wagmiConfig,
  PCGAMEFI_PROJECT_ID,
  SUPPORTED_NETWORKS,
  APPKIT_METADATA,
  APPKIT_FEATURES,
  APPKIT_THEME_VARIABLES,
} from '@/config'

// =============================================================================
// QUERY CLIENT
// =============================================================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't refetch on window focus for web3 data
      refetchOnWindowFocus: false,
      // Retry failed queries once
      retry: 1,
      // Cache for 30 seconds
      staleTime: 30 * 1000,
    },
  },
})

// =============================================================================
// APPKIT INITIALIZATION
// =============================================================================

// Initialize AppKit once (singleton pattern)
// This creates the modal and connects to Reown Cloud
if (typeof window !== 'undefined' && PCGAMEFI_PROJECT_ID) {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId: PCGAMEFI_PROJECT_ID,
    networks: SUPPORTED_NETWORKS,
    defaultNetwork: SUPPORTED_NETWORKS[0],
    metadata: APPKIT_METADATA,
    features: {
      analytics: APPKIT_FEATURES.analytics,
      email: APPKIT_FEATURES.email,
      socials: APPKIT_FEATURES.socials,
      onramp: APPKIT_FEATURES.onramp,
      swaps: APPKIT_FEATURES.swaps,
    },
    themeMode: 'dark',
    themeVariables: APPKIT_THEME_VARIABLES,
  })
}

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

interface Web3ProviderProps {
  children: ReactNode
  initialState?: State
}

/**
 * Web3Provider wraps the application with:
 * - WagmiProvider for EVM interactions
 * - QueryClientProvider for data caching
 * - Reown AppKit for wallet connection UI
 *
 * Usage:
 * ```tsx
 * <Web3Provider>
 *   <App />
 * </Web3Provider>
 * ```
 *
 * For wallet connection UI, use:
 * ```tsx
 * import { useAppKit } from '@reown/appkit/react'
 *
 * const { open } = useAppKit()
 * <button onClick={() => open()}>Connect Wallet</button>
 *
 * // Or use the built-in button component
 * ```
 */
export function Web3Provider({ children, initialState }: Web3ProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

// Re-export hooks for convenience
export { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'
