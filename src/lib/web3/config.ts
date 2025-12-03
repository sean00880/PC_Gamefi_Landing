/**
 * PC GameFi Web3 Configuration
 *
 * This file provides chain metadata for UI components.
 * Wallet configuration is now handled by Reown AppKit.
 *
 * @see src/config/appkit.config.ts - AppKit configuration
 * @see src/components/providers/Web3Provider.tsx - Provider setup
 */

import { mainnet, base, bsc, arbitrum, polygon, optimism, sepolia, avalanche } from 'wagmi/chains'

// Re-export wagmi config from AppKit config
export { wagmiConfig as config, SUPPORTED_NETWORKS as supportedChains } from '@/config'

// Chain info mapping for UI (extended with additional metadata)
export const chainInfo: Record<number, { name: string; logo: string; color: string }> = {
  [mainnet.id]: {
    name: 'Ethereum',
    logo: '/chains/ethereum.svg',
    color: '#627EEA',
  },
  [base.id]: {
    name: 'Base',
    logo: '/chains/base.svg',
    color: '#0052FF',
  },
  [bsc.id]: {
    name: 'BNB Chain',
    logo: '/chains/bnb.svg',
    color: '#F0B90B',
  },
  [arbitrum.id]: {
    name: 'Arbitrum',
    logo: '/chains/arbitrum.svg',
    color: '#28A0F0',
  },
  [polygon.id]: {
    name: 'Polygon',
    logo: '/chains/polygon.svg',
    color: '#8247E5',
  },
  [optimism.id]: {
    name: 'Optimism',
    logo: '/chains/optimism.svg',
    color: '#FF0420',
  },
  [avalanche.id]: {
    name: 'Avalanche',
    logo: '/chains/avalanche.svg',
    color: '#E84142',
  },
  [sepolia.id]: {
    name: 'Sepolia',
    logo: '/chains/ethereum.svg',
    color: '#627EEA',
  },
}
