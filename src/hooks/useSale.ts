"use client";

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { formatEther, parseEther, type Address } from "viem";
import { LAUNCHPAD_SALE_ABI } from "@/lib/web3/abis";

export interface SaleConfig {
  saleToken: Address;
  paymentToken: Address;
  tokenPrice: bigint;
  softCap: bigint;
  hardCap: bigint;
  minContribution: bigint;
  maxContribution: bigint;
  totalTokens: bigint;
  whitelistStart: bigint;
  publicStart: bigint;
  saleEnd: bigint;
  minTier: number;
  platformFeeBps: number;
}

export interface SaleStatus {
  isActive: boolean;
  isWhitelistPeriod: boolean;
  isPublicPeriod: boolean;
  hasEnded: boolean;
  isFinalized: boolean;
  isCancelled: boolean;
  softCapMet: boolean;
  hardCapMet: boolean;
}

export interface SaleProgress {
  raised: bigint;
  tokensAllocated: bigint;
  participants_: bigint;
  percentFilled: bigint;
}

export interface SaleTiming {
  whitelistStart: bigint;
  publicStart: bigint;
  saleEnd: bigint;
  currentTime: bigint;
  timeUntilStart: bigint;
  timeUntilEnd: bigint;
}

export interface UserContribution {
  contributed: bigint;
  allocation: bigint;
  claimed: boolean;
  refunded: boolean;
  effectiveMaxContribution: bigint;
}

export interface ParticipationStatus {
  canContribute: boolean;
  reason: string;
  userTier: number;
  maxAllocation: bigint;
  remainingAllocation: bigint;
}

export function useSaleInfo(saleAddress: Address | undefined) {
  const { data: config, isLoading: isLoadingConfig } = useReadContract({
    address: saleAddress,
    abi: LAUNCHPAD_SALE_ABI,
    functionName: "getConfig",
    query: {
      enabled: !!saleAddress,
    },
  });

  const { data: status, isLoading: isLoadingStatus, refetch: refetchStatus } = useReadContract({
    address: saleAddress,
    abi: LAUNCHPAD_SALE_ABI,
    functionName: "getSaleStatus",
    query: {
      enabled: !!saleAddress,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  const { data: progress, isLoading: isLoadingProgress, refetch: refetchProgress } = useReadContract({
    address: saleAddress,
    abi: LAUNCHPAD_SALE_ABI,
    functionName: "getSaleProgress",
    query: {
      enabled: !!saleAddress,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  const { data: timing, refetch: refetchTiming } = useReadContract({
    address: saleAddress,
    abi: LAUNCHPAD_SALE_ABI,
    functionName: "getSaleTiming",
    query: {
      enabled: !!saleAddress,
      refetchInterval: 1000, // Refetch every second for countdown
    },
  });

  const refetch = () => {
    refetchStatus();
    refetchProgress();
    refetchTiming();
  };

  const parsedConfig = config as SaleConfig | undefined;
  const parsedStatus = status as SaleStatus | undefined;
  const parsedProgress = progress as SaleProgress | undefined;
  const parsedTiming = timing as SaleTiming | undefined;

  return {
    isLoading: isLoadingConfig || isLoadingStatus || isLoadingProgress,
    // Config
    config: parsedConfig,
    tokenPrice: parsedConfig?.tokenPrice ?? 0n,
    tokenPriceFormatted: formatEther(parsedConfig?.tokenPrice ?? 0n),
    hardCap: parsedConfig?.hardCap ?? 0n,
    hardCapFormatted: formatEther(parsedConfig?.hardCap ?? 0n),
    softCap: parsedConfig?.softCap ?? 0n,
    softCapFormatted: formatEther(parsedConfig?.softCap ?? 0n),
    minContribution: parsedConfig?.minContribution ?? 0n,
    maxContribution: parsedConfig?.maxContribution ?? 0n,
    totalTokens: parsedConfig?.totalTokens ?? 0n,
    // Status
    status: parsedStatus,
    isActive: parsedStatus?.isActive ?? false,
    isWhitelistPeriod: parsedStatus?.isWhitelistPeriod ?? false,
    isPublicPeriod: parsedStatus?.isPublicPeriod ?? false,
    hasEnded: parsedStatus?.hasEnded ?? false,
    isFinalized: parsedStatus?.isFinalized ?? false,
    isCancelled: parsedStatus?.isCancelled ?? false,
    softCapMet: parsedStatus?.softCapMet ?? false,
    hardCapMet: parsedStatus?.hardCapMet ?? false,
    // Progress
    progress: parsedProgress,
    raised: parsedProgress?.raised ?? 0n,
    raisedFormatted: formatEther(parsedProgress?.raised ?? 0n),
    participants: Number(parsedProgress?.participants_ ?? 0n),
    percentFilled: Number(parsedProgress?.percentFilled ?? 0n),
    // Timing
    timing: parsedTiming,
    whitelistStart: parsedTiming?.whitelistStart ?? 0n,
    publicStart: parsedTiming?.publicStart ?? 0n,
    saleEnd: parsedTiming?.saleEnd ?? 0n,
    timeUntilStart: parsedTiming?.timeUntilStart ?? 0n,
    timeUntilEnd: parsedTiming?.timeUntilEnd ?? 0n,
    // Actions
    refetch,
  };
}

export function useUserContribution(saleAddress: Address | undefined) {
  const { address: userAddress, isConnected } = useAccount();

  const { data: contribution, isLoading, refetch } = useReadContract({
    address: saleAddress,
    abi: LAUNCHPAD_SALE_ABI,
    functionName: "getUserContribution",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: isConnected && !!userAddress && !!saleAddress,
    },
  });

  const { data: participationStatus, refetch: refetchParticipation } = useReadContract({
    address: saleAddress,
    abi: LAUNCHPAD_SALE_ABI,
    functionName: "canParticipate",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: isConnected && !!userAddress && !!saleAddress,
    },
  });

  const parsedContribution = contribution as UserContribution | undefined;
  const parsedParticipation = participationStatus as ParticipationStatus | undefined;

  return {
    isConnected,
    isLoading,
    // User contribution
    contributed: parsedContribution?.contributed ?? 0n,
    contributedFormatted: formatEther(parsedContribution?.contributed ?? 0n),
    allocation: parsedContribution?.allocation ?? 0n,
    allocationFormatted: formatEther(parsedContribution?.allocation ?? 0n),
    claimed: parsedContribution?.claimed ?? false,
    refunded: parsedContribution?.refunded ?? false,
    effectiveMaxContribution: parsedContribution?.effectiveMaxContribution ?? 0n,
    // Participation status
    canContribute: parsedParticipation?.canContribute ?? false,
    reason: parsedParticipation?.reason ?? "",
    userTier: parsedParticipation?.userTier ?? 0,
    maxAllocation: parsedParticipation?.maxAllocation ?? 0n,
    remainingAllocation: parsedParticipation?.remainingAllocation ?? 0n,
    // Actions
    refetch: () => {
      refetch();
      refetchParticipation();
    },
  };
}

export function useContribute(saleAddress: Address | undefined) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const contribute = (amount: string, referralCode = 0) => {
    if (!saleAddress) {
      throw new Error("Sale address not provided");
    }
    writeContract({
      address: saleAddress,
      abi: LAUNCHPAD_SALE_ABI,
      functionName: "contribute",
      args: [BigInt(referralCode)],
      value: parseEther(amount),
    });
  };

  const contributeERC20 = (amount: string, referralCode = 0) => {
    if (!saleAddress) {
      throw new Error("Sale address not provided");
    }
    writeContract({
      address: saleAddress,
      abi: LAUNCHPAD_SALE_ABI,
      functionName: "contributeERC20",
      args: [parseEther(amount), BigInt(referralCode)],
    });
  };

  return {
    contribute,
    contributeERC20,
    isPending,
    isConfirming,
    isSuccess,
    error,
    txHash: hash,
  };
}

export function useClaimTokens(saleAddress: Address | undefined) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const claimTokens = () => {
    if (!saleAddress) {
      throw new Error("Sale address not provided");
    }
    writeContract({
      address: saleAddress,
      abi: LAUNCHPAD_SALE_ABI,
      functionName: "claimTokens",
    });
  };

  return {
    claimTokens,
    isPending,
    isConfirming,
    isSuccess,
    error,
    txHash: hash,
  };
}

export function useRefund(saleAddress: Address | undefined) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const refund = () => {
    if (!saleAddress) {
      throw new Error("Sale address not provided");
    }
    writeContract({
      address: saleAddress,
      abi: LAUNCHPAD_SALE_ABI,
      functionName: "refund",
    });
  };

  return {
    refund,
    isPending,
    isConfirming,
    isSuccess,
    error,
    txHash: hash,
  };
}
