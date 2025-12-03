// Staking Controller ABI
export const STAKING_CONTROLLER_ABI = [
  // View functions
  {
    name: "getStakeInfo",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "amount", type: "uint256" },
          { name: "tier", type: "uint8" },
          { name: "stakedAt", type: "uint256" },
          { name: "lockEndTime", type: "uint256" },
          { name: "lastClaimTime", type: "uint256" },
          { name: "pendingRewards", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getUserTierInfo",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "tier", type: "uint8" },
          { name: "tierName", type: "string" },
          { name: "stakedAmount", type: "uint256" },
          { name: "nextTierThreshold", type: "uint256" },
          { name: "multiplier", type: "uint256" },
          { name: "earlyAccessHours", type: "uint256" },
          { name: "apyBps", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getAllocationMultiplier",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getEarlyAccessHours",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "calculatePendingRewards",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getTierThreshold",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "tier", type: "uint8" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "totalStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "stakerCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  // Write functions
  {
    name: "stake",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },
  {
    name: "stakeWithLock",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "lockDays", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "unstake",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },
  {
    name: "claimRewards",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    name: "compoundRewards",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  // Events
  {
    name: "Staked",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "tier", type: "uint8", indexed: false },
    ],
  },
  {
    name: "Unstaked",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "RewardsClaimed",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "TierChanged",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "oldTier", type: "uint8", indexed: false },
      { name: "newTier", type: "uint8", indexed: false },
    ],
  },
] as const;
