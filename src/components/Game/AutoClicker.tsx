import React from 'react';
import { Card, Progress } from 'antd';
import { formatNumber } from '@/lib/utils';

interface AutoClickerProps {
  coinsPerSecond: number;
  autoUpgrades: Array<{
    id: string;
    name: string;
    owned: number;
    coinsPerSecond: number;
    icon: string;
  }>;
  className?: string;
}

export function AutoClicker({ coinsPerSecond, autoUpgrades, className = '' }: AutoClickerProps) {
  const activeAutoUpgrades = autoUpgrades.filter(upgrade => upgrade.owned > 0);
  
  if (activeAutoUpgrades.length === 0) {
    return (
      <Card 
        title="🤖 Auto Production" 
        className={`${className}`}
        styles={{ body: { padding: '16px' } }}
      >
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">😴</div>
          <p>No auto producers yet!</p>
          <p className="text-sm">Buy some from the shop to generate passive income.</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card 
      title="🤖 Auto Production" 
      className={`${className}`}
      extra={
        <div className="text-green-600 font-bold">
          ⚡ {formatNumber(coinsPerSecond)}/sec
        </div>
      }
      styles={{ body: { padding: '16px' } }}
    >
      <div className="space-y-3">
        {activeAutoUpgrades.map((upgrade) => {
          const contribution = (upgrade.coinsPerSecond * upgrade.owned) / coinsPerSecond * 100;
          
          return (
            <div key={upgrade.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{upgrade.icon}</span>
                <div>
                  <div className="font-medium text-sm">{upgrade.name}</div>
                  <div className="text-xs text-gray-500">
                    {upgrade.owned} × {formatNumber(upgrade.coinsPerSecond)}/sec
                  </div>
                </div>
              </div>
              
              <div className="text-right min-w-[80px]">
                <div className="text-sm font-semibold text-green-600">
                  +{formatNumber(upgrade.coinsPerSecond * upgrade.owned)}/s
                </div>
                <Progress 
                  percent={contribution} 
                  size="small" 
                  showInfo={false}
                  strokeColor="#52c41a"
                  className="w-16"
                />
              </div>
            </div>
          );
        })}
        
        {coinsPerSecond > 0 && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Passive Income
              </div>
              <div className="text-lg font-bold text-green-600">
                🍪 {formatNumber(coinsPerSecond * 60)}/minute
              </div>
              <div className="text-xs text-gray-500">
                {formatNumber(coinsPerSecond * 3600)}/hour
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
