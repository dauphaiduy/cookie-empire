import React from 'react';
import { Card, Button, Badge, Tooltip } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Upgrade, AutoUpgrade } from '@/lib/gameConfig';
import { formatNumber } from '@/lib/utils';

interface UpgradeCardProps {
  upgrade: Upgrade | AutoUpgrade;
  canAfford: boolean;
  onBuy: () => void;
  className?: string;
}

export function UpgradeCard({ upgrade, canAfford, onBuy, className = '' }: UpgradeCardProps) {
  const isAutoUpgrade = 'coinsPerSecond' in upgrade;
  
  return (
    <Card
      className={`w-full transition-all duration-200 hover:shadow-lg ${
        canAfford ? 'border-green-300 hover:border-green-400' : 'border-gray-200'
      } ${className}`}
      styles={{ body: { padding: '16px' } }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">{upgrade.icon}</span>
            <div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-black-200">
                {upgrade.name}
              </h3>
              {upgrade.owned > 0 && (
                <Badge 
                  count={upgrade.owned} 
                  style={{ backgroundColor: '#52c41a' }}
                  className="ml-2"
                />
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {upgrade.description}
          </p>
          
          <div className="space-y-1 text-sm">
            {isAutoUpgrade ? (
              <div className="text-blue-600 font-semibold">
                ⚡ +{formatNumber((upgrade as AutoUpgrade).coinsPerSecond)} cookies/sec
              </div>
            ) : (
              <div className="text-green-600 font-semibold">
                💪 +{upgrade.multiplier} click power
              </div>
            )}
            
            {upgrade.owned > 0 && (
              <div className="text-purple-600">
                📊 Total: {isAutoUpgrade 
                  ? `+${formatNumber((upgrade as AutoUpgrade).coinsPerSecond * upgrade.owned)}/sec`
                  : `+${upgrade.multiplier * upgrade.owned} power`
                }
              </div>
            )}
          </div>
        </div>
        
        <div className="ml-4 flex flex-col items-end space-y-2">
          <div className="text-right">
            <div className="text-sm text-gray-500">Cost</div>
            <div className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-500'}`}>
              🍪 {formatNumber(upgrade.currentCost)}
            </div>
          </div>
          
          <Tooltip title={canAfford ? `Buy ${upgrade.name}` : 'Not enough cookies'}>
            <Button
              type={canAfford ? 'primary' : 'default'}
              icon={<ShoppingCartOutlined />}
              onClick={onBuy}
              disabled={!canAfford}
              className={`${canAfford ? 'bg-green-500 hover:bg-green-600' : ''}`}
            >
              Buy
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}
