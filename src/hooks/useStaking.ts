"use client";

import { useReadContract, useWriteContract, useChainId, useAccount, useWaitForTransactionReceipt } from "wagmi";
import { formatEther, parseEther, type Address } from "viem";
import { STAKING_CONTROLLER_ABI } from "@/lib/web3/abis";
import { getContractAddress, STAKING_TIERS, type TierLevel } from "@/lib/web3/contracts";

export interface StakeInfo {
  amount: bigint;
  tier: number;
  stakedAt: bigint;
  lockEndTime: bigint;
  lastClaimTime: bigint;
  pendingRewards: bigint;
}

export interface TierInfo {
  tier: number;
  tierName: string;
  stakedAmount: bigint;
  nextTierThreshold: bigint;
  multiplier: bigint;
  earlyAccessHours: bigint;
  apyBps: bigint;
}

export function useStakingInfo() {
  const chainId = useChainId();
  const { address: userAddress, isConnected } = useAccount();

  let stakingAddress: Address | undefined;
  try {
    stakingAddress = getContractAddress("stakingController", chainId);
  } catch {
    stakingAddress = undefined;
  }

  const { data: stakeInfo, isLoading: isLoadingStake, refetch: refetchStake } = useReadContract({
    address: stakingAddress,
    abi: STAKING_CONTROLLER_ABI,
    functionName: "getStakeInfo",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: isConnected && !!userAddress && !!stakingAddress,
    },
  });

  const { data: tierInfo, isLoading: isLoadingTier, refetch: refetchTier } = useReadContract({
    address: stakingAddress,
    abi: STAKING_CONTROLLER_ABI,
    functionName: "getUserTierInfo",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: isConnected && !!userAddress && !!stakingAddress,
    },
  });

  const { data: pendingRewards, refetch: refetchRewards } = useReadContract({
    address: stakingAddress,
    abi: STAKING_CONTROLLER_ABI,
    functionName: "calculatePendingRewards",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: isConnected && !!userAddress && !!stakingAddress,
    },
  });

  const refetch = () => {
    refetchStake();
    refetchTier();
    refetchRewards();
  };

  // Parse stake info
  const parsedStakeInfo = stakeInfo as StakeInfo | undefined;
  const parsedTierInfo = tierInfo as TierInfo | undefined;

  // Get tier details
  const currentTier = (parsedTierInfo?.tier ?? 0) as TierLevel;
  const tierDetails = STAKING_TIERS[currentTier];

  return {
    isConnected,
    isLoading: isLoadingStake || isLoadingTier,
    // Staking data
    stakedAmount: parsedStakeInfo?.amount ?? 0n,
    stakedAmountFormatted: formatEther(parsedStakeInfo?.amount ?? 0n),
    lockEndTime: parsedStakeInfo?.lockEndTime ?? 0n,
    // Tier data
    tier: currentTier,
    tierName: tierDetails.name,
    multiplier: Number(parsedTierInfo?.multiplier ?? 1n),
    earlyAccessHours: Number(parsedTierInfo?.earlyAccessHours ?? 0n),
    apy: tierDetails.apy,
    nextTierThreshold: parsedTierInfo?.nextTierThreshold ?? 0n,
    // Rewards
    pendingRewards: pendingRewards as bigint | undefined ?? 0n,
    pendingRewardsFormatted: formatEther((pendingRewards as bigint | undefined) ?? 0n),
    // Actions
    refetch,
  };
}

export function useStakingStats() {
  const chainId = useChainId();

  let stakingAddress: Address | undefined;
  try {
    stakingAddress = getContractAddress("stakingController", chainId);
  } catch {
    stakingAddress = undefined;
  }

  const { data: totalStaked } = useReadContract({
    address: stakingAddress,
    abi: STAKING_CONTROLLER_ABI,
    functionName: "totalStaked",
    query: {
      enabled: !!stakingAddress,
    },
  });

  const { data: stakerCount } = useReadContract({
    address: stakingAddress,
    abi: STAKING_CONTROLLER_ABI,
    functionName: "stakerCount",
    query: {
      enabled: !!stakingAddress,
    },
  });

  return {
    totalStaked: (totalStaked as bigint | undefined) ?? 0n,
    totalStakedFormatted: formatEther((totalStaked as bigint | undefined) ?? 0n),
    stakerCount: Number((stakerCount as bigint | undefined) ?? 0n),
  };
}

export function useStake() {
  const chainId = useChainId();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  let stakingAddress: Address | undefined;
  try {
    stakingAddress = getContractAddress("stakingController", chainId);
  } catch {
    stakingAddress = undefined;
  }

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const stake = (amount: string) => {
    if (!stakingAddress) {
      throw new Error("Staking not available on this chain");
    }
    writeContract({
      address: stakingAddress,
      abi: STAKING_CONTROLLER_ABI,
      functionName: "stake",
      args: [parseEther(amount)],
    });
  };

  const stakeWithLock = (amount: string, lockDays: number) => {
    if (!stakingAddress) {
      throw new Error("Staking not available on this chain");
    }
    writeContract({
      address: stakingAddress,
      abi: STAKING_CONTROLLER_ABI,
      functionName: "stakeWithLock",
      args: [parseEther(amount), BigInt(lockDays)],
    });
  };

  return {
    stake,
    stakeWithLock,
    isPending,
    isConfirming,
    isSuccess,
    error,
    txHash: hash,
  };
}

export function useUnstake() {
  const chainId = useChainId();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  let stakingAddress: Address | undefined;
  try {
    stakingAddress = getContractAddress("stakingController", chainId);
  } catch {
    stakingAddress = undefined;
  }

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const unstake = (amount: string) => {
    if (!stakingAddress) {
      throw new Error("Staking not available on this chain");
    }
    writeContract({
      address: stakingAddress,
      abi: STAKING_CONTROLLER_ABI,
      functionName: "unstake",
      args: [parseEther(amount)],
    });
  };

  return {
    unstake,
    isPending,
    isConfirming,
    isSuccess,
    error,
    txHash: hash,
  };
}

export function useClaimRewards() {
  const chainId = useChainId();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  let stakingAddress: Address | undefined;
  try {
    stakingAddress = getContractAddress("stakingController", chainId);
  } catch {
    stakingAddress = undefined;
  }

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const claimRewards = () => {
    if (!stakingAddress) {
      throw new Error("Staking not available on this chain");
    }
    writeContract({
      address: stakingAddress,
      abi: STAKING_CONTROLLER_ABI,
      functionName: "claimRewards",
    });
  };

  const compoundRewards = () => {
    if (!stakingAddress) {
      throw new Error("Staking not available on this chain");
    }
    writeContract({
      address: stakingAddress,
      abi: STAKING_CONTROLLER_ABI,
      functionName: "compoundRewards",
    });
  };

  return {
    claimRewards,
    compoundRewards,
    isPending,
    isConfirming,
    isSuccess,
    error,
    txHash: hash,
  };
}
