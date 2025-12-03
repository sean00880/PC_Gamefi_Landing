import React from 'react';
import { STATS } from '@/lib/constants';

export const StatsBar: React.FC = () => {
  return (
    <div className="w-full bg-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-background/20">
          <div className="flex flex-col items-center md:items-start md:pl-8">
            <span className="text-background/60 text-sm font-medium uppercase tracking-wider mb-1">ATH Avg ROI</span>
            <span className="text-4xl md:text-5xl font-bold display-font text-primary dark:text-green-600">{STATS.athRoi}</span>
          </div>
          <div className="flex flex-col items-center md:items-start md:pl-8 pt-8 md:pt-0">
            <span className="text-background/60 text-sm font-medium uppercase tracking-wider mb-1">Total Raised</span>
            <span className="text-4xl md:text-5xl font-bold display-font text-background">{STATS.totalRaised}</span>
          </div>
          <div className="flex flex-col items-center md:items-start md:pl-8 pt-8 md:pt-0">
            <span className="text-background/60 text-sm font-medium uppercase tracking-wider mb-1">Total Users</span>
            <span className="text-4xl md:text-5xl font-bold display-font text-background">{STATS.totalUsers}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
