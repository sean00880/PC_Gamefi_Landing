import React from 'react';
import { Wallet, Coins, UserCheck, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: "Sign-Up",
    desc: "Signup and connect your crypto wallet.",
    action: "Connect"
  },
  {
    icon: Coins,
    title: "Stake Tokens",
    desc: "Unlock your tier, power up your multiplier.",
    action: "Stake"
  },
  {
    icon: UserCheck,
    title: "KYC",
    desc: "Apply whitelist on IDO pool(s). Verify information.",
    action: "Apply"
  },
  {
    icon: Rocket,
    title: "Join IDO",
    desc: "Pay in crypto, claim your tokens upon listing.",
    action: "Join"
  }
];

export const HowToJoin: React.FC = () => {
  return (
    <section className="py-24 bg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 display-font text-foreground">How To Join</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-card border border-border rounded-2xl p-8 hover:border-primary transition-colors group">
              <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <step.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 display-font text-card-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm mb-8 h-10">{step.desc}</p>
              <button className="w-full py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted uppercase transition-colors text-foreground">
                {step.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
