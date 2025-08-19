'use client';

import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Statistic, Row, Col } from 'antd';
import { TrophyOutlined, CrownOutlined, StarOutlined } from '@ant-design/icons';
import { useGameLogic } from '@/hooks/useGameLogic';
import { formatNumber } from '@/lib/utils';

interface LeaderboardEntry {
  id: string;
  playerName: string;
  totalEarned: number;
  totalClicks: number;
  coinsPerSecond: number;
  timestamp: number;
}

export default function LeaderboardPage() {
  const { gameState } = useGameLogic();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerRank, setPlayerRank] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side only to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock leaderboard data for demonstration
  useEffect(() => {
    if (!isClient) return;
    
    const now = Date.now();
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        id: '1',
        playerName: 'Cookie Master',
        totalEarned: 1000000,
        totalClicks: 50000,
        coinsPerSecond: 500,
        timestamp: now - 86400000
      },
      {
        id: '2',
        playerName: 'Click Champion',
        totalEarned: 750000,
        totalClicks: 40000,
        coinsPerSecond: 300,
        timestamp: now - 172800000
      },
      {
        id: '3',
        playerName: 'Auto Farmer',
        totalEarned: 500000,
        totalClicks: 10000,
        coinsPerSecond: 800,
        timestamp: now - 259200000
      },
      {
        id: '4',
        playerName: 'Idle King',
        totalEarned: 400000,
        totalClicks: 20000,
        coinsPerSecond: 250,
        timestamp: now - 345600000
      },
      {
        id: '5',
        playerName: 'Cookie Rookie',
        totalEarned: 300000,
        totalClicks: 30000,
        coinsPerSecond: 150,
        timestamp: now - 432000000
      }
    ];

    // Add current player to leaderboard
    const currentPlayer: LeaderboardEntry = {
      id: 'current',
      playerName: 'You',
      totalEarned: gameState.totalEarned,
      totalClicks: gameState.totalClicks,
      coinsPerSecond: gameState.coinsPerSecond,
      timestamp: now
    };

    const allEntries = [...mockLeaderboard, currentPlayer]
      .sort((a, b) => b.totalEarned - a.totalEarned);

    const rank = allEntries.findIndex(entry => entry.id === 'current') + 1;
    
    setLeaderboard(allEntries);
    setPlayerRank(rank);
  }, [isClient, gameState.totalEarned, gameState.totalClicks, gameState.coinsPerSecond]);

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank: number) => {
        if (rank === 1) return <CrownOutlined className="text-yellow-500 text-xl" />;
        if (rank === 2) return <TrophyOutlined className="text-gray-400 text-xl" />;
        if (rank === 3) return <StarOutlined className="text-orange-500 text-xl" />;
        return <span className="font-bold text-lg">#{rank}</span>;
      }
    },
    {
      title: 'Player',
      dataIndex: 'playerName',
      key: 'playerName',
      render: (name: string, record: LeaderboardEntry) => (
        <span className={record.id === 'current' ? 'font-bold text-blue-600' : ''}>
          {name}
          {record.id === 'current' && ' 👤'}
        </span>
      )
    },
    {
      title: 'Total Earned',
      dataIndex: 'totalEarned',
      key: 'totalEarned',
      render: (value: number) => (
        <span className="font-semibold">
          🍪 {formatNumber(value)}
        </span>
      ),
      sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => a.totalEarned - b.totalEarned
    },
    {
      title: 'Total Clicks',
      dataIndex: 'totalClicks',
      key: 'totalClicks',
      render: (value: number) => (
        <span>👆 {formatNumber(value)}</span>
      ),
      sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => a.totalClicks - b.totalClicks
    },
    {
      title: 'Cookies/Sec',
      dataIndex: 'coinsPerSecond',
      key: 'coinsPerSecond',
      render: (value: number) => (
        <span>⚡ {formatNumber(value)}/s</span>
      ),
      sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => a.coinsPerSecond - b.coinsPerSecond
    }
  ];

  const dataWithRanks = leaderboard.map((entry, index) => ({
    ...entry,
    rank: index + 1,
    key: entry.id
  }));

  const achievements = [
    {
      title: 'First Click',
      description: 'Make your first click',
      earned: gameState.totalClicks > 0,
      icon: '🆕'
    },
    {
      title: 'Century Clicker',
      description: 'Make 100 clicks',
      earned: gameState.totalClicks >= 100,
      icon: '💯'
    },
    {
      title: 'Thousand Club',
      description: 'Earn 1,000 cookies',
      earned: gameState.totalEarned >= 1000,
      icon: '🎯'
    },
    {
      title: 'Automation Master',
      description: 'Reach 10 cookies per second',
      earned: gameState.coinsPerSecond >= 10,
      icon: '🤖'
    },
    {
      title: 'Cookie Millionaire',
      description: 'Earn 1,000,000 cookies',
      earned: gameState.totalEarned >= 1000000,
      icon: '💰'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          🏆 Leaderboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          See how you stack up against other cookie clickers!
        </p>
      </div>

      {!isClient ? (
        <div className="text-center py-8">
          <div className="text-lg">Loading leaderboard...</div>
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} md={12}>
          <Card title="🎯 Your Stats" className="h-full">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Your Rank"
                  value={playerRank}
                  prefix="#"
                  valueStyle={{ color: playerRank <= 3 ? '#3f8600' : '#1890ff' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Total Earned"
                  value={gameState.totalEarned}
                  formatter={(value) => `🍪 ${formatNumber(Number(value))}`}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="🏅 Achievements" className="h-full">
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-2 rounded ${
                    achievement.earned 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  <span className="text-lg">{achievement.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-xs">{achievement.description}</div>
                  </div>
                  {achievement.earned && <span className="text-green-500">✓</span>}
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="🥇 Global Leaderboard" className="mb-8">
        <Table
          columns={columns}
          dataSource={dataWithRanks}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true
          }}
          rowClassName={(record) => 
            record.id === 'current' ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }
        />
      </Card>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            * This is a demo leaderboard. In a real implementation, this would connect to a backend service.
          </p>
          <Button type="primary" size="large">
            🔄 Refresh Leaderboard
          </Button>
        </div>
        </>
      )}
    </div>
  );
}