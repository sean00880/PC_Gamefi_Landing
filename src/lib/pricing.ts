// Pricing and subscription system for PC GameFi

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  platformFeeBps: number; // Fee on raised funds in basis points
  listingFeeDiscount: number; // Percentage discount on listing fees
  features: string[];
  limits: {
    maxProjects: number | 'unlimited';
    customContracts: boolean;
    prioritySupport: boolean;
    dedicatedManager: boolean;
  };
  popular?: boolean;
}

export interface ListingFee {
  id: string;
  name: string;
  price: number;
  description: string;
  processingTime: string;
  features: string[];
}

// Subscription plans
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with basic IGO features',
    monthlyPrice: 0,
    yearlyPrice: 0,
    platformFeeBps: 700, // 7%
    listingFeeDiscount: 0,
    features: [
      'Launch 1 project',
      'Standard token templates',
      'Basic vesting options',
      'Community support',
      '7% platform fee on raised funds',
    ],
    limits: {
      maxProjects: 1,
      customContracts: false,
      prioritySupport: false,
      dedicatedManager: false,
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for emerging projects',
    monthlyPrice: 99,
    yearlyPrice: 990, // 2 months free
    platformFeeBps: 500, // 5%
    listingFeeDiscount: 25,
    features: [
      'Launch up to 3 projects',
      'Standard + ZeroTax templates',
      'Advanced vesting options',
      'Email support',
      '5% platform fee (2% savings)',
      '25% off listing fees',
    ],
    limits: {
      maxProjects: 3,
      customContracts: false,
      prioritySupport: false,
      dedicatedManager: false,
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For serious GameFi projects',
    monthlyPrice: 299,
    yearlyPrice: 2990, // 2 months free
    platformFeeBps: 300, // 3%
    listingFeeDiscount: 50,
    popular: true,
    features: [
      'Launch up to 10 projects',
      'All token templates',
      'Custom tokenomics configuration',
      'Priority support (24h response)',
      '3% platform fee (4% savings)',
      '50% off listing fees',
      'Featured listing priority',
      'Marketing support',
    ],
    limits: {
      maxProjects: 10,
      customContracts: true,
      prioritySupport: true,
      dedicatedManager: false,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Full-service launchpad solution',
    monthlyPrice: 999,
    yearlyPrice: 9990, // 2 months free
    platformFeeBps: 200, // 2%
    listingFeeDiscount: 100, // Free listings
    features: [
      'Unlimited projects',
      'All token templates + custom',
      'Bespoke contract development',
      'Dedicated account manager',
      '2% platform fee (5% savings)',
      'Free listing fees',
      'Guaranteed homepage feature',
      'Co-marketing campaigns',
      'White-glove onboarding',
      'API access',
    ],
    limits: {
      maxProjects: 'unlimited',
      customContracts: true,
      prioritySupport: true,
      dedicatedManager: true,
    },
  },
];

// Listing fees
export const LISTING_FEES: ListingFee[] = [
  {
    id: 'standard',
    name: 'Standard Listing',
    price: 500,
    description: 'Basic project listing with standard review',
    processingTime: '5-7 business days',
    features: [
      'Project verification',
      'Smart contract review',
      'Listing on projects page',
      'Community announcement',
    ],
  },
  {
    id: 'priority',
    name: 'Priority Listing',
    price: 2000,
    description: 'Fast-track review with priority placement',
    processingTime: '48 hours',
    features: [
      'Everything in Standard',
      'Expedited review process',
      'Priority queue placement',
      'Social media promotion',
      'Newsletter feature',
    ],
  },
  {
    id: 'featured',
    name: 'Featured Listing',
    price: 5000,
    description: 'Premium placement with full marketing support',
    processingTime: '24-48 hours',
    features: [
      'Everything in Priority',
      'Homepage hero feature (7 days)',
      'Dedicated marketing campaign',
      'AMA session coordination',
      'Influencer introduction',
      'PR article placement',
    ],
  },
];

// Contract packages (for Enterprise tier)
export const CONTRACT_PACKAGES = [
  {
    id: 'standard-tax',
    name: 'Standard Tax Token',
    description: 'ERC20 with configurable buy/sell/transfer taxes',
    included: ['starter', 'professional', 'enterprise'],
  },
  {
    id: 'zero-tax',
    name: 'Zero Tax Token',
    description: 'Simple ERC20 with no trading taxes',
    included: ['starter', 'professional', 'enterprise'],
  },
  {
    id: 'deflationary',
    name: 'Deflationary Token',
    description: 'Auto-burn on every transfer',
    included: ['professional', 'enterprise'],
  },
  {
    id: 'reflection',
    name: 'Reflection Token',
    description: 'Automatic holder rewards from taxes',
    included: ['professional', 'enterprise'],
  },
  {
    id: 'multisig-vesting',
    name: 'Multi-sig Vesting',
    description: 'Team vesting requiring multiple signatures',
    included: ['enterprise'],
  },
  {
    id: 'milestone-vesting',
    name: 'Milestone Vesting',
    description: 'Token unlock based on project KPIs',
    included: ['enterprise'],
  },
  {
    id: 'custom',
    name: 'Custom Contract',
    description: 'Bespoke smart contract development',
    included: ['enterprise'],
  },
];

// Calculate listing fee with discount
export function calculateListingFee(
  listingType: string,
  subscriptionPlan: string
): { originalPrice: number; discount: number; finalPrice: number } {
  const listing = LISTING_FEES.find((l) => l.id === listingType);
  const plan = PRICING_PLANS.find((p) => p.id === subscriptionPlan);

  if (!listing || !plan) {
    throw new Error('Invalid listing type or subscription plan');
  }

  const originalPrice = listing.price;
  const discountPercent = plan.listingFeeDiscount;
  const discount = Math.round(originalPrice * (discountPercent / 100));
  const finalPrice = originalPrice - discount;

  return { originalPrice, discount, finalPrice };
}

// Calculate platform fee
export function calculatePlatformFee(
  raisedAmount: number,
  subscriptionPlan: string
): { feePercent: number; feeAmount: number; netAmount: number } {
  const plan = PRICING_PLANS.find((p) => p.id === subscriptionPlan);

  if (!plan) {
    throw new Error('Invalid subscription plan');
  }

  const feePercent = plan.platformFeeBps / 100;
  const feeAmount = Math.round(raisedAmount * (plan.platformFeeBps / 10000));
  const netAmount = raisedAmount - feeAmount;

  return { feePercent, feeAmount, netAmount };
}

// Get available contracts for a plan
export function getAvailableContracts(subscriptionPlan: string): typeof CONTRACT_PACKAGES {
  return CONTRACT_PACKAGES.filter((pkg) => pkg.included.includes(subscriptionPlan));
}

// Fee comparison for different raise amounts
export function getFeeComparison(raiseAmounts: number[]): Record<string, Record<string, number>> {
  const comparison: Record<string, Record<string, number>> = {};

  for (const amount of raiseAmounts) {
    const key = `$${amount.toLocaleString()}`;
    comparison[key] = {};
    for (const plan of PRICING_PLANS) {
      const { feeAmount } = calculatePlatformFee(amount, plan.id);
      const row = comparison[key];
      if (row) {
        row[plan.name] = feeAmount;
      }
    }
  }

  return comparison;
}
