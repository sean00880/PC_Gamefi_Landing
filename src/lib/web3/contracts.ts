import type { Address } from "viem";
import { mainnet, base, bsc, arbitrum, polygon, optimism, sepolia } from "wagmi/chains";

// Contract addresses per chain
// These will be populated after deployment
export const CONTRACT_ADDRESSES: Record<number, {
  pcgfToken: Address;
  stakingController: Address;
  launchpadFactory: Address;
}> = {
  [mainnet.id]: {
    pcgfToken: "0x0000000000000000000000000000000000000000" as Address,
    stakingController: "0x0000000000000000000000000000000000000000" as Address,
    launchpadFactory: "0x0000000000000000000000000000000000000000" as Address,
  },
  [base.id]: {
    pcgfToken: "0x0000000000000000000000000000000000000000" as Address,
    stakingController: "0x0000000000000000000000000000000000000000" as Address,
    launchpadFactory: "0x0000000000000000000000000000000000000000" as Address,
  },
  [bsc.id]: {
    pcgfToken: "0x0000000000000000000000000000000000000000" as Address,
    stakingController: "0x0000000000000000000000000000000000000000" as Address,
    launchpadFactory: "0x0000000000000000000000000000000000000000" as Address,
  },
  [arbitrum.id]: {
    pcgfToken: "0x0000000000000000000000000000000000000000" as Address,
    stakingController: "0x0000000000000000000000000000000000000000" as Address,
    launchpadFactory: "0x0000000000000000000000000000000000000000" as Address,
  },
  [polygon.id]: {
    pcgfToken: "0x0000000000000000000000000000000000000000" as Address,
    stakingController: "0x0000000000000000000000000000000000000000" as Address,
    launchpadFactory: "0x0000000000000000000000000000000000000000" as Address,
  },
  [optimism.id]: {
    pcgfToken: "0x0000000000000000000000000000000000000000" as Address,
    stakingController: "0x0000000000000000000000000000000000000000" as Address,
    launchpadFactory: "0x0000000000000000000000000000000000000000" as Address,
  },
  [sepolia.id]: {
    pcgfToken: "0x0000000000000000000000000000000000000000" as Address,
    stakingController: "0x0000000000000000000000000000000000000000" as Address,
    launchpadFactory: "0x0000000000000000000000000000000000000000" as Address,
  },
};

// Helper to get contract address
export function getContractAddress(
  contract: "pcgfToken" | "stakingController" | "launchpadFactory",
  chainId: number
): Address {
  const addresses = CONTRACT_ADDRESSES[chainId];
  if (!addresses) {
    throw new Error(`Chain ${chainId} not supported`);
  }
  return addresses[contract];
}

// Staking tier definitions (matches contract)
export const STAKING_TIERS = {
  0: { name: "None", threshold: 0n, multiplier: 1, earlyAccessHours: 0, apy: 0 },
  1: { name: "Bronze", threshold: 1000n * 10n ** 18n, multiplier: 1, earlyAccessHours: 0, apy: 5 },
  2: { name: "Silver", threshold: 5000n * 10n ** 18n, multiplier: 2, earlyAccessHours: 1, apy: 8 },
  3: { name: "Gold", threshold: 25000n * 10n ** 18n, multiplier: 5, earlyAccessHours: 2, apy: 12 },
  4: { name: "Platinum", threshold: 100000n * 10n ** 18n, multiplier: 10, earlyAccessHours: 4, apy: 18 },
  5: { name: "Quantum", threshold: 500000n * 10n ** 18n, multiplier: 25, earlyAccessHours: 6, apy: 25 },
} as const;

export type TierLevel = keyof typeof STAKING_TIERS;

// Tier colors for UI
export const TIER_COLORS: Record<string, string> = {
  None: "text-gray-400",
  Bronze: "text-amber-600",
  Silver: "text-gray-300",
  Gold: "text-yellow-400",
  Platinum: "text-cyan-300",
  Quantum: "text-purple-400",
};

export const TIER_BG_COLORS: Record<string, string> = {
  None: "bg-gray-900",
  Bronze: "bg-amber-900/30",
  Silver: "bg-gray-700/30",
  Gold: "bg-yellow-900/30",
  Platinum: "bg-cyan-900/30",
  Quantum: "bg-purple-900/30",
};
