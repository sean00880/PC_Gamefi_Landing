import type { Project, SocialLink, TokenomicsData, StatsData } from './types';

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Twitter', url: 'https://x.com/pcgamefi' },
  { platform: 'Telegram', url: 'https://t.me/PCgamefi' }
];

export const STATS: StatsData = {
  athRoi: '42.51X',
  totalRaised: '$15.35M',
  totalUsers: '200K+'
};

export const TOKENOMICS: TokenomicsData = {
  supply: '1,000,000,000',
  displaySupply: '1 Billion',
  buyTax: '4%',
  sellTax: '4%',
  transferTax: '0%',
  description: 'PC GameFi tokenomics are designed for sustainable growth and community rewards.'
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Go! SmartChain AI',
    ticker: 'GSAI',
    description: 'The first AI-powered layer 2 for gaming assets. Revolutionary infrastructure combining blockchain scalability with artificial intelligence for seamless gaming experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop',
    totalRaise: 250000,
    currentRaise: 0,
    participants: 0,
    status: 'Upcoming',
    category: ['AI', 'Infrastructure'],
    roi: 'TBA',
    blockchain: 'BSC',
    startDate: 'TBA',
    website: 'https://gosmartchain.ai',
    twitter: 'https://twitter.com/gosmartchainai',
    kycRequired: true
  },
  {
    id: '2',
    name: 'MultichainZ',
    ticker: 'MTZ',
    description: 'Cross-chain lending protocol for GameFi NFTs. Unlock liquidity from your gaming assets across multiple blockchains with our innovative DeFi solution.',
    imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&h=450&fit=crop',
    totalRaise: 150000,
    currentRaise: 150000,
    participants: 4500,
    status: 'Ended',
    category: ['DeFi', 'RWA'],
    roi: '42.5x',
    blockchain: 'Polygon',
    startDate: '2025-01-15',
    endDate: '2025-01-20',
    website: 'https://multichainz.io',
    telegram: 'https://t.me/multichainz',
    kycRequired: false
  },
  {
    id: '3',
    name: 'BoredTopia',
    ticker: 'BORED',
    description: 'An open-world metaverse for Ape holders. Explore, build, and earn in a vibrant virtual world designed exclusively for the Bored Ape community.',
    imageUrl: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=800&h=450&fit=crop',
    totalRaise: 300000,
    currentRaise: 210000,
    participants: 1200,
    status: 'Live',
    category: ['Metaverse', 'Game'],
    roi: '12x',
    blockchain: 'Ethereum',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    website: 'https://boredtopia.io',
    twitter: 'https://twitter.com/boredtopia',
    telegram: 'https://t.me/boredtopia',
    kycRequired: true
  },
  {
    id: '4',
    name: 'CryptoRacers',
    ticker: 'RACE',
    description: 'Play-to-earn racing game with NFT vehicles. Compete in high-stakes races, customize your cars, and earn real rewards in this adrenaline-pumping GameFi experience.',
    imageUrl: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=450&fit=crop',
    totalRaise: 500000,
    currentRaise: 125000,
    participants: 890,
    status: 'Live',
    category: ['Game', 'P2E'],
    roi: '8.5x',
    blockchain: 'Arbitrum',
    startDate: '2025-02-15',
    endDate: '2025-03-15',
    website: 'https://cryptoracers.game',
    twitter: 'https://twitter.com/cryptoracers',
    kycRequired: false
  },
  {
    id: '5',
    name: 'TokenVerse',
    ticker: 'TVS',
    description: 'Social-Fi platform connecting gamers worldwide. Build your reputation, trade achievements, and participate in a new era of social gaming communities.',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    totalRaise: 200000,
    currentRaise: 0,
    participants: 0,
    status: 'Upcoming',
    category: ['SocialFi', 'Infrastructure'],
    roi: 'TBA',
    blockchain: 'Solana',
    startDate: '2025-03-01',
    website: 'https://tokenverse.io',
    telegram: 'https://t.me/tokenverse',
    kycRequired: true
  },
  {
    id: '6',
    name: 'PixelKingdoms',
    ticker: 'PXKD',
    description: 'Retro-style strategy game with blockchain rewards. Build your kingdom, form alliances, and conquer territories in this nostalgic yet innovative gaming experience.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop',
    totalRaise: 180000,
    currentRaise: 180000,
    participants: 3200,
    status: 'Ended',
    category: ['Game', 'Strategy'],
    roi: '28.3x',
    blockchain: 'BSC',
    startDate: '2024-12-01',
    endDate: '2024-12-15',
    website: 'https://pixelkingdoms.game',
    twitter: 'https://twitter.com/pixelkingdoms',
    kycRequired: false
  }
];

export const COMPLETED_PROJECTS = PROJECTS.filter(p => p.status === 'Ended');
export const LIVE_PROJECTS = PROJECTS.filter(p => p.status === 'Live');
export const UPCOMING_PROJECTS = PROJECTS.filter(p => p.status === 'Upcoming');

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Staking', path: '/stake' },
  { name: 'Pricing', path: '/pricing' },
];
