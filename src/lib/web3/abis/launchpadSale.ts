// Launchpad Sale ABI
export const LAUNCHPAD_SALE_ABI = [
  // View functions
  {
    name: "getConfig",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "saleToken", type: "address" },
          { name: "paymentToken", type: "address" },
          { name: "tokenPrice", type: "uint256" },
          { name: "softCap", type: "uint256" },
          { name: "hardCap", type: "uint256" },
          { name: "minContribution", type: "uint256" },
          { name: "maxContribution", type: "uint256" },
          { name: "totalTokens", type: "uint256" },
          { name: "whitelistStart", type: "uint256" },
          { name: "publicStart", type: "uint256" },
          { name: "saleEnd", type: "uint256" },
          { name: "minTier", type: "uint8" },
          { name: "platformFeeBps", type: "uint16" },
        ],
      },
    ],
  },
  {
    name: "getSaleStatus",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "isActive", type: "bool" },
          { name: "isWhitelistPeriod", type: "bool" },
          { name: "isPublicPeriod", type: "bool" },
          { name: "hasEnded", type: "bool" },
          { name: "isFinalized", type: "bool" },
          { name: "isCancelled", type: "bool" },
          { name: "softCapMet", type: "bool" },
          { name: "hardCapMet", type: "bool" },
        ],
      },
    ],
  },
  {
    name: "getSaleProgress",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "raised", type: "uint256" },
          { name: "tokensAllocated", type: "uint256" },
          { name: "participants_", type: "uint256" },
          { name: "percentFilled", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getSaleTiming",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "whitelistStart", type: "uint256" },
          { name: "publicStart", type: "uint256" },
          { name: "saleEnd", type: "uint256" },
          { name: "currentTime", type: "uint256" },
          { name: "timeUntilStart", type: "uint256" },
          { name: "timeUntilEnd", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getUserContribution",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "contributed", type: "uint256" },
          { name: "allocation", type: "uint256" },
          { name: "claimed", type: "bool" },
          { name: "refunded", type: "bool" },
          { name: "effectiveMaxContribution", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "canParticipate",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "canContribute", type: "bool" },
          { name: "reason", type: "string" },
          { name: "userTier", type: "uint8" },
          { name: "maxAllocation", type: "uint256" },
          { name: "remainingAllocation", type: "uint256" },
        ],
      },
    ],
  },
  // Write functions
  {
    name: "contribute",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "referralCode", type: "uint256" }],
    outputs: [],
  },
  {
    name: "contributeERC20",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "referralCode", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "claimTokens",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    name: "refund",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  // Events
  {
    name: "Contributed",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "allocation", type: "uint256", indexed: false },
    ],
  },
  {
    name: "TokensClaimed",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "Refunded",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "SaleFinalized",
    type: "event",
    inputs: [
      { name: "totalRaised", type: "uint256", indexed: false },
      { name: "platformFee", type: "uint256", indexed: false },
    ],
  },
] as const;
