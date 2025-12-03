"use client";

import { useReadContract, useWriteContract, useChainId, useAccount, useWaitForTransactionReceipt } from "wagmi";
import { formatEther, parseEther, type Address, maxUint256 } from "viem";
import { PCGF_TOKEN_ABI } from "@/lib/web3/abis";
import { getContractAddress } from "@/lib/web3/contracts";

export function usePCGFToken() {
  const chainId = useChainId();
  const { address: userAddress, isConnected } = useAccount();

  let tokenAddress: Address | undefined;
  try {
    tokenAddress = getContractAddress("pcgfToken", chainId);
  } catch {
    tokenAddress = undefined;
  }

  const { data: balance, isLoading: isLoadingBalance, refetch: refetchBalance } = useReadContract({
    address: tokenAddress,
    abi: PCGF_TOKEN_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: isConnected && !!userAddress && !!tokenAddress,
    },
  });

  const { data: totalSupply } = useReadContract({
    address: tokenAddress,
    abi: PCGF_TOKEN_ABI,
    functionName: "totalSupply",
    query: {
      enabled: !!tokenAddress,
    },
  });

  const { data: buyTax } = useReadContract({
    address: tokenAddress,
    abi: PCGF_TOKEN_ABI,
    functionName: "buyTaxBps",
    query: {
      enabled: !!tokenAddress,
    },
  });

  const { data: sellTax } = useReadContract({
    address: tokenAddress,
    abi: PCGF_TOKEN_ABI,
    functionName: "sellTaxBps",
    query: {
      enabled: !!tokenAddress,
    },
  });

  const { data: transferTax } = useReadContract({
    address: tokenAddress,
    abi: PCGF_TOKEN_ABI,
    functionName: "transferTaxBps",
    query: {
      enabled: !!tokenAddress,
    },
  });

  return {
    isConnected,
    isLoading: isLoadingBalance,
    tokenAddress,
    // Balance
    balance: (balance as bigint | undefined) ?? 0n,
    balanceFormatted: formatEther((balance as bigint | undefined) ?? 0n),
    // Token info
    totalSupply: (totalSupply as bigint | undefined) ?? 0n,
    totalSupplyFormatted: formatEther((totalSupply as bigint | undefined) ?? 0n),
    // Tax rates (in basis points, divide by 100 for percentage)
    buyTaxBps: Number((buyTax as number | undefined) ?? 0),
    sellTaxBps: Number((sellTax as number | undefined) ?? 0),
    transferTaxBps: Number((transferTax as number | undefined) ?? 0),
    buyTaxPercent: Number((buyTax as number | undefined) ?? 0) / 100,
    sellTaxPercent: Number((sellTax as number | undefined) ?? 0) / 100,
    transferTaxPercent: Number((transferTax as number | undefined) ?? 0) / 100,
    // Actions
    refetch: refetchBalance,
  };
}

export function useTokenAllowance(spenderAddress: Address | undefined) {
  const chainId = useChainId();
  const { address: userAddress, isConnected } = useAccount();

  let tokenAddress: Address | undefined;
  try {
    tokenAddress = getContractAddress("pcgfToken", chainId);
  } catch {
    tokenAddress = undefined;
  }

  const { data: allowance, isLoading, refetch } = useReadContract({
    address: tokenAddress,
    abi: PCGF_TOKEN_ABI,
    functionName: "allowance",
    args: userAddress && spenderAddress ? [userAddress, spenderAddress] : undefined,
    query: {
      enabled: isConnected && !!userAddress && !!spenderAddress && !!tokenAddress,
    },
  });

  return {
    allowance: (allowance as bigint | undefined) ?? 0n,
    allowanceFormatted: formatEther((allowance as bigint | undefined) ?? 0n),
    isLoading,
    refetch,
  };
}

export function useApprove(spenderAddress: Address | undefined) {
  const chainId = useChainId();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  let tokenAddress: Address | undefined;
  try {
    tokenAddress = getContractAddress("pcgfToken", chainId);
  } catch {
    tokenAddress = undefined;
  }

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const approve = (amount: string) => {
    if (!tokenAddress || !spenderAddress) {
      throw new Error("Token or spender address not available");
    }
    writeContract({
      address: tokenAddress,
      abi: PCGF_TOKEN_ABI,
      functionName: "approve",
      args: [spenderAddress, parseEther(amount)],
    });
  };

  const approveMax = () => {
    if (!tokenAddress || !spenderAddress) {
      throw new Error("Token or spender address not available");
    }
    writeContract({
      address: tokenAddress,
      abi: PCGF_TOKEN_ABI,
      functionName: "approve",
      args: [spenderAddress, maxUint256],
    });
  };

  return {
    approve,
    approveMax,
    isPending,
    isConfirming,
    isSuccess,
    error,
    txHash: hash,
  };
}

/**
 * Hook to get user's PCGF token balance
 */
export function useTokenBalance() {
  const chainId = useChainId();
  const { address: userAddress, isConnected } = useAccount();

  let tokenAddress: Address | undefined;
  try {
    tokenAddress = getContractAddress("pcgfToken", chainId);
  } catch {
    tokenAddress = undefined;
  }

  const { data: balance, isLoading, refetch } = useReadContract({
    address: tokenAddress,
    abi: PCGF_TOKEN_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: isConnected && !!userAddress && !!tokenAddress,
    },
  });

  return {
    balance: (balance as bigint | undefined) ?? 0n,
    balanceFormatted: formatEther((balance as bigint | undefined) ?? 0n),
    isLoading,
    refetch,
  };
}

/**
 * Hook to approve PCGF tokens for staking contract
 */
export function useTokenApprove() {
  const chainId = useChainId();
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();

  let tokenAddress: Address | undefined;
  let stakingAddress: Address | undefined;
  try {
    tokenAddress = getContractAddress("pcgfToken", chainId);
    stakingAddress = getContractAddress("stakingController", chainId);
  } catch {
    tokenAddress = undefined;
    stakingAddress = undefined;
  }

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const approve = async (amount: bigint) => {
    if (!tokenAddress || !stakingAddress) {
      throw new Error("Token or staking address not available");
    }
    await writeContractAsync({
      address: tokenAddress,
      abi: PCGF_TOKEN_ABI,
      functionName: "approve",
      args: [stakingAddress, amount],
    });
  };

  const approveMax = async () => {
    if (!tokenAddress || !stakingAddress) {
      throw new Error("Token or staking address not available");
    }
    await writeContractAsync({
      address: tokenAddress,
      abi: PCGF_TOKEN_ABI,
      functionName: "approve",
      args: [stakingAddress, maxUint256],
    });
  };

  return {
    approve,
    approveMax,
    isPending,
    isConfirming,
    isSuccess,
    error,
    txHash: hash,
  };
}
