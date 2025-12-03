import React from 'react';
import Link from 'next/link';
import { SOCIAL_LINKS } from '@/lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-card-foreground pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-border pb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg rounded">PC</div>
              <span className="font-bold text-2xl display-font text-foreground">GAMEFI</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              The leading Web3 platform for IGOs, NFT sales, and crypto gaming innovation. Invest with confidence.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-foreground">Ecosystem</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li><Link href="/projects" className="hover:text-foreground transition-colors">Launchpad</Link></li>
              <li><span className="opacity-50 cursor-not-allowed">Staking</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Game World</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Marketplace</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-foreground">Support</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li><span className="opacity-50 cursor-not-allowed">Documentation</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Apply for IDO</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Privacy Policy</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} PC GameFi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
