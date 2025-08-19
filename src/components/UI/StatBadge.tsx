import React, { useState, useEffect } from 'react';
import { Badge } from 'antd';
import { formatNumber } from '@/lib/utils';

interface StatBadgeProps {
  label: string;
  value: number;
  icon?: string;
  suffix?: string;
  className?: string;
}

export function StatBadge({ label, value, icon, suffix = '', className = '' }: StatBadgeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Show loading skeleton during SSR/hydration
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {icon && <span className="text-lg">{icon}</span>}
        <div className="flex flex-col">
          <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
          <div className="bg-gray-200 dark:bg-gray-700 h-6 w-16 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {icon && <span className="text-lg">{icon}</span>}
      <div className="flex flex-col">
        <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
        <Badge 
          count={`${formatNumber(value)}${suffix}`} 
          showZero 
          className="text-lg font-bold"
          style={{ backgroundColor: '#1677ff' }}
        />
      </div>
    </div>
  );
}
