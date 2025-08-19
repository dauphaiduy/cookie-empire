'use client';

import React from 'react';
import { Tabs, Card } from 'antd';
import { useGameLogic } from '@/hooks/useGameLogic';
import { UpgradeCard } from '@/components/Game/UpgradeCard';
import { StatBadge } from '@/components/UI/StatBadge';
import '@ant-design/v5-patch-for-react-19';

export default function ShopPage() {
  const { gameState, buyUpgrade, canAffordUpgrade } = useGameLogic();

  const clickUpgrades = gameState.clickUpgrades;
  const autoUpgrades = gameState.autoUpgrades;

  const tabItems = [
    {
      key: 'click',
      label: '👆 Click Upgrades',
      children: (
        <div className="space-y-4">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
            <div className="text-center">
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">
                💪 Click Power Upgrades
              </h3>
              <p className="text-blue-600 dark:text-blue-300 text-sm">
                Increase the number of cookies you earn per click!
              </p>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clickUpgrades.map((upgrade) => (
              <UpgradeCard
                key={upgrade.id}
                upgrade={upgrade}
                canAfford={canAffordUpgrade(upgrade.id, 'click')}
                onBuy={() => buyUpgrade(upgrade.id, 'click')}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'auto',
      label: '🤖 Auto Producers',
      children: (
        <div className="space-y-4">
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
            <div className="text-center">
              <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                ⚡ Passive Income Generators
              </h3>
              <p className="text-green-600 dark:text-green-300 text-sm">
                Generate cookies automatically, even when you&apos;re not clicking!
              </p>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {autoUpgrades.map((upgrade) => (
              <UpgradeCard
                key={upgrade.id}
                upgrade={upgrade}
                canAfford={canAffordUpgrade(upgrade.id, 'auto')}
                onBuy={() => buyUpgrade(upgrade.id, 'auto')}
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Current Resources */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            🛒 Cookie Shop
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upgrade your clicking power and automate your cookie production!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatBadge
            label="Available Cookies"
            value={gameState.coins}
            icon="🍪"
            className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          />
          <StatBadge
            label="Click Power"
            value={gameState.clickPower}
            icon="💪"
            className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          />
          <StatBadge
            label="Cookies/Second"
            value={gameState.coinsPerSecond}
            icon="⚡"
            suffix="/s"
            className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          />
          <StatBadge
            label="Total Earned"
            value={gameState.totalEarned}
            icon="🏆"
            className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          />
        </div>
      </div>

      {/* Shop Tabs */}
      <Tabs 
        defaultActiveKey="click" 
        items={tabItems}
        className="shop-tabs"
        size="large"
      />
    </div>
  );
}
