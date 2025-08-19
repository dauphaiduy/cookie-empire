export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  currentCost: number;
  multiplier: number;
  owned: number;
  icon: string;
  category: 'click' | 'auto';
}

export interface AutoUpgrade extends Upgrade {
  coinsPerSecond: number;
}

export const INITIAL_CLICK_UPGRADES: Upgrade[] = [
  {
    id: 'cursor',
    name: 'Better Cursor',
    description: 'Increases clicks per click by 1',
    baseCost: 15,
    currentCost: 15,
    multiplier: 1,
    owned: 0,
    icon: '👆',
    category: 'click'
  },
  {
    id: 'hand',
    name: 'Strong Hand',
    description: 'Increases clicks per click by 2',
    baseCost: 100,
    currentCost: 100,
    multiplier: 2,
    owned: 0,
    icon: '✋',
    category: 'click'
  },
  {
    id: 'glove',
    name: 'Magic Glove',
    description: 'Increases clicks per click by 5',
    baseCost: 500,
    currentCost: 500,
    multiplier: 5,
    owned: 0,
    icon: '🧤',
    category: 'click'
  }
];

export const INITIAL_AUTO_UPGRADES: AutoUpgrade[] = [
  {
    id: 'grandma',
    name: 'Grandma',
    description: 'A nice grandma to bake cookies for you',
    baseCost: 100,
    currentCost: 100,
    multiplier: 1,
    owned: 0,
    icon: '👵',
    category: 'auto',
    coinsPerSecond: 1
  },
  {
    id: 'farm',
    name: 'Cookie Farm',
    description: 'Grows cookie ingredients automatically',
    baseCost: 1100,
    currentCost: 1100,
    multiplier: 8,
    owned: 0,
    icon: '🚜',
    category: 'auto',
    coinsPerSecond: 8
  },
  {
    id: 'mine',
    name: 'Cookie Mine',
    description: 'Mines chocolate chips and other minerals',
    baseCost: 12000,
    currentCost: 12000,
    multiplier: 47,
    owned: 0,
    icon: '⛏️',
    category: 'auto',
    coinsPerSecond: 47
  },
  {
    id: 'factory',
    name: 'Cookie Factory',
    description: 'Mass produces cookies with industrial efficiency',
    baseCost: 130000,
    currentCost: 130000,
    multiplier: 260,
    owned: 0,
    icon: '🏭',
    category: 'auto',
    coinsPerSecond: 260
  }
];

export const GAME_CONFIG = {
  SAVE_INTERVAL: 10000, // Save every 10 seconds
  AUTO_CLICK_INTERVAL: 1000, // Auto-clickers produce every second
  UPGRADE_COST_MULTIPLIER: 1.15, // Cost increases by 15% per purchase
  ACHIEVEMENT_THRESHOLDS: {
    CLICKS: [100, 1000, 10000, 100000],
    COINS: [1000, 10000, 100000, 1000000],
    UPGRADES: [1, 5, 10, 25]
  }
};

export interface GameState {
  coins: number;
  totalClicks: number;
  clickPower: number;
  coinsPerSecond: number;
  clickUpgrades: Upgrade[];
  autoUpgrades: AutoUpgrade[];
  lastSaveTime: number;
  totalEarned: number;
  achievements: string[];
}

export const INITIAL_GAME_STATE: GameState = {
  coins: 0,
  totalClicks: 0,
  clickPower: 1,
  coinsPerSecond: 0,
  clickUpgrades: INITIAL_CLICK_UPGRADES,
  autoUpgrades: INITIAL_AUTO_UPGRADES,
  lastSaveTime: 0, // Will be set to Date.now() on client initialization
  totalEarned: 0,
  achievements: []
};
