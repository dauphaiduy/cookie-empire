import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { GameState, INITIAL_GAME_STATE, GAME_CONFIG, Upgrade, AutoUpgrade } from '@/lib/gameConfig';
import { calculateUpgradeCost, calculateOfflineEarnings } from '@/lib/utils';

export function useGameLogic() {
  const [gameState, setGameState, isLoaded] = useLocalStorage<GameState>('idle-game-state', INITIAL_GAME_STATE);
  const [clickAnimations, setClickAnimations] = useState<Array<{ id: number; x: number; y: number; message: string }>>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize lastSaveTime if it's 0 (initial state) and data is loaded
  useEffect(() => {
    if (isLoaded && gameState.lastSaveTime === 0) {
      setGameState(prev => ({
        ...prev,
        lastSaveTime: Date.now()
      }));
    }
  }, [isLoaded, gameState.lastSaveTime, setGameState]);

  // Calculate offline earnings when the game loads
  useEffect(() => {
    if (!isClient || !isLoaded) return;
    
    const now = Date.now();
    const timeAway = now - gameState.lastSaveTime;
    
    if (timeAway > 60000 && gameState.coinsPerSecond > 0) { // More than 1 minute away
      const offlineEarnings = calculateOfflineEarnings(gameState.coinsPerSecond, timeAway);
      if (offlineEarnings > 0) {
        setGameState(prev => ({
          ...prev,
          coins: prev.coins + offlineEarnings,
          totalEarned: prev.totalEarned + offlineEarnings,
          lastSaveTime: now
        }));
      }
    }
  }, [isClient, isLoaded, gameState.coinsPerSecond, gameState.lastSaveTime, setGameState]);

  // Auto-save game state
  useEffect(() => {
    const saveInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        lastSaveTime: Date.now()
      }));
    }, GAME_CONFIG.SAVE_INTERVAL);

    return () => clearInterval(saveInterval);
  }, [setGameState]);

  // Auto-clicker income
  useEffect(() => {
    if (gameState.coinsPerSecond <= 0) return;

    const autoInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins + prev.coinsPerSecond,
        totalEarned: prev.totalEarned + prev.coinsPerSecond
      }));
    }, GAME_CONFIG.AUTO_CLICK_INTERVAL);

    return () => clearInterval(autoInterval);
  }, [gameState.coinsPerSecond, setGameState]);

  const handleClick = useCallback((event?: React.MouseEvent) => {
    const earnedCoins = gameState.clickPower;
    
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + earnedCoins,
      totalClicks: prev.totalClicks + 1,
      totalEarned: prev.totalEarned + earnedCoins
    }));

    // Add click animation - only on client side
    if (event && isClient) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const animation = {
        id: Date.now() + Math.random(),
        x,
        y,
        message: `+${earnedCoins}`
      };
      
      setClickAnimations(prev => [...prev, animation]);
      
      // Remove animation after 1 second
      setTimeout(() => {
        setClickAnimations(prev => prev.filter(anim => anim.id !== animation.id));
      }, 1000);
    }
  }, [gameState.clickPower, setGameState, isClient]);

  const buyUpgrade = useCallback((upgradeId: string, category: 'click' | 'auto') => {
    setGameState(prev => {
      const upgrades = category === 'click' ? prev.clickUpgrades : prev.autoUpgrades;
      const upgrade = upgrades.find(u => u.id === upgradeId);
      
      if (!upgrade || prev.coins < upgrade.currentCost) {
        return prev;
      }

      const newUpgrades = upgrades.map(u => {
        if (u.id === upgradeId) {
          return {
            ...u,
            owned: u.owned + 1,
            currentCost: calculateUpgradeCost(u.baseCost, u.owned + 1, GAME_CONFIG.UPGRADE_COST_MULTIPLIER)
          };
        }
        return u;
      });

      // Calculate new click power and coins per second
      let newClickPower = 1;
      let newCoinsPerSecond = 0;

      if (category === 'click') {
        newClickPower = (newUpgrades as Upgrade[]).reduce((power, upgrade) => {
          return power + (upgrade.multiplier * upgrade.owned);
        }, 1);
      } else {
        newCoinsPerSecond = (newUpgrades as AutoUpgrade[]).reduce((cps, upgrade) => {
          return cps + (upgrade.coinsPerSecond * upgrade.owned);
        }, 0);
        newClickPower = prev.clickPower;
      }

      // For auto upgrades, we need to also consider existing click upgrades
      if (category === 'auto') {
        newClickPower = prev.clickUpgrades.reduce((power, upgrade) => {
          return power + (upgrade.multiplier * upgrade.owned);
        }, 1);
      }

      // For click upgrades, we need to also consider existing auto upgrades
      if (category === 'click') {
        newCoinsPerSecond = prev.autoUpgrades.reduce((cps, upgrade) => {
          return cps + (upgrade.coinsPerSecond * upgrade.owned);
        }, 0);
      }

      return {
        ...prev,
        coins: prev.coins - upgrade.currentCost,
        clickPower: newClickPower,
        coinsPerSecond: newCoinsPerSecond,
        [category === 'click' ? 'clickUpgrades' : 'autoUpgrades']: newUpgrades
      };
    });
  }, [setGameState]);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
    setClickAnimations([]);
  }, [setGameState]);

  const canAffordUpgrade = useCallback((upgradeId: string, category: 'click' | 'auto'): boolean => {
    const upgrades = category === 'click' ? gameState.clickUpgrades : gameState.autoUpgrades;
    const upgrade = upgrades.find(u => u.id === upgradeId);
    return upgrade ? gameState.coins >= upgrade.currentCost : false;
  }, [gameState.coins, gameState.clickUpgrades, gameState.autoUpgrades]);

  return {
    gameState,
    setGameState,
    clickAnimations,
    handleClick,
    buyUpgrade,
    resetGame,
    canAffordUpgrade
  };
}
