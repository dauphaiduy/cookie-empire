export const formatNumber = (num: number): string => {
  const value = Math.floor(num);
  
  if (value < 1000) return value.toString();
  if (value < 1000000) return `${(value / 1000).toFixed(1)}K`;
  if (value < 1000000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value < 1000000000000) return `${(value / 1000000000).toFixed(1)}B`;
  return `${(value / 1000000000000).toFixed(1)}T`;
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

export const calculateUpgradeCost = (baseCost: number, owned: number, multiplier: number = 1.15): number => {
  return Math.floor(baseCost * Math.pow(multiplier, owned));
};

export const calculateOfflineEarnings = (coinsPerSecond: number, timeAwayMs: number): number => {
  const maxOfflineHours = 24; // Max 24 hours of offline earnings
  const timeAwaySeconds = Math.min(timeAwayMs / 1000, maxOfflineHours * 3600);
  return Math.floor(coinsPerSecond * timeAwaySeconds);
};

export const canAfford = (cost: number, coins: number): boolean => {
  return coins >= cost;
};

export const getRandomClickMessage = (): string => {
  const messages = [
    '🍪 Cookie!',
    '✨ Nice click!',
    '🎯 Perfect!',
    '💫 Amazing!',
    '🔥 On fire!',
    '⭐ Stellar!',
    '🚀 Fantastic!'
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};
