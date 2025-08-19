'use client';

import React, { useState, useEffect } from 'react';
import { Button, Switch, Statistic, Row, Col, Modal, message, Divider } from 'antd';
import { 
  DeleteOutlined, 
  DownloadOutlined, 
  UploadOutlined
} from '@ant-design/icons';
import { useGameLogic } from '@/hooks/useGameLogic';
import { formatNumber } from '@/lib/utils';
import { ClientOnly } from '@/components/UI/ClientOnly';

export default function SettingsPage() {
  const { gameState, resetGame, setGameState } = useGameLogic();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleResetGame = () => {
    resetGame();
    setShowResetModal(false);
    message.success('Game has been reset successfully!');
  };

  const handleExportData = () => {
    if (!isClient) return;
    
    try {
      const data = JSON.stringify(gameState, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cookie-clicker-save-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      message.success('Game data exported successfully!');
    } catch (error) {
      message.error('Failed to export game data.');
      console.error('Export error:', error);
    }
  };

  const handleImportData = () => {
    if (!isClient) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            
            // Validate the data structure before importing
            if (data && typeof data === 'object' && 'coins' in data && 'totalClicks' in data) {
              // Use the setGameState function instead of direct localStorage access
              if (setGameState) {
                setGameState(data);
                message.success('Game data imported successfully!');
              } else {
                // Fallback to localStorage if setGameState is not available
                if (typeof window !== 'undefined') {
                  window.localStorage.setItem('idle-game-state', JSON.stringify(data));
                  message.success('Game data imported successfully! Please refresh the page.');
                }
              }
            } else {
              message.error('Invalid game data format.');
            }
          } catch (error) {
            message.error('Failed to import game data. Please check the file format.');
            console.error('Import error:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const efficiency = gameState.totalClicks > 0 ? (gameState.totalEarned / gameState.totalClicks) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            ⚙️ Settings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your game preferences, view statistics, and control your save data
          </p>
        </div>

        <ClientOnly 
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                  <div className="bg-gray-200 dark:bg-gray-700 h-6 w-32 rounded animate-pulse mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <Row gutter={[24, 24]}>
            {/* Game Statistics */}
            <Col xs={24} lg={12}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 h-full">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  📊 Game Statistics
                </h3>
                <Row gutter={[16, 16]}>
                  <Col xs={12}>
                    <Statistic
                      title="Total Cookies"
                      value={gameState.totalEarned}
                      formatter={(value) => formatNumber(Number(value))}
                      prefix="🍪"
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic
                      title="Total Clicks"
                      value={gameState.totalClicks}
                      formatter={(value) => formatNumber(Number(value))}
                      prefix="👆"
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic
                      title="Click Power"
                      value={gameState.clickPower}
                      prefix="💪"
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic
                      title="Cookies/Second"
                      value={gameState.coinsPerSecond}
                      formatter={(value) => formatNumber(Number(value))}
                      suffix="/s"
                      prefix="⚡"
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic
                      title="Click Efficiency"
                      value={efficiency}
                      precision={2}
                      formatter={(value) => formatNumber(Number(value))}
                      suffix=" cookies/click"
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic
                      title="Current Cookies"
                      value={gameState.coins}
                      formatter={(value) => formatNumber(Number(value))}
                      prefix="🍪"
                    />
                  </Col>
                </Row>
              </div>
            </Col>

            {/* Game Preferences */}
            <Col xs={24} lg={12}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 h-full">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  🎮 Game Preferences
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">🔔 Notifications</h4>
                      <p className="text-sm text-gray-500">Get notified about achievements and milestones</p>
                    </div>
                    <Switch 
                      checked={notifications} 
                      onChange={setNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">💾 Auto Save</h4>
                      <p className="text-sm text-gray-500">Automatically save your progress</p>
                    </div>
                    <Switch 
                      checked={autoSave} 
                      onChange={setAutoSave}
                    />
                  </div>

                  <Divider />

                  <div>
                    <h4 className="font-medium mb-3">🎨 Theme</h4>
                    <p className="text-sm text-gray-500 mb-3">Theme switching coming soon!</p>
                    <Button disabled>
                      🌙 Dark Mode
                    </Button>
                  </div>
                </div>
              </div>
            </Col>

            {/* Upgrade Summary */}
            <Col xs={24} lg={12}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  🛒 Upgrade Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">👆 Click Upgrades</h4>
                    {gameState.clickUpgrades.map((upgrade) => (
                      <div key={upgrade.id} className="flex items-center justify-between py-1">
                        <span className="text-sm">
                          {upgrade.icon} {upgrade.name}
                        </span>
                        <span className="font-medium">
                          {upgrade.owned}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Divider />

                  <div>
                    <h4 className="font-medium mb-2">🤖 Auto Producers</h4>
                    {gameState.autoUpgrades.map((upgrade) => (
                      <div key={upgrade.id} className="flex items-center justify-between py-1">
                        <span className="text-sm">
                          {upgrade.icon} {upgrade.name}
                        </span>
                        <span className="font-medium">
                          {upgrade.owned}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>

            {/* Data Management */}
            <Col xs={24} lg={12}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  💾 Data Management
                </h3>
                <div className="space-y-4">
                  <Button 
                    type="primary" 
                    icon={<DownloadOutlined />} 
                    onClick={handleExportData}
                    block
                    className="bg-gradient-to-r from-blue-500 to-purple-600 border-none hover:from-blue-400 hover:to-purple-500"
                  >
                    Export Game Data
                  </Button>

                  <Button 
                    icon={<UploadOutlined />} 
                    onClick={handleImportData}
                    block
                    className="border-blue-300 text-blue-600 hover:border-blue-400 hover:text-blue-700"
                  >
                    Import Game Data
                  </Button>

                  <Divider />

                  <Button 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => setShowResetModal(true)}
                    block
                  >
                    Reset Game Progress
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    ⚠️ Resetting will permanently delete all your progress
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </ClientOnly>

        {/* Reset Confirmation Modal */}
        <Modal
          title="⚠️ Reset Game Progress"
          open={showResetModal}
          onOk={handleResetGame}
          onCancel={() => setShowResetModal(false)}
          okText="Yes, Reset Everything"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to reset all your game progress?</p>
          <p className="text-red-600 font-medium">
            This action cannot be undone. You will lose:
          </p>
          <ClientOnly fallback={<div>Loading stats...</div>}>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>{formatNumber(gameState.totalEarned)} total cookies earned</li>
              <li>{formatNumber(gameState.totalClicks)} total clicks</li>
              <li>All purchased upgrades</li>
              <li>All achievements and progress</li>
            </ul>
          </ClientOnly>
        </Modal>
      </div>
    </div>
  );
}
