'use client';

import React from 'react';
import { Tabs } from 'antd';
import { useGameLogic } from '@/hooks/useGameLogic';
import { UpgradeCard } from '@/components/Game/UpgradeCard';
import { StatBadge } from '@/components/UI/StatBadge';
import { ClientOnly } from '@/components/UI/ClientOnly';
import '@ant-design/v5-patch-for-react-19';

export default function ShopPage() {
  const { gameState, buyUpgrade, canAffordUpgrade } = useGameLogic();

  const clickUpgrades = gameState.clickUpgrades;
  const autoUpgrades = gameState.autoUpgrades;

  const tabItems = [
    {
      key: 'click',
      label: (
        <span className="flex items-center space-x-2 text-lg font-semibold">
          <span className="text-2xl">👆</span>
          <span>Click Upgrades</span>
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-700/50 p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                Click Power Upgrades
              </h3>
              <p className="text-blue-600 dark:text-blue-300 text-lg leading-relaxed">
                Increase the number of cookies you earn per click! Each upgrade makes your clicks more powerful.
              </p>
              <ClientOnly 
                fallback={
                  <div className="mt-4 inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-800/30 px-4 py-2 rounded-full">
                    <span className="text-blue-700 dark:text-blue-300 font-medium">Current Power:</span>
                    <div className="bg-blue-200 dark:bg-blue-700 h-6 w-12 rounded animate-pulse"></div>
                  </div>
                }
              >
                <div className="mt-4 inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-800/30 px-4 py-2 rounded-full">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">Current Power:</span>
                  <span className="text-xl font-bold text-blue-800 dark:text-blue-200">+{gameState.clickPower}</span>
                </div>
              </ClientOnly>
            </div>
          </div>
          
          <ClientOnly 
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                    <div className="bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded animate-pulse mb-2"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded animate-pulse mb-4"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded animate-pulse mb-2"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-3/4 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {clickUpgrades.map((upgrade) => (
                <UpgradeCard
                  key={upgrade.id}
                  upgrade={upgrade}
                  canAfford={canAffordUpgrade(upgrade.id, 'click')}
                  onBuy={() => buyUpgrade(upgrade.id, 'click')}
                />
              ))}
            </div>
          </ClientOnly>
        </div>
      ),
    },
    {
      key: 'auto',
      label: (
        <span className="flex items-center space-x-2 text-lg font-semibold">
          <span className="text-2xl">🤖</span>
          <span>Auto Producers</span>
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-700/50 p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                Passive Income Generators
              </h3>
              <p className="text-green-600 dark:text-green-300 text-lg leading-relaxed">
                Generate cookies automatically, even when you&apos;re not clicking! Build your cookie empire while you sleep.
              </p>
              <ClientOnly 
                fallback={
                  <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 dark:bg-green-800/30 px-4 py-2 rounded-full">
                    <span className="text-green-700 dark:text-green-300 font-medium">Income Rate:</span>
                    <div className="bg-green-200 dark:bg-green-700 h-6 w-12 rounded animate-pulse"></div>
                  </div>
                }
              >
                <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 dark:bg-green-800/30 px-4 py-2 rounded-full">
                  <span className="text-green-700 dark:text-green-300 font-medium">Income Rate:</span>
                  <span className="text-xl font-bold text-green-800 dark:text-green-200">{gameState.coinsPerSecond}/s</span>
                </div>
              </ClientOnly>
            </div>
          </div>
          
          <ClientOnly 
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                    <div className="bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded animate-pulse mb-2"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded animate-pulse mb-4"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded animate-pulse mb-2"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-3/4 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {autoUpgrades.map((upgrade) => (
                <UpgradeCard
                  key={upgrade.id}
                  upgrade={upgrade}
                  canAfford={canAffordUpgrade(upgrade.id, 'auto')}
                  onBuy={() => buyUpgrade(upgrade.id, 'auto')}
                />
              ))}
            </div>
          </ClientOnly>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            🛒 Cookie Shop
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Invest your cookies wisely! Upgrade your clicking power and build automated cookie producers to maximize your empire&apos;s growth.
          </p>
        </div>

        {/* Enhanced Resource Display */}
        <ClientOnly 
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                  <div className="bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded animate-pulse mx-auto mb-2"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded animate-pulse mx-auto"></div>
                </div>
              ))}
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <StatBadge
                label="Available Cookies"
                value={gameState.coins}
                icon="🍪"
                className="text-center"
              />
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <StatBadge
                label="Click Power"
                value={gameState.clickPower}
                icon="💪"
                className="text-center"
              />
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <StatBadge
                label="Cookies/Second"
                value={gameState.coinsPerSecond}
                icon="⚡"
                suffix="/s"
                className="text-center"
              />
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <StatBadge
                label="Total Earned"
                value={gameState.totalEarned}
                icon="🏆"
                className="text-center"
              />
            </div>
          </div>
        </ClientOnly>

        {/* Enhanced Shop Tabs */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6">
          <Tabs 
            defaultActiveKey="click" 
            items={tabItems}
            className="shop-tabs"
            size="large"
          />
        </div>

        {/* Quick Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 backdrop-blur-sm rounded-2xl border border-yellow-200/50 dark:border-yellow-700/50 p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">💡</span>
              <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Pro Tips</h3>
            </div>
            <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
              <li className="flex items-start space-x-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Click upgrades give immediate power boosts</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Auto producers generate passive income</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Balance both types for optimal growth</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 backdrop-blur-sm rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50 p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">📈</span>
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">Strategy Guide</h3>
            </div>
            <ul className="space-y-2 text-emerald-700 dark:text-emerald-300">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Early game: Focus on click upgrades</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Mid game: Build auto producers</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>Late game: Scale everything exponentially</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
