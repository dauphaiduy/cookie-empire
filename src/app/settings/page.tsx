'use client';

import React, { useState } from 'react';
import { Card, Button, Switch, Statistic, Row, Col, Modal, message, Divider } from 'antd';
import { 
  DeleteOutlined, 
  DownloadOutlined, 
  UploadOutlined
} from '@ant-design/icons';
import { useGameLogic } from '@/hooks/useGameLogic';
import { formatNumber } from '@/lib/utils';

export default function SettingsPage() {
  const { gameState, resetGame } = useGameLogic();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetGame = () => {
    resetGame();
    setShowResetModal(false);
    message.success('Game has been reset successfully!');
  };

  const handleExportData = () => {
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
  };

  const handleImportData = () => {
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
            localStorage.setItem('idle-game-state', JSON.stringify(data));
            message.success('Game data imported successfully! Please refresh the page.');
          } catch {
            message.error('Failed to import game data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const efficiency = gameState.totalClicks > 0 ? (gameState.totalEarned / gameState.totalClicks) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          ⚙️ Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your game preferences and data
        </p>
      </div>

      <Row gutter={[16, 16]}>
        {/* Game Statistics */}
        <Col xs={24} lg={12}>
          <Card title="📊 Game Statistics" className="h-full">
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
          </Card>
        </Col>

        {/* Game Preferences */}
        <Col xs={24} lg={12}>
          <Card title="🎮 Game Preferences" className="h-full">
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
          </Card>
        </Col>

        {/* Upgrade Summary */}
        <Col xs={24} lg={12}>
          <Card title="🛒 Upgrade Summary">
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
          </Card>
        </Col>

        {/* Data Management */}
        <Col xs={24} lg={12}>
          <Card title="💾 Data Management">
            <div className="space-y-4">
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={handleExportData}
                block
              >
                Export Game Data
              </Button>

              <Button 
                icon={<UploadOutlined />} 
                onClick={handleImportData}
                block
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
          </Card>
        </Col>
      </Row>

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
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          <li>{formatNumber(gameState.totalEarned)} total cookies earned</li>
          <li>{formatNumber(gameState.totalClicks)} total clicks</li>
          <li>All purchased upgrades</li>
          <li>All achievements and progress</li>
        </ul>
      </Modal>
    </div>
  );
}
