export interface Project {
  id: string;
  name: string;
  ticker: string;
  description: string;
  imageUrl: string;
  logoUrl?: string;
  totalRaise: number;
  currentRaise: number;
  participants: number;
  status: 'Upcoming' | 'Live' | 'Ended';
  category: string[];
  roi: string;
  blockchain?: string;
  startDate?: string;
  endDate?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  whitepaper?: string;
  kycRequired?: boolean;
}

export interface SocialLink {
  platform: 'Twitter' | 'Telegram' | 'Discord' | 'Website';
  url: string;
  icon?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface TokenomicsData {
  supply: string;
  displaySupply: string;
  buyTax: string;
  sellTax: string;
  transferTax: string;
  description: string;
}

export interface StatsData {
  athRoi: string;
  totalRaised: string;
  totalUsers: string;
}
