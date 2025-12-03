# PC GameFi Platform Architecture

> **Version**: 2.0.0
> **Last Updated**: 2025-11-26
> **Status**: Production-Ready IGO Launchpad
> **Wallet Stack**: Reown AppKit (unified across GROWSZ biosphere)

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Smart Contract Layer](#smart-contract-layer)
4. [Backend Services](#backend-services)
5. [Frontend Architecture](#frontend-architecture)
6. [Authentication (NuAuth)](#authentication-nuauth)
7. [Pricing & Monetization](#pricing--monetization)
8. [Data Flow](#data-flow)
9. [Deployment](#deployment)

---

## Overview

PC GameFi is a decentralized Initial Game Offering (IGO) launchpad platform built on the GROWSZ Biosphere. It enables gaming projects to raise funds through token sales while providing investors with staking rewards, tiered allocation systems, and early access to promising GameFi projects.

### Core Value Proposition

```
┌─────────────────────────────────────────────────────────────────┐
│                      PC GAMEFI PLATFORM                         │
├─────────────────────────────────────────────────────────────────┤
│  For Projects:                    For Investors:                │
│  ├─ Token deployment              ├─ Staking rewards (5-25% APY)│
│  ├─ Launchpad sale management     ├─ Tiered allocation system   │
│  ├─ Vesting schedules             ├─ Early access to sales      │
│  └─ Multi-chain support           └─ Guaranteed allocations     │
└─────────────────────────────────────────────────────────────────┘
```

---

## System Architecture

### High-Level Architecture

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Next.js    │  │Reown AppKit  │  │    Wagmi     │  │     Viem     │   │
│  │   Frontend   │  │  (350+ Wallets)│  │  React Hooks │  │  EVM Client  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                            BACKEND LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    GROWSZ Backend Suite                              │   │
│  │                                                                       │   │
│  │  ┌─────────────────────────────────────────────────────────────┐    │   │
│  │  │  NuBase (Gateway/API Fabric)                                 │    │   │
│  │  │  ├─ Auth (NuAuth v1.5)                                       │    │   │
│  │  │  ├─ RBAC (Role-Based Access Control)                         │    │   │
│  │  │  └─ API Composition & Routing                                │    │   │
│  │  └─────────────────────────────────────────────────────────────┘    │   │
│  │                           │ composes over                            │   │
│  │  ┌─────────────────────────────────────────────────────────────┐    │   │
│  │  │  Dbity (Typed Data Kernel)                                   │    │   │
│  │  │  ├─ Schemas (TypeBox/Zod validation)                         │    │   │
│  │  │  ├─ Migrations (version-controlled)                          │    │   │
│  │  │  └─ Queries (type-safe database access)                      │    │   │
│  │  └─────────────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐                   │
│  │   Supabase    │  │  ClickHouse   │  │    Stripe     │                   │
│  │  (PostgreSQL) │  │  (Analytics)  │  │  (Payments)   │                   │
│  └───────────────┘  └───────────────┘  └───────────────┘                   │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                          BLOCKCHAIN LAYER                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     Smart Contracts (Solidity)                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │  PCGFToken  │  │  Staking    │  │  Launchpad  │  │   Vesting   │ │   │
│  │  │   (ERC20)   │  │ Controller  │  │    Sale     │  │ Controller  │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │  ┌─────────────┐  ┌─────────────┐                                   │   │
│  │  │  Launchpad  │  │   Token     │                                   │   │
│  │  │   Factory   │  │  Templates  │                                   │   │
│  │  └─────────────┘  └─────────────┘                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  Supported Chains: Ethereum, Base, Arbitrum, Polygon, BSC, Avalanche       │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Smart Contract Layer

### Contract Overview

| Contract | Purpose | Key Features |
|----------|---------|--------------|
| **PCGFToken** | Platform utility token | ERC20 with configurable taxes (buy/sell/transfer) |
| **StakingController** | Staking management | 5-tier system, APY rewards, lock periods |
| **LaunchpadSale** | Individual IGO sales | Soft/hard caps, whitelist, refunds |
| **LaunchpadFactory** | Sale deployment | Creates new LaunchpadSale instances |
| **VestingController** | Token vesting | Linear/cliff vesting schedules |
| **LaunchpadTokenStandard** | Project token template | Standard taxable ERC20 |
| **LaunchpadTokenZeroTax** | Project token template | Zero-tax ERC20 variant |

### Staking Tier System (Seedify-Style)

PC GameFi uses a **9-tier staking system** inspired by Seedify, where staking PCGF tokens grants **allocation weight** for IGO participation. Unlike subscription models, this creates genuine token utility and community alignment.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     PCGF STAKING TIERS (Allocation-Based)                        │
├──────────┬────────────┬──────────────┬───────────────┬─────────────────────────┤
│   Tier   │  Required  │ Pool Weight  │ Early Access  │   Guaranteed Allocation │
├──────────┼────────────┼──────────────┼───────────────┼─────────────────────────┤
│ Beginner │     250    │     1 pt     │     None      │   Lottery (no guarantee)│
│  Rookie  │   1,000    │     4 pts    │     None      │   Lottery (no guarantee)│
│ Scholar  │   2,500    │    10 pts    │   6 hours     │   Guaranteed (base)     │
│  Cadet   │   5,000    │    22 pts    │   6 hours     │   Guaranteed            │
│ Captain  │  15,000    │    75 pts    │  12 hours     │   Guaranteed            │
│  Major   │  35,000    │   190 pts    │  12 hours     │   Guaranteed            │
│ General  │  75,000    │   450 pts    │  24 hours     │   Guaranteed (priority) │
│ Marshal  │ 150,000    │ 1,000 pts    │  24 hours     │   Guaranteed (priority) │
│ Quantum  │ 350,000    │ 2,500 pts    │  48 hours     │   Guaranteed (max)      │
└──────────┴────────────┴──────────────┴───────────────┴─────────────────────────┘

Pool Weight Formula: User's allocation = (User Pool Points / Total Pool Points) × Sale Allocation
```

**Key Differences from Subscription Model:**
- ✅ **No monthly fees** for investors - stake once, participate forever
- ✅ **Token utility** - PCGF has real demand from staking
- ✅ **Fair distribution** - Allocations based on commitment, not payments
- ✅ **Community alignment** - Stakers have skin in the game

### Smart Contract ABIs (Frontend Integration)

Located in `src/lib/web3/abis/`:

```typescript
// src/lib/web3/abis/index.ts
export { PCGF_TOKEN_ABI } from './pcgfToken'
export { STAKING_CONTROLLER_ABI } from './stakingController'
export { LAUNCHPAD_SALE_ABI } from './launchpadSale'
```

### React Hooks for Contract Interaction

Located in `src/hooks/`:

```typescript
// Staking Hooks
useStakingInfo()      // Get user's stake info, tier, rewards
useStakingStats()     // Get platform-wide staking stats
useStake()            // Stake PCGF tokens
useUnstake()          // Unstake PCGF tokens
useClaimRewards()     // Claim pending rewards

// Token Hooks
usePCGFToken()        // Get token info (supply, taxes)
useTokenBalance()     // Get user's PCGF balance
useTokenApprove()     // Approve tokens for staking

// Sale Hooks
useSaleInfo()         // Get sale parameters
useUserContribution() // Get user's contribution
useContribute()       // Contribute to sale
useClaimTokens()      // Claim purchased tokens
useRefund()           // Request refund (if sale fails)
```

---

## Backend Services

### GROWSZ Backend Suite

The platform leverages the GROWSZ Backend Suite - a two-layer architecture where **NuBase** provides the gateway/API fabric and **Dbity** provides the typed data kernel.

#### Dbity (Typed Data Kernel)

Dbity is the foundational data layer - think of it like Prisma or Drizzle for the GROWSZ biosphere. It provides:

- **Typed schemas** with TypeBox/Zod validation
- **Version-controlled migrations**
- **Type-safe queries** with full TypeScript inference

```typescript
// packages/dbity-core/src/schemas/project.ts
import { Type } from '@sinclair/typebox'

export const ProjectSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String({ minLength: 1 }),
  ticker: Type.String({ pattern: '^[A-Z]{2,6}$' }),
  status: Type.Union([
    Type.Literal('upcoming'),
    Type.Literal('live'),
    Type.Literal('ended')
  ]),
  total_raise: Type.Number({ minimum: 0 }),
  blockchain: Type.String()
})

// packages/dbity-core/src/queries/projects.ts
export const projectQueries = {
  findLive: () => db.from('projects').select('*').eq('status', 'live'),
  findByTicker: (ticker: string) => db.from('projects').select('*').eq('ticker', ticker).single()
}
```

#### NuBase (Gateway/API Fabric)

NuBase composes over Dbity to provide the API layer - think of it like Supabase's API layer but for the entire GROWSZ ecosystem. It provides:

- **Auth (NuAuth v1.5)** - unified identity across ecosystems
- **RBAC** - role-based access control
- **API composition** - combines Dbity queries with business logic

```typescript
// packages/nubase-core/src/client.ts
import { NuBaseClient } from '@growsz/nubase-core'

const nubase = new NuBaseClient({
  dbity: dbityClient,  // Composes over dbity
  auth: nuAuthConfig,
  adapters: {
    supabase: { url, anonKey },
    clickhouse: { host, database }
  }
})

// NuBase provides the API fabric
await nubase.projects.findLive()              // Uses dbity under the hood
await nubase.analytics.saleContributions()   // ClickHouse queries
await nubase.auth.verifySession(token)       // NuAuth integration
```

**Layer Relationship:**
```
┌─────────────────────────────────────────────────┐
│           Application (PC GameFi)               │
├─────────────────────────────────────────────────┤
│  NuBase (Gateway)                               │
│  - API routes, RBAC, Auth                       │
│  - Composes dbity queries with business logic   │
├─────────────────────────────────────────────────┤
│  Dbity (Data Kernel)                            │
│  - Schemas, Migrations, Type-safe queries       │
│  - Direct database access                       │
├─────────────────────────────────────────────────┤
│  Supabase / ClickHouse / DynamoDB               │
└─────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Core Tables (Supabase/PostgreSQL)

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE NOT NULL,
  email TEXT,
  subscription_tier TEXT DEFAULT 'free',
  subscription_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  ticker TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  total_raise NUMERIC NOT NULL,
  current_raise NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'upcoming', -- upcoming, live, ended, cancelled
  blockchain TEXT NOT NULL,
  sale_contract_address TEXT,
  token_contract_address TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  plan_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE listing_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES users(id),
  listing_type TEXT NOT NULL, -- standard, priority, featured
  original_price NUMERIC NOT NULL,
  discount_amount NUMERIC DEFAULT 0,
  final_price NUMERIC NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics Tables (ClickHouse)

CREATE TABLE sale_contributions (
  event_id UUID,
  sale_address String,
  contributor_address String,
  amount Decimal(38, 18),
  tier UInt8,
  timestamp DateTime,
  block_number UInt64,
  tx_hash String
) ENGINE = MergeTree()
ORDER BY (sale_address, timestamp);

CREATE TABLE staking_events (
  event_id UUID,
  user_address String,
  event_type Enum('stake', 'unstake', 'claim', 'compound'),
  amount Decimal(38, 18),
  new_tier UInt8,
  timestamp DateTime,
  block_number UInt64,
  tx_hash String
) ENGINE = MergeTree()
ORDER BY (user_address, timestamp);
```

---

## Frontend Architecture

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── pricing/
│   │   └── page.tsx             # Pricing page
│   ├── projects/
│   │   ├── page.tsx             # Projects listing
│   │   └── [id]/page.tsx        # Project detail
│   └── stake/
│       └── page.tsx             # Staking dashboard
│
├── components/
│   ├── Navbar.tsx               # Navigation with wallet connect
│   ├── ThemeToggle.tsx          # Dark/light mode
│   │
│   ├── pricing/                 # Pricing components
│   │   ├── PricingSection.tsx   # Subscription tiers
│   │   ├── ListingFeesSection.tsx
│   │   ├── FeeCalculator.tsx    # Interactive calculator
│   │   ├── ContractPackages.tsx # Contract templates
│   │   └── FAQ.tsx
│   │
│   ├── providers/
│   │   └── Web3Provider.tsx     # Wagmi + RainbowKit + Query
│   │
│   ├── sections/                # Homepage sections
│   │   ├── Hero100vh.tsx
│   │   ├── Stats100vh.tsx       # Dynamic staking stats
│   │   ├── Tokenomics100vh.tsx  # Dynamic token data
│   │   └── ...
│   │
│   └── staking/                 # Staking components
│       ├── StakingDashboard.tsx # Stake/unstake UI
│       ├── StakingTiers.tsx     # Tier visualization
│       └── StakingStats.tsx     # Platform stats
│
├── hooks/                       # Custom React hooks
│   ├── index.ts
│   ├── useStaking.ts            # Staking contract hooks
│   ├── useSale.ts               # Sale contract hooks
│   └── useToken.ts              # Token contract hooks
│
├── lib/
│   ├── constants.ts             # App constants, nav links
│   ├── pricing.ts               # Pricing logic & data
│   ├── types.ts                 # TypeScript types
│   │
│   └── web3/
│       ├── config.ts            # Wagmi + RainbowKit config
│       ├── contracts.ts         # Contract addresses, tiers
│       └── abis/                # Contract ABIs
│           ├── index.ts
│           ├── pcgfToken.ts
│           ├── stakingController.ts
│           └── launchpadSale.ts
│
└── styles/
    └── globals.css              # Tailwind + custom styles
```

### Web3 Provider Setup (Reown AppKit)

PC GameFi uses **Reown AppKit** (formerly WalletConnect AppKit) for wallet connections, unified across the GROWSZ biosphere. Each ecosystem has its own Reown projectId but shares configuration patterns.

```typescript
// src/config/appkit.config.ts
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, base, bsc, polygon, arbitrum, avalanche, optimism } from '@reown/appkit/networks'

export const PCGAMEFI_PROJECT_ID = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

export const SUPPORTED_NETWORKS = [mainnet, base, bsc, polygon, arbitrum, avalanche, optimism]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId: PCGAMEFI_PROJECT_ID,
  networks: SUPPORTED_NETWORKS,
})

// src/components/providers/Web3Provider.tsx
'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { wagmiAdapter, wagmiConfig, PCGAMEFI_PROJECT_ID, SUPPORTED_NETWORKS } from '@/config'

// Initialize AppKit once (singleton pattern)
if (typeof window !== 'undefined' && PCGAMEFI_PROJECT_ID) {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId: PCGAMEFI_PROJECT_ID,
    networks: SUPPORTED_NETWORKS,
    features: {
      email: true,
      socials: ['google', 'discord', 'x'],
      onramp: true,
    },
    themeMode: 'dark',
  })
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

**Reown AppKit Features:**
- 350+ wallet support (MetaMask, WalletConnect, Coinbase, etc.)
- Email/social login (Google, Discord, X)
- On-ramp support (buy crypto with fiat)
- Multi-chain support (7 EVM chains)
- Unified UI across GROWSZ biosphere

### Dynamic Data Integration

Components that fetch on-chain data:

| Component | Data Source | Hook |
|-----------|-------------|------|
| `Stats100vh` | StakingController | `useStakingStats()` |
| `Tokenomics100vh` | PCGFToken | `usePCGFToken()` |
| `StakingDashboard` | StakingController | `useStakingInfo()`, `useStake()` |
| `ProjectCard` | LaunchpadSale | `useSaleInfo()` |

---

## Authentication (NuAuth)

### NuAuth v1.5 Integration

NuAuth is GROWSZ's unified identity service supporting multiple authentication methods:

```
┌────────────────────────────────────────────────────────────────────────┐
│                            NuAuth v1.5                                  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │    SIWE     │  │   OAuth2    │  │    Email    │  │   Passkey   │   │
│  │ (Sign-In    │  │  (Google,   │  │   Magic     │  │  (WebAuthn) │   │
│  │  w/ Ether)  │  │  Discord)   │  │   Link      │  │             │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│         │               │               │               │              │
│         └───────────────┴───────────────┴───────────────┘              │
│                                 │                                       │
│                                 ▼                                       │
│                    ┌─────────────────────────┐                         │
│                    │   Unified User Profile  │                         │
│                    │   - wallet_address      │                         │
│                    │   - email               │                         │
│                    │   - subscription_tier   │                         │
│                    │   - linked_accounts     │                         │
│                    └─────────────────────────┘                         │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Authentication Flow

```typescript
// Web3 Authentication (Primary)
// Using Reown AppKit's WalletButton

import { WalletButton } from '@/components/WalletButton'

// In Navbar.tsx
<WalletButton />

// WalletButton uses AppKit hooks internally:
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'

const { open } = useAppKit()          // Opens wallet modal
const { address, isConnected } = useAppKitAccount()  // Wallet state

// After wallet connection, sync with NuAuth
async function syncWithNuAuth(address: string, signature: string) {
  const response = await fetch('/api/auth/siwe', {
    method: 'POST',
    body: JSON.stringify({ address, signature, message })
  })
  // Returns JWT for backend requests
  return response.json()
}
```

### Session Management

```typescript
// Supabase Auth Integration
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, anonKey)

// Link wallet to Supabase user
await supabase.auth.signInWithOAuth({
  provider: 'custom',
  options: {
    data: { wallet_address: address }
  }
})
```

---

## Pricing & Monetization

### Revenue Model Overview

PC GameFi uses the **standard launchpad revenue model** (like Seedify, GameFi, etc.) with two distinct revenue streams:

1. **Investor Side**: PCGF staking tiers for allocation weight (NO subscriptions)
2. **Project Side**: Listing packages with success fees + token allocation

```
┌────────────────────────────────────────────────────────────────────────┐
│                    DUAL-SIDED REVENUE MODEL                             │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  INVESTOR SIDE (Free to Participate)                                    │
│  ├─ Stake PCGF tokens → Get tier → Receive allocation weight           │
│  ├─ No monthly fees, no subscriptions                                   │
│  └─ Higher stake = larger allocation in IGO sales                       │
│                                                                         │
│  PROJECT SIDE (Revenue Source)                                          │
│  ├─ Listing Package: Upfront fee ($0 - $50k+)                          │
│  ├─ Success Fee: % of funds raised (1-6%)                              │
│  └─ Token Allocation: % of tokens to PC GameFi treasury (2-10%)        │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

**Why This Model Works:**
- ✅ **Aligns incentives**: Platform succeeds when projects succeed
- ✅ **No barrier for investors**: Stake once, participate forever
- ✅ **PCGF token utility**: Real demand from staking requirements
- ✅ **Scalable revenue**: Success fees grow with ecosystem

### Investor Side: PCGF Staking Tiers

See the [Staking Tier System](#staking-tier-system-seedify-style) above for the full 9-tier breakdown.

**Key Points:**
- **NO subscriptions** for investors
- Stake PCGF tokens to unlock tier
- Higher tiers = more pool weight = larger allocations
- Tiers 1-2 are lottery-based, Tiers 3-9 have guaranteed allocations

### Project Side: Listing Packages

Projects pay PC GameFi through a combination of **upfront fees**, **success fees**, and **token allocation**.

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                         PROJECT LISTING PACKAGES                                │
├───────────────────┬────────────────┬─────────────────┬────────────────────────┤
│      Package      │  Upfront Fee   │   Success Fee   │    Token Allocation    │
├───────────────────┼────────────────┼─────────────────┼────────────────────────┤
│  Launchpad-Only   │  $0 - $5,000   │     4-6%        │        3-5%            │
│  (Bootstrapped)   │  (sliding)     │                 │                        │
├───────────────────┼────────────────┼─────────────────┼────────────────────────┤
│     Growth        │ $15,000-$40,000│     2-4%        │        3-7%            │
│  (Most Popular)   │                │                 │                        │
├───────────────────┼────────────────┼─────────────────┼────────────────────────┤
│    Enterprise     │   $50,000+     │     1-3%        │        5-10%           │
│    (Flagship)     │  (custom quote)│   (negotiable)  │     (negotiable)       │
└───────────────────┴────────────────┴─────────────────┴────────────────────────┘
```

#### Package Details

**Launchpad-Only (Bootstrapped Projects)**
- Target: Early-stage projects with limited treasury
- Upfront: $0 (if token allocation ≥5%) or sliding scale to $5,000
- Success Fee: 4-6% of funds raised
- Token Allocation: 3-5% to PC GameFi treasury
- Services: Basic listing, standard review (5-7 days), community access
- Best for: New teams wanting to bootstrap with minimal upfront cost

**Growth (Most Projects)**
- Target: Funded projects seeking quality launchpad exposure
- Upfront: $15,000 - $40,000 depending on raise size
- Success Fee: 2-4% of funds raised
- Token Allocation: 3-7% to PC GameFi treasury
- Services: Priority listing, expedited review (48-72h), marketing package, AMA support
- Best for: Seed/Series A projects with marketing budgets

**Enterprise (Flagship Partners)**
- Target: Major GameFi projects, strategic partnerships
- Upfront: $50,000+ (custom quote)
- Success Fee: 1-3% (negotiable)
- Token Allocation: 5-10% (negotiable)
- Services: Full-service launch, dedicated account manager, cross-promotion, guaranteed staking pool size
- Best for: Established games, major studios, high-profile launches

### Fee Calculation Examples

```typescript
// Example 1: Bootstrapped Project (Launchpad-Only)
const bootstrappedProject = {
  raiseAmount: 200_000,  // $200k raise
  package: 'launchpad-only',
  upfrontFee: 0,         // $0 upfront
  successFee: 0.05,      // 5%
  tokenAllocation: 0.05, // 5% of tokens
}
// Platform revenue: $10,000 success fee + 5% of project tokens

// Example 2: Growth Project
const growthProject = {
  raiseAmount: 500_000,  // $500k raise
  package: 'growth',
  upfrontFee: 25_000,    // $25k upfront
  successFee: 0.03,      // 3%
  tokenAllocation: 0.05, // 5% of tokens
}
// Platform revenue: $25,000 upfront + $15,000 success fee + 5% of tokens

// Example 3: Enterprise Project
const enterpriseProject = {
  raiseAmount: 2_000_000, // $2M raise
  package: 'enterprise',
  upfrontFee: 75_000,     // $75k upfront
  successFee: 0.02,       // 2%
  tokenAllocation: 0.07,  // 7% of tokens
}
// Platform revenue: $75,000 upfront + $40,000 success fee + 7% of tokens
```

### Contract Templates (Included in All Packages)

All packages include access to smart contract templates:

| Template | Description | Availability |
|----------|-------------|--------------|
| **Standard Tax Token** | ERC20 with configurable buy/sell/transfer taxes | All packages |
| **Zero Tax Token** | Clean ERC20 without transaction taxes | All packages |
| **Deflationary Token** | Auto-burn mechanism | Growth, Enterprise |
| **Reflection Token** | Auto-redistribution to holders | Growth, Enterprise |
| **Custom Contract** | Bespoke development | Enterprise only |

### Payment Integration (Stripe)

```typescript
// API Routes for Project Payments

// POST /api/listings/create-checkout
export async function createListingCheckout(projectId: string, packageType: string) {
  const pkg = LISTING_PACKAGES.find(p => p.id === packageType)

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${pkg.name} Listing Package`,
            description: pkg.description,
          },
          unit_amount: pkg.upfrontFee * 100,
        },
        quantity: 1,
      }
    ],
    success_url: '/projects/listing-success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: '/projects/apply',
    metadata: { projectId, packageType }
  })

  return { sessionId: session.id, url: session.url }
}

// Webhook: Handle successful payment
export async function handleListingPayment(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session
  const { projectId, packageType } = session.metadata

  await supabase.from('listing_orders').insert({
    project_id: projectId,
    package_type: packageType,
    upfront_paid: session.amount_total / 100,
    status: 'paid',
    stripe_session_id: session.id,
  })

  // Trigger project review workflow
  await triggerProjectReview(projectId, packageType)
}
```

---

## Data Flow

### Sale Contribution Flow

```
┌─────────┐     ┌──────────────┐     ┌─────────────────┐     ┌───────────┐
│  User   │────▶│   Frontend   │────▶│  Smart Contract │────▶│ ClickHouse│
│ Wallet  │     │  (wagmi)     │     │  (LaunchpadSale)│     │ (Analytics)│
└─────────┘     └──────────────┘     └─────────────────┘     └───────────┘
                      │                       │                     │
                      │  1. contribute()      │                     │
                      │─────────────────────▶│                     │
                      │                       │                     │
                      │  2. ContributionMade  │                     │
                      │◀─────────────────────│                     │
                      │       event           │                     │
                      │                       │  3. Index event     │
                      │                       │────────────────────▶│
                      │                       │                     │
                      │  4. Update UI         │                     │
                      │◀──────────────────────────────────────────┘
```

### Subscription Flow

```
┌─────────┐     ┌──────────────┐     ┌─────────────────┐     ┌───────────┐
│  User   │────▶│   Frontend   │────▶│     Stripe      │────▶│  Supabase │
│         │     │              │     │                 │     │           │
└─────────┘     └──────────────┘     └─────────────────┘     └───────────┘
                      │                       │                     │
                      │  1. Select plan       │                     │
                      │─────────────────────▶│                     │
                      │                       │                     │
                      │  2. Checkout session  │                     │
                      │◀─────────────────────│                     │
                      │                       │                     │
                      │  3. Payment complete  │                     │
                      │─────────────────────▶│                     │
                      │                       │  4. Webhook         │
                      │                       │────────────────────▶│
                      │                       │                     │
                      │  5. Access granted    │  5. Update user     │
                      │◀──────────────────────────────────────────┘
```

---

## Deployment

### Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# ClickHouse
CLICKHOUSE_HOST=https://xxx.clickhouse.cloud
CLICKHOUSE_DATABASE=pcgamefi
CLICKHOUSE_USER=default
CLICKHOUSE_PASSWORD=xxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Web3
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=xxx
NEXT_PUBLIC_ALCHEMY_ID=xxx

# Contract Addresses (per chain)
NEXT_PUBLIC_PCGF_TOKEN_ADDRESS_1=0x...
NEXT_PUBLIC_STAKING_CONTROLLER_ADDRESS_1=0x...
NEXT_PUBLIC_LAUNCHPAD_FACTORY_ADDRESS_1=0x...
```

### Deployment Checklist

- [ ] Deploy smart contracts to target chains
- [ ] Update contract addresses in `lib/web3/contracts.ts`
- [ ] Set up Supabase tables and RLS policies
- [ ] Configure ClickHouse tables and materialized views
- [ ] Set up Stripe products and prices
- [ ] Configure Stripe webhooks
- [ ] Deploy Next.js to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Enable Vercel Analytics
- [ ] Configure domain and SSL

### Build Commands

```bash
# Development
pnpm dev

# Production build
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

---

## Summary

PC GameFi is a comprehensive IGO launchpad platform with:

- **6 Smart Contracts** handling tokens, staking, sales, and vesting
- **9 Staking Tiers** (Seedify-style) with pool weight allocation system
- **3 Project Packages** (Launchpad-Only, Growth, Enterprise)
- **Multi-chain Support** across 7 EVM networks (ETH, Base, BSC, Polygon, Arbitrum, Avalanche, Optimism)
- **Unified Backend** via GROWSZ Backend Suite:
  - **NuBase**: Gateway/API fabric with auth and RBAC
  - **Dbity**: Typed data kernel with schemas and migrations
- **Secure Auth** via NuAuth v1.5 with SIWX (Sign-In with X) and OAuth2 support
- **Unified Wallet Stack** via Reown AppKit (350+ wallets, email/social login)

### Revenue Model (Standard Launchpad)

**Investor Side (No Subscriptions)**:
- Stake PCGF tokens → Get tier → Receive allocation weight
- 9 tiers from Beginner (250 PCGF) to Quantum (350,000 PCGF)
- Pool weight formula determines fair allocation

**Project Side (Primary Revenue)**:
- Launchpad-Only: $0-5k upfront + 4-6% success fee + 3-5% tokens
- Growth: $15-40k upfront + 2-4% success fee + 3-7% tokens
- Enterprise: $50k+ custom + 1-3% success fee + 5-10% tokens

This model aligns platform incentives with project success while giving PCGF genuine token utility through staking requirements.
