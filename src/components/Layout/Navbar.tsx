'use client';

import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeOutlined, 
  ShoppingOutlined, 
  TrophyOutlined, 
  SettingOutlined 
} from '@ant-design/icons';

export function Navbar() {
  const pathname = usePathname();
  
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">Game</Link>,
    },
    {
      key: '/shop',
      icon: <ShoppingOutlined />,
      label: <Link href="/shop">Shop</Link>,
    },
    {
      key: '/leaderboard',
      icon: <TrophyOutlined />,
      label: <Link href="/leaderboard">Leaderboard</Link>,
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link href="/settings">Settings</Link>,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍪</span>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Cookie Clicker Idle
            </h1>
          </div>
          
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            items={menuItems}
            className="border-none bg-transparent flex-1 justify-end"
            style={{ 
              backgroundColor: 'transparent',
              borderBottom: 'none'
            }}
          />
        </div>
      </div>
    </nav>
  );
}
