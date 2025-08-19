import React from 'react';
import { Progress } from 'antd';

interface ProgressBarProps {
  percent: number;
  label?: string;
  showInfo?: boolean;
  strokeColor?: string;
  className?: string;
}

export function ProgressBar({ 
  percent, 
  label, 
  showInfo = true, 
  strokeColor = '#1677ff',
  className = '' 
}: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {showInfo && (
            <span className="text-sm text-gray-500 dark:text-gray-400">{percent.toFixed(1)}%</span>
          )}
        </div>
      )}
      <Progress 
        percent={percent} 
        showInfo={!label && showInfo}
        strokeColor={strokeColor}
        trailColor="#e5e7eb"
        className="custom-progress"
      />
    </div>
  );
}
