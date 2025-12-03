'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TOKENOMICS } from '@/lib/constants';

// Chart colors use CSS variable values - these are resolved at render time
const data = [
  { name: 'Buy Tax', value: 4, color: 'var(--primary)' },
  { name: 'Sell Tax', value: 4, color: 'var(--foreground)' },
  { name: 'Transfer Tax', value: 0, color: 'var(--muted)' },
  { name: 'Liquidity/Holder', value: 92, color: 'var(--card)' },
];

export const Tokenomics: React.FC = () => {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 display-font text-card-foreground">PC GAMEFI TOKENOMICS</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{TOKENOMICS.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 bg-primary/10 p-8 rounded-2xl border border-primary/20 shadow-sm text-center">
              <h3 className="text-lg text-muted-foreground font-medium uppercase tracking-wider mb-2">Total Supply</h3>
              <p className="text-4xl md:text-5xl font-bold text-foreground display-font tracking-tight">{TOKENOMICS.supply}</p>
            </div>

            <div className="bg-foreground p-6 rounded-2xl text-background flex flex-col items-center justify-center aspect-square shadow-[8px_8px_0px_0px_var(--primary)]">
              <span className="text-4xl font-bold text-primary display-font">{TOKENOMICS.buyTax}</span>
              <span className="text-sm font-medium uppercase mt-2 tracking-widest text-muted-foreground">Buy Tax</span>
            </div>

            <div className="bg-card border-2 border-foreground p-6 rounded-2xl text-foreground flex flex-col items-center justify-center aspect-square shadow-[8px_8px_0px_0px_var(--shadow-primary)]">
              <span className="text-4xl font-bold display-font">{TOKENOMICS.sellTax}</span>
              <span className="text-sm font-medium uppercase mt-2 tracking-widest text-muted-foreground">Sell Tax</span>
            </div>
          </div>

          {/* Visual Representation */}
          <div className="bg-muted rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">0% Transfer Tax</span>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.name === 'Liquidity/Holder' ? 'var(--border)' : 'none'} strokeWidth={1}/>
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="font-semibold text-foreground">Tax Distribution</p>
              <div className="flex justify-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div> Marketing</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-foreground"></div> Dev</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
