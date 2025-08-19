import React from 'react';
import { StatBadge } from '@/components/UI/StatBadge';

interface ResourceCounterProps {
  coins: number;
  totalClicks: number;
  clickPower: number;
  coinsPerSecond: number;
  totalEarned: number;
  className?: string;
}

export function ResourceCounter({
  coins,
  totalClicks,
  clickPower,
  coinsPerSecond,
  totalEarned,
  className = ''
}: ResourceCounterProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}>
      <StatBadge
        label="Cookies"
        value={coins}
        icon="🍪"
        className="text-center"
      />
      
      <StatBadge
        label="Total Clicks"
        value={totalClicks}
        icon="👆"
        className="text-center"
      />
      
      <StatBadge
        label="Click Power"
        value={clickPower}
        icon="💪"
        className="text-center"
      />
      
      <StatBadge
        label="Cookies/Second"
        value={coinsPerSecond}
        icon="⚡"
        suffix="/s"
        className="text-center"
      />
      
      <StatBadge
        label="Total Earned"
        value={totalEarned}
        icon="🏆"
        className="text-center"
      />
      
      <StatBadge
        label="CPS Rate"
        value={coinsPerSecond * 60}
        icon="📈"
        suffix="/min"
        className="text-center"
      />
    </div>
  );
}
