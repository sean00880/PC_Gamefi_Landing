'use client'

import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react'

/**
 * WalletButtonClient - Client-only wallet button component
 *
 * This component uses AppKit hooks and should only be rendered client-side.
 * Use the WalletButton wrapper component which handles SSR.
 *
 * @internal Use WalletButton instead of this component directly
 */
export function WalletButtonClient() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()

  // Handler: Open AppKit modal
  const handleClick = async () => {
    try {
      await open()
    } catch (error) {
      console.error('[WalletButton] Failed to open modal:', error)
    }
  }

  // Handler: Copy address to clipboard
  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
    }
  }

  // Format address for display (0x1234...5678)
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="relative group">
        <button
          onClick={handleClick}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg font-semibold text-primary transition-all duration-200"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-sm">{formatAddress(address)}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Dropdown Menu - shown via AppKit modal */}
        <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-2 space-y-1">
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy Address
            </button>
            <a
              href={`https://etherscan.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on Explorer
            </a>
            <button
              onClick={handleClick}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40"
    >
      <Wallet className="w-5 h-5" />
      <span>Connect Wallet</span>
    </button>
  )
}
