'use client';

import React from 'react';
import { useGameLogic } from '@/hooks/useGameLogic';
import { ClickButton } from '@/components/Game/ClickButton';
import { ResourceCounter } from '@/components/Game/ResourceCounter';
import { AutoClicker } from '@/components/Game/AutoClicker';
import { ClientOnly } from '@/components/UI/ClientOnly';
import '@ant-design/v5-patch-for-react-19';

export default function HomePage() {
  const { gameState, clickAnimations, handleClick } = useGameLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            <span style={{color: 'black'}}>🍪</span> Cookie Empire
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Build your cookie empire! Click, upgrade, and watch your fortune grow with every delicious cookie.
          </p>
        </div>

        {/* Main Game Layout */}
        <ClientOnly 
          fallback={
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              <div className="xl:col-span-4">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="text-center">
                        <div className="bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded animate-pulse mx-auto mb-2"></div>
                        <div className="bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded animate-pulse mx-auto"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {/* Resource Counter - Full Width on Top */}
          <div className="xl:col-span-4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <ResourceCounter
                coins={gameState.coins}
                totalClicks={gameState.totalClicks}
                clickPower={gameState.clickPower}
                coinsPerSecond={gameState.coinsPerSecond}
                totalEarned={gameState.totalEarned}
              />
            </div>
          </div>

          {/* Left Side - Game Stats */}
          <div className="xl:col-span-1 space-y-4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                📊 Game Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Clicks</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {gameState.totalClicks.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Click Power</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    +{gameState.clickPower}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Per Second</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {gameState.coinsPerSecond}/s
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Main Click Area */}
          <div className="xl:col-span-2 flex flex-col items-center justify-center">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
              
              {/* Click Button Container */}
              <div className="relative flex justify-center mb-6">
                <div className="relative">
                  <ClickButton 
                    onClick={handleClick}
                    clickPower={gameState.clickPower}
                  />
                  
                  {/* Click Animations */}
                  {clickAnimations.map((animation) => (
                    <div
                      key={animation.id}
                      className="absolute pointer-events-none text-green-500 font-bold text-xl z-20 animate-ping"
                      style={{
                        left: animation.x,
                        top: animation.y,
                        transform: 'translate(-50%, -50%)',
                        animation: 'floatUp 1s ease-out forwards',
                      }}
                    >
                      +{animation.message}
                    </div>
                  ))}
                </div>
              </div>

              {/* Motivational Text */}
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Keep Clicking! �
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Every click brings you closer to cookie domination!
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Next Milestone</span>
                  <span>{Math.floor((gameState.totalClicks % 100) / 100 * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(gameState.totalClicks % 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tip Section */}
            <div className="mt-6 text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg text-sm font-medium">
                💡 Pro Tip: Visit the shop to unlock powerful upgrades!
              </div>
            </div>
          </div>

          {/* Right Side - Auto Clicker */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <AutoClicker 
                coinsPerSecond={gameState.coinsPerSecond}
                autoUpgrades={gameState.autoUpgrades}
              />
            </div>
          </div>
          </div>
        </ClientOnly>

        {/* Quick Actions Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex space-x-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 px-6 py-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              🏪 <span className="font-medium">Shop</span> • 🏆 <span className="font-medium">Leaderboard</span> • ⚙️ <span className="font-medium">Settings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
