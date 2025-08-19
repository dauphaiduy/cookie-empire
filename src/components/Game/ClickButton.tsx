import React, { useState } from 'react';
import { Button } from 'antd';

interface ClickButtonProps {
  onClick: (event: React.MouseEvent) => void;
  clickPower: number;
  disabled?: boolean;
  className?: string;
}

export function ClickButton({ onClick, clickPower, disabled = false, className = '' }: ClickButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    setIsClicked(true);
    onClick(event);
    setTimeout(() => setIsClicked(false), 150);
  };

  return (
    <div className={`relative flex justify-center ${className}`}>
      <Button
        type="primary"
        size="large"
        onClick={handleClick}
        disabled={disabled}
        className={`
          w-56 h-56 rounded-full text-7xl font-bold 
          bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 
          border-4 border-yellow-200 
          hover:from-yellow-200 hover:via-yellow-300 hover:to-orange-400 
          shadow-2xl transform transition-all duration-200 
          hover:scale-110 active:scale-95
          ${isClicked ? 'animate-pulse scale-95' : 'hover:shadow-yellow-400/50'}
          relative overflow-hidden
        `}
        style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 25%, #f59e0b 50%, #d97706 75%, #ea580c 100%)',
          borderColor: '#fcd34d',
          boxShadow: isClicked 
            ? '0 0 30px rgba(251, 191, 36, 0.8), 0 20px 40px rgba(0, 0, 0, 0.3)' 
            : '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(251, 191, 36, 0.3)',
        }}
      >
        <span className="relative z-10 drop-shadow-lg">🍪</span>
        
        {/* Glow effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full animate-shimmer"></div>
      </Button>
      
      {/* Click Power Display */}
      {/* <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-white/20">
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Click Power</div>
          <div className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            +{clickPower}
          </div>
        </div>
      </div> */}

      {/* Floating particles effect */}
      {isClicked && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${50 + (Math.random() - 0.5) * 100}%`,
                top: `${50 + (Math.random() - 0.5) * 100}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: '0.6s',
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
